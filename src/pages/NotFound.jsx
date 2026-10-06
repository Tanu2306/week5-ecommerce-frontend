import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-4xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-pine-900/70">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn btn-primary mt-6">Go home</Link>
    </div>
  );
}
