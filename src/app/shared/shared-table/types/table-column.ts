import { TableColumnStyle } from './table-column-style';
import { TableColumnTypes } from './table-column-types';

export interface TableColumn {
  label: string;
  name: string;
  styles?: TableColumnStyle;
  type: TableColumnTypes;
}
