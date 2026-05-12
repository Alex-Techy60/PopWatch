// src/pages/VideoWatch.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import useAuth from '@/hooks/useAuth';
import LikeButton from '@/components/LikeButton';
import CommentSection from '@/components/CommentSection';
import VideoCard from '@/components/VideoCard';
import AuthPromptModal from '@/components/AuthPromptModal';

// Mock
const MOCK_VIDEO = { _id: '1', title: 'Building PopWatch Frontend', url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4', views: 15400, createdAt: new Date().toISOString(), owner: { username: 'test', fullName: 'Tester', avatar: '' } };

export default function VideoWatch() {
  const { videoId } = useParams();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleGuestAction = () => setShowAuthModal(true);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row gap-6 max-w-[1600px] mx-auto">
      <div className="flex-1 lg:w-[70%]">
        <div className="aspect-video bg-black rounded-xl overflow-hidden w-full">
          <ReactPlayer url={MOCK_VIDEO.url} width="100%" height="100%" controls playing />
        </div>
        <h1 className="text-xl font-bold mt-4">{MOCK_VIDEO.title}</h1>
        <div className="flex justify-between items-center mt-2 pb-4 border-b border-border">
          <p className="text-text-secondary text-sm">15.4K views • 2 days ago</p>
          <div className="flex gap-2">
            <LikeButton isLiked={false} likesCount={120} onToggle={() => {}} onGuestClick={handleGuestAction} />
          </div>
        </div>
        <CommentSection videoId={videoId} />
      </div>
      <div className="lg:w-[30%] flex flex-col gap-3">
        <h3 className="font-semibold mb-2">Up Next</h3>
        {Array.from({length: 5}).map((_, i) => <VideoCard key={i} video={MOCK_VIDEO} compact />)}
      </div>
      <AuthPromptModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </motion.div>
  );
}