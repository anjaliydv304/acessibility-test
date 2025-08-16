import { ComponentProps, ReactNode } from 'react';

// Base component props that all components should extend
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

// Animation configuration
export interface AnimationConfig {
  enabled?: boolean;
  duration?: number;
  easing?: string;
  delay?: number;
}

// Responsive breakpoints
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

// Design token system types
export interface DesignTokens {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  animations: Record<string, AnimationConfig>;
}

// Component variant system
export interface VariantProps<T extends Record<string, any>> {
  variant?: keyof T;
}

// Utility type for extracting component props
export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : never;

// Utility type for making certain props required
export type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Utility type for component polymorphism
export type AsProps<T extends React.ElementType = React.ElementType> = {
  as?: T;
} & Omit<ComponentProps<T>, 'as'>;