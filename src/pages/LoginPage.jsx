import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../store/userSlice.js';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, status, error } = useSelector((s) => s.user);
  const [form, setForm] = useState({ email: '', password: '' });
  const from = location.state?.from || '/';

  useEffect(() => () => dispatch(clearError()), [dispatch]);

  if (user) return <Navigate to={from} replace />;

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(form));
    if (login.fulfilled.match(res)) navigate(from, { replace: true });
  };

  return (
    <div className="container-page max-w-md py-16">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="mt-1 text-sm text-pine-900/70">
        {location.state?.from ? 'Sign in to continue to checkout. ' : ''}
        This is a simulation: any valid email and a password of 6+ characters will work.
      </p>
      <form onSubmit={submit} className="mt-6 space-y-4 rounded-xl border border-pine-100 bg-white p-6" noValidate>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
          <input id="email" type="email" autoComplete="email" className="field" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
          <input id="password" type="password" autoComplete="current-password" className="field" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button className="btn btn-primary w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
