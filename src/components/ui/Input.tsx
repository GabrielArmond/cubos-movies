import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-secondary-700 dark:text-secondary-300"
          >
            {label}
          </label>
        )}
        
        <input
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-lg border px-3 py-2 text-sm',
            'bg-white dark:bg-secondary-900',
            'border-secondary-300 dark:border-secondary-700',
            'text-secondary-900 dark:text-secondary-100',
            'placeholder:text-secondary-500 dark:placeholder:text-secondary-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            error && 'border-error-500 focus:ring-error-500',
            className
          )}
          ref={ref}
          {...props}
        />
        
        {(error || helperText) && (
          <p
            className={cn(
              'text-xs',
              error ? 'text-error-600 dark:text-error-400' : 'text-secondary-600 dark:text-secondary-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }