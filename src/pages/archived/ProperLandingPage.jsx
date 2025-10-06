import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  HiSparkles, HiLightningBolt, HiChartBar, HiUsers, HiShieldCheck,
  HiMenu, HiX, HiArrowRight, HiCheck, HiStar, HiPlay,
  HiOutlineViewBoards, HiOutlineCog, HiOutlineChartBar,
  HiMail, HiPhone, HiLocationMarker
} from 'react-icons/hi'
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa'
import AnimatedBackground from '../components/ui/AnimatedBackground'

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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-warm-gray-900/80 backdrop-blur-xl shadow-lg border-b border-warm-gray-200/20'
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
            <a href="#features" className="text-warm-gray-700 dark:text-warm-gray-300 hover:text-primary-600 transition-colors">
              Tính năng
            </a>
            <a href="#pricing" className="text-warm-gray-700 dark:text-warm-gray-300 hover:text-primary-600 transition-colors">
              Bảng giá
            </a>
            <a href="#testimonials" className="text-warm-gray-700 dark:text-warm-gray-300 hover:text-primary-600 transition-colors">
              Đánh giá
            </a>
          </div>

          {/* Desktop CTAs - QUAN TRỌNG! */}
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
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg"
            >
              Dùng thử miễn phí
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
              <a href="#features" className="block text-warm-gray-700 dark:text-warm-gray-300">Tính năng</a>
              <a href="#pricing" className="block text-warm-gray-700 dark:text-warm-gray-300">Bảng giá</a>
              <a href="#testimonials" className="block text-warm-gray-700 dark:text-warm-gray-300">Đánh giá</a>
              <div className="pt-4 space-y-3 border-t">
                <button
                  onClick={() => navigate('/auth')}
                  className="w-full py-3 rounded-xl border-2 border-warm-gray-300 text-warm-gray-700 font-medium"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => navigate('/auth')}
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
      
      {/* Content */}
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
          <span className="text-sm font-medium">🎉 Mới! AI Assistant cho task planning</span>
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
            className="px-8 py-4 rounded-2xl bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-md border-2 border-warm-gray-200/50 text-warm-gray-800 dark:text-white font-semibold text-lg"
          >
            <span className="flex items-center gap-2">
              <HiPlay /> Xem demo
            </span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { icon: HiUsers, number: '10,000+', label: 'Teams Active' },
            { icon: HiChartBar, number: '1M+', label: 'Tasks Completed' },
            { icon: HiShieldCheck, number: '99.9%', label: 'Uptime SLA' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white/60 dark:bg-warm-gray-800/60 backdrop-blur-md"
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

// ==================== FEATURES SECTION ====================
function FeaturesSection() {
  const features = [
    {
      icon: HiOutlineViewBoards,
      title: 'Kanban Board Trực quan',
      description: 'Kéo thả tasks dễ dàng, custom workflow theo nhu cầu team',
      items: ['Drag & Drop', 'Custom Columns', 'WIP Limits', 'Swimlanes']
    },
    {
      icon: HiUsers,
      title: 'Real-time Collaboration',
      description: 'Comment, mention, share files ngay trong task',
      items: ['Live Comments', '@Mentions', 'File Sharing', 'Activity Feed']
    },
    {
      icon: HiOutlineCog,
      title: 'Automation Workflow',
      description: 'Tiết kiệm 5 giờ/tuần với automation rules',
      items: ['Rule Builder', 'Triggers', 'Actions', 'Templates']
    },
    {
      icon: HiOutlineChartBar,
      title: 'Analytics & Reports',
      description: 'Burndown charts, velocity tracking, team metrics',
      items: ['Dashboards', 'Custom Reports', 'Export Data', 'API Access']
    }
  ]

  return (
    <section id="features" className="py-32 px-4 sm:px-6 bg-white dark:bg-warm-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            Mọi thứ bạn cần để quản lý công việc hiệu quả
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto">
            Từ brainstorming đến delivery, TaskApp giúp team làm việc nhanh và thông minh hơn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white dark:bg-warm-gray-800 border border-warm-gray-200/50 dark:border-warm-gray-700/50 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-warm-gray-600 dark:text-warm-gray-400 mb-6">
                {feature.description}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {feature.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <HiCheck className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-warm-gray-600 dark:text-warm-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== TESTIMONIALS ====================
function TestimonialsSection() {
  const testimonials = [
    {
      content: "TaskApp đã giúp team chúng tôi tăng năng suất 300%. Kanban board cực kỳ trực quan!",
      author: "Nguyễn Văn A",
      role: "CEO",
      company: "TechCorp Vietnam",
      rating: 5
    },
    {
      content: "Automation features tiết kiệm cho team 10+ giờ mỗi tuần. Highly recommended!",
      author: "Trần Thị B",
      role: "Product Manager",
      company: "StartupX",
      rating: 5
    },
    {
      content: "Real-time collaboration làm việc remote trở nên dễ dàng. Team 50+ người dùng hàng ngày.",
      author: "Lê Văn C",
      role: "CTO",
      company: "Digital Agency",
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className="py-32 px-4 sm:px-6 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 dark:from-warm-gray-800 dark:to-warm-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            10,000+ teams tin dùng TaskApp
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/90 dark:bg-warm-gray-800/90 backdrop-blur-xl shadow-xl"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-warm-gray-700 dark:text-warm-gray-300 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-warm-gray-900 dark:text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
                  {testimonial.role} at {testimonial.company}
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
      description: 'Perfect cho cá nhân và small teams',
      features: ['Lên đến 10 users', 'Unlimited tasks', 'Basic Kanban', '7 ngày history'],
      cta: 'Bắt đầu miễn phí',
      popular: false
    },
    {
      name: 'Pro',
      price: '199,000',
      description: 'Cho teams chuyên nghiệp',
      features: ['Unlimited users', 'Automation rules', 'Custom fields', 'Priority support', 'Advanced analytics'],
      cta: 'Dùng thử 14 ngày',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Cho doanh nghiệp lớn',
      features: ['SSO/SAML', 'Dedicated support', 'On-premise option', 'Custom integrations', 'SLA 99.99%'],
      cta: 'Liên hệ Sales',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-32 px-4 sm:px-6 bg-white dark:bg-warm-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            Chọn gói phù hợp với team của bạn
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400">
            Transparent pricing, không phí ẩn. Upgrade hoặc downgrade bất cứ lúc nào.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-3xl ${
                plan.popular 
                  ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white' 
                  : 'bg-white dark:bg-warm-gray-800 border border-warm-gray-200/50'
              } shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-400 text-warm-gray-900 text-sm font-bold">
                  POPULAR
                </div>
              )}
              
              <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-warm-gray-900 dark:text-white'}`}>
                {plan.name}
              </h3>
              <div className="mb-4">
                {plan.price === 'Custom' ? (
                  <span className={`text-3xl font-bold ${plan.popular ? 'text-white' : 'text-warm-gray-900 dark:text-white'}`}>
                    Custom
                  </span>
                ) : (
                  <>
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-warm-gray-900 dark:text-white'}`}>
                      {plan.price === '0' ? 'Free' : `₫${plan.price}`}
                    </span>
                    {plan.price !== '0' && <span className={plan.popular ? 'text-white/80' : 'text-warm-gray-600'}>/tháng</span>}
                  </>
                )}
              </div>
              <p className={`mb-6 ${plan.popular ? 'text-white/90' : 'text-warm-gray-600 dark:text-warm-gray-400'}`}>
                {plan.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <HiCheck className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-green-500'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-warm-gray-600 dark:text-warm-gray-400'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-white text-primary-600 hover:bg-warm-gray-50'
                    : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
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
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <HiSparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl">TaskApp</h3>
                <p className="text-xs text-warm-gray-400">Work Smarter, Not Harder</p>
              </div>
            </div>
            <p className="text-warm-gray-400 mb-6">
              Nền tảng quản lý công việc all-in-one cho teams hiện đại. 
              Kanban, Automation, Analytics trong một app duy nhất.
            </p>
            <div className="flex gap-4">
              <FaTwitter className="w-6 h-6 text-warm-gray-400 hover:text-white cursor-pointer transition-colors" />
              <FaLinkedin className="w-6 h-6 text-warm-gray-400 hover:text-white cursor-pointer transition-colors" />
              <FaGithub className="w-6 h-6 text-warm-gray-400 hover:text-white cursor-pointer transition-colors" />
              <FaFacebook className="w-6 h-6 text-warm-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Sản phẩm</h4>
            <ul className="space-y-3 text-warm-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Tính năng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Công ty</h4>
            <ul className="space-y-3 text-warm-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray-400 text-sm">
            © 2024 TaskApp. All rights reserved.
          </p>
          <div className="flex gap-6 text-warm-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ==================== MAIN COMPONENT ====================
export default function ProperLandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-warm-gray-50 dark:bg-warm-gray-900">
      <Navbar />
      <HeroSection navigate={navigate} />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection navigate={navigate} />
      <FinalCTA navigate={navigate} />
      <Footer />
    </div>
  )
}