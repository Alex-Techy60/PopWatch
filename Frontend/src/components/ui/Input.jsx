// src/components/ui/Input.jsx
import { forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(({ className, error, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full relative">
      <input
        ref={ref}
        type={inputType}
        className={cn(
          "flex w-full rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm",
          isPassword && "pr-11", // Make room for the eye icon
          error && "border-error focus:ring-error focus:border-error",
          className
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-3 top-[18px] text-text-secondary hover:text-primary transition-colors focus:outline-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
      {error && <p className="mt-1.5 text-xs text-error font-medium pl-1">{error.message}</p>}
    </div>
  );
});
Input.displayName = "Input";
export default Input;