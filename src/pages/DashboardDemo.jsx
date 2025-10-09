import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout, Grid3X3, BarChart3, Brain, Palette, Smartphone,
  Monitor, Tablet, Check, ArrowRight, Sparkles, KanbanSquare
} from 'lucide-react';
import ImprovedDashboard from '../components/ImprovedDashboard';
import KanbanView from '../components/KanbanView';
import TaskAnalytics from '../components/TaskAnalytics';
import { colors } from '../lib/designSystem';

// Mock data for demo
const mockTasks = [
  {
    id: '1',
    title: 'Design new dashboard layout',
    description: 'Create high-fidelity mockups for the new task management dashboard',
    status: 'done',
    priority: 'high',
    dueDate: '2025-10-08',
    assignee: { name: 'HD', fullName: 'Hung Doan' },
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
    assignee: { name: 'HD', fullName: 'Hung Doan' },
    tags: ['Backend', 'Security', 'blocker'],
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
    assignee: { name: 'HD', fullName: 'Hung Doan' },
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
    assignee: { name: 'HD', fullName: 'Hung Doan' },
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
    assignee: { name: 'HD', fullName: 'Hung Doan' },
    tags: ['Testing', 'Mobile'],
    comments: 8,
    subtasks: [],
    completed: true,
    createdAt: '2025-10-05T10:00:00Z',
    completedAt: '2025-10-07T16:00:00Z'
  }
];

const DashboardDemo = () => {
  const [activeView, setActiveView] = useState('overview');
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  
  const improvements = [
    {
      icon: Layout,
      title: '12-Column Grid System',
      description: 'Modular layout with better space utilization and visual hierarchy'
    },
    {
      icon: Palette,
      title: 'Consistent Design System',
      description: 'WCAG-compliant colors, typography, and spacing tokens'
    },
    {
      icon: Brain,
      title: 'Intelligent AI Assistant',
      description: 'Real-time insights based on task patterns and productivity data'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Interactive charts for tracking trends and performance metrics'
    },
    {
      icon: KanbanSquare,
      title: 'Multiple View Modes',
      description: 'Switch between dashboard, Kanban, and analytics views'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Responsive design with touch-friendly interactions'
    }
  ];
  
  const deviceSizes = {
    mobile: { width: 375, label: 'Mobile' },
    tablet: { width: 768, label: 'Tablet' },
    desktop: { width: '100%', label: 'Desktop' }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              TaskFlow Dashboard 2.0
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              A complete redesign focused on clarity, efficiency, and user delight.
              Experience the difference with our improved task management interface.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => window.open('/dashboard-improved', '_blank')}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                View Live Demo
              </button>
              <button className="px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors">
                View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Improvements Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Key Improvements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {improvements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* View Mode Selector */}
      <div className="border-t border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">View Mode:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { id: 'overview', label: 'Dashboard' },
                  { id: 'kanban', label: 'Kanban' },
                  { id: 'analytics', label: 'Analytics' }
                ].map(view => (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeView === view.id
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">Device:</span>
              <div className="flex gap-2">
                {Object.entries(deviceSizes).map(([key, device]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDevice(key)}
                    className={`p-2 rounded-lg transition-all ${
                      selectedDevice === key
                        ? 'bg-purple-100 text-purple-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {key === 'mobile' && <Smartphone className="w-5 h-5" />}
                    {key === 'tablet' && <Tablet className="w-5 h-5" />}
                    {key === 'desktop' && <Monitor className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Demo Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div
            className="mx-auto transition-all duration-300"
            style={{
              width: selectedDevice === 'desktop' ? '100%' : deviceSizes[selectedDevice].width,
              maxWidth: '100%'
            }}
          >
            <AnimatePresence mode="wait">
              {activeView === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <ImprovedDashboard />
                </motion.div>
              )}
              
              {activeView === 'kanban' && (
                <motion.div
                  key="kanban"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-[800px]"
                >
                  <KanbanView tasks={mockTasks} onTaskUpdate={console.log} />
                </motion.div>
              )}
              
              {activeView === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6"
                >
                  <TaskAnalytics tasks={mockTasks} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Before/After Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Before & After Comparison
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Before</h3>
            <div className="bg-red-50 rounded-xl p-6 space-y-3">
              {[
                'Visual clutter and inconsistent hierarchy',
                'Static AI recommendations without context',
                'Basic list view only',
                'Inconsistent color usage',
                'Poor mobile experience'
              ].map((issue, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-xs">✕</span>
                  </div>
                  <span className="text-gray-700">{issue}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">After</h3>
            <div className="bg-green-50 rounded-xl p-6 space-y-3">
              {[
                'Clean, organized layout with clear hierarchy',
                'AI-powered insights based on real data',
                'Multiple views: Dashboard, Kanban, Analytics',
                'Consistent design system with WCAG compliance',
                'Fully responsive with mobile-first approach'
              ].map((improvement, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{improvement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the New TaskFlow?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who are already more productive with our redesigned dashboard.
          </p>
          <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center gap-2">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardDemo;