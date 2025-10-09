import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, PieChart, LineChart, TrendingUp, TrendingDown,
  Calendar, Clock, CheckCircle2, AlertCircle, Activity,
  ArrowUpRight, ArrowDownRight, Info, ChevronLeft, ChevronRight
} from 'lucide-react';
import { colors, getPriorityColor, getStatusColor } from '../lib/designSystem';

// Utility function to generate chart data
const generateChartData = (tasks) => {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  
  // Task completion trend (last 30 days)
  const completionTrend = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const completed = tasks.filter(t => 
      t.completed && 
      t.completedAt && 
      new Date(t.completedAt).toISOString().split('T')[0] === dateStr
    ).length;
    
    completionTrend.push({
      date: dateStr,
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      completed
    });
  }
  
  // Productivity by day of week
  const productivityByDay = {
    Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
  };
  
  tasks.filter(t => t.completed).forEach(task => {
    if (task.completedAt) {
      const day = new Date(task.completedAt).toLocaleDateString('en-US', { weekday: 'short' });
      productivityByDay[day] = (productivityByDay[day] || 0) + 1;
    }
  });
  
  // Task distribution by priority
  const priorityDistribution = {
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length,
  };
  
  // Status distribution
  const statusDistribution = {
    todo: tasks.filter(t => t.status === 'todo').length,
    doing: tasks.filter(t => t.status === 'doing').length,
    done: tasks.filter(t => t.status === 'done').length,
  };
  
  return {
    completionTrend,
    productivityByDay,
    priorityDistribution,
    statusDistribution
  };
};

// Mini Bar Chart Component
const MiniBarChart = ({ data, color = colors.primary[600], height = 100 }) => {
  const maxValue = Math.max(...Object.values(data));
  
  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {Object.entries(data).map(([key, value], index) => (
        <div key={key} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            className="w-full rounded-t relative group"
            style={{ backgroundColor: color }}
            initial={{ height: 0 }}
            animate={{ height: `${(value / maxValue) * 100}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {value} tasks
            </div>
          </motion.div>
          <span className="text-xs text-gray-600">{key}</span>
        </div>
      ))}
    </div>
  );
};

// Donut Chart Component
const DonutChart = ({ data, colorMap, size = 120 }) => {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  let cumulativePercentage = 0;
  
  const segments = Object.entries(data).map(([key, value]) => {
    const percentage = (value / total) * 100;
    const startAngle = (cumulativePercentage * 360) / 100;
    const endAngle = ((cumulativePercentage + percentage) * 360) / 100;
    cumulativePercentage += percentage;
    
    return { key, value, percentage, startAngle, endAngle };
  });
  
  const radius = size / 2;
  const innerRadius = radius * 0.6;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {segments.map((segment, index) => {
          const color = colorMap[segment.key];
          const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
          
          const startX = radius + Math.cos((segment.startAngle * Math.PI) / 180) * innerRadius;
          const startY = radius + Math.sin((segment.startAngle * Math.PI) / 180) * innerRadius;
          const endX = radius + Math.cos((segment.endAngle * Math.PI) / 180) * innerRadius;
          const endY = radius + Math.sin((segment.endAngle * Math.PI) / 180) * innerRadius;
          
          const outerStartX = radius + Math.cos((segment.startAngle * Math.PI) / 180) * radius;
          const outerStartY = radius + Math.sin((segment.startAngle * Math.PI) / 180) * radius;
          const outerEndX = radius + Math.cos((segment.endAngle * Math.PI) / 180) * radius;
          const outerEndY = radius + Math.sin((segment.endAngle * Math.PI) / 180) * radius;
          
          const pathData = `
            M ${outerStartX} ${outerStartY}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}
            L ${endX} ${endY}
            A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startX} ${startY}
            Z
          `;
          
          return (
            <motion.path
              key={segment.key}
              d={pathData}
              fill={color}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="hover:opacity-80 cursor-pointer"
            />
          );
        })}
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </div>
    </div>
  );
};

// Line Chart Component
const LineChart = ({ data, height = 150 }) => {
  const maxValue = Math.max(...data.map(d => d.completed));
  const points = data.map((d, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - (d.completed / maxValue) * 100,
    value: d.completed,
    label: d.day
  }));
  
  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');
  
  return (
    <div className="relative" style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#E5E7EB"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        
        {/* Line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={colors.primary[600]}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        
        {/* Area under line */}
        <motion.path
          d={`${pathData} L 100 100 L 0 100 Z`}
          fill={`${colors.primary[600]}20`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        
        {/* Points */}
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="1.5"
            fill={colors.primary[600]}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
            className="hover:r-3 cursor-pointer"
          />
        ))}
      </svg>
      
      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
        {data.filter((_, i) => i % Math.ceil(data.length / 5) === 0).map((d, index) => (
          <span key={index}>{d.day}</span>
        ))}
      </div>
    </div>
  );
};

// Analytics Card Component
const AnalyticsCard = ({ title, value, change, icon: Icon, chart, info }) => {
  const [showInfo, setShowInfo] = useState(false);
  const isPositive = change >= 0;
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600 flex items-center gap-2">
            {title}
            {info && (
              <button
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            )}
          </h3>
          
          {showInfo && info && (
            <div className="absolute z-10 mt-1 p-2 bg-gray-800 text-white text-xs rounded-lg max-w-xs">
              {info}
            </div>
          )}
          
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          </div>
        </div>
        
        {Icon && (
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-purple-600" />
          </div>
        )}
      </div>
      
      {chart && <div className="mt-4">{chart}</div>}
    </motion.div>
  );
};

// Main Task Analytics Component
const TaskAnalytics = ({ tasks, period = 'week' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(period);
  const chartData = useMemo(() => generateChartData(tasks), [tasks]);
  
  // Calculate key metrics
  const metrics = useMemo(() => {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const overdue = tasks.filter(t => 
      !t.completed && new Date(t.dueDate) < new Date()
    ).length;
    
    const avgCompletionTime = tasks
      .filter(t => t.completed && t.createdAt && t.completedAt)
      .map(t => new Date(t.completedAt) - new Date(t.createdAt))
      .reduce((sum, time, _, arr) => sum + time / arr.length, 0);
    
    const avgDays = Math.round(avgCompletionTime / (1000 * 60 * 60 * 24));
    
    return {
      completionRate,
      overdue,
      avgCompletionDays: avgDays || 0,
      totalCompleted: completed
    };
  }, [tasks]);
  
  // Priority color map for donut chart
  const priorityColors = {
    high: getPriorityColor('high').main,
    medium: getPriorityColor('medium').main,
    low: getPriorityColor('low').main,
  };
  
  // Status color map for donut chart
  const statusColors = {
    todo: getStatusColor('todo').main,
    doing: getStatusColor('doing').main,
    done: getStatusColor('done').main,
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Analytics Overview</h2>
          <p className="text-sm text-gray-600 mt-1">Track your productivity and task patterns</p>
        </div>
        
        <div className="flex bg-gray-100 rounded-lg p-1">
          {['week', 'month', 'year'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                selectedPeriod === period
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          change={12}
          icon={CheckCircle2}
          info="Percentage of tasks completed vs total tasks"
          chart={
            <div className="h-16 flex items-end">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-green-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${metrics.completionRate}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          }
        />
        
        <AnalyticsCard
          title="Overdue Tasks"
          value={metrics.overdue}
          change={metrics.overdue > 0 ? -25 : 0}
          icon={AlertCircle}
          info="Number of tasks past their due date"
        />
        
        <AnalyticsCard
          title="Avg Completion Time"
          value={`${metrics.avgCompletionDays}d`}
          change={-8}
          icon={Clock}
          info="Average time to complete a task in days"
        />
        
        <AnalyticsCard
          title="Tasks Completed"
          value={metrics.totalCompleted}
          change={33}
          icon={Activity}
          info="Total number of completed tasks"
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Trend</h3>
          <LineChart data={chartData.completionTrend.slice(-7)} />
        </div>
        
        {/* Task Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Distribution</h3>
          <div className="flex items-center justify-center">
            <DonutChart data={chartData.priorityDistribution} colorMap={priorityColors} />
          </div>
          
          <div className="mt-4 space-y-2">
            {Object.entries(chartData.priorityDistribution).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: priorityColors[priority] }}
                  />
                  <span className="text-gray-600 capitalize">{priority} Priority</span>
                </div>
                <span className="font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Productivity by Day */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Productivity by Day</h3>
        <MiniBarChart data={chartData.productivityByDay} color={colors.primary[600]} />
      </div>
    </div>
  );
};

export default TaskAnalytics;