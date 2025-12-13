/**
 * Accessible Input Component
 * Supports labels, error states, and ARIA attributes
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    // Generate unique IDs for accessibility
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="space-y-2">
        {/* Label */}
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none text-foreground"
        >
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>

        {/* Input field */}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-xl border bg-background px-4 py-3',
            'text-base ring-offset-background transition-all duration-200',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            // Error state styling
            error
              ? 'border-destructive focus-visible:ring-destructive'
              : 'border-input hover:border-primary/50',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? errorId : hint ? hintId : undefined
          }
          {...props}
        />

        {/* Hint text */}
        {hint && !error && (
          <p id={hintId} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
