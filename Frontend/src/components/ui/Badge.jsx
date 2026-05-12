// src/components/ui/Badge.jsx
import { cn } from '@/utils/cn';

export default function Badge({ children, className }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-elevated text-text-secondary border border-border", className)}>
      {children}
    </span>
  );
}