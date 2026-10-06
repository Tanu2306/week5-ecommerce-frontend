import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCompare, clearCompare } from '../store/prefsSlice.js';
import { addToCart } from '../store/cartSlice.js';
import { money } from '../utils/format.js';
import Rating from '../components/common/Rating.jsx';
import LazyImage from '../components/common/LazyImage.jsx';
import Spinner from '../components/common/Spinner.jsx';

export default function ComparePage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.products);
  const ids = useSelector((s) => s.prefs.compare);
  if (status !== 'ready') return <Spinner label="Loading comparison" />;
  const picked = ids.map((id) => items.find((p) => p.id === id)).filter(Boolean);

  if (picked.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold">Compare products</h1>
        <p className="mt-2 text-pine-900/70">Choose up to three products with the Compare button in the shop.</p>
        <Link to="/products" className="btn btn-primary mt-6">Browse products</Link>
      </div>
    );
  }

  const rows = [
    ['Price', (p) => money(p.price)],
    ['Rating', (p) => <Rating value={p.rating} count={p.reviewCount} />],
    ['Category', (p) => p.category],
    ['In stock', (p) => p.stock],
    ['Details', (p) => <span className="text-sm">{p.description}</span>],
  ];

  return (
    <div className="container-page py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Compare products</h1>
        <button className="btn btn-ghost" onClick={() => dispatch(clearCompare())}>Clear all</button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-pine-100 bg-white">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr>
              <td className="w-32 p-4" />
              {picked.map((p) => (
                <th key={p.id} className="p-4 align-top">
                  <LazyImage src={p.image} alt={p.name} className="mb-3 h-32 w-32 rounded-lg" />
                  <Link to={`/products/${p.id}`} className="font-display text-lg font-bold hover:underline">{p.name}</Link>
                  <div className="mt-2 flex gap-2">
                    <button className="btn btn-primary !px-3 !py-1.5" onClick={() => dispatch(addToCart({ product: p }))}>Add to cart</button>
                    <button className="btn btn-ghost !px-3 !py-1.5" onClick={() => dispatch(toggleCompare(p.id))}>Remove</button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, render]) => (
              <tr key={label} className="border-t border-pine-100">
                <th scope="row" className="p-4 text-sm font-bold">{label}</th>
                {picked.map((p) => <td key={p.id} className="p-4 align-top">{render(p)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
