import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
// Side-effect import: Vite bundles the stylesheet, and TypeScript does not check
// unresolved side-effect imports, so no ambient declaration or suppression is needed.
import './styles.css';

// index.html puts .js on <html> before paint; this is a no-op safety net so reveal
// targets stay hidden only when the bundle really is running.
document.documentElement.classList.add('js');

// Hydrates the markup prerendered by src/entry-server.tsx — the same <App /> tree,
// so the two entries must never render different output.
hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
