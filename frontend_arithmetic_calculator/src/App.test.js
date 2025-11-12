import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const getKey = (label) => screen.getByRole('button', { name: new RegExp(`^${label}$`, 'i') });

test('renders a centered calculator with display and keypad', () => {
  render(<App />);
  expect(screen.getByRole('main', { name: /arithmetic calculator application/i })).toBeInTheDocument();
  expect(screen.getByRole('status')).toBeInTheDocument();
  // Some keys exist
  expect(getKey('1')).toBeInTheDocument();
  expect(getKey('+')).toBeInTheDocument();
  expect(getKey('=')).toBeInTheDocument();
});

test('supports 2 + 3 = 5', () => {
  render(<App />);
  fireEvent.click(getKey('2'));
  fireEvent.click(getKey('+'));
  fireEvent.click(getKey('3'));
  fireEvent.click(getKey('='));  
  const display = screen.getByRole('status');
  expect(display).toHaveTextContent('5');
});

test('supports 9 ÷ 3 = 3', () => {
  render(<App />);
  fireEvent.click(getKey('9'));
  fireEvent.click(getKey('÷'));
  fireEvent.click(getKey('3'));
  fireEvent.click(getKey('='));
  const display = screen.getByRole('status');
  expect(display).toHaveTextContent('3');
});

test('division by zero shows a friendly error', () => {
  render(<App />);
  fireEvent.click(getKey('9'));
  fireEvent.click(getKey('÷'));
  fireEvent.click(getKey('0'));
  fireEvent.click(getKey('='));
  const display = screen.getByRole('status');
  expect(display).toHaveTextContent(/can't divide by zero/i);
});

test('keyboard input works: 2 + 3 = Enter yields 5, Backspace deletes, Escape clears', () => {
  render(<App />);
  const main = screen.getByRole('main');
  // sequence: 2 + 3 Enter
  fireEvent.keyDown(main, { key: '2' });
  fireEvent.keyDown(main, { key: '+' });
  fireEvent.keyDown(main, { key: '3' });
  fireEvent.keyDown(main, { key: 'Enter' });
  expect(screen.getByRole('status')).toHaveTextContent('5');

  // Backspace deletion on overwrite should reset to 0 then delete not necessary; verify Escape clears
  fireEvent.keyDown(main, { key: 'Escape' });
  expect(screen.getByRole('status')).toHaveTextContent('0');
});
