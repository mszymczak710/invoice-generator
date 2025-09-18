import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuComponent } from '@layout/components';
import { FooterComponent } from '@layout/components/footer/footer.component';

@Component({
  selector: 'klg-layout',
  standalone: true,
  imports: [FooterComponent, MenuComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {}
