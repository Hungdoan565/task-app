// src/lib/analytics.js
// Minimal wrapper around Firebase Analytics to safely log custom events.

import { analytics } from './firebase'
import { logEvent, isSupported, setUserId, setUserProperties } from 'firebase/analytics'

let supportPromise = null

async function ensureSupported() {
  if (!supportPromise) supportPromise = isSupported().catch(() => false)
  return supportPromise
}

export async function trackEvent(name, params = {}) {
  try {
    const supported = await ensureSupported()
    if (!supported || !analytics) return
    // Avoid undefined values
    const clean = {}
    Object.keys(params || {}).forEach(k => {
      const v = params[k]
      if (v !== undefined && v !== null && v !== '') clean[k] = v
    })
    logEvent(analytics, name, clean)
  } catch (_) {}
}

export const track = {
  cta: (id, extra = {}) => trackEvent('cta_click', { id, ...extra }),
  route: (path, extra = {}) => trackEvent('route_view', { path, ...extra }),
  theme: (mode, effective) => trackEvent('theme_set', { mode, effective }),
}

export async function setAnalyticsUser(userId) {
  try {
    const supported = await ensureSupported()
    if (!supported || !analytics) return
    setUserId(analytics, userId || null)
  } catch (_) {}
}

export async function setAnalyticsUserProps(props = {}) {
  try {
    const supported = await ensureSupported()
    if (!supported || !analytics) return
    setUserProperties(analytics, props)
  } catch (_) {}
}
