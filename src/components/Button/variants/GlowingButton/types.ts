import { BaseButtonProps } from '../../types';

export interface GlowingButtonProps extends BaseButtonProps {
  variant?: 'glowing';
  intensity?: 'low' | 'medium' | 'high';
  className?: string; // Add this line

}
