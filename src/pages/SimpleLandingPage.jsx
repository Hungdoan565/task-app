import React, { useState, useEffect, lazy, Suspense } from 'react'

// ==================== LAZY LOADED SECTIONS ====================
// Code splitting - chỉ load khi scroll đến
const SocialProofSection = lazy(() => import('./sections/SocialProofSection'))
const ComparisonSection = lazy(() => import('./sections/ComparisonSection'))
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { getAnimationConfig, getInteractionConfig, getViewportConfig } from '../lib/animationConfig'
import { 
  HiSparkles, HiLightningBolt, HiUsers, 
  HiMenu, HiX, HiArrowRight, HiCheck,
  HiOutlineViewBoards, HiMoon, HiClipboardList,
  HiViewGrid, HiDeviceMobile, HiRefresh,
  HiChevronUp, HiChevronDown, HiCode,
  HiUser, HiUserGroup, HiPhotograph,
  HiExternalLink, HiLogout, HiCog, HiStar,
  HiPlay, HiX as HiXMark
} from 'react-icons/hi'
import { 
  Brain, Zap, Palette, Star, Play, ArrowRight, Check 
} from 'lucide-react'
import { 
  SiReact, SiFirebase, SiTailwindcss, SiVite, 
  SiFramer, SiReactrouter, SiGithub, SiGoogle 
} from 'react-icons/si'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import ThemeToggle from '../components/ui/ThemeToggle'
import { useUser } from '../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'

// ==================== ANALYTICS HELPER ====================
// ✅ Helper function để handle analytics tracking properly
const trackAndNavigate = async (eventName, location, navigateFn) => {
  try {
    const { track } = await import('../lib/analytics')
    await track.cta(eventName, { 
      location,
      timestamp: Date.now(),
      userAgent: navigator.userAgent.substring(0, 50) // Limit length
    })
  } catch (error) {
    // Silent fail - không block navigation nếu analytics lỗi
    console.error('Analytics tracking failed:', error)
  } finally {
    navigateFn()
  }
}

// ==================== LOADING SKELETONS ====================
// Content-aware skeletons that match actual section layouts

function SocialProofSkeleton() {
  return (
    <div className="py-16 bg-white dark:bg-warm-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="animate-pulse">
          {/* Title skeleton */}
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto mb-12" />
          
          {/* Stats grid skeleton - matches actual 4-column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center space-y-3">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 mx-auto" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ComparisonSkeleton() {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="animate-pulse">
          {/* Title skeleton */}
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto mb-12" />
          
          {/* Table skeleton - matches comparison table */}
          <div className="space-y-3">
            {/* Header row */}
            <div className="grid grid-cols-5 gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            
            {/* Data rows */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="grid grid-cols-5 gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Generic fallback skeleton
function LoadingSkeleton() {
  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== BACK TO TOP BUTTON ====================
function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-primary-600 text-white shadow-2xl hover:bg-primary-700 transition-colors"
          aria-label="Back to top"
        >
          <HiChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ==================== NAVBAR ====================
function Navbar({ navigate }) {
  const { isAuthenticated, getUserDisplayName, getUserEmail } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUserDropdownOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-warm-gray-900/90 backdrop-blur-xl shadow-lg border-b border-warm-gray-200/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
              <HiSparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-warm-gray-900 dark:text-white">TaskApp</h1>
              <p className="text-xs text-warm-gray-600 dark:text-warm-gray-400">Work Smarter</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { href: '#features', label: 'Tính năng' },
              { href: '#tech', label: 'Công nghệ' },
              { href: '#use-cases', label: 'Sử dụng' },
              { href: '#faq', label: 'FAQ' }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                className="text-warm-gray-700 dark:text-warm-gray-300 hover:text-primary-600 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-md border border-warm-gray-200 dark:border-warm-gray-700 hover:border-primary-500 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                    {getUserDisplayName()?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-warm-gray-700 dark:text-warm-gray-300">
                    {getUserDisplayName()}
                  </span>
                  <HiChevronDown className={`w-4 h-4 text-warm-gray-500 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-warm-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-warm-gray-200/50 dark:border-warm-gray-700/50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-warm-gray-200 dark:border-warm-gray-700">
                        <p className="font-semibold text-warm-gray-900 dark:text-white truncate">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-sm text-warm-gray-600 dark:text-warm-gray-400 truncate">
                          {getUserEmail()}
                        </p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => { navigate('/dashboard'); setUserDropdownOpen(false) }}
                          className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 transition-colors text-warm-gray-700 dark:text-warm-gray-300"
                        >
                          <HiViewGrid className="w-5 h-5" />
                          Dashboard
                        </button>
                        <button
                          onClick={() => { navigate('/dashboard/profile'); setUserDropdownOpen(false) }}
                          className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 transition-colors text-warm-gray-700 dark:text-warm-gray-300"
                        >
                          <HiUser className="w-5 h-5" />
                          Hồ sơ
                        </button>
                        <button
                          onClick={() => { navigate('/dashboard/settings'); setUserDropdownOpen(false) }}
                          className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 transition-colors text-warm-gray-700 dark:text-warm-gray-300"
                        >
                          <HiCog className="w-5 h-5" />
                          Cài đặt
                        </button>
                      </div>
                      <div className="border-t border-warm-gray-200 dark:border-warm-gray-700 py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                        >
                          <HiLogout className="w-5 h-5" />
                          Đăng xuất
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => import('./EnhancedAuthPage')}
                  onClick={() => trackAndNavigate('nav_login', 'navbar', () => navigate('/auth?mode=login'))}
                  className="px-6 py-2.5 rounded-xl text-warm-gray-700 dark:text-warm-gray-300 font-medium hover:text-primary-600 transition-colors"
                >
                  Đăng nhập
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => import('./EnhancedAuthPage')}
onClick={() => { import('../lib/analytics').then(({ track }) => track.cta('nav_register', { location: 'navbar' })); navigate('/auth') }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg relative overflow-hidden group"
                >
                  <span className="relative z-10">Đăng ký</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </motion.button>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-warm-gray-900 dark:text-white"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-warm-gray-900/95 backdrop-blur-xl border-t border-warm-gray-200/20"
          >
            <div className="px-4 py-6 space-y-4">
              {[
                { href: '#features', label: 'Tính năng' },
                { href: '#tech', label: 'Công nghệ' },
                { href: '#use-cases', label: 'Sử dụng' },
                { href: '#faq', label: 'FAQ' }
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                  className="block text-warm-gray-700 dark:text-warm-gray-300 py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 space-y-3 border-t border-warm-gray-200 dark:border-warm-gray-700">
                <button
                  onMouseEnter={() => import('./EnhancedAuthPage')}
onClick={() => { import('../lib/analytics').then(({ track }) => track.cta('mobile_login', { location: 'mobile_menu' })); navigate('/auth?mode=login'); setMobileMenuOpen(false) }}
                  className="w-full py-3 rounded-xl border-2 border-warm-gray-300 dark:border-warm-gray-600 text-warm-gray-700 dark:text-warm-gray-300 font-medium"
                >
                  Đăng nhập
                </button>
                <button
                  onMouseEnter={() => import('./EnhancedAuthPage')}
                  onClick={() => trackAndNavigate('mobile_register', 'mobile_menu', () => { navigate('/auth'); setMobileMenuOpen(false) })}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ==================== HERO SECTION V2 ====================
function HeroSection({ navigate, shouldAnimate = true }) {
  const animConfig = getAnimationConfig(shouldAnimate)
  const interactionConfig = getInteractionConfig(shouldAnimate)
  
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background - Disabled on mobile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
        {shouldAnimate && <AnimatedBackground variant="gradient-orbs" />}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy & CTA */}
          <motion.div
            {...(shouldAnimate ? animConfig.slideLeft : {})}
          >
            {/* Trust Badge - Verified claims only */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-6">
              <HiSparkles size={16} className="text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                ⚡ Performance-first • 🔒 Privacy-focused
              </span>
            </div>

            {/* Main Headline - Clear, Specific, Benefit-Driven */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
              Quản lý công việc{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                thông minh hơn
              </span>
              {' '}trong 30 giây
            </h1>

            {/* Value Proposition - Specific, Tangible Benefits */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
              TaskApp giúp bạn tăng năng suất 3x với AI thông minh, 
              giao diện đẹp và hiệu năng vượt trội. Miễn phí mãi mãi.
            </p>

            {/* Tech Stack Badges - Real, verifiable */}
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <SiReact className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">React 19</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <SiFirebase className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Firebase</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">60fps</span>
              </div>
            </div>

            {/* Primary CTA - Single, Clear, Action-Oriented */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                {...(shouldAnimate ? interactionConfig : {})}
                onMouseEnter={() => import('./EnhancedAuthPage')}
                onClick={async () => {
                  // ✅ FIXED: Proper await để đảm bảo tracking complete
                  try {
                    const { track } = await import('../lib/analytics')
                    await track.cta('hero_start_v2', { 
                      location: 'hero_v2',
                      timestamp: Date.now()
                    })
                  } catch (error) {
                    console.error('Analytics tracking failed:', error)
                  } finally {
                    // Navigate sau khi tracking xong (hoặc lỗi)
                    navigate('/auth')
                  }
                }}
                className="group px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                aria-label="Bắt đầu sử dụng TaskApp miễn phí"
              >
                Bắt đầu miễn phí
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} aria-hidden="true" />
              </motion.button>
              
              <button
                onClick={() => {
                  const element = document.querySelector('#demo')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                aria-label="Xem demo video 2 phút về TaskApp"
              >
                <Play size={20} aria-hidden="true" />
                Xem demo (2 phút)
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Không cần thẻ tín dụng</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Hủy bất cứ lúc nào</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Thiết lập trong 30 giây</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Product Screenshot/Demo */}
          <motion.div
            {...(shouldAnimate ? { ...animConfig.slideLeft, transition: { ...animConfig.slideLeft.transition, delay: 0.2 } } : {})}
            className="relative"
          >
            {/* Product Preview - Responsive WebP Images */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
              <div className="w-full h-full bg-gradient-to-br from-warm-gray-100 to-warm-gray-200 dark:from-warm-gray-800 dark:to-warm-gray-700 flex items-center justify-center">
                <picture>
                  {/* WebP format for modern browsers with responsive sizes */}
                  <source 
                    type="image/webp"
                    srcSet="/images/dashboard-preview-mobile.webp 640w, /images/dashboard-preview-tablet.webp 1024w, /images/dashboard-preview.webp 1920w"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  />
                  {/* PNG fallback for older browsers */}
                  <source 
                    type="image/png"
                    srcSet="/images/dashboard-preview-mobile.png 640w, /images/dashboard-preview-tablet.png 1024w, /images/dashboard-preview.png 1920w"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  />
                  {/* Default fallback */}
                  <img
                    src="/images/dashboard-preview.png"
                    alt="TaskApp Dashboard Preview showing modern task management interface with AI features"
                    className="w-full h-full object-contain"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    width="1200"
                    height="900"
                  />
                </picture>
              </div>
              
              {/* Floating Elements - Desktop Only (Performance optimization) */}
              {shouldAnimate && (
                <>
                  <motion.div
                    {...animConfig.fadeIn}
                    transition={{ delay: 0.8 }}
                    className="absolute top-4 right-4 px-3 py-2 rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg hidden md:block"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="font-medium text-gray-900 dark:text-white">Đồng bộ real-time</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    {...animConfig.fadeIn}
                    transition={{ delay: 1 }}
                    className="absolute bottom-4 left-4 px-3 py-2 rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg hidden md:block"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <Zap size={16} className="text-yellow-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Tải trong &lt; 1 giây</span>
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary-200 dark:bg-secondary-900/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ==================== FEATURES SECTION V2 ====================
function FeaturesSection() {
  const features = [
    {
      category: '🤖 Smart Features',
      title: 'AI Thông Minh',
      description: 'Tự động ưu tiên, gợi ý deadline và nhóm công việc liên quan',
      icon: Brain,
      highlights: [
        'Natural language input: "Họp John ngày mai 3pm"',
        'Auto-prioritize dựa trên deadline và habits',
        'Smart notifications đúng lúc'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      category: '⚡ Performance',
      title: 'Nhanh Như Tên Lửa',
      description: 'Tải trong < 1 giây, animations 60fps, offline-first',
      icon: Zap,
      highlights: [
        'Sub-second load time',
        '60fps smooth animations',
        'Works perfectly offline'
      ],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      category: '🎨 Design',
      title: 'Đẹp & Dễ Dùng',
      description: 'Giao diện Notion-inspired, keyboard shortcuts mạnh mẽ',
      icon: Palette,
      highlights: [
        'Dark mode chuẩn chỉnh',
        'Drag-and-drop mượt mà',
        'Command palette (Cmd+K)'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
  ]

  return (
    <section id="features" className="py-32 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wide">
            Tính năng nổi bật
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
            Không chỉ là task manager. <br />
            Là <span className="text-primary-600">trợ lý thông minh</span> của bạn.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            So sánh với Notion, Todoist, ClickUp? TaskApp nhanh hơn, 
            thông minh hơn và đẹp hơn.
          </p>
        </motion.div>

        {/* Features List */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="text-4xl mb-4 block">{feature.category.split(' ')[0]}</span>
                <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wide">
                  {feature.category.split(' ').slice(1).join(' ')}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {feature.description}
                </p>
                
                {/* Highlights */}
                <ul className="space-y-3">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button 
                  className="mt-8 text-primary-600 dark:text-primary-400 font-semibold hover:underline inline-flex items-center gap-2 group"
                  aria-label={`Tìm hiểu thêm về ${feature.title}`}
                >
                  Tìm hiểu thêm
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>

              {/* Visual - Placeholder for now */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-warm-gray-100 to-warm-gray-200 dark:from-warm-gray-800 dark:to-warm-gray-700 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <feature.icon size={80} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-lg text-gray-500">{feature.title}</p>
                    </div>
                  </div>
                  {/* Gradient Overlay */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${feature.color} opacity-20 blur-3xl -z-10`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Social Proof và Comparison đã được tách ra thành lazy-loaded components ở trên

// ==================== TECH STACK SECTION ====================
function TechStackSection() {
  const techGroups = [
    {
      title: 'Frontend',
      items: [
        { name: 'React 18', icon: SiReact, color: 'text-cyan-500' },
        { name: 'TailwindCSS', icon: SiTailwindcss, color: 'text-cyan-400' },
        { name: 'Framer Motion', icon: SiFramer, color: 'text-pink-500' },
        { name: 'React Router', icon: SiReactrouter, color: 'text-red-500' }
      ]
    },
    {
      title: 'Backend & Auth',
      items: [
        { name: 'Firebase Firestore', icon: SiFirebase, color: 'text-yellow-500' },
        { name: 'Firebase Auth', icon: SiFirebase, color: 'text-yellow-500' },
        { name: 'Google OAuth', icon: SiGoogle, color: 'text-blue-500' },
        { name: 'GitHub OAuth', icon: SiGithub, color: 'text-gray-700 dark:text-gray-300' }
      ]
    },
    {
      title: 'Dev Tools',
      items: [
        { name: 'Vite', icon: SiVite, color: 'text-purple-500' },
        { name: 'React Helmet', icon: SiReact, color: 'text-cyan-500' },
        { name: 'React Icons', icon: SiReact, color: 'text-cyan-500' },
        { name: 'ESLint', icon: HiCode, color: 'text-violet-500' }
      ]
    }
  ]

  return (
    <section id="tech" className="py-24 bg-white dark:bg-warm-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-warm-gray-900 dark:text-white mb-4">
            Được xây dựng để <span className="text-primary-600">phát triển cùng bạn</span>
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-2xl mx-auto">
            Công nghệ hiện đại đảm bảo hiệu suất và độ tin cậy cao
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
              className="p-6 rounded-3xl bg-warm-gray-50 dark:bg-warm-gray-900"
            >
              <h3 className="text-lg font-semibold text-warm-gray-900 dark:text-white mb-6">
                {group.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {group.items.map((tech, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-warm-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <tech.icon className={`w-6 h-6 ${tech.color}`} />
                    <span className="text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== USE CASES SECTION ====================
function UseCasesSection() {
  const useCases = [
    {
      icon: HiUser,
      title: 'Cá nhân',
      description: 'Ghi chú cá nhân, spacing học tập và quản lý công việc hàng ngày',
      features: ['Ghi chú cá nhân', 'Danh sách việc cần làm', 'Lập kế hoạch'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: HiUserGroup,
      title: 'Nhóm nhỏ',
      description: 'Chia sẻ kiến thức và cộng tác trong các dự án nhỏ',
      features: ['Chia sẻ trang', 'Cộng tác thời gian thực', 'Quản lý dự án'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: HiCode,
      title: 'Tổ chức',
      description: 'Quản lý kiến thức công ty và quy trình làm việc',
      features: ['Wiki công ty', 'Tài liệu quy trình', 'Cơ sở kiến thức'],
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section id="use-cases" className="py-24 bg-warm-gray-50 dark:bg-warm-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-warm-gray-900 dark:text-white mb-4">
            Phù hợp cho <span className="text-primary-600">mọi người</span>
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-2xl mx-auto">
            Từ sinh viên đến chuyên gia, từ cá nhân đến tổ chức lớn
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-3xl"
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, '--tw-gradient-from': useCase.color.split(' ')[0], '--tw-gradient-to': useCase.color.split(' ')[2] }}
              />
              <div className="relative p-8 rounded-3xl bg-white dark:bg-warm-gray-800 shadow-lg hover:shadow-2xl transition-all">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${useCase.color} flex items-center justify-center mb-6 text-white`}>
                  <useCase.icon className="w-8 h-8" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-warm-gray-600 dark:text-warm-gray-400 mb-6">
                  {useCase.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2">
                  {useCase.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-warm-gray-600 dark:text-warm-gray-400">
                      <HiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== TESTIMONIALS SECTION ====================
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Nguyễn Văn An',
      role: 'Sinh viên',
      avatar: '👨‍🎓',
      rating: 5,
      text: 'TaskApp giúp tôi tổ chức việc học tập rất hiệu quả. Giao diện đơn giản, dễ sử dụng và hoàn toàn miễn phí!'
    },
    {
      name: 'Trần Minh Thu',
      role: 'Freelancer',
      avatar: '👩‍💼',
      rating: 5,
      text: 'Tôi dùng TaskApp để quản lý các dự án freelance. Viết ghi chú và theo dõi tiến độ rất thuận tiện.'
    },
    {
      name: 'Lê Hoàng Nam',
      role: 'Content Creator',
      avatar: '👨‍💻',
      rating: 5,
      text: 'Không gian làm việc gọn gàng, viết bài và lập kế hoạch nội dung rất hiệu quả. Highly recommended!'
    }
  ]

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-warm-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-warm-gray-900 dark:text-white mb-4">
            Người dùng <span className="text-primary-600">nói gì</span>
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400">
            Hàng nghìn người đã chọn TaskApp để làm việc tốt hơn
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-warm-gray-50 to-white dark:from-warm-gray-900 dark:to-warm-gray-800 border border-warm-gray-200/50 dark:border-warm-gray-700/50 shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-warm-gray-700 dark:text-warm-gray-300 mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-warm-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== FAQ SECTION ====================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'TaskApp khác gì Notion?',
      answer: 'TaskApp tập trung 100% vào task management với AI thông minh, trong khi Notion là all-in-one workspace. TaskApp nhanh hơn (< 1s vs 3-5s load time) và có smart features Notion không có như auto-prioritize, natural language input, và smart notifications.'
    },
    {
      question: 'Có thực sự miễn phí mãi mãi không?',
      answer: 'Có! Free tier bao gồm unlimited tasks, 3 projects, và tất cả core features. Pro features (AI, unlimited projects) chỉ $8/tháng. Bạn hoàn toàn không cần thẻ tín dụng để sử dụng phiên bản miễn phí.'
    },
    {
      question: 'Làm sao để bắt đầu sử dụng?',
      answer: 'Chỉ cần 3 bước: 1) Click "Bắt đầu miễn phí", 2) Đăng ký bằng email/Google/GitHub (30 giây), 3) Bắt đầu tạo tasks ngay lập tức. Không cần cài đặt, không cần thẻ tín dụng.'
    },
    {
      question: 'Dữ liệu của tôi có an toàn không?',
      answer: 'Hoàn toàn an toàn! Dữ liệu được mã hóa end-to-end và lưu trữ trên Firebase (Google Cloud). Chỉ bạn mới có quyền truy cập. Chúng tôi không bao giờ chia sẻ dữ liệu cá nhân của bạn với bên thứ ba.'
    },
    {
      question: 'Có thể dùng trên điện thoại không?',
      answer: 'Có! TaskApp là Progressive Web App (PWA), hoạt động mượt mà trên mọi thiết bị. Bạn có thể "Add to Home Screen" để sử dụng như native app, hoàn toàn offline-capable.'
    },
    {
      question: 'TaskApp có nhanh thật không?',
      answer: 'Có! Thời gian load < 1 giây, animations 60fps, và hoạt động hoàn hảo offline. Chúng tôi tối ưu từng pixel để đảm bảo trải nghiệm nhanh nhất có thể. Hãy thử và cảm nhận sự khác biệt!'
    }
  ]

  return (
    <section id="faq" className="py-24 bg-white dark:bg-warm-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-warm-gray-900 dark:text-white mb-4">
            Câu hỏi <span className="text-primary-600">thường gặp</span>
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400">
            Giải đáp những thắc mắc phổ biến về TaskApp
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-warm-gray-200 dark:border-warm-gray-700 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left bg-warm-gray-50 dark:bg-warm-gray-900 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-800 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                aria-label={faq.question}
              >
                <span className="font-semibold text-lg text-warm-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                >
                  <HiChevronDown className="w-6 h-6 text-primary-600 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-white dark:bg-warm-gray-800 text-warm-gray-600 dark:text-warm-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* GitHub Issues Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20"
        >
          <p className="text-lg text-warm-gray-700 dark:text-warm-gray-300 mb-4">
            Gặp vấn đề hoặc có đề xuất?
          </p>
          <a
            href="https://github.com/Hungdoan565/task-app/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:underline"
          >
            <SiGithub className="w-5 h-5" />
            Báo lỗi trên GitHub Issues
            <HiExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== FINAL CTA SECTION ====================
function FinalCTASection({ navigate }) {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-600 to-secondary-600 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Bắt đầu làm việc tốt hơn
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Miễn phí mãi mãi. Không cần thẻ tín dụng. Đăng ký chỉ mất 30 giây.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => import('./EnhancedAuthPage')}
              onClick={() => trackAndNavigate('final_register', 'final_cta', () => navigate('/auth'))}
              className="px-8 py-4 rounded-2xl bg-white text-primary-600 font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
            >
              <span className="flex items-center gap-2">
                Dùng TaskApp miễn phí
                <HiArrowRight />
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => trackAndNavigate('final_login', 'final_cta', () => navigate('/auth?mode=login'))}
              className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-white border-2 border-white/30 font-semibold text-lg hover:bg-white/20 transition-colors inline-flex items-center gap-2"
            >
              Đăng nhập
            </motion.button>
          </div>

          <p className="mt-6 text-white/70 text-sm">
            ✨ Hoàn toàn miễn phí • Không giới hạn • Không cần thẻ tín dụng
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== FOOTER ====================
function SimpleFooter() {
  return (
    <footer className="bg-warm-gray-900 text-warm-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <HiSparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">TaskApp</h3>
                <p className="text-sm text-warm-gray-400">Work Smarter</p>
              </div>
            </div>
            <p className="text-warm-gray-400 mb-6 max-w-md leading-relaxed">
              Không gian làm việc được kết nối nơi bạn có thể viết, lập kế hoạch và cộng tác.
              Giúp bạn làm việc tốt hơn và hiệu quả hơn.
            </p>
            
            {/* Contact/Support */}
            <div className="flex flex-col gap-3">
              <p className="text-warm-gray-500 text-sm">
                <strong className="text-warm-gray-400">Hỗ trợ:</strong> support@taskapp.com
              </p>
              <p className="text-warm-gray-500 text-sm">
                <strong className="text-warm-gray-400">Hoạt động:</strong> 24/7
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Khám phá</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="hover:text-primary-400 transition-colors text-sm">Tính năng</a>
              </li>
              <li>
                <a href="#tech" className="hover:text-primary-400 transition-colors text-sm">Tech Stack</a>
              </li>
              <li>
                <a href="#use-cases" className="hover:text-primary-400 transition-colors text-sm">Sử dụng</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary-400 transition-colors text-sm">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Hỗ trợ</h4>
            <ul className="space-y-3">
              <li>
                <a href="#faq" className="hover:text-primary-400 transition-colors text-sm">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                  Hướng dẫn sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                  Báo lỗi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-warm-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-warm-gray-400 text-sm text-center md:text-left">
              © 2024 TaskApp • Không gian làm việc được kết nối
            </p>
            <p className="text-warm-gray-500 text-sm text-center md:text-right">
              Made with ❤️ in Vietnam
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ==================== MAIN COMPONENT ====================
export default function SimpleLandingPage() {
  const navigate = useNavigate()
  
  // Performance optimization: reduce animations on mobile and respect user preferences
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const shouldAnimate = !shouldReduceMotion && !isMobile

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>TaskApp - Quản lý công việc thông minh hơn với AI | Miễn phí mãi mãi</title>
        <meta name="description" content="TaskApp giúp bạn tăng năng suất 3x với AI thông minh, tải trong < 1 giây, giao diện đẹp. Nhanh hơn Notion, thông minh hơn Todoist. Miễn phí mãi mãi, không cần thẻ tín dụng." />
        <meta name="keywords" content="task management, todo app, productivity app, AI task manager, smart tasks, notion alternative, todoist alternative, vietnam task app, quản lý công việc, ứng dụng task" />
        <meta property="og:title" content="TaskApp - Quản lý công việc thông minh hơn với AI" />
        <meta property="og:description" content="Tăng năng suất 3x với AI thông minh. Tải < 1 giây, giao diện đẹp, miễn phí mãi mãi. Được 10,000+ người dùng tin tưởng." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://taskapp.example" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TaskApp - Quản lý công việc thông minh hơn với AI" />
        <meta name="twitter:description" content="Tăng năng suất 3x với AI thông minh. Miễn phí mãi mãi, không cần thẻ tín dụng." />
        <meta name="twitter:image" content="/twitter-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'TaskApp',
            url: 'https://taskapp.example',
            logo: '/vite.svg'
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'TaskApp',
            applicationCategory: 'ProductivityApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
          })}
        </script>
      </Helmet>

      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-white dark:bg-warm-gray-800 text-warm-gray-900 dark:text-white px-3 py-2 rounded">Skip to content</a>

      <div className="min-h-screen bg-white dark:bg-warm-gray-900">
        <Navbar navigate={navigate} />
        <main id="main">
          <HeroSection navigate={navigate} shouldAnimate={shouldAnimate} />
          
          {/* ✅ Lazy-loaded sections với content-aware skeletons */}
          <Suspense fallback={<SocialProofSkeleton />}>
            <SocialProofSection />
          </Suspense>
          
          <FeaturesSection />
          
          <Suspense fallback={<ComparisonSkeleton />}>
            <ComparisonSection />
          </Suspense>
          
          <TechStackSection />
          <UseCasesSection />
          <FAQSection />
          <FinalCTASection navigate={navigate} />
        </main>
        <SimpleFooter />
        <BackToTop />
      </div>
    </>
  )
}