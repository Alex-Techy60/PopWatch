// src/services/likeService.js
import axiosInstance from '@/api/axiosInstance';

const likeService = {
  // TODO: wire up when backend ready
  toggleVideoLike: (videoId) => axiosInstance.post(`/likes/toggle/v/${videoId}`),
};
export default likeService;