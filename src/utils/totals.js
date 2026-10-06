import { TAX_RATE, SHIPPING_FLAT, FREE_SHIPPING_OVER } from './format.js';

export function calcTotals(items) {
  const subtotal = items.reduce((t, i) => t + i.price * i.quantity, 0);
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;
  return { subtotal, shipping, tax, total };
}
