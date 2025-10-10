import React from 'react'
import Layout from '@/components/dashboardV2/Layout'
import { Blocks } from 'lucide-react'

export default function TemplatesPage() {
  return (
    <Layout>
      <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-5">
        <div className="flex items-center gap-3 mb-4">
          <Blocks className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Mẫu (Templates)</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['Ghi chú họp', 'Nhiệm vụ', 'Dự án', 'Tài liệu'].map((t, i) => (
            <button key={i} className="rounded-lg border border-gray-200 dark:border-warm-gray-700 p-4 text-left hover:bg-gray-50 dark:hover:bg-warm-gray-900">
              {t}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  )
}
