import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Display: Shows previous expression context and current value.
 * Uses aria-live="polite" to announce results/updates for assistive technologies.
 */
export default function Display({ current, previous, operator, error }) {
  const prevText = previous && operator ? `${previous} ${operator}` : '';
  const currentText = error ? error : current;

  return (
    <div className="display">
      <div className="display-screen" role="status" aria-live="polite" aria-atomic="true">
        <div className="display-prev" aria-label="Previous operation">
          {prevText}
        </div>
        <div
          className="display-current"
          aria-label={error ? 'Error' : 'Current value'}
          style={error ? { color: '#B91C1C' } : undefined}
        >
          {currentText}
        </div>
      </div>
    </div>
  );
}
