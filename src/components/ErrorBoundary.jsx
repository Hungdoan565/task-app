import React from 'react'
import { HiExclamationCircle, HiRefresh, HiHome } from 'react-icons/hi'
import { motion } from 'framer-motion'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
    
    // TODO: Log to error reporting service (Sentry, etc.)
    // logErrorToService(error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-warm-gray-50 to-warm-gray-100 dark:from-warm-gray-900 dark:to-warm-gray-800 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full bg-white dark:bg-warm-gray-800 rounded-3xl shadow-2xl p-8 text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-6"
            >
              <HiExclamationCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </motion.div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-warm-gray-900 dark:text-white mb-3">
              Oops! Something went wrong
            </h1>

            {/* Description */}
            <p className="text-warm-gray-600 dark:text-warm-gray-400 mb-8">
              We're sorry, but something unexpected happened. Please try reloading the page or return to the homepage.
            </p>

            {/* Error details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-warm-gray-500 dark:text-warm-gray-400 hover:text-warm-gray-700 dark:hover:text-warm-gray-300 mb-2">
                  Show error details
                </summary>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-xs font-mono text-red-800 dark:text-red-200 overflow-auto max-h-40">
                  <p className="font-bold mb-2">{this.state.error.toString()}</p>
                  <pre className="whitespace-pre-wrap">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg transition-colors"
              >
                <HiRefresh className="w-5 h-5" />
                Reload Page
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-warm-gray-700 border-2 border-warm-gray-300 dark:border-warm-gray-600 text-warm-gray-700 dark:text-warm-gray-300 hover:border-primary-500 rounded-xl font-semibold transition-colors"
              >
                <HiHome className="w-5 h-5" />
                Go Home
              </motion.button>
            </div>

            {/* Support message */}
            <p className="mt-8 text-sm text-warm-gray-500 dark:text-warm-gray-400">
              If the problem persists, please{' '}
              <a 
                href="mailto:support@taskapp.com" 
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                contact support
              </a>
            </p>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
