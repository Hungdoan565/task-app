import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  MoreHorizontal, Clock, Calendar, MessageSquare, Paperclip,
  Flag, Tag, User, Plus, Filter, Search, ChevronDown,
  CheckCircle2, Circle, Timer, AlertTriangle
} from 'lucide-react';
import { getPriorityColor, getStatusColor, colors } from '../lib/designSystem';

// Sortable Task Card
const KanbanTaskCard = ({ task, isOverlay }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: isOverlay });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColor = getPriorityColor(task.priority);
  const daysUntil = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysUntil < 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg border border-gray-200 p-4 cursor-move hover:shadow-lg transition-shadow ${
        isDragging ? 'shadow-2xl' : 'shadow-sm'
      }`}
    >
      {/* Priority indicator */}
      <div 
        className="absolute top-0 left-0 w-1 h-full rounded-l-lg"
        style={{ backgroundColor: priorityColor.main }}
      />
      
      <div className="ml-2">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 flex-1">
            {task.title}
          </h4>
          <button className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
            {task.description}
          </p>
        )}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.slice(0, 2).map((tag, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{task.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Subtasks progress */}
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Subtasks</span>
              <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full transition-all"
                style={{ 
                  width: `${(task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100}%` 
                }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {/* Due date */}
            <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-600' : ''}`}>
              {isOverdue ? <AlertTriangle className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
              <span>
                {isOverdue 
                  ? `${Math.abs(daysUntil)} days overdue`
                  : daysUntil === 0 
                  ? 'Due today' 
                  : daysUntil === 1 
                  ? 'Tomorrow'
                  : `${daysUntil} days`
                }
              </span>
            </div>

            {/* Comments */}
            {task.comments > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                <span>{task.comments}</span>
              </div>
            )}
          </div>

          {/* Assignee */}
          {task.assignee && (
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-xs font-medium text-purple-600">
                {task.assignee.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Kanban Column
const KanbanColumn = ({ column, tasks, onAddTask }) => {
  const statusColor = getStatusColor(column.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex flex-col bg-gray-50 rounded-xl h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Column Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: statusColor.main }}
            />
            <h3 className="font-semibold text-gray-900">{column.title}</h3>
            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
              {tasks.length}
            </span>
          </div>
          
          <button className="p-1 hover:bg-gray-200 rounded">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Column limit indicator */}
        {column.limit && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>WIP Limit</span>
              <span className={tasks.length > column.limit ? 'text-red-600 font-medium' : ''}>
                {tasks.length}/{column.limit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className={`h-1 rounded-full transition-all ${
                  tasks.length > column.limit ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min((tasks.length / column.limit) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Tasks Container */}
      <div className="flex-1 p-4 overflow-y-auto">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group"
                >
                  <KanbanTaskCard task={task} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>

        {/* Add Task Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddTask(column.id)}
          className={`w-full mt-3 p-3 border-2 border-dashed rounded-lg text-sm font-medium transition-all ${
            isHovered 
              ? 'border-gray-300 text-gray-700 bg-white' 
              : 'border-transparent text-gray-500'
          }`}
        >
          <Plus className="w-4 h-4 inline-block mr-1" />
          Add Task
        </motion.button>
      </div>
    </div>
  );
};

// Main Kanban View Component
const KanbanView = ({ tasks, onTaskUpdate }) => {
  const [tasksByStatus, setTasksByStatus] = useState({
    todo: tasks.filter(t => t.status === 'todo'),
    doing: tasks.filter(t => t.status === 'doing'),
    done: tasks.filter(t => t.status === 'done'),
  });
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { id: 'todo', title: 'To Do', limit: null },
    { id: 'doing', title: 'In Progress', limit: 3 },
    { id: 'done', title: 'Completed', limit: null },
  ];

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeTask = findTaskById(active.id);
    const overColumn = findColumnByTaskId(over.id) || over.id;

    if (activeTask && overColumn) {
      const sourceColumn = findColumnByTaskId(active.id);
      
      if (sourceColumn !== overColumn) {
        // Move between columns
        setTasksByStatus(prev => {
          const sourceTasks = [...prev[sourceColumn]];
          const destTasks = [...prev[overColumn]];
          
          const taskIndex = sourceTasks.findIndex(t => t.id === active.id);
          const [movedTask] = sourceTasks.splice(taskIndex, 1);
          
          movedTask.status = overColumn;
          destTasks.push(movedTask);
          
          return {
            ...prev,
            [sourceColumn]: sourceTasks,
            [overColumn]: destTasks,
          };
        });
        
        // Update task status
        if (onTaskUpdate) {
          onTaskUpdate(active.id, { status: overColumn });
        }
      } else {
        // Reorder within column
        setTasksByStatus(prev => {
          const columnTasks = [...prev[sourceColumn]];
          const oldIndex = columnTasks.findIndex(t => t.id === active.id);
          const newIndex = columnTasks.findIndex(t => t.id === over.id);
          
          return {
            ...prev,
            [sourceColumn]: arrayMove(columnTasks, oldIndex, newIndex),
          };
        });
      }
    }
    
    setActiveId(null);
  };

  const findTaskById = (id) => {
    for (const status of Object.keys(tasksByStatus)) {
      const task = tasksByStatus[status].find(t => t.id === id);
      if (task) return task;
    }
    return null;
  };

  const findColumnByTaskId = (id) => {
    for (const [status, statusTasks] of Object.entries(tasksByStatus)) {
      if (statusTasks.find(t => t.id === id)) {
        return status;
      }
    }
    return null;
  };

  const handleAddTask = (columnId) => {
    console.log('Add task to column:', columnId);
    // Implementation for adding new task
  };

  const activeTask = activeId ? findTaskById(activeId) : null;

  return (
    <div className="h-full flex flex-col bg-gray-100 rounded-xl p-6">
      {/* Kanban Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Kanban Board</h2>
          <p className="text-sm text-gray-600 mt-1">Drag tasks between columns to update their status</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4 inline-block mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
            <Plus className="w-4 h-4 inline-block mr-2" />
            New Task
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksByStatus[column.id] || []}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
        
        <DragOverlay>
          {activeTask && (
            <div className="rotate-3 shadow-2xl">
              <KanbanTaskCard task={activeTask} isOverlay />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanView;