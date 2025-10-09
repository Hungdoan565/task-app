import React from 'react'
import Layout from '@/components/dashboardV2/Layout'
import { Share2, Clock, Trash2 } from 'lucide-react'

export function SharedPage() {
  return (
    <Layout>
      <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Share2 className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Được chia sẻ</h2>
        </div>
        <div className="h-20 rounded-lg bg-gray-50 dark:bg-warm-gray-900 border border-gray-200 dark:border-warm-gray-700 animate-pulse" />
      </div>
    </Layout>
  )
}

export function RecentPage() {
  return (
    <Layout>
      <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Gần đây</h2>
        </div>
        <div className="space-y-2">
          {[1,2,3].map(i => (
            <div key={i} className="h-12 rounded-lg bg-gray-50 dark:bg-warm-gray-900 border border-gray-200 dark:border-warm-gray-700 animate-pulse" />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export function TrashPage() {
  return (
    <Layout>
      <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Trash2 className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Thùng rác</h2>
        </div>
        <p className="text-sm text-gray-500">Các trang đã xóa gần đây sẽ hiển thị ở đây.</p>
      </div>
    </Layout>
  )
}
