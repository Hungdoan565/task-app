import React from 'react'
import { useUser } from '../contexts/UserContext'
import DashboardLayout from '../components/layout/DashboardLayout'

export default function ProfilePage() {
  const { 
    getUserDisplayName, 
    getUserEmail, 
    getProvider,
    profile,
    user
  } = useUser()

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
              Profile
            </h1>
            <p className="text-warm-gray-600 dark:text-warm-gray-400">
              Manage your account information and preferences
            </p>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white dark:bg-warm-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-1">
                    Display Name
                  </label>
                  <div className="px-4 py-2 bg-warm-gray-50 dark:bg-warm-gray-700 rounded-lg text-warm-gray-900 dark:text-warm-gray-50">
                    {getUserDisplayName()}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-1">
                    Email
                  </label>
                  <div className="px-4 py-2 bg-warm-gray-50 dark:bg-warm-gray-700 rounded-lg text-warm-gray-900 dark:text-warm-gray-50">
                    {getUserEmail()}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-1">
                    Authentication Provider
                  </label>
                  <div className="px-4 py-2 bg-warm-gray-50 dark:bg-warm-gray-700 rounded-lg text-warm-gray-900 dark:text-warm-gray-50 inline-flex items-center gap-2">
                    {getProvider() === 'google.com' && '🔵'}
                    {getProvider() === 'github.com' && '⚫'}
                    {getProvider() === 'password' && '📧'}
                    {getProvider()}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Stats */}
            {profile?.stats && (
              <div className="bg-white dark:bg-warm-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-4">
                  Account Statistics
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">Total Tasks</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {profile.stats.totalTasks || 0}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-300 mb-1">Completed</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {profile.stats.completedTasks || 0}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">In Progress</p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {profile.stats.inProgressTasks || 0}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {profile?.preferences && (
              <div className="bg-white dark:bg-warm-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-4">
                  Preferences
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-warm-gray-700 dark:text-warm-gray-300">Email Notifications</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      profile.preferences.notifications?.email 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}>
                      {profile.preferences.notifications?.email ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-warm-gray-700 dark:text-warm-gray-300">Task Reminders</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      profile.preferences.notifications?.reminder 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}>
                      {profile.preferences.notifications?.reminder ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-warm-gray-700 dark:text-warm-gray-300">Marketing Emails</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      profile.preferences.notifications?.marketing 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}>
                      {profile.preferences.notifications?.marketing ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Account Metadata */}
            {profile?.metadata && (
              <div className="bg-white dark:bg-warm-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-4">
                  Account Details
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-warm-gray-600 dark:text-warm-gray-400">Account Status</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      profile.metadata.accountStatus === 'active'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {profile.metadata.accountStatus}
                    </span>
                  </div>
                  {profile.metadata.createdAt && (
                    <div className="flex justify-between">
                      <span className="text-warm-gray-600 dark:text-warm-gray-400">Member Since</span>
                      <span className="text-warm-gray-900 dark:text-warm-gray-50">
                        {new Date(profile.metadata.createdAt.toDate?.() || profile.metadata.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {profile.metadata.lastLogin && (
                    <div className="flex justify-between">
                      <span className="text-warm-gray-600 dark:text-warm-gray-400">Last Login</span>
                      <span className="text-warm-gray-900 dark:text-warm-gray-50">
                        {new Date(profile.metadata.lastLogin.toDate?.() || profile.metadata.lastLogin).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
