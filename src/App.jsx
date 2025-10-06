import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EnhancedAuthPage from './pages/EnhancedAuthPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import LandingPage from './pages/LandingPage'
import { UserProvider } from './contexts/UserContext'

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<EnhancedAuthPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
