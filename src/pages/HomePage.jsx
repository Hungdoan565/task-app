import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import DashboardLayout from '../components/layout/DashboardLayout'
import { trackEvent } from '@/lib/analytics'
import QuickAddTask from '../components/task/QuickAddTask'
import useTasks from '../hooks/useTasks'
import { format } from 'date-fns'
import KpiCard from '@/components/dashboard/KpiCard'
import SectionCard from '@/components/dashboard/SectionCard'
import DueSoonList from '@/components/task/DueSoonList'

export default function HomePage() {
  const navigate = useNavigate()
  const { getUserDisplayName, profile, user } = useUser()
  const { tasks } = useTasks(user?.uid, { status: 'all' })

  const stats = useMemo(() => ({
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'done').length,
    inProgressTasks: tasks.filter(t => t.status === 'in_progress').length,
    todoTasks: tasks.filter(t => t.status === 'todo').length
  }), [tasks])

  const quickActions = [
    {
      icon: '➕',
      title: 'Create Task',
      description: 'Add a new task to your workspace',
      action: () => navigate('/dashboard/tasks'),
      color: 'blue'
    },
    {
      icon: '📊',
      title: 'View All Tasks',
      description: 'See all your tasks and manage them',
      action: () => navigate('/dashboard/tasks'),
      color: 'purple'
    },
    {
      icon: '👤',
      title: 'Edit Profile',
      description: 'Update your account information',
      action: () => navigate('/dashboard/profile'),
      color: 'green'
    }
  ]

  useEffect(() => {
    try { trackEvent('dashboard_open') } catch (_) {}
  }, [])

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50">
                Welcome back, {getUserDisplayName()}! 👋
              </h1>
              <p className="text-warm-gray-600 dark:text-warm-gray-400">Here's what's happening with your work today.</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <KpiCard icon="📝" label="Total" value={stats.totalTasks} tone="indigo" />
            <KpiCard icon="✅" label="Completed" value={stats.completedTasks} tone="green" progress={stats.totalTasks ? (stats.completedTasks / stats.totalTasks) * 100 : 0} />
            <KpiCard icon="🚀" label="In Progress" value={stats.inProgressTasks} tone="purple" progress={stats.totalTasks ? (stats.inProgressTasks / stats.totalTasks) * 100 : 0} />
            <KpiCard icon="📋" label="To Do" value={stats.todoTasks} tone="orange" progress={stats.totalTasks ? (stats.todoTasks / stats.totalTasks) * 100 : 0} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Add */}
              <SectionCard title="Quick Add">
                <QuickAddTask placeholder="Add a task for today…" />
              </SectionCard>

              {/* Quick Actions */}
              <SectionCard title="Quick Actions">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <QuickActionCard key={index} {...action} />
                  ))}
                </div>
              </SectionCard>

              {/* Pro Tip */}
              <SectionCard title="Pro Tip">
                <p className="text-warm-gray-700 dark:text-warm-gray-300">
                  Use keyboard shortcuts to work faster! Press <kbd className="px-2 py-1 bg-white dark:bg-warm-gray-800 rounded text-sm">Ctrl + K</kbd> to quickly search.
                </p>
              </SectionCard>
            </div>

            {/* Due Soon */}
            <SectionCard title="Due Soon" className="h-full">
              <DueSoonList tasks={tasks} />
            </SectionCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

// Legacy StatCard removed (replaced by KpiCard)
function StatCard({ icon, label, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/15 border-blue-200/70 dark:border-blue-800/40',
    green: 'bg-green-50 dark:bg-green-900/15 border-green-200/70 dark:border-green-800/40',
    purple: 'bg-purple-50 dark:bg-purple-900/15 border-purple-200/70 dark:border-purple-800/40',
    orange: 'bg-orange-50 dark:bg-orange-900/15 border-orange-200/70 dark:border-orange-800/40'
  }

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-5 transition-all hover:shadow-sm`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <p className="text-sm text-warm-gray-600 dark:text-warm-gray-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50">{value}</p>
      </div>
    </div>
  )
}

function QuickActionCard({ icon, title, description, action, color }) {
  const colorClasses = {
    blue: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
    purple: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
    green: 'hover:bg-green-50 dark:hover:bg-green-900/20'
  }

  return (
    <button
      onClick={() => { try { trackEvent('dashboard_quick_action', { title }) } catch (_) {} ; action() }}
      className={`${colorClasses[color]} bg-white dark:bg-warm-gray-800 border border-warm-gray-200 dark:border-warm-gray-700 rounded-xl p-5 text-left transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800`}
      aria-label={title}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-base font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-1">
        {title}
      </h3>
      <p className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
        {description}
      </p>
    </button>
  )
}

