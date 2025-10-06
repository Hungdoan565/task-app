import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  staggerContainer,
  staggerItem,
  hoverScale,
  hoverLift,
  viewport
} from '../lib/animations'
import landingContent from '../../docs/landing-content.json'

export default function NewLandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated, loading } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Redirect if authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, loading, navigate])

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Loading state
  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-gray-50 via-white to-warm-gray-50 dark:from-warm-gray-900 dark:via-warm-gray-900 dark:to-warm-gray-900">
      {/* Navbar */}
      <Navbar isScrolled={isScrolled} navigate={navigate} />

      {/* Hero Section */}
      <HeroSection navigate={navigate} />

      {/* Stats Bar */}
      <StatsBar />

      {/* Features Section */}
      <FeaturesSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Integrations Section */}
      <IntegrationsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Strategies Section */}
      <StrategiesSection navigate={navigate} />

      {/* Final CTA */}
      <FinalCTA navigate={navigate} />

      {/* Footer */}
      <Footer />
    </div>
  )
}

// Navbar Component
function Navbar({ isScrolled, navigate }) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-warm-gray-900/80 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl text-warm-gray-900 dark:text-warm-gray-50">
              TaskApp
            </span>
          </motion.div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#integrations">Integrations</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors shadow-sm"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-warm-gray-700 dark:text-warm-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
    >
      {children}
    </a>
  )
}

// Hero Section
function HeroSection({ navigate }) {
  const { hero } = landingContent

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 opacity-50" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInDown}
          >
            <a
              href={hero.badge.link}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors mb-6"
            >
              {hero.badge.text}
            </a>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-warm-gray-900 dark:text-warm-gray-50 mb-4 leading-tight"
          >
            {hero.headline}
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {hero.subheadline}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="text-xl text-warm-gray-600 dark:text-warm-gray-400 mb-8 max-w-3xl mx-auto"
          >
            {hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg"
            >
              {hero.cta.primary.text} →
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={hero.cta.secondary.link}
              className="px-8 py-4 rounded-xl border-2 border-warm-gray-300 dark:border-warm-gray-700 text-warm-gray-800 dark:text-warm-gray-100 font-semibold text-lg hover:bg-warm-gray-100 dark:hover:bg-warm-gray-800 transition-all"
            >
              {hero.cta.secondary.text}
            </motion.a>
          </motion.div>

          {/* Hero Image/Demo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="rounded-2xl border-4 border-warm-gray-200 dark:border-warm-gray-800 bg-white dark:bg-warm-gray-900 shadow-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-100 dark:from-warm-gray-800 dark:via-warm-gray-800 dark:to-warm-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-warm-gray-600 dark:text-warm-gray-400">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Stats Bar
function StatsBar() {
  const { hero } = landingContent

  return (
    <section className="py-12 bg-warm-gray-100 dark:bg-warm-gray-800/50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div variants={staggerItem}>
            <div className="text-4xl font-bold text-primary-600 mb-2">{hero.stats.users}</div>
            <div className="text-warm-gray-600 dark:text-warm-gray-400">Active Users</div>
          </motion.div>
          <motion.div variants={staggerItem}>
            <div className="text-4xl font-bold text-primary-600 mb-2">{hero.stats.companies}</div>
            <div className="text-warm-gray-600 dark:text-warm-gray-400">Companies Trust Us</div>
          </motion.div>
          <motion.div variants={staggerItem}>
            <div className="text-4xl font-bold text-primary-600 mb-2">{hero.stats.satisfaction}</div>
            <div className="text-warm-gray-600 dark:text-warm-gray-400">Customer Satisfaction</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const { features } = landingContent

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-4">
            {features.title}
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto">
            {features.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.items.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover="hover"
      initial="rest"
      className="group"
    >
      <motion.div
        variants={hoverLift}
        className="h-full p-8 rounded-2xl bg-white dark:bg-warm-gray-800 border border-warm-gray-200 dark:border-warm-gray-700 shadow-sm hover:shadow-xl transition-shadow"
      >
        <div className="text-5xl mb-4">{feature.icon}</div>
        <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-3">
          {feature.title}
        </h3>
        <p className="text-warm-gray-600 dark:text-warm-gray-400 mb-6">
          {feature.description}
        </p>
        <div className="aspect-video rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-warm-gray-700 dark:to-warm-gray-700" />
      </motion.div>
    </motion.div>
  )
}

// Benefits Section  
function BenefitsSection() {
  const { benefits } = landingContent

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-4">
            {benefits.title}
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto">
            {benefits.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {benefits.cards.map((card) => (
            <motion.div
              key={card.id}
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-white dark:bg-warm-gray-800 shadow-lg text-center"
            >
              <div className="text-6xl font-bold text-primary-600 mb-3">{card.metric}</div>
              <div className="text-2xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-2">
                {card.title}
              </div>
              <div className="text-warm-gray-600 dark:text-warm-gray-400">{card.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Continue with other sections in next message due to length...
// I'll create separate component files for remaining sections

// Loading Screen
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-warm-gray-600 dark:text-warm-gray-400">Loading...</p>
      </div>
    </div>
  )
}

// Placeholder sections (will be fully implemented)
function IntegrationsSection() {
  const { integrations } = landingContent
  return (
    <section id="integrations" className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeInUp}
          className="text-4xl font-bold text-warm-gray-900 dark:text-warm-gray-50 mb-16"
        >
          {integrations.title}
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {integrations.tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={staggerItem}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-6 rounded-xl bg-white dark:bg-warm-gray-800 shadow-md"
            >
              <div className="text-4xl mb-2">🔌</div>
              <div className="font-semibold text-sm">{tool.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return <div className="py-20" />
}

function StrategiesSection({ navigate }) {
  return <div className="py-20" />
}

function FinalCTA({ navigate }) {
  const { cta } = landingContent
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-primary-600 to-secondary-600">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeInUp}
        className="max-w-4xl mx-auto text-center text-white"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{cta.title}</h2>
        <p className="text-xl mb-8 opacity-90">{cta.description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/auth')}
          className="px-10 py-4 rounded-xl bg-white text-primary-600 font-bold text-lg hover:bg-warm-gray-100 transition-all shadow-lg"
        >
          {cta.button.text} →
        </motion.button>
      </motion.div>
    </section>
  )
}

function Footer() {
  const { footer } = landingContent
  return (
    <footer className="py-16 px-6 bg-warm-gray-900 text-warm-gray-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-white mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.text}>
                    <a href={link.url} className="hover:text-white transition-colors">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-warm-gray-800 text-center text-sm">
          {footer.copyright}
        </div>
      </div>
    </footer>
  )
}
