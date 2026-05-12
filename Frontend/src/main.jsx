// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@/app/store';
import { router } from '@/routes/index.jsx';
import { setCredentials, logout } from '@/features/auth/authSlice';
import authService from '@/services/authService';
import './index.css';

const initializeApp = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userString = localStorage.getItem('user');

  if (accessToken && userString) {
    try {
      const user = JSON.parse(userString);
      store.dispatch(setCredentials({ user, accessToken, refreshToken }));
      
      const currentUser = await authService.getCurrentUser();
      store.dispatch(setCredentials({ user: currentUser.data, accessToken, refreshToken }));
    } catch (error) {
      store.dispatch(logout());
    }
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
};

initializeApp();