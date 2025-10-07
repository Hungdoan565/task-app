// tests/smoke.test.js
import { describe, it, expect } from 'vitest'

describe('smoke', () => {
  it('runs basic assertion', () => {
    expect(1 + 1).toBe(2)
  })
})
