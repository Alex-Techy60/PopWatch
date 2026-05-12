// src/components/ui/Input.jsx
import { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-300 ml-1">{label}</label>}
      <input
        ref={ref}
        className={`w-full px-4 py-3 bg-[#0f0722] rounded-xl border ${
          error ? "border-red-500/50 focus:ring-red-500/20" : "border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20"
        } text-white focus:outline-none focus:ring-2 transition-all ${className}`}
        {...props}
      />
      {error && <span className="text-red-400 text-xs ml-1">{error.message}</span>}
    </div>
  );
});

Input.displayName = "Input";
export default Input;