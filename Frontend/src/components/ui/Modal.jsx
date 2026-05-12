// src/components/ui/Modal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-sm bg-black/60"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-surface rounded-xl border border-primary-glow shadow-[0_0_40px_rgba(124,58,237,0.15)] w-full max-w-md p-6 pointer-events-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                <Button variant="icon" onClick={onClose} aria-label="Close modal">
                  <X size={20} />
                </Button>
              </div>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}