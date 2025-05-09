import { EnrichmentData } from '@uniformdev/context';
import { MouseEvent, ReactNode } from 'react';

export type ButtonProps = {
  href?: string;
  copy: ReactNode;
  style: Types.ButtonStyles;
  className?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
  animationType?: Types.AnimationType;
  clickTags?: EnrichmentData[];
};

export { default } from './Button';
