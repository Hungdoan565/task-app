import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import DashboardLayout from '../components/layout/DashboardLayout'
import { trackEvent } from '@/lib/analytics'

export default function HomePage() {
  const navigate = useNavigate()
  const { getUserDisplayName, profile } = useUser()

  const stats = profile?.stats || {
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    todoTasks: 0
  }

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
              Welcome back, {getUserDisplayName()}! 👋
            </h1>
            <p className="text-warm-gray-600 dark:text-warm-gray-400">
              Here's what's happening with your tasks today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon="📝"
              label="Total Tasks"
              value={stats.totalTasks}
              color="blue"
            />
            <StatCard
              icon="✅"
              label="Completed"
              value={stats.completedTasks}
              color="green"
            />
            <StatCard
              icon="🚀"
              label="In Progress"
              value={stats.inProgressTasks}
              color="purple"
            />
            <StatCard
              icon="📋"
              label="To Do"
              value={stats.todoTasks}
              color="orange"
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </div>
          </div>

          {/* Recent Activity or Tips */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100 mb-3">
              💡 Pro Tip
            </h2>
            <p className="text-primary-800 dark:text-primary-200">
              Use keyboard shortcuts to work faster! Press <kbd className="px-2 py-1 bg-white dark:bg-warm-gray-800 rounded text-sm">Ctrl + K</kbd> to quickly search through your tasks.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function StatCard({ icon, label, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
  }

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6 transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
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
      className={`${colorClasses[color]} bg-white dark:bg-warm-gray-800 border border-warm-gray-200 dark:border-warm-gray-700 rounded-lg p-6 text-left transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-warm-gray-800`}
      aria-label={title}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
        {title}
      </h3>
      <p className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
        {description}
      </p>
    </button>
  )
}
