import { describe, it, expect } from 'vitest';
import reducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/cartSlice.js';
import prefs, { toggleCompare, toggleWishlist } from '../store/prefsSlice.js';
import { calcTotals } from '../utils/totals.js';
import { applyFilters } from '../utils/productFilters.js';
import { products } from '../services/products.data.js';

const p = { id: 1, name: 'Lamp', price: 50, image: 'x', stock: 3 };
const empty = { items: [] };

describe('cartSlice', () => {
  it('adds a new item', () => {
    const s = reducer(empty, addToCart({ product: p }));
    expect(s.items).toHaveLength(1);
    expect(s.items[0].quantity).toBe(1);
  });
  it('merges duplicates and caps at stock', () => {
    let s = reducer(empty, addToCart({ product: p, quantity: 2 }));
    s = reducer(s, addToCart({ product: p, quantity: 5 }));
    expect(s.items[0].quantity).toBe(3);
  });
  it('removes when quantity falls below 1', () => {
    let s = reducer(empty, addToCart({ product: p }));
    s = reducer(s, updateQuantity({ id: 1, quantity: 0 }));
    expect(s.items).toHaveLength(0);
  });
  it('removes and clears', () => {
    let s = reducer(empty, addToCart({ product: p }));
    s = reducer(s, removeFromCart(1));
    expect(s.items).toHaveLength(0);
    s = reducer(reducer(s, addToCart({ product: p })), clearCart());
    expect(s.items).toHaveLength(0);
  });
});

describe('calcTotals', () => {
  it('adds shipping and tax under the free-shipping threshold', () => {
    const t = calcTotals([{ price: 100, quantity: 1 }]);
    expect(t).toEqual({ subtotal: 100, shipping: 5.99, tax: 8, total: 113.99 });
  });
  it('gives free shipping at 150 or more', () => {
    expect(calcTotals([{ price: 75, quantity: 2 }]).shipping).toBe(0);
  });
  it('is zero for an empty cart', () => {
    expect(calcTotals([]).total).toBe(0);
  });
});

describe('applyFilters', () => {
  const base = { query: '', category: 'All', maxPrice: 200, minRating: 0, sort: 'price-asc' };
  it('filters by category and sorts by price', () => {
    const out = applyFilters(products, { ...base, category: 'Kitchen' });
    expect(out.every((x) => x.category === 'Kitchen')).toBe(true);
    expect(out.map((x) => x.price)).toEqual([...out.map((x) => x.price)].sort((a, b) => a - b));
  });
  it('filters by query and rating', () => {
    expect(applyFilters(products, { ...base, query: 'skillet' })).toHaveLength(1);
    expect(applyFilters(products, { ...base, minRating: 4.8 }).every((x) => x.rating >= 4.8)).toBe(true);
  });
});

describe('prefsSlice', () => {
  it('limits compare to 3 items', () => {
    let s = { wishlist: [], compare: [] };
    [1, 2, 3, 4].forEach((id) => (s = prefs(s, toggleCompare(id))));
    expect(s.compare).toEqual([1, 2, 3]);
  });
  it('toggles wishlist', () => {
    let s = prefs({ wishlist: [], compare: [] }, toggleWishlist(5));
    expect(s.wishlist).toEqual([5]);
    s = prefs(s, toggleWishlist(5));
    expect(s.wishlist).toEqual([]);
  });
});

import { validators, validateAll } from '../utils/validators.js';

describe('validators', () => {
  it('accepts a Luhn-valid card and rejects an invalid one', () => {
    expect(validators.cardNumber('4242 4242 4242 4242')).toBe('');
    expect(validators.cardNumber('4242 4242 4242 4241')).not.toBe('');
  });
  it('checks expiry', () => {
    const now = new Date(2026, 9, 4);
    expect(validators.expiry('12/30', now)).toBe('');
    expect(validators.expiry('01/20', now)).not.toBe('');
    expect(validators.expiry('13/30', now)).not.toBe('');
  });
  it('validates email, phone and cvv', () => {
    expect(validators.email('a@b.co')).toBe('');
    expect(validators.email('nope')).not.toBe('');
    expect(validators.phone('98765 43210')).toBe('');
    expect(validators.cvv('12')).not.toBe('');
  });
  it('returns an error per empty field', () => {
    expect(Object.keys(validateAll({}))).toHaveLength(9);
  });
});
