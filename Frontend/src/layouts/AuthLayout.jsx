// src/layouts/AuthLayout.jsx
import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '@/hooks/useAuth';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-glow rounded-full blur-[120px] pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md bg-surface/80 backdrop-blur-xl p-8 rounded-2xl border border-border shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-8">
          <img src="/src/assets/logo.svg" alt="PopWatch" className="h-10" />
        </div>
        <Outlet />
      </motion.div>
    </div>
  );
}