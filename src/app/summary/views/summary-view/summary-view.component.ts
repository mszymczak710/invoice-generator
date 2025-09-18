import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CompanyInfoComponent } from '@company/components';

import { ItemsListComponent } from '@items/components';

@Component({
  selector: 'klg-summary-view',
  standalone: true,
  imports: [CompanyInfoComponent, ItemsListComponent],
  templateUrl: './summary-view.component.html',
  styleUrl: './summary-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryViewComponent {}
