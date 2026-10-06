import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetFilters, loadProducts } from '../store/productSlice.js';
import { applyFilters } from '../utils/productFilters.js';
import { categories } from '../services/products.data.js';
import { money } from '../utils/format.js';
import ProductGrid, { ProductGridSkeleton } from '../components/ProductCard/ProductGrid.jsx';

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error, filters } = useSelector((s) => s.products);
  const results = useMemo(() => applyFilters(items, filters), [items, filters]);

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
      <aside aria-label="Filters" className="h-fit space-y-6 rounded-xl border border-pine-100 bg-white p-5">
        <div>
          <label htmlFor="f-q" className="mb-1 block text-sm font-bold">Search</label>
          <input id="f-q" className="field" value={filters.query} placeholder="Name or category"
            onChange={(e) => dispatch(setFilter({ query: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="f-cat" className="mb-1 block text-sm font-bold">Category</label>
          <select id="f-cat" className="field" value={filters.category}
            onChange={(e) => dispatch(setFilter({ category: e.target.value }))}>
            <option>All</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="f-price" className="mb-1 block text-sm font-bold">Up to {money(filters.maxPrice)}</label>
          <input id="f-price" type="range" min="20" max="200" step="5" value={filters.maxPrice} className="w-full accent-pine-700"
            onChange={(e) => dispatch(setFilter({ maxPrice: Number(e.target.value) }))} />
        </div>
        <div>
          <label htmlFor="f-rate" className="mb-1 block text-sm font-bold">Minimum rating</label>
          <select id="f-rate" className="field" value={filters.minRating}
            onChange={(e) => dispatch(setFilter({ minRating: Number(e.target.value) }))}>
            <option value={0}>Any</option>
            <option value={4}>4 stars and up</option>
            <option value={4.5}>4.5 stars and up</option>
          </select>
        </div>
        <button className="btn btn-ghost w-full" onClick={() => dispatch(resetFilters())}>Clear filters</button>
      </aside>

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold">Shop</h1>
          <div className="flex items-center gap-3">
            <p className="text-sm text-pine-900/60" aria-live="polite">{status === 'ready' ? `${results.length} products` : ''}</p>
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select id="sort" className="field !w-auto" value={filters.sort}
              onChange={(e) => dispatch(setFilter({ sort: e.target.value }))}>
              <option value="popularity">Most popular</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {status === 'error' ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <p className="font-bold">We couldn't load the products.</p>
            <p className="text-sm">{error}</p>
            <button className="btn btn-primary mt-3" onClick={() => dispatch(loadProducts())}>Try again</button>
          </div>
        ) : status !== 'ready' ? (
          <ProductGridSkeleton />
        ) : results.length === 0 ? (
          <div className="rounded-xl border border-pine-100 bg-white p-10 text-center">
            <p className="text-lg font-bold">Nothing matches those filters.</p>
            <button className="btn btn-primary mt-4" onClick={() => dispatch(resetFilters())}>Clear filters</button>
          </div>
        ) : (
          <ProductGrid products={results} />
        )}
      </section>
    </div>
  );
}
