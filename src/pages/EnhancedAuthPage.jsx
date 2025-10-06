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
import { FaGoogle, FaGithub, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa'
import { HiSparkles, HiLockClosed, HiMail, HiUser, HiShieldCheck } from 'react-icons/hi'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import { useParallax, useFloatingAnimation, useRipple } from '../hooks/useAnimations'
import { getOrCreateUserProfile } from '../services/userService'
import { useUser } from '../contexts/UserContext'

// Animated Input Component with floating label
function AnimatedInput({ icon: Icon, type, name, value, onChange, placeholder, disabled, showPassword, onTogglePassword }) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  useEffect(() => {
    setHasValue(value?.length > 0)
  }, [value])

  return (
    <div className="relative group">
      <motion.div
        initial={false}
        animate={{
          scale: isFocused ? 1.02 : 1,
          transition: { duration: 0.2 }
        }}
        className="relative"
      >
        <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
          isFocused ? 'text-primary-500 scale-110' : 'text-warm-gray-400'
        }`} />
        
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={`
            w-full pl-12 pr-12 py-4 
            bg-white/80 dark:bg-warm-gray-800/80 
            backdrop-blur-md
            border-2 border-warm-gray-200/50 dark:border-warm-gray-700/50 
            rounded-2xl 
            focus:border-primary-500 dark:focus:border-primary-400 
            focus:ring-4 focus:ring-primary-500/20 
            outline-none transition-all duration-300 
            hover:border-warm-gray-300 dark:hover:border-warm-gray-600
            hover:bg-white/90 dark:hover:bg-warm-gray-800/90
            disabled:opacity-50 disabled:cursor-not-allowed
            font-medium
            ${isFocused ? 'shadow-lg shadow-primary-500/10' : ''}
          `}
          placeholder=" "
        />
        
        <label
          className={`
            absolute left-12 
            transition-all duration-300 pointer-events-none
            ${hasValue || isFocused 
              ? 'top-0 -translate-y-1/2 text-xs bg-white dark:bg-warm-gray-800 px-2 text-primary-600 dark:text-primary-400' 
              : 'top-1/2 -translate-y-1/2 text-base text-warm-gray-500'
            }
          `}
        >
          {placeholder}
        </label>

        {type === 'password' && (
          <button
            type="button"
            onClick={onTogglePassword}
            tabIndex={-1}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray-400 hover:text-warm-gray-600 dark:hover:text-warm-gray-200 transition-all duration-300 hover:scale-110"
          >
            <motion.div
              initial={false}
              animate={{ rotate: showPassword ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </motion.div>
          </button>
        )}
      </motion.div>
      
      {/* Focus indicator line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

// Animated Social Button
function SocialButton({ onClick, disabled, loading, icon: Icon, text, variant = 'default' }) {
  const { ripples, createRipple } = useRipple()
  
  const variants = {
    default: 'bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 hover:border-primary-500 dark:hover:border-primary-400 text-warm-gray-700 dark:text-warm-gray-300',
    github: 'bg-warm-gray-900 dark:bg-warm-gray-950 text-white hover:bg-warm-gray-800 dark:hover:bg-warm-gray-800',
    google: 'bg-white dark:bg-warm-gray-800 border-2 border-warm-gray-200 dark:border-warm-gray-700 hover:border-red-400 dark:hover:border-red-400 text-warm-gray-700 dark:text-warm-gray-300'
  }

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      onClick={(e) => {
        if (!disabled && !loading) {
          createRipple(e)
          onClick()
        }
      }}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden
        w-full flex items-center justify-center gap-3 
        px-4 py-3.5 rounded-2xl
        transition-all duration-300
        group backdrop-blur-md
        ${variants[variant]}
        ${loading ? 'cursor-wait' : disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${disabled && !loading ? 'opacity-50' : ''}
      `}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
      
      {/* Loading indicator */}
      {loading && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"
        />
      )}
      
      {/* Icon and text */}
      <motion.div
        initial={false}
        animate={{ opacity: loading ? 0 : 1, scale: loading ? 0.8 : 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-3"
      >
        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="font-medium">{text}</span>
      </motion.div>
    </motion.button>
  )
}

// Password Strength Indicator
function PasswordStrength({ password }) {
  const getStrength = () => {
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    return strength
  }

  const strength = getStrength()
  const strengthText = ['Yếu', 'Trung bình', 'Tốt', 'Mạnh'][strength - 1] || ''
  const strengthColor = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][strength - 1] || 'bg-gray-300'

  if (!password) return null

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: i < strength ? 1 : 0.3 }}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < strength ? strengthColor : 'bg-warm-gray-300 dark:bg-warm-gray-700'
            }`}
          />
        ))}
      </div>
      {strength > 0 && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs font-medium ${
            strength === 4 ? 'text-green-600' : 
            strength === 3 ? 'text-blue-600' :
            strength === 2 ? 'text-yellow-600' : 'text-red-600'
          }`}
        >
Độ mạnh mật khẩu: {strengthText}
        </motion.p>
      )}
    </div>
  )
}

// Main Enhanced Auth Page Component
export default function EnhancedAuthPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useUser()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(null)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    rememberMe: false,
    agreeToTerms: false,
  })

  // Floating animation for logo only
  const floatingAnimation = useFloatingAnimation({ duration: 4, distance: 15 })

  // Redirect to dashboard if already authenticated (e.g., after OAuth popup)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  // Reset form when switching modes
  useEffect(() => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      rememberMe: false,
      agreeToTerms: false,
    })
    setError('')
    setSuccessMessage('')
    setShowPassword(false)
    setShowConfirmPassword(false)
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
      setError('Vui lòng điền đầy đủ các trường bắt buộc')
      return false
    }
    
    if (!isLogin) {
      if (!formData.fullName) {
        setError('Vui lòng nhập họ và tên')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Mật khẩu không khớp')
        return false
      }
      if (formData.password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự')
        return false
      }
      if (!formData.agreeToTerms) {
        setError('Bạn phải đồng ý với điều khoản và điều kiện')
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
      let userCredential
      
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        setSuccessMessage('Chào mừng trở lại! Đang chuyển hướng...')
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        await updateProfile(userCredential.user, {
          displayName: formData.fullName
        })
        
        // Create/update user profile in Firestore for new registrations
        try {
          await getOrCreateUserProfile(userCredential.user, {
            fullName: formData.fullName
          })
          console.log('✅ User profile created in Firestore')
        } catch (profileError) {
          console.warn('⚠️ Profile creation warning:', profileError.message)
          // Don't block the flow for profile creation errors
        }
        
        setSuccessMessage('Tạo tài khoản thành công! Đang chuyển hướng...')
      }
      
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      console.error('Auth error:', err)
      setError(getErrorMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    // Prevent multiple rapid clicks (debounce)
    if (oauthLoading) return
    
    setError('')
    setOauthLoading('google')

    // Set a shorter timeout for faster recovery
    const quickTimeout = setTimeout(() => {
      setOauthLoading(null)
      console.log('OAuth timeout - button reset')
    }, 3000) // 3 seconds instead of waiting for Firebase

    try {
      const result = await signInWithPopup(auth, googleProvider)
      clearTimeout(quickTimeout)
      
      if (result.user) {
        // Create/update user profile in Firestore
        try {
          await getOrCreateUserProfile(result.user, {
            username: result?.additionalUserInfo?.username || result?.additionalUserInfo?.profile?.login || ''
          })
          console.log('✅ Google user profile saved to Firestore')
        } catch (profileError) {
          console.warn('⚠️ Google profile creation warning:', profileError.message)
        }
        
        setSuccessMessage('Chào mừng! Đang chuyển hướng...')
        setTimeout(() => navigate('/dashboard'), 1500)
      }
    } catch (err) {
      clearTimeout(quickTimeout)
      setOauthLoading(null) // Reset immediately on ANY error
      
      // Handle different error types  
      if (
        err.code !== 'auth/popup-closed-by-user' && 
        err.code !== 'auth/cancelled-popup-request'
      ) {
        setError(getErrorMessage(err.code))
      }
      // Silent for popup close cases
    }
  }

  const handleGithubAuth = async () => {
    // Prevent multiple rapid clicks (debounce)
    if (oauthLoading) return
    
    setError('')
    setOauthLoading('github')

    // Set a shorter timeout for faster recovery
    const quickTimeout = setTimeout(() => {
      setOauthLoading(null)
      console.log('OAuth timeout - button reset')
    }, 3000) // 3 seconds instead of waiting for Firebase

    try {
      const githubProvider = new GithubAuthProvider()
      const result = await signInWithPopup(auth, githubProvider)
      clearTimeout(quickTimeout)
      
      if (result.user) {
        // Create/update user profile in Firestore
        try {
          await getOrCreateUserProfile(result.user, {
            username: result?.additionalUserInfo?.username || result?.additionalUserInfo?.profile?.login || ''
          })
          console.log('✅ GitHub user profile saved to Firestore')
        } catch (profileError) {
          console.warn('⚠️ GitHub profile creation warning:', profileError.message)
        }
        
        setSuccessMessage('Chào mừng! Đang chuyển hướng...')
        setTimeout(() => navigate('/dashboard'), 1500)
      }
    } catch (err) {
      clearTimeout(quickTimeout)
      setOauthLoading(null) // Reset immediately on ANY error
      
      // Handle different error types
      if (
        err.code !== 'auth/popup-closed-by-user' && 
        err.code !== 'auth/cancelled-popup-request'
      ) {
        setError(getErrorMessage(err.code))
      }
      // Silent for popup close cases
    }
  }

  const getErrorMessage = (code) => {
    const errorMessages = {
      'auth/invalid-email': 'Định dạng email không hợp lệ',
      'auth/user-disabled': 'Tài khoản này đã bị vô hiệu hóa',
      'auth/user-not-found': 'Không tìm thấy tài khoản với email này',
      'auth/wrong-password': 'Mật khẩu không chính xác',
      'auth/email-already-in-use': 'Email này đã được đăng ký',
      'auth/weak-password': 'Mật khẩu phải có ít nhất 6 ký tự',
      'auth/invalid-credential': 'Email hoặc mật khẩu không chính xác',
      'auth/too-many-requests': 'Quá nhiều lần thử. Vui lòng thử lại sau',
      'auth/network-request-failed': 'Lỗi mạng. Vui lòng kiểm tra kết nối',
      'auth/operation-not-allowed': 'Phương thức đăng nhập chưa được bật. Vui lòng bật trong Firebase Console',
    }
    return errorMessages[code] || 'Đã xảy ra lỗi. Vui lòng thử lại'
  }

  return (
    <AnimatedBackground variant="gradient-orbs" className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="w-full max-w-5xl"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Panel - Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="glass-card rounded-3xl p-12 h-full flex flex-col justify-center">
              <motion.div {...floatingAnimation} className="inline-block mb-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-2xl shadow-primary-500/30">
                  <HiSparkles className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                <h2 className="text-4xl font-bold text-warm-gray-900 dark:text-white mb-6 text-gradient">
                  Chào mừng trở lại!
                </h2>
                <p className="text-lg text-warm-gray-600 dark:text-warm-gray-300 mb-8">
                  Đăng nhập để truy cập không gian làm việc của bạn và tiếp tục từ nơi bạn đã dừng lại.
                </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-warm-gray-700 dark:text-warm-gray-300">Đồng bộ trên mọi thiết bị</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-warm-gray-700 dark:text-warm-gray-300">Cộng tác thời gian thực</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-warm-gray-700 dark:text-warm-gray-300">Quản lý công việc nâng cao</span>
                      </div>
                    </div>
                    <p className="text-warm-gray-600 dark:text-warm-gray-400 mb-4">
                      Mới sử dụng nền tảng của chúng tôi?
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsLogin(false)}
                      className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300"
                    >
                      Tạo tài khoản
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-4xl font-bold text-warm-gray-900 dark:text-white mb-6 text-gradient">
                      Tham gia cộng đồng
                    </h2>
                    <p className="text-lg text-warm-gray-600 dark:text-warm-gray-300 mb-8">
                      Tạo tài khoản của bạn và mở khóa các tính năng mạnh mẽ để tăng năng suất làm việc.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <HiShieldCheck className="text-primary-500" />
                        <span className="text-warm-gray-700 dark:text-warm-gray-300">Bảo mật cấp doanh nghiệp</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <HiShieldCheck className="text-primary-500" />
                        <span className="text-warm-gray-700 dark:text-warm-gray-300">Miễn phí vĩnh viễn</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <HiShieldCheck className="text-primary-500" />
                        <span className="text-warm-gray-700 dark:text-warm-gray-300">Hỗ trợ 24/7</span>
                      </div>
                    </div>
                    <p className="text-warm-gray-600 dark:text-warm-gray-400 mb-4">
                      Đã có tài khoản?
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsLogin(true)}
                      className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300"
                    >
                      Đăng nhập
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Panel - Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3,
              ease: [0.6, -0.05, 0.01, 0.99]
            }}
          >
            <div className="glass-card rounded-3xl p-8 md:p-10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary-500/10">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
                  {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
                </h1>
                <p className="text-warm-gray-600 dark:text-warm-gray-400">
                  {isLogin ? 'Nhập thông tin đăng nhập để tiếp tục' : 'Điền thông tin để bắt đầu'}
                </p>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-3 mb-6">
                <SocialButton
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  loading={oauthLoading === 'google'}
                  icon={FaGoogle}
                  text={isLogin ? 'Tiếp tục với Google' : 'Đăng ký với Google'}
                  variant="google"
                />
                
                <SocialButton
                  onClick={handleGithubAuth}
                  disabled={loading}
                  loading={oauthLoading === 'github'}
                  icon={FaGithub}
                  text={isLogin ? 'Tiếp tục với GitHub' : 'Đăng ký với GitHub'}
                  variant="github"
                />
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-warm-gray-200 dark:border-warm-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-md text-warm-gray-500 font-medium rounded-full">
                    hoặc tiếp tục với email
                  </span>
                </div>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mb-6 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-600 dark:text-green-400" />
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">{successMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  >
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name (Register only) */}
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatedInput
                        icon={HiUser}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        disabled={loading || oauthLoading !== null}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
                <AnimatedInput
                  icon={HiMail}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  disabled={loading || oauthLoading !== null}
                />

                {/* Password */}
                <div>
                  <AnimatedInput
                    icon={HiLockClosed}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    disabled={loading || oauthLoading !== null}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                  />
                  {!isLogin && <PasswordStrength password={formData.password} />}
                </div>

                {/* Confirm Password (Register only) */}
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatedInput
                        icon={HiLockClosed}
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        disabled={loading || oauthLoading !== null}
                        showPassword={showConfirmPassword}
                        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Remember Me / Terms */}
                <div className="flex items-center justify-between">
                  {isLogin ? (
                    <>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                          className="w-4 h-4 rounded border-warm-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-warm-gray-600 dark:text-warm-gray-400 group-hover:text-warm-gray-900 dark:group-hover:text-warm-gray-200">
                          Ghi nhớ đăng nhập
                        </span>
                      </label>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        Quên mật khẩu?
                      </a>
                    </>
                  ) : (
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="w-4 h-4 mt-0.5 rounded border-warm-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
                        Tôi đồng ý với{' '}
                        <a href="#" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
                          Điều khoản
                        </a>{' '}
                        và{' '}
                        <a href="#" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
                          Chính sách bảo mật
                        </a>
                      </span>
                    </label>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading || oauthLoading !== null || (!isLogin && !formData.agreeToTerms)}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{isLogin ? 'Đang đăng nhập...' : 'Đang tạo tài khoản...'}</span>
                    </div>
                  ) : (
                    isLogin ? 'Đăng nhập' : 'Tạo tài khoản'
                  )}
                </motion.button>
              </form>

              {/* Mobile Toggle */}
              <div className="mt-8 text-center lg:hidden">
                <p className="text-sm text-warm-gray-600 dark:text-warm-gray-400 mb-2">
                  {isLogin ? "Chưa có tài khoản?" : 'Đã có tài khoản?'}
                </p>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {isLogin ? 'Tạo tài khoản' : 'Đăng nhập'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatedBackground>
  )
}
