import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import QuotePage from './components/QuotePage.jsx'

function Root() {
  const [isQuoteRoute, setIsQuoteRoute] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.hash.startsWith('#/quote');
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const updateRoute = () => {
      setIsQuoteRoute(window.location.hash.startsWith('#/quote'));
    };
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    document.body.classList.toggle('quote-page-active', isQuoteRoute);
    return () => {
      document.body.classList.remove('quote-page-active');
    };
  }, [isQuoteRoute]);

  return isQuoteRoute ? <QuotePage /> : <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
