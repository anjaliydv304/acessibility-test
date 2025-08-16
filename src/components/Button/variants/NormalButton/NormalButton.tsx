// NormalButton.tsx - Fixed with proper focus handling
import React from 'react';
import { NormalButtonProps } from './types';
import { normalButtonDefaults } from './defaults';
import { deepMerge } from '@/utils/deepMerge';

export const NormalButton = React.forwardRef<HTMLButtonElement, NormalButtonProps>(
  (props, ref) => {
    const mergedProps = deepMerge<NormalButtonProps>(
      { ...normalButtonDefaults },
      props
    );

    const {
      label,
      disabled,
      onClick,
      onFocus,
      onBlur,
      className = '',
      style,
      type = 'button',
      'data-testid': dataTestId,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      children,
      ...rest
    } = mergedProps;

    const baseClasses = [
      'px-4 py-2 rounded bg-blue-500 text-white',
      'hover:bg-blue-600',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300',
      'transition-colors duration-200',
      // Ensure button is focusable
      'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
    ].join(' ');
    
    const combinedClassName = `${baseClasses} ${className}`.trim();

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        className={combinedClassName}
        style={style}
        data-testid={dataTestId || 'button'}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        tabIndex={disabled ? -1 : 0} // Explicit tabIndex
        {...rest}
      >
        {label || children}
      </button>
    );
  }
);

NormalButton.displayName = 'NormalButton';