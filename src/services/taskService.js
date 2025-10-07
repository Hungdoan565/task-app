// src/services/taskService.js
// Firestore service for Task CRUD and realtime subscriptions

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const TASKS_COLLECTION = 'tasks'

// Unified sort for tasks across views (Panels/Kanban)
export function sortTasksUnified(items = []) {
  return [...items].sort((a, b) => {
    // Prefer createdAt (Firestore Timestamp), fallback to position, then createdAt millis
    const aCreated = typeof a.createdAt?.seconds === 'number' ? a.createdAt.seconds : (typeof a.createdAt === 'number' ? a.createdAt : 0)
    const bCreated = typeof b.createdAt?.seconds === 'number' ? b.createdAt.seconds : (typeof b.createdAt === 'number' ? b.createdAt : 0)
    const aScore = aCreated || a.position || 0
    const bScore = bCreated || b.position || 0
    // Descending (newest/top first)
    return bScore - aScore
  })
}

// Create a new task for owner
// For backward compatibility, write both owner and ownerId fields
export async function createTask(ownerId, data) {
  const payload = {
    owner: ownerId,
    ownerId: ownerId,
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
// Prefer querying by canonical field `owner`; fallback to legacy `ownerId` if no results
export async function getTasksByOwner(ownerId, opts = {}) {
  const colRef = collection(db, TASKS_COLLECTION)
  let q = query(colRef, where('owner', '==', ownerId))
  let snap = await getDocs(q)

  // Fallback to legacy field if empty
  if (snap.empty) {
    q = query(colRef, where('ownerId', '==', ownerId))
    snap = await getDocs(q)
  }

  let items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  // Client-side filter and sort for simplicity
  if (opts.status && opts.status !== 'all') {
    items = items.filter((t) => t.status === opts.status)
  }
  return sortTasksUnified(items)
}

// Realtime subscription by owner (optional status filter)
export function subscribeTasksByOwner(ownerId, callback, opts = {}) {
  const colRef = collection(db, TASKS_COLLECTION)
  const clauses = [where('owner', '==', ownerId)]
  if (opts.status && opts.status !== 'all') {
    clauses.push(where('status', '==', opts.status))
  }
  clauses.push(orderBy('createdAt', 'desc'))
  const q = query(colRef, ...clauses)
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const sorted = sortTasksUnified(items)
    callback(sorted)
  })
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
  sortTasksUnified,
  createTask,
  getTasksByOwner,
  subscribeTasksByOwner,
  updateTask,
  deleteTask,
  nextStatus,
}
