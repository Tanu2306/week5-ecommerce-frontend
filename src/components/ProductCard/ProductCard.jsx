import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice.js';
import { toggleWishlist, toggleCompare, MAX_COMPARE } from '../../store/prefsSlice.js';
import { money } from '../../utils/format.js';
import LazyImage from '../common/LazyImage.jsx';
import Rating from '../common/Rating.jsx';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wished = useSelector((s) => s.prefs.wishlist.includes(product.id));
  const comparing = useSelector((s) => s.prefs.compare.includes(product.id));
  const compareFull = useSelector((s) => s.prefs.compare.length >= MAX_COMPARE);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-pine-100 bg-white">
      <div className="relative">
        <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <LazyImage src={product.image} alt={product.name} className="aspect-square w-full" />
        </Link>
        <button
          onClick={() => dispatch(toggleWishlist(product.id))}
          aria-pressed={wished}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute right-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-lg leading-none shadow"
        >
          {wished ? '♥' : '♡'}
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs text-pine-900/60">{product.category}</p>
        <h3 className="text-lg font-bold leading-snug">
          <Link to={`/products/${product.id}`} className="hover:underline">{product.name}</Link>
        </h3>
        <Rating value={product.rating} count={product.reviewCount} />
        <p className="mt-auto pt-2 text-lg font-bold">{money(product.price)}</p>
        <div className="flex gap-2">
          <button className="btn btn-primary flex-1" onClick={() => dispatch(addToCart({ product }))}>
            Add to cart
          </button>
          <button
            className={`btn btn-ghost ${comparing ? '!border-pine-600 !bg-pine-50' : ''}`}
            onClick={() => dispatch(toggleCompare(product.id))}
            disabled={!comparing && compareFull}
            aria-pressed={comparing}
            title={!comparing && compareFull ? `Compare up to ${MAX_COMPARE} products` : 'Compare'}
          >
            Compare
          </button>
        </div>
      </div>
    </article>
  );
}

export default React.memo(ProductCard);
