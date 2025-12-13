/**
 * Forgot Password Page
 * Email-based password reset request
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { AuthShell } from '@/components/layout/AuthShell';
import { Input } from '@/components/forms/Input';
import { FormError } from '@/components/forms/FormError';
import { Button } from '@/components/ui/button';
import { forgotPassword } from '@/api/auth';
import { validateForgotPasswordForm } from '@/utils/validators';
import { useFocusFirstError } from '@/hooks/useFocusFirstError';

export default function ForgotPasswordPage() {
  // Form state
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Focus first error field after submission
  useFocusFirstError(errors, hasSubmitted);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setHasSubmitted(true);

    // Validate form
    const validation = validateForgotPasswordForm(email);
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      await forgotPassword({ email });
      // Always show success for security (don't reveal if email exists)
      setIsSuccess(true);
    } catch (error: unknown) {
      // Even on error, show success message for security
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <AuthShell
        title="Check Your Email"
        showBackLink={false}
      >
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </div>

          <p className="text-muted-foreground">
            If an account exists for <strong className="text-foreground">{email}</strong>, 
            you will receive an email with instructions to reset your password.
          </p>

          <div className="pt-4 space-y-3">
            <Button
              variant="gradient"
              size="lg"
              className="w-full h-12"
              onClick={() => {
                setIsSuccess(false);
                setEmail('');
              }}
            >
              Try another email
            </Button>

            <Link
              to="/login"
              className="block text-center text-sm text-primary hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Reset Password"
      subtitle="Enter your email to receive reset instructions"
      backLinkTo="/login"
      backLinkText="Back to login"
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

        {/* Submit button */}
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full h-12"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </Button>

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
