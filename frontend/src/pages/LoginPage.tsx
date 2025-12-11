/**
 * Login Page
 * Email and password authentication with validation
 */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthShell } from '@/components/layout/AuthShell';
import { Input } from '@/components/forms/Input';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { FormError } from '@/components/forms/FormError';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { validateLoginForm } from '@/utils/validators';
import { useFocusFirstError } from '@/hooks/useFocusFirstError';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Focus first error field after submission
  useFocusFirstError(errors, hasSubmitted);

  // Get redirect URL from location state (set by ProtectedRoute)
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setHasSubmitted(true);

    // Validate form
    const validation = validateLoginForm(email, password);
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login({ email, password });

      if (result.success) {
        // Redirect to intended page or dashboard
        navigate(from, { replace: true });
      } else {
        setFormError(result.error || 'Invalid email or password');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Sign in to your CareConnect account"
      backLinkTo="/"
      backLinkText="Back to home"
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Form-level error */}
        <FormError message={formError} />

        {/* Email field */}
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="Enter your email"
          autoComplete="email"
          required
        />

        {/* Password field */}
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        {/* Forgot password link */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full h-12"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>

        {/* Sign up link */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/signup-caregiver"
            className="text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
            Create account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
