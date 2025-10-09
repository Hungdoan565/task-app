import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAccessibility } from '../../hooks/useAccessibility'
import { IconButton } from './ButtonDepth'

/**
 * Mobile-optimized Sidebar with accessibility
 * Features: Swipe to close, trap focus, overlay, animations
 */
export const MobileSidebar = ({ 
  isOpen,
  onClose,
  position = 'left', // left or right
  children,
  title,
  className,
  ...props 
}) => {
  const { trapFocus, announce, getAnimationSettings } = useAccessibility()
  const sidebarRef = useRef(null)
  const animationSettings = getAnimationSettings()

  // Trap focus when opened
  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      const cleanup = trapFocus(sidebarRef)
      // Focus first focusable element
      const firstFocusable = sidebarRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (firstFocusable) {
        firstFocusable.focus()
      }
      
      // Announce to screen readers
      announce(`${title || 'Menu'} opened`)
      
      return cleanup
    }
  }, [isOpen, trapFocus, announce, title])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  // Animation variants
  const sidebarVariants = {
    hidden: {
      x: position === 'left' ? '-100%' : '100%',
      transition: animationSettings.animate ? {
        type: 'spring',
        damping: 25,
        stiffness: 300
      } : { duration: 0.01 }
    },
    visible: {
      x: 0,
      transition: animationSettings.animate ? {
        type: 'spring',
        damping: 25,
        stiffness: 300
      } : { duration: 0.01 }
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: animationSettings.animate ? 0.3 : 0.01 }
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <motion.aside
            ref={sidebarRef}
            className={cn(
              'fixed top-0 bottom-0 z-50 w-80 max-w-[85vw]',
              'bg-white shadow-2xl',
              'flex flex-col',
              'md:hidden', // Only show on mobile
              position === 'left' ? 'left-0' : 'right-0',
              className
            )}
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            drag={position === 'left' ? 'x' : position === 'right' ? 'x' : false}
            dragConstraints={
              position === 'left' 
                ? { left: -320, right: 0 }
                : { left: 0, right: 320 }
            }
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              const threshold = 100
              if (position === 'left' && info.offset.x < -threshold) {
                onClose()
              } else if (position === 'right' && info.offset.x > threshold) {
                onClose()
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Mobile menu'}
            {...props}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-b from-gray-50/50 to-transparent">
              {title && (
                <h2 className="text-lg font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              <IconButton
                size="md"
                variant="ghost"
                onClick={onClose}
                ariaLabel="Close menu"
                className="ml-auto"
              >
                <X className="w-5 h-5" />
              </IconButton>
            </div>

            {/* Content with scroll */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>

            {/* Swipe indicator */}
            <motion.div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 w-1 h-20 bg-gray-300 rounded-full',
                position === 'left' ? 'right-2' : 'left-2'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              whileHover={{ opacity: 0.5 }}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

/**
 * Bottom Sheet variant for mobile
 */
export const BottomSheet = ({ 
  isOpen,
  onClose,
  children,
  title,
  height = '75vh',
  className,
  ...props 
}) => {
  const { trapFocus, announce, getAnimationSettings } = useAccessibility()
  const sheetRef = useRef(null)
  const animationSettings = getAnimationSettings()

  useEffect(() => {
    if (isOpen && sheetRef.current) {
      const cleanup = trapFocus(sheetRef)
      announce(`${title || 'Bottom sheet'} opened`)
      return cleanup
    }
  }, [isOpen, trapFocus, announce, title])

  const sheetVariants = {
    hidden: {
      y: '100%',
      transition: animationSettings.animate ? {
        type: 'spring',
        damping: 25,
        stiffness: 300
      } : { duration: 0.01 }
    },
    visible: {
      y: 0,
      transition: animationSettings.animate ? {
        type: 'spring',
        damping: 25,
        stiffness: 300
      } : { duration: 0.01 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Bottom Sheet */}
          <motion.div
            ref={sheetRef}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50',
              'bg-white rounded-t-2xl shadow-2xl',
              'flex flex-col',
              className
            )}
            style={{ maxHeight: height }}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100) {
                onClose()
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Bottom sheet'}
            {...props}
          >
            {/* Drag handle */}
            <div className="flex justify-center py-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            {title && (
              <div className="px-6 py-3 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  {title}
                </h2>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}