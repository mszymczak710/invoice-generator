import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TableCellComponentBase } from '@shared/shared-table/misc';

@Component({
  selector: 'klg-text-cell',
  standalone: true,
  templateUrl: './text-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextCellComponent extends TableCellComponentBase {}
