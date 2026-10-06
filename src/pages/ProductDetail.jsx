import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice.js';
import { toggleWishlist } from '../store/prefsSlice.js';
import { money } from '../utils/format.js';
import LazyImage from '../components/common/LazyImage.jsx';
import Rating from '../components/common/Rating.jsx';
import Spinner from '../components/common/Spinner.jsx';
import QuantityControl from '../components/common/QuantityControl.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.products);
  const product = items.find((p) => p.id === Number(id));
  const wished = useSelector((s) => s.prefs.wishlist.includes(Number(id)));
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [extraReviews, setExtraReviews] = useState([]);
  const [draft, setDraft] = useState({ author: '', rating: 5, text: '' });

  if (status !== 'ready') return <Spinner label="Loading product" />;
  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-3xl font-bold">We can't find that product.</h1>
        <Link to="/products" className="btn btn-primary mt-6">Back to shop</Link>
      </div>
    );
  }

  const reviews = [...extraReviews, ...product.reviews];
  const add = () => {
    dispatch(addToCart({ product, quantity: qty }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };
  const submitReview = (e) => {
    e.preventDefault();
    if (!draft.author.trim() || draft.text.trim().length < 5) return;
    setExtraReviews((r) => [{ id: Date.now(), ...draft, rating: Number(draft.rating) }, ...r]);
    setDraft({ author: '', rating: 5, text: '' });
  };

  return (
    <div className="container-page py-10">
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <Link to="/products" className="text-pine-700 hover:underline">Shop</Link> / {product.category} / {product.name}
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <LazyImage src={product.images[index]} alt={`${product.name}, view ${index + 1}`} className="aspect-square w-full rounded-2xl" />
          <ul className="mt-3 flex gap-3">
            {product.images.map((src, i) => (
              <li key={src}>
                <button onClick={() => setIndex(i)} aria-label={`Show view ${i + 1}`} aria-pressed={i === index}
                  className={`overflow-hidden rounded-lg border-2 ${i === index ? 'border-pine-700' : 'border-transparent'}`}>
                  <LazyImage src={src} alt="" className="h-20 w-20" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-pine-900/60">{product.category}</p>
          <h1 className="text-4xl font-extrabold">{product.name}</h1>
          <Rating value={product.rating} count={product.reviewCount} />
          <p className="text-3xl font-bold">{money(product.price)}</p>
          <p className="max-w-prose text-pine-900/80">{product.description}</p>
          <p className={`text-sm font-medium ${product.stock <= 5 ? 'text-red-700' : 'text-pine-700'}`}>
            {product.stock <= 5 ? `Only ${product.stock} left` : 'In stock'}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <QuantityControl value={qty} max={product.stock} label={product.name} onChange={(q) => setQty(Math.max(1, q))} />
            <button className="btn btn-primary px-6" onClick={add}>{added ? 'Added to cart ✓' : 'Add to cart'}</button>
            <button className="btn btn-ghost" onClick={() => dispatch(toggleWishlist(product.id))} aria-pressed={wished}>
              {wished ? '♥ Saved' : '♡ Save'}
            </button>
          </div>
        </div>
      </div>

      <section className="mt-14 grid gap-8 md:grid-cols-[1.4fr_1fr]" aria-labelledby="reviews-h">
        <div>
          <h2 id="reviews-h" className="mb-4 text-2xl font-bold">Reviews</h2>
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li key={r.id} className="rounded-xl border border-pine-100 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="font-bold">{r.author}</p>
                  <Rating value={r.rating} />
                </div>
                <p className="mt-2 text-sm text-pine-900/80">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={submitReview} className="h-fit space-y-3 rounded-xl border border-pine-100 bg-white p-5">
          <h3 className="text-lg font-bold">Write a review</h3>
          <div>
            <label htmlFor="r-name" className="mb-1 block text-sm font-medium">Your name</label>
            <input id="r-name" className="field" value={draft.author} onChange={(e) => setDraft({ ...draft, author: e.target.value })} required />
          </div>
          <div>
            <label htmlFor="r-rate" className="mb-1 block text-sm font-medium">Rating</label>
            <select id="r-rate" className="field" value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: e.target.value })}>
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="r-text" className="mb-1 block text-sm font-medium">Review</label>
            <textarea id="r-text" rows="3" className="field" minLength={5} value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} required />
          </div>
          <button className="btn btn-primary w-full">Post review</button>
        </form>
      </section>
    </div>
  );
}
