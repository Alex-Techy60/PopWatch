// src/components/Landing/DataOverlay.jsx
import { motion } from "framer-motion";

const nodes = [
  { label: "Suggu_Backup", status: "ONLINE", data: "128_kb" },
  { label: "CinnamonGirl_Node", status: "STREAMING", data: "2.1_Mbps" },
  { label: "FedoraProject", status: "SYNCING", data: "0.5_Mbps" },
  { label: "Suggu_Backend", status: "DEPLOYED", data: "8000_port" },
];

const DataOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none p-10 font-tech uppercase tracking-widest hidden lg:block">
      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="text-textMuted text-xs flex justify-between"
      >
        <span>GLOBAL_ACCESS::[127.0.0.1:5173]</span>
        <span>VIDSTREAM_NEXUS::[ACTIVE]</span>
      </motion.div>

      {/* Node Map (Left Sidebar) */}
      <div className="absolute top-1/4 left-10 flex flex-col gap-6">
        <span className="text-primaryGlow font-sans text-sm mb-2 font-bold">//NETWORK_NODES</span>
        {nodes.map((node, i) => (
          <motion.div 
            key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 + i * 0.1 }}
            className="flex flex-col gap-1 text-xs border-l border-primary/20 pl-4 py-1"
          >
            <span className="text-textMain">{node.label}</span>
            <span className="text-accent">{node.data}</span>
            <span className={node.status === 'ONLINE' ? 'text-textData' : 'text-primary'}>::{node.status}::</span>
          </motion.div>
        ))}
      </div>
      
      {/* Dynamic Data Readout (Bottom Right) */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-10 right-10 flex flex-col text-right text-xs gap-2"
      >
        <span className="text-textMuted">BUFFERING_POOL::[512_MB]</span>
        <span className="text-textMuted">TRANSFORM_VITE_NEXUS::[0_errors]</span>
        <span className="text-primaryGlow">//AUTHORIZING_ACCESS::AUTHSLICE</span>
      </motion.div>
    </div>
  );
};

export default DataOverlay;