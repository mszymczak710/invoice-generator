import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { delay } from 'rxjs';

import { SpinnerComponent } from '@core/components';
import { ClassExtender } from '@core/misc';

import { ItemsListHelperService } from '@items/components/items-list/items-list-helper.service';
import { StringsLoader } from '@items/misc';
import { ItemsFacade, ItemsService } from '@items/services';
import { Item } from '@items/types';

import { TableCellLoaderComponent } from '@shared/shared-table/components';
import { TableColumn } from '@shared/shared-table/types';

export interface ItemsListComponent extends StringsLoader {}

@Component({
  selector: 'klg-items-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, SpinnerComponent, TableCellLoaderComponent],
  templateUrl: './items-list.component.html',
  providers: [ItemsFacade, ItemsService, ItemsListHelperService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@ClassExtender([StringsLoader])
export class ItemsListComponent implements OnInit {
  columns: TableColumn[] = [];
  displayedColumns: string[] = [];

  data: Item[] = [];

  loading = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private itemsFacade: ItemsFacade,
    private itemsListHelperService: ItemsListHelperService
  ) {}

  ngOnInit(): void {
    this.initColumns();
    this.setDisplayedColumnsNames();
    this.getData();
  }

  private initColumns(): void {
    this.columns = this.itemsListHelperService.getColumns();
  }

  protected setDisplayedColumnsNames(): void {
    this.displayedColumns = this.columns.map(col => col.name);
  }

  private getData(): void {
    this.loading = true;
    this.itemsFacade
      .getItems()
      // Added artificial delay to ensure the loading spinner is visible
      // and to better reflect the real-world application state.
      // Note: This is not a best practice for production code and should
      // only be used for demonstration or testing purposes.
      .pipe(delay(300))
      .subscribe({
        next: data => {
          this.data = data;
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
  }

  getTotalAmount(): number {
    return this.data.reduce((sum, item) => {
      return sum + (item.count ?? 0) * (item.price ?? 0);
    }, 0);
  }
}
