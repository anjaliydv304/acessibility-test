import { BaseComponentProps } from '@/types/global';

export interface BaseButtonProps extends BaseComponentProps {
  label?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export interface ButtonVariants {
  normal: BaseButtonProps;
  glowing: BaseButtonProps;
}

export interface ButtonProps extends BaseButtonProps {
  variant?: keyof ButtonVariants;
  className?: string

}
