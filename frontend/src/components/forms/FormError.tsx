/**
 * Form Error Component
 * Displays form-level error messages with alert styling
 */

import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormErrorProps {
  message?: string;
  className?: string;
}

/**
 * Displays a prominent error message for form-level errors
 * Uses role="alert" for screen reader announcement
 */
export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={cn(
        'flex items-center gap-2 p-3 rounded-lg',
        'bg-destructive/10 border border-destructive/20',
        'text-sm text-destructive',
        className
      )}
    >
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
