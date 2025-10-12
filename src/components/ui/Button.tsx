import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'inline-flex items-center justify-center gap-2 ',
      'font-medium rounded-[2px] transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'transform-gpu active:scale-95 cursor-pointer',
    ];

    const variants = {
      primary: [
        'bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]',
        'text-[var(--foreground)] shadow-md hover:shadow-lg',
        'focus-visible:ring-ring',
      ],
      secondary: [
        'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] active:bg-[var(--secondary-active)]',
        'text-[var(--secondary-foreground)] shadow-sm hover:shadow-md',
        'focus-visible:ring-ring',
      ],
      link: [
        'bg-transparent border-none shadow-none p-0',
        'text-[var(--primary)] underline underline-offset-2',
        'hover:text-[var(--primary-hover)] hover:bg-transparent',
        'focus-visible:ring-0',
      ],
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    };

    return (
      <button
        className={cn(
          ...baseStyles,
          ...variants[variant],
          sizes[size],
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
