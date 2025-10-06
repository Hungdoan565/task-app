import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  HiSparkles, HiLightningBolt, HiChartBar, HiUsers, HiShieldCheck,
  HiMenu, HiX, HiArrowRight, HiCheck, HiStar, HiPlay,
  HiOutlineViewBoards, HiOutlineCog, HiOutlineChartBar,
  HiMail, HiPhone, HiLocationMarker, HiChevronUp, HiChevronDown
} from 'react-icons/hi'
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa'
import AnimatedBackground from '../components/ui/AnimatedBackground'

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
function Navbar() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Đóng menu khi click link
  const handleNavClick = (href) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
              { href: '#pricing', label: 'Bảng giá' },
              { href: '#testimonials', label: 'Đánh giá' },
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
            className="lg:hidden p-2 text-warm-gray-900 dark:text-white"
            aria-label="Toggle menu"
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
              {[
                { href: '#features', label: 'Tính năng' },
                { href: '#pricing', label: 'Bảng giá' },
                { href: '#testimonials', label: 'Đánh giá' },
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
                  onClick={() => { navigate('/auth'); setMobileMenuOpen(false) }}
                  className="w-full py-3 rounded-xl border-2 border-warm-gray-300 dark:border-warm-gray-600 text-warm-gray-700 dark:text-warm-gray-300 font-medium"
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

// ==================== HERO SECTION ====================
function HeroSection({ navigate }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center pt-32 pb-20">
        {/* Badge */}
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
          <span className="text-sm font-medium text-warm-gray-700 dark:text-warm-gray-300">
            🎉 Mới! AI Assistant cho task planning
          </span>
        </motion.div>

        {/* Headline */}
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

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto mb-10"
        >
          TaskApp giúp đội nhóm tăng năng suất 3x với Kanban board trực quan, 
          tự động hóa workflow, và real-time collaboration. Được tin dùng bởi 10,000+ teams.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/auth')}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg shadow-xl"
          >
            <span className="flex items-center gap-2">
              Bắt đầu miễn phí
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 rounded-2xl bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-md border-2 border-warm-gray-200/50 text-warm-gray-800 dark:text-white font-semibold text-lg"
          >
            <span className="flex items-center gap-2">
              <HiPlay className="w-5 h-5" />
              Xem demo
            </span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: HiUsers, value: '10,000+', label: 'Active Users' },
            { icon: HiChartBar, value: '3x', label: 'Productivity Boost' },
            { icon: HiLightningBolt, value: '99.9%', label: 'Uptime' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/60 dark:bg-warm-gray-800/60 backdrop-blur-md"
            >
              <stat.icon className="w-8 h-8 text-primary-600" />
              <div className="text-left">
                <div className="text-2xl font-bold text-warm-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-warm-gray-600 dark:text-warm-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ==================== FEATURES SECTION ====================
function FeaturesSection() {
  const features = [
    {
      icon: HiOutlineViewBoards,
      title: 'Kanban Board Trực Quan',
      description: 'Drag & drop tasks dễ dàng giữa các columns. Real-time sync cho toàn bộ team.',
      highlights: ['Drag & drop', 'Real-time sync', 'Custom columns', 'Swimlanes']
    },
    {
      icon: HiLightningBolt,
      title: 'Tự Động Hóa Workflow',
      description: 'Tạo automation rules để tiết kiệm thời gian. Trigger actions tự động khi task thay đổi.',
      highlights: ['Auto-assign', 'Status triggers', 'Email notifications', 'Webhooks']
    },
    {
      icon: HiOutlineChartBar,
      title: 'Analytics & Reports',
      description: 'Theo dõi tiến độ team với dashboard chi tiết. Export reports để chia sẻ với stakeholders.',
      highlights: ['Burndown charts', 'Velocity tracking', 'Time reports', 'Export PDF']
    },
    {
      icon: HiShieldCheck,
      title: 'Bảo Mật Enterprise',
      description: 'Mã hóa dữ liệu end-to-end. Tuân thủ GDPR và SOC 2 Type II.',
      highlights: ['SSL encryption', 'Two-factor auth', 'SSO integration', 'Audit logs']
    }
  ]

  return (
    <section id="features" className="py-24 bg-warm-gray-50 dark:bg-warm-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-warm-gray-900 dark:text-white mb-4">
            Tính năng <span className="text-primary-600">Nổi bật</span>
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-2xl mx-auto">
            Mọi thứ bạn cần để quản lý projects hiệu quả
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group p-8 rounded-3xl bg-white dark:bg-warm-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-warm-gray-600 dark:text-warm-gray-400 mb-6">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.highlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-warm-gray-600 dark:text-warm-gray-400">
                    <HiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
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
      name: 'Nguyễn Văn A',
      role: 'Product Manager tại TechCorp',
      avatar: '👨‍💼',
      rating: 5,
      text: 'TaskApp đã thay đổi cách team tôi làm việc. Năng suất tăng gấp đôi chỉ sau 2 tuần sử dụng!'
    },
    {
      name: 'Trần Thị B',
      role: 'Engineering Lead tại StartupXYZ',
      avatar: '👩‍💻',
      rating: 5,
      text: 'Kanban board trực quan và automation features thực sự tiết kiệm rất nhiều thời gian. Highly recommended!'
    },
    {
      name: 'Lê Minh C',
      role: 'Freelance Designer',
      avatar: '🎨',
      rating: 5,
      text: 'Interface đẹp, dễ sử dụng, và có đầy đủ tính năng tôi cần. Pricing cũng rất hợp lý!'
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
            Khách hàng <span className="text-primary-600">Nói gì</span>
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400">
            10,000+ teams tin tưởng TaskApp mỗi ngày
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

// ==================== PRICING SECTION ====================
function PricingSection({ navigate }) {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Cho cá nhân và teams nhỏ',
      features: [
        'Tối đa 10 tasks',
        '1 Kanban board',
        'Basic automation',
        'Email support',
        '7 ngày lưu trữ'
      ],
      highlighted: false
    },
    {
      name: 'Pro',
      price: '199,000',
      description: 'Cho teams đang phát triển',
      features: [
        'Unlimited tasks',
        'Unlimited boards',
        'Advanced automation',
        'Priority support',
        'Unlimited storage',
        'Custom fields',
        'Analytics & reports'
      ],
      highlighted: true,
      badge: 'Phổ biến nhất'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Cho organizations lớn',
      features: [
        'Tất cả tính năng Pro',
        'Dedicated support',
        'SSO integration',
        'Advanced security',
        'Custom integrations',
        'SLA guarantee',
        'Training & onboarding'
      ],
      highlighted: false
    }
  ]

  return (
    <section id="pricing" className="py-24 bg-warm-gray-50 dark:bg-warm-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-warm-gray-900 dark:text-white mb-4">
            Bảng giá <span className="text-primary-600">Linh hoạt</span>
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400">
            Chọn plan phù hợp với nhu cầu của bạn
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative p-8 rounded-3xl ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-2xl scale-105'
                  : 'bg-white dark:bg-warm-gray-800 shadow-lg'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-400 text-warm-gray-900 text-sm font-semibold">
                  {plan.badge}
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-2xl font-bold mb-2 ${
                plan.highlighted ? 'text-white' : 'text-warm-gray-900 dark:text-white'
              }`}>
                {plan.name}
              </h3>

              {/* Description */}
              <p className={`mb-6 ${
                plan.highlighted ? 'text-white/90' : 'text-warm-gray-600 dark:text-warm-gray-400'
              }`}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className={`text-5xl font-extrabold ${
                  plan.highlighted ? 'text-white' : 'text-warm-gray-900 dark:text-white'
                }`}>
                  {plan.price === 'Custom' ? 'Custom' : `₫${plan.price}`}
                </span>
                {plan.price !== 'Custom' && (
                  <span className={`text-lg ${
                    plan.highlighted ? 'text-white/80' : 'text-warm-gray-600 dark:text-warm-gray-400'
                  }`}>
                    /tháng
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <HiCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? 'text-white' : 'text-green-500'
                    }`} />
                    <span className={plan.highlighted ? 'text-white/90' : 'text-warm-gray-600 dark:text-warm-gray-400'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
                className={`w-full py-4 rounded-2xl font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-white text-primary-600 hover:bg-warm-gray-100'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {plan.price === 'Custom' ? 'Liên hệ Sales' : 'Bắt đầu ngay'}
              </motion.button>
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
      question: 'TaskApp có miễn phí không?',
      answer: 'Có! Chúng tôi có plan Free với đầy đủ tính năng cơ bản cho cá nhân và teams nhỏ. Bạn có thể nâng cấp lên Pro hoặc Enterprise khi cần thêm tính năng.'
    },
    {
      question: 'Tôi có thể hủy subscription bất cứ lúc nào không?',
      answer: 'Hoàn toàn được! Bạn có thể hủy subscription bất cứ lúc nào mà không mất phí. Data của bạn sẽ được giữ lại trong 30 ngày sau khi hủy.'
    },
    {
      question: 'TaskApp có tích hợp với các công cụ khác không?',
      answer: 'Có, TaskApp tích hợp với hơn 50+ công cụ phổ biến như Slack, Google Drive, GitHub, Jira, và nhiều hơn nữa. Enterprise plan còn hỗ trợ custom integrations.'
    },
    {
      question: 'Dữ liệu của tôi có an toàn không?',
      answer: 'Tuyệt đối! Chúng tôi sử dụng mã hóa SSL/TLS cho tất cả data transfer, và tuân thủ các tiêu chuẩn bảo mật cao nhất như GDPR, SOC 2 Type II. Data centers của chúng tôi cũng được kiểm toán thường xuyên.'
    },
    {
      question: 'Tôi có thể mời bao nhiêu thành viên?',
      answer: 'Plan Free giới hạn 5 members. Plan Pro unlimited members. Enterprise plan có thể custom theo nhu cầu tổ chức của bạn.'
    },
    {
      question: 'Support có sẵn 24/7 không?',
      answer: 'Pro plan có priority email support (response trong 24h). Enterprise plan có dedicated support với SLA guarantee và hotline 24/7.'
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
            Câu hỏi <span className="text-primary-600">Thường gặp</span>
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400">
            Tìm câu trả lời cho các thắc mắc phổ biến
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
              >
                <span className="font-semibold text-lg text-warm-gray-900 dark:text-white pr-4">
                  {faq.question}
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

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20"
        >
          <p className="text-lg text-warm-gray-700 dark:text-warm-gray-300 mb-4">
            Không tìm thấy câu trả lời bạn cần?
          </p>
          <a
            href="mailto:support@taskapp.com"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:underline"
          >
            <HiMail className="w-5 h-5" />
            Liên hệ support team
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
            Sẵn sàng tăng năng suất?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join 10,000+ teams đang sử dụng TaskApp để làm việc hiệu quả hơn mỗi ngày
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="px-8 py-4 rounded-2xl bg-white text-primary-600 font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
            >
              <span className="flex items-center gap-2">
                Bắt đầu miễn phí
                <HiArrowRight />
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-white border-2 border-white/30 font-semibold text-lg hover:bg-white/20 transition-colors"
            >
              Schedule demo
            </motion.button>
          </div>

          <p className="mt-6 text-white/70 text-sm">
            ✨ Không cần credit card • Cancel anytime • Free forever
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="bg-warm-gray-900 text-warm-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
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
            <p className="text-warm-gray-400 mb-6 max-w-sm">
              Task management platform giúp teams làm việc hiệu quả hơn với Kanban boards, automation, và real-time collaboration.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-warm-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-warm-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-warm-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-warm-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Integrations', 'Changelog', 'API'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-primary-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Press', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-primary-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-warm-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray-400 text-sm">
            © 2024 TaskApp. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ==================== MAIN COMPONENT ====================
export default function FinalLandingPage() {
  const navigate = useNavigate()

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>TaskApp - Quản lý công việc thông minh hơn</title>
        <meta name="description" content="Task management platform giúp teams tăng năng suất 3x với Kanban board trực quan, tự động hóa workflow, và real-time collaboration." />
        <meta name="keywords" content="task management, kanban, project management, team collaboration, productivity" />
        
        {/* Open Graph */}
        <meta property="og:title" content="TaskApp - Quản lý công việc thông minh hơn" />
        <meta property="og:description" content="Task management platform giúp teams tăng năng suất 3x với Kanban board trực quan." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://taskapp.com" />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TaskApp - Quản lý công việc thông minh hơn" />
        <meta name="twitter:description" content="Task management platform giúp teams tăng năng suất 3x." />
        <meta name="twitter:image" content="/twitter-image.jpg" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-warm-gray-900">
        <Navbar />
        <HeroSection navigate={navigate} />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection navigate={navigate} />
        <FAQSection />
        <FinalCTASection navigate={navigate} />
        <Footer />
        <BackToTop />
      </div>
    </>
  )
}
