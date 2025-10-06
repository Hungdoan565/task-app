import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { 
  HiSparkles, HiLightningBolt, HiChartBar, HiClock, HiShieldCheck, HiUserGroup, 
  HiTemplate, HiGlobe, HiMenu, HiX, HiArrowRight, HiPlay, HiCheck, HiStar,
  HiChevronDown, HiChevronUp, HiMail, HiExternalLink, HiOutlineViewBoards,
  HiOutlineUsers, HiOutlineCog, HiOutlineChartBar, HiOutlineTrendingUp,
  HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineBadgeCheck
} from 'react-icons/hi'
import { 
  FaGithub, FaSlack, FaFigma, FaGoogle, FaDropbox, FaGitlab, FaArrowRight, 
  FaPlay, FaCheck, FaStar, FaTwitter, FaLinkedin, FaYoutube, FaFacebook,
  FaQuoteLeft, FaChevronLeft, FaChevronRight
} from 'react-icons/fa'
import { SiJira, SiGooglecalendar } from 'react-icons/si'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import content from '../../docs/landing-content-minimal.json'
import {
  FeaturesSection,
  BenefitsSection,
  IntegrationsSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
  CaseStudySection,
  FinalCTASection,
  Footer
} from '../components/landing/LandingSections'

// ==================== UTILITY COMPONENTS ====================

// Animated Counter
function AnimatedCounter({ value, duration = 2, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  
  useEffect(() => {
    if (!inView) return
    
    const numValue = parseInt(value.toString().replace(/[^0-9]/g, ''))
    const increment = numValue / (duration * 60)
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= numValue) {
        setCount(numValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 1000 / 60)
    
    return () => clearInterval(timer)
  }, [inView, value, duration])
  
  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Scroll Progress Bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 transform origin-left z-[60]"
      style={{ scaleX }}
    />
  )
}

// ==================== NAVBAR ====================

function Navbar({ isScrolled }) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 dark:bg-warm-gray-900/80 backdrop-blur-xl shadow-lg border-b border-warm-gray-200/20 dark:border-warm-gray-700/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 cursor-pointer z-10"
              onClick={() => navigate('/')}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25"
              >
                <HiSparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                  TaskApp
                </h1>
                <p className="text-xs text-warm-gray-600 dark:text-warm-gray-400">
                  Work Smarter
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {content.navbar.links.map((link, index) => (
                <motion.a
                  key={link.text}
                  href={link.href}
                  className="relative text-warm-gray-700 dark:text-warm-gray-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                  whileHover={{ y: -2 }}
                >
                  {link.text}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
                className="px-5 py-2.5 rounded-xl text-warm-gray-700 dark:text-warm-gray-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {content.navbar.cta.login}
              </motion.button>
              
              {/* Sign Up Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
                className="relative px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg overflow-hidden group"
              >
                <span className="relative z-10">{content.navbar.cta.signup}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 z-10"
            >
              {mobileMenuOpen ? (
                <HiX className="w-6 h-6 text-warm-gray-800 dark:text-warm-gray-200" />
              ) : (
                <HiMenu className="w-6 h-6 text-warm-gray-800 dark:text-warm-gray-200" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-warm-gray-900 shadow-2xl"
            >
              <div className="p-6 pt-24 space-y-6">
                {content.navbar.links.map((link) => (
                  <a
                    key={link.text}
                    href={link.href}
                    className="block text-lg font-medium text-warm-gray-700 dark:text-warm-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.text}
                  </a>
                ))}
                <div className="pt-6 space-y-3 border-t border-warm-gray-200 dark:border-warm-gray-700">
                  <button
                    onClick={() => {
                      navigate('/auth')
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-5 py-3 rounded-xl border-2 border-warm-gray-300 dark:border-warm-gray-700 text-warm-gray-700 dark:text-warm-gray-300 font-medium"
                  >
                    {content.navbar.cta.login}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/auth')
                      setMobileMenuOpen(false)
                    }}
                    className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold"
                  >
                    {content.navbar.cta.signup}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ==================== HERO SECTION ====================

function HeroSection({ navigate }) {
  const { hero } = content
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Floating Shapes */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-40 left-10 w-72 h-72 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-secondary-400/20 to-secondary-600/20 rounded-full blur-3xl"
      />
      
      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center py-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a
            href={hero.badge.link}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-md border border-warm-gray-200/50 dark:border-warm-gray-700/50 text-sm font-medium hover:scale-105 transition-all group"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            {hero.badge.text}
            <HiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold"
        >
          <span className="block text-warm-gray-900 dark:text-white">
            {hero.headline}
          </span>
          <span className="block mt-2 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500 bg-clip-text text-transparent animate-gradient-x">
            {hero.subheadline}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto leading-relaxed"
        >
          {hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg shadow-xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {hero.cta.primary.text}
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="block text-sm opacity-90 mt-1">{hero.cta.primary.subtext}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-2xl bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-md border-2 border-warm-gray-200/50 dark:border-warm-gray-700/50 text-warm-gray-800 dark:text-warm-gray-100 font-semibold text-lg hover:border-primary-500/50 transition-all"
            >
              <span className="flex items-center gap-2">
                <HiPlay className="w-5 h-5" />
                {hero.cta.secondary.text}
              </span>
            </motion.button>
          </div>

          {/* Login Link */}
          <div className="text-warm-gray-600 dark:text-warm-gray-400">
            {hero.cta.login.text}{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                navigate('/auth')
              }}
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              {hero.cta.login.link}
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {hero.stats.map((stat, index) => {
            const Icon = stat.icon === 'users' ? HiUserGroup : 
                       stat.icon === 'tasks' ? HiTemplate : HiShieldCheck
            
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white/60 dark:bg-warm-gray-800/60 backdrop-blur-md border border-warm-gray-200/50 dark:border-warm-gray-700/50"
              >
                <Icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                  <AnimatedCounter 
                    value={stat.number} 
                    duration={2}
                    suffix={stat.number.includes('+') ? '+' : stat.number.includes('%') ? '%' : ''}
                  />
                </div>
                <div className="mt-2 text-warm-gray-600 dark:text-warm-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trusted By */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20"
        >
          <p className="text-sm text-warm-gray-500 dark:text-warm-gray-400 mb-6">
            {hero.trustedBy.title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {hero.trustedBy.logos.map((logo) => (
              <motion.div
                key={logo}
                whileHover={{ scale: 1.1 }}
                className="text-2xl font-bold text-warm-gray-400 dark:text-warm-gray-600"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-warm-gray-400 flex justify-center">
          <div className="w-1 h-3 bg-warm-gray-400 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}

// Continue in next file due to length...
export default function CompleteLandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, loading, navigate])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900">
      <ScrollProgress />
      <Navbar isScrolled={isScrolled} />
      <HeroSection navigate={navigate} />
      <FeaturesSection />
      {/* <BenefitsSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <CaseStudySection />
      <PricingSection navigate={navigate} />
      <FAQSection />
      <FinalCTASection navigate={navigate} />
      <Footer navigate={navigate} /> */}
    </div>
  )
}