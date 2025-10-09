import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, BarChart3, FileText, Settings,
  Search, Filter, Calendar, Tag, User, Plus, Timer,
  CheckCircle2, TrendingUp, ChevronLeft, ChevronRight
} from 'lucide-react';

const SimpleCommandCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 72 : 280 }}
        className="bg-white border-r border-gray-200 flex flex-col"
      >
        {/* Logo */}
        <div className="h-16 px-6 flex items-center border-b border-gray-200">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
            TC
          </div>
          {!sidebarCollapsed && (
            <span className="ml-3 text-lg font-semibold">TaskCommand</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {[
            { icon: LayoutDashboard, label: 'Dashboard' },
            { icon: FileText, label: 'Tasks' },
            { icon: Users, label: 'Team' },
            { icon: BarChart3, label: 'Reports' },
          ].map((item, index) => (
            <button
              key={index}
              className="w-full px-6 py-3 flex items-center gap-3 hover:bg-gray-50"
            >
              <item.icon className="w-5 h-5" />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Metric Cards */}
            {[
              { title: 'Tasks Completed', value: 28, icon: CheckCircle2, color: 'green' },
              { title: 'In Progress', value: 12, icon: Timer, color: 'orange' },
              { title: 'Team Velocity', value: 87, icon: TrendingUp, color: 'purple' },
            ].map((metric, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">
                      {metric.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${metric.color}-100`}>
                    <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Task List */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6">Recent Tasks</h3>
            <div className="space-y-3">
              {[
                'Implement user authentication',
                'Design dashboard mockups',
                'Setup CI/CD pipeline',
                'Write API documentation',
              ].map((task, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-gray-400" />
                  <span className="flex-1">{task}</span>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCommandCenter;