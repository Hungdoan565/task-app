import React from 'react'
import Layout from '@/components/dashboardV2/Layout'
import { CheckSquare } from 'lucide-react'
import { useLocation, NavLink } from 'react-router-dom'

const tabs = [
  { to: '/tasks/today', label: 'Hôm nay' },
  { to: '/tasks/week', label: 'Tuần này' },
  { to: '/tasks/all', label: 'Tất cả' },
  { to: '/tasks/done', label: 'Đã hoàn thành' },
]

export default function TasksPage() {
  const { pathname } = useLocation()
  return (
    <Layout>
      <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CheckSquare className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold">Nhiệm vụ</h2>
          </div>
          <div className="flex bg-gray-100 dark:bg-warm-gray-900 rounded p-1">
            {tabs.map(t => (
              <NavLink key={t.to} to={t.to} className={({isActive}) => `px-3 py-1.5 rounded text-sm ${isActive ? 'bg-white dark:bg-warm-gray-700 shadow-sm' : ''}`}>
                {t.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Đang hiển thị: <strong>{tabs.find(t => pathname.startsWith(t.to))?.label || 'Tất cả'}</strong>
        </div>
        <div className="mt-4 grid gap-3">
          <div className="h-14 rounded-lg bg-gray-50 dark:bg-warm-gray-900 border border-gray-200 dark:border-warm-gray-700 animate-pulse" />
          <div className="h-14 rounded-lg bg-gray-50 dark:bg-warm-gray-900 border border-gray-200 dark:border-warm-gray-700 animate-pulse" />
          <div className="h-14 rounded-lg bg-gray-50 dark:bg-warm-gray-900 border border-gray-200 dark:border-warm-gray-700 animate-pulse" />
        </div>
      </div>
    </Layout>
  )
}
