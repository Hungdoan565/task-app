import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Activity, TrendingUp, Clock, CheckCircle2, Zap,
  Calendar, Target, Brain, Sparkles, ChevronRight,
  Plus, Filter, BarChart3, Users, Flag, Timer,
  ArrowUpRight, ArrowDownRight, Lightbulb, Award
} from 'lucide-react';
import { 
  spatialColors, elevation, spatialTypography, physics,
  components, spatial, glass, lighting
} from '../lib/geniusDesignSystem';
import { useResponsive } from '../hooks/useAccessibility';

// Neumorphic Stats Card with floating numbers
const SpatialStatsCard = ({ title, value, trend, icon: Icon, color, insight }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        scale: isPressed ? 0.98 : isHovered ? 1.02 : 1,
      }}
      transition={physics.smooth}
      className="relative"
    >
      <div
        className="relative p-8 rounded-3xl overflow-hidden cursor-pointer"
        style={{
          backgroundColor: spatialColors.space.float,
          boxShadow: isPressed 
            ? elevation.pressed.boxShadow
            : isHovered 
            ? elevation.hover.boxShadow
            : elevation.float.boxShadow,
          transform: isPressed 
            ? elevation.pressed.transform
            : isHovered
            ? elevation.hover.transform
            : elevation.float.transform,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Background gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at top left, ${color}20, transparent 70%)`,
          }}
        />
        
        {/* Floating icon */}
        <motion.div
          animate={{ 
            y: isHovered ? -5 : 0,
            rotate: isHovered ? 5 : 0,
          }}
          transition={physics.spring}
          className="absolute top-6 right-6"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(20px)',
          }}
        >
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(${lighting.angle}, ${color}15, ${color}30)`,
              boxShadow: `
                -4px -4px 12px rgba(255, 255, 255, 0.8),
                4px 4px 12px ${color}20,
                inset 1px 1px 2px rgba(255, 255, 255, 0.4)
              `,
            }}
          >
            <Icon className="w-8 h-8" style={{ color }} />
          </div>
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 
            className="text-sm font-semibold uppercase tracking-wider mb-3"
            style={{ color: spatialColors.text.tertiary }}
          >
            {title}
          </h3>
          
          {/* Prominent value */}
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={physics.bounce}
            className="mb-4"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
          >
            <span 
              className="font-black"
              style={{
                ...spatialTypography.display,
                fontSize: '3.5rem',
                background: `linear-gradient(135deg, ${spatialColors.text.primary} 0%, ${color} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1))',
              }}
            >
              {value}
            </span>
          </motion.div>
          
          {/* Trend indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {trend >= 0 ? (
                <ArrowUpRight className="w-5 h-5 text-green-600" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-600" />
              )}
              <span 
                className="font-bold"
                style={{ color: trend >= 0 ? spatialColors.success.base : spatialColors.danger.base }}
              >
                {Math.abs(trend)}%
              </span>
            </div>
            <span style={{ ...spatialTypography.small, color: spatialColors.text.secondary }}>
              vs last week
            </span>
          </div>
          
          {/* AI Insight bubble */}
          {insight && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="absolute -bottom-2 left-0 right-0 p-3 rounded-xl"
              style={{
                ...glass.light,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <p style={{ ...spatialTypography.tiny, color: spatialColors.text.secondary }}>
                  {insight}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Task Priority Visual with depth
const TaskPriorityVisual = ({ tasks }) => {
  const priorities = {
    high: { count: 3, color: spatialColors.danger },
    medium: { count: 2, color: spatialColors.warning },
    low: { count: 1, color: spatialColors.primary },
  };
  
  return (
    <div 
      className="p-8 rounded-3xl"
      style={{
        backgroundColor: spatialColors.space.raised,
        boxShadow: elevation.float.boxShadow,
      }}
    >
      <h3 
        className="font-bold mb-6"
        style={{ ...spatialTypography.h3, color: spatialColors.text.primary }}
      >
        Task Distribution
      </h3>
      
      <div className="space-y-6">
        {Object.entries(priorities).map(([priority, { count, color }], index) => (
          <motion.div 
            key={priority}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-2">
              <span 
                className="font-semibold capitalize"
                style={{ ...spatialTypography.body, color: spatialColors.text.primary }}
              >
                {priority} Priority
              </span>
              <span 
                className="font-bold text-2xl"
                style={{ color: color.base }}
              >
                {count}
              </span>
            </div>
            
            {/* Progress bar with depth */}
            <div 
              className="relative h-4 rounded-full overflow-hidden"
              style={{
                backgroundColor: spatialColors.space.base,
                boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.05), inset -2px -2px 5px rgba(255, 255, 255, 0.9)',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(count / 6) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(${lighting.angle}, ${color.light}, ${color.base})`,
                  boxShadow: `0 0 20px ${color.shadow}`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Floating action button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-8 px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3"
        style={{
          background: `linear-gradient(${lighting.angle}, ${spatialColors.primary.light}, ${spatialColors.primary.base})`,
          color: spatialColors.text.inverse,
          boxShadow: elevation.float.boxShadow,
        }}
      >
        <Plus className="w-5 h-5" />
        Add New Task
      </motion.button>
    </div>
  );
};

// AI Assistant Card with spatial design
const SpatialAIAssistant = () => {
  const [activeInsight, setActiveInsight] = useState(0);
  const insights = [
    {
      icon: Target,
      title: "Focus on High-Impact Tasks",
      description: "Complete 'API Integration' to unblock 3 dependent tasks",
      action: "Start Now",
      priority: "high",
    },
    {
      icon: TrendingUp,
      title: "Productivity Peak Detected",
      description: "You're most productive between 9-11 AM. Schedule important work then.",
      action: "Optimize Schedule",
      priority: "medium",
    },
    {
      icon: Award,
      title: "Weekly Goal Progress",
      description: "You're 80% towards your weekly target. One more push!",
      action: "View Progress",
      priority: "low",
    },
  ];
  
  return (
    <div 
      className="relative p-8 rounded-3xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${spatialColors.space.float}, ${spatialColors.space.raised})`,
        boxShadow: elevation.hover.boxShadow,
      }}
    >
      {/* Animated background orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${spatialColors.primary.glow}, transparent)`,
          filter: 'blur(40px)',
        }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="w-8 h-8" style={{ color: spatialColors.primary.base }} />
          </motion.div>
          <h3 
            className="font-bold"
            style={{ ...spatialTypography.h3, color: spatialColors.text.primary }}
          >
            AI Assistant
          </h3>
        </div>
        
        {/* Insight cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeInsight}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: spatialColors.space.glow,
              boxShadow: elevation.raised.boxShadow,
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(${lighting.angle}, ${spatialColors.primary.light}20, ${spatialColors.primary.base}20)`,
                  boxShadow: elevation.raised.boxShadow,
                }}
              >
                {React.createElement(insights[activeInsight].icon, {
                  className: "w-6 h-6",
                  style: { color: spatialColors.primary.base }
                })}
              </div>
              
              <div className="flex-1">
                <h4 
                  className="font-semibold mb-2"
                  style={{ ...spatialTypography.body, color: spatialColors.text.primary }}
                >
                  {insights[activeInsight].title}
                </h4>
                <p 
                  className="mb-4"
                  style={{ ...spatialTypography.small, color: spatialColors.text.secondary }}
                >
                  {insights[activeInsight].description}
                </p>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 font-semibold"
                  style={{ color: spatialColors.primary.base }}
                >
                  {insights[activeInsight].action}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {insights.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveInsight(index)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: activeInsight === index 
                  ? spatialColors.primary.base 
                  : spatialColors.space.deep,
                width: activeInsight === index ? '24px' : '8px',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Activity Timeline with spatial depth
const SpatialTimeline = () => {
  const activities = [
    { time: '2m ago', action: 'Completed', item: 'Dashboard redesign', type: 'success' },
    { time: '1h ago', action: 'Started', item: 'API documentation', type: 'info' },
    { time: '3h ago', action: 'Reviewed', item: 'Code changes', type: 'warning' },
  ];
  
  return (
    <div 
      className="p-8 rounded-3xl"
      style={{
        backgroundColor: spatialColors.space.raised,
        boxShadow: elevation.float.boxShadow,
      }}
    >
      <h3 
        className="font-bold mb-6"
        style={{ ...spatialTypography.h3, color: spatialColors.text.primary }}
      >
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer"
            style={{
              backgroundColor: spatialColors.space.float,
              boxShadow: elevation.raised.boxShadow,
            }}
          >
            <div 
              className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
              style={{
                backgroundColor: activity.type === 'success' 
                  ? spatialColors.success.base 
                  : activity.type === 'warning'
                  ? spatialColors.warning.base
                  : spatialColors.primary.base,
                boxShadow: `0 0 10px ${
                  activity.type === 'success' 
                    ? spatialColors.success.shadow 
                    : activity.type === 'warning'
                    ? spatialColors.warning.shadow
                    : spatialColors.primary.shadow
                }`,
              }}
            />
            
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span 
                  className="font-semibold"
                  style={{ ...spatialTypography.body, color: spatialColors.text.primary }}
                >
                  {activity.action}
                </span>
                <span style={{ ...spatialTypography.small, color: spatialColors.text.secondary }}>
                  {activity.item}
                </span>
              </div>
              <span style={{ ...spatialTypography.tiny, color: spatialColors.text.tertiary }}>
                {activity.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main Genius Dashboard Component
const GeniusDashboard = () => {
  const { isMobile } = useResponsive();
  
  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      style={{ backgroundColor: spatialColors.space.base }}
    >
      {/* Ambient light effect */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${spatialColors.primary.light}10, transparent 50%),
                       radial-gradient(circle at 80% 80%, ${spatialColors.success.light}10, transparent 50%)`,
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 
            className="font-black mb-2"
            style={{ 
              ...spatialTypography.h1,
              background: `linear-gradient(135deg, ${spatialColors.text.primary} 0%, ${spatialColors.primary.base} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome back, Alex
          </h1>
          <p style={{ ...spatialTypography.body, color: spatialColors.text.secondary }}>
            Here's your productivity overview for today
          </p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SpatialStatsCard
            title="Tasks Completed"
            value="12"
            trend={25}
            icon={CheckCircle2}
            color={spatialColors.success.base}
            insight="You're 40% more productive than last week!"
          />
          <SpatialStatsCard
            title="In Progress"
            value="5"
            trend={-10}
            icon={Timer}
            color={spatialColors.warning.base}
            insight="Focus on completing 2 high-priority tasks today"
          />
          <SpatialStatsCard
            title="Team Velocity"
            value="87%"
            trend={15}
            icon={TrendingUp}
            color={spatialColors.primary.base}
            insight="Team is performing above average this sprint"
          />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SpatialAIAssistant />
            <TaskPriorityVisual tasks={[]} />
          </div>
          
          <div className="space-y-6">
            <SpatialTimeline />
            
            {/* Quick Actions */}
            <div 
              className="p-6 rounded-3xl"
              style={{
                backgroundColor: spatialColors.space.float,
                boxShadow: elevation.float.boxShadow,
              }}
            >
              <h3 
                className="font-bold mb-4"
                style={{ ...spatialTypography.body, color: spatialColors.text.primary }}
              >
                Quick Actions
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Plus, label: 'New Task' },
                  { icon: Users, label: 'Team View' },
                  { icon: Calendar, label: 'Calendar' },
                  { icon: BarChart3, label: 'Analytics' },
                ].map(({ icon: Icon, label }, index) => (
                  <motion.button
                    key={label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-2xl flex flex-col items-center gap-2"
                    style={{
                      backgroundColor: spatialColors.space.raised,
                      boxShadow: elevation.raised.boxShadow,
                    }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ color: spatialColors.primary.base }}
                    />
                    <span 
                      style={{ 
                        ...spatialTypography.tiny, 
                        color: spatialColors.text.secondary 
                      }}
                    >
                      {label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeniusDashboard;