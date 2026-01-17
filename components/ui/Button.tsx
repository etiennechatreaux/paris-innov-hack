import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          // Variants
          variant === 'primary' && 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90',
          variant === 'secondary' && 'bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--border)]',
          variant === 'outline' && 'border border-[var(--border)] bg-transparent hover:bg-[var(--accent)]',
          variant === 'ghost' && 'bg-transparent hover:bg-[var(--accent)]',
          // Sizes
          size === 'sm' && 'h-8 px-3 text-sm rounded-[var(--radius-sm)]',
          size === 'md' && 'h-10 px-4 text-sm rounded-[var(--radius)]',
          size === 'lg' && 'h-12 px-6 text-base rounded-[var(--radius)]',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
