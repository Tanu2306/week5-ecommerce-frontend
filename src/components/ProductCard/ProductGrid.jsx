import React from 'react';
import ProductCard from './ProductCard.jsx';

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-xl border border-pine-100 bg-white">
          <div className="aspect-square bg-pine-50" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-1/3 rounded bg-pine-50" />
            <div className="h-5 w-2/3 rounded bg-pine-50" />
            <div className="h-9 rounded bg-pine-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
