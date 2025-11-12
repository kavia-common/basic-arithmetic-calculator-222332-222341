import React, { useEffect, useRef, useState } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import { evaluate } from '../utils/evaluate';

/**
 * PUBLIC_INTERFACE
 * Calculator: Manages operands, operator, evaluation, and keyboard inputs.
 * Supports +, -, ×, ÷, AC, DEL, decimal, +/- toggle, equals with division by zero handling.
 */
export default function Calculator() {
  // Internal state
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState('');
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [error, setError] = useState('');

  const containerRef = useRef(null);

  // Keyboard handling
  useEffect(() => {
    const onKey = (e) => {
      const { key } = e;
      if ((key >= '0' && key <= '9')) {
        e.preventDefault();
        handleDigit(key);
      } else if (key === '.' ) {
        e.preventDefault();
        handleDecimal();
      } else if (key === '+' || key === '-' || key === '*' || key === 'x' || key === 'X' || key === '/' ) {
        e.preventDefault();
        const map = key === '*' || key === 'x' || key === 'X' ? '×' : key === '/' ? '÷' : key;
        handleOperator(map);
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, previous, operator, overwrite]);

  const resetAll = () => {
    setCurrent('0');
    setPrevious('');
    setOperator(null);
    setOverwrite(false);
    setError('');
  };

  // Handlers
  const handleDigit = (digit) => {
    if (error) setError('');
    if (overwrite) {
      setCurrent(digit);
      setOverwrite(false);
      return;
    }
    if (current === '0') {
      setCurrent(digit);
    } else {
      setCurrent(current + digit);
    }
  };

  const handleDecimal = () => {
    if (error) setError('');
    if (overwrite) {
      setCurrent('0.');
      setOverwrite(false);
      return;
    }
    if (!current.includes('.')) {
      setCurrent(current + '.');
    }
  };

  const handleToggleSign = () => {
    if (error) setError('');
    if (current === '0') return;
    if (current.startsWith('-')) {
      setCurrent(current.slice(1));
    } else {
      setCurrent('-' + current);
    }
  };

  const handleOperator = (nextOperator) => {
    if (error) setError('');
    if (operator && !overwrite && previous !== '' ) {
      // Chain operation: evaluate previous op with current
      const result = evaluate(previous, current, operator);
      if (result.error) {
        setError(result.error);
        resetAll();
        return;
      }
      setPrevious(result.value);
      setCurrent('0');
      setOperator(nextOperator);
      setOverwrite(true);
      return;
    }
    // Move current to previous and set operator
    setPrevious(current);
    setCurrent('0');
    setOperator(nextOperator);
    setOverwrite(true);
  };

  const handleEquals = () => {
    if (!operator || previous === '') return;
    const result = evaluate(previous, current, operator);
    if (result.error) {
      setError(result.error);
      // Friendly: show error in prev, keep current at 0
      setPrevious('');
      setCurrent('0');
      setOperator(null);
      setOverwrite(true);
      return;
    }
    setCurrent(result.value);
    setPrevious('');
    setOperator(null);
    setOverwrite(true);
  };

  const handleDelete = () => {
    if (error) setError('');
    if (overwrite) {
      setCurrent('0');
      setOverwrite(false);
      return;
    }
    if (current.length <= 1 || (current.length === 2 && current.startsWith('-'))) {
      setCurrent('0');
    } else {
      setCurrent(current.slice(0, -1));
    }
  };

  const handleClear = () => {
    resetAll();
  };

  return (
    <section
      ref={containerRef}
      className="calculator"
      aria-label="Basic arithmetic calculator"
    >
      <div className="calculator-header" aria-hidden="true">
        <span className="header-title">Ocean Pro Calc</span>
        <div className="header-badges">
          <span className="badge pink" />
          <span className="badge purple" />
          <span className="badge blue" />
        </div>
      </div>

      <Display
        current={current}
        previous={previous}
        operator={operator}
        error={error}
      />

      <Keypad
        onDigit={handleDigit}
        onDecimal={handleDecimal}
        onOperator={handleOperator}
        onEquals={handleEquals}
        onDelete={handleDelete}
        onClear={handleClear}
        onToggleSign={handleToggleSign}
      />

      <div className="footer" aria-hidden="true">
        Friendly. Accessible. Precise.
      </div>
    </section>
  );
}
