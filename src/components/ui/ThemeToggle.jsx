import React from 'react'
import { motion } from 'framer-motion'
import { HiMoon, HiSun } from 'react-icons/hi'
import { useTheme } from '../../contexts/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full bg-warm-gray-300 dark:bg-warm-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-warm-gray-900 ${className}`}
      aria-label="Toggle theme"
    >
      {/* Toggle Background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: isDark ? '#4f46e5' : '#fbbf24'
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Toggle Circle */}
      <motion.div
        className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: isDark ? 28 : 0
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {/* Icon */}
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 180 : 0,
            scale: isDark ? 1 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <HiMoon className="w-4 h-4 text-primary-600" />
          ) : (
            <HiSun className="w-4 h-4 text-yellow-600" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  )
}

// Alternative: Button version
export function ThemeToggleButton({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl bg-warm-gray-100 dark:bg-warm-gray-700 hover:bg-warm-gray-200 dark:hover:bg-warm-gray-600 transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <HiMoon className="w-5 h-5 text-primary-400" />
        ) : (
          <HiSun className="w-5 h-5 text-yellow-600" />
        )}
      </motion.div>
    </motion.button>
  )
}
