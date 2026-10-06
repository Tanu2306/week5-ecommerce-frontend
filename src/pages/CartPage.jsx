import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cartSlice.js';
import CartItem from '../components/Cart/CartItem.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';

export default function CartPage() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-pine-900/70">Add something from the shop and it will show up here.</p>
        <Link to="/products" className="btn btn-primary mt-6">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your cart</h1>
        <button className="text-sm font-medium text-red-700 hover:underline" onClick={() => dispatch(clearCart())}>Empty cart</button>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="space-y-4">{items.map((i) => <CartItem key={i.id} item={i} />)}</ul>
        <CartSummary items={items}>
          <button className="btn btn-accent w-full py-3" onClick={() => navigate('/checkout')}>Go to checkout</button>
        </CartSummary>
      </div>
    </div>
  );
}
