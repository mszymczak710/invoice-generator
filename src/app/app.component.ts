import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LayoutComponent } from '@layout/views';

@Component({
  selector: 'klg-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
