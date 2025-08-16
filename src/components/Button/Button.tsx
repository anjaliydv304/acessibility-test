import React from 'react';
import { ButtonProps, ButtonVariants } from './types';
import { NormalButton } from './variants/NormalButton/NormalButton';
import { GlowingButton } from './variants/GlowingButton/GlowingButton';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'normal', ...props }, ref) => {
    const variantMap: Record<keyof ButtonVariants, React.ComponentType<any>> = {
      normal: NormalButton,
      glowing: GlowingButton,
    };

    const VariantComponent = variantMap[variant] || NormalButton;

    return <VariantComponent ref={ref} variant={variant} {...props} />;
  }
);

Button.displayName = 'Button';

// Export types for consumers
export type { ButtonProps, ButtonVariants } from './types';
export type { NormalButtonProps } from './variants/NormalButton/types';
export type { GlowingButtonProps } from './variants/GlowingButton/types';
