import React from 'react'
import { useUser } from '../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useNavigate } from 'react-router-dom'
import UserProfileDebug from '../components/UserProfileDebug'

export default function DashboardPage() {
  const { getUserDisplayName, getUserEmail, getProvider, user } = useUser()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate('/auth')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
              Dashboard
            </h1>
            <p className="text-warm-gray-600 dark:text-warm-gray-400">
              Welcome back, {getUserDisplayName()}! 👋
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
                {getUserEmail()}
              </p>
              <p className="text-xs text-warm-gray-500">
                via {getProvider()}
              </p>
            </div>
            
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Debug Component */}
        <UserProfileDebug />
        
        {/* Main Content */}
        <div className="bg-white dark:bg-warm-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-4">
            🚧 Coming Soon
          </h2>
          <p className="text-warm-gray-600 dark:text-warm-gray-400">
            Your task management workspace will be built here. The user authentication and profile system is now complete!
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">✅ Authentication</h3>
              <p className="text-sm text-blue-700 dark:text-blue-200">Email, Google & GitHub login completed</p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">🗂️ User Profiles</h3>
              <p className="text-sm text-green-700 dark:text-green-200">Firestore integration completed</p>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">⚡ Quick Recovery</h3>
              <p className="text-sm text-purple-700 dark:text-purple-200">OAuth timeout improvements added</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
