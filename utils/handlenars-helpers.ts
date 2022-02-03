export const handlebarsHelpers = {
  upper: (str: string) => str.toUpperCase(),

  findPrice: (entries: [string, number][], selectedItem: string): number => {
    const found = entries.find((el) => el[0] === selectedItem);

    if (!found) {
      throw new Error(`Cannot find price of "${selectedItem}".`);
    }
    const [, price] = found;
    return price;
  },
  pricify: (price: number): string => price.toFixed(2),
  isNotInArray: (array: any[], element: any): boolean =>
    !array.includes(element),

  isInArray: (array: any[], element: any): boolean => array.includes(element),
};
