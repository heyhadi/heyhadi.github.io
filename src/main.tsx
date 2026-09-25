import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Side-effect import: Vite bundles the stylesheet, and TypeScript does not check
// unresolved side-effect imports, so no ambient declaration or suppression is needed.
import './styles.css';

// Lets CSS hide reveal targets only when JS can bring them back.
document.documentElement.classList.add('js');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
