import * as React from "react"
import { cn, formatDate, isOverdue, isToday } from "@/lib/utils"
import { Avatar } from "@/components/ui/Avatar"
import { PriorityBadge } from "@/components/task/PriorityBadge"
import { MessageSquare, Paperclip, Calendar } from "lucide-react"

/**
 * TaskCard - Notion-inspired task card cho Kanban board
 * 
 * @param {object} task - Task data object
 * @param {boolean} isDragging - Is currently being dragged
 * @param {function} onClick - Click handler
 * 
 * @example
 * <TaskCard 
 *   task={taskData}
 *   onClick={() => handleTaskClick(task.id)}
 * />
 */
export function TaskCard({ 
  task, 
  isDragging = false,
  onClick,
  className,
  ...props 
}) {
  const {
    title,
    description,
    priority = "low",
    dueDate,
    assignedTo = [],
    commentCount = 0,
    attachmentCount = 0,
  } = task || {}
  
  let dueDateObj = null
  if (dueDate?.toDate) dueDateObj = dueDate.toDate()
  else if (dueDate?.seconds) dueDateObj = new Date(dueDate.seconds * 1000)
  else if (typeof dueDate === 'number' || typeof dueDate === 'string') dueDateObj = new Date(dueDate)
  const overdue = dueDateObj ? isOverdue(dueDateObj) : false
  const today = dueDateObj ? isToday(dueDateObj) : false
  
  return (
    <div
      className={cn(
        "task-card group",
        isDragging && "task-card-dragging",
        overdue && "ring-1 ring-destructive",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Title */}
      <h4 className="text-notion font-medium mb-2 line-clamp-2">
        {title || "Untitled Task"}
      </h4>
      
      {/* Description preview (if exists) */}
      {description && (
        <p className="text-notion-secondary text-sm mb-3 line-clamp-2">
          {description}
        </p>
      )}
      
      {/* Metadata row */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        {/* Priority badge */}
        <PriorityBadge priority={priority} showLabel={false} />
        
        {/* Due date */}
        {dueDateObj && (
          <span className={cn(
            "flex items-center gap-1",
            overdue && "text-destructive font-medium",
            today && "text-primary font-medium",
            !overdue && !today && "text-notion-secondary"
          )}>
            <Calendar className="h-3 w-3" />
            {today ? "Today" : formatDate(dueDateObj, "short")}
          </span>
        )}
        
        {/* Assigned users */}
        {assignedTo.length > 0 && (
          <div className="flex -space-x-1">
            {assignedTo.slice(0, 3).map((user, index) => (
              <Avatar
                key={index}
                name={user.name}
                src={user.avatar}
                size="sm"
                className="ring-2 ring-background"
              />
            ))}
            {assignedTo.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium ring-2 ring-background">
                +{assignedTo.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Actions row (comments & attachments) */}
      {(commentCount > 0 || attachmentCount > 0) && (
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50 text-notion-tertiary">
          {commentCount > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <MessageSquare className="h-3.5 w-3.5" />
              {commentCount}
            </span>
          )}
          {attachmentCount > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <Paperclip className="h-3.5 w-3.5" />
              {attachmentCount}
            </span>
          )}
        </div>
      )}
      
      {/* Hover actions (hidden by default) */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="h-6 w-6 rounded hover:bg-muted flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation()
            // TODO: Open quick menu
          }}
        >
          <span className="text-lg">⋯</span>
        </button>
      </div>
    </div>
  )
}
