// src/components/ui/Avatar.jsx
import { cn } from '@/utils/cn';

export default function Avatar({ src, alt, size = 'md', className, onClick }) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <img
      src={src || 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback'}
      alt={alt || "Avatar"}
      onClick={onClick}
      className={cn(
        "rounded-full object-cover border border-border bg-surface",
        sizes[size],
        onClick && "cursor-pointer hover:ring-2 hover:ring-primary transition-all",
        className
      )}
    />
  );
}