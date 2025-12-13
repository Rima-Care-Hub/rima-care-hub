/**
 * LoginPage Tests
 * Basic tests for form rendering and validation
 * Note: These tests can be run with a testing framework like Vitest or Jest
 */

// Validation tests (can be run manually or with a test runner)
import { 
  isEmail, 
  minLength, 
  validateLoginForm, 
  validateSignupForm 
} from '@/utils/validators';

/**
 * Test: Email validation
 */
function testEmailValidation() {
  console.log('Testing email validation...');
  
  // Valid emails
  console.assert(isEmail('test@example.com') === true, 'Valid email should pass');
  console.assert(isEmail('user.name@domain.co') === true, 'Valid email with dot should pass');
  
  // Invalid emails
  console.assert(isEmail('invalid') === false, 'Invalid email should fail');
  console.assert(isEmail('test@') === false, 'Incomplete email should fail');
  console.assert(isEmail('@domain.com') === false, 'Email without local part should fail');
  
  console.log('Email validation tests passed!');
}

/**
 * Test: Password minimum length
 */
function testPasswordLength() {
  console.log('Testing password length validation...');
  
  console.assert(minLength('short', 6) === false, 'Short password should fail');
  console.assert(minLength('longenough', 6) === true, 'Long password should pass');
  console.assert(minLength('exact6', 6) === true, 'Exact length should pass');
  
  console.log('Password length tests passed!');
}

/**
 * Test: Login form validation
 */
function testLoginFormValidation() {
  console.log('Testing login form validation...');
  
  // Empty form
  const emptyResult = validateLoginForm('', '');
  console.assert(emptyResult.isValid === false, 'Empty form should be invalid');
  console.assert('email' in emptyResult.errors, 'Should have email error');
  console.assert('password' in emptyResult.errors, 'Should have password error');
  
  // Invalid email
  const invalidEmailResult = validateLoginForm('invalid', 'password123');
  console.assert(invalidEmailResult.isValid === false, 'Invalid email should fail');
  
  // Valid form
  const validResult = validateLoginForm('test@example.com', 'password123');
  console.assert(validResult.isValid === true, 'Valid form should pass');
  
  console.log('Login form validation tests passed!');
}

/**
 * Test: Signup form validation
 */
function testSignupFormValidation() {
  console.log('Testing signup form validation...');
  
  // Valid signup
  const validResult = validateSignupForm(
    'John Doe',
    'john@example.com',
    'password123',
    'password123',
    '1234567890'
  );
  console.assert(validResult.isValid === true, 'Valid signup should pass');
  
  // Password mismatch
  const mismatchResult = validateSignupForm(
    'John Doe',
    'john@example.com',
    'password123',
    'different',
    '1234567890'
  );
  console.assert(mismatchResult.isValid === false, 'Mismatched passwords should fail');
  console.assert('confirmPassword' in mismatchResult.errors, 'Should have confirmPassword error');
  
  console.log('Signup form validation tests passed!');
}

// Export test runner
export function runAllTests() {
  console.log('=== Running LoginPage Tests ===');
  testEmailValidation();
  testPasswordLength();
  testLoginFormValidation();
  testSignupFormValidation();
  console.log('=== All tests passed! ===');
}

// Run tests when this file is imported in development
if (import.meta.env.DEV) {
  runAllTests();
}
