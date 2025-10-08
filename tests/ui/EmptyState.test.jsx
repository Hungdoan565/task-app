// tests/ui/EmptyState.test.jsx
import { describe, it, expect } from 'vitest'
import React from 'react'
import { renderToString } from 'react-dom/server'
import EmptyState from '../../src/components/ui/EmptyState.jsx'

describe('EmptyState', () => {
  it('renders title and description', () => {
    const html = renderToString(
      <EmptyState title="No tasks found" description="Create your first task to get started." />
    )
    expect(html).toContain('No tasks found')
    expect(html).toContain('Create your first task to get started.')
  })

  it('renders primary action label', () => {
    const html = renderToString(
      <EmptyState title="No data" description="Desc" primaryAction={{ label: '+ New Task', onClick: () => {} }} />
    )
    expect(html).toContain('+ New Task')
  })
})
