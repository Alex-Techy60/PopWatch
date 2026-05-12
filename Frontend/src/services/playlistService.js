// src/services/playlistService.js
import axiosInstance from '@/api/axiosInstance';

const playlistService = {
  // TODO: wire up when backend ready
  getUserPlaylists: (userId) => axiosInstance.get(`/playlist/user/${userId}`),
};
export default playlistService;