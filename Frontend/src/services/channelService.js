// src/services/channelService.js
import axiosInstance from '@/api/axiosInstance';

const channelService = {
  // TODO: wire up when backend ready
  getChannelProfile: (username) => axiosInstance.get(`/users/c/${username}`),
};
export default channelService;