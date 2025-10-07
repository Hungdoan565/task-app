import React from 'react'
import { cn } from '@/lib/utils'

export default function SectionCard({ title, children, right, className }) {
  return (
    <section className={cn('rounded-xl border border-warm-gray-200 dark:border-warm-gray-700 bg-white dark:bg-warm-gray-800', className)}>
      <div className="flex items-center justify-between px-4 pt-4">
        <h2 className="text-lg font-semibold text-warm-gray-900 dark:text-warm-gray-50">{title}</h2>
        {right}
      </div>
      <div className="p-4 pt-3">
        {children}
      </div>
    </section>
  )
}