import * as React from "react"
import { cn, getInitials, generateColorFromString } from "@/lib/utils"

/**
 * Avatar - Display user avatar với fallback to initials
 * 
 * @example
 * <Avatar src="/avatar.jpg" alt="John Doe" />
 * <Avatar name="Alice Smith" /> // Shows "AS"
 */
export const Avatar = React.forwardRef(
  ({ className, src, alt, name, size = "default", ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)
    
    const sizeClasses = {
      sm: "h-8 w-8 text-xs",
      default: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-lg",
    }
    
    const showInitials = !src || imageError
    const initials = name ? getInitials(name) : "??"
    const bgColor = name ? generateColorFromString(name) : "#6366f1"
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showInitials ? (
          <div
            className="flex h-full w-full items-center justify-center font-medium text-white"
            style={{ backgroundColor: bgColor }}
          >
            {initials}
          </div>
        ) : (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"
