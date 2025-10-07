import React from 'react'
import { motion } from 'framer-motion'
import { HiMoon, HiSun } from 'react-icons/hi'
import { useTheme } from '../../contexts/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  // Binary: light (left) / dark (right)
  const bgColor = isDark ? '#4f46e5' : '#fbbf24' // dark / light
  const icon = isDark ? <HiMoon className="w-4 h-4 text-primary-600" /> : <HiSun className="w-4 h-4 text-yellow-600" />
  // Track w-20 = 80px, knob w-6 = 24px, left offset = 2px => translateX = 80 - 24 - 2 - 2 = 52px
  const xPos = isDark ? 52 : 0

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative w-20 h-7 rounded-full bg-warm-gray-300 dark:bg-warm-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-warm-gray-900 ${className}`}
      aria-label={`Theme: ${theme}`}
    >
      {/* Track */}
      <motion.div className="absolute inset-0 rounded-full" animate={{ backgroundColor: bgColor }} transition={{ duration: 0.25 }} />

      {/* Knob */}
      <motion.div
        className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
        animate={{ x: xPos }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.div initial={false} animate={{ rotate: isDark ? 180 : 0 }} transition={{ duration: 0.2 }}>
          {icon}
        </motion.div>
      </motion.div>
    </motion.button>
  )
}

// Alternative button (icon only) toggles theme
export function ThemeToggleButton({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const icon = isDark ? <HiMoon className="w-5 h-5 text-primary-400" /> : <HiSun className="w-5 h-5 text-yellow-600" />

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl bg-warm-gray-100 dark:bg-warm-gray-700 hover:bg-warm-gray-200 dark:hover:bg-warm-gray-600 transition-colors ${className}`}
      aria-label={`Theme: ${theme}`}
    >
      <motion.div initial={false} animate={{ rotate: isDark ? 180 : 0 }} transition={{ duration: 0.2 }}>
        {icon}
      </motion.div>
    </motion.button>
  )
}
