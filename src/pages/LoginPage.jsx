import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import { auth, provider as googleProvider } from '../lib/firebase'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { cn } from '../lib/utils'
import { FaGoogle, FaGithub } from 'react-icons/fa'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(null) // 'google' | 'github' | null
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setError(getErrorMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setOauthLoading('google')

    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/dashboard')
    } catch (err) {
      console.error('Google login error:', err)
      setError(getErrorMessage(err.code))
    } finally {
      setOauthLoading(null)
    }
  }

  const handleGithubLogin = async () => {
    setError('')
    setOauthLoading('github')

    try {
      const githubProvider = new GithubAuthProvider()
      await signInWithPopup(auth, githubProvider)
      navigate('/dashboard')
    } catch (err) {
      console.error('GitHub login error:', err)
      setError(getErrorMessage(err.code))
    } finally {
      setOauthLoading(null)
    }
  }

  const getErrorMessage = (code) => {
    const errorMessages = {
      'auth/invalid-email': 'Invalid email address format.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/invalid-credential': 'Invalid email or password.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/popup-closed-by-user': 'Sign-in popup was closed before completing.',
      'auth/cancelled-popup-request': 'Only one popup request is allowed at a time.',
    }
    return errorMessages[code] || 'An error occurred. Please try again.'
  }

  const isFormValid = formData.email && formData.password

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-gray-50 via-warm-gray-100 to-warm-gray-50 dark:from-warm-gray-900 dark:via-warm-gray-800 dark:to-warm-gray-900 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 shadow-lg shadow-primary-500/20 mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
            Welcome Back
          </h1>
          <p className="text-warm-gray-600 dark:text-warm-gray-400">
            Sign in to continue to your workspace
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-warm-gray-800 rounded-2xl shadow-xl border border-warm-gray-200 dark:border-warm-gray-700 p-8 animate-slide-up">
          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-center gap-3 h-12 text-base font-medium hover:bg-warm-gray-50 dark:hover:bg-warm-gray-700 transition-all duration-200"
              onClick={handleGoogleLogin}
              disabled={loading || oauthLoading !== null}
            >
              {oauthLoading === 'google' ? (
                <div className="w-5 h-5 border-2 border-warm-gray-300 border-t-warm-gray-600 rounded-full animate-spin" />
              ) : (
                <FaGoogle className="w-5 h-5 text-red-500" />
              )}
              <span>Continue with Google</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full justify-center gap-3 h-12 text-base font-medium hover:bg-warm-gray-50 dark:hover:bg-warm-gray-700 transition-all duration-200"
              onClick={handleGithubLogin}
              disabled={loading || oauthLoading !== null}
            >
              {oauthLoading === 'github' ? (
                <div className="w-5 h-5 border-2 border-warm-gray-300 border-t-warm-gray-600 rounded-full animate-spin" />
              ) : (
                <FaGithub className="w-5 h-5 text-warm-gray-900 dark:text-warm-gray-100" />
              )}
              <span>Continue with GitHub</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-warm-gray-300 dark:border-warm-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-warm-gray-800 text-warm-gray-500 dark:text-warm-gray-400 font-medium">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 animate-shake">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-800 dark:text-red-200 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-2"
              >
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading || oauthLoading !== null}
                className="h-12"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading || oauthLoading !== null}
                className="h-12"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={loading || oauthLoading !== null}
                  className="w-4 h-4 rounded border-warm-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer transition-all"
                />
                <span className="text-sm text-warm-gray-600 dark:text-warm-gray-400 group-hover:text-warm-gray-900 dark:group-hover:text-warm-gray-200 transition-colors">
                  Remember me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-200"
              disabled={!isFormValid || loading || oauthLoading !== null}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-warm-gray-600 dark:text-warm-gray-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
          >
            Sign up for free
          </Link>
        </p>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-warm-gray-500 dark:text-warm-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="underline hover:text-warm-gray-700 dark:hover:text-warm-gray-300">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-warm-gray-700 dark:hover:text-warm-gray-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
