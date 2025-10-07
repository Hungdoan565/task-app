// src/lib/firestore.js
// DEPRECATED: Use services/taskService.js instead for Task CRUD and subscriptions.
// This module is kept temporarily for backward-compatibility. New code MUST import from services.

import { logger } from '../services/logger'
import taskSvc from '../services/taskService'

// Deprecated re-exports (forwarders)
/** @deprecated use services/taskService.createTask */
export const createTask = (...args) => {
  logger.warn('[deprecated] lib/firestore.createTask -> use services/taskService.createTask')
  return taskSvc.createTask(...args)
}
/** @deprecated use services/taskService.updateTask */
export const updateTask = (...args) => {
  logger.warn('[deprecated] lib/firestore.updateTask -> use services/taskService.updateTask')
  return taskSvc.updateTask(...args)
}
/** @deprecated use services/taskService.deleteTask */
export const deleteTask = (...args) => {
  logger.warn('[deprecated] lib/firestore.deleteTask -> use services/taskService.deleteTask')
  return taskSvc.deleteTask(...args)
}

/**
 * @deprecated Prefer board services (to be introduced). Kept for transitional support only.
 */
export function listenTasksByBoard() {
  logger.warn('[deprecated] lib/firestore.listenTasksByBoard is deprecated; move to services (board)')
  throw new Error('listenTasksByBoard deprecated - migrate to services layer')
}
