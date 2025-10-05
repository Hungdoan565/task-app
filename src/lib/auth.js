// src/lib/auth.js
// Auth helpers for Firebase with mock-mode fallback

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, provider, USE_MOCK } from './firebase'

const STORAGE_KEY = 'taskapp_mock_user'

function getMockUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (_) {
    return null
  }
}

function setMockUser(u) {
  try {
    if (!u) localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
  } catch (_) {}
}

export async function loginWithGoogle() {
  if (USE_MOCK) {
    const mock = { uid: 'mock-uid', displayName: 'Mock User', email: 'mock@example.com' }
    setMockUser(mock)
    return mock
  }
  const prov = provider || new GoogleAuthProvider()
  const res = await signInWithPopup(auth, prov)
  return res.user
}

export async function loginWithEmail(email, password) {
  if (USE_MOCK) {
    const mock = { uid: 'mock-uid', displayName: 'Mock User', email }
    setMockUser(mock)
    return mock
  }
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return user
}

export async function registerWithEmail(name, email, password) {
  if (USE_MOCK) {
    const mock = { uid: 'mock-uid', displayName: name, email }
    setMockUser(mock)
    return mock
  }
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  if (name) await updateProfile(user, { displayName: name })
  return user
}

export async function logout() {
  if (USE_MOCK) {
    setMockUser(null)
    return
  }
  await signOut(auth)
}

export function onAuthChanged(callback) {
  if (USE_MOCK) {
    // Emit current mock user and attach storage listener
    const u = getMockUser()
    callback(u)
    const handler = () => callback(getMockUser())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }
  return onAuthStateChanged(auth, callback)
}

export function getCurrentUser() {
  if (USE_MOCK) return getMockUser()
  return auth?.currentUser || null
}
