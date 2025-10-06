import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import AuthPage from './pages/AuthPage' // Old version
import EnhancedAuthPage from './pages/EnhancedAuthPage' // Enhanced version with animations
import DashboardPage from './pages/DashboardPage'
import { UserProvider } from './contexts/UserContext'

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<EnhancedAuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
