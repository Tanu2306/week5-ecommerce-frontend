export const money = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export const TAX_RATE = 0.08;
export const SHIPPING_FLAT = 5.99;
export const FREE_SHIPPING_OVER = 150;
