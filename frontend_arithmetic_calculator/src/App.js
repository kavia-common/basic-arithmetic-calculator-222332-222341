import React from 'react';
import './App.css';
import Calculator from './components/Calculator';

/**
 * PUBLIC_INTERFACE
 * App: Root component rendering a centered calculator UI.
 * Applies the playful "Ocean Professional" theme using CSS variables.
 */
function App() {
  return (
    <div className="App ocean-bg">
      <main className="app-container" role="main" aria-label="Arithmetic calculator application">
        <h1 className="visually-hidden">Ocean Professional Calculator</h1>
        <Calculator />
      </main>
    </div>
  );
}

export default App;
