// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import videoReducer from '@/features/video/videoSlice';
import channelReducer from '@/features/channel/channelSlice';
import playlistReducer from '@/features/playlist/playlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
    channel: channelReducer,
    playlist: playlistReducer,
  },
});

export default store;