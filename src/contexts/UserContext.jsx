// src/contexts/UserContext.jsx
// User profile context and provider

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { getOrCreateUserProfile, updateLastLogin } from '../services/userService'
import { setAnalyticsUser, setAnalyticsUserProps } from '../lib/analytics'

// User context
const UserContext = createContext()

// Action types
const USER_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_PROFILE: 'SET_PROFILE',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  CLEAR_USER: 'CLEAR_USER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

// Initial state
const initialState = {
  // Firebase Auth user
  user: null,
  // Extended user profile from Firestore
  profile: null,
  // Loading states
  loading: true,
  profileLoading: false,
  // Error state
  error: null,
  // Authentication status
  isAuthenticated: false,
  // Profile completion status
  isProfileComplete: false
}

// User reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    
    case USER_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null
      }
    
    case USER_ACTIONS.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        profileLoading: false,
        isProfileComplete: checkProfileCompletion(action.payload),
        error: null
      }
    
    case USER_ACTIONS.UPDATE_PROFILE:
      const updatedProfile = { ...state.profile, ...action.payload }
      return {
        ...state,
        profile: updatedProfile,
        isProfileComplete: checkProfileCompletion(updatedProfile),
        error: null
      }
    
    case USER_ACTIONS.CLEAR_USER:
      return {
        ...initialState,
        loading: false
      }
    
    case USER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        profileLoading: false
      }
    
    case USER_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    
    default:
      return state
  }
}

// Helper function to check if profile is complete
const checkProfileCompletion = (profile) => {
  if (!profile) return false
  
  const required = [
    profile.email,
    profile.profile?.fullName,
    profile.profile?.firstName
  ]
  
  return required.every(field => field && field.trim() !== '')
}

// User Context Provider Component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Set Firebase user
          dispatch({ type: USER_ACTIONS.SET_USER, payload: firebaseUser })

          // Analytics: set user id & basic props early
          try {
            await setAnalyticsUser(firebaseUser.uid)
            const providerId = firebaseUser.providerData?.[0]?.providerId || 'email'
            const provider = providerId.includes('google') ? 'google' : providerId.includes('github') ? 'github' : 'email'
            const emailDomain = (firebaseUser.email || '').split('@')[1] || ''
            await setAnalyticsUserProps({ provider, email_domain: emailDomain })
          } catch (_) {}
          
          // Load or create user profile
          dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true })
          
          try {
            const userProfile = await getOrCreateUserProfile(firebaseUser)
            dispatch({ type: USER_ACTIONS.SET_PROFILE, payload: userProfile })
            // Analytics: enrich user properties from profile
            try {
              await setAnalyticsUserProps({
                provider: userProfile?.provider || undefined,
                preferred_theme: userProfile?.preferences?.theme || undefined,
                has_profile: true,
              })
            } catch (_) {}
          } catch (profileError) {
            console.error('❌ Error loading user profile:', profileError)
            dispatch({ type: USER_ACTIONS.SET_ERROR, payload: profileError.message })
          }
          
        } else {
          // User signed out
          dispatch({ type: USER_ACTIONS.CLEAR_USER })
          try { await setAnalyticsUser(null) } catch (_) {}
        }
      } catch (error) {
        console.error('❌ Auth state change error:', error)
        dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error.message })
      } finally {
        dispatch({ type: USER_ACTIONS.SET_LOADING, payload: false })
      }
    })

    return () => unsubscribe()
  }, [])

  // Context value
  const value = {
    // State
    ...state,
    
    // Actions
    updateProfile: (updates) => {
      dispatch({ type: USER_ACTIONS.UPDATE_PROFILE, payload: updates })
    },
    
    setProfile: (profile) => {
      dispatch({ type: USER_ACTIONS.SET_PROFILE, payload: profile })
    },
    
    setError: (error) => {
      dispatch({ type: USER_ACTIONS.SET_ERROR, payload: error })
    },
    
    clearError: () => {
      dispatch({ type: USER_ACTIONS.CLEAR_ERROR })
    },
    
    setProfileLoading: (loading) => {
      dispatch({ type: USER_ACTIONS.SET_LOADING, payload: loading })
    },
    
    // Helper methods
    isLoggedIn: () => !!state.user && state.isAuthenticated,
    
    getUserDisplayName: () => {
      if (state.profile?.profile?.fullName) {
        return state.profile.profile.fullName
      }
      if (state.profile?.displayName) {
        return state.profile.displayName
      }
      if (state.user?.displayName) {
        return state.user.displayName
      }
      if (state.profile?.email) {
        return state.profile.email.split('@')[0]
      }
      return 'User'
    },
    
    getUserAvatar: () => {
      return state.profile?.photoURL || state.user?.photoURL || null
    },
    
    getUserEmail: () => {
      return state.profile?.email || state.user?.email || ''
    },
    
    isEmailUser: () => {
      return state.profile?.provider === 'email'
    },
    
    isOAuthUser: () => {
      const provider = state.profile?.provider
      return provider === 'google' || provider === 'github'
    },
    
    getProvider: () => {
      return state.profile?.provider || 'unknown'
    }
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Custom hook to use the User context
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

// HOC for components that require authentication
export const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, loading } = useUser()
    
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      )
    }
    
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600">Please sign in to access this page.</p>
          </div>
        </div>
      )
    }
    
    return <WrappedComponent {...props} />
  }
}

// Hook for checking if user profile is complete
export const useProfileCompletion = () => {
  const { profile, isProfileComplete } = useUser()
  
  const getMissingFields = () => {
    if (!profile) return ['profile']
    
    const missing = []
    
    if (!profile.email || profile.email.trim() === '') {
      missing.push('email')
    }
    
    if (!profile.profile?.fullName || profile.profile.fullName.trim() === '') {
      missing.push('fullName')
    }
    
    if (!profile.profile?.firstName || profile.profile.firstName.trim() === '') {
      missing.push('firstName')
    }
    
    return missing
  }
  
  return {
    isComplete: isProfileComplete,
    missingFields: getMissingFields(),
    completionPercentage: profile ? Math.round(((3 - getMissingFields().length) / 3) * 100) : 0
  }
}

export default UserContext