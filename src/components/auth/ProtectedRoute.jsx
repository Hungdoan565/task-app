import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useUser()

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-warm-gray-600 dark:text-warm-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  return children
}
