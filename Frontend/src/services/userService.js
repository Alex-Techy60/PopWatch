// src/services/userService.js
import axiosInstance from '@/api/axiosInstance';

const userService = {
  // TODO: wire up when backend ready
  getWatchHistory: () => axiosInstance.get('/users/watch-history'),
};
export default userService;