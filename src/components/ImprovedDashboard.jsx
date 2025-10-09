import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  Activity, TrendingUp, TrendingDown, Calendar, Clock,
  CheckCircle2, AlertCircle, Timer, Users, Target,
  BarChart3, PieChart, LineChart, ArrowUpRight, ArrowDownRight,
  Sparkles, Lightbulb, Zap, Filter, Search, Plus,
  MoreHorizontal, ChevronDown, Grid3X3, List,
  KanbanSquare, CalendarDays, Settings, HelpCircle, Flag
} from 'lucide-react';
import { 
  colors, typography, spacing, shadows, borderRadius, 
  getPriorityColor, getStatusColor, grid as DSGrid 
} from '../lib/designSystem';
import { useResponsive } from '../hooks/useAccessibility';
import AITaskAssistant from './AITaskAssistant';

// Modern Stats Card with AI Insights
const ModernStatsCard = ({ title, value, percentage, trend, icon: Icon, color, insight }) => {
  const isPositive = trend >= 0;
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="relative bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {insight && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-gray-600"
                title={insight}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>
          
          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            <span className="text-sm font-medium text-gray-500">
              {percentage}% of total
            </span>
          </div>
          
          <div className="flex items-center gap-2 mt-3">
            <div className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(trend)}%</span>
            </div>
            <span className="text-xs text-gray-500">from last week</span>
          </div>
        </div>
        
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
      
      {/* Mini progress bar */}
      <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color, width: `${percentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

// Task Overview Widget with better visualization
const TaskOverviewWidget = ({ tasks }) => {
  const [viewMode, setViewMode] = useState('priority'); // priority, status, timeline
  
  const tasksByPriority = useMemo(() => {
    const grouped = { high: [], medium: [], low: [] };
    tasks.forEach(task => {
      if (task.priority in grouped) {
        grouped[task.priority].push(task);
      }
    });
    return grouped;
  }, [tasks]);
  
  const tasksByStatus = useMemo(() => {
    const grouped = { todo: [], doing: [], done: [] };
    tasks.forEach(task => {
      if (task.status in grouped) {
        grouped[task.status].push(task);
      }
    });
    return grouped;
  }, [tasks]);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Task Overview</h3>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'priority', icon: Flag, label: 'Priority' },
                { id: 'status', icon: CheckCircle2, label: 'Status' },
                { id: 'timeline', icon: Calendar, label: 'Timeline' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === mode.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <mode.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <AnimatePresence mode="wait">
          {viewMode === 'priority' && (
            <motion.div
              key="priority"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {Object.entries(tasksByPriority).map(([priority, priorityTasks]) => {
                const color = getPriorityColor(priority);
                const percentage = (priorityTasks.length / tasks.length) * 100;
                
                return (
                  <div key={priority} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: color.main }}
                        />
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {priority} Priority
                        </span>
                        <span className="text-xs text-gray-500">
                          ({priorityTasks.length} tasks)
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute h-full rounded-full"
                        style={{ backgroundColor: color.main }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
          
          {viewMode === 'status' && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-3 gap-4"
            >
              {Object.entries(tasksByStatus).map(([status, statusTasks]) => {
                const color = getStatusColor(status);
                const percentage = (statusTasks.length / tasks.length) * 100;
                
                return (
                  <div
                    key={status}
                    className="text-center p-4 rounded-lg border-2 transition-colors"
                    style={{ 
                      borderColor: `${color.main}30`,
                      backgroundColor: `${color.light}50`
                    }}
                  >
                    <div 
                      className="text-3xl font-bold mb-1"
                      style={{ color: color.main }}
                    >
                      {statusTasks.length}
                    </div>
                    <div className="text-sm font-medium text-gray-700 capitalize">
                      {status === 'todo' ? 'To Do' : status === 'doing' ? 'In Progress' : 'Done'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {percentage.toFixed(0)}% of total
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// AI Insights Widget - replaced by AITaskAssistant
const AIInsightsWidget = ({ tasks, activities }) => {
  const [selectedInsight, setSelectedInsight] = useState(0);
  
  const insights = useMemo(() => {
    const overdueTasks = tasks.filter(t => 
      !t.completed && new Date(t.dueDate) < new Date()
    );
    
    const highPriorityPending = tasks.filter(t => 
      !t.completed && t.priority === 'high'
    );
    
    const productivityScore = Math.round(
      (tasks.filter(t => t.completed).length / tasks.length) * 100
    );
    
    return [
      {
        type: 'warning',
        title: 'Overdue Tasks Alert',
        description: `You have ${overdueTasks.length} overdue tasks that need immediate attention`,
        action: 'View Overdue',
        icon: AlertCircle,
        color: colors.error,
        priority: overdueTasks.length > 0 ? 'high' : 'low'
      },
      {
        type: 'suggestion',
        title: 'Focus Recommendation',
        description: `Complete "${highPriorityPending[0]?.title || 'high priority tasks'}" to unblock dependent work`,
        action: 'Start Task',
        icon: Target,
        color: colors.primary[600],
        priority: 'medium'
      },
      {
        type: 'metric',
        title: 'Productivity Insight',
        description: `Your completion rate is ${productivityScore}%. Peak hours: 9-11 AM`,
        action: 'View Analytics',
        icon: TrendingUp,
        color: colors.success,
        priority: 'low'
      }
    ].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [tasks]);
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
          </div>
          
          <div className="flex items-center gap-1">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedInsight(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedInsight === index
                    ? 'w-6 bg-purple-600'
                    : 'bg-purple-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <AnimatePresence mode="wait">
          {insights.map((insight, index) => (
            selectedInsight === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${insight.color}20` }}
                  >
                    <insight.icon className="w-5 h-5" style={{ color: insight.color }} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {insight.description}
                    </p>
                  </div>
                </div>
                
                <button className="w-full px-4 py-2 bg-white rounded-lg border border-purple-200 text-purple-600 font-medium text-sm hover:bg-purple-50 transition-colors">
                  {insight.action}
                </button>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Main Improved Dashboard Layout
const ImprovedDashboard = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data - in production this would come from API
  useEffect(() => {
    setTimeout(() => {
      setTasks([
        {
          id: '1',
          title: 'Design new dashboard layout',
          description: 'Create high-fidelity mockups',
          status: 'done',
          priority: 'high',
          dueDate: '2025-10-08',
          completed: true,
          completedAt: '2025-10-08T14:30:00Z',
          tags: ['Design', 'UI/UX'],
        },
        {
          id: '2',
          title: 'Implement authentication',
          description: 'Add JWT-based auth',
          status: 'doing',
          priority: 'high',
          dueDate: '2025-10-10',
          completed: false,
          tags: ['Backend', 'Security', 'blocker'],
        },
        {
          id: '3',
          title: 'Write API documentation',
          description: 'Document REST endpoints',
          status: 'todo',
          priority: 'medium',
          dueDate: '2025-10-12',
          completed: false,
          tags: ['Documentation', 'API'],
        },
        {
          id: '4',
          title: 'Database optimization',
          description: 'Optimize queries',
          status: 'todo',
          priority: 'low',
          dueDate: '2025-10-15',
          completed: false,
          tags: ['Database', 'Performance'],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);
  
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
      todoPercent: total ? Math.round((todo / total) * 100) : 0,
      doingPercent: total ? Math.round((doing / total) * 100) : 0,
      donePercent: total ? Math.round((done / total) * 100) : 0,
    };
  }, [tasks]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen bg-gray-50 ${DSGrid.container}`}>
      <LayoutGroup>
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium text-gray-900">Dashboard</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Tasks</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Projects</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Calendar</a>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Search className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <HelpCircle className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="py-6">
          {/* Stats Section */}
          <section className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ModernStatsCard
                title="To Do"
                value={stats.todo}
                percentage={stats.todoPercent}
                trend={-12}
                icon={Clock}
                color={getStatusColor('todo').main}
                insight="2 tasks are blocking others"
              />
              <ModernStatsCard
                title="In Progress"
                value={stats.doing}
                percentage={stats.doingPercent}
                trend={8}
                icon={Timer}
                color={getStatusColor('doing').main}
                insight="On track for weekly goal"
              />
              <ModernStatsCard
                title="Completed"
                value={stats.done}
                percentage={stats.donePercent}
                trend={25}
                icon={CheckCircle2}
                color={getStatusColor('done').main}
                insight="Best week this month!"
              />
            </div>
          </section>
          
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - 8 cols */}
            <div className="lg:col-span-8 space-y-6">
              <TaskOverviewWidget tasks={tasks} />
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Plus className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">New Task</span>
                  </button>
                  <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <KanbanSquare className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Kanban View</span>
                  </button>
                  <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <CalendarDays className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Calendar</span>
                  </button>
                  <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <BarChart3 className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Reports</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Column - 4 cols */}
            <div className="lg:col-span-4 space-y-6">
              <AITaskAssistant tasks={tasks} activities={[]} />
              
              {/* Upcoming Tasks */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  {tasks
                    .filter(t => !t.completed)
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                    .slice(0, 3)
                    .map(task => {
                      const daysUntil = Math.ceil(
                        (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
                      );
                      const priorityColor = getPriorityColor(task.priority);
                      
                      return (
                        <div key={task.id} className="flex items-center gap-3">
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: priorityColor.main }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {task.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {daysUntil === 0 ? 'Due today' : 
                               daysUntil === 1 ? 'Tomorrow' : 
                               `In ${daysUntil} days`}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </LayoutGroup>
    </div>
  );
};

export default ImprovedDashboard;