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

const EnhancedAuthPage = lazy(() => import('./pages/EnhancedAuthPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const KanbanPage = lazy(() => import('./pages/KanbanPage'))
const CalendarPage = lazy(() => import('./pages/CalendarPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const TaskDashboardSkeleton = lazy(() => import('./pages/TaskDashboardSkeleton'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))
const CommandPaletteLazy = lazy(() => import('./components/ui/CommandPalette'))

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<SimpleLandingPage />} />
        <Route path="/auth" element={<EnhancedAuthPage />} />
        
        {/* Protected Routes - Require Authentication */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/tasks" element={
          <ProtectedRoute>
            <TaskDashboardSkeleton />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/tasks/skeleton" element={
          <ProtectedRoute>
            <TaskDashboardSkeleton />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/kanban" element={
          <ProtectedRoute>
            <KanbanPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/calendar" element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/search" element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/projects" element={
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/team" element={
          <ProtectedRoute>
            <TeamPage />
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
    </AnimatePresence>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UserProvider>
          <Router>
            <Suspense fallback={<PageLoadingSkeleton />}>
              <RouteAnalytics />
              <AppRoutes />
              {/* Global command palette (Ctrl/Cmd + K) */}
              <React.Suspense fallback={null}>
                <CommandPaletteLazy />
              </React.Suspense>
            </Suspense>
          </Router>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
