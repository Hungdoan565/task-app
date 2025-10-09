import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, LayoutGroup } from 'framer-motion';
import { 
  LayoutDashboard, Users, BarChart3, FileText, Settings,
  Search, Filter, Calendar, Plus, Timer, Menu, X,
  CheckCircle2, TrendingUp, ChevronLeft, ChevronRight,
  Clock, AlertCircle, Inbox, ChevronDown, MoreVertical,
  Bell, HelpCircle, LogOut, Loader2, Archive,
  AlertTriangle, Info, ArrowUp, ArrowDown, Activity,
  Target, Zap, Award, ChevronUp, Eye, Edit2, Trash2,
  RefreshCw, Download, Upload, Share2, Copy, ExternalLink,
  Star, Bookmark, Hash, AtSign, Paperclip, Send,
  Sparkles, Trophy, Flame, Rocket, Heart, ThumbsUp,
  BarChart2, PieChart, TrendingDown, DollarSign,
  Briefcase, Home, Mail, Phone, MapPin, Globe,
  Wifi, WifiOff, Battery, BatteryLow, Signal, SignalLow
} from 'lucide-react';
import { ULTIMATE_DESIGN, components, utils } from '../lib/ultimateDesignSystem';
import confetti from 'canvas-confetti';

// Reusable Components Library
const Button = ({ variant = 'primary', size = 'md', loading = false, disabled = false, children, onClick, ...props }) => {
  const styles = {
    ...components.button.base,
    ...components.button.sizes[size],
    ...components.button.variants[variant],
  };
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      style={styles}
      {...props}
    >
      {loading && <Loader2 className="animate-spin mr-2" size={16} />}
      {children}
    </motion.button>
  );
};

const Badge = ({ variant = 'neutral', size = 'sm', icon: Icon, children }) => {
  const styles = {
    ...components.badge.base,
    ...components.badge.sizes[size],
    ...components.badge.variants[variant],
  };
  
  return (
    <span className="inline-flex items-center" style={styles}>
      {Icon && <Icon size={12} className="mr-1" />}
      {children}
    </span>
  );
};

const Input = ({ variant = 'outline', icon: Icon, error, ...props }) => {
  const styles = {
    ...components.input.base,
    ...components.input.variants[variant],
  };
  
  return (
    <div className="relative">
      {Icon && (
        <Icon 
          size={ULTIMATE_DESIGN.iconSize.md} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      )}
      <input
        className={`w-full ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500' : ''}`}
        style={styles}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

const Checkbox = ({ label, checked, onChange, disabled, ...props }) => {
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) onChange(!checked);
    }
  };
  
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-checked={checked}
        {...props}
      />
      <motion.div
        role="checkbox"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        whileHover={!disabled ? components.checkbox.states.hover : {}}
        whileTap={!disabled ? { scale: 0.9 } : {}}
        className={`flex items-center justify-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        style={{
          ...components.checkbox.base,
          ...(checked ? components.checkbox.states.checked : {}),
          ...(disabled ? components.checkbox.states.disabled : {}),
        }}
      >
        <AnimatePresence>
          {checked && (
            <motion.svg
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-3 h-3 text-white pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
      {label && (
        <span className={`ml-2 text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          {label}
        </span>
      )}
    </label>
  );
};

const SkeletonLoader = ({ width = '100%', height = '20px', className = '' }) => (
  <div 
    className={`animate-pulse ${className}`}
    style={{
      ...components.skeleton.base,
      width,
      height,
    }}
  />
);

const Sparkline = ({ data, color = 'primary', height = 40 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  const latest = data[data.length - 1];
  
  return (
    <svg width="100%" height={height} className="overflow-visible">
      <title>{`Latest: ${latest}`}</title>
      <polyline
        fill="none"
        stroke={ULTIMATE_DESIGN.colors[color][500]}
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        fill={`url(#gradient-${color})`}
        fillOpacity="0.1"
        stroke="none"
        points={`0,${height} ${points} 100,${height}`}
      />
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ULTIMATE_DESIGN.colors[color][500]} stopOpacity="0.3" />
          <stop offset="100%" stopColor={ULTIMATE_DESIGN.colors[color][500]} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const EmptyState = ({ icon: Icon = Inbox, title, description, action }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-12 px-4 text-center"
  >
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Icon size={32} className="text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-6 max-w-sm">{description}</p>
    {action && (
      <Button onClick={action.onClick}>
        {action.icon && <action.icon size={16} className="mr-2" />}
        {action.label}
      </Button>
    )}
  </motion.div>
);

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const errorHandler = () => setHasError(true);
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);
  
  if (hasError) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Something went wrong"
        description="An error occurred while loading this page. Please try refreshing."
        action={{
          label: 'Refresh Page',
          icon: RefreshCw,
          onClick: () => window.location.reload()
        }}
      />
    );
  }
  
  return children;
};

// Main Component
const UltimateCommandCenter = () => {
  // State Management
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTimeFilter, setActiveTimeFilter] = useState('week');
  const [hoveredTask, setHoveredTask] = useState(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [notificationCount] = useState(5);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Refs
  const searchInputRef = useRef(null);
  const mainContentRef = useRef(null);
  
  // Debounced search
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };
  
  const debouncedSearch = useCallback(
    debounce((query) => {
      console.log('Searching for:', query);
      // API call here
    }, 500),
    []
  );
  
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);
  
  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Data fetching with retry logic
  const fetchData = async (retry = 0) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.9 && retry < 3) {
            reject(new Error('Network error'));
          } else {
            resolve();
          }
        }, 1000);
      });
      
      const mockTasks = [
        { 
          id: 1, 
          title: 'Implement user authentication system with OAuth2 and JWT tokens', 
          status: 'completed', 
          date: new Date(), 
          priority: 'high', 
          progress: 100,
          assignee: 'John Doe',
          tags: ['backend', 'security'],
          estimate: '8h',
          timeSpent: '7.5h'
        },
        { 
          id: 2, 
          title: 'Design dashboard mockups for mobile responsive layout with dark mode support', 
          status: 'in-progress', 
          date: new Date(Date.now() - 86400000), 
          priority: 'medium', 
          progress: 65,
          assignee: 'Jane Smith',
          tags: ['design', 'ui/ux'],
          estimate: '12h',
          timeSpent: '8h'
        },
        { 
          id: 3, 
          title: 'Setup CI/CD pipeline with GitHub Actions and automated testing', 
          status: 'in-progress', 
          date: new Date(Date.now() - 172800000), 
          priority: 'high', 
          progress: 40,
          assignee: 'Mike Johnson',
          tags: ['devops', 'automation'],
          estimate: '16h',
          timeSpent: '6h'
        },
        { 
          id: 4, 
          title: 'Write comprehensive API documentation with Swagger/OpenAPI specs', 
          status: 'pending', 
          date: new Date(Date.now() - 259200000), 
          priority: 'low', 
          progress: 0,
          assignee: 'Sarah Williams',
          tags: ['documentation'],
          estimate: '6h',
          timeSpent: '0h'
        },
        { 
          id: 5, 
          title: 'Review pull requests from team members and provide feedback', 
          status: 'completed', 
          date: new Date(), 
          priority: 'medium', 
          progress: 100,
          assignee: 'Tom Brown',
          tags: ['review', 'team'],
          estimate: '4h',
          timeSpent: '4h'
        },
        { 
          id: 6, 
          title: 'Optimize database queries for better performance and caching', 
          status: 'in-progress', 
          date: new Date(Date.now() - 86400000), 
          priority: 'high', 
          progress: 30,
          assignee: 'Alice Davis',
          tags: ['backend', 'performance'],
          estimate: '10h',
          timeSpent: '3h'
        },
      ];
      
      setTasks(mockTasks);
      setIsLoading(false);
      setRetryCount(0);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      
      if (retry < 3) {
        setRetryCount(retry + 1);
        setTimeout(() => fetchData(retry + 1), 2000);
      }
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  // Task grouping
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
  
  // Filtered tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply status filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'active') {
        filtered = filtered.filter(task => task.status === 'in-progress' || task.status === 'pending');
      } else if (activeFilter === 'completed') {
        filtered = filtered.filter(task => task.status === 'completed');
      }
    }
    
    // Apply time filter
    if (activeTimeFilter === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filtered = filtered.filter(task => {
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
      });
    }
    
    return filtered;
  }, [tasks, searchQuery, activeFilter, activeTimeFilter]);
  
  const groupedTasks = groupTasksByDate(filteredTasks);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  
  // Sparkline data (mock)
  const sparklineData = {
    completed: [12, 15, 18, 14, 20, 25, 28],
    inProgress: [8, 10, 9, 11, 12, 10, 12],
    velocity: [65, 70, 75, 72, 80, 85, 87]
  };
  
// Navigation items
  const myTasksCount = tasks.filter(t => t.status !== 'completed').length;
  const navigationItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
    { id: 'my-tasks', icon: CheckCircle2, label: 'My Tasks', badge: myTasksCount || null },
    { id: 'projects', icon: Briefcase, label: 'Projects', badge: null },
    { id: 'team', icon: Users, label: 'Team', badge: null },
    { id: 'calendar', icon: Calendar, label: 'Calendar', badge: null },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null },
  ];
  
  // Metrics configuration
  const metrics = [
    {
      id: 'completed',
      title: 'Tasks Completed',
      value: completedTasks,
      total: totalTasks,
      percentage: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      change: 12,
      changeLabel: 'vs last week',
      icon: CheckCircle2,
      color: 'success',
      trend: 'up',
      sparkline: sparklineData.completed,
      description: 'Successfully completed tasks'
    },
    {
      id: 'progress',
      title: 'In Progress',
      value: inProgressTasks,
      total: totalTasks,
      percentage: totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0,
      change: -3,
      changeLabel: 'vs last week',
      icon: Clock,
      color: 'info',
      trend: 'down',
      sparkline: sparklineData.inProgress,
      description: 'Currently active tasks'
    },
    {
      id: 'velocity',
      title: 'Team Velocity',
      value: 87,
      total: 100,
      percentage: 87,
      change: 23,
      changeLabel: 'vs last sprint',
      icon: TrendingUp,
      color: 'primary',
      trend: 'up',
      sparkline: sparklineData.velocity,
      description: 'Sprint completion rate'
    },
  ];
  
  // Task actions
  const toggleTask = (taskId) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };
  
  const completeTask = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status: 'completed', progress: 100 } : task
    ));
    
    // Celebration animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  
  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };
  
  const handleCreateTask = async () => {
    setIsCreatingTask(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsCreatingTask(false);
    // Add task creation logic
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Cmd/Ctrl + N for new task
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        handleCreateTask();
      }
      // Escape to close mobile menu
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Priority configuration
  const getPriorityConfig = (priority) => {
    const configs = {
      high: {
        color: 'error',
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
        icon: AlertTriangle,
        label: 'High'
      },
      medium: {
        color: 'warning',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-200',
        icon: AlertCircle,
        label: 'Medium'
      },
      low: {
        color: 'info',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200',
        icon: Info,
        label: 'Low'
      }
    };
    return configs[priority] || configs.low;
  };
  
  // Status icon helper
  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 animate-pulse" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />;
      default:
        return null;
    }
  };
  
  return (
    <ErrorBoundary>
      <div className="h-screen flex bg-gray-50 overflow-hidden relative">
        {/* Skip to content */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50"
          style={utils.focusVisible}
        >
          Skip to main content
        </a>
        
        {/* Offline indicator */}
        <AnimatePresence>
          {!isOnline && (
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className="absolute top-0 left-0 right-0 bg-yellow-500 text-white px-4 py-2 text-center z-50"
            >
              <WifiOff size={16} className="inline mr-2" />
              You're offline. Some features may be limited.
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>
        
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ 
            width: sidebarCollapsed ? 64 : 240
          }}
          className={`
            bg-white border-r border-gray-200 flex flex-col shadow-sm z-50 transform transition-transform duration-200 ease-in-out
            ${mobileMenuOpen ? 'fixed inset-y-0 left-0 w-[240px] translate-x-0' : 'hidden -translate-x-full lg:translate-x-0 lg:flex lg:relative'}
          `}
          style={{ minWidth: sidebarCollapsed ? 64 : 240 }}
        >
          {/* Logo */}
          <div className="h-16 px-4 lg:px-6 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-200/50"
                style={{ borderRadius: ULTIMATE_DESIGN.radius.lg }}
                aria-label="TaskCommand Logo"
              >
                TC
              </motion.button>
              {!sidebarCollapsed && (
                <span className="text-base font-semibold text-gray-900">TaskCommand</span>
              )}
            </div>
            {/* Collapse on desktop */}
            <motion.button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden lg:inline-flex w-8 h-8 items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </motion.button>
            {/* Mobile close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 overflow-y-auto" role="navigation">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                title={sidebarCollapsed ? item.label : undefined}
className={`
                  relative w-full px-3 py-2.5 mb-1.5 flex items-center gap-2 transition-all duration-200 text-left
                  border-l-4 ${activePage === item.id
                    ? 'bg-violet-50 text-violet-700 border-violet-600 font-semibold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-transparent'
                  }
                `}
                style={{ borderRadius: ULTIMATE_DESIGN.radius.md }}
                aria-label={item.label}
                aria-current={activePage === item.id ? 'page' : undefined}
              >
                <span className="relative inline-flex">
                  <item.icon
                    size={20}
                    className={activePage === item.id ? 'text-violet-600' : ''}
                  />
                  {item.id === 'my-tasks' && item.badge && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold rounded-full bg-red-500 text-white">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </span>
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-medium flex-1"
                      >
                        {item.label}
                      </motion.span>
                    </>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </nav>
          
          {/* User section (sticky bottom) */}
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-4 border-t border-gray-200 mt-auto"
              >
<div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="User menu"
                    aria-expanded={showUserMenu}
                    title="Profile & Settings"
                  >
                    <div className="relative w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      JD
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
                      <p className="text-xs text-gray-600 truncate">john@example.com</p>
                    </div>
                    <ChevronDown size={18} className="text-gray-500" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute bottom-14 left-3 right-3 bg-white border border-gray-200 rounded-lg shadow-xl p-2">
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">Profile</button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">Settings</button>
                      <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">Logout</button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-white border-b border-gray-200 px-4 lg:px-6 flex items-center gap-4 shadow-sm">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            
            {/* Search bar */}
            <div className="flex-1 max-w-2xl relative">
              <Input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks, projects, or team members... (⌘K)"
                icon={Search}
                aria-label="Search"
              />
            </div>
            
            {/* Header actions */}
            <div className="flex items-center gap-2">
<div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  aria-label={`Notifications (${notificationCount} unread)`}
                  onClick={() => setShowNotifications(!showNotifications)}
                  title="Notifications"
                >
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {notificationCount}
                    </span>
                  )}
                </Button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-3 z-50">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Notifications</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="p-2 rounded hover:bg-gray-50">3 tasks assigned to you</li>
                      <li className="p-2 rounded hover:bg-gray-50">Build passed on main</li>
                      <li className="p-2 rounded hover:bg-gray-50">New comment on PR #124</li>
                    </ul>
                    <div className="mt-3 flex justify-end">
                      <a href="#" className="text-sm text-violet-600 hover:text-violet-700">View all</a>
                    </div>
                  </div>
                )}
              </div>
              
<Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex"
                aria-label="Help"
                title="Help & Support"
              >
                <HelpCircle size={20} />
              </Button>
              
              <Button
                variant="primary"
                size="md"
                onClick={handleCreateTask}
                loading={isCreatingTask}
                className="hidden sm:flex"
              >
                <Plus size={16} className="mr-2" />
                New Task
              </Button>
            </div>
          </header>
          
          {/* Main content area */}
          <main
            id="main-content"
            ref={mainContentRef}
            className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth"
            role="main"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <SkeletonLoader height="32px" width="200px" />
                    <SkeletonLoader height="16px" width="400px" className="mt-2" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <SkeletonLoader key={i} height="200px" />
                    ))}
                  </div>
                  <SkeletonLoader height="400px" />
                </motion.div>
              ) : error ? (
                <EmptyState
                  icon={AlertTriangle}
                  title="Failed to load data"
                  description={`${error}. ${retryCount > 0 ? `Retrying... (${retryCount}/3)` : ''}`}
                  action={retryCount === 0 ? {
                    label: 'Retry',
                    icon: RefreshCw,
                    onClick: () => fetchData()
                  } : undefined}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Page header */}
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-sm text-gray-600 mt-2">
                      Welcome back! Here's what's happening with your projects today.
                    </p>
                  </div>
                  
                  {/* Metrics cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
                    {metrics.map((metric, index) => (
                      <motion.div
                        key={metric.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-white p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                        style={{ borderRadius: ULTIMATE_DESIGN.radius.lg }}
                        role="article"
aria-label={`${metric.title}: ${metric.value} out of ${metric.total}`}
                      onClick={() => setActivePage(metric.id === 'velocity' ? 'reports' : 'my-tasks')}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                              {metric.title}
                            </p>
                            <div className="flex items-baseline gap-3 mb-1">
<h2 className="text-4xl font-bold text-gray-900 tabular-nums">
                                {metric.id === 'velocity' ? `${metric.value} pts` : metric.value}
                              </h2>
                              <div className="flex items-center gap-1">
{metric.trend === 'up' ? (
                                  <ArrowUp size={16} className="text-green-600" />
                                ) : (
                                  <>
                                    <AlertTriangle size={14} className="text-red-500" />
                                    <ArrowDown size={16} className="text-red-600" />
                                  </>
                                )}
                                <span className={`text-sm font-semibold ${
                                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {Math.abs(metric.change)}%
                                </span>
                              </div>
                            </div>
<p className="text-xs text-gray-600">{metric.changeLabel}</p>
                          </div>
<div className={`p-2 rounded-full bg-${metric.color}-50 group-hover:bg-${metric.color}-100 transition-colors`}>
                            <metric.icon size={24} className={`text-${metric.color}-600`} />
                          </div>
                        </div>
                        
                        {/* Sparkline */}
                        <div className="mb-4">
                          <Sparkline data={metric.sparkline} color={metric.color} height={40} />
                        </div>
                        
                        {/* Progress bar */}
<div>
                          <div className="flex justify-end text-xs mb-2">
                            <span className="text-gray-700 font-semibold">
                              {metric.value}/{metric.total} ({metric.percentage}%)
                            </span>
                          </div>
                          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.percentage}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                              className={`h-full bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Tasks section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white border border-gray-200 shadow-sm"
                    style={{ borderRadius: ULTIMATE_DESIGN.radius.lg }}
                  >
                    {/* Tasks header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center justify-between flex-wrap gap-4">
<h2 className="text-2xl font-semibold text-gray-900">Recent Tasks</h2>
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Filter buttons */}
                          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                            {['all', 'active', 'completed'].map((filter) => (
                              <Button
                                key={filter}
                                variant={activeFilter === filter ? 'primary' : 'ghost'}
                                size="xs"
                                onClick={() => setActiveFilter(filter)}
                                aria-pressed={activeFilter === filter}
                              >
                                <Filter size={12} className="mr-1" />
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                              </Button>
                            ))}
                          </div>
                          
                          {/* Time filter */}
                          <Button
                            variant={activeTimeFilter === 'today' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTimeFilter(activeTimeFilter === 'today' ? 'week' : 'today')}
                          >
                            <Calendar size={14} className="mr-1" />
                            {activeTimeFilter === 'today' ? 'Today' : 'This Week'}
                          </Button>
                          
                          {/* View all link */}
                          <a
                            href="#"
className="text-base font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1"
                          >
                            View All
                            <ChevronRight size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tasks list */}
                    <div className="p-6">
                      {filteredTasks.length === 0 ? (
                        <EmptyState
                          icon={Inbox}
                          title={searchQuery ? 'No results found' : 'No tasks yet'}
                          description={searchQuery ? 'Try adjusting your search or filters' : 'Create your first task to get started'}
                          action={{
                            label: searchQuery ? 'Clear Search' : 'Create Task',
                            icon: searchQuery ? X : Plus,
                            onClick: searchQuery ? () => setSearchQuery('') : handleCreateTask
                          }}
                        />
                      ) : (
                        <LayoutGroup>
                          <div className="space-y-8">
                            {Object.entries(groupedTasks).map(([group, groupTasks]) => (
                              groupTasks.length > 0 && (
                                <div key={group}>
                                  <div className="flex items-center gap-2 mb-4">
<h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      {group === 'today' && 'Today'}
                                      {group === 'yesterday' && 'Yesterday'}
                                      {group === 'thisWeek' && 'This Week'}
                                      {group === 'older' && 'Older'}
                                    </h3>
                                    <span className="text-xs text-gray-400">({groupTasks.length})</span>
                                    <div className="flex-1 h-px bg-gray-200" />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    {groupTasks.map((task, index) => {
                                      const priorityConfig = getPriorityConfig(task.priority);
                                      const isSelected = selectedTasks.has(task.id);
                                      const isHovered = hoveredTask === task.id;
                                      
                                      return (
                                        <motion.div
                                          layout
                                          key={task.id}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: 20 }}
                                          transition={{ delay: index * 0.05 }}
                                          onMouseEnter={() => setHoveredTask(task.id)}
                                          onMouseLeave={() => setHoveredTask(null)}
                                        >
                                          <motion.div
                                            whileHover={{ x: 4 }}
                                            className={`
                                              p-4 flex items-center gap-4 cursor-pointer transition-all border
                                              ${isSelected
                                                ? 'bg-violet-50 border-violet-200'
                                                : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-gray-200'
                                              }
                                            `}
                                            style={{ borderRadius: ULTIMATE_DESIGN.radius.md }}
                                          >
                                            {/* Checkbox */}
                                            <Checkbox
                                              checked={isSelected}
                                              onChange={() => toggleTask(task.id)}
                                              aria-label={`Select task: ${task.title}`}
                                            />
                                            
                                            {/* Task content */}
                                            <div className="flex-1 min-w-0">
<p 
                                                className={`font-medium ${isSelected ? 'text-gray-500' : 'text-gray-900'} hover:underline`}
                                                style={utils.truncate}
                                                title={task.title}
                                              >
                                                {task.title}
                                              </p>
                                              
                                              {/* Task meta */}
<div className="flex items-center gap-3 mt-2">
                                                <span className="inline-flex items-center gap-2 text-xs text-gray-600">
                                                  <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-[10px] font-semibold">
                                                    {task.assignee?.split(' ').map(n => n[0]).slice(0,2).join('')}
                                                  </span>
                                                  {task.assignee}
                                                </span>
                                                <span className="text-xs text-gray-600">
                                                  {task.timeSpent} of {task.estimate}
                                                </span>
                                                {task.tags?.map(tag => (
                                                  <span key={tag} onClick={() => setSearchQuery(tag)} className="cursor-pointer">
                                                    <Badge variant={['backend','performance'].includes(tag) ? 'info' : ['security'].includes(tag) ? 'error' : ['design','ui/ux'].includes(tag) ? 'primary' : ['devops','automation'].includes(tag) ? 'success' : 'neutral'} size="xs">
                                                      {tag}
                                                    </Badge>
                                                  </span>
                                                ))}
                                              </div>
                                              
                                              {/* Progress bar for in-progress tasks */}
                                              {task.status === 'in-progress' && (
                                                <div className="mt-2 w-full max-w-xs">
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
                                            
{/* Priority badge */}
                                            <div className="w-20 flex justify-center">
                                              <Badge variant={priorityConfig.color} size="sm">
                                                <priorityConfig.icon size={12} className="mr-1" />
                                                {priorityConfig.label}
                                              </Badge>
                                            </div>
                                            
                                            {/* Status icon */}
                                            {getStatusIcon(task.status)}
                                            
                                            {/* Actions */}
                                            <AnimatePresence>
                                              {isHovered && (
                                                <motion.div
                                                  initial={{ opacity: 0, scale: 0.8 }}
                                                  animate={{ opacity: 1, scale: 1 }}
                                                  exit={{ opacity: 0, scale: 0.8 }}
                                                  className="flex items-center gap-1"
                                                >
                                                  <Button
                                                    variant="ghost"
                                                    size="xs"
                                                    onClick={() => completeTask(task.id)}
                                                    aria-label="Complete task"
                                                  >
                                                    <CheckCircle2 size={16} />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="xs"
                                                    aria-label="Edit task"
                                                  >
                                                    <Edit2 size={16} />
                                                  </Button>
                                                  <Button
                                                    variant="ghost"
                                                    size="xs"
                                                    onClick={() => deleteTask(task.id)}
                                                    aria-label="Delete task"
                                                  >
                                                    <Trash2 size={16} />
                                                  </Button>
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
                        </LayoutGroup>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
        
        {/* Floating action button for mobile */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCreateTask}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-violet-600 text-white rounded-full shadow-lg flex items-center justify-center z-30"
          aria-label="Create new task"
        >
          <Plus size={24} />
        </motion.button>
      </div>
    </ErrorBoundary>
  );
};

export default UltimateCommandCenter;