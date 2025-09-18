import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TableCellComponentBase } from '@shared/shared-table/misc';

@Component({
  selector: 'klg-number-cell',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './number-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberCellComponent extends TableCellComponentBase {}
