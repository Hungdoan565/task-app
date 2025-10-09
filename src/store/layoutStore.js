import { create } from 'zustand'

const DEFAULT_ORDER = ['stats', 'ai']
const STORAGE_KEY = 'taskflow:dashboard:widgetOrder'

const loadOrder = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.every(v => typeof v === 'string')) {
      return parsed
    }
  } catch {}
  return DEFAULT_ORDER
}

export const useLayoutStore = create((set, get) => ({
  widgetOrder: loadOrder(),
  setOrder: (order) => {
    const safe = Array.isArray(order) ? order : DEFAULT_ORDER
    set({ widgetOrder: safe })
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(safe)) } catch {}
  },
  reset: () => {
    set({ widgetOrder: DEFAULT_ORDER })
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }
}))
