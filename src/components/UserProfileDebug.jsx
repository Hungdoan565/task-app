// src/components/UserProfileDebug.jsx
// Debug component to verify user profile data

import React from 'react'
import { useUser } from '../contexts/UserContext'

const UserProfileDebug = () => {
  const { 
    user, 
    profile, 
    loading, 
    error, 
    isAuthenticated,
    isProfileComplete,
    getUserDisplayName,
    getUserEmail,
    getProvider
  } = useUser()

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">🔄 Loading User Data...</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-blue-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-blue-200 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-red-900 mb-2">❌ Error Loading User Data</h3>
        <p className="text-red-700">{error}</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">🚪 Not Authenticated</h3>
        <p className="text-gray-600">Please sign in to see user data</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 mb-6">
      {/* Quick Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-900 mb-3">
          ✅ User Profile Debug Info
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Display Name:</span> {getUserDisplayName()}
          </div>
          <div>
            <span className="font-medium">Email:</span> {getUserEmail()}
          </div>
          <div>
            <span className="font-medium">Provider:</span> {getProvider()}
          </div>
          <div>
            <span className="font-medium">Profile Complete:</span> 
            {isProfileComplete ? ' ✅ Yes' : ' ❌ No'}
          </div>
        </div>
      </div>

      {/* Firebase Auth User */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">🔐 Firebase Auth User</h4>
        <pre className="text-xs bg-blue-100 p-3 rounded overflow-x-auto">
          {JSON.stringify({
            uid: user?.uid,
            email: user?.email,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            providerData: user?.providerData?.map(p => ({
              providerId: p.providerId,
              uid: p.uid,
              email: p.email,
              displayName: p.displayName
            }))
          }, null, 2)}
        </pre>
      </div>

      {/* Firestore Profile */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-900 mb-2">🗂️ Firestore Profile</h4>
        {profile ? (
          <pre className="text-xs bg-purple-100 p-3 rounded overflow-x-auto max-h-96">
            {JSON.stringify({
              uid: profile.uid,
              email: profile.email,
              displayName: profile.displayName,
              provider: profile.provider,
              profile: profile.profile,
              preferences: profile.preferences,
              metadata: {
                ...profile.metadata,
                createdAt: profile.metadata?.createdAt?.toDate?.() || profile.metadata?.createdAt,
                updatedAt: profile.metadata?.updatedAt?.toDate?.() || profile.metadata?.updatedAt,
                lastLogin: profile.metadata?.lastLogin?.toDate?.() || profile.metadata?.lastLogin,
              },
              stats: profile.stats
            }, null, 2)}
          </pre>
        ) : (
          <p className="text-purple-700">No Firestore profile found</p>
        )}
      </div>

      {/* Test Status */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-900 mb-2">🧪 Test Status</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${user ? 'bg-green-500' : 'bg-red-500'}`}></span>
            Firebase Auth User: {user ? 'Present' : 'Missing'}
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${profile ? 'bg-green-500' : 'bg-red-500'}`}></span>
            Firestore Profile: {profile ? 'Present' : 'Missing'}
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${profile?.uid === user?.uid ? 'bg-green-500' : 'bg-red-500'}`}></span>
            UID Match: {profile?.uid === user?.uid ? 'Yes' : 'No'}
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${profile?.email === user?.email ? 'bg-green-500' : 'bg-red-500'}`}></span>
            Email Match: {profile?.email === user?.email ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileDebug