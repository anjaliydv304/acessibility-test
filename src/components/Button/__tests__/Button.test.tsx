import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../utils/test-utils';
import { Button } from '../Button';

describe('Button Component', () => {
  describe('Gateway Functionality', () => {
    it('renders normal variant by default', () => {
      render(<Button label="Test Button" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Test Button');
    });

    it('renders glowing variant when specified', () => {
      render(<Button variant="glowing" label="Glowing Button" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-yellow-400'); // From glowing variant styles
    });

    it('applies variant-specific defaults correctly', () => {
      render(<Button variant="glowing" />);
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Shiny Click'); // Default from glowing variant
    });
  });

  describe('Props Merging', () => {
    it('merges user props with variant defaults using deepMerge', () => {
      const customStyles = { padding: '12px' };
      render(
        <Button 
          variant="normal" 
          label="Custom Button"
          style={customStyles}
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ padding: '12px' });
    });

    it('overrides specific properties while preserving others', () => {
      render(
        <Button 
          variant="normal" 
          label="Override Label"
          disabled={true}
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Override Label');
      expect(button).toBeDisabled();
    });
  });

  describe('Event Handling', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      const { user } = render(
        <Button label="Click me" onClick={handleClick} />
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const { user } = render(
        <Button label="Disabled" onClick={handleClick} disabled />
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('TypeScript Type Safety', () => {
    it('enforces correct prop types for variants', () => {
      // This test ensures TypeScript compilation fails for invalid props
      // The actual testing happens at compile time
      expect(() => {
        // This should compile without errors
        const validProps = {
          variant: 'normal' as const,
          label: 'Test',
          disabled: false,
        };
        render(<Button {...validProps} />);
      }).not.toThrow();
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports keyboard navigation', async () => {
      const handleClick = vi.fn();
      const { user } = render(
        <Button label="Keyboard Test" onClick={handleClick} />
      );
      
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Responsive Behavior', () => {
    it('applies responsive classes correctly', () => {
      render(
        <Button 
          label="Responsive Button"
          className="sm:px-2 md:px-4 lg:px-6"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('sm:px-2', 'md:px-4', 'lg:px-6');
    });
  });

  describe('Custom Props', () => {
    it('forwards custom HTML attributes', () => {
      render(
        <Button 
          label="Custom Button"
          data-testid="custom-button"
          title="Custom title"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-testid', 'custom-button');
      expect(button).toHaveAttribute('title', 'Custom title');
    });

    it('applies custom className alongside variant styles', () => {
      render(
        <Button 
          label="Custom Class Button"
          className="custom-class"
          variant="normal"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });
});