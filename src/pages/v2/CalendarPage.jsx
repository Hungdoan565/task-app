import React from 'react'
import Layout from '@/components/dashboardV2/Layout'
import { CalendarDays } from 'lucide-react'

export default function CalendarPage() {
  return (
    <Layout>
      <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-5">
        <div className="flex items-center gap-3 mb-4">
          <CalendarDays className="w-5 h-5 text-emerald-600" />
        <h2 className="text-lg font-semibold">Lịch</h2>
        </div>
        <div className="h-72 rounded-lg bg-gray-50 dark:bg-warm-gray-900 border border-gray-200 dark:border-warm-gray-700 animate-pulse" />
      </div>
    </Layout>
  )
}
