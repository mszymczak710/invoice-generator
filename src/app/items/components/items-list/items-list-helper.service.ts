import { Injectable } from '@angular/core';

import { ClassExtender } from '@core/misc';

import { StringsLoader } from '@items/misc';

import { ListHelper } from '@shared/shared-table/misc';
import { TableColumn, TableColumnTypes } from '@shared/shared-table/types';

export interface ItemsListHelperService extends StringsLoader {}

@Injectable()
@ClassExtender([StringsLoader])
export class ItemsListHelperService {
  itemsStrings = this.strings.item;

  getColumns(): TableColumn[] {
    return [
      ListHelper.getColumnDef('name', TableColumnTypes.TEXT, this.itemsStrings),
      ListHelper.getColumnDef('price', TableColumnTypes.NUMBER, this.itemsStrings),
      ListHelper.getColumnDef('count', TableColumnTypes.NUMBER, this.itemsStrings)
    ];
  }
}
