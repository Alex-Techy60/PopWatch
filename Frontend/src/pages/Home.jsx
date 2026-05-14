// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Switched to Redux
import VideoGrid from '@/components/VideoGrid';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

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
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Simulate a sleek data-fetching sequence
    const timer = setTimeout(() => setIsPageLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* High-End Loading Sequence */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.1, 1],
                opacity: 1,
                filter: [
                  'drop-shadow(0 0 0px rgba(124,58,237,0))',
                  'drop-shadow(0 0 50px rgba(124,58,237,0.8))',
                  'drop-shadow(0 0 20px rgba(124,58,237,0.4))'
                ]
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              {/* Radar pulse ring behind logo */}
              <motion.div 
                className="absolute inset-[-30px] rounded-full border-2 border-primary/30"
                animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <img src="/src/assets/logo.svg" alt="PopWatch Logo" className="h-28 w-auto relative z-10" />
            </motion.div>
            
            <div className="mt-14 flex flex-col items-center gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-text-secondary tracking-widest text-[11px] uppercase font-bold"
              >
                Initializing Experience
              </motion.div>
              
              {/* Animated Progress Bar */}
              <div className="w-64 h-1.5 bg-surface-elevated rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(124,58,237,0.2)]">
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary via-accent to-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "circOut" }}
                />
                {/* Shimmer sweep effect */}
                <motion.div 
                  className="absolute top-0 bottom-0 w-24 bg-white/30 skew-x-[-20deg]"
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4, delay: 0.2 }} 
        className="pb-10"
      >
        {!isAuthenticated ? (
          <div className="relative w-full h-64 rounded-2xl bg-surface-elevated mb-8 overflow-hidden flex flex-col items-center justify-center text-center border border-primary/20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Watch. Discover. Create.</h1>
            <Link to="/register" className="relative z-10"><Button variant="primary">Get Started — It's Free</Button></Link>
          </div>
        ) : (
          <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.fullName?.split(' ')[0] || user?.username || 'Creator'}!</h1>
        )}

        <div className="flex gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {CHIPS.map(chip => (
            <Badge key={chip} className="px-4 py-1.5 text-sm cursor-pointer hover:bg-surface">{chip}</Badge>
          ))}
        </div>

        <VideoGrid videos={MOCK_VIDEOS} isLoading={false} />
      </motion.div>
    </>
  );
}
