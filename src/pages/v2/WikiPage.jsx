import React from 'react'
import Layout from '@/components/dashboardV2/Layout'
import { BookText } from 'lucide-react'

export default function WikiPage() {
  return (
    <Layout>
      <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-5">
        <div className="flex items-center gap-3 mb-4">
          <BookText className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Tài liệu / Wiki</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-gray-50 dark:bg-warm-gray-900 border border-gray-200 dark:border-warm-gray-700 animate-pulse" />
          ))}
        </div>
      </div>
    </Layout>
  )
}
