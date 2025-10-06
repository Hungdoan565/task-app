import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { HiSparkles, HiLightningBolt, HiChartBar, HiClock, HiShieldCheck, HiUserGroup, HiTemplate, HiGlobe } from 'react-icons/hi'
import { FaGithub, FaSlack, FaFigma, FaGoogle, FaDropbox, FaGitlab, FaArrowRight, FaPlay, FaCheck, FaStar } from 'react-icons/fa'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import contentVi from '../../docs/landing-content-vi.json'
import contentEn from '../../docs/landing-content.json'

// Language context
const LanguageContext = React.createContext()

// Animated Counter Component
function AnimatedCounter({ value, duration = 2, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!inView) return
    
    const numValue = parseInt(value.replace(/[^0-9]/g, ''))
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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 transform origin-left z-50"
      style={{ scaleX }}
    />
  )
}

// Glass Navbar with Blur
function GlassNavbar({ isScrolled }) {
  const navigate = useNavigate()
  const [lang, setLang] = useState('vi')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/70 dark:bg-warm-gray-900/70 backdrop-blur-xl shadow-lg border-b border-warm-gray-200/20 dark:border-warm-gray-700/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <motion.div
              animate={{ rotate: 360 }}
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
                Workspace Thông Minh
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {['Tính Năng', 'Tích Hợp', 'Đánh Giá'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${['features', 'integrations', 'testimonials'][index]}`}
                className="relative text-warm-gray-700 dark:text-warm-gray-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            
            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warm-gray-100 dark:bg-warm-gray-800 text-sm font-medium"
            >
              <HiGlobe className="w-4 h-4" />
              {lang === 'vi' ? 'VI' : 'EN'}
            </motion.button>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="relative px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg overflow-hidden group"
            >
              <span className="relative z-10">Bắt Đầu Miễn Phí</span>
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
            className="md:hidden p-2"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
                className="w-full h-0.5 bg-warm-gray-800 dark:bg-warm-gray-200 rounded"
              />
              <motion.span
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                className="w-full h-0.5 bg-warm-gray-800 dark:bg-warm-gray-200 rounded"
              />
              <motion.span
                animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }}
                className="w-full h-0.5 bg-warm-gray-800 dark:bg-warm-gray-200 rounded"
              />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

// Hero Section with Glass Morphism
function HeroSection({ navigate, content }) {
  const { hero } = content
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Floating Shapes */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-3xl"
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
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center pt-32 pb-20"
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
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Headline with Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-5xl md:text-7xl font-extrabold"
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

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/auth')}
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg shadow-xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {hero.cta.primary.text}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 rounded-2xl bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-md border-2 border-warm-gray-200/50 dark:border-warm-gray-700/50 text-warm-gray-800 dark:text-warm-gray-100 font-semibold text-lg hover:border-primary-500/50 transition-all"
          >
            <span className="flex items-center gap-2">
              <FaPlay className="w-4 h-4" />
              {hero.cta.secondary.text}
            </span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {Object.keys(hero.stats).filter(key => !key.includes('Label')).map((key, index) => (
            <motion.div
              key={key}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white/60 dark:bg-warm-gray-800/60 backdrop-blur-md border border-warm-gray-200/50 dark:border-warm-gray-700/50"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                <AnimatedCounter 
                  value={hero.stats[key]} 
                  duration={2}
                  suffix={key === 'satisfaction' ? '/5' : '+'}
                />
              </div>
              <div className="mt-2 text-warm-gray-600 dark:text-warm-gray-400">
                {hero.stats[`${key}Label`]}
              </div>
            </motion.div>
          ))}
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

// Features Section with Cards
function FeaturesSection({ content }) {
  const { features } = content
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  
  return (
    <section ref={containerRef} id="features" className="py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            {features.title}
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto">
            {features.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.items.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-3xl bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-md border border-warm-gray-200/50 dark:border-warm-gray-700/50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-500" />
              
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-3xl shadow-lg shadow-primary-500/25"
              >
                {feature.icon}
              </motion.div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-warm-gray-600 dark:text-warm-gray-400 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Learn More Link */}
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 mt-6 text-primary-600 dark:text-primary-400 font-medium group/link"
                whileHover={{ x: 5 }}
              >
                Tìm hiểu thêm
                <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Benefits Section
function BenefitsSection({ content }) {
  const { benefits } = content
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  
  return (
    <section ref={containerRef} className="py-32 px-4 sm:px-6 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 dark:from-primary-900/10 dark:to-secondary-900/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            {benefits.title}
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto">
            {benefits.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative p-8 rounded-3xl bg-white/90 dark:bg-warm-gray-800/90 backdrop-blur-xl shadow-xl text-center overflow-hidden group"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500" />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-4">
                  <AnimatedCounter value={card.metric} duration={2} />
                </div>
                <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-warm-gray-600 dark:text-warm-gray-400">
                  {card.description}
                </p>
              </div>
              
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Rest of sections will follow similar pattern...

export default function ProfessionalLandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)
  const [lang, setLang] = useState('vi')
  const content = lang === 'vi' ? contentVi : contentEn

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
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900">
        <ScrollProgress />
        <GlassNavbar isScrolled={isScrolled} />
        <HeroSection navigate={navigate} content={content} />
        <FeaturesSection content={content} />
        <BenefitsSection content={content} />
        {/* Add more sections... */}
      </div>
    </LanguageContext.Provider>
  )
}