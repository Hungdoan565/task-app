// src/lib/firebase.js
// Firebase initialization and configuration

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBchNSAYpb7xsBsrR8DJBvcyVeSNv3hPXA",
  authDomain: "task-management-255a1.firebaseapp.com",
  projectId: "task-management-255a1",
  storageBucket: "task-management-255a1.firebasestorage.app",
  messagingSenderId: "310936292819",
  appId: "1:310936292819:web:f7bfb51a000a23d0e93326",
  measurementId: "G-W18Z182T09"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
const auth = getAuth(app)
// Initialize Firestore (full SDK for realtime + offline)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

// Initialize Analytics (only in browser environment) and enable Firestore persistence
let analytics = null
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
  // Enable offline persistence (ignore errors such as multiple tabs)
  enableIndexedDbPersistence(db).catch(() => {})
}

// Explicit mock flag for other modules (currently disabled)
const USE_MOCK = false

export { app, auth, db, provider, analytics, USE_MOCK }
