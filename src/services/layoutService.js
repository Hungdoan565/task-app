// src/services/layoutService.js
// Persist and load per-user Home layout in Firestore

import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const DEFAULT_HOME_LAYOUT = {
  left: ['quickCapture', 'shortcuts'],
  center: ['today', 'nextUp'],
  right: ['nextEvent', 'pinned', 'progress'],
}

const settingsDoc = (uid) => doc(db, 'users', uid, 'settings', 'home')

export async function getHomeLayout(uid) {
  try {
    const ref = settingsDoc(uid)
    const snap = await getDoc(ref)
    if (snap.exists()) {
      const data = snap.data()
      const l = data.layout || {}
      // Backward compatibility: migrate old {left,right} to {left,center,right}
      if (Array.isArray(l.center) && Array.isArray(l.left) && Array.isArray(l.right)) {
        return { left: l.left, center: l.center, right: l.right }
      }
      if (Array.isArray(l.left) && Array.isArray(l.right)) {
        // Old saved layout: assume left was main column
        return {
          left: ['quickCapture', 'shortcuts'],
          center: ['today', 'nextUp'],
          right: Array.isArray(l.right) ? l.right : DEFAULT_HOME_LAYOUT.right,
        }
      }
    }
  } catch (_) {}
  return DEFAULT_HOME_LAYOUT
}

export async function saveHomeLayout(uid, layout) {
  try {
    const ref = settingsDoc(uid)
    await setDoc(
      ref,
      {
        layout: {
          left: Array.isArray(layout.left) ? layout.left : DEFAULT_HOME_LAYOUT.left,
          center: Array.isArray(layout.center) ? layout.center : DEFAULT_HOME_LAYOUT.center,
          right: Array.isArray(layout.right) ? layout.right : DEFAULT_HOME_LAYOUT.right,
        },
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
    return true
  } catch (_) {
    return false
  }
}
