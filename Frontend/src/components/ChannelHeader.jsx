// src/components/ChannelHeader.jsx
import { motion } from 'framer-motion';
import Button from './ui/Button';
import Avatar from './ui/Avatar';

export default function ChannelHeader({ channel, isSubscribed, onToggleSubscribe }) {
  return (
    <div className="flex flex-col w-full mb-6">
      <div className="w-full h-32 md:h-48 relative bg-surface-elevated rounded-b-xl overflow-hidden">
        {channel.coverImage && <img src={channel.coverImage} alt="Cover" className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 px-4 md:px-8 -mt-12 relative z-10">
        <Avatar src={channel.avatar} size="xl" className="border-4 border-background" />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold">{channel.fullName}</h1>
          <p className="text-text-secondary">@{channel.username} • {channel.subscribersCount} subscribers</p>
        </div>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button 
            variant={isSubscribed ? 'outline' : 'primary'}
            onClick={onToggleSubscribe}
          >
            {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}