/**
 * Validation utility functions
 */

/**
 * Validate email format
 */
export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Check minimum length
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

/**
 * Check if value is not empty
 */
export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate phone number format (basic)
 */
export function isPhone(value: string): boolean {
  const phoneRegex = /^[\d\s\-+()]{10,}$/;
  return phoneRegex.test(value);
}

/**
 * Check if passwords match
 */
export function passwordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

/**
 * Validate password strength
 * Requires at least 8 characters
 */
export function isStrongPassword(value: string): boolean {
  return value.length >= 8;
}

/**
 * Form validation helper
 * Returns error messages for invalid fields
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateLoginForm(email: string, password: string): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(email)) {
    errors.email = 'Email is required';
  } else if (!isEmail(email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!isRequired(password)) {
    errors.password = 'Password is required';
  } else if (!minLength(password, 6)) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateSignupForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  phone: string
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(name)) {
    errors.name = 'Name is required';
  }

  if (!isRequired(email)) {
    errors.email = 'Email is required';
  } else if (!isEmail(email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!isRequired(password)) {
    errors.password = 'Password is required';
  } else if (!isStrongPassword(password)) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!isRequired(confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (!passwordsMatch(password, confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!isRequired(phone)) {
    errors.phone = 'Phone number is required';
  } else if (!isPhone(phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateForgotPasswordForm(email: string): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(email)) {
    errors.email = 'Email is required';
  } else if (!isEmail(email)) {
    errors.email = 'Please enter a valid email';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
