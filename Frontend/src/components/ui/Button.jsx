// src/components/ui/Button.jsx
import { motion } from "framer-motion";

const Button = ({ children, variant = "primary", onClick, className = "", ...props }) => {
  const baseStyle = "px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center";
  
  const variants = {
    primary: "bg-primary hover:bg-primaryHover text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10",
    ghost: "bg-transparent text-textMuted hover:text-textMain hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;