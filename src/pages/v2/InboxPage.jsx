import React from 'react'
import Layout from '@/components/dashboardV2/Layout'
import { Inbox } from 'lucide-react'

export default function InboxPage() {
  return (
    <Layout>
      <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-5">
        <div className="flex items-center gap-3 mb-4">
          <Inbox className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Hộp thư đến</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-100 dark:border-warm-gray-700 p-4">
            <p className="text-sm text-gray-500">Ghi chú nhanh</p>
            <input className="mt-3 w-full px-3 py-2.5 rounded bg-gray-50 dark:bg-warm-gray-900 border border-gray-200 dark:border-warm-gray-700" placeholder="Nhập ghi chú..."/>
          </div>
          <div className="rounded-lg border border-gray-100 dark:border-warm-gray-700 p-4">
            <p className="text-sm text-gray-500">Tạo nhiệm vụ</p>
            <input className="mt-3 w-full px-3 py-2.5 rounded bg-gray-50 dark:bg-warm-gray-900 border border-gray-200 dark:border-warm-gray-700" placeholder="Tên nhiệm vụ..."/>
          </div>
        </div>
      </div>
    </Layout>
  )
}
