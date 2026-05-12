// src/services/authService.js
/**
 * Authentication Service
 */
import axiosInstance from '@/api/axiosInstance';

const authService = {
  /**
   * @param {FormData} data
   * @returns {Promise}
   */
  register: (data) => axiosInstance.post('/users/register', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  login: (identifier, password) => axiosInstance.post('/users/login', { email: identifier.includes('@') ? identifier : undefined, username: !identifier.includes('@') ? identifier : undefined, password }),
  logout: () => axiosInstance.post('/users/logout'),
  getCurrentUser: () => axiosInstance.get('/users/current-user'),
  updateProfile: (data) => axiosInstance.patch('/users/update-profile', data),
  changePassword: (data) => axiosInstance.post('/users/change-password', data),
};

export default authService;