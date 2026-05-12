// src/api/axiosInstance.js
import axios from 'axios';
import { store } from '@/app/store';
import { logout, setCredentials } from '@/features/auth/authSlice';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = store.getState().auth.refreshToken;
        const res = await axios.post(`${axiosInstance.defaults.baseURL}/users/refresh-token`, { refreshToken });
        
        const { accessToken: newAccess, refreshToken: newRefresh } = res.data.data;
        const user = store.getState().auth.user;
        
        store.dispatch(setCredentials({ user, accessToken: newAccess, refreshToken: newRefresh }));
        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;