// src/App.jsx
// This file is functionally bypassed by RouterProvider in main.jsx, 
// but provided per structure constraints to hold Toaster or Contexts if needed.
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#1a1a27', color: '#f0f0ff', border: '1px solid rgba(124, 58, 237, 0.2)' }
      }} />
      <Outlet />
    </AuthProvider>
  );
}