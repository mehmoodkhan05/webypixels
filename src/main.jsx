import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import QuotePage from './quote/QuotePage.jsx'

function Root() {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/quote')) {
    return <QuotePage />
  }
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
