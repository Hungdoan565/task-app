import React from 'react'
import DonutProgress from './DonutProgress'

export default function DataInfo() {
  return (
    <div className="rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">Thông tin dữ liệu</h3>
        <span className="text-xs text-gray-500">7 ngày gần đây</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left: numbers */}
        <div className="space-y-3">
          <div className="rounded-lg border border-gray-100 dark:border-warm-gray-700 p-3">
            <p className="text-xs text-gray-500">Thu nhập</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-warm-gray-100">$280.00</p>
          </div>
          <div className="rounded-lg border border-gray-100 dark:border-warm-gray-700 p-3">
            <p className="text-xs text-gray-500">Chi ra</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-warm-gray-100">$60.00</p>
          </div>
        </div>
        {/* Right: donut */}
        <div className="flex items-center justify-center">
          <div className="text-center">
            <DonutProgress value={70} />
            <p className="mt-2 text-xs text-gray-500">Hiệu suất</p>
          </div>
        </div>
      </div>
    </div>
  )
}
