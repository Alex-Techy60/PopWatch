// src/services/videoService.js
import axiosInstance from '@/api/axiosInstance';

const videoService = {
  // TODO: wire up when backend ready
  getAllVideos: () => axiosInstance.get('/videos'),
  getVideoById: (id) => axiosInstance.get(`/videos/${id}`),
};
export default videoService;