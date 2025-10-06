import React, { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  HiSparkles, HiLightningBolt, HiChartBar, HiUsers, HiShieldCheck,
  HiMenu, HiX, HiArrowRight, HiCheck, HiStar, HiPlay,
  HiOutlineViewBoards, HiOutlineCog, HiOutlineChartBar,
  HiChevronUp, HiChevronDown
} from 'react-icons/hi'
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa'
import AnimatedBackground from '../components/ui/AnimatedBackground'

// ==================== SKELETON COMPONENTS ====================
function SkeletonCard() {
  return (
    <div className="animate-pulse p-8 rounded-3xl bg-warm-gray-200 dark:bg-warm-gray-800">
      <div className="w-16 h-16 bg-warm-gray-300 dark:bg-warm-gray-700 rounded-2xl mb-6"></div>
      <div className="h-6 bg-warm-gray-300 dark:bg-warm-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-warm-gray-300 dark:bg-warm-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-warm-gray-300 dark:bg-warm-gray-700 rounded w-5/6"></div>
    </div>
  )
}

// ==================== LAZY LOADED COMPONENTS ====================
const FeaturesSection = lazy(() => import('../components/landing/EnhancedFeatures'))
const TestimonialsSection = lazy(() => import('../components/landing/EnhancedTestimonials'))
const PricingSection = lazy(() => import('../components/landing/EnhancedPricing'))
const FAQSection = lazy(() => import('../components/landing/EnhancedFAQ'))

// ==================== BACK TO TOP BUTTON ====================
function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors"
        >
          <HiChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ==================== NAVBAR WITH IMPROVEMENTS ====================
function EnhancedNavbar() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('nav')) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [mobileMenuOpen])

  const handleNavClick = (href) => {
    setMobileMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
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
            {['#features', '#pricing', '#testimonials', '#faq'].map((href, i) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                className="text-warm-gray-700 dark:text-warm-gray-300 hover:text-primary-600 transition-colors relative group"
              >
                {href.replace('#', '').charAt(0).toUpperCase() + href.slice(2)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="px-6 py-2.5 rounded-xl text-warm-gray-700 dark:text-warm-gray-300 font-medium hover:text-primary-600 transition-colors"
            >
              Đăng nhập
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Dùng thử miễn phí</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-warm-gray-900/95 backdrop-blur-xl border-t border-warm-gray-200/20"
          >
            <div className="px-4 py-6 space-y-4">
              {['#features', '#pricing', '#testimonials', '#faq'].map((href) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                  className="block text-warm-gray-700 dark:text-warm-gray-300 py-2"
                >
                  {href.replace('#', '').charAt(0).toUpperCase() + href.slice(2)}
                </a>
              ))}
              <div className="pt-4 space-y-3 border-t">
                <button
                  onClick={() => { navigate('/auth'); setMobileMenuOpen(false) }}
                  className="w-full py-3 rounded-xl border-2 border-warm-gray-300 text-warm-gray-700 font-medium"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => { navigate('/auth'); setMobileMenuOpen(false) }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold"
                >
                  Dùng thử miễn phí
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ==================== HERO WITH DEMO VIDEO ====================
function EnhancedHero({ navigate }) {
  const shouldReduceMotion = useReducedMotion()
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-md border border-warm-gray-200/50 mb-8"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium">🎉 Mới! AI Assistant cho task planning</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
            >
              <span className="text-warm-gray-900 dark:text-white">Quản lý công việc</span>
              <br />
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Thông minh hơn
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-warm-gray-600 dark:text-warm-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              TaskApp giúp đội nhóm tăng năng suất 3x với Kanban board trực quan, 
              tự động hóa workflow, và real-time collaboration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg shadow-xl w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Bắt đầu miễn phí
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-md border-2 border-warm-gray-200/50 text-warm-gray-800 dark:text-white font-semibold text-lg w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  <HiPlay /> Xem demo
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-6 text-sm text-warm-gray-600 dark:text-warm-gray-400"
            >
              <div className="flex items-center gap-2">
                <HiCheck className="w-5 h-5 text-green-500" />
                <span>Free 14 days</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="w-5 h-5 text-green-500" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Demo Video/Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-warm-gray-800">
              {/* Placeholder for demo video/screenshot */}
              <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <HiPlay className="w-20 h-20 mx-auto mb-4 text-white/80" />
                  <p className="text-white/80 text-lg">Demo Video Placeholder</p>
                  <p className="text-white/60 text-sm mt-2">Kanban Board in Action</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">10K+ Active Users</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
        >
          {[
            { icon: HiUsers, number: '10,000+', label: 'Teams Active' },
            { icon: HiChartBar, number: '1M+', label: 'Tasks Completed' },
            { icon: HiShieldCheck, number: '99.9%', label: 'Uptime SLA' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white/60 dark:bg-warm-gray-800/60 backdrop-blur-md text-center"
            >
              <stat.icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-warm-gray-900 dark:text-white">{stat.number}</div>
              <div className="text-sm text-warm-gray-600 dark:text-warm-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ==================== FINAL CTA ====================
function FinalCTA({ navigate }) {
  return (
    <section className="py-32 px-4 sm:px-6 bg-gradient-to-br from-primary-600 to-secondary-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTIgMi00IDJzLTQtMi00LTJzMiA0IDIgNHMtMiA0LTIgNHMyLTIgNC0yczQgMiA0IDJzLTItNC0yLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sẵn sàng tăng năng suất team 3x?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Tham gia cùng 10,000+ teams đang sử dụng TaskApp mỗi ngày
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/auth')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-primary-600 font-bold text-lg shadow-2xl hover:bg-warm-gray-50 transition-colors"
          >
            Dùng thử miễn phí ngay
            <HiArrowRight className="w-5 h-5" />
          </motion.button>
          
          <p className="mt-6 text-white/70 text-sm">
            Không cần thẻ tín dụng · Setup trong 2 phút · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="bg-warm-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <HiSparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl">TaskApp</h3>
                <p className="text-xs text-warm-gray-400">Work Smarter</p>
              </div>
            </div>
            <p className="text-warm-gray-400 mb-6">
              Nền tảng quản lý công việc all-in-one cho teams hiện đại
            </p>
            <div className="flex gap-4">
              <FaTwitter className="w-6 h-6 text-warm-gray-400 hover:text-white cursor-pointer transition-colors" />
              <FaLinkedin className="w-6 h-6 text-warm-gray-400 hover:text-white cursor-pointer transition-colors" />
              <FaGithub className="w-6 h-6 text-warm-gray-400 hover:text-white cursor-pointer transition-colors" />
              <FaFacebook className="w-6 h-6 text-warm-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Sản phẩm</h4>
            <ul className="space-y-3 text-warm-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Công ty</h4>
            <ul className="space-y-3 text-warm-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray-400 text-sm">© 2024 TaskApp. All rights reserved.</p>
          <div className="flex gap-6 text-warm-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ==================== MAIN COMPONENT WITH SEO ====================
export default function EnhancedLandingPage() {
  const navigate = useNavigate()

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>TaskApp - Quản Lý Công Việc Thông Minh Cho Đội Nhóm</title>
        <meta name="description" content="TaskApp giúp đội nhóm tăng năng suất 3x với Kanban board, automation, và real-time collaboration. Dùng thử miễn phí 14 ngày!" />
        <meta name="keywords" content="task management, kanban, team collaboration, productivity, project management" />
        
        {/* Open Graph */}
        <meta property="og:title" content="TaskApp - Quản Lý Công Việc Thông Minh" />
        <meta property="og:description" content="Tăng năng suất team 3x với Kanban board và automation" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TaskApp - Quản Lý Công Việc Thông Minh" />
        <meta name="twitter:description" content="Tăng năng suất team 3x với Kanban board" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "TaskApp",
            "applicationCategory": "ProductivityApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "VND"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "1250"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900">
        <EnhancedNavbar />
        <EnhancedHero navigate={navigate} />
        
        <Suspense fallback={
          <div className="py-32 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        }>
          <FeaturesSection />
        </Suspense>

        <Suspense fallback={<div className="h-96" />}>
          <TestimonialsSection />
        </Suspense>

        <Suspense fallback={<div className="h-96" />}>
          <PricingSection navigate={navigate} />
        </Suspense>

        <Suspense fallback={<div className="h-96" />}>
          <FAQSection />
        </Suspense>

        <FinalCTA navigate={navigate} />
        <Footer />
        <BackToTop />
      </div>
    </>
  )
}