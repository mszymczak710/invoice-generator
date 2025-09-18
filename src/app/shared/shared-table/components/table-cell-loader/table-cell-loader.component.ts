import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NumberCellComponent, TextCellComponent } from '@shared/shared-table/components/table-cells';
import { TableColumn, TableColumnTypes } from '@shared/shared-table/types';

@Component({
  selector: 'klg-table-cell-loader',
  standalone: true,
  imports: [CommonModule, NumberCellComponent, TextCellComponent],
  templateUrl: './table-cell-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellLoaderComponent {
  @Input() column: TableColumn;
  @Input() row: any;

  columnTypes = TableColumnTypes;
}
