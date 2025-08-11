import { axe } from 'jest-axe';

// Helper function for consistent accessibility testing
export const testAccessibility = async (container, customRules = {}) => {
  const results = await axe(container, {
    rules: {
      ...customRules,
    },
  });
  return results;
};

// Helper to test keyboard navigation
export const testKeyboardNavigation = async (element) => {
  // Simulate Tab key navigation
  element.focus();
  expect(document.activeElement).toBe(element);
  
  // Test Enter key activation
  const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
  element.dispatchEvent(enterEvent);
  
  // Test Escape key (for dialogs)
  const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
  document.dispatchEvent(escapeEvent);
};

// Helper for screen reader announcements testing
export const expectScreenReaderAnnouncement = (element, expectedRole, expectedLabel) => {
  expect(element).toHaveAttribute('role', expectedRole);
  if (expectedLabel) {
    expect(element).toHaveAccessibleName(expectedLabel);
  }
};