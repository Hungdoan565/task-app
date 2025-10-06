import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function TestLandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Simple Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <span className="text-white font-bold text-xl">TaskApp</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/auth')}
                className="px-4 py-2 text-white/80 hover:text-white transition-colors"
              >
                Đăng Nhập
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="px-6 py-2 rounded-lg bg-white text-purple-900 font-semibold hover:bg-white/90 transition-colors"
              >
                Dùng Thử
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Simple Hero */}
      <main className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Quản Lý Công Việc{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Thông Minh
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              TaskApp giúp đội nhóm làm việc hiệu quả hơn với Kanban board, automation, và real-time collaboration
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/auth')}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg"
              >
                Bắt Đầu Miễn Phí
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Xem Demo
              </motion.button>
            </div>

            {/* Simple Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { number: '10,000+', label: 'Đội Nhóm' },
                { number: '1M+', label: 'Tasks' },
                { number: '99.9%', label: 'Uptime' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-white/10 backdrop-blur-md"
                >
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Simple Features */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Tính Năng Nổi Bật
            </h2>
            <p className="text-xl text-white/70">
              Mọi thứ bạn cần để quản lý công việc hiệu quả
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Kanban Board', desc: 'Kéo thả tasks dễ dàng' },
              { title: 'Collaboration', desc: 'Làm việc nhóm real-time' },
              { title: 'Automation', desc: 'Tự động hóa workflow' },
              { title: 'Analytics', desc: 'Báo cáo và thống kê' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="p-6 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 mb-4"></div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-10 px-4 sm:px-6 border-t border-white/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <span className="text-white font-bold text-xl">TaskApp</span>
          </div>
          <p className="text-white/60 mb-6">
            Quản lý công việc thông minh cho đội nhóm hiện đại
          </p>
          <div className="flex justify-center gap-6 text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}