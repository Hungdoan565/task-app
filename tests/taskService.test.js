// tests/taskService.test.js
import { describe, it, expect } from 'vitest'
import { sortTasksUnified, nextStatus } from '../src/services/taskService.js'

function ts(seconds) {
  return { seconds }
}

describe('taskService.sortTasksUnified', () => {
  it('sorts by createdAt.seconds desc when available', () => {
    const items = [
      { id: 'a', createdAt: ts(100) },
      { id: 'b', createdAt: ts(300) },
      { id: 'c', createdAt: ts(200) },
    ]
    const sorted = sortTasksUnified(items)
    expect(sorted.map(i => i.id)).toEqual(['b', 'c', 'a'])
  })

  it('falls back to numeric createdAt then position', () => {
    const items = [
      { id: 'a', createdAt: 100, position: 10 },
      { id: 'b', position: 999 },
      { id: 'c', createdAt: 200, position: 1 },
    ]
    const sorted = sortTasksUnified(items)
    // c (createdAt=200) > a (100) > b (no createdAt, position=999)
    expect(sorted.map(i => i.id)).toEqual(['c', 'a', 'b'])
  })
})

describe('taskService.nextStatus', () => {
  it('cycles status todo -> in_progress -> done -> todo', () => {
    expect(nextStatus('todo')).toBe('in_progress')
    expect(nextStatus('in_progress')).toBe('done')
    expect(nextStatus('done')).toBe('todo')
  })
})
