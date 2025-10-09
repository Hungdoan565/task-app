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
const DashboardV2 = lazy(() => import('./pages/DashboardV2'))
const InboxPage = lazy(() => import('./pages/v2/InboxPage'))
const TasksPage = lazy(() => import('./pages/v2/TasksPage'))
const NotesPage = lazy(() => import('./pages/v2/NotesPage'))
const ProjectsPage = lazy(() => import('./pages/v2/ProjectsPage'))
const CalendarPage = lazy(() => import('./pages/v2/CalendarPage'))
const WikiPage = lazy(() => import('./pages/v2/WikiPage'))
const TemplatesPage = lazy(() => import('./pages/v2/TemplatesPage'))
const SystemPages = {
  Shared: lazy(() => import('./pages/v2/SystemPages.jsx').then(m => ({ default: m.SharedPage }))),
  Recent: lazy(() => import('./pages/v2/SystemPages.jsx').then(m => ({ default: m.RecentPage }))),
  Trash: lazy(() => import('./pages/v2/SystemPages.jsx').then(m => ({ default: m.TrashPage }))),
}

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
        <Route path="/dashboard-v2" element={
          <ProtectedRoute>
            <DashboardV2 />
          </ProtectedRoute>
        } />
        {/* Notion-style real routes */}
        <Route path="/inbox" element={<ProtectedRoute><InboxPage /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
        <Route path="/tasks/today" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
        <Route path="/tasks/week" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
        <Route path="/tasks/all" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
        <Route path="/tasks/done" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
        <Route path="/wiki" element={<ProtectedRoute><WikiPage /></ProtectedRoute>} />
        <Route path="/templates" element={<ProtectedRoute><TemplatesPage /></ProtectedRoute>} />
        <Route path="/shared" element={<ProtectedRoute><SystemPages.Shared /></ProtectedRoute>} />
        <Route path="/recent" element={<ProtectedRoute><SystemPages.Recent /></ProtectedRoute>} />
        <Route path="/trash" element={<ProtectedRoute><SystemPages.Trash /></ProtectedRoute>} />
        {/* Temporary: new and pinned routes map to Inbox */}
        <Route path="/new" element={<ProtectedRoute><InboxPage /></ProtectedRoute>} />
        <Route path="/p/favorite-1" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
        <Route path="/p/favorite-2" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />

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
