import { motion } from 'framer-motion'
import { HiSparkles, HiX } from 'react-icons/hi'
import { Check, ArrowRight } from 'lucide-react'

// ==================== COMPARISON SECTION ====================
// NOTE: Chỉ so sánh features CỤ THỂ và HONEST - tránh false advertising
export default function ComparisonSection() {
  const features = [
    // ✅ TaskApp-specific features (có thật)
    { name: 'React 19 + Vite 7 Stack', taskapp: true, notion: false, todoist: false, clickup: false },
    { name: 'Sub-second Initial Load', taskapp: true, notion: false, todoist: false, clickup: false },
    { name: 'Firebase Real-time Sync', taskapp: true, notion: false, todoist: false, clickup: false },
    { name: 'Open Source', taskapp: true, notion: false, todoist: false, clickup: false },
    { name: 'Offline-first PWA', taskapp: true, notion: false, todoist: true, clickup: false },
    { name: 'Free Tier Available', taskapp: true, notion: true, todoist: true, clickup: true },
  ]

  const CheckIcon = () => <Check className="text-green-600 mx-auto" size={20} />
  const XIcon = () => <HiX className="text-gray-400 mx-auto" size={20} />

  return (
    <section id="demo" className="py-32 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-center mb-6">
            Tại sao chọn <span className="text-primary-600">TaskApp</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            So sánh trực tiếp với các công cụ hàng đầu
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <motion.table 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left pb-4 px-4 text-gray-900 dark:text-white font-semibold">Feature</th>
                <th className="text-center pb-4 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                      <HiSparkles className="text-white" size={20} />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">TaskApp</span>
                  </div>
                </th>
                <th className="text-center pb-4 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-bold">N</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Notion</span>
                  </div>
                </th>
                <th className="text-center pb-4 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-bold">T</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Todoist</span>
                  </div>
                </th>
                <th className="text-center pb-4 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-bold">C</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">ClickUp</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <motion.tr 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    {feature.name}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {feature.taskapp ? <CheckIcon /> : <XIcon />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {feature.notion ? <CheckIcon /> : <XIcon />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {feature.todoist ? <CheckIcon /> : <XIcon />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {feature.clickup ? <CheckIcon /> : <XIcon />}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* CTA after comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => window.location.href = '/auth'}
            className="px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
            aria-label="Trải nghiệm TaskApp ngay bây giờ"
          >
            Trải nghiệm ngay
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}


