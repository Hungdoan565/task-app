import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  LayoutDashboard, Users, BarChart3, FileText, Settings, ChevronLeft,
  Search, Filter, Calendar, Tag, User, Plus, MoreVertical, Maximize2,
  X, ChevronRight, TrendingUp, Clock, CheckCircle2, AlertTriangle,
  Activity, Target, Zap, Command, Loader2, Download, Share2,
  ArrowUpRight, ArrowDownRight, GripVertical, FolderOpen,
  PieChart, LineChart, Timer, CalendarDays, UserCheck, ChevronDown
} from 'lucide-react';
import {
  layout, enterpriseColors, enterpriseElevation, enterpriseTypography,
  widgetSystem, animations, interactiveStates, shortcuts
} from '../lib/commandCenterDesign';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from 'date-fns';

// Custom hook for animated counters (simplified)
const useAnimatedCounter = (value, duration = 1000) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return displayValue;
};

// Enterprise Sidebar Component
const EnterpriseSidebar = ({ isCollapsed, onToggle }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, shortcut: '⌘1' },
    { id: 'tasks', label: 'Tasks', icon: FileText, shortcut: '⌘2', badge: '12' },
    { id: 'team', label: 'Team', icon: Users, shortcut: '⌘3' },
    { id: 'reports', label: 'Reports', icon: BarChart3, shortcut: '⌘4' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, shortcut: '⌘P' },
  ];
  
  return (
    <motion.aside
      animate={{ width: isCollapsed ? layout.sidebar.collapsedWidth : layout.sidebar.width }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="h-full flex flex-col border-r relative"
      style={{ 
        backgroundColor: enterpriseColors.surface[1],
        borderColor: enterpriseColors.surface[4],
      }}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b" style={{ borderColor: enterpriseColors.surface[4] }}>
        <motion.div
          className="flex items-center gap-3"
          animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: enterpriseColors.primary[600] }}
          >
            TC
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-semibold text-lg"
              style={{ color: enterpriseColors.primary[900] }}
            >
              TaskCommand
            </motion.span>
          )}
        </motion.div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full px-6 py-3 flex items-center gap-3 relative
              transition-colors duration-200
            `}
            style={{
              backgroundColor: activeSection === item.id ? enterpriseColors.primary[50] : 'transparent',
              color: activeSection === item.id ? enterpriseColors.primary[700] : enterpriseColors.primary[900],
            }}
          >
            {activeSection === item.id && (
              <motion.div
                layoutId="activeNav"
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: enterpriseColors.primary[600] }}
              />
            )}
            
            <item.icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
            
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span 
                    className="px-2 py-0.5 text-xs rounded-full"
                    style={{ 
                      backgroundColor: enterpriseColors.primary[100],
                      color: enterpriseColors.primary[700]
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                <span className="text-xs opacity-50">{item.shortcut}</span>
              </>
            )}
          </motion.button>
        ))}
      </nav>
      
      {/* Settings */}
      <div className="p-4 border-t" style={{ borderColor: enterpriseColors.surface[4] }}>
        <button 
          className="w-full p-2 rounded-lg hover:bg-gray-100 flex items-center justify-center"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
      
      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full border flex items-center justify-center"
        style={{
          backgroundColor: enterpriseColors.surface[1],
          borderColor: enterpriseColors.surface[4],
          ...enterpriseElevation.rest,
        }}
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
};

// Global Filter Bar
const GlobalFilterBar = ({ filters, onFilterChange }) => {
  return (
    <div 
      className="h-16 px-6 flex items-center gap-4 border-b sticky top-0 z-10"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderColor: enterpriseColors.surface[4],
      }}
    >
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks, projects, or team members... (⌘F)"
          className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm"
          style={{
            borderColor: enterpriseColors.surface[4],
            backgroundColor: enterpriseColors.surface[0],
          }}
        />
      </div>
      
      {/* Filters */}
      <div className="flex items-center gap-3">
        {/* Project Filter */}
        <button 
          className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2"
          style={{ borderColor: enterpriseColors.surface[4] }}
        >
          <FolderOpen className="w-4 h-4" />
          All Projects
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {/* Assignee Filter */}
        <button 
          className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2"
          style={{ borderColor: enterpriseColors.surface[4] }}
        >
          <User className="w-4 h-4" />
          All Members
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {/* Date Range */}
        <button 
          className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2"
          style={{ borderColor: enterpriseColors.surface[4] }}
        >
          <Calendar className="w-4 h-4" />
          This Week
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {/* Tags */}
        <button 
          className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2"
          style={{ borderColor: enterpriseColors.surface[4] }}
        >
          <Tag className="w-4 h-4" />
          All Tags
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {/* More Filters */}
        <button 
          className="p-2 rounded-lg border"
          style={{ borderColor: enterpriseColors.surface[4] }}
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>
      
      {/* Quick Actions */}
      <div className="ml-auto flex items-center gap-2">
        <button 
          className="px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2"
          style={{ backgroundColor: enterpriseColors.primary[600] }}
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>
    </div>
  );
};

// Widget: Metrics Card with Drill-down
const MetricWidget = ({ title, value, trend, icon: Icon, color, onClick, size = 'sm' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const animatedValue = useAnimatedCounter(value);
  
  return (
    <motion.div
      className="relative rounded-xl p-6 cursor-pointer select-none"
      style={{
        backgroundColor: enterpriseColors.surface[1],
        ...(isPressed ? enterpriseElevation.active : isHovered ? enterpriseElevation.hover : enterpriseElevation.rest),
        gridColumn: `span ${widgetSystem.sizes[size].cols}`,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Quick Actions */}
      <motion.div 
        className="absolute top-4 right-4 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <button className="p-1.5 rounded-lg hover:bg-gray-100">
          <Download className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-gray-100">
          <Share2 className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-gray-100">
          <MoreVertical className="w-4 h-4" />
        </button>
      </motion.div>
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <p 
            className="mb-2"
            style={enterpriseTypography.metric.label}
          >
            {title}
          </p>
          <motion.p 
            className="font-black tabular-nums"
            style={{
              ...enterpriseTypography.metric.value,
              color: enterpriseColors.primary[900],
            }}
          >
            {animatedValue}
          </motion.p>
        </div>
        
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${color}15`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
      
      {/* Trend */}
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-1 text-sm font-medium ${
          trend >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {Math.abs(trend)}%
        </div>
        <span className="text-xs text-gray-500">vs last week</span>
      </div>
      
      {/* Click hint */}
      <motion.div
        className="absolute bottom-2 right-2 text-xs text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        Click to view details →
      </motion.div>
    </motion.div>
  );
};

// Widget: Task List with inline actions
const TaskListWidget = ({ tasks, onTaskClick }) => {
  const [sortBy, setSortBy] = useState('priority');
  const [filterBy, setFilterBy] = useState('all');
  
  const sortedTasks = useMemo(() => {
    let filtered = tasks;
    if (filterBy !== 'all') {
      filtered = tasks.filter(t => t.status === filterBy);
    }
    
    return [...filtered].sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });
  }, [tasks, sortBy, filterBy]);
  
  return (
    <motion.div
      className="rounded-xl p-6"
      style={{
        backgroundColor: enterpriseColors.surface[1],
        ...enterpriseElevation.rest,
        gridColumn: 'span 12',
        minHeight: '400px',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">My Tasks</h3>
        
        <div className="flex items-center gap-3">
          {/* Filter */}
          <select 
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="text-sm px-3 py-1.5 rounded-lg border"
            style={{ borderColor: enterpriseColors.surface[4] }}
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="doing">In Progress</option>
            <option value="done">Completed</option>
          </select>
          
          {/* Sort */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm px-3 py-1.5 rounded-lg border"
            style={{ borderColor: enterpriseColors.surface[4] }}
          >
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="status">Status</option>
          </select>
          
          <button className="p-1.5 rounded-lg hover:bg-gray-100">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Task List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-thin">
        <AnimatePresence>
          {sortedTasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ x: 2 }}
              onClick={() => onTaskClick(task)}
              className="p-4 rounded-lg border cursor-pointer group"
              style={{
                backgroundColor: enterpriseColors.surface[0],
                borderColor: enterpriseColors.surface[4],
              }}
            >
              <div className="flex items-center gap-3">
                {/* Checkbox */}
                <button 
                  className="w-5 h-5 rounded border-2 flex items-center justify-center"
                  style={{ 
                    borderColor: task.completed ? enterpriseColors.status.success.main : enterpriseColors.surface[4],
                    backgroundColor: task.completed ? enterpriseColors.status.success.main : 'transparent',
                  }}
                >
                  {task.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                </button>
                
                {/* Task Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-medium ${task.completed ? 'line-through opacity-50' : ''}`}>
                      {task.title}
                    </span>
                    <span 
                      className="px-2 py-0.5 text-xs rounded-full font-medium"
                      style={{
                        backgroundColor: task.priority === 'high' 
                          ? enterpriseColors.status.danger.light 
                          : task.priority === 'medium'
                          ? enterpriseColors.status.warning.light
                          : enterpriseColors.status.info.light,
                        color: task.priority === 'high' 
                          ? enterpriseColors.status.danger.text 
                          : task.priority === 'medium'
                          ? enterpriseColors.status.warning.text
                          : enterpriseColors.status.info.text,
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(task.dueDate), 'MMM dd')}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {task.assignee}
                    </span>
                    {task.project && (
                      <span className="flex items-center gap-1">
                        <FolderOpen className="w-3 h-3" />
                        {task.project}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded hover:bg-gray-100">
                    <Timer className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-gray-100">
                    <UserCheck className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Widget: Burndown Chart
const BurndownWidget = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  return (
    <motion.div
      className="rounded-xl p-6"
      style={{
        backgroundColor: enterpriseColors.surface[1],
        ...enterpriseElevation.rest,
        gridColumn: 'span 8',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Sprint Burndown</h3>
        
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="text-sm px-3 py-1.5 rounded-lg border"
          style={{ borderColor: enterpriseColors.surface[4] }}
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="sprint">Current Sprint</option>
        </select>
      </div>
      
      {/* Chart placeholder */}
      <div 
        className="h-64 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: enterpriseColors.surface[0] }}
      >
        <LineChart className="w-8 h-8 text-gray-300" />
      </div>
    </motion.div>
  );
};

// Widget: Team Workload
const TeamWorkloadWidget = () => {
  const teamMembers = [
    { id: 1, name: 'Alex Chen', tasks: 8, capacity: 10, avatar: 'AC' },
    { id: 2, name: 'Sarah Johnson', tasks: 6, capacity: 8, avatar: 'SJ' },
    { id: 3, name: 'Mike Davis', tasks: 12, capacity: 10, avatar: 'MD' },
    { id: 4, name: 'Emma Wilson', tasks: 5, capacity: 8, avatar: 'EW' },
  ];
  
  return (
    <motion.div
      className="rounded-xl p-6"
      style={{
        backgroundColor: enterpriseColors.surface[1],
        ...enterpriseElevation.rest,
        gridColumn: 'span 8',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Team Workload</h3>
        
        <button className="p-1.5 rounded-lg hover:bg-gray-100">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {teamMembers.map((member) => {
          const workloadPercentage = (member.tasks / member.capacity) * 100;
          const isOverloaded = workloadPercentage > 100;
          
          return (
            <div key={member.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: enterpriseColors.primary[600] }}
                  >
                    {member.avatar}
                  </div>
                  <span className="text-sm font-medium">{member.name}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className={isOverloaded ? 'text-red-600 font-medium' : ''}>
                    {member.tasks}/{member.capacity} tasks
                  </span>
                  {isOverloaded && <AlertTriangle className="w-4 h-4 text-red-600" />}
                </div>
              </div>
              
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: enterpriseColors.surface[3] }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(workloadPercentage, 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full"
                  style={{
                    backgroundColor: isOverloaded 
                      ? enterpriseColors.status.danger.main
                      : workloadPercentage > 80
                      ? enterpriseColors.status.warning.main
                      : enterpriseColors.status.success.main,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Widget: Upcoming Deadlines Timeline
const DeadlineTimelineWidget = () => {
  const currentWeek = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  });
  
  const deadlines = [
    { date: new Date(), tasks: 3 },
    { date: new Date(Date.now() + 86400000), tasks: 2 },
    { date: new Date(Date.now() + 172800000), tasks: 5 },
    { date: new Date(Date.now() + 259200000), tasks: 1 },
  ];
  
  return (
    <motion.div
      className="rounded-xl p-6"
      style={{
        backgroundColor: enterpriseColors.surface[1],
        ...enterpriseElevation.rest,
        gridColumn: 'span 8',
      }}
    >
      <h3 className="text-lg font-semibold mb-6">Upcoming Deadlines</h3>
      
      <div className="grid grid-cols-7 gap-2">
        {currentWeek.map((day, index) => {
          const dayDeadlines = deadlines.find(d => 
            format(d.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          );
          
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`
                p-3 rounded-lg text-center cursor-pointer
                ${isToday(day) ? 'ring-2 ring-blue-500' : ''}
              `}
              style={{
                backgroundColor: dayDeadlines 
                  ? enterpriseColors.primary[50]
                  : enterpriseColors.surface[0],
              }}
            >
              <p className="text-xs text-gray-500 mb-1">
                {format(day, 'EEE')}
              </p>
              <p className="text-lg font-semibold mb-2">
                {format(day, 'd')}
              </p>
              
              {dayDeadlines && (
                <div 
                  className="mx-auto w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                  style={{ backgroundColor: enterpriseColors.primary[600] }}
                >
                  {dayDeadlines.tasks}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Command Palette Component
const CommandPalette = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);
  
  const commands = [
    { id: 'new-task', label: 'Create new task', icon: Plus, shortcut: '⌘N' },
    { id: 'search-tasks', label: 'Search tasks', icon: Search, shortcut: '⌘F' },
    { id: 'view-reports', label: 'View reports', icon: BarChart3, shortcut: '⌘4' },
    { id: 'team-view', label: 'Switch to team view', icon: Users, shortcut: '⌘3' },
  ];
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />
          
          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
            style={{ width: layout.commandPalette.width }}
          >
            <div 
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: enterpriseColors.surface[1],
                ...enterpriseElevation.modal,
              }}
            >
              {/* Search Input */}
              <div className="p-4 border-b" style={{ borderColor: enterpriseColors.surface[4] }}>
                <div className="relative">
                  <Command className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type a command or search..."
                    className="w-full pl-10 pr-4 py-2 bg-transparent outline-none"
                  />
                </div>
              </div>
              
              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto">
                {commands.map((command) => (
                  <button
                    key={command.id}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                  >
                    <command.icon className="w-4 h-4 text-gray-400" />
                    <span className="flex-1 text-left text-sm">{command.label}</span>
                    <kbd className="px-2 py-1 text-xs bg-gray-100 rounded">
                      {command.shortcut}
                    </kbd>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Main Enterprise Command Center Component
const EnterpriseCommandCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState(null);
  const [widgets, setWidgets] = useState([
    { id: 'metric-1', type: 'metric', size: 'sm', position: { x: 0, y: 0 } },
    { id: 'metric-2', type: 'metric', size: 'sm', position: { x: 1, y: 0 } },
    { id: 'metric-3', type: 'metric', size: 'sm', position: { x: 2, y: 0 } },
    { id: 'task-list', type: 'taskList', size: 'lg', position: { x: 0, y: 1 } },
    { id: 'burndown', type: 'burndown', size: 'md', position: { x: 2, y: 1 } },
    { id: 'workload', type: 'workload', size: 'md', position: { x: 0, y: 2 } },
    { id: 'timeline', type: 'timeline', size: 'md', position: { x: 1, y: 2 } },
  ]);
  
  // Mock data
  const tasks = [
    {
      id: 1,
      title: 'Implement user authentication',
      status: 'doing',
      priority: 'high',
      dueDate: new Date().toISOString(),
      assignee: 'Alex Chen',
      project: 'Mobile App',
      completed: false,
    },
    {
      id: 2,
      title: 'Design dashboard mockups',
      status: 'done',
      priority: 'medium',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      assignee: 'Sarah Johnson',
      project: 'Web Platform',
      completed: true,
    },
    {
      id: 3,
      title: 'Setup CI/CD pipeline',
      status: 'todo',
      priority: 'high',
      dueDate: new Date(Date.now() + 172800000).toISOString(),
      assignee: 'Mike Davis',
      project: 'DevOps',
      completed: false,
    },
    {
      id: 4,
      title: 'Write API documentation',
      status: 'todo',
      priority: 'low',
      dueDate: new Date(Date.now() + 259200000).toISOString(),
      assignee: 'Emma Wilson',
      project: 'Backend',
      completed: false,
    },
  ];
  
  // Keyboard shortcuts
  useHotkeys('cmd+k, ctrl+k', () => setCommandPaletteOpen(true));
  useHotkeys('cmd+b, ctrl+b', () => setSidebarCollapsed(!sidebarCollapsed));
  useHotkeys('escape', () => setCommandPaletteOpen(false));
  
  // Drill-down handler
  const handleMetricClick = (metric) => {
    console.log('Drilling down into:', metric);
    // Show filtered task list or modal
  };
  
  const handleTaskClick = (task) => {
    console.log('Task clicked:', task);
    // Open task detail panel
  };
  
  return (
    <div 
      className="h-screen flex overflow-hidden"
      style={{ backgroundColor: enterpriseColors.surface[0] }}
    >
      {/* Sidebar */}
      <EnterpriseSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Global Filter Bar */}
        <GlobalFilterBar filters={{}} onFilterChange={() => {}} />
        
        {/* Dashboard Grid */}
        <div className="flex-1 p-6 overflow-auto">
          <div 
            className="grid gap-4 min-h-full"
            style={{
              gridTemplateColumns: `repeat(${layout.grid.cols}, minmax(0, 1fr))`,
              gridAutoRows: 'min-content',
            }}
          >
            {/* Metric Cards */}
            <MetricWidget
              title="TASKS COMPLETED"
              value={28}
              trend={25}
              icon={CheckCircle2}
              color={enterpriseColors.status.success.main}
              onClick={() => handleMetricClick('completed')}
              size="sm"
            />
            
            <MetricWidget
              title="IN PROGRESS"
              value={12}
              trend={-10}
              icon={Timer}
              color={enterpriseColors.status.warning.main}
              onClick={() => handleMetricClick('in-progress')}
              size="sm"
            />
            
            <MetricWidget
              title="TEAM VELOCITY"
              value={87}
              trend={15}
              icon={TrendingUp}
              color={enterpriseColors.primary[600]}
              onClick={() => handleMetricClick('velocity')}
              size="sm"
            />
            
            {/* Task List */}
            <TaskListWidget 
              tasks={tasks}
              onTaskClick={handleTaskClick}
            />
            
            {/* Burndown Chart */}
            <BurndownWidget />
            
            {/* Team Workload */}
            <TeamWorkloadWidget />
            
            {/* Deadline Timeline */}
            <DeadlineTimelineWidget />
          </div>
        </div>
      </div>
      
      {/* Command Palette */}
      <CommandPalette 
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
};

export default EnterpriseCommandCenter;