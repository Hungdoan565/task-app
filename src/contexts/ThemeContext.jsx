import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()
const THEME_KEY = 'theme' // 'light' | 'dark'

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
    if (saved === 'system') return 'light' // backward-compat: treat 'system' as 'light'
  } catch (_) {}
  // default: light (system treated as light per requirement)
  return 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  // Apply class, meta theme-color and favicon when theme changes
  useEffect(() => {
    const root = document.documentElement
    const isDark = theme === 'dark'
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')

    // Update all theme-color meta tags (in case multiple exist)
    const metas = document.querySelectorAll('meta[name="theme-color"]')
    metas.forEach(m => m.setAttribute('content', isDark ? '#0b0b0b' : '#ffffff'))

    // Update favicon based on theme
    const link = document.querySelector('link[rel="icon"]')
    if (link) link.setAttribute('href', isDark ? '/favicon-dark.svg' : '/favicon-light.svg')

    // Persist selection
    try { localStorage.setItem(THEME_KEY, theme) } catch (_) {}

    // Log analytics event for theme change
    import('../lib/analytics').then(({ track, setAnalyticsUserProps }) => {
      track?.theme?.(theme, theme)
      setAnalyticsUserProps?.({ preferred_theme: theme })
    }).catch(() => {})
  }, [theme])

  // Listen to storage changes across tabs (no system mode)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === THEME_KEY) {
        const val = e.newValue
        if (val === 'light' || val === 'dark') setTheme(val)
        if (val === 'system') setTheme('light') // backward-compat
      }
    }
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const setLightTheme = () => setTheme('light')
  const setDarkTheme = () => setTheme('dark')

  // Binary toggle (light<->dark)
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
      setLightTheme,
      setDarkTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
