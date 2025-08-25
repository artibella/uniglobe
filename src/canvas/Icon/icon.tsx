import { FC } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';

export interface IconProps {
  icon?: string;
  size?: 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  strokeWidth?: 'default' | '1' | '2' | '3' | '4' | '5';
  color?: 'currentColor' | 'black' | 'white';
  className?: string;
}

const sizeMap: Record<string, number> = {
  default: 48,
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
  xxl: 96,
};

const strokeWidthMap: Record<string, number> = {
  default: 2,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
};

const colorMap: Record<string, string> = {
  currentColor: 'text-current',
  black: 'text-black',
  white: 'text-white',
};

export const Icon: FC<IconProps> = ({
  icon,
  size = 'default',
  strokeWidth = 'default',
  color = 'currentColor',
  className = '',
}) => {
  if (!icon) return null;

  console.log('icon', icon);
  const iconName = icon;
  const iconSize = sizeMap[size];
  const iconStrokeWidth = strokeWidthMap[strokeWidth];
  const iconColor = colorMap[color];

  try {
    return (
      <DynamicIcon
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={iconName as any}
        className={`${className} ${iconColor}`}
        size={iconSize}
        strokeWidth={iconStrokeWidth}
      />
    );
  } catch {
    return null;
  }
};
