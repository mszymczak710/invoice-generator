import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { ClassExtender } from '@core/misc';

import { environmentBase } from '@environments/environment-base';

import { StringsLoader } from '@layout/misc';
import { MenuService } from '@layout/services';
import { MenuItem } from '@layout/types';

export interface MenuComponent extends StringsLoader {}

@Component({
  selector: 'klg-menu',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatToolbarModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  providers: [MenuService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@ClassExtender([StringsLoader])
export class MenuComponent {
  constructor(private menuService: MenuService) {}

  get appName(): string {
    return environmentBase.appName;
  }

  get menuItems(): MenuItem[] {
    return this.menuService.getMenuConfig();
  }
}
