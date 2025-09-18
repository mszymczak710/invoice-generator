import { Directive, Input } from '@angular/core';

import { TableColumn } from '@shared/shared-table/types';

@Directive()
export class TableCellComponentBase {
  @Input() column: TableColumn;
  @Input() row: any;

  getValue(): any {
    return this.row[this.column.name];
  }
}
