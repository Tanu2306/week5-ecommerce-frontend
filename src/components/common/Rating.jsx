import React from 'react';

export default function Rating({ value, count }) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1 text-sm" aria-label={`Rated ${value} out of 5`}>
      <span className="text-saffron-600" aria-hidden="true">
        {'★'.repeat(full)}
        <span className="text-pine-100">{'★'.repeat(5 - full)}</span>
      </span>
      <span className="text-pine-900/70">{value.toFixed(1)}</span>
      {count != null && <span className="text-pine-900/50">({count})</span>}
    </span>
  );
}
