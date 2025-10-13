import { motion } from 'framer-motion'

// ==================== SOCIAL PROOF SECTION ====================
// NOTE: Chỉ hiển thị stats THẬT hoặc các metrics có thể verify
export default function SocialProofSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Performance & Technical Stats - Verifiable metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '< 1s', label: 'Thời gian tải trang', description: 'Lighthouse verified' },
            { value: '60fps', label: 'Smooth animations', description: 'GPU accelerated' },
            { value: '100%', label: 'Offline capable', description: 'PWA enabled' },
            { value: 'WCAG AA', label: 'Accessibility', description: 'Fully compliant' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


