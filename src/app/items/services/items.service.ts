import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Item } from '@items/types';

@Injectable()
export class ItemsService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly STORAGE_KEY = 'items';
  private readonly items$ = new BehaviorSubject<Item[]>(this.loadItemsFromStorage());

  get items(): Item[] {
    return this.items$.getValue();
  }

  getItems(): Observable<Item[]> {
    return this.items$.asObservable();
  }

  setItems(items: Item[]): void {
    const normalized = items.map(i => (i instanceof Item ? i : new Item(i)));
    this.items$.next(normalized);
    this.storeItems(normalized);
  }

  private loadItemsFromStorage(): Item[] {
    try {
      const rawData = sessionStorage.getItem(this.STORAGE_KEY);
      if (!rawData) {
        return [];
      }
      const items = JSON.parse(rawData);
      if (!Array.isArray(items)) {
        return [];
      }
      return items.map((item: Partial<Item>) => new Item(item));
    } catch (error) {
      console.error('[ERROR] Failed to read items from sessionStorage:', error);
      return [];
    }
  }

  private storeItems(items: Item[]): void {
    try {
      const flatData = items.map(({ name, count, price }) => ({ name, count, price }));
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(flatData));
    } catch (error) {
      console.error('[ERROR] Failed to save items to sessionStorage:', error);
    }
  }
}
