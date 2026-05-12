// src/components/ui/Button.jsx
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className, isLoading, ...props }) {
  const baseClasses = "relative inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-text-primary hover:bg-primary-hover shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] px-4 py-2",
    ghost: "bg-transparent text-text-primary hover:bg-surface-elevated px-4 py-2",
    outline: "bg-transparent border border-border text-text-primary hover:bg-surface-elevated px-4 py-2",
    icon: "p-2 rounded-full hover:bg-surface-elevated text-text-secondary hover:text-text-primary",
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      className={cn(baseClasses, variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <span className="mr-2 animate-spin border-2 border-white/20 border-t-white rounded-full w-4 h-4" /> : null}
      {children}
    </motion.button>
  );
}