import React from 'react';

/**
 * PUBLIC_INTERFACE
 * KeyButton: Generic calculator button with accessible label and styles.
 */
export default function KeyButton({ label, onClick, ariaLabel, className = '', dataKey }) {
  return (
    <button
      type="button"
      className={`key ${className}`}
      aria-label={ariaLabel || label}
      onClick={onClick}
      data-key={dataKey}
    >
      {label}
    </button>
  );
}
