import React from 'react';

export default function QuantityControl({ value, max, onChange, label }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-pine-100 bg-white" role="group" aria-label={`Quantity for ${label}`}>
      <button className="px-3 py-1.5 text-lg" onClick={() => onChange(value - 1)} aria-label="Decrease quantity">
        −
      </button>
      <span className="min-w-8 text-center text-sm font-bold" aria-live="polite">
        {value}
      </span>
      <button
        className="px-3 py-1.5 text-lg disabled:opacity-30"
        onClick={() => onChange(value + 1)}
        disabled={max != null && value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
