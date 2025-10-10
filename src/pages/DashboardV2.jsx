import React, { useMemo, useState } from 'react'
import Layout from '@/components/dashboardV2/Layout'
import BalanceCard from '@/components/dashboardV2/BalanceCard'
import StatsCard from '@/components/dashboardV2/StatsCard'
import AreaChart from '@/components/dashboardV2/AreaChart'
import BarChartMini from '@/components/dashboardV2/BarChartMini'
import TransactionsList from '@/components/dashboardV2/TransactionsList'
import DataInfo from '@/components/dashboardV2/DataInfo'
import { DollarSign, Users, ShoppingCart } from 'lucide-react'

export default function DashboardV2() {
  const allSpendValues = [120, 260, 210, 320, 290, 360, 240, 310, 180, 240, 200, 260]
  const allMonthLabels = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12']

  const [range, setRange] = useState(12) // months

  const { spendValues, monthLabels } = useMemo(() => {
    const start = Math.max(0, allSpendValues.length - range)
    return {
      spendValues: allSpendValues.slice(start),
      monthLabels: allMonthLabels.slice(start),
    }
  }, [range])

  const barAllLabels = allMonthLabels
  const barAllSeries = [
    { name: 'A', color: '#16a34a', data: [12, 18, 10, 22, 16, 20, 18, 23, 11, 17, 14, 19] },
    { name: 'B', color: '#60a5fa', data: [10, 14, 12, 14, 10, 12, 9, 13, 8, 11, 9, 12] },
    { name: 'C', color: '#f59e0b', data: [8, 9, 7, 12, 8, 10, 6, 8, 7, 9, 7, 8] },
  ]

  const { barLabels, barSeries } = useMemo(() => {
    const start = Math.max(0, barAllLabels.length - Math.min(range, 6)) // bar hiển thị tối đa 6 mốc để gọn
    return {
      barLabels: barAllLabels.slice(start),
      barSeries: barAllSeries.map(s => ({ ...s, data: s.data.slice(start) })),
    }
  }, [range])

  return (
    <Layout>
      <div className="grid grid-cols-12 gap-4 md:gap-5 xl:gap-6">
            {/* Balance + quick actions */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <BalanceCard />
            </div>

            {/* Quick stats */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <StatsCard title="Khách hàng" value="20,032" subtitle="+2% tăng trưởng" icon={Users} color="#16a34a" />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <StatsCard title="Đơn hàng" value="350" subtitle="+5 hôm nay" icon={ShoppingCart} color="#60a5fa" />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <StatsCard title="Doanh thu" value="$3,540" subtitle="Tháng này" icon={DollarSign} color="#f59e0b" />
            </div>

            {/* Spendings area chart */}
            <div className="col-span-12 lg:col-span-7 rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">Chi tiêu</h3>
                  <p className="text-xs text-gray-500">$1,500 • {range === 12 ? '12 tháng' : `${range} tháng`}</p>
                </div>
                <div className="flex gap-1 bg-gray-100 dark:bg-warm-gray-800 rounded p-0.5">
                  {[6, 12].map(r => (
                    <button
                      key={r}
                      onClick={() => setRange(r)}
                      className={`px-2 py-1 text-xs rounded ${range === r ? 'bg-white dark:bg-warm-gray-700 shadow-sm' : 'text-gray-600 dark:text-warm-gray-300'}`}
                    >
                      {r}T
                    </button>
                  ))}
                </div>
              </div>
              <AreaChart values={spendValues} labels={monthLabels} color="#16a34a" />
            </div>

            {/* Graph bar chart */}
            <div className="col-span-12 lg:col-span-5 rounded-xl bg-white dark:bg-warm-gray-800 border border-gray-100 dark:border-warm-gray-700 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-warm-gray-100">Biểu đồ</h3>
                <span className="text-xs text-gray-500">6 tháng gần đây</span>
              </div>
              <BarChartMini series={barSeries} labels={barLabels} />
            </div>

            {/* Last transactions */}
            <div className="col-span-12 lg:col-span-7">
              <TransactionsList />
            </div>

            {/* Data info + performance */}
            <div className="col-span-12 lg:col-span-5">
              <DataInfo />
            </div>
      </div>
    </Layout>
  )
}
