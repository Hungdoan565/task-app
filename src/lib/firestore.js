// src/lib/firestore.js
// Firestore helpers for boards and tasks with mock-mode fallback.

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db, USE_MOCK } from './firebase'

const LS_BOARD = 'taskapp_mock_boards'
const LS_TASK = 'taskapp_mock_tasks'

function readLS(key, def = []) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : def
  } catch (_) {
    return def
  }
}
function writeLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch (_) {}
}

// Data shapes
// Board: { id, name, columns: [{id, name, order}], createdAt }
// Task: { id, boardId, columnId, title, description, priority, dueDate, assignedTo[], position, createdAt }

export async function createTask(task) {
  if (USE_MOCK) {
    const tasks = readLS(LS_TASK)
    const id = crypto.randomUUID()
    const newTask = { id, createdAt: Date.now(), position: 0, ...task }
    writeLS(LS_TASK, [newTask, ...tasks])
    return newTask
  }
  const ref = await addDoc(collection(db, 'tasks'), {
    ...task,
    position: task.position ?? 0,
    createdAt: serverTimestamp(),
  })
  return { id: ref.id, ...task }
}

export async function updateTask(id, patch) {
  if (USE_MOCK) {
    const tasks = readLS(LS_TASK)
    const idx = tasks.findIndex((t) => t.id === id)
    if (idx >= 0) {
      tasks[idx] = { ...tasks[idx], ...patch }
      writeLS(LS_TASK, tasks)
      return tasks[idx]
    }
    return null
  }
  await updateDoc(doc(db, 'tasks', id), patch)
}

export async function deleteTask(id) {
  if (USE_MOCK) {
    const tasks = readLS(LS_TASK)
    writeLS(LS_TASK, tasks.filter((t) => t.id !== id))
    return
  }
  await deleteDoc(doc(db, 'tasks', id))
}

export function listenTasksByBoard(boardId, callback) {
  if (USE_MOCK) {
    const emit = () => {
      const tasks = readLS(LS_TASK).filter((t) => t.boardId === boardId)
      callback(tasks)
    }
    emit()
    const handler = () => emit()
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }
  const q = query(
    collection(db, 'tasks'),
    where('boardId', '==', boardId),
    orderBy('position', 'asc')
  )
  return onSnapshot(q, (snap) => {
    const tasks = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(tasks)
  })
}

// Optionally we can add boards helpers similarly...
