import React from 'react'
import { motion } from 'framer-motion'
import { 
  HiOutlineViewBoards, HiUsers, HiOutlineCog, HiOutlineChartBar, HiCheck 
} from 'react-icons/hi'

export default function EnhancedFeatures() {
  const features = [
    {
      icon: HiOutlineViewBoards,
      title: 'Kanban Board Trực quan',
      description: 'Kéo thả tasks dễ dàng, custom workflow theo nhu cầu team. Xem ngay tiến độ dự án real-time.',
      items: ['Drag & Drop', 'Custom Columns', 'WIP Limits', 'Swimlanes'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: HiUsers,
      title: 'Real-time Collaboration',
      description: 'Comment, mention, share files ngay trong task. Nhận thông báo tức thì khi có cập nhật.',
      items: ['Live Comments', '@Mentions', 'File Sharing', 'Activity Feed'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: HiOutlineCog,
      title: 'Automation Workflow',
      description: 'Tiết kiệm 5 giờ/tuần với automation rules. Tự động assign, update status, send notifications.',
      items: ['Rule Builder', 'Triggers', 'Actions', 'Templates'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: HiOutlineChartBar,
      title: 'Analytics & Reports',
      description: 'Burndown charts, velocity tracking, team metrics. Export reports dạng PDF/Excel.',
      items: ['Dashboards', 'Custom Reports', 'Export Data', 'API Access'],
      gradient: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section id="features" className="py-32 px-4 sm:px-6 bg-white dark:bg-warm-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm mb-4"
          >
            ⚡ Tính năng nổi bật
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            Mọi thứ bạn cần để<br />quản lý công việc hiệu quả
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400 max-w-3xl mx-auto">
            Từ brainstorming đến delivery, TaskApp giúp team làm việc nhanh hơn và thông minh hơn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl bg-white dark:bg-warm-gray-800 border border-warm-gray-200/50 dark:border-warm-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-warm-gray-600 dark:text-warm-gray-400 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Feature List */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {feature.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <HiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-warm-gray-600 dark:text-warm-gray-400">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Demo Screenshot Placeholder */}
                  <div className={`mt-6 p-4 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-10 h-48 flex items-center justify-center relative overflow-hidden`}>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                    />
                    <span className="relative text-warm-gray-500 dark:text-warm-gray-400 text-sm font-medium">
                      📸 Screenshot Preview
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all"
          >
            Xem tất cả tính năng →
          </a>
        </motion.div>
      </div>
    </section>
  )
}