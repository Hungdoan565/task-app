import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"

/**
 * Column - Kanban column component (Notion-inspired)
 * 
 * @param {string} title - Column title (e.g., "To Do", "In Progress")
 * @param {array} tasks - Array of task objects
 * @param {function} onAddTask - Handler for adding new task
 * @param {boolean} isOver - Is drag over this column
 * 
 * @example
 * <Column 
 *   title="To Do"
 *   tasks={todoTasks}
 *   onAddTask={handleAddTask}
 * >
 *   {children}
 * </Column>
 */
export function Column({ 
  title,
  tasks = [],
  onAddTask,
  isOver = false,
  children,
  className,
  ...props 
}) {
  const taskCount = tasks.length
  
  return (
    <div
      className={cn(
        "kanban-column flex flex-col",
        isOver && "drop-zone-active",
        className
      )}
      {...props}
    >
      {/* Column header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-notion">
            {title}
          </h3>
          <span className="text-xs font-medium text-notion-tertiary bg-muted px-2 py-0.5 rounded-full">
            {taskCount}
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-muted"
          onClick={onAddTask}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Tasks container */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {children}
        
        {/* Empty state */}
        {taskCount === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-sm text-notion-tertiary">
              No tasks yet
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={onAddTask}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add task
            </Button>
          </div>
        )}
      </div>
      
      {/* Add task button at bottom */}
      {taskCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 w-full justify-start text-notion-secondary hover:text-notion"
          onClick={onAddTask}
        >
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      )}
    </div>
  )
}
