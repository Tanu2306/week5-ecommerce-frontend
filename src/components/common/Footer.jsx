import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-pine-100 bg-white">
      <div className="container-page flex flex-col gap-2 py-8 text-sm text-pine-900/70 sm:flex-row sm:justify-between">
        <p className="font-display text-base font-bold text-pine-900">Kiln &amp; Co.</p>
        <p>Demo storefront. No real orders are placed and no payment is taken.</p>
      </div>
    </footer>
  );
}
