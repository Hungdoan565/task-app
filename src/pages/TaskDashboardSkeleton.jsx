import React, { useMemo } from 'react'
import AppShell from '@/components/layout/AppShell'
import KpiCard from '@/components/dashboard/KpiCard'
import SectionCard from '@/components/dashboard/SectionCard'
import QuickAddTask from '@/components/task/QuickAddTask'
import TaskTabs from '@/components/task/TaskTabs'
import CalendarWidget from '@/components/widgets/CalendarWidget'
import RecentActivity from '@/components/activity/RecentActivity'
import DueSoonList from '@/components/task/DueSoonList'
import { useUser } from '@/contexts/UserContext'
import useTasks from '@/hooks/useTasks'

export default function TaskDashboardSkeleton() {
  const { getUserDisplayName, user } = useUser()
  const { tasks } = useTasks(user?.uid, { status: 'all', includeLegacy: true })

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    overdue: tasks.filter(t => {
      const d = toDateLike(t.dueDate)
      return d && d < new Date() && t.status !== 'done'
    }).length,
  }), [tasks])

  return (
    <AppShell>
      <div className="space-y-8">

          {/* Welcome */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50">Dashboard</h1>
              <p className="text-warm-gray-600 dark:text-warm-gray-400">Xin chào, {getUserDisplayName()} — chúc bạn một ngày hiệu quả!</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <KpiCard icon="📝" label="Total Tasks" value={stats.total} tone="indigo" />
            <KpiCard icon="✅" label="Completed" value={stats.completed} tone="green" progress={stats.total ? (stats.completed / stats.total) * 100 : 0} />
            <KpiCard icon="🚀" label="In Progress" value={stats.inProgress} tone="purple" progress={stats.total ? (stats.inProgress / stats.total) * 100 : 0} />
            <KpiCard icon="⏰" label="Overdue" value={stats.overdue} tone="orange" progress={stats.total ? (stats.overdue / stats.total) * 100 : 0} />
          </div>

          {/* Quick Add */}
          <SectionCard title="Quick Add Task">
            <QuickAddTask placeholder="Thêm công việc nhanh…" />
          </SectionCard>

          {/* 2-column layout 65/35 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TaskTabs />
            </div>
            <div className="space-y-6">
              <CalendarWidget />
              <SectionCard title="Due Soon">
                <DueSoonList tasks={tasks} />
              </SectionCard>
              <RecentActivity />
            </div>
          </div>
      </div>
    </AppShell>
  )
}

function toDateLike(dueDate) {
  if (!dueDate) return null
  if (dueDate?.toDate) return dueDate.toDate()
  if (dueDate?.seconds) return new Date(dueDate.seconds * 1000)
  try { return new Date(dueDate) } catch { return null }
}