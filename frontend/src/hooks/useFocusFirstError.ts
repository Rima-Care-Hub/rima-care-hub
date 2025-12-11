/**
 * useFocusFirstError Hook
 * Automatically focuses the first field with an error
 */

import { useEffect, useRef } from 'react';

/**
 * Focus the first form field that has an error
 * @param errors - Object with field names as keys and error messages as values
 * @param shouldFocus - Whether to trigger focus (usually after form submission)
 */
export function useFocusFirstError(
  errors: Record<string, string>,
  shouldFocus: boolean
): void {
  const hasFocused = useRef(false);

  useEffect(() => {
    // Only focus once per submission attempt
    if (!shouldFocus || hasFocused.current) return;

    const errorFields = Object.keys(errors);
    if (errorFields.length === 0) {
      hasFocused.current = false;
      return;
    }

    // Find the first field with an error
    const firstErrorField = errorFields[0];
    const element = document.getElementById(
      `input-${firstErrorField.toLowerCase().replace(/\s+/g, '-')}`
    ) || document.querySelector(`[name="${firstErrorField}"]`);

    if (element instanceof HTMLElement) {
      element.focus();
      hasFocused.current = true;
    }
  }, [errors, shouldFocus]);

  // Reset focus flag when errors change
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      hasFocused.current = false;
    }
  }, [errors]);
}

/**
 * Alternative version that returns a ref callback
 * Useful when you need more control over which element to focus
 */
export function useFocusOnError() {
  const errorRefs = useRef<Map<string, HTMLElement>>(new Map());

  const setErrorRef = (fieldName: string) => (el: HTMLElement | null) => {
    if (el) {
      errorRefs.current.set(fieldName, el);
    } else {
      errorRefs.current.delete(fieldName);
    }
  };

  const focusFirstError = (errorFields: string[]) => {
    for (const field of errorFields) {
      const el = errorRefs.current.get(field);
      if (el) {
        el.focus();
        break;
      }
    }
  };

  return { setErrorRef, focusFirstError };
}
