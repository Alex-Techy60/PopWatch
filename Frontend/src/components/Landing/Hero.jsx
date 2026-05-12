// src/components/Landing/Hero.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { continueAsGuest } from "../../features/auth/authSlice";
import CyberButton from "../ui/CyberButton";

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGuest = () => {
    dispatch(continueAsGuest());
    navigate("/");
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          ENTER THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryGlow to-primary drop-shadow-[0_0_40px_rgba(232,121,249,0.5)]">NEXUS.</span>
        </h1>
        
        <p className="text-lg font-tech text-textMuted mb-10 max-w-2xl mx-auto leading-relaxed uppercase tracking-wide">
          Secure streaming protocol initialized. Built for operators, designed for viewers. Authenticate to sync node history or bypass as guest.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-md mx-auto">
          <CyberButton onClick={() => navigate("/login")} variant="primary">
            AUTHORIZE
          </CyberButton>
          
          <CyberButton onClick={() => navigate("/register")} variant="outline">
            DEPLOY NODE
          </CyberButton>
        </div>

        <div className="mt-12">
          <button 
            className="text-xs font-tech text-textMuted hover:text-primaryGlow transition-colors tracking-widest uppercase border-b border-transparent hover:border-primaryGlow pb-1"
            onClick={handleGuest} 
          >
            &gt;_ BYPASS_AS_GUEST
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;