// video.route.js

import { Router } from "express";
import {
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { optionalVerifyJWT } from "../middlewares/optionalAuth.middleware.js";

const router = Router();

router
    .route("/")
    .get(optionalVerifyJWT, getAllVideos)
    .post(
        verifyJWT,
        upload.fields([
            { name: "videoFile", maxCount: 1 },
            { name: "thumbnail", maxCount: 1 }
        ]),
        publishVideo
    );

router
    .route("/:videoId")
    .get(optionalVerifyJWT, getVideoById)
    .patch(verifyJWT, upload.single("thumbnail"), updateVideo)
    .delete(verifyJWT, deleteVideo);

router
    .route("/toggle/publish/:videoId")
    .patch(verifyJWT, togglePublishStatus);

export default router;