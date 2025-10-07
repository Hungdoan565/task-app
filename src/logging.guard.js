// src/logging.guard.js
// Suppress noisy console output in production while keeping warnings/errors.
// Behavior:
// - In production (import.meta.env.PROD), console.log/info/debug are no-ops.
// - Override with VITE_SUPPRESS_LOGS=false to re-enable logs in production.

if (typeof window !== 'undefined') {
  const isProd = import.meta.env && import.meta.env.PROD
  const suppress = (import.meta.env?.VITE_SUPPRESS_LOGS ?? 'true') !== 'false'
  if (isProd && suppress) {
    const noop = () => {}
    // Keep warn/error for visibility of important issues
    // eslint-disable-next-line no-console
    console.debug = noop
    // eslint-disable-next-line no-console
    console.log = noop
    // eslint-disable-next-line no-console
    console.info = noop
  }
}
