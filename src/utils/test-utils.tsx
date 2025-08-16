import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock theme provider for testing
const MockThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <div data-theme="light">{children}</div>;
};

// Custom render function with providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <MockThemeProvider>{children}</MockThemeProvider>
  );

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
};

// Utility functions for common test scenarios
export const renderWithUser = (ui: ReactElement, options?: RenderOptions) => {
  return {
    user: userEvent.setup(),
    ...render(ui, options),
  };
};

// Custom matchers for component testing
export const componentMatchers = {
  toHaveAttribute: (received: Element, attribute: string, value?: string) => {
    const hasAttribute = received.hasAttribute(attribute);
    const actualValue = received.getAttribute(attribute);
    
    if (!hasAttribute) {
      return {
        message: () => `Expected element to have attribute "${attribute}"`,
        pass: false,
      };
    }
    
    if (value !== undefined && actualValue !== value) {
      return {
        message: () => `Expected attribute "${attribute}" to have value "${value}", but got "${actualValue}"`,
        pass: false,
      };
    }
    
    return {
      message: () => `Expected element not to have attribute "${attribute}"`,
      pass: true,
    };
  },
};

// Re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };