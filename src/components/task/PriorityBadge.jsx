import * as React from "react"
import { cn } from "@/lib/utils"

const priorityConfig = {
  high: {
    label: "High",
    icon: "🔴",
    className: "priority-high",
  },
  medium: {
    label: "Medium",
    icon: "🟡",
    className: "priority-medium",
  },
  low: {
    label: "Low",
    icon: "⚪",
    className: "priority-low",
  },
}

/**
 * PriorityBadge - Display task priority với Notion-style
 * 
 * @param {string} priority - 'high', 'medium', or 'low'
 * @param {boolean} showIcon - Show emoji icon
 * @param {boolean} showLabel - Show text label
 * 
 * @example
 * <PriorityBadge priority="high" />
 * <PriorityBadge priority="medium" showIcon showLabel />
 */
export function PriorityBadge({ 
  priority = "low", 
  showIcon = true,
  showLabel = true,
  className,
  ...props 
}) {
  const config = priorityConfig[priority] || priorityConfig.low
  
  return (
    <span
      className={cn(
        "priority-badge",
        config.className,
        className
      )}
      {...props}
    >
      {showIcon && <span>{config.icon}</span>}
      {showLabel && <span className="uppercase">{config.label}</span>}
    </span>
  )
}
