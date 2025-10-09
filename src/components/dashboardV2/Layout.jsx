import React from 'react'
import Sidebar from '@/components/dashboardV2/Sidebar'
import TopBar from '@/components/dashboardV2/TopBar'

export default function DashboardV2Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-warm-gray-950 p-3 sm:p-4">
      <div className="grid grid-cols-12 gap-3 sm:gap-4">
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <TopBar />
          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
