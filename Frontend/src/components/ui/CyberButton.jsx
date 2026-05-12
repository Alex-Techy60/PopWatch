// src/components/ui/CyberButton.jsx
import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";

const CyberButton = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyle = "w-full py-4 rounded-xl font-sans font-bold text-base uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden";
  
  const variants = {
    primary: "bg-textMain text-background hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]",
    outline: "bg-surfaceAccent border border-primary text-textMain hover:bg-surfaceAccent/60 hover:border-primaryGlow shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(232,121,249,0.4)]",
    ghost: "bg-transparent text-textMuted hover:text-textMain hover:bg-white/5 shadow-none",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      <FiZap className={`w-4 h-4 transition-colors ${variant === 'primary' ? 'text-background' : 'text-primaryGlow'}`} />
      <span>{children}</span>
    </motion.button>
  );
};

export default CyberButton;