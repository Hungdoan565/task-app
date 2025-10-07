import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  HiSparkles, HiLightningBolt, HiUsers, 
  HiMenu, HiX, HiArrowRight, HiCheck,
  HiOutlineViewBoards, HiMoon, HiClipboardList,
  HiViewGrid, HiDeviceMobile, HiRefresh,
  HiChevronUp, HiChevronDown, HiCode,
  HiUser, HiUserGroup, HiPhotograph,
  HiExternalLink, HiLogout, HiCog
} from 'react-icons/hi'
import { 
  SiReact, SiFirebase, SiTailwindcss, SiVite, 
  SiFramer, SiReactrouter, SiGithub, SiGoogle 
} from 'react-icons/si'
import AnimatedBackground from '../components/ui/AnimatedBackground'
import { useUser } from '../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'

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
                  onClick={() => navigate('/auth?mode=login')}
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
                  <span className="relative z-10">Đăng ký</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </motion.button>
              </>
            )}
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
                  onClick={() => { navigate('/auth?mode=login'); setMobileMenuOpen(false) }}
                  className="w-full py-3 rounded-xl border-2 border-warm-gray-300 dark:border-warm-gray-600 text-warm-gray-700 dark:text-warm-gray-300 font-medium"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => { navigate('/auth'); setMobileMenuOpen(false) }}
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
            🚀 Portfolio Project • Open Source
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
        >
          <span className="text-warm-gray-900 dark:text-white">Ứng dụng quản lý công việc</span>
          <br />
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            với Kanban Board
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto mb-10"
        >
          Xây dựng với React, Firebase và Tailwind CSS. 
          Giao diện hiện đại với drag-drop mượt mà, dark mode, và đồng bộ real-time.
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
              Bắt đầu sử dụng
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
          <motion.a
            href="https://github.com/Hungdoan565/task-app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 rounded-2xl bg-white/80 dark:bg-warm-gray-800/80 backdrop-blur-md border-2 border-warm-gray-200/50 text-warm-gray-800 dark:text-white font-semibold text-lg inline-flex"
          >
            <span className="flex items-center gap-2">
              <SiGithub className="w-5 h-5" />
              Xem Source Code
              <HiExternalLink className="w-4 h-4 opacity-60" />
            </span>
          </motion.a>
        </motion.div>

        {/* Screenshot Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="aspect-[16/10] bg-gradient-to-br from-warm-gray-100 to-warm-gray-200 dark:from-warm-gray-800 dark:to-warm-gray-700 rounded-3xl shadow-2xl flex items-center justify-center border border-warm-gray-300 dark:border-warm-gray-600">
            <div className="text-center">
              <HiPhotograph className="w-20 h-20 mx-auto text-warm-gray-400 mb-4" />
              <p className="text-lg text-warm-gray-500">Kanban Board Screenshot</p>
              <p className="text-sm text-warm-gray-400 mt-2">Coming soon...</p>
            </div>
          </div>
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
      title: 'Bảng Kanban trực quan',
      description: 'Kéo thả công việc giữa 3 cột: Cần làm - Đang làm - Hoàn thành một cách dễ dàng',
      imagePlaceholder: 'Kanban Board View'
    },
    {
      icon: HiMoon,
      title: 'Giao diện Dark/Light',
      description: 'Chuyển đổi theme tối/sáng mượt mà, phù hợp mọi môi trường làm việc',
      imagePlaceholder: 'Dark vs Light Mode'
    },
    {
      icon: HiClipboardList,
      title: 'Quản lý công việc',
      description: 'Thêm, sửa, xóa task dễ dàng. Tìm kiếm nhanh và lọc theo trạng thái',
      imagePlaceholder: 'Task Management'
    },
    {
      icon: HiViewGrid,
      title: 'Chế độ xem linh hoạt',
      description: 'Chuyển đổi giữa chế độ xem danh sách và bảng Kanban theo nhu cầu',
      imagePlaceholder: 'List & Grid View'
    },
    {
      icon: HiDeviceMobile,
      title: 'Responsive hoàn hảo',
      description: 'Giao diện tự động điều chỉnh cho desktop, tablet và mobile',
      imagePlaceholder: 'Responsive Design'
    },
    {
      icon: HiRefresh,
      title: 'Đồng bộ tự động',
      description: 'Dữ liệu được lưu trữ và đồng bộ tức thì với cloud database',
      imagePlaceholder: 'Real-time Sync'
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
            Tính năng <span className="text-primary-600">Chính</span>
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-2xl mx-auto">
            Mọi thứ bạn cần để quản lý công việc hiệu quả
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Content */}
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-warm-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-warm-gray-600 dark:text-warm-gray-400">
                    {feature.description}
                  </p>
                </div>
                
                {/* Image Placeholder */}
                <div className="flex-1 lg:max-w-[280px]">
                  <div className="aspect-video bg-gradient-to-br from-warm-gray-100 to-warm-gray-200 dark:from-warm-gray-800 dark:to-warm-gray-700 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow">
                    <div className="text-center p-4">
                      <HiPhotograph className="w-12 h-12 mx-auto text-warm-gray-400 mb-2" />
                      <p className="text-xs text-warm-gray-500">{feature.imagePlaceholder}</p>
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
            Công nghệ <span className="text-primary-600">Sử dụng</span>
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-2xl mx-auto">
            Xây dựng với các công nghệ hiện đại và tốt nhất
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
      title: 'Quản lý công việc cá nhân',
      description: 'Theo dõi task cá nhân, deadline, và tiến độ công việc hàng ngày một cách hiệu quả',
      features: ['To-do lists', 'Deadline tracking', 'Progress monitoring'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: HiUserGroup,
      title: 'Dự án nhóm nhỏ',
      description: 'Phân chia công việc và theo dõi tiến độ team với bảng Kanban chung',
      features: ['Task assignment', 'Team collaboration', 'Real-time updates'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: HiCode,
      title: 'Portfolio & Học tập',
      description: 'Tham khảo source code để học React, Firebase và xây dựng dự án riêng',
      features: ['Open source', 'Clean code', 'Best practices'],
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
            Phù hợp với <span className="text-primary-600">Mọi nhu cầu</span>
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-2xl mx-auto">
            Từ cá nhân đến team, từ học tập đến thực tế
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

// ==================== FAQ SECTION ====================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Đây có phải là dự án thương mại?',
      answer: 'Không, đây là dự án portfolio/học tập, hoàn toàn miễn phí sử dụng. Bạn có thể dùng để học React, Firebase hoặc làm base cho dự án của riêng mình.'
    },
    {
      question: 'Làm sao để bắt đầu sử dụng?',
      answer: 'Chỉ cần click "Đăng ký", tạo tài khoản với email hoặc đăng nhập nhanh qua Google/GitHub. Sau đó bạn có thể bắt đầu tạo và quản lý tasks ngay lập tức.'
    },
    {
      question: 'Có hỗ trợ làm việc nhóm không?',
      answer: 'Hiện tại mỗi user có workspace riêng. Tính năng collaboration đang trong kế hoạch phát triển. Bạn có thể fork project và tự thêm tính năng này.'
    },
    {
      question: 'Dữ liệu có được bảo mật không?',
      answer: 'Có! Sử dụng Firebase Authentication và Firestore với security rules. Mỗi user chỉ có thể truy cập dữ liệu của riêng mình. Dữ liệu được mã hóa khi truyền tải.'
    },
    {
      question: 'Có thể sử dụng trên mobile không?',
      answer: 'Hoàn toàn có thể! Giao diện responsive hoạt động tốt trên mọi kích thước màn hình. Truy cập qua trình duyệt trên điện thoại hoặc tablet đều được.'
    },
    {
      question: 'Source code có công khai không?',
      answer: 'Có, project này là open source. Bạn có thể xem code, fork, và contribute trên GitHub. Link repository có ở footer trang web.'
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
            Giải đáp những thắc mắc phổ biến
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
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Trải nghiệm quản lý công việc với Kanban board hiện đại ngay bây giờ
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="px-8 py-4 rounded-2xl bg-white text-primary-600 font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
            >
              <span className="flex items-center gap-2">
                Đăng ký miễn phí
                <HiArrowRight />
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth?mode=login')}
              className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-white border-2 border-white/30 font-semibold text-lg hover:bg-white/20 transition-colors"
            >
              Đăng nhập
            </motion.button>
          </div>

          <p className="mt-6 text-white/70 text-sm">
            ⚡ Miễn phí • Không yêu cầu thanh toán • Portfolio project
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
              Ứng dụng quản lý công việc với React & Firebase. 
              Open source project cho mục đích học tập.
            </p>
            
            {/* Social/GitHub */}
            <div className="flex flex-col gap-3">
              <a 
                href="https://github.com/Hungdoan565/task-app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-warm-gray-400 hover:text-primary-400 transition-colors w-fit"
              >
                <SiGithub className="w-5 h-5" />
                <span className="font-medium">github.com/Hungdoan565/task-app</span>
              </a>
              <p className="text-warm-gray-500 text-sm">
                ⭐ Star project nếu thấy hữu ích!
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

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Tài nguyên</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://github.com/Hungdoan565/task-app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors flex items-center gap-1 text-sm"
                >
                  GitHub Repo <HiExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Hungdoan565/task-app/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors flex items-center gap-1 text-sm"
                >
                  Báo lỗi <HiExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Hungdoan565/task-app#readme" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors flex items-center gap-1 text-sm"
                >
                  Tài liệu <HiExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Hungdoan565/task-app/blob/main/LICENSE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors text-sm"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-warm-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-warm-gray-400 text-sm text-center md:text-left">
              © 2024 TaskApp Project • Built with ❤️ for learning • Open Source
            </p>
            <p className="text-warm-gray-500 text-sm text-center md:text-right">
              Developed by{' '}
              <a 
                href="https://github.com/Hungdoan565" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
              >
                Đoàn Vĩnh Hưng
              </a>
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

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>TaskApp - Ứng dụng quản lý công việc với Kanban Board</title>
        <meta name="description" content="Ứng dụng quản lý công việc với Kanban board, dark mode, và real-time sync. Xây dựng với React, Firebase và Tailwind CSS." />
        <meta name="keywords" content="task management, kanban board, react app, firebase, portfolio project" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-warm-gray-900">
        <Navbar navigate={navigate} />
        <HeroSection navigate={navigate} />
        <FeaturesSection />
        <TechStackSection />
        <UseCasesSection />
        <FAQSection />
        <FinalCTASection navigate={navigate} />
        <SimpleFooter />
        <BackToTop />
      </div>
    </>
  )
}