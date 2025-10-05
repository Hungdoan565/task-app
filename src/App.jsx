import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import AuthPage from './pages/AuthPage' // Old version
import EnhancedAuthPage from './pages/EnhancedAuthPage' // Enhanced version with animations
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<EnhancedAuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  )
}

export default App
