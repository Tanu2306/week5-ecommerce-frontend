import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice.js';
import SearchBar from './SearchBar.jsx';

const linkCls = ({ isActive }) =>
  `rounded-md px-2 py-1 text-sm font-medium hover:bg-pine-50 ${isActive ? 'text-pine-700 underline underline-offset-4' : ''}`;

const Badge = ({ n }) =>
  n > 0 ? (
    <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-saffron-500 px-1.5 text-xs font-bold">{n}</span>
  ) : null;

export default function Header() {
  const dispatch = useDispatch();
  const cartCount = useSelector((s) => s.cart.items.reduce((n, i) => n + i.quantity, 0));
  const wish = useSelector((s) => s.prefs.wishlist.length);
  const compare = useSelector((s) => s.prefs.compare.length);
  const user = useSelector((s) => s.user.user);

  return (
    <header className="sticky top-0 z-30 border-b border-pine-100 bg-white/95 backdrop-blur">
      <div className="container-page flex flex-wrap items-center gap-x-6 gap-y-3 py-3">
        <Link to="/" className="font-display text-2xl font-extrabold text-pine-700">
          Kiln &amp; Co.
        </Link>
        <nav className="flex items-center gap-1" aria-label="Main">
          <NavLink to="/products" className={linkCls}>Shop</NavLink>
          <NavLink to="/wishlist" className={linkCls}>Wishlist<Badge n={wish} /></NavLink>
          <NavLink to="/compare" className={linkCls}>Compare<Badge n={compare} /></NavLink>
        </nav>
        <div className="order-last w-full sm:order-none sm:ml-auto sm:w-auto sm:flex-1 sm:max-w-sm">
          <SearchBar />
        </div>
        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          {user ? (
            <>
              <span className="hidden text-sm sm:inline">Hi, {user.name}</span>
              <button className="btn btn-ghost !py-1.5" onClick={() => dispatch(logout())}>Sign out</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-ghost !py-1.5">Sign in</Link>
          )}
          <Link to="/cart" className="btn btn-primary !py-1.5" aria-label={`Cart, ${cartCount} items`}>
            Cart<Badge n={cartCount} />
          </Link>
        </div>
      </div>
    </header>
  );
}
