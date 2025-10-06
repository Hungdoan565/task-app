import React from 'react'
import { motion } from 'framer-motion'

// Base Skeleton component
export function Skeleton({ className = '', animate = true }) {
  return (
    <div
      className={`${animate ? 'animate-pulse' : ''} bg-warm-gray-200 dark:bg-warm-gray-700 rounded ${className}`}
    />
  )
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="p-6 bg-white dark:bg-warm-gray-800 rounded-lg border border-warm-gray-200 dark:border-warm-gray-700">
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}

// Stat Card Skeleton
export function StatCardSkeleton() {
  return (
    <div className="p-6 bg-white dark:bg-warm-gray-800 rounded-lg border border-warm-gray-200 dark:border-warm-gray-700">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-8 w-16" />
    </div>
  )
}

// Task Item Skeleton
export function TaskItemSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-white dark:bg-warm-gray-800 rounded-xl border border-warm-gray-200 dark:border-warm-gray-700"
    >
      <div className="flex items-start gap-3">
        <Skeleton className="w-5 h-5 rounded flex-shrink-0 mt-1" />
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
    </motion.div>
  )
}

// Kanban Card Skeleton
export function KanbanCardSkeleton() {
  return (
    <div className="p-4 bg-white dark:bg-warm-gray-800 rounded-xl border border-warm-gray-200 dark:border-warm-gray-700">
      <Skeleton className="h-5 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}

// Kanban Column Skeleton
export function KanbanColumnSkeleton() {
  return (
    <div className="flex-shrink-0 w-80">
      <div className="mb-4">
        <Skeleton className="h-6 w-32 mb-2" />
      </div>
      <div className="min-h-[500px] rounded-2xl bg-warm-gray-100/50 dark:bg-warm-gray-800/50 p-4">
        <div className="space-y-3">
          <KanbanCardSkeleton />
          <KanbanCardSkeleton />
          <KanbanCardSkeleton />
        </div>
      </div>
    </div>
  )
}

// Page Loading Skeleton
export function PageLoadingSkeleton() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  )
}

// Table Skeleton
export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="p-4 bg-white dark:bg-warm-gray-800 rounded-lg border border-warm-gray-200 dark:border-warm-gray-700"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="w-24 h-8 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Form Skeleton
export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div>
        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div>
        <Skeleton className="h-5 w-40 mb-2" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-12 w-32 rounded-xl" />
        <Skeleton className="h-12 w-24 rounded-xl" />
      </div>
    </div>
  )
}

// Spinner Component
export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  }

  return (
    <div
      className={`${sizes[size]} border-primary-500 border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}

// Loading Overlay
export function LoadingOverlay({ message = 'Loading...' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-white dark:bg-warm-gray-800 rounded-2xl p-8 shadow-2xl text-center">
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-warm-gray-700 dark:text-warm-gray-300 font-medium">
          {message}
        </p>
      </div>
    </motion.div>
  )
}

// Button Loading State
export function ButtonSpinner({ size = 'sm' }) {
  return <Spinner size={size} className="inline-block" />
}
