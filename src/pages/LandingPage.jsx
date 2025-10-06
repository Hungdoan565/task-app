import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

export default function LandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated, getUserDisplayName } = useUser()

  return (
    <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900">
      <header className="border-b border-warm-gray-200 dark:border-warm-gray-800 bg-white/70 dark:bg-warm-gray-900/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600" />
            <span className="font-semibold text-warm-gray-900 dark:text-warm-gray-50">TaskApp</span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                >
                  Go to Tasks
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero */}
        <section className="mb-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-warm-gray-900 dark:text-warm-gray-50 tracking-tight mb-4">
              Focus. Organize. Ship.
            </h1>
            <p className="text-lg text-warm-gray-600 dark:text-warm-gray-300 mb-6">
              A minimal task workspace inspired by Notion. Capture tasks, move fast, and stay aligned.
            </p>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700"
                >
                  Open My Workspace
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 rounded-xl border-2 border-warm-gray-300 dark:border-warm-gray-700 text-warm-gray-800 dark:text-warm-gray-100 hover:bg-warm-gray-100/50 dark:hover:bg-warm-gray-800/50"
                >
                  Create first task
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/auth')}
                  className="px-6 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700"
                >
                  Sign in to get started
                </button>
              </div>
            )}
          </div>
          <div className="rounded-2xl border border-warm-gray-200 dark:border-warm-gray-800 bg-white dark:bg-warm-gray-900 p-6 shadow-sm">
            <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-warm-gray-800 dark:to-warm-gray-800 rounded-xl" />
          </div>
        </section>

        {/* Quick Start for authenticated users */}
        {isAuthenticated && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-4">
              Welcome, {getUserDisplayName()}!
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card
                title="Create your first task"
                actionLabel="Go"
                onAction={() => navigate('/dashboard')}
                description="Open your workspace and add a new task from the input at the top."
              />
              <Card
                title="Switch status quickly"
                actionLabel="Try it"
                onAction={() => navigate('/dashboard')}
                description="Use the status button on each task to cycle Todo → In progress → Done."
              />
              <Card
                title="Stay organized"
                actionLabel="Explore"
                onAction={() => navigate('/dashboard')}
                description="Use filters to see only what matters now. Kanban and DnD coming soon."
              />
            </div>
          </section>
        )}

        {/* Features */}
        <section>
          <h2 className="text-xl font-semibold text-warm-gray-900 dark:text-warm-gray-50 mb-4">Features</h2>
          <ul className="grid md:grid-cols-3 gap-4">
            <li className="p-4 rounded-xl border border-warm-gray-200 dark:border-warm-gray-800 bg-white dark:bg-warm-gray-900">Clean Auth & Profiles</li>
            <li className="p-4 rounded-xl border border-warm-gray-200 dark:border-warm-gray-800 bg-white dark:bg-warm-gray-900">Fast Tasks CRUD</li>
            <li className="p-4 rounded-xl border border-warm-gray-200 dark:border-warm-gray-800 bg-white dark:bg-warm-gray-900">Future: Kanban & DnD</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

function Card({ title, description, actionLabel, onAction }) {
  return (
    <div className="p-5 rounded-xl border border-warm-gray-200 dark:border-warm-gray-800 bg-white dark:bg-warm-gray-900 flex flex-col gap-3">
      <div>
        <h3 className="font-semibold text-warm-gray-900 dark:text-warm-gray-50">{title}</h3>
        <p className="text-warm-gray-600 dark:text-warm-gray-300 text-sm">{description}</p>
      </div>
      <div>
        <button onClick={onAction} className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
          {actionLabel}
        </button>
      </div>
    </div>
  )
}
