import React from 'react';
import { money, FREE_SHIPPING_OVER } from '../../utils/format.js';
import { calcTotals } from '../../utils/totals.js';

export default function CartSummary({ items, children }) {
  const { subtotal, shipping, tax, total } = calcTotals(items);
  const Row = ({ label, value, strong }) => (
    <div className={`flex justify-between ${strong ? 'border-t border-pine-100 pt-3 text-lg font-bold' : 'text-sm'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
  return (
    <aside className="h-fit space-y-3 rounded-xl border border-pine-100 bg-white p-5" aria-label="Order summary">
      <h2 className="text-xl font-bold">Order summary</h2>
      <Row label="Subtotal" value={money(subtotal)} />
      <Row label="Shipping" value={shipping === 0 ? 'Free' : money(shipping)} />
      <Row label="Tax (8%)" value={money(tax)} />
      <Row label="Total" value={money(total)} strong />
      {subtotal > 0 && subtotal < FREE_SHIPPING_OVER && (
        <p className="text-xs text-pine-900/60">Add {money(FREE_SHIPPING_OVER - subtotal)} more for free shipping.</p>
      )}
      {children}
    </aside>
  );
}
