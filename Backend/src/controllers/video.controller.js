// video.controller.js

import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/Cloudinary.js";

const getAllVideos = AsyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        query,
        sortBy = "createdAt",
        sortType = "desc",
        userId
    } = req.query;

    const allowedSortFields = ["createdAt", "views", "duration", "title"];
    if (!allowedSortFields.includes(sortBy)) {
        throw new ApiError(400, "Invalid sortBy field");
    }

    const pipeline = [];

    if (query?.trim()) {
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: query.trim(), $options: "i" } },
                    { description: { $regex: query.trim(), $options: "i" } }
                ]
            }
        });
    }

    pipeline.push({ $match: { isPublished: true } });

    if (userId) {
        if (!isValidObjectId(userId)) {
            throw new ApiError(400, "Invalid userId");
        }
        pipeline.push({
            $match: { owner: new mongoose.Types.ObjectId(userId) }
        });
    }

    pipeline.push(
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner: { $first: "$owner" }
            }
        },
        {
            $sort: { [sortBy]: sortType === "asc" ? 1 : -1 }
        }
    );

    const options = {
        page: Math.max(1, parseInt(page)),
        limit: Math.min(50, Math.max(1, parseInt(limit)))
    };

    const result = await Video.aggregatePaginate(
        Video.aggregate(pipeline),
        options
    );

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Videos fetched successfully"));
});

const publishVideo = AsyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title?.trim() || !description?.trim()) {
        throw new ApiError(400, "Title and description are required");
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required");
    }
    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is required");
    }

    const [videoFile, thumbnail] = await Promise.all([
        uploadOnCloudinary(videoLocalPath),
        uploadOnCloudinary(thumbnailLocalPath)
    ]);

    if (!videoFile?.url) {
        throw new ApiError(500, "Failed to upload video file");
    }
    if (!thumbnail?.url) {
        throw new ApiError(500, "Failed to upload thumbnail");
    }

    const video = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        title: title.trim(),
        description: description.trim(),
        duration: videoFile.duration,
        owner: req.user._id
    });

    const createdVideo = await Video.findById(video._id).populate(
        "owner",
        "fullName username avatar"
    );

    return res
        .status(201)
        .json(new ApiResponse(201, createdVideo, "Video published successfully"));
});

const getVideoById = AsyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(videoId) }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "channel",
                            as: "subscribers"
                        }
                    },
                    {
                        $addFields: {
                            subscribersCount: { $size: "$subscribers" },
                            isSubscribed: {
                                $cond: {
                                    if: {
                                        $in: [
                                            req.user?._id,
                                            "$subscribers.subscriber"
                                        ]
                                    },
                                    then: true,
                                    else: false
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1,
                            subscribersCount: 1,
                            isSubscribed: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "likes"
            }
        },
        {
            $addFields: {
                owner: { $first: "$owner" },
                likesCount: { $size: "$likes" },
                isLiked: {
                    $cond: {
                        if: { $in: [req.user?._id, "$likes.likedBy"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                likes: 0
            }
        }
    ]);

    if (!video?.length) {
        throw new ApiError(404, "Video not found");
    }

    const foundVideo = video[0];

    if (
        !foundVideo.isPublished &&
        foundVideo.owner._id.toString() !== req.user?._id?.toString()
    ) {
        throw new ApiError(403, "This video is not available");
    }

    await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });

    if (req.user) {
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { watchHistory: videoId }
        });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, foundVideo, "Video fetched successfully"));
});

const updateVideo = AsyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { title, description } = req.body;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    if (!title?.trim() && !description?.trim() && !req.file) {
        throw new ApiError(400, "At least one field is required to update");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this video");
    }

    const updateFields = {};

    if (title?.trim()) updateFields.title = title.trim();
    if (description?.trim()) updateFields.description = description.trim();

    if (req.file) {
        const oldThumbnailUrl = video.thumbnail;

        const thumbnail = await uploadOnCloudinary(req.file.path);

        if (!thumbnail?.url) {
            throw new ApiError(500, "Failed to upload new thumbnail");
        }

        await deleteFromCloudinary(oldThumbnailUrl);
        updateFields.thumbnail = thumbnail.url;
    }

    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { $set: updateFields },
        { new: true }
    ).populate("owner", "fullName username avatar");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
});

const deleteVideo = AsyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this video");
    }

    await Promise.all([
        deleteFromCloudinary(video.videoFile),
        deleteFromCloudinary(video.thumbnail)
    ]);

    await Video.findByIdAndDelete(videoId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Video deleted successfully"));
});

const togglePublishStatus = AsyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    if (video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this video");
    }

    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { $set: { isPublished: !video.isPublished } },
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            { isPublished: updatedVideo.isPublished },
            `Video ${updatedVideo.isPublished ? "published" : "unpublished"} successfully`
        )
    );
});

export {
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
};