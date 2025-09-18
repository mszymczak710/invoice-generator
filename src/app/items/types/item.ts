export class Item {
  count: number;
  name: string;
  price: number;

  constructor(data: Partial<Item>) {
    Object.entries(data).forEach(([fieldName, val]) => {
      switch (fieldName) {
        default:
          this[fieldName] = val;
          break;
      }
    });
  }
}
