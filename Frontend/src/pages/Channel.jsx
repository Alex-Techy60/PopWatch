// src/pages/Channel.jsx
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChannelHeader from '@/components/ChannelHeader';

export default function Channel() {
  const { username } = useParams();
  // Mock data
  const mockChannel = { fullName: 'Channel Name', username, subscribersCount: 1200, coverImage: 'https://picsum.photos/1200/300' };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <ChannelHeader channel={mockChannel} isSubscribed={false} onToggleSubscribe={() => {}} />
      <div className="mt-8 border-b border-border flex gap-6">
        <button className="pb-2 border-b-2 border-primary font-medium">Videos</button>
        <button className="pb-2 text-text-secondary hover:text-text-primary">Playlists</button>
      </div>
    </motion.div>
  );
}