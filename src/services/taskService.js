// src/services/taskService.js
// Firestore Lite service for basic Task CRUD

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const TASKS_COLLECTION = 'tasks'

// Create a new task for owner
export async function createTask(ownerId, data) {
  const payload = {
    ownerId,
    title: (data.title || '').trim(),
    description: data.description || '',
    status: data.status || 'todo',
    priority: data.priority || 'medium',
    position: typeof data.position === 'number' ? data.position : Date.now(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  const ref = await addDoc(collection(db, TASKS_COLLECTION), payload)
  return { id: ref.id, ...payload }
}

// Get tasks by owner (optionally filter by status)
export async function getTasksByOwner(ownerId, opts = {}) {
  // Fetch by owner only to avoid requiring composite indexes (Lite-friendly)
  const q = query(collection(db, TASKS_COLLECTION), where('ownerId', '==', ownerId))
  const snap = await getDocs(q)
  let items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  // Client-side filter and sort for simplicity
  if (opts.status && opts.status !== 'all') {
    items = items.filter((t) => t.status === opts.status)
  }
  items.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
  return items
}

// Update a task
export async function updateTask(id, patch) {
  const ref = doc(db, TASKS_COLLECTION, id)
  await updateDoc(ref, { ...patch, updatedAt: serverTimestamp() })
}

// Delete a task
export async function deleteTask(id) {
  const ref = doc(db, TASKS_COLLECTION, id)
  await deleteDoc(ref)
}

export function nextStatus(current) {
  const order = ['todo', 'in_progress', 'done']
  const idx = order.indexOf(current)
  return order[(idx + 1) % order.length]
}

export default {
  createTask,
  getTasksByOwner,
  updateTask,
  deleteTask,
  nextStatus,
}
