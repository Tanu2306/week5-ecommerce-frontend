import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cartSlice.js';
import { placeOrder } from '../services/api.js';
import { calcTotals } from '../utils/totals.js';
import { money } from '../utils/format.js';
import CheckoutForm from '../components/Checkout/CheckoutForm.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const user = useSelector((s) => s.user.user);
  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async (values) => {
    setSubmitting(true);
    setError('');
    try {
      const { total } = calcTotals(items);
      const result = await placeOrder({ customer: values.fullName, email: values.email, total, count: items.length });
      setOrder(result);
      dispatch(clearCart());
    } catch {
      setError('We could not place your order. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (order) {
    return (
      <div className="container-page max-w-xl py-20 text-center">
        <h1 className="text-4xl font-extrabold">Order placed</h1>
        <p className="mt-3">Thanks, {order.customer}. Your order number is <strong>{order.orderId}</strong>.</p>
        <p className="mt-1 text-pine-900/70">A confirmation for {money(order.total)} is on its way to {order.email}.</p>
        <Link to="/products" className="btn btn-primary mt-8">Keep shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold">Nothing to check out</h1>
        <Link to="/products" className="btn btn-primary mt-6">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
      {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <CheckoutForm initial={user} onSubmit={submit} submitting={submitting} />
        <CartSummary items={items} />
      </div>
    </div>
  );
}
