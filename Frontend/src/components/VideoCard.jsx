// src/components/VideoCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatTime } from '@/utils/formatTime';
import { formatViews } from '@/utils/formatViews';
import Avatar from './ui/Avatar';

export default function VideoCard({ video, compact = false }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className={`flex ${compact ? 'flex-row gap-2' : 'flex-col gap-3'} w-full group cursor-pointer`}
      style={{ hover: { boxShadow: '0 0 20px rgba(124,58,237,0.4)' } }}
    >
      <Link to={`/watch/${video._id}`} className={`relative ${compact ? 'w-40 shrink-0' : 'w-full'} aspect-video rounded-xl overflow-hidden`}>
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <span className="absolute bottom-1 right-1 bg-black/80 px-1 text-xs rounded font-medium text-white">{formatTime(video.duration)}</span>
      </Link>
      <div className="flex gap-3 items-start flex-1">
        {!compact && (
          <Link to={`/channel/${video.owner.username}`} onClick={(e) => e.stopPropagation()}>
            <Avatar src={video.owner.avatar} size="md" />
          </Link>
        )}
        <div className="flex flex-col overflow-hidden">
          <Link to={`/watch/${video._id}`} className="text-text-primary font-semibold line-clamp-2 text-sm group-hover:text-primary transition-colors">
            {video.title}
          </Link>
          <Link to={`/channel/${video.owner.username}`} className="text-text-secondary text-xs mt-1 hover:text-text-primary transition-colors">
            {video.owner.fullName}
          </Link>
          <span className="text-text-secondary text-xs">
            {formatViews(video.views)} views • {formatTime(video.createdAt, true)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}