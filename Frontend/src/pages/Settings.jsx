// src/pages/Settings.jsx
import { motion } from 'framer-motion';
export default function Settings() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <p className="text-text-secondary">Profile settings implementation here.</p>
    </motion.div>
  );
}