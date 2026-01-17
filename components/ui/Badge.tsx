import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-[var(--radius-full)]',
          variant === 'default' && 'bg-[var(--primary)] text-[var(--primary-foreground)]',
          variant === 'secondary' && 'bg-[var(--accent)] text-[var(--accent-foreground)]',
          variant === 'outline' && 'border border-[var(--border)] text-[var(--muted)]',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
