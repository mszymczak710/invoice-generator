import { TableColumn, TableColumnTypes } from '@shared/shared-table/types';

export class ListHelper {
  static getColumnDef(name: string, type: TableColumnTypes, strings: { [key: string]: any }, options?: Partial<TableColumn>): TableColumn {
    const defaultColumnOptions = this.getDefaultColumnOptions(type);
    const label = this.getLabel(name, strings);

    return {
      ...defaultColumnOptions,
      ...options,
      label,
      name,
      styles: {
        ...(defaultColumnOptions.styles ?? {}),
        ...(options?.styles ?? {})
      },
      type
    } as TableColumn;
  }

  static getLabel(columnName: string, strings: { [key: string]: any }): string | null {
    if (!strings || typeof strings !== 'object') {
      return null;
    }

    let value = strings;

    const path = columnName.split('__');

    for (const key of path) {
      if (value && typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, key)) {
        value = value[key];
      } else {
        return columnName;
      }
    }

    return typeof value === 'string' ? value : columnName;
  }

  private static getDefaultColumnOptions(type: TableColumnTypes): Partial<TableColumn> {
    switch (type) {
      case TableColumnTypes.NUMBER:
        return {
          styles: {
            alignment: 'center',
            cssClass: 'text-nowrap',
            isNarrow: true
          }
        };
      default:
        return {};
    }
  }
}
