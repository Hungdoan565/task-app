import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Enhanced Button with depth and accessibility
 * Variants: primary, secondary, danger, ghost
 * Sizes: sm, md, lg
 */
export const ButtonDepth = React.forwardRef(({ 
  className,
  variant = 'primary',
  size = 'md',
  depth = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ariaLabel,
  children,
  onClick,
  ...props 
}, ref) => {
  // Variant styles with depth
  const variantStyles = {
    primary: cn(
      'bg-gradient-to-b from-primary-500 to-primary-600',
      'hover:from-primary-600 hover:to-primary-700',
      'text-white font-medium',
      'border border-primary-700/20'
    ),
    secondary: cn(
      'bg-gradient-to-b from-gray-50 to-gray-100',
      'hover:from-gray-100 hover:to-gray-200',
      'text-gray-900 font-medium',
      'border border-gray-300/50'
    ),
    danger: cn(
      'bg-gradient-to-b from-red-500 to-red-600',
      'hover:from-red-600 hover:to-red-700',
      'text-white font-medium',
      'border border-red-700/20'
    ),
    ghost: cn(
      'bg-transparent hover:bg-gray-50',
      'text-gray-700 hover:text-gray-900 font-medium',
      'border border-transparent'
    )
  }

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl'
  }

  // Depth shadows
  const depthStyles = {
    sm: 'shadow-sm hover:shadow-md active:shadow-sm',
    md: 'shadow-md hover:shadow-lg active:shadow-md',
    lg: 'shadow-lg hover:shadow-xl active:shadow-lg'
  }

  // Minimum tap target size for accessibility (44px)
  const tapTargetStyles = {
    sm: 'min-h-[36px]',
    md: 'min-h-[40px]',
    lg: 'min-h-[44px]'
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Apply variant
        variantStyles[variant],
        // Apply size
        sizeStyles[size],
        tapTargetStyles[size],
        // Apply depth
        variant !== 'ghost' && depthStyles[depth],
        // Full width
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={loading}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      {/* Top glow effect */}
      {variant !== 'ghost' && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      
      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <svg 
            className="animate-spin h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </motion.div>
      )}
      
      {/* Button content */}
      <span className={cn(
        'relative flex items-center gap-2',
        loading && 'invisible'
      )}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>
    </motion.button>
  )
})

ButtonDepth.displayName = 'ButtonDepth'

/**
 * Icon Button variant for compact actions
 */
export const IconButton = React.forwardRef(({ 
  className,
  size = 'md',
  variant = 'ghost',
  ariaLabel,
  children,
  ...props 
}, ref) => {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  return (
    <ButtonDepth
      ref={ref}
      className={cn(
        sizeStyles[size],
        'p-0',
        className
      )}
      size={size}
      variant={variant}
      ariaLabel={ariaLabel}
      {...props}
    >
      {children}
    </ButtonDepth>
  )
})

IconButton.displayName = 'IconButton'