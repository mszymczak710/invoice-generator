import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ItemsService } from '@items/services/items.service';
import { Item } from '@items/types';

@Injectable()
export class ItemsFacade {
  get items(): Item[] {
    return this.itemsService.items;
  }

  constructor(private itemsService: ItemsService) {}

  getItems(): Observable<Item[]> {
    return this.itemsService.getItems();
  }

  setItems(items: Item[]): void {
    return this.itemsService.setItems(items);
  }
}
