// src/routes/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import AuthPromptModal from '@/components/AuthPromptModal';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(!isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowModal(true);
      const timer = setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <AuthPromptModal isOpen={showModal} onClose={() => {}} />;
  }

  return <Outlet />;
}