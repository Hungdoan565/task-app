// src/services/logger.js
// Minimal logger for services. In production, lower log levels are disabled by default.
// Configure via VITE_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error'

const LEVELS = ['debug', 'info', 'warn', 'error']
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {}
// Guard against process being undefined in the browser
const nodeEnv = (typeof process !== 'undefined' && process?.env) ? process.env : undefined
const mode = env.MODE || nodeEnv?.NODE_ENV || 'development'
const prod = mode === 'production'
const configured = (env.VITE_LOG_LEVEL || nodeEnv?.VITE_LOG_LEVEL || '').toLowerCase()
const minLevel = LEVELS.includes(configured) ? configured : (prod ? 'warn' : 'debug')

function shouldLog(level) {
  return LEVELS.indexOf(level) >= LEVELS.indexOf(minLevel)
}

export const logger = {
  debug: (...args) => { if (shouldLog('debug')) console.debug('[svc]', ...args) },
  info:  (...args) => { if (shouldLog('info'))  console.info('[svc]',  ...args) },
  warn:  (...args) => { if (shouldLog('warn'))  console.warn('[svc]',  ...args) },
  error: (...args) => { if (shouldLog('error')) console.error('[svc]', ...args) },
}
