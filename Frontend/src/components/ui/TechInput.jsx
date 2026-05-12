// src/components/ui/TechInput.jsx
import { forwardRef } from "react";
import { FiHash, FiMail, FiLock, FiAlertTriangle } from "react-icons/fi";

const iconMap = {
  text: FiHash,
  email: FiMail,
  password: FiLock,
};

const TechInput = forwardRef(({ label, error, type = "text", ...props }, ref) => {
  const Icon = iconMap[type] || FiHash;

  return (
    <div className="w-full flex flex-col font-tech">
      {label && (
        <label className="text-xs uppercase tracking-widest text-textMuted mb-2 px-1">
          {label}_DATA
        </label>
      )}
      <div className="relative flex items-center group">
        <Icon className="absolute left-4 w-4 h-4 text-primary group-focus-within:text-primaryGlow transition-colors" />
        <input
          ref={ref}
          type={type}
          className={`w-full font-mono pl-12 pr-4 py-3.5 bg-surface rounded-xl border border-primary/20 
          text-textMain placeholder:text-textMuted/60
          focus:outline-none focus:border-primaryGlow focus:ring-1 focus:ring-primaryGlow
          shadow-[0_0_10px_rgba(168,85,247,0.1)] group-focus-within:shadow-[0_0_20px_rgba(232,121,249,0.2)]
          transition-all duration-300 ${className} ${error ? "border-red-500/50" : ""}`}
          {...props}
        />
        {error && (
          <div className="absolute right-4 flex items-center gap-1 text-red-400 text-xs">
            <FiAlertTriangle className="w-4 h-4" />
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
});

TechInput.displayName = "TechInput";
export default TechInput;