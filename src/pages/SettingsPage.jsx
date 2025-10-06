import React from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
              Settings
            </h1>
            <p className="text-warm-gray-600 dark:text-warm-gray-400">
              Manage your application preferences
            </p>
          </div>

          {/* Settings Content */}
          <div className="bg-white dark:bg-warm-gray-800 rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚙️</div>
              <h2 className="text-xl font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
                Settings Coming Soon
              </h2>
              <p className="text-warm-gray-600 dark:text-warm-gray-400">
                Additional configuration options will be available here in the future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
