import React from 'react'
import { Navigate } from 'react-router-dom'

// Deprecated: Use EnhancedAuthPage (/auth) as the canonical auth screen
export default function LoginPage() {
  return <Navigate to="/auth" replace />
}
