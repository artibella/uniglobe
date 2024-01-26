import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import { Button } from './Button';

export type ButtonProps = ComponentProps<{
  copy: string;
  link: Types.ProjectMapLink;
  style: Types.ButtonStyles;
  animationType?: Types.AnimationType;
}>;

registerUniformComponent({
  type: 'button',
  component: Button,
});

registerUniformComponent({
  type: 'buttonLocalized',
  component: Button,
});

export default Button;
