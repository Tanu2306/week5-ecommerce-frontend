import React, { useState } from 'react';
import { validators, validateAll } from '../../utils/validators.js';

const fields = [
  { name: 'fullName', label: 'Full name', autoComplete: 'name', span: 2 },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', placeholder: '10 digits' },
  { name: 'address', label: 'Street address', autoComplete: 'street-address', span: 2 },
  { name: 'city', label: 'City', autoComplete: 'address-level2' },
  { name: 'postal', label: 'Postal code', autoComplete: 'postal-code' },
];

const cardFields = [
  { name: 'cardNumber', label: 'Card number', autoComplete: 'cc-number', placeholder: '4242 4242 4242 4242', span: 2, inputMode: 'numeric' },
  { name: 'expiry', label: 'Expiry', autoComplete: 'cc-exp', placeholder: 'MM/YY' },
  { name: 'cvv', label: 'CVV', autoComplete: 'cc-csc', placeholder: '123', inputMode: 'numeric' },
];

const formatCard = (v) => v.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
const formatExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export default function CheckoutForm({ initial, onSubmit, submitting }) {
  const [values, setValues] = useState({
    fullName: initial?.name || '',
    email: initial?.email || '',
    phone: '', address: '', city: '', postal: '', cardNumber: '', expiry: '', cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const change = (name, raw) => {
    let v = raw;
    if (name === 'cardNumber') v = formatCard(raw);
    if (name === 'expiry') v = formatExpiry(raw);
    if (name === 'cvv') v = raw.replace(/\D/g, '').slice(0, 4);
    setValues((s) => ({ ...s, [name]: v }));
    if (touched[name]) setErrors((e) => ({ ...e, [name]: validators[name](v) }));
  };

  const blur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: validators[name](values[name]) }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validateAll(values);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(validators).map((k) => [k, true])));
    if (Object.keys(errs).length === 0) onSubmit(values);
    else document.querySelector('[aria-invalid="true"]')?.focus();
  };

  const renderField = (f) => (
    <div key={f.name} className={f.span === 2 ? 'sm:col-span-2' : ''}>
      <label htmlFor={f.name} className="mb-1 block text-sm font-medium">{f.label}</label>
      <input
        id={f.name}
        name={f.name}
        type={f.type || 'text'}
        inputMode={f.inputMode}
        autoComplete={f.autoComplete}
        placeholder={f.placeholder}
        value={values[f.name]}
        onChange={(e) => change(f.name, e.target.value)}
        onBlur={() => blur(f.name)}
        aria-invalid={Boolean(errors[f.name])}
        aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}
        className={`field ${errors[f.name] ? 'field-error' : ''}`}
      />
      {errors[f.name] && <p id={`${f.name}-err`} className="mt-1 text-xs text-red-700">{errors[f.name]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <fieldset className="space-y-4 rounded-xl border border-pine-100 bg-white p-5">
        <legend className="px-2 font-display text-lg font-bold">Delivery</legend>
        <div className="grid gap-4 sm:grid-cols-2">{fields.map(renderField)}</div>
      </fieldset>
      <fieldset className="space-y-4 rounded-xl border border-pine-100 bg-white p-5">
        <legend className="px-2 font-display text-lg font-bold">Payment (demo)</legend>
        <p className="text-xs text-pine-900/60">Use test card 4242 4242 4242 4242 with any future expiry. Nothing is charged.</p>
        <div className="grid gap-4 sm:grid-cols-2">{cardFields.map(renderField)}</div>
      </fieldset>
      <button type="submit" className="btn btn-accent w-full py-3 text-base" disabled={submitting}>
        {submitting ? 'Placing order…' : 'Place order'}
      </button>
    </form>
  );
}
