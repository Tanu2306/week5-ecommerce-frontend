// Mock API layer. Every call returns a Promise with a small delay so loading
// states behave like a real backend. Replace the bodies with fetch()/axios calls
// to connect a real server without touching components.
import { products } from './products.data.js';

const delay = (ms = 450) => new Promise((r) => setTimeout(r, ms));

export async function fetchProducts() {
  await delay();
  return products;
}

export async function loginRequest({ email, password }) {
  await delay(500);
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address.');
  if (!password || password.length < 6) throw new Error('Password must be at least 6 characters.');
  const base = email.split('@')[0].replace(/[._-]+/g, ' ');
  return {
    id: 'u_' + btoa(email).slice(0, 8),
    email,
    name: base.charAt(0).toUpperCase() + base.slice(1),
  };
}

export async function placeOrder(payload) {
  await delay(800);
  return { orderId: 'KC' + Date.now().toString().slice(-8), ...payload };
}
