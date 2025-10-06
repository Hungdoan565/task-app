import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import EnhancedAuthPage from './pages/EnhancedAuthPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import FinalLandingPage from './pages/FinalLandingPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import { UserProvider } from './contexts/UserContext'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UserProvider>
          <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<FinalLandingPage />} />
            <Route path="/auth" element={<EnhancedAuthPage />} />
            
            {/* Protected Routes - Require Authentication */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/tasks" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Router>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
