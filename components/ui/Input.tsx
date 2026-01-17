import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-10 px-3 text-sm bg-white border border-[var(--border)] rounded-[var(--radius-sm)]',
            'placeholder:text-[var(--muted-foreground)]',
            'transition-colors duration-200',
            'hover:border-[var(--muted)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-1',
            error && 'border-[var(--destructive)] focus:ring-[var(--destructive)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-[var(--destructive)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
