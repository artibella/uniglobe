import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import GridItem from './GridItem';

export type GridItemProps = ComponentProps<{
  columnSpan?: number | Types.AvailableColumnCount;
  columnStart?: Types.AvailableColumnCount;
  rowSpan?: number | Types.AvailableRowCount;
  rowStart?: Types.AvailableRowCount;
}>;

registerUniformComponent({
  type: 'gridItem',
  component: GridItem,
});

export default GridItem;
