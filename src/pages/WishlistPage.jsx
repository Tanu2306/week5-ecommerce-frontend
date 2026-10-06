import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductGrid from '../components/ProductCard/ProductGrid.jsx';
import Spinner from '../components/common/Spinner.jsx';

export default function WishlistPage() {
  const { items, status } = useSelector((s) => s.products);
  const ids = useSelector((s) => s.prefs.wishlist);
  if (status !== 'ready') return <Spinner label="Loading wishlist" />;
  const saved = items.filter((p) => ids.includes(p.id));

  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-3xl font-bold">Wishlist</h1>
      {saved.length === 0 ? (
        <div className="rounded-xl border border-pine-100 bg-white p-10 text-center">
          <p className="text-lg font-bold">Nothing saved yet</p>
          <p className="text-pine-900/70">Tap the heart on any product to keep it here.</p>
          <Link to="/products" className="btn btn-primary mt-4">Browse products</Link>
        </div>
      ) : (
        <ProductGrid products={saved} />
      )}
    </div>
  );
}
