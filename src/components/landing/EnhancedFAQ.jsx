import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown, HiMail } from 'react-icons/hi'

export default function EnhancedFAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "TaskApp miễn phí không?",
      answer: "Có! TaskApp có gói Free hoàn toàn miễn phí cho teams lên đến 10 users với unlimited tasks và basic Kanban board. Không cần thẻ tín dụng để sign up."
    },
    {
      question: "Tôi có thể hủy subscription bất cứ lúc nào không?",
      answer: "Được! Bạn có thể hủy subscription bất cứ lúc nào. Không có contract dài hạn, không có phí hủy. Data của bạn sẽ được giữ trong 30 ngày sau khi hủy."
    },
    {
      question: "TaskApp có mobile app không?",
      answer: "Có! TaskApp có native mobile apps cho iOS và Android. Progressive Web App (PWA) cũng available cho tất cả platforms với offline support."
    },
    {
      question: "Data của tôi có an toàn không?",
      answer: "Absolutely! TaskApp sử dụng encryption end-to-end, backup tự động hàng ngày, và hosted trên AWS với 99.9% uptime SLA. SOC 2 Type II certified."
    },
    {
      question: "Có support tiếng Việt không?",
      answer: "Có! Interface support đầy đủ tiếng Việt và tiếng Anh. Support team có Vietnamese speakers, available 24/7 qua email, chat, và phone."
    },
    {
      question: "Tôi có thể migrate data từ tool khác không?",
      answer: "Có! TaskApp support import từ Trello, Asana, Jira, Monday.com, và nhiều tools khác. Migration team sẽ assist miễn phí cho Enterprise plans."
    },
    {
      question: "TaskApp có integrations với tools khác không?",
      answer: "Có! 50+ integrations available: Slack, GitHub, Google Calendar, Figma, Zoom, Salesforce, và nhiều hơn nữa. API documentation đầy đủ cho custom integrations."
    },
    {
      question: "Có trial period không?",
      answer: "Có! 14 ngày trial miễn phí cho tất cả paid plans. Không cần thẻ tín dụng. Full access tất cả features trong trial period."
    },
    {
      question: "Pricing có thay đổi không?",
      answer: "Nếu có thay đổi, existing customers sẽ được grandfathered vào giá cũ. Bạn sẽ được notify trước 30 ngày nếu có bất kỳ thay đổi nào."
    },
    {
      question: "Làm sao để upgrade/downgrade plan?",
      answer: "Rất đơn giản! Vào Settings > Billing và chọn plan mới. Changes có hiệu lực ngay lập tức. Prorated billing cho mid-cycle changes."
    },
    {
      question: "TaskApp có offline mode không?",
      answer: "Có! Desktop và mobile apps có offline mode. Changes sẽ sync tự động khi có internet. Lý tưởng cho remote work và travel."
    },
    {
      question: "Có training hoặc onboarding support không?",
      answer: "Có! Free webinars hàng tuần, documentation đầy đủ, video tutorials, và dedicated onboarding specialist cho Enterprise plans."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-32 px-4 sm:px-6 bg-white dark:bg-warm-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm mb-4">
            ❓ FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-warm-gray-900 dark:text-white mb-6">
            Câu hỏi thường gặp
          </h2>
          <p className="text-xl text-warm-gray-600 dark:text-warm-gray-400">
            Tất cả thông tin bạn cần biết về TaskApp
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              className="rounded-2xl bg-white dark:bg-warm-gray-800 border border-warm-gray-200/50 dark:border-warm-gray-700/50 shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-warm-gray-50 dark:hover:bg-warm-gray-700/50 transition-colors"
              >
                <span className="font-semibold text-lg text-warm-gray-900 dark:text-white pr-8">
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
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-warm-gray-600 dark:text-warm-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200/50 dark:border-primary-700/50"
        >
          <h3 className="text-2xl font-bold text-warm-gray-900 dark:text-white mb-4">
            Vẫn còn câu hỏi?
          </h3>
          <p className="text-warm-gray-600 dark:text-warm-gray-400 mb-6">
            Team support của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <motion.a
              href="mailto:support@taskapp.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            >
              <HiMail className="w-5 h-5" />
              Contact Support
            </motion.a>
            <a
              href="#"
              className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
            >
              Xem Documentation →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}