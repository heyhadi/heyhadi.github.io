import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Lets CSS hide reveal targets only when JS can bring them back.
document.documentElement.classList.add('js');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
