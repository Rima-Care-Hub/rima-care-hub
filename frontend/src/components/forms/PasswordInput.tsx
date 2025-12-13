/**
 * Password Input Component
 * Extends Input with show/hide password toggle
 */

import * as React from 'react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

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

        {/* Input wrapper with toggle button */}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={cn(
              'flex h-12 w-full rounded-xl border bg-background px-4 py-3 pr-12',
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

          {/* Toggle visibility button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'p-1 rounded-md text-muted-foreground',
              'hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary',
              'transition-colors duration-200'
            )}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

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

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
