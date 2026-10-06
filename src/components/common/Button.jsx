import React from 'react';

const variants = { primary: 'btn-primary', accent: 'btn-accent', ghost: 'btn-ghost' };

export default function Button({ variant = 'primary', className = '', ...props }) {
  return <button className={`btn ${variants[variant]} ${className}`} {...props} />;
}
