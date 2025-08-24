import { registerUniformComponent } from '@uniformdev/canvas-react';
import { Icon } from './icon';

registerUniformComponent({
  type: 'icon',
  component: Icon,
});

export { Icon } from './icon';
export type { IconProps } from './icon';

export default Icon;
