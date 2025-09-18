export const strings = Object.freeze({
  form: {
    action: {
      add: 'Add item',
      delete: {
        disabledLabel: 'At least one item is required in the form',
        label: 'Delete item'
      }
    },
    caption: 'List of items',
    error: {
      emptyList: 'Please add items',
      noChanges: 'Nothing changed'
    },
    fields: {
      count: {
        placeholder: 'Enter count'
      },
      name: {
        placeholder: 'Enter name'
      },
      price: {
        placeholder: 'Enter price'
      }
    },
    success: 'Items are saved',
    warning: 'Some items were not saved'
  },
  item: {
    count: 'Count',
    name: 'Name',
    price: 'Price'
  },
  listCaption: 'List of items',
  listHeader: 'Items',
  noDataRow: 'No items',
  summaryLabel: 'Sum:'
});

export type ItemStrings = typeof strings;
