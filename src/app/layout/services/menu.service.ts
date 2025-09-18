import { Injectable } from '@angular/core';

import { ClassExtender } from '@core/misc';

import { StringsLoader } from '@layout/misc';
import { MenuItem } from '@layout/types';

export interface MenuService extends StringsLoader {}

@Injectable()
@ClassExtender([StringsLoader])
export class MenuService {
  getMenuConfig(): MenuItem[] {
    return [
      {
        label: this.strings.menu.items,
        routerLink: ['/items']
      },
      {
        label: this.strings.menu.summary,
        routerLink: ['/summary']
      }
    ];
  }
}
