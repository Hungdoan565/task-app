import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  HiOutlineViewBoards, HiOutlineUsers, HiOutlineCog, HiOutlineChartBar,
  HiOutlineTrendingUp, HiOutlineClock, HiOutlineCurrencyDollar,
  HiCheck, HiX, HiChevronDown, HiChevronUp, HiMail, HiExternalLink,
  HiArrowRight, HiSparkles
} from 'react-icons/hi'
import { 
  FaSlack, FaGithub, FaFigma, FaDropbox, FaTwitter, FaLinkedin, 
  FaYoutube, FaFacebook, FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight
} from 'react-icons/fa'
import { SiJira, SiGooglecalendar } from 'react-icons/si'
import content from '../../../docs/landing-content-minimal.json'

// Animated Counter Component
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

// ==================== FEATURES SECTION ====================
export function FeaturesSection() {
  const { features } = content
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const icons = {
    ViewBoardsIcon: HiOutlineViewBoards,
    UsersIcon: HiOutlineUsers,
    CogIcon: HiOutlineCog,
    ChartBarIcon: HiOutlineChartBar
  }
  
  return (
    <section ref={containerRef} id="features" className="py-32 px-4 sm:px-6 bg-white dark:bg-warm-gray-900">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {features.items.map((feature, index) => {
            const Icon = icons[feature.icon]
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="relative p-8 rounded-3xl bg-white dark:bg-warm-gray-800 border border-warm-gray-200/50 dark:border-warm-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-warm-gray-600 dark:text-warm-gray-400 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    {/* Feature List */}
                    <div className="grid grid-cols-2 gap-3">
                      {feature.features.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <HiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Demo Screenshot Placeholder */}
                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-warm-gray-100 to-warm-gray-200 dark:from-warm-gray-700 dark:to-warm-gray-600 h-48 flex items-center justify-center">
                      <span className="text-warm-gray-500 dark:text-warm-gray-400">
                        [Demo Screenshot]
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ==================== BENEFITS SECTION ====================
export function BenefitsSection() {
  const { benefits } = content
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const icons = {
    TrendingUpIcon: HiOutlineTrendingUp,
    ClockIcon: HiOutlineClock,
    CurrencyDollarIcon: HiOutlineCurrencyDollar
  }
  
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.cards.map((card, index) => {
            const Icon = icons[card.icon]
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative p-8 rounded-3xl bg-white/90 dark:bg-warm-gray-800/90 backdrop-blur-xl shadow-xl text-center overflow-hidden group"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500" />
                </div>
                
                <div className="relative z-10">
                  <Icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ==================== INTEGRATIONS SECTION ====================
export function IntegrationsSection() {
  const { integrations } = content
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const logos = {
    'Slack': FaSlack,
    'GitHub': FaGithub
  }
  
  return (
    <section ref={containerRef} id="integrations" className="py-32 px-4 sm:px-6 bg-white dark:bg-warm-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            {integrations.title}
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto">
            {integrations.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {integrations.tools.map((tool, index) => {
            const Logo = logos[tool.name]
            
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="group"
              >
                <div className="p-6 rounded-2xl bg-white dark:bg-warm-gray-800 border border-warm-gray-200/50 dark:border-warm-gray-700/50 hover:shadow-xl transition-all duration-300 text-center">
                  <Logo className="w-12 h-12 mx-auto mb-3 text-warm-gray-600 dark:text-warm-gray-400 group-hover:text-primary-500 transition-colors" />
                  <h4 className="font-semibold text-sm text-warm-gray-900 dark:text-white">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-warm-gray-600 dark:text-warm-gray-400 mt-2">
                    {tool.category}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-warm-gray-600 dark:text-warm-gray-400">
            And 40+ more integrations...
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== PRICING SECTION ====================
export function PricingSection({ navigate }) {
  const { pricing } = content
  const [billingPeriod, setBillingPeriod] = useState('monthly')
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  
  return (
    <section ref={containerRef} id="pricing" className="py-32 px-4 sm:px-6 bg-warm-gray-50 dark:bg-warm-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            {pricing.title}
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto mb-8">
            {pricing.subtitle}
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1 rounded-full bg-white dark:bg-warm-gray-800 border border-warm-gray-200 dark:border-warm-gray-700">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-primary-500 text-white'
                  : 'text-warm-gray-600 dark:text-warm-gray-400'
              }`}
            >
              {pricing.monthly}
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-primary-500 text-white'
                  : 'text-warm-gray-600 dark:text-warm-gray-400'
              }`}
            >
              {pricing.yearly}
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                {pricing.saveText}
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-3xl bg-white dark:bg-warm-gray-800 shadow-xl ${
                plan.popular ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary-500 text-white text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-warm-gray-600 dark:text-warm-gray-400">
                  {plan.description}
                </p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-warm-gray-900 dark:text-white">
                    {plan.currency}{plan.price === "Custom" ? "" : billingPeriod === 'yearly' && plan.price !== "0" ? 
                      Math.floor(parseInt(plan.price.replace(/,/g, '')) * 0.8).toLocaleString() : 
                      plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-warm-gray-600 dark:text-warm-gray-400">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <HiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
                      {feature}
                    </span>
                  </div>
                ))}
                {plan.limitations.map((limitation) => (
                  <div key={limitation} className="flex items-start gap-3 opacity-60">
                    <HiX className="w-5 h-5 text-warm-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-warm-gray-500 dark:text-warm-gray-500">
                      {limitation}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'bg-warm-gray-100 dark:bg-warm-gray-700 text-warm-gray-900 dark:text-white hover:bg-warm-gray-200 dark:hover:bg-warm-gray-600'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== TESTIMONIALS SECTION ====================
export function TestimonialsSection() {
  const { testimonials } = content
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.reviews.length)
  }
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.reviews.length) % testimonials.reviews.length)
  }
  
  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(nextTestimonial, 5000)
    return () => clearInterval(timer)
  }, [autoPlay, currentIndex])
  
  const currentTestimonial = testimonials.reviews[currentIndex]
  
  return (
    <section ref={containerRef} className="py-32 px-4 sm:px-6 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 dark:from-warm-gray-900 dark:to-warm-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            {testimonials.title}
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto">
            {testimonials.subtitle}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative p-10 md:p-16 rounded-3xl bg-white/90 dark:bg-warm-gray-800/90 backdrop-blur-xl shadow-2xl"
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="absolute top-8 left-8 w-12 h-12 text-primary-500/20" />
              
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-6 h-6 text-yellow-400" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-xl md:text-2xl text-warm-gray-700 dark:text-warm-gray-300 text-center leading-relaxed mb-8 italic">
                "{currentTestimonial.content}"
              </p>
              
              {/* Author Info */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {currentTestimonial.author.charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg text-warm-gray-900 dark:text-white">
                    {currentTestimonial.author}
                  </h4>
                  <p className="text-warm-gray-600 dark:text-warm-gray-400">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white dark:bg-warm-gray-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaChevronLeft className="w-5 h-5 text-primary-600" />
            </motion.button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-primary-600'
                      : 'bg-warm-gray-400 hover:bg-primary-400'
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white dark:bg-warm-gray-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaChevronRight className="w-5 h-5 text-primary-600" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== FAQ SECTION ====================
export function FAQSection() {
  const { faq } = content
  const [openIndex, setOpenIndex] = useState(null)
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  return (
    <section ref={containerRef} id="faq" className="py-32 px-4 sm:px-6 bg-white dark:bg-warm-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            {faq.title}
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400">
            {faq.subtitle}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faq.questions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-2xl bg-white dark:bg-warm-gray-800 border border-warm-gray-200/50 dark:border-warm-gray-700/50 shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-warm-gray-50 dark:hover:bg-warm-gray-700/50 transition-colors"
              >
                <span className="font-semibold text-lg text-warm-gray-900 dark:text-white pr-8">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HiChevronDown className="w-6 h-6 text-primary-600 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-warm-gray-600 dark:text-warm-gray-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center p-8 rounded-2xl bg-warm-gray-50 dark:bg-warm-gray-800 border border-warm-gray-200/50 dark:border-warm-gray-700/50"
        >
          <p className="text-warm-gray-700 dark:text-warm-gray-300 mb-4">
            Still have questions? We're here to help!
          </p>
          <motion.a
            href="mailto:support@taskapp.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors"
          >
            <HiMail className="w-5 h-5" />
            Contact Support
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== CASE STUDY SECTION ====================
export function CaseStudySection() {
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const caseStudies = [
    {
      id: 1,
      company: "TechCorp Inc",
      logo: "TC",
      industry: "Technology",
      teamSize: "150+",
      challenge: "Team collaboration was scattered across multiple tools, causing delays and miscommunication.",
      solution: "Implemented TaskApp for unified project management and real-time collaboration.",
      results: [
        { metric: "50%", label: "Faster project delivery" },
        { metric: "35%", label: "Increased productivity" },
        { metric: "90%", label: "Team satisfaction" }
      ],
      testimonial: "TaskApp transformed how our team works together. It's now our central hub for everything.",
      author: "Sarah Johnson",
      role: "VP of Engineering"
    },
    {
      id: 2,
      company: "Creative Studio",
      logo: "CS",
      industry: "Design Agency",
      teamSize: "50+",
      challenge: "Managing client projects and deadlines became overwhelming with spreadsheets.",
      solution: "Switched to TaskApp's visual Kanban boards with client collaboration features.",
      results: [
        { metric: "3x", label: "More projects handled" },
        { metric: "70%", label: "Time saved on admin" },
        { metric: "95%", label: "Client satisfaction" }
      ],
      testimonial: "Our clients love the transparency. We've doubled our capacity without hiring more staff.",
      author: "Michael Chen",
      role: "Creative Director"
    }
  ]
  
  return (
    <section ref={containerRef} className="py-32 px-4 sm:px-6 bg-warm-gray-50 dark:bg-warm-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto">
            See how teams like yours achieve remarkable results with TaskApp
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl bg-white dark:bg-warm-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Company Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {study.logo}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-white">
                      {study.company}
                    </h3>
                    <p className="text-warm-gray-600 dark:text-warm-gray-400">
                      {study.industry} • {study.teamSize} employees
                    </p>
                  </div>
                </div>
                
                {/* Challenge & Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-warm-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <span className="text-red-500">•</span> Challenge
                    </h4>
                    <p className="text-warm-gray-600 dark:text-warm-gray-400 text-sm">
                      {study.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-warm-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <span className="text-green-500">•</span> Solution
                    </h4>
                    <p className="text-warm-gray-600 dark:text-warm-gray-400 text-sm">
                      {study.solution}
                    </p>
                  </div>
                </div>
                
                {/* Results */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-warm-gray-50 dark:bg-warm-gray-700/50">
                  {study.results.map((result, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-1">
                        {result.metric}
                      </div>
                      <div className="text-xs text-warm-gray-600 dark:text-warm-gray-400">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Testimonial */}
                <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500">
                  <p className="text-warm-gray-700 dark:text-warm-gray-300 italic mb-3">
                    "{study.testimonial}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                      {study.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-warm-gray-900 dark:text-white">
                        {study.author}
                      </div>
                      <div className="text-xs text-warm-gray-600 dark:text-warm-gray-400">
                        {study.role}
                      </div>
                    </div>
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

// ==================== FINAL CTA SECTION ====================
export function FinalCTASection({ navigate }) {
  const { cta } = content
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  
  return (
    <section ref={containerRef} className="relative py-32 px-4 sm:px-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />
      
      {/* Animated Shapes */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
      />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-8"
          >
            <HiSparkles className="w-4 h-4" />
            {cta.badge}
          </motion.div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            {cta.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            {cta.subtitle}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="group px-8 py-4 rounded-2xl bg-white text-primary-600 font-bold text-lg shadow-2xl hover:bg-warm-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                {cta.primaryButton}
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold text-lg hover:bg-white/20 transition-colors"
            >
              {cta.secondaryButton}
            </motion.button>
          </div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80"
          >
            {cta.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <HiCheck className="w-5 h-5" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== FOOTER ====================
export function Footer({ navigate }) {
  const { footer } = content
  const [email, setEmail] = useState('')
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    alert(`Thanks for subscribing with: ${email}`)
    setEmail('')
  }
  
  const socialIcons = {
    twitter: FaTwitter,
    linkedin: FaLinkedin,
    facebook: FaFacebook,
    youtube: FaYoutube
  }
  
  return (
    <footer className="bg-warm-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 mb-6 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                <HiSparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl">{footer.brand.name}</h3>
                <p className="text-xs text-warm-gray-400">{footer.brand.tagline}</p>
              </div>
            </motion.div>
            <p className="text-warm-gray-400 mb-6 leading-relaxed">
              {footer.brand.description}
            </p>
            
            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Subscribe to our newsletter
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-2 rounded-xl bg-warm-gray-800 border border-warm-gray-700 text-white placeholder-warm-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 transition-colors"
                >
                  <HiArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {footer.social.map((social) => {
                const Icon = socialIcons[social.platform]
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-warm-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>
          
          {/* Links Columns */}
          {footer.links.map((column) => (
            <div key={column.title}>
              <h4 className="font-bold text-lg mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.items.map((item) => (
                  <li key={item.text}>
                    <a
                      href={item.href}
                      className="text-warm-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>{item.text}</span>
                      {item.external && (
                        <HiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Divider */}
        <div className="border-t border-warm-gray-800 mb-8" />
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-warm-gray-400">
          <p>{footer.copyright}</p>
          <div className="flex gap-6">
            {footer.legal.map((item) => (
              <a
                key={item.text}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
