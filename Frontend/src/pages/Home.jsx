// src/pages/Home.jsx
import { motion } from "framer-motion";

const Home = () => {
  // Placeholder array until you build the GET /videos backend
  const dummyVideos = Array(8).fill(null);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-textMain mb-6">Recommended for you</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyVideos.map((_, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col gap-3 cursor-pointer group"
          >
            {/* Thumbnail Placeholder */}
            <div className="w-full aspect-video bg-surface rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/20 transition-colors z-10"></div>
            </div>
            
            {/* Video Info */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-surface shrink-0"></div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-textMain line-clamp-2 group-hover:text-primary transition-colors">
                  Video Title Placeholder - Wait for Backend
                </span>
                <span className="text-xs text-textMuted mt-1">Channel Name</span>
                <span className="text-xs text-textMuted">120K views • 2 hours ago</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;