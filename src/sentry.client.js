// src/sentry.client.js
// Optional Sentry client initialization for React

// Only initialize if DSN is provided at build/runtime via Vite env
// Add VITE_SENTRY_DSN to your .env(.production) to enable

if (import.meta.env && import.meta.env.MODE === 'production' && import.meta.env.VITE_SENTRY_DSN) {
  import('@sentry/react').then((Sentry) => {
    const dsn = import.meta.env.VITE_SENTRY_DSN
    const environment = 'production'

    Sentry.init({
      dsn,
      environment,
      tracesSampleRate: 0.1, // tune per needs
      replaysOnErrorSampleRate: 0.1,
      replaysSessionSampleRate: 0.0,
      integrations: (integrations) => integrations,
    })
  }).catch(() => {
    // Sentry not installed or failed to load; silently ignore
  })
}
