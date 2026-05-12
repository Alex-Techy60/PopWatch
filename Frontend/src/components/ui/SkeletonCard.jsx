// src/components/ui/SkeletonCard.jsx
import { motion } from 'framer-motion';

export default function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <motion.div 
        className="w-full aspect-video rounded-xl bg-surface-elevated"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
      <div className="flex gap-3">
        <motion.div 
          className="w-10 h-10 rounded-full bg-surface-elevated shrink-0"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
        />
        <div className="flex flex-col gap-2 w-full">
          <motion.div className="h-4 bg-surface-elevated rounded w-[90%]" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.1 }} />
          <motion.div className="h-3 bg-surface-elevated rounded w-[60%]" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} />
        </div>
      </div>
    </div>
  );
}