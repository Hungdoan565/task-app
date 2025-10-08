import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search, Bell, Calendar, Clock, ChevronRight, ChevronDown, ChevronLeft,
  Plus, MoreHorizontal, Check, X, Filter, User, Tag, MessageSquare,
  TrendingUp, TrendingDown, Star, Archive, Trash2, Edit3, Copy,
  AlertCircle, CheckCircle2, Circle, ArrowUp, ArrowDown, Home,
  FolderOpen, Settings, LogOut, Menu, Inbox, Activity, Target,
  BarChart3, Zap, Flag, CalendarDays, SortAsc, Layout
} from 'lucide-react';

// Color system configuration
const colors = {
  priority: {
    high: '#EF4444',
    medium: '#F59E0B', 
    low: '#3B82F6'
  },
  status: {
    todo: '#6366F1',
    doing: '#F59E0B',
    done: '#10B981'
  }
};

// Mock data with comprehensive task structure
const initialTasks = [
  {
    id: '1',
    title: 'Design new dashboard layout',
    description: 'Create high-fidelity mockups for the new task management dashboard',
    status: 'done',
    priority: 'high',
    dueDate: '2025-10-08',
    assignee: { name: 'HD', fullName: 'Hung Doan', avatar: null },
    tags: ['Design', 'UI/UX', 'Priority'],
    comments: 5,
    subtasks: [
      { id: '1-1', title: 'Create wireframes', completed: true },
      { id: '1-2', title: 'Design system setup', completed: true },
      { id: '1-3', title: 'Component library', completed: true }
    ],
    completed: true,
    createdAt: '2025-10-06T10:00:00Z',
    completedAt: '2025-10-08T14:30:00Z'
  },
  {
    id: '2',
    title: 'Implement authentication system',
    description: 'Add JWT-based authentication with refresh tokens',
    status: 'doing',
    priority: 'high',
    dueDate: '2025-10-10',
    assignee: { name: 'HD', fullName: 'Hung Doan', avatar: null },
    tags: ['Backend', 'Security'],
    comments: 3,
    subtasks: [
      { id: '2-1', title: 'Setup JWT middleware', completed: true },
      { id: '2-2', title: 'Create login endpoint', completed: false },
      { id: '2-3', title: 'Add refresh token logic', completed: false }
    ],
    completed: false,
    createdAt: '2025-10-07T09:00:00Z'
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all REST API endpoints with examples',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-10-12',
    assignee: { name: 'HD', fullName: 'Hung Doan', avatar: null },
    tags: ['Documentation', 'API'],
    comments: 0,
    subtasks: [],
    completed: false,
    createdAt: '2025-10-08T08:00:00Z'
  },
  {
    id: '4',
    title: 'Database optimization',
    description: 'Optimize slow queries and add proper indexing',
    status: 'todo',
    priority: 'low',
    dueDate: '2025-10-15',
    assignee: { name: 'HD', fullName: 'Hung Doan', avatar: null },
    tags: ['Database', 'Performance'],
    comments: 2,
    subtasks: [
      { id: '4-1', title: 'Analyze query performance', completed: false },
      { id: '4-2', title: 'Add indexes', completed: false }
    ],
    completed: false,
    createdAt: '2025-10-08T11:00:00Z'
  },
  {
    id: '5',
    title: 'Mobile responsive testing',
    description: 'Test and fix responsive issues on mobile devices',
    status: 'done',
    priority: 'medium',
    dueDate: '2025-10-07',
    assignee: { name: 'HD', fullName: 'Hung Doan', avatar: null },
    tags: ['Testing', 'Mobile'],
    comments: 8,
    subtasks: [],
    completed: true,
    createdAt: '2025-10-05T10:00:00Z',
    completedAt: '2025-10-07T16:00:00Z'
  }
];

// Activity feed mock data
const initialActivities = [
  { id: 1, type: 'completed', message: 'completed "Design new dashboard layout"', time: '2 minutes ago', user: 'You' },
  { id: 2, type: 'created', message: 'created "Database optimization"', time: '15 minutes ago', user: 'You' },
  { id: 3, type: 'comment', message: 'commented on "Implement authentication"', time: '1 hour ago', user: 'You' },
  { id: 4, type: 'completed', message: 'completed "Mobile responsive testing"', time: '3 hours ago', user: 'You' },
  { id: 5, type: 'milestone', message: 'completed 5 tasks today', time: 'Yesterday', user: 'System' }
];

const ModernTaskDashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState('priority');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activities] = useState(initialActivities);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Calculate stats
  const stats = useMemo(() => {
    const todo = tasks.filter(t => t.status === 'todo').length;
    const doing = tasks.filter(t => t.status === 'doing').length;
    const done = tasks.filter(t => t.status === 'done').length;
    const total = tasks.length;
    
    return {
      todo,
      doing,
      done,
      total,
      todoPercent: total > 0 ? Math.round((todo / total) * 100) : 0,
      doingPercent: total > 0 ? Math.round((doing / total) * 100) : 0,
      donePercent: total > 0 ? Math.round((done / total) * 100) : 0
    };
  }, [tasks]);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply completed filter
    if (!showCompleted) {
      filtered = filtered.filter(task => !task.completed);
    }

    // Apply priority filter
    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    // Apply tab filter
    if (selectedTab === 'today') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(task => task.dueDate === today);
    } else if (selectedTab === 'upcoming') {
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && dueDate <= nextWeek;
      });
    }

    // Sort tasks
    filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'created') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    return filtered;
  }, [tasks, searchQuery, showCompleted, filterPriority, selectedTab, sortBy]);

  // Group tasks by priority
  const groupedTasks = useMemo(() => {
    const groups = {
      high: filteredTasks.filter(t => t.priority === 'high' && !t.completed),
      medium: filteredTasks.filter(t => t.priority === 'medium' && !t.completed),
      low: filteredTasks.filter(t => t.priority === 'low' && !t.completed),
      completed: filteredTasks.filter(t => t.completed)
    };
    return groups;
  }, [filteredTasks]);

  // Get upcoming tasks for right sidebar
  const upcomingTasks = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return tasks
      .filter(task => {
        const dueDate = new Date(task.dueDate);
        return !task.completed && dueDate >= today && dueDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);
  }, [tasks]);

  // Toggle task completion
  const toggleTaskComplete = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              status: !task.completed ? 'done' : 'todo',
              completedAt: !task.completed ? new Date().toISOString() : null
            }
          : task
      )
    );
  }, []);

  // Delete task
  const deleteTask = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal(true);
      }
      // Escape to close modals
      if (e.key === 'Escape') {
        setShowSearchModal(false);
        setShowNewTaskModal(false);
        setSelectedTask(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Priority indicator component
  const PriorityIndicator = ({ priority }) => {
    const colorMap = {
      high: 'bg-red-500',
      medium: 'bg-amber-500',
      low: 'bg-blue-500'
    };
    return <div className={`w-2 h-2 rounded-full ${colorMap[priority]}`} />;
  };

  // Task card component
  const TaskCard = ({ task }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
    const isDueToday = task.dueDate === new Date().toISOString().split('T')[0];

    return (
      <div
        className={`group relative bg-white rounded-lg border ${
          task.completed ? 'border-gray-200 opacity-60' : 'border-gray-200 hover:border-gray-300'
        } p-4 mb-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start gap-3">
          {/* Custom checkbox */}
          <button
            onClick={() => toggleTaskComplete(task.id)}
            className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {task.completed && <Check className="w-3 h-3 text-white" />}
          </button>

          {/* Priority dot */}
          <PriorityIndicator priority={task.priority} />

          {/* Task content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </h3>
              
              {/* Actions (visible on hover) */}
              <div className={`flex items-center gap-1 transition-opacity duration-200 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <button
                  onClick={() => setSelectedTask(task)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit3 className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                        <Copy className="w-4 h-4" /> Duplicate
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                        <Archive className="w-4 h-4" /> Archive
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                        <Flag className="w-4 h-4" /> Change Priority
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Task metadata */}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              {/* Tags */}
              <div className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {task.tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {task.tags.length > 2 && (
                  <span className="text-xs text-gray-400">+{task.tags.length - 2}</span>
                )}
              </div>

              {/* Due date */}
              <div className={`flex items-center gap-1 ${
                isOverdue ? 'text-red-500' : isDueToday ? 'text-amber-500' : ''
              }`}>
                <Calendar className="w-3 h-3" />
                <span className="text-xs">
                  {new Date(task.dueDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

              {/* Comments */}
              {task.comments > 0 && (
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <span className="text-xs">{task.comments}</span>
                </div>
              )}

              {/* Assignee */}
              <div className="flex items-center gap-1 ml-auto">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                  {task.assignee.name}
                </div>
              </div>
            </div>

            {/* Subtasks */}
            {task.subtasks.length > 0 && (
              <div className="mt-3 space-y-1">
                {task.subtasks.map(subtask => (
                  <div key={subtask.id} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className={`w-4 h-4 rounded border ${
                      subtask.completed ? 'bg-gray-100 border-gray-300' : 'border-gray-300'
                    }`}>
                      {subtask.completed && <Check className="w-3 h-3 text-gray-500" />}
                    </div>
                    <span className={subtask.completed ? 'line-through text-gray-400' : ''}>
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Stats card component
  const StatsCard = ({ title, value, trend, color, percentage }) => (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] relative overflow-hidden`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${color}`} />
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-4xl font-bold text-gray-900">{value}</p>
          {percentage !== undefined && (
            <p className="text-sm text-gray-500 mt-1">{percentage}% of total</p>
          )}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );

  // Calendar widget component
  const CalendarWidget = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDate = today.getDate();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return (
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-semibold text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
          {days.map((day, idx) => (
            <div
              key={idx}
              className={`py-1 text-sm ${
                day === currentDate
                  ? 'bg-blue-500 text-white rounded-full font-semibold'
                  : day
                  ? 'text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer'
                  : ''
              }`}
            >
              {day || ''}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className={`${
        sidebarCollapsed ? 'w-16' : 'w-60'
      } bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">TaskFlow</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Menu className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <div className="space-y-1 px-3">
            {[
              { icon: BarChart3, label: 'Dashboard', active: true },
              { icon: CheckCircle2, label: 'My Tasks', count: stats.todo + stats.doing },
              { icon: FolderOpen, label: 'Projects' },
              { icon: CalendarDays, label: 'Calendar' },
              { icon: Settings, label: 'Settings' }
            ].map((item, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                    {item.count !== undefined && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* New Task Button */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => setShowNewTaskModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-medium">New Task</span>}
          </button>
        </div>

        {/* User Profile */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                HD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Hung Doan</p>
                <p className="text-xs text-gray-500 truncate">hungdoan@gmail.com</p>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <LogOut className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Dashboard</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">Tasks</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Search className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Search</span>
              <kbd className="px-2 py-0.5 text-xs bg-white rounded border border-gray-300">⌘K</kbd>
            </button>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold cursor-pointer">
              HD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatsCard
              title="To Do"
              value={stats.todo}
              percentage={stats.todoPercent}
              trend={-12}
              color="bg-blue-500"
            />
            <StatsCard
              title="In Progress"
              value={stats.doing}
              percentage={stats.doingPercent}
              trend={8}
              color="bg-amber-500"
            />
            <StatsCard
              title="Completed"
              value={stats.done}
              percentage={stats.donePercent}
              trend={25}
              color="bg-green-500"
            />
          </div>

          {/* Filters and Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {/* Tabs */}
                {[
                  { id: 'all', label: 'All Tasks', count: tasks.length },
                  { id: 'today', label: 'Today', count: 1 },
                  { id: 'upcoming', label: 'Upcoming', count: upcomingTasks.length }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {/* Filter by Priority */}
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="priority">Sort by Priority</option>
                  <option value="dueDate">Sort by Due Date</option>
                  <option value="created">Sort by Created</option>
                </select>

                {/* Show Completed Toggle */}
                <button
                  onClick={() => setShowCompleted(!showCompleted)}
                  className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
                    showCompleted
                      ? 'bg-gray-100 border-gray-300 text-gray-700'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}
                >
                  {showCompleted ? 'Hide' : 'Show'} Completed
                </button>
              </div>
            </div>

            {/* Task List */}
            <div className="p-4">
              {/* High Priority Tasks */}
              {groupedTasks.high.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      High Priority ({groupedTasks.high.length})
                    </h3>
                  </div>
                  {groupedTasks.high.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}

              {/* Medium Priority Tasks */}
              {groupedTasks.medium.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Medium Priority ({groupedTasks.medium.length})
                    </h3>
                  </div>
                  {groupedTasks.medium.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}

              {/* Low Priority Tasks */}
              {groupedTasks.low.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Low Priority ({groupedTasks.low.length})
                    </h3>
                  </div>
                  {groupedTasks.low.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}

              {/* Completed Tasks */}
              {showCompleted && groupedTasks.completed.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Completed ({groupedTasks.completed.length})
                    </h3>
                  </div>
                  {groupedTasks.completed.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredTasks.length === 0 && (
                <div className="py-12 text-center">
                  <Inbox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">No tasks found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your filters or create a new task</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className={`${
        rightPanelCollapsed ? 'w-0' : 'w-80'
      } bg-white border-l border-gray-200 transition-all duration-300 overflow-hidden`}>
        <div className="h-full flex flex-col">
          {/* Panel Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Overview</h2>
            <button
              onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-auto p-4 space-y-6">
            {/* Calendar Widget */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Calendar
              </h3>
              <CalendarWidget />
            </div>

            {/* Due This Week */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Due This Week ({upcomingTasks.length})
              </h3>
              <div className="space-y-2">
                {upcomingTasks.map(task => {
                  const dueDate = new Date(task.dueDate);
                  const isToday = task.dueDate === new Date().toISOString().split('T')[0];
                  const isTomorrow = task.dueDate === new Date(Date.now() + 86400000).toISOString().split('T')[0];
                  
                  return (
                    <div
                      key={task.id}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {task.title}
                          </p>
                          <p className={`text-xs mt-1 ${
                            isToday ? 'text-amber-600 font-medium' : 
                            isTomorrow ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {isToday ? 'Today' : 
                             isTomorrow ? 'Tomorrow' : 
                             dueDate.toLocaleDateString('en-US', { 
                               month: 'short', 
                               day: 'numeric' 
                             })}
                          </p>
                        </div>
                        <PriorityIndicator priority={task.priority} />
                      </div>
                    </div>
                  );
                })}
                {upcomingTasks.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No upcoming tasks this week
                  </p>
                )}
              </div>
            </div>

            {/* Activity Feed */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {activities.map(activity => (
                  <div key={activity.id} className="flex gap-3">
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      activity.type === 'completed' ? 'bg-green-500' :
                      activity.type === 'created' ? 'bg-blue-500' :
                      activity.type === 'comment' ? 'bg-purple-500' :
                      'bg-gray-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">{activity.user}</span>{' '}
                        <span className="text-gray-600">{activity.message}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all activity →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks, projects, or tags..."
                className="flex-1 outline-none text-gray-900"
                autoFocus
              />
              <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-300">ESC</kbd>
            </div>
            
            {searchQuery && (
              <div className="p-2 max-h-96 overflow-auto">
                {filteredTasks.slice(0, 5).map(task => (
                  <button
                    key={task.id}
                    onClick={() => {
                      setSelectedTask(task);
                      setShowSearchModal(false);
                    }}
                    className="w-full p-3 hover:bg-gray-50 rounded-lg text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border-2 ${
                        task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}>
                        {task.completed && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {task.tags.join(' • ')} • Due {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <PriorityIndicator priority={task.priority} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter task title..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Add a description..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Add tags (separated by commas)..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowNewTaskModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Add task logic here
                  setShowNewTaskModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTaskDashboard;