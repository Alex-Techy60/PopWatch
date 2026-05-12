// src/components/ui/Input.jsx
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={cn(
          "flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-shadow",
          error && "border-error focus:ring-error",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error">{error.message}</p>}
    </div>
  );
});
Input.displayName = "Input";
export default Input;