// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from './api/axios';
import { loginSuccess, logoutSuccess, setLoading } from './features/auth/authSlice';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// A simple placeholder for your authenticated app
const Home = () => <div className="p-8 text-white">Main App Layout (Build this later)</div>;

const App = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, isGuest } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get('/users/current-user');
        if (response.data?.data?.user) {
          dispatch(loginSuccess(response.data.data.user));
        } else {
          dispatch(logoutSuccess());
        }
      } catch (error) {
        dispatch(logoutSuccess());
      }
    };
    checkUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-primary">
        Loading...
      </div>
    );
  }

  const hasAppAccess = isAuthenticated || isGuest;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/welcome" element={!hasAppAccess ? <Landing /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />

        {/* Protected App Routes */}
        <Route path="/" element={hasAppAccess ? <Home /> : <Navigate to="/welcome" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;