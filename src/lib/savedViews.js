// src/lib/savedViews.js
// Lightweight local saved views for tasks/search. Stored in localStorage.

const PREFIX = 'taskapp_saved_views_'
const LAST_KEY = 'taskapp_last_view_'

function read(key, def = []) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : def
  } catch (_) { return def }
}
function write(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch (_) {}
}

export function loadViews(scope) {
  return read(PREFIX + scope, [])
}
export function saveView(scope, name, data) {
  const key = PREFIX + scope
  const views = read(key, [])
  const id = name.trim().toLowerCase().replace(/\s+/g, '-')
  const existingIdx = views.findIndex((v) => v.id === id)
  const payload = { id, name: name.trim(), data }
  if (existingIdx >= 0) views[existingIdx] = payload
  else views.push(payload)
  write(key, views)
  setLastUsed(scope, id)
  return payload
}
export function deleteView(scope, id) {
  const key = PREFIX + scope
  const views = read(key, [])
  write(key, views.filter((v) => v.id !== id))
}
export function getView(scope, id) {
  const views = loadViews(scope)
  return views.find((v) => v.id === id) || null
}
export function getLastUsed(scope) {
  try { return localStorage.getItem(LAST_KEY + scope) || '' } catch (_) { return '' }
}
export function setLastUsed(scope, id) {
  try { localStorage.setItem(LAST_KEY + scope, id) } catch (_) {}
}
