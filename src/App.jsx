import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SimpleLandingPage from './pages/SimpleLandingPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import { UserProvider } from './contexts/UserContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { PageLoadingSkeleton } from './components/ui/Skeletons'
import RouteAnalytics from './components/RouteAnalytics'
import { ToastProvider } from './contexts/ToastContext'
import './components/ui/Toast.css'

const EnhancedAuthPage = lazy(() => import('./pages/EnhancedAuthPage'))
const HomePage = lazy(() => import('./pages/HomePage'))

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<SimpleLandingPage />} />
        <Route path="/auth" element={<EnhancedAuthPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/tasks" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UserProvider>
          <ToastProvider>
            <Router>
              <Suspense fallback={<PageLoadingSkeleton />}>
                <RouteAnalytics />
                <AppRoutes />
              </Suspense>
            </Router>
          </ToastProvider>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
