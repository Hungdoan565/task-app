import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

// Guard console logs in production (optional override via VITE_SUPPRESS_LOGS=false)
import './logging.guard.js'

// Optional: initialize Sentry in production if DSN is provided
if (import.meta.env && import.meta.env.MODE === 'production' && import.meta.env.VITE_SENTRY_DSN) {
  import('./sentry.client.js')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
