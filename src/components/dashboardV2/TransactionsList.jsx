import React from 'react'
import { Fuel, ArrowRightLeft, Utensils, ShoppingBag } from 'lucide-react'

const items = [
  { id: 1, icon: Fuel, title: 'Gas Station', time: '1 hour ago', amount: -10.0 },
  { id: 2, icon: ArrowRightLeft, title: 'Transfer to Lorem', time: '2 hours ago', amount: 150.0 },
  { id: 3, icon: Utensils, title: 'Food', time: '3 hours ago', amount: -8.0 },
  { id: 4, icon: ShoppingBag, title: 'Online Shopping', time: '4 hours ago', amount: -46.0 },
]

export default function TransactionsList() {
  return (
    <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">Giao dịch gần đây</h3>
        <button className="text-xs text-gray-500 hover:text-gray-700">Xem tất cả</button>
      </div>
      <ul className="divide-y divide-gray-100 dark:divide-warm-gray-700">
        {items.map((t) => (
          <li key={t.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-warm-gray-700 flex items-center justify-center">
                <t.icon className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-warm-gray-100">{t.title}</p>
                <p className="text-xs text-gray-500 dark:text-warm-gray-400">{t.time}</p>
              </div>
            </div>
            <div className={`text-sm font-semibold ${t.amount < 0 ? 'text-red-600' : 'text-gray-900 dark:text-warm-gray-100'}`}>
              {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(0)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
