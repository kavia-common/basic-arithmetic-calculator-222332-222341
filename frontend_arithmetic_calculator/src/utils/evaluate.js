const clampPrecision = (n) => {
  // Limit float precision to 12 significant digits then trim trailing zeros
  const asStr = Number(n).toPrecision(12);
  // Remove trailing zeros and possible trailing dot
  return parseFloat(asStr).toString();
};

const parseNum = (s) => {
  const n = Number(s);
  if (Number.isNaN(n) || !Number.isFinite(n)) return null;
  return n;
};

/**
 * PUBLIC_INTERFACE
 * evaluate: Safely evaluate a binary operation on two operands.
 * @param {string} a - previous operand
 * @param {string} b - current operand
 * @param {string} op - one of '+', '-', '×', '÷'
 * @returns {{ value?: string, error?: string }}
 */
export function evaluate(a, b, op) {
  const n1 = parseNum(a);
  const n2 = parseNum(b);
  if (n1 === null || n2 === null) {
    return { error: 'Computation error' };
  }

  let result;
  switch (op) {
    case '+':
      result = n1 + n2;
      break;
    case '-':
      result = n1 - n2;
      break;
    case '×':
      result = n1 * n2;
      break;
    case '÷':
      if (n2 === 0) {
        return { error: "Can't divide by zero" };
      }
      result = n1 / n2;
      break;
    default:
      return { error: 'Unknown operation' };
  }
  return { value: clampPrecision(result) };
}
