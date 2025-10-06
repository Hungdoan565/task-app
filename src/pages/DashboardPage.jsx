import React from 'react'
import { useUser } from '../contexts/UserContext'
import TasksPanel from '../components/task/TasksPanel'
import DashboardLayout from '../components/layout/DashboardLayout'

export default function DashboardPage() {
  const { getUserDisplayName } = useUser()

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
              Tasks
            </h1>
            <p className="text-warm-gray-600 dark:text-warm-gray-400">
              Welcome back, {getUserDisplayName()}! 👋
            </p>
          </div>

          {/* Tasks Panel */}
          <TasksPanel />
        </div>
      </div>
    </DashboardLayout>
  )
}
