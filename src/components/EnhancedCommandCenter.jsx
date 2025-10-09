import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, BarChart3, FileText, Settings,
  Search, Filter, Calendar, Tag, User, Plus, Timer,
  CheckCircle2, TrendingUp, ChevronLeft, ChevronRight,
  Clock, AlertCircle, Inbox, ChevronDown, MoreVertical,
  Bell, HelpCircle, LogOut, Loader2, Archive
} from 'lucide-react';

const EnhancedCommandCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState(new Set());

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { id: 1, title: 'Implement user authentication', status: 'completed', date: new Date(), priority: 'high' },
        { id: 2, title: 'Design dashboard mockups', status: 'in-progress', date: new Date(Date.now() - 86400000), priority: 'medium' },
        { id: 3, title: 'Setup CI/CD pipeline', status: 'in-progress', date: new Date(Date.now() - 172800000), priority: 'high' },
        { id: 4, title: 'Write API documentation', status: 'pending', date: new Date(Date.now() - 259200000), priority: 'low' },
        { id: 5, title: 'Review pull requests', status: 'completed', date: new Date(), priority: 'medium' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Group tasks by date
  const groupTasksByDate = (tasks) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      older: []
    };

    tasks.forEach(task => {
      const taskDate = new Date(task.date);
      if (taskDate.toDateString() === today.toDateString()) {
        groups.today.push(task);
      } else if (taskDate.toDateString() === yesterday.toDateString()) {
        groups.yesterday.push(task);
      } else if (taskDate > new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)) {
        groups.thisWeek.push(task);
      } else {
        groups.older.push(task);
      }
    });

    return groups;
  };

  const groupedTasks = groupTasksByDate(tasks);

  const navigationItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
    { id: 'tasks', icon: FileText, label: 'Tasks', badge: tasks.length },
    { id: 'team', icon: Users, label: 'Team', badge: null },
    { id: 'reports', icon: BarChart3, label: 'Reports', badge: null },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null },
  ];

  const metrics = [
    { 
      title: 'Tasks Completed', 
      value: 28, 
      change: '+12%',
      icon: CheckCircle2, 
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      changeColor: 'text-emerald-600'
    },
    { 
      title: 'In Progress', 
      value: 12, 
      change: '-3%',
      icon: Timer, 
      color: 'amber',
      bgColor: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      changeColor: 'text-red-600'
    },
    { 
      title: 'Team Velocity', 
      value: 87, 
      change: '+23%',
      icon: TrendingUp, 
      color: 'violet',
      bgColor: 'bg-violet-50',
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-600',
      changeColor: 'text-emerald-600'
    },
  ];

  const toggleTask = (taskId) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-amber-500" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default: return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50/50">
      {/* Enhanced Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 72 : 280 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="bg-white border-r border-gray-200 flex flex-col relative shadow-sm"
      >
        {/* Logo Section */}
        <div className="h-16 px-6 flex items-center border-b border-gray-200">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-violet-200/50 cursor-pointer"
          >
            TC
          </motion.div>
          {!sidebarCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-3 text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              TaskCommand
            </motion.span>
          )}
        </div>

        {/* Navigation with Active States */}
        <nav className="flex-1 py-4 px-3">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full px-3 py-2.5 mb-1 flex items-center gap-3 rounded-lg transition-all duration-200
                ${activePage === item.id 
                  ? 'bg-violet-50 text-violet-700 shadow-sm border border-violet-100' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon className={`w-5 h-5 ${activePage === item.id ? 'text-violet-600' : ''}`} />
              {!sidebarCollapsed && (
                <>
                  <span className={`text-sm font-medium flex-1 text-left ${activePage === item.id ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </motion.button>
          ))}
        </nav>

        {/* User Section */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john@company.com</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>
        )}

        {/* Collapse Button */}
        <motion.button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </motion.button>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center gap-4 shadow-sm">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, projects, or team members..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-400"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow font-medium"
          >
            <Plus className="w-4 h-4" />
            New Task
          </motion.button>
        </header>

        {/* Dashboard Content with Loading States */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-white">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full"
              >
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-violet-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Loading dashboard...</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Page Title */}
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                  <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your projects.</p>
                </div>

                {/* Enhanced Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            {metric.title}
                          </p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-4xl font-bold text-gray-900 tabular-nums">
                              {metric.value}
                            </p>
                            <span className={`text-sm font-medium ${metric.changeColor}`}>
                              {metric.change}
                            </span>
                          </div>
                        </div>
                        <motion.div 
                          whileHover={{ rotate: 5 }}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.iconBg} group-hover:scale-110 transition-transform`}
                        >
                          <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                        </motion.div>
                      </div>
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Task List with States */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Filter className="w-4 h-4 inline mr-1" />
                          Filter
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Today
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {tasks.length === 0 ? (
                      // Empty State
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h4>
                        <p className="text-sm text-gray-500 mb-6">Create your first task to get started</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-violet-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow"
                        >
                          <Plus className="w-4 h-4 inline mr-1" />
                          Create Task
                        </motion.button>
                      </motion.div>
                    ) : (
                      // Grouped Tasks
                      <div className="space-y-6">
                        {Object.entries(groupedTasks).map(([group, groupTasks]) => (
                          groupTasks.length > 0 && (
                            <div key={group}>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                {group === 'today' && 'Today'}
                                {group === 'yesterday' && 'Yesterday'}
                                {group === 'thisWeek' && 'This Week'}
                                {group === 'older' && 'Older'}
                              </h4>
                              <div className="space-y-2">
                                {groupTasks.map((task, index) => (
                                  <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ x: 4, backgroundColor: '#f9fafb' }}
                                    onClick={() => toggleTask(task.id)}
                                    className={`
                                      p-4 rounded-lg flex items-center gap-4 cursor-pointer transition-all duration-200 border
                                      ${selectedTasks.has(task.id) 
                                        ? 'bg-violet-50 border-violet-200' 
                                        : 'bg-white hover:bg-gray-50 border-gray-100'
                                      }
                                    `}
                                  >
                                    <motion.button
                                      whileHover={{ scale: 1.2 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleTask(task.id);
                                      }}
                                      className={`
                                        w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                                        ${selectedTasks.has(task.id)
                                          ? 'bg-violet-600 border-violet-600'
                                          : 'border-gray-300 hover:border-violet-400'
                                        }
                                      `}
                                    >
                                      {selectedTasks.has(task.id) && (
                                        <motion.svg
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          className="w-3 h-3 text-white"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                      )}
                                    </motion.button>
                                    
                                    <div className="flex-1">
                                      <p className={`font-medium ${selectedTasks.has(task.id) ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                        {task.title}
                                      </p>
                                    </div>

                                    <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getPriorityColor(task.priority)}`}>
                                      {task.priority}
                                    </span>

                                    {getStatusIcon(task.status)}

                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                    >
                                      <MoreVertical className="w-4 h-4" />
                                    </motion.button>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default EnhancedCommandCenter;