import { AppRouter } from './router/AppRouter';
import { Header } from '@/widgets/site-header';
import { Footer } from '@/widgets/site-footer';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content"><AppRouter /></main>
      <Footer />
    </div>
  );
}
