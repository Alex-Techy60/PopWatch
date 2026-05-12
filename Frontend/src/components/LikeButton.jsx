// src/components/LikeButton.jsx
import { motion } from 'framer-motion';
import { ThumbsUp, Lock } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import Tooltip from './ui/Tooltip';

export default function LikeButton({ isLiked, likesCount, onToggle, onGuestClick }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Tooltip content="Sign in to like videos">
        <button onClick={onGuestClick} className="flex items-center gap-2 px-3 py-1.5 bg-surface-elevated rounded-full opacity-50 cursor-pointer hover:bg-surface">
          <Lock size={16} />
          <span className="text-sm">{likesCount}</span>
        </button>
      </Tooltip>
    );
  }

  return (
    <motion.button 
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${isLiked ? 'bg-primary text-white' : 'bg-surface-elevated hover:bg-surface'}`}
    >
      <ThumbsUp size={16} className={isLiked ? 'fill-current' : ''} />
      <span className="text-sm">{likesCount}</span>
    </motion.button>
  );
}