import React from 'react';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { AppProviders } from './app/providers/AppProviders';
import App from './app/App';
import './app/styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders><App /></AppProviders>
  </React.StrictMode>,
);
