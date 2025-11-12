import React from 'react';
import KeyButton from './KeyButton';

/**
 * PUBLIC_INTERFACE
 * Keypad: Renders calculator buttons and wires callbacks.
 */
export default function Keypad({
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onDelete,
  onClear,
  onToggleSign,
}) {
  const digits = [
    { label: '7' }, { label: '8' }, { label: '9' }, { label: '÷', className: 'operator secondary', action: () => onOperator('÷') },
    { label: '4' }, { label: '5' }, { label: '6' }, { label: '×', className: 'operator secondary', action: () => onOperator('×') },
    { label: '1' }, { label: '2' }, { label: '3' }, { label: '-', className: 'operator', action: () => onOperator('-') },
    { label: '0', className: 'wide' }, { label: '.', action: onDecimal }, { label: '+', className: 'operator', action: () => onOperator('+') },
  ];

  return (
    <div className="keypad" role="group" aria-label="Calculator keypad">
      <KeyButton label="AC" onClick={onClear} ariaLabel="All Clear" className="error" dataKey="AC" />
      <KeyButton label="DEL" onClick={onDelete} ariaLabel="Delete" className="error" dataKey="DEL" />
      <KeyButton label="+/-" onClick={onToggleSign} ariaLabel="Toggle sign" dataKey="SIGN" />
      <KeyButton label="=" onClick={onEquals} ariaLabel="Equals" className="equals" dataKey="=" />

      {digits.map((d) => (
        <KeyButton
          key={d.label}
          label={d.label}
          className={d.className}
          ariaLabel={`Key ${d.label}`}
          dataKey={d.label}
          onClick={
            d.action
              ? d.action
              : d.label === '.'
                ? onDecimal
                : () => onDigit(d.label)
          }
        />
      ))}
    </div>
  );
}
