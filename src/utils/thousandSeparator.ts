export const thousandSeparator = (price: number) => {
    return new Intl.NumberFormat().format(price)
  }