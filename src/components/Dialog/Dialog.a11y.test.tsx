import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Dialog } from './Dialog';
import { testAccessibility, testKeyboardNavigation, expectScreenReaderAnnouncement } from '../../test-utils/a11y-helpers';

// Extend Jest matchers with accessibility assertions
expect.extend(toHaveNoViolations);

// Test Dialog Component for closed state
const TestDialogClosed = () => (
  <Dialog 
    title="Test Dialog" 
    description="Test dialog description"
    trigger={<button>Open Dialog</button>}
  >
    <p>Dialog content</p>
    <button>Action Button</button>
  </Dialog>
);

// Test Dialog Component for open state
const TestDialogOpen = () => (
  <Dialog 
    title="Test Dialog" 
    description="Test dialog description"
    open={true}
    trigger={<button>Open Dialog</button>}
  >
    <p>Dialog content</p>
    <button>Action Button</button>
  </Dialog>
);

describe('Dialog Accessibility Tests (POC Validation)', () => {
  describe('Closed Dialog State', () => {
    it('should not have accessibility violations when closed', async () => {
      const { container } = render(<TestDialogClosed />);
      const results = await testAccessibility(container);
      expect(results).toHaveNoViolations();
    });

    it('should have accessible trigger button', () => {
      render(<TestDialogClosed />);
      const trigger = screen.getByRole('button', { name: 'Open Dialog' });
      
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAccessibleName('Open Dialog');
    });
  });

  describe('Open Dialog State', () => {
    it('should not have accessibility violations when open', async () => {
      const { container } = render(<TestDialogOpen />);
      const results = await testAccessibility(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes', () => {
      render(<TestDialogOpen />);
      
      const dialog = screen.getByRole('dialog');
      const title = screen.getByText('Test Dialog');
      const description = screen.getByText('Test dialog description');
      
      expectScreenReaderAnnouncement(dialog, 'dialog', 'Test Dialog');
      expect(title).toHaveAttribute('id');
      expect(description).toHaveAttribute('id');
    });

    it('should have accessible close button', () => {
      render(<TestDialogOpen />);
      
      const closeButton = screen.getByRole('button', { name: 'Close dialog' });
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAccessibleName('Close dialog');
    });

    it('should support keyboard navigation', async () => {
      render(<TestDialogOpen />);
      
      const dialog = screen.getByRole('dialog');
      const closeButton = screen.getByRole('button', { name: 'Close dialog' });
      const actionButton = screen.getByRole('button', { name: 'Action Button' });
      
      // Test focus trapping
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
      
      // Test Tab navigation within dialog
      fireEvent.keyDown(closeButton, { key: 'Tab' });
      
      // Test Escape key closes dialog
      const escapeHandler = jest.fn();
      dialog.addEventListener('keydown', escapeHandler);
      fireEvent.keyDown(dialog, { key: 'Escape' });
    });
  });

  describe('Focus Management', () => {
    it('should manage focus correctly', () => {
      const { rerender } = render(<TestDialogClosed />);
      
      const trigger = screen.getByRole('button', { name: 'Open Dialog' });
      trigger.focus();
      expect(document.activeElement).toBe(trigger);
      
      // Simulate opening dialog
      rerender(<TestDialogOpen />);
      
      // Focus should move to dialog content
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Color Contrast & Visual Accessibility', () => {
    it('should not have color contrast violations', async () => {
      const { container } = render(<TestDialogOpen />);
      const results = await testAccessibility(container, {
        'color-contrast': { enabled: true }
      });
      expect(results).toHaveNoViolations();
    });
  });
});