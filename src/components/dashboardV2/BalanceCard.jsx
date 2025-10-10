import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRightLeft, Wallet, CreditCard, Banknote } from 'lucide-react'

export default function BalanceCard() {
  return (
    <motion.div
      className="rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white p-4 shadow-md hover:shadow-lg dv2-card-hover"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm/5 opacity-90">Số dư</p>
            <p className="text-2xl font-bold">$1,500</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-90">xxxx 2325</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button className="flex items-center justify-center gap-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/15 py-2 transition-colors">
          <ArrowRightLeft className="w-4 h-4" /> Chuyển
        </button>
        <button className="flex items-center justify-center gap-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/15 py-2 transition-colors">
          <CreditCard className="w-4 h-4" /> Rút tiền
        </button>
        <button className="flex items-center justify-center gap-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/15 py-2 transition-colors">
          <Banknote className="w-4 h-4" /> Nạp tiền
        </button>
      </div>
    </motion.div>
  )
}
