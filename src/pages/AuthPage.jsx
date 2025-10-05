import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup, 
  GithubAuthProvider,
  updateProfile
} from 'firebase/auth'
import { auth, provider as googleProvider } from '../lib/firebase'
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa'
import { HiSparkles, HiLockClosed, HiMail, HiUser } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(null)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    rememberMe: false,
  })

  // Reset form when switching modes
  useEffect(() => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      rememberMe: false,
    })
    setError('')
    setShowPassword(false)
  }, [isLogin])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return false
    }
    
    if (!isLogin) {
      if (!formData.fullName) {
        setError('Please enter your full name')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return false
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return false
      }
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        await updateProfile(userCredential.user, {
          displayName: formData.fullName
        })
      }
      navigate('/dashboard')
    } catch (err) {
      console.error('Auth error:', err)
      setError(getErrorMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    if (oauthLoading) return // Prevent multiple clicks
    
    setError('')
    setOauthLoading('google')

    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (result.user) {
        navigate('/dashboard')
      }
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setError(getErrorMessage(err.code))
      }
    } finally {
      // Delay clearing to prevent rapid re-clicks
      setTimeout(() => setOauthLoading(null), 500)
    }
  }

  const handleGithubAuth = async () => {
    if (oauthLoading) return // Prevent multiple clicks
    
    setError('')
    setOauthLoading('github')

    try {
      const githubProvider = new GithubAuthProvider()
      const result = await signInWithPopup(auth, githubProvider)
      if (result.user) {
        navigate('/dashboard')
      }
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setError(getErrorMessage(err.code))
      }
    } finally {
      // Delay clearing to prevent rapid re-clicks
      setTimeout(() => setOauthLoading(null), 500)
    }
  }

  const getErrorMessage = (code) => {
    const errorMessages = {
      'auth/invalid-email': 'Invalid email address format',
      'auth/user-disabled': 'This account has been disabled',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/email-already-in-use': 'This email is already registered',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/invalid-credential': 'Invalid email or password',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later',
      'auth/network-request-failed': 'Network error. Please check your connection',
    }
    return errorMessages[code] || 'An error occurred. Please try again'
  }

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const backgroundVariants = {
    login: {
      x: '0%',
      borderRadius: '0 100px 100px 0'
    },
    register: {
      x: '100%', 
      borderRadius: '100px 0 0 100px'
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-warm-gray-50 dark:bg-warm-gray-900">
      {/* Animated Background Panel */}
      <motion.div
        className="absolute inset-y-0 w-1/2 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-600 dark:via-primary-700 dark:to-primary-800 z-20"
        animate={isLogin ? 'login' : 'register'}
        variants={backgroundVariants}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 30,
          mass: 0.6
        }}
      >
        <div className="h-full flex items-center justify-center text-white p-12">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-md"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="inline-block mb-8"
                >
                  <HiSparkles className="w-20 h-20 text-white/90" />
                </motion.div>
                <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>
                <p className="text-lg text-white/90 mb-8">
                  We're excited to see you again. Your workspace is ready and waiting for you.
                </p>
                <p className="text-white/70 mb-8">Don't have an account yet?</p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-full font-semibold hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300"
                >
                  Create Account
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="register-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-md"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="inline-block mb-8"
                >
                  <HiSparkles className="w-20 h-20 text-white/90" />
                </motion.div>
                <h2 className="text-4xl font-bold mb-6">Join Us Today!</h2>
                <p className="text-lg text-white/90 mb-8">
                  Start managing your tasks like a pro. Create your account and unlock powerful features.
                </p>
                <p className="text-white/70 mb-8">Already have an account?</p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-full font-semibold hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300"
                >
                  Sign In
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Form Sections */}
      <div className="w-full flex relative z-10">
        {/* Login Form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            {true && (
              <motion.div
                key="login-form"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="w-full max-w-md"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
                    Sign In
                  </h1>
                  <p className="text-warm-gray-600 dark:text-warm-gray-400">
                    Access your workspace
                  </p>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleAuth}
                    disabled={loading || oauthLoading !== null}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300 group"
                  >
                    {oauthLoading === 'google' ? (
                      <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaGoogle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-warm-gray-700 dark:text-warm-gray-300">Continue with Google</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGithubAuth}
                    disabled={loading || oauthLoading !== null}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-warm-gray-900 dark:bg-warm-gray-950 text-white rounded-xl hover:bg-warm-gray-800 dark:hover:bg-warm-gray-800 transition-all duration-300 group"
                  >
                    {oauthLoading === 'github' ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Continue with GitHub</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-warm-gray-200 dark:border-warm-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-warm-gray-50 dark:bg-warm-gray-900 text-warm-gray-500 font-medium">
                      or continue with email
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    >
                      <p className="text-sm text-red-800 dark:text-red-200 font-medium">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all duration-300 hover:border-warm-gray-300 dark:hover:border-warm-gray-600"
                        placeholder="you@example.com"
                        disabled={loading || oauthLoading !== null}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all duration-300 hover:border-warm-gray-300 dark:hover:border-warm-gray-600"
                        placeholder="Enter your password"
                        disabled={loading || oauthLoading !== null}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray-400 hover:text-warm-gray-600 dark:hover:text-warm-gray-200 transition-colors"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-warm-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
                        Remember me
                      </span>
                    </label>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                      Forgot password?
                    </a>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading || oauthLoading !== null || !formData.email || !formData.password}
                    className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Register Form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            {true && (
              <motion.div
                key="register-form"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="w-full max-w-md"
              >
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
                    Create Account
                  </h1>
                  <p className="text-warm-gray-600 dark:text-warm-gray-400">
                    Join us and start organizing
                  </p>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleAuth}
                    disabled={loading || oauthLoading !== null}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300 group"
                  >
                    {oauthLoading === 'google' ? (
                      <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaGoogle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-warm-gray-700 dark:text-warm-gray-300">Sign up with Google</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGithubAuth}
                    disabled={loading || oauthLoading !== null}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-warm-gray-900 dark:bg-warm-gray-950 text-white rounded-xl hover:bg-warm-gray-800 dark:hover:bg-warm-gray-800 transition-all duration-300 group"
                  >
                    {oauthLoading === 'github' ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Sign up with GitHub</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-warm-gray-200 dark:border-warm-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-warm-gray-50 dark:bg-warm-gray-900 text-warm-gray-500 font-medium">
                      or sign up with email
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    >
                      <p className="text-sm text-red-800 dark:text-red-200 font-medium">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Register Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all duration-300 hover:border-warm-gray-300 dark:hover:border-warm-gray-600"
                        placeholder="John Doe"
                        disabled={loading || oauthLoading !== null}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all duration-300 hover:border-warm-gray-300 dark:hover:border-warm-gray-600"
                        placeholder="you@example.com"
                        disabled={loading || oauthLoading !== null}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all duration-300 hover:border-warm-gray-300 dark:hover:border-warm-gray-600"
                        placeholder="At least 6 characters"
                        disabled={loading || oauthLoading !== null}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray-400 hover:text-warm-gray-600 dark:hover:text-warm-gray-200 transition-colors"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 rounded-xl focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all duration-300 hover:border-warm-gray-300 dark:hover:border-warm-gray-600"
                        placeholder="Confirm your password"
                        disabled={loading || oauthLoading !== null}
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded border-warm-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
                      I agree to the{' '}
                      <a href="#" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading || oauthLoading !== null || !formData.email || !formData.password}
                    className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 mt-6"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}