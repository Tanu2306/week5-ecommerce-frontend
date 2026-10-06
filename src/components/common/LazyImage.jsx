import React, { useState } from 'react';

// Native lazy loading + graceful fallback if the image host is unreachable.
export default function LazyImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-pine-50 text-4xl ${className}`} role="img" aria-label={alt}>
        🏺
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      width="600"
      height="600"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`bg-pine-50 object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
}
