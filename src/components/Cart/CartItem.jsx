import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartSlice.js';
import { money } from '../../utils/format.js';
import LazyImage from '../common/LazyImage.jsx';
import QuantityControl from '../common/QuantityControl.jsx';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <li className="flex gap-4 rounded-xl border border-pine-100 bg-white p-4">
      <Link to={`/products/${item.id}`} className="shrink-0">
        <LazyImage src={item.image} alt={item.name} className="h-24 w-24 rounded-lg" />
      </Link>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between gap-2">
          <h3 className="font-bold">{item.name}</h3>
          <p className="font-bold">{money(item.price * item.quantity)}</p>
        </div>
        <p className="text-sm text-pine-900/60">{money(item.price)} each</p>
        <div className="mt-auto flex items-center justify-between">
          <QuantityControl
            value={item.quantity}
            max={item.stock}
            label={item.name}
            onChange={(q) => dispatch(updateQuantity({ id: item.id, quantity: q }))}
          />
          <button className="text-sm font-medium text-red-700 hover:underline" onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
