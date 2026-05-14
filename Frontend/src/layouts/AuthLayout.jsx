import { useState, useEffect } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '@/hooks/useAuth';

// Curated images representing: Video Production, Gaming, Music, and Lifestyle
const SHOWCASE_IMAGES = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1000&auto=format&fit=crop"
];

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Cycle images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % SHOWCASE_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex bg-background selection:bg-primary/30">
      {/* Left Side - Branding & Visuals (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-[#0f0f16] overflow-hidden flex-col justify-between p-12 border-r border-border/50">
        {/* Abstract Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
        
        {/* Header Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 w-max">
            <img src="/src/assets/logo.svg" alt="PopWatch" className="h-10 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
            <span className="text-2xl font-bold tracking-tight text-white">PopWatch</span>
          </Link>
        </div>

        {/* Floating Glassy Cards Graphic with Image Cycling */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none flex items-center justify-center">
          {/* Back Card (Maintains the abstract glass look) */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [-4, -2, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[60%] h-[50%] border border-white/5 rounded-3xl bg-white/5 backdrop-blur-3xl z-0 shadow-2xl" 
          />
          
          {/* Front Card (Now holds the animated images) */}
          <motion.div 
            animate={{ y: [10, -10, 10], rotate: [4, 2, 4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[65%] h-[45%] border border-primary/30 rounded-3xl bg-surface-elevated z-10 shadow-[0_0_40px_rgba(124,58,237,0.15)] overflow-hidden" 
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImgIndex}
                src={SHOWCASE_IMAGES[currentImgIndex]}
                alt="Showcase"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.6, scale: 1 }} // Kept at 0.6 opacity to maintain the moody dark theme
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Gradient Overlay to ensure the image blends perfectly with your theme */}
            <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-background/40 to-primary/20 mix-blend-overlay" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
          </motion.div>
        </div>

        {/* Bottom Copy */}
        <div className="relative z-10 max-w-md">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-4xl font-bold leading-tight mb-4 text-white"
          >
            Watch, discover, and create amazing content.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-text-secondary text-lg"
          >
            Join a community of creators and viewers sharing their passion with the world. Experience high-quality streaming tailored just for you.
          </motion.p>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10 bg-background">
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <img src="/src/assets/logo.svg" alt="PopWatch" className="h-8" />
          </Link>
        </div>

        {/* The Outlet renders Login.jsx or Register.jsx here */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, type: "spring" }}
          className="w-full max-w-[420px]"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}