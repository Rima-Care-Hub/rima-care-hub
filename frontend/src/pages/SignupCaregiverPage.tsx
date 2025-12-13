/**
 * Signup Caregiver Page
 * Registration form for new caregivers
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '@/components/layout/AuthShell';
import { Input } from '@/components/forms/Input';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { FormError } from '@/components/forms/FormError';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { validateSignupForm } from '@/utils/validators';
import { useFocusFirstError } from '@/hooks/useFocusFirstError';

export default function SignupCaregiverPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Focus first error field after submission
  useFocusFirstError(errors, hasSubmitted);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error on change
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setHasSubmitted(true);

    // Validate form
    const validation = validateSignupForm(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword,
      formData.phone
    );
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signup(formData);

      if (result.success) {
        navigate('/dashboard', { replace: true });
      } else {
        setFormError(result.error || 'Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Create Account"
      subtitle="Join CareConnect as a caregiver"
      backLinkTo="/login"
      backLinkText="Back to login"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Form-level error */}
        <FormError message={formError} />

        {/* Name field */}
        <Input
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter your full name"
          autoComplete="name"
          required
        />

        {/* Email field */}
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
          autoComplete="email"
          required
        />

        {/* Phone field */}
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="Enter your phone number"
          autoComplete="tel"
          required
        />

        {/* Password field */}
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Create a password"
          hint="Must be at least 8 characters"
          autoComplete="new-password"
          required
        />

        {/* Confirm password field */}
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          autoComplete="new-password"
          required
        />

        {/* Submit button */}
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full h-12 mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </Button>

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
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
