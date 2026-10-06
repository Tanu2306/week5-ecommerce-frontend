import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductGrid, { ProductGridSkeleton } from '../components/ProductCard/ProductGrid.jsx';
import { categories } from '../services/products.data.js';
import { setFilter } from '../store/productSlice.js';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.products);
  const featured = [...items].sort((a, b) => b.popularity - a.popularity).slice(0, 4);

  return (
    <>
      <section className="bg-pine-900 text-white">
        <div className="container-page grid gap-8 py-14 sm:py-20 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
              Good things for the desk, the kitchen and the commute.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              A small shop of well-made everyday objects. Free shipping on orders over $150.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-accent px-6 py-3 text-base">Shop all products</Link>
              <Link to="/compare" className="btn border border-white/30 px-6 py-3 text-base text-white hover:bg-white/10">Compare products</Link>
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {categories.map((c) => (
              <li key={c}>
                <Link
                  to="/products"
                  onClick={() => dispatch(setFilter({ category: c }))}
                  className="block rounded-xl border border-white/20 px-4 py-3 text-center font-display text-lg font-bold hover:bg-white/10 md:text-left"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold sm:text-3xl">Most loved this month</h2>
          <Link to="/products" className="text-sm font-bold text-pine-700 hover:underline">See everything</Link>
        </div>
        {status === 'loading' || status === 'idle' ? <ProductGridSkeleton count={4} /> : <ProductGrid products={featured} />}
      </section>
    </>
  );
}
