import React from 'react';

export default function Spinner({ label = 'Loading' }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-24 text-pine-700">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-pine-600 border-t-transparent" />
      <span className="text-sm font-medium">{label}…</span>
    </div>
  );
}
