import { useState } from 'react'
import { motion } from 'framer-motion'

export function FloatingInput({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  disabled, 
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  className = '',
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value && value.length > 0

  return (
    <div className="relative">
      {Icon && (
        <motion.div
          animate={{ 
            scale: isFocused ? 1.1 : 1,
            color: isFocused ? '#6172f3' : '#a8a29e'
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
        >
          <Icon className="w-5 h-5" />
        </motion.div>
      )}
      
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className={`
          w-full ${Icon ? 'pl-10' : 'pl-4'} ${RightIcon ? 'pr-12' : 'pr-4'} py-3 
          bg-white dark:bg-warm-gray-800 
          border-2 border-warm-gray-200 dark:border-warm-gray-700 
          rounded-xl 
          focus:border-primary-500 dark:focus:border-primary-400 
          focus:ring-4 focus:ring-primary-500/20 
          outline-none 
          transition-all duration-300 
          hover:border-warm-gray-300 dark:hover:border-warm-gray-600
          ${className}
        `}
        placeholder={isFocused || hasValue ? '' : placeholder}
        {...props}
      />

      {/* Floating Label */}
      <motion.label
        animate={{
          top: isFocused || hasValue ? '-0.5rem' : '50%',
          left: Icon ? '2.25rem' : '0.875rem',
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? '#6172f3' : '#78716c',
          backgroundColor: isFocused || hasValue ? 'white' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`
          absolute pointer-events-none
          ${isFocused || hasValue ? 'px-2' : 'px-0'}
          ${isFocused || hasValue ? 'dark:bg-warm-gray-800' : ''}
          origin-left
        `}
        style={{ 
          transform: !isFocused && !hasValue ? 'translateY(-50%)' : 'translateY(0)'
        }}
      >
        <span className="text-warm-gray-600 dark:text-warm-gray-400 font-medium">
          {label}
        </span>
      </motion.label>

      {RightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray-400 hover:text-warm-gray-600 dark:hover:text-warm-gray-200 transition-colors"
        >
          <RightIcon className="w-5 h-5" />
        </button>
      )}

      {/* Focus Glow Effect */}
      <motion.div
        animate={{
          opacity: isFocused ? 1 : 0,
          scale: isFocused ? 1 : 0.95
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 via-primary-500/5 to-primary-500/10 pointer-events-none"
      />
    </div>
  )
}