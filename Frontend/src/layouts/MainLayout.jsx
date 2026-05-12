// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-textMain font-sans flex flex-col">
      {/* <Navbar /> Goes here */}
      
      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar /> Goes here */}
        
        <motion.main 
          className="flex-1 p-6 overflow-y-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Outlet /> {/* This is where your routed pages will inject */}
        </motion.main>
      </div>
    </div>
  );
};

export default MainLayout;