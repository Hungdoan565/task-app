import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  LayoutDashboard, Users, BarChart3, FileText, Settings,
  Search, Filter, Calendar, Tag, User, Plus, Timer,
  CheckCircle2, TrendingUp, ChevronLeft, ChevronRight,
  Clock, AlertCircle, Inbox, ChevronDown, MoreVertical,
  Bell, HelpCircle, LogOut, Loader2, Archive, X,
  AlertTriangle, Info, ArrowUp, ArrowDown, Activity,
  Target, Zap, Award, ChevronUp, Eye, Edit2, Trash2
} from 'lucide-react';

// Design tokens for consistency
const DESIGN_TOKENS = {
  radius: {
    xs: '4px',     // Small badges
    sm: '6px',     // Priority labels  
    md: '8px',     // Buttons, inputs, task items, sidebar items
    lg: '12px',    // Cards, modals
    xl: '16px',    // Large cards
    full: '9999px' // Circular elements
  },
  spacing: {
    xs: '4px',
    sm: '8px', 
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '48px'
  },
  iconSize: {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  }
};

const ProductionCommandCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTimeFilter, setActiveTimeFilter] = useState('today');
  const [hoveredTask, setHoveredTask] = useState(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [notificationCount] = useState(3);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setTasks([
        { id: 1, title: 'Implement user authentication system with OAuth2', status: 'completed', date: new Date(), priority: 'high', progress: 100 },
        { id: 2, title: 'Design dashboard mockups for mobile responsive layout', status: 'in-progress', date: new Date(Date.now() - 86400000), priority: 'medium', progress: 65 },
        { id: 3, title: 'Setup CI/CD pipeline with GitHub Actions', status: 'in-progress', date: new Date(Date.now() - 172800000), priority: 'high', progress: 40 },
        { id: 4, title: 'Write comprehensive API documentation', status: 'pending', date: new Date(Date.now() - 259200000), priority: 'low', progress: 0 },
        { id: 5, title: 'Review pull requests from team members', status: 'completed', date: new Date(), priority: 'medium', progress: 100 },
        { id: 6, title: 'Optimize database queries for better performance', status: 'in-progress', date: new Date(Date.now() - 86400000), priority: 'high', progress: 30 },
      ]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Enhanced task grouping
  const groupTasksByDate = (tasks) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      older: []
    };

    tasks.forEach(task => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      
      if (taskDate.getTime() === today.getTime()) {
        groups.today.push(task);
      } else if (taskDate.getTime() === yesterday.getTime()) {
        groups.yesterday.push(task);
      } else if (taskDate > weekAgo) {
        groups.thisWeek.push(task);
      } else {
        groups.older.push(task);
      }
    });

    return groups;
  };

  const groupedTasks = groupTasksByDate(tasks);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;

  const navigationItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
    { id: 'tasks', icon: FileText, label: 'Tasks', badge: totalTasks || null },
    { id: 'team', icon: Users, label: 'Team', badge: null },
    { id: 'reports', icon: BarChart3, label: 'Reports', badge: null },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null },
  ];

  const metrics = [
    {
      id: 'completed',
      title: 'Tasks Completed',
      value: completedTasks,
      total: totalTasks,
      change: '+12',
      changeLabel: 'vs last week',
      icon: CheckCircle2,
      color: 'emerald',
      trend: 'up'
    },
    {
      id: 'progress', 
      title: 'In Progress',
      value: inProgressTasks,
      total: totalTasks,
      change: '-3',
      changeLabel: 'vs last week',
      icon: Clock,
      color: 'amber',
      trend: 'down'
    },
    {
      id: 'velocity',
      title: 'Team Velocity',
      value: 87,
      total: 100,
      change: '+23',
      changeLabel: 'vs last sprint',
      icon: TrendingUp,
      color: 'violet',
      trend: 'up'
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

  const getPriorityConfig = (priority) => {
    switch(priority) {
      case 'high':
        return {
          color: 'red',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          icon: AlertTriangle,
          label: 'High'
        };
      case 'medium':
        return {
          color: 'amber',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
          icon: AlertCircle,
          label: 'Medium'
        };
      case 'low':
        return {
          color: 'blue',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
          icon: Info,
          label: 'Low'
        };
      default:
        return {
          color: 'gray',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200',
          icon: Info,
          label: 'None'
        };
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 animate-pulse" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />;
      default:
        return null;
    }
  };

  const handleCreateTask = async () => {
    setIsCreatingTask(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsCreatingTask(false);
    // Add task creation logic here
  };

  return (
    <div className="h-screen flex bg-gray-50/50 overflow-hidden">
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-violet-600 text-white px-4 py-2 rounded-lg z-50">
        Skip to main content
      </a>

      {/* Enhanced Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 72 : 280 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="bg-white border-r border-gray-200 flex flex-col relative shadow-sm"
        style={{ borderRadius: 0 }}
      >
        {/* Logo Section */}
        <div className="h-16 px-6 flex items-center border-b border-gray-200">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-200/50 cursor-pointer"
            style={{ borderRadius: DESIGN_TOKENS.radius.lg }}
            aria-label="TaskCommand Logo"
          >
            TC
          </motion.button>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                TaskCommand
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full px-3 py-2.5 mb-1.5 flex items-center gap-3 transition-all duration-200 relative
                ${activePage === item.id
                  ? 'bg-violet-50 text-violet-700 shadow-sm border border-violet-100 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
              style={{ borderRadius: DESIGN_TOKENS.radius.md }}
              aria-label={item.label}
              aria-current={activePage === item.id ? 'page' : undefined}
            >
              <item.icon 
                size={DESIGN_TOKENS.iconSize.md}
                className={activePage === item.id ? 'text-violet-600' : ''}
                aria-hidden="true"
              />
              {!sidebarCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1 text-left">
                    {item.label}
                  </span>
                  {item.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </>
              )}
            </motion.button>
          ))}
        </nav>

        {/* User Section */}
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 border-t border-gray-200"
            >
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#f9fafb' }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 flex items-center gap-3 transition-colors"
                style={{ borderRadius: DESIGN_TOKENS.radius.md }}
                aria-label="User menu"
                aria-expanded="false"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  JD
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-600">john@company.com</p>
                </div>
                <ChevronDown size={DESIGN_TOKENS.iconSize.sm} className="text-gray-400" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse Button */}
        <motion.button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 z-10"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center gap-4 shadow-sm">
          <div className="flex-1 max-w-xl relative">
            <Search 
              size={DESIGN_TOKENS.iconSize.sm}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, projects, or team members..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all placeholder-gray-500 text-sm"
              style={{ borderRadius: DESIGN_TOKENS.radius.md }}
              aria-label="Search"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 relative"
            style={{ borderRadius: DESIGN_TOKENS.radius.md }}
            aria-label={`Notifications (${notificationCount} unread)`}
          >
            <Bell size={DESIGN_TOKENS.iconSize.md} />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
            style={{ borderRadius: DESIGN_TOKENS.radius.md }}
            aria-label="Help"
          >
            <HelpCircle size={DESIGN_TOKENS.iconSize.md} />
          </motion.button>

          <motion.button
            onClick={handleCreateTask}
            disabled={isCreatingTask}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderRadius: DESIGN_TOKENS.radius.md }}
            aria-label="Create new task"
          >
            {isCreatingTask ? (
              <Loader2 size={DESIGN_TOKENS.iconSize.sm} className="animate-spin" />
            ) : (
              <Plus size={DESIGN_TOKENS.iconSize.sm} />
            )}
            New Task
          </motion.button>
        </header>

        {/* Main Content */}
        <main id="main-content" className="flex-1 overflow-y-auto p-6 lg:p-8 scroll-smooth">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full"
              >
                <div className="text-center">
                  <Loader2 size={32} className="animate-spin text-violet-600 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">Loading dashboard...</p>
                  <p className="text-sm text-gray-500 mt-1">Please wait while we fetch your data</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Page Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                  <p className="text-sm text-gray-600 mt-2">
                    Welcome back! Here's what's happening with your projects today.
                  </p>
                </div>

                {/* Metrics Cards with Proper Spacing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="bg-white p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      style={{ borderRadius: DESIGN_TOKENS.radius.lg }}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                            {metric.title}
                          </p>
                          <div className="flex items-baseline gap-3">
                            <motion.h2 
                              className="text-5xl font-bold text-gray-900 tabular-nums"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
                            >
                              {metric.value}
                            </motion.h2>
                            <div className="flex items-center gap-1">
                              {metric.trend === 'up' ? (
                                <ArrowUp size={14} className="text-emerald-600" />
                              ) : (
                                <ArrowDown size={14} className="text-red-600" />
                              )}
                              <span className={`text-sm font-semibold ${
                                metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                              }`}>
                                {metric.change}%
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{metric.changeLabel}</p>
                        </div>
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className={`p-3 rounded-full bg-${metric.color}-50 group-hover:bg-${metric.color}-100 transition-colors`}
                        >
                          <metric.icon size={DESIGN_TOKENS.iconSize.lg} className={`text-${metric.color}-600`} />
                        </motion.div>
                      </div>
                      
                      {/* Progress Bar with Label */}
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-gray-600 font-medium">Progress</span>
                          <span className="text-gray-700 font-semibold">
                            {metric.value}/{metric.total}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(metric.value / metric.total) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                            className={`h-full bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tasks Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white border border-gray-200 shadow-sm"
                  style={{ borderRadius: DESIGN_TOKENS.radius.lg }}
                >
                  {/* Tasks Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
                      <div className="flex items-center gap-2">
                        {/* Filter Buttons */}
                        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                          {['all', 'active', 'completed'].map((filter) => (
                            <motion.button
                              key={filter}
                              onClick={() => setActiveFilter(filter)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                                activeFilter === filter
                                  ? 'bg-white text-violet-700 shadow-sm'
                                  : 'text-gray-600 hover:text-gray-900'
                              }`}
                              style={{ borderRadius: DESIGN_TOKENS.radius.sm }}
                              aria-pressed={activeFilter === filter}
                            >
                              <Filter size={14} className="inline mr-1" />
                              {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </motion.button>
                          ))}
                        </div>

                        {/* Time Filter */}
                        <motion.button
                          onClick={() => setActiveTimeFilter(activeTimeFilter === 'today' ? 'week' : 'today')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                            activeTimeFilter === 'today'
                              ? 'bg-violet-50 text-violet-700 border border-violet-200'
                              : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                          }`}
                          style={{ borderRadius: DESIGN_TOKENS.radius.sm }}
                        >
                          <Calendar size={14} className="inline mr-1" />
                          {activeTimeFilter === 'today' ? 'Today' : 'This Week'}
                        </motion.button>

                        {/* View All Link */}
                        <motion.a
                          href="#"
                          whileHover={{ x: 2 }}
                          className="ml-2 text-sm font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1"
                        >
                          View All
                          <ChevronRight size={14} />
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div className="p-6">
                    {tasks.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <Inbox size={48} className="text-gray-300 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h4>
                        <p className="text-sm text-gray-600 mb-6">Create your first task to get started</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-violet-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                          style={{ borderRadius: DESIGN_TOKENS.radius.md }}
                        >
                          <Plus size={16} className="inline mr-1" />
                          Create Task
                        </motion.button>
                      </motion.div>
                    ) : (
                      <div className="space-y-8">
                        {Object.entries(groupedTasks).map(([group, groupTasks]) => (
                          groupTasks.length > 0 && (
                            <div key={group}>
                              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                {group === 'today' && (
                                  <>
                                    <Activity size={14} className="text-violet-500" />
                                    Today
                                  </>
                                )}
                                {group === 'yesterday' && 'Yesterday'}
                                {group === 'thisWeek' && 'This Week'}
                                {group === 'older' && 'Older'}
                                <span className="text-gray-400 font-normal">({groupTasks.length})</span>
                              </h3>
                              <div className="space-y-2">
                                {groupTasks.map((task, index) => {
                                  const priorityConfig = getPriorityConfig(task.priority);
                                  const isSelected = selectedTasks.has(task.id);
                                  const isHovered = hoveredTask === task.id;

                                  return (
                                    <motion.div
                                      key={task.id}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      onMouseEnter={() => setHoveredTask(task.id)}
                                      onMouseLeave={() => setHoveredTask(null)}
                                      className="group"
                                    >
                                      <motion.div
                                        whileHover={{ x: 4 }}
                                        className={`
                                          py-4 px-5 flex items-center gap-4 cursor-pointer transition-all duration-200 border relative
                                          ${isSelected
                                            ? 'bg-violet-50 border-violet-200 shadow-sm'
                                            : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-gray-200'
                                          }
                                        `}
                                        style={{ borderRadius: DESIGN_TOKENS.radius.md }}
                                      >
                                        {/* Custom Checkbox */}
                                        <label className="relative flex items-center cursor-pointer">
                                          <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={isSelected}
                                            onChange={() => toggleTask(task.id)}
                                            aria-label={`Mark "${task.title}" as ${isSelected ? 'incomplete' : 'complete'}`}
                                          />
                                          <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`
                                              w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                                              ${isSelected
                                                ? 'bg-violet-600 border-violet-600'
                                                : 'border-gray-300 hover:border-violet-400 bg-white'
                                              }
                                            `}
                                            style={{ borderRadius: DESIGN_TOKENS.radius.xs }}
                                          >
                                            <AnimatePresence>
                                              {isSelected && (
                                                <motion.svg
                                                  initial={{ scale: 0, rotate: -45 }}
                                                  animate={{ scale: 1, rotate: 0 }}
                                                  exit={{ scale: 0, rotate: 45 }}
                                                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                  className="w-3 h-3 text-white"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  stroke="currentColor"
                                                >
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </motion.svg>
                                              )}
                                            </AnimatePresence>
                                          </motion.div>
                                        </label>

                                        {/* Task Title */}
                                        <div className="flex-1 min-w-0">
                                          <p className={`font-medium truncate ${
                                            isSelected ? 'text-gray-500' : 'text-gray-900'
                                          }`}>
                                            {task.title}
                                          </p>
                                          {task.progress > 0 && task.progress < 100 && (
                                            <div className="mt-2 w-32">
                                              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                                <motion.div
                                                  initial={{ width: 0 }}
                                                  animate={{ width: `${task.progress}%` }}
                                                  className="h-full bg-violet-500"
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </div>

                                        {/* Priority Badge with Icon */}
                                        <div 
                                          className={`flex items-center gap-1.5 px-2.5 py-1 border ${priorityConfig.bgColor} ${priorityConfig.borderColor} ${priorityConfig.textColor}`}
                                          style={{ borderRadius: DESIGN_TOKENS.radius.sm }}
                                        >
                                          <priorityConfig.icon size={14} />
                                          <span className="text-xs font-semibold">{priorityConfig.label}</span>
                                        </div>

                                        {/* Status Icon */}
                                        {getStatusIcon(task.status)}

                                        {/* Actions Menu - Show on Hover */}
                                        <AnimatePresence>
                                          {isHovered && (
                                            <motion.div
                                              initial={{ opacity: 0, scale: 0.8 }}
                                              animate={{ opacity: 1, scale: 1 }}
                                              exit={{ opacity: 0, scale: 0.8 }}
                                              className="flex items-center gap-1"
                                            >
                                              <motion.button
                                                whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1.5 text-gray-400 hover:text-gray-600 transition-all duration-200 rounded"
                                                aria-label="View task details"
                                              >
                                                <Eye size={16} />
                                              </motion.button>
                                              <motion.button
                                                whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1.5 text-gray-400 hover:text-gray-600 transition-all duration-200 rounded"
                                                aria-label="Edit task"
                                              >
                                                <Edit2 size={16} />
                                              </motion.button>
                                              <motion.button
                                                whileHover={{ scale: 1.1, backgroundColor: '#fee2e2' }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1.5 text-gray-400 hover:text-red-600 transition-all duration-200 rounded"
                                                aria-label="Delete task"
                                              >
                                                <Trash2 size={16} />
                                              </motion.button>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </motion.div>
                                    </motion.div>
                                  );
                                })}
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

      {/* Keyboard Navigation Helper */}
      <style jsx>{`
        *:focus-visible {
          outline: 2px solid #8b5cf6;
          outline-offset: 2px;
          border-radius: ${DESIGN_TOKENS.radius.sm};
        }
        
        /* Custom scrollbar */
        main::-webkit-scrollbar {
          width: 8px;
        }
        
        main::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        
        main::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        
        main::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default ProductionCommandCenter;