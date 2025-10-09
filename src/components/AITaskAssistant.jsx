import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Sparkles, TrendingUp, AlertTriangle, Target, Clock,
  Zap, Calendar, BarChart3, Users, ChevronRight, ThumbsUp,
  ThumbsDown, RefreshCw, Lightbulb, CheckCircle2, X
} from 'lucide-react';
import { colors, getPriorityColor } from '../lib/designSystem';

// AI Analysis Engine
const analyzeTaskPatterns = (tasks, activities) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();
  
  // Analyze completion patterns
  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks = tasks.filter(t => !t.completed);
  
  // Time-based analysis
  const tasksByHour = completedTasks.reduce((acc, task) => {
    if (task.completedAt) {
      const hour = new Date(task.completedAt).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
    }
    return acc;
  }, {});
  
  // Find peak productivity hours
  const peakHours = Object.entries(tasksByHour)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2)
    .map(([hour]) => parseInt(hour));
  
  // Priority analysis
  const highPriorityPending = pendingTasks.filter(t => t.priority === 'high');
  const overdueTasks = pendingTasks.filter(t => new Date(t.dueDate) < now);
  
  // Task dependencies and blockers
  const blockerTasks = pendingTasks.filter(t => 
    t.tags?.includes('blocker') || t.priority === 'high'
  );
  
  // Calculate velocity
  const lastWeekCompleted = completedTasks.filter(t => {
    const completedDate = new Date(t.completedAt);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return completedDate > weekAgo;
  }).length;
  
  // Workload distribution
  const tasksByDay = pendingTasks.reduce((acc, task) => {
    const day = new Date(task.dueDate).toLocaleDateString();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  
  const overloadedDays = Object.entries(tasksByDay)
    .filter(([, count]) => count > 3)
    .map(([day]) => day);
  
  return {
    peakHours,
    highPriorityPending,
    overdueTasks,
    blockerTasks,
    velocity: lastWeekCompleted,
    overloadedDays,
    completionRate: Math.round((completedTasks.length / tasks.length) * 100),
    avgTasksPerDay: Math.round(lastWeekCompleted / 7 * 10) / 10,
  };
};

// Generate intelligent recommendations
const generateRecommendations = (analysis, currentHour) => {
  const recommendations = [];
  
  // Overdue tasks warning
  if (analysis.overdueTasks.length > 0) {
    recommendations.push({
      id: 'overdue',
      type: 'warning',
      priority: 'critical',
      title: 'Overdue Tasks Need Attention',
      description: `You have ${analysis.overdueTasks.length} overdue task${analysis.overdueTasks.length > 1 ? 's' : ''}. Consider rescheduling or completing them today.`,
      action: {
        label: 'View Overdue Tasks',
        handler: () => console.log('View overdue tasks'),
      },
      tasks: analysis.overdueTasks,
      icon: AlertTriangle,
      color: colors.error,
    });
  }
  
  // Peak productivity suggestion
  if (analysis.peakHours.length > 0) {
    const isPeakHour = analysis.peakHours.includes(currentHour);
    if (isPeakHour) {
      recommendations.push({
        id: 'peak-hour',
        type: 'suggestion',
        priority: 'high',
        title: 'You\'re in Your Peak Hours!',
        description: 'Historical data shows you\'re most productive now. Focus on high-priority or complex tasks.',
        action: {
          label: 'Start High-Priority Task',
          handler: () => console.log('Start high priority'),
        },
        icon: Zap,
        color: colors.primary[600],
      });
    }
  }
  
  // Blocker resolution
  if (analysis.blockerTasks.length > 0) {
    recommendations.push({
      id: 'blockers',
      type: 'suggestion',
      priority: 'high',
      title: 'Resolve Blocking Tasks First',
      description: `Complete "${analysis.blockerTasks[0].title}" to unblock other work and maintain momentum.`,
      action: {
        label: 'Focus on Blocker',
        handler: () => console.log('Focus on blocker'),
      },
      tasks: [analysis.blockerTasks[0]],
      icon: Target,
      color: colors.warning,
    });
  }
  
  // Workload balancing
  if (analysis.overloadedDays.length > 0) {
    recommendations.push({
      id: 'workload',
      type: 'insight',
      priority: 'medium',
      title: 'Workload Imbalance Detected',
      description: `Some days have too many tasks scheduled. Consider redistributing tasks for better balance.`,
      action: {
        label: 'Balance Workload',
        handler: () => console.log('Balance workload'),
      },
      icon: BarChart3,
      color: colors.info,
    });
  }
  
  // Velocity insight
  recommendations.push({
    id: 'velocity',
    type: 'metric',
    priority: 'low',
    title: 'Weekly Velocity Tracking',
    description: `You completed ${analysis.velocity} tasks this week, averaging ${analysis.avgTasksPerDay} per day. ${
      analysis.velocity > 20 ? 'Great momentum!' : 'Room for improvement.'
    }`,
    action: {
      label: 'View Trends',
      handler: () => console.log('View trends'),
    },
    icon: TrendingUp,
    color: colors.success,
  });
  
  return recommendations.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

// Individual Recommendation Card
const RecommendationCard = ({ recommendation, onAction, onFeedback, isActive }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(null);
  
  const handleFeedback = (isPositive) => {
    setFeedbackGiven(isPositive);
    onFeedback(recommendation.id, isPositive);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-xl border transition-all cursor-pointer ${
        isActive 
          ? 'border-purple-300 bg-purple-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${recommendation.color}20` }}
        >
          <recommendation.icon 
            className="w-5 h-5" 
            style={{ color: recommendation.color }} 
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <h4 className="text-sm font-semibold text-gray-900">
              {recommendation.title}
            </h4>
            
            {/* Feedback buttons */}
            <div className="flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeedback(true);
                }}
                className={`p-1 rounded ${
                  feedbackGiven === true 
                    ? 'bg-green-100 text-green-600' 
                    : 'hover:bg-gray-100 text-gray-400'
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeedback(false);
                }}
                className={`p-1 rounded ${
                  feedbackGiven === false 
                    ? 'bg-red-100 text-red-600' 
                    : 'hover:bg-gray-100 text-gray-400'
                }`}
              >
                <ThumbsDown className="w-3 h-3" />
              </motion.button>
            </div>
          </div>
          
          <p className="text-xs text-gray-600 mb-3">
            {recommendation.description}
          </p>
          
          {/* Related tasks preview */}
          {recommendation.tasks && recommendation.tasks.length > 0 && (
            <div className="mb-3 space-y-1">
              {recommendation.tasks.slice(0, 2).map(task => {
                const priorityColor = getPriorityColor(task.priority);
                return (
                  <div 
                    key={task.id} 
                    className="flex items-center gap-2 text-xs bg-gray-50 p-2 rounded"
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: priorityColor.main }}
                    />
                    <span className="text-gray-700 truncate">{task.title}</span>
                  </div>
                );
              })}
            </div>
          )}
          
          <motion.button
            whileHover={{ x: 2 }}
            onClick={() => onAction(recommendation)}
            className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700"
          >
            {recommendation.action.label}
            <ChevronRight className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Main AI Task Assistant Component
const AITaskAssistant = ({ tasks, activities, onTaskAction }) => {
  const [activeRecommendation, setActiveRecommendation] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});
  const currentHour = new Date().getHours();
  
  // Generate recommendations based on task analysis
  const recommendations = useMemo(() => {
    const analysis = analyzeTaskPatterns(tasks, activities);
    return generateRecommendations(analysis, currentHour);
  }, [tasks, activities, currentHour]);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    setActiveRecommendation(0);
  };
  
  const handleFeedback = (recommendationId, isPositive) => {
    setFeedbackData(prev => ({
      ...prev,
      [recommendationId]: isPositive
    }));
    
    // In a real app, send feedback to backend for ML model improvement
    console.log(`Feedback for ${recommendationId}: ${isPositive ? 'positive' : 'negative'}`);
  };
  
  const handleAction = (recommendation) => {
    if (recommendation.action.handler) {
      recommendation.action.handler();
    }
    if (onTaskAction) {
      onTaskAction(recommendation);
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-xl border border-purple-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-purple-100 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Brain className="w-5 h-5 text-purple-600" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="absolute inset-0"
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
              </motion.div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">AI Task Assistant</h3>
          </div>
          
          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 text-purple-600 ${
              isRefreshing ? 'animate-spin' : ''
            }`} />
          </motion.button>
        </div>
      </div>
      
      <div className="p-6">
        {/* Recommendation Navigation */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Smart Recommendations
            </span>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
              {recommendations.length} insights
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            {recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveRecommendation(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeRecommendation === index
                    ? 'w-6 bg-purple-600'
                    : 'bg-purple-300 hover:bg-purple-400'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Active Recommendation */}
        <AnimatePresence mode="wait">
          <RecommendationCard
            key={recommendations[activeRecommendation]?.id}
            recommendation={recommendations[activeRecommendation]}
            onAction={handleAction}
            onFeedback={handleFeedback}
            isActive={true}
          />
        </AnimatePresence>
        
        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Productivity', value: `${analyzeTaskPatterns(tasks, activities).completionRate}%`, icon: TrendingUp },
            { label: 'This Week', value: analyzeTaskPatterns(tasks, activities).velocity, icon: CheckCircle2 },
            { label: 'Daily Avg', value: analyzeTaskPatterns(tasks, activities).avgTasksPerDay, icon: Calendar }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-3 bg-white/60 rounded-lg">
              <stat.icon className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AITaskAssistant;