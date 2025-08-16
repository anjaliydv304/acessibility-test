// GlowingButton.tsx - Fixed with proper focus handling
import React from 'react';
import { GlowingButtonProps } from './types';
import { glowingButtonDefaults } from './defaults';
import { deepMerge } from '@/utils/deepMerge';

export const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  (props, ref) => {
    const mergedProps = deepMerge<GlowingButtonProps>(
      { ...glowingButtonDefaults },
      props
    );

    const {
      label,
      disabled,
      onClick = () => {},
      onFocus = () => {},
      onBlur = () => {},
      className = '',
      style,
      type = 'button',
      intensity = 'medium',
      'data-testid': dataTestId,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      children,
      ...rest
    } = mergedProps;

    const getGlowIntensity = (intensity: 'low' | 'medium' | 'high') => {
      const intensities = {
        low: 'shadow-md shadow-yellow-300/50',
        medium: 'shadow-lg shadow-yellow-400/60',
        high: 'shadow-xl shadow-yellow-500/80',
      };
      return intensities[intensity];
    };

    const baseClasses = [
      'px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold',
      'hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/70',
      'focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2',
      'disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-gray-300',
      'transition-all duration-300',
      getGlowIntensity(intensity),
      // Ensure button is focusable
      'focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2'
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

GlowingButton.displayName = 'GlowingButton';