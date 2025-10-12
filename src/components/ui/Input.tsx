import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  autoComplete?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, icon, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-left text-[var(--foreground)] dark:text-[var(--foreground)]"
          >
            {label}
          </label>
        )}

        <div className="flex items-center w-full border rounded-sm bg-[var(--card)] border-[var(--placeholder)] focus-within:ring-2 focus-within:ring-[var(--primary)] focus-within:border-transparent transition-colors duration-200">
          <input
            id={inputId}
            autoComplete={props.autoComplete ?? 'off'}
            className={cn(
              'flex-1 h-10 px-4 text-base bg-transparent border-none',
              'text-[var(--foreground)] dark:text-[var(--foreground)]',
              'placeholder:text-[var(--placeholder)] dark:placeholder:text-[var(--placeholder)]',
              'focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            ref={ref}
            {...props}
          />
          {icon && (
            <div className="flex items-center px-3 pointer-events-auto">
              {icon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={cn(
              'text-xs',
              error
                ? 'text-error-600 dark:text-error-400'
                : 'text-[var(--secondary)]/60 dark:text-[var(--secondary)]/40'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
