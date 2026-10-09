import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/entities/session';

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        {children}
        <ToastContainer position="top-right" autoClose={3500} theme="light" />
      </AuthProvider>
    </BrowserRouter>
  );
}
