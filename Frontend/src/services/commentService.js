// src/services/commentService.js
import axiosInstance from '@/api/axiosInstance';

const commentService = {
  // TODO: wire up when backend ready
  getVideoComments: (videoId) => axiosInstance.get(`/comments/${videoId}`),
  addComment: (videoId, content) => axiosInstance.post(`/comments/${videoId}`, { content }),
};
export default commentService;