import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DndContext, 
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { HiPlus, HiDotsVertical } from 'react-icons/hi'
import KanbanColumn from './KanbanColumn'
import KanbanCard from './KanbanCard'

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-500' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-amber-500' },
  { id: 'done', title: 'Done', color: 'bg-green-500' }
]

export default function KanbanBoard({ tasks, onUpdateTask, onCreateTask, onDeleteTask, onTaskClick }) {
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px threshold before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Group tasks by status
  const tasksByColumn = useMemo(() => {
    const grouped = {
      todo: [],
      in_progress: [],
      done: []
    }
    tasks.forEach(task => {
      const status = task.status || 'todo'
      if (grouped[status]) {
        grouped[status].push(task)
      }
    })
    return grouped
  }, [tasks])

  // Get counts
  const counts = useMemo(() => ({
    todo: tasksByColumn.todo.length,
    in_progress: tasksByColumn.in_progress.length,
    done: tasksByColumn.done.length
  }), [tasksByColumn])

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeTask = tasks.find(t => t.id === active.id)
    if (!activeTask) return

    // Get the column id from the over element
    let newStatus = activeTask.status

    // Check if dropped on a column
    if (over.id === 'todo' || over.id === 'in_progress' || over.id === 'done') {
      newStatus = over.id
    } else {
      // Dropped on another task - find its column
      const overTask = tasks.find(t => t.id === over.id)
      if (overTask) {
        newStatus = overTask.status
      }
    }

    // Update task status if changed
    if (newStatus !== activeTask.status) {
      onUpdateTask(activeTask.id, { status: newStatus })
    }
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const activeTask = activeId ? tasks.find(t => t.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-6 overflow-x-auto pb-4 min-h-[600px]">
        {COLUMNS.map(column => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            color={column.color}
            count={counts[column.id]}
            tasks={tasksByColumn[column.id]}
            onTaskClick={onTaskClick}
            onDeleteTask={onDeleteTask}
            onCreateTask={(title) => onCreateTask({ title, status: column.id })}
          />
        ))}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 opacity-80">
            <KanbanCard
              task={activeTask}
              isDragging={true}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
