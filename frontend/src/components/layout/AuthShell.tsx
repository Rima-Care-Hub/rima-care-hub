/**
 * Auth Shell Layout
 * Centered card layout for authentication screens
 */

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackLink?: boolean;
  backLinkTo?: string;
  backLinkText?: string;
  className?: string;
}

/**
 * Provides consistent layout for auth pages
 * Includes header, centered card, and optional back navigation
 */
export function AuthShell({
  children,
  title,
  subtitle,
  showBackLink = true,
  backLinkTo = '/',
  backLinkText = 'Back',
  className
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col">
      {/* Header with back navigation */}
      <header className="p-4">
        {showBackLink && (
          <Link
            to={backLinkTo}
            className={cn(
              'inline-flex items-center gap-2 text-sm text-muted-foreground',
              'hover:text-foreground transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            {backLinkText}
          </Link>
        )}
      </header>

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Logo and branding */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">CareConnect</span>
        </div>

        {/* Auth card */}
        <div
          className={cn(
            'w-full max-w-md bg-card rounded-2xl shadow-elegant p-8',
            'border border-border/50',
            className
          )}
        >
          {/* Title section */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground text-sm">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form content */}
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CareConnect. All rights reserved.
      </footer>
    </div>
  );
}
