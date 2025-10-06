// src/services/userService.js
// User profile management with Firestore

import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  increment 
} from 'firebase/firestore/lite'
import { db } from '../lib/firebase'

/**
 * User Profile Data Structure
 * {
 *   uid: string,
 *   email: string,
 *   displayName: string,
 *   photoURL: string | null,
 *   provider: 'email' | 'google' | 'github',
 *   providerData: object,
 *   profile: {
 *     firstName: string,
 *     lastName: string,
 *     fullName: string,
 *     company: string | null,
 *     jobTitle: string | null,
 *     phone: string | null,
 *     bio: string | null,
 *     timezone: string,
 *     language: string,
 *   },
 *   preferences: {
 *     theme: 'light' | 'dark' | 'system',
 *     notifications: {
 *       email: boolean,
 *       push: boolean,
 *       tasks: boolean,
 *       reminders: boolean,
 *     },
 *     privacy: {
 *       profileVisible: boolean,
 *       showEmail: boolean,
 *     }
 *   },
 *   metadata: {
 *     createdAt: timestamp,
 *     updatedAt: timestamp,
 *     lastLogin: timestamp,
 *     isActive: boolean,
 *     accountStatus: 'active' | 'suspended' | 'deleted'
 *   },
 *   stats: {
 *     tasksCompleted: number,
 *     projectsCreated: number,
 *     loginCount: number,
 *   }
 * }
 */

// Users collection reference
const USERS_COLLECTION = 'users'

/**
 * Create a new user profile in Firestore
 * @param {Object} firebaseUser - Firebase Auth user object
 * @param {Object} additionalData - Additional user data
 * @returns {Promise<Object>} User profile data
 */
export const createUserProfile = async (firebaseUser, additionalData = {}) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, firebaseUser.uid)
    
    // Check if user already exists (network only with Firestore Lite)
    let userSnap
    try {
      userSnap = await getDoc(userRef)
    } catch (err) {
      console.warn('⚠️ Network error when checking user profile:', err.message)
    }

    if (userSnap && userSnap.exists()) {
      console.log('User profile already exists, updating last login...')
      await updateLastLogin(firebaseUser.uid).catch(() => {})
      return userSnap.data()
    }

    // Extract provider info
    const providerData = firebaseUser.providerData[0] || {}
    const provider = getAuthProvider(providerData.providerId)

    // Compute a robust display name with fallback (provider → passed-in → email prefix)
    const displayNameFinal = computeDisplayName(firebaseUser, additionalData)
    
    // Parse display name
    const { firstName, lastName } = parseDisplayName(displayNameFinal)
    
    // Create user profile data
    const userProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: displayNameFinal,
      photoURL: firebaseUser.photoURL || null,
      provider: provider,
      providerData: {
        providerId: providerData.providerId || null,
        uid: providerData.uid || null,
      },
      profile: {
        firstName: firstName,
        lastName: lastName,
        fullName: displayNameFinal,
        company: additionalData.company || null,
        jobTitle: additionalData.jobTitle || null,
        phone: additionalData.phone || null,
        bio: additionalData.bio || null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language || 'en-US',
      },
      preferences: {
        theme: 'system',
        notifications: {
          email: true,
          push: true,
          tasks: true,
          reminders: true,
        },
        privacy: {
          profileVisible: true,
          showEmail: false,
        }
      },
      metadata: {
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        isActive: true,
        accountStatus: 'active'
      },
      stats: {
        tasksCompleted: 0,
        projectsCreated: 0,
        loginCount: 1,
      }
    }

    // Save to Firestore (merge to be idempotent)
    await setDoc(userRef, userProfile, { merge: true })
    
    console.log('✅ User profile created successfully:', userProfile.uid)
    return userProfile
    
  } catch (error) {
    console.error('❌ Error creating user profile:', error)
    throw new Error('Failed to create user profile: ' + error.message)
  }
}

/**
 * Get user profile from Firestore
 * @param {string} uid - User ID
 * @returns {Promise<Object|null>} User profile data or null
 */
export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) return userSnap.data()
    console.log('No user profile found for UID:', uid)
    return null
  } catch (error) {
    console.error('❌ Error getting user profile:', error)
    return null
  }
}

/**
 * Update user profile in Firestore
 * @param {string} uid - User ID
 * @param {Object} updates - Data to update
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (uid, updates) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid)
    
    const updateData = {
      ...updates,
      'metadata.updatedAt': serverTimestamp()
    }
    
    await updateDoc(userRef, updateData)
    console.log('✅ User profile updated successfully:', uid)
    
  } catch (error) {
    console.error('❌ Error updating user profile:', error)
    throw new Error('Failed to update user profile: ' + error.message)
  }
}

/**
 * Update user's last login timestamp
 * @param {string} uid - User ID
 * @returns {Promise<void>}
 */
export const updateLastLogin = async (uid) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid)
    await updateDoc(userRef, {
      'metadata.lastLogin': serverTimestamp(),
      'metadata.updatedAt': serverTimestamp(),
      'stats.loginCount': increment(1)
    })
  } catch (error) {
    console.error('❌ Error updating last login:', error)
  }
}

/**
 * Update user preferences
 * @param {string} uid - User ID  
 * @param {Object} preferences - Preference updates
 * @returns {Promise<void>}
 */
export const updateUserPreferences = async (uid, preferences) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid)
    await updateDoc(userRef, {
      preferences: preferences,
      'metadata.updatedAt': serverTimestamp()
    })
    console.log('✅ User preferences updated:', uid)
  } catch (error) {
    console.error('❌ Error updating preferences:', error)
    throw new Error('Failed to update preferences: ' + error.message)
  }
}

/**
 * Update user stats
 * @param {string} uid - User ID
 * @param {Object} stats - Stats to update
 * @returns {Promise<void>}
 */
export const updateUserStats = async (uid, stats) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid)
    await updateDoc(userRef, {
      stats: stats,
      'metadata.updatedAt': serverTimestamp()
    })
  } catch (error) {
    console.error('❌ Error updating user stats:', error)
  }
}

/**
 * Check if email is already registered
 * @param {string} email - Email to check
 * @returns {Promise<boolean>} True if email exists
 */
export const emailExists = async (email) => {
  try {
    const usersRef = collection(db, USERS_COLLECTION)
    const q = query(usersRef, where('email', '==', email))
    const querySnapshot = await getDocs(q)
    
    return !querySnapshot.empty
  } catch (error) {
    console.error('❌ Error checking email existence:', error)
    return false
  }
}

/**
 * Soft delete user account
 * @param {string} uid - User ID
 * @returns {Promise<void>}
 */
export const deleteUserProfile = async (uid) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid)
    await updateDoc(userRef, {
      'metadata.accountStatus': 'deleted',
      'metadata.isActive': false,
      'metadata.updatedAt': serverTimestamp()
    })
    console.log('✅ User account deleted (soft delete):', uid)
  } catch (error) {
    console.error('❌ Error deleting user profile:', error)
    throw new Error('Failed to delete user profile: ' + error.message)
  }
}

// Helper Functions

/**
 * Parse display name into first and last name
 * @param {string} displayName - Full display name
 * @returns {Object} {firstName, lastName}
 */
const parseDisplayName = (displayName) => {
  if (!displayName || displayName.trim() === '') {
    return { firstName: '', lastName: '' }
  }
  
  const nameParts = displayName.trim().split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''
  
  return { firstName, lastName }
}

/**
 * Get auth provider from provider ID
 * @param {string} providerId - Firebase provider ID
 * @returns {string} Simplified provider name
 */
const getAuthProvider = (providerId) => {
  if (!providerId) return 'email'
  
  if (providerId.includes('google')) return 'google'
  if (providerId.includes('github')) return 'github'
  if (providerId.includes('facebook')) return 'facebook'
  if (providerId.includes('twitter')) return 'twitter'
  
  return 'email'
}

/**
 * Compute a robust display name using available sources
 * Priority: Firebase user.displayName -> additionalData.fullName -> additionalData.username -> email local part
 */
const computeDisplayName = (firebaseUser, additionalData = {}) => {
  const raw = (firebaseUser?.displayName || '').trim()
  const addFull = (additionalData.fullName || '').trim()
  const addUser = (additionalData.username || '').trim()
  const emailLocal = (firebaseUser?.email || '').split('@')[0]
  return raw || addFull || addUser || emailLocal || ''
}

/**
 * Get user profile with error handling and fallback
 * @param {Object} firebaseUser - Firebase Auth user
 * @returns {Promise<Object>} User profile or created profile
 */
export const getOrCreateUserProfile = async (firebaseUser, additionalData = {}) => {
  try {
    // Try to get existing profile
    let userProfile = await getUserProfile(firebaseUser.uid)
    
    // If no profile exists, create one
    if (!userProfile) {
      console.log('Creating new user profile for:', firebaseUser.email)
      userProfile = await createUserProfile(firebaseUser, additionalData)
    } else {
      // Update last login for existing users (non-blocking)
      updateLastLogin(firebaseUser.uid).catch(() => {})

      // If legacy profiles are missing display name or full name, patch them once
      try {
        const computedName = computeDisplayName(firebaseUser, additionalData)
        const needsDisplay = !userProfile.displayName || userProfile.displayName.trim() === ''
        const needsFull = !userProfile.profile?.fullName || userProfile.profile.fullName.trim() === ''
        if (computedName && (needsDisplay || needsFull)) {
          const { firstName, lastName } = parseDisplayName(computedName)
          await updateUserProfile(firebaseUser.uid, {
            ...(needsDisplay ? { displayName: computedName } : {}),
            ...(needsFull ? { 'profile.fullName': computedName } : {}),
            ...(needsFull ? { 'profile.firstName': firstName, 'profile.lastName': lastName } : {})
          })
          // Update local copy to reflect changes
          userProfile = {
            ...userProfile,
            displayName: needsDisplay ? computedName : userProfile.displayName,
            profile: {
              ...userProfile.profile,
              fullName: needsFull ? computedName : userProfile.profile?.fullName,
              firstName: needsFull ? firstName : userProfile.profile?.firstName,
              lastName: needsFull ? lastName : userProfile.profile?.lastName,
            }
          }
        }
      } catch (_) {}
    }
    
    return userProfile
  } catch (error) {
    console.error('❌ Error in getOrCreateUserProfile:', error)
    // In worst case, return a minimal profile to keep UI usable
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: computeDisplayName(firebaseUser, additionalData),
      photoURL: firebaseUser.photoURL || null,
      provider: (firebaseUser.providerData[0]?.providerId || 'password').includes('google') ? 'google' : (firebaseUser.providerData[0]?.providerId || '').includes('github') ? 'github' : 'email',
      profile: { fullName: computeDisplayName(firebaseUser, additionalData) },
      metadata: {}
    }
  }
}

// Export default object with all functions
export default {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  updateLastLogin,
  updateUserPreferences,
  updateUserStats,
  emailExists,
  deleteUserProfile,
  getOrCreateUserProfile
}