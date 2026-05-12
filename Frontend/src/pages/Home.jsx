// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import VideoGrid from '@/components/VideoGrid';
import Button from '@/components/ui/Button';

// Mock data to simulate API response before backend is ready
const MOCK_VIDEOS = Array.from({ length: 12 }).map((_, i) => ({
  _id: `vid_${i}`,
  title: `Amazing Video Title ${i + 1}`,
  thumbnail: `https://picsum.photos/seed/${i}/640/360`,
  duration: 450 + i * 100,
  views: Math.floor(Math.random() * 1000000),
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  owner: { username: `user${i}`, fullName: `Creator ${i}`, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}` }
}));

const CHIPS = ['All', 'Music', 'Gaming', 'Tech', 'Sports', 'News', 'Live'];

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="pb-10">
      {!isAuthenticated ? (
        <div className="relative w-full h-64 rounded-2xl bg-surface-elevated mb-8 overflow-hidden flex flex-col items-center justify-center text-center border border-primary/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Watch. Discover. Create.</h1>
          <Link to="/register" className="relative z-10"><Button variant="primary">Get Started — It's Free</Button></Link>
        </div>
      ) : (
        <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.fullName?.split(' ')[0] || 'User'}!</h1>
      )}

      <div className="flex gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {CHIPS.map(chip => (
          <Badge key={chip} className="px-4 py-1.5 text-sm cursor-pointer hover:bg-surface">{chip}</Badge>
        ))}
      </div>

      <VideoGrid videos={MOCK_VIDEOS} isLoading={false} />
    </motion.div>
  );
}

// Inline fallback for Badge since we exported it correctly but want it available here
import Badge from '@/components/ui/Badge';