// src/components/task/TaskCard.jsx
// Individual task card with all details and actions
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useHaptic from '@/hooks/useHaptic';
import './TaskCard.css';

const TaskCard = ({ task, onToggle, onEdit, onDelete, animateMount = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const haptic = useHaptic();

  const getPriorityClass = (priority) => {
    const classes = {
      high: 'priority--high',
      medium: 'priority--medium',
      low: 'priority--low'
    };
    return classes[priority] || '';
  };

  const getPriorityDotClass = (priority) => {
    const classes = {
      high: 'priority-dot--high',
      medium: 'priority-dot--medium',
      low: 'priority-dot--low',
    };
    return classes[priority] || '';
  };

  const parseDate = (d) => (d?.toDate ? d.toDate() : (d?.seconds ? new Date(d.seconds * 1000) : (d ? new Date(d) : null)))
  const due = parseDate(task.dueDate)
  const now = new Date()
  const isOverdue = !!due && due < now && !task.completed
  const isSoon = !!due && !isOverdue && (due.getTime() - now.getTime()) <= 24 * 60 * 60 * 1000 && !task.completed

  const formatDate = (date) => {
    if (!date) return 'No due date';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const truncateTitle = (title) => {
    return title.length > 60 ? `${title.substring(0, 60)}...` : title;
  };

  const commentsCount = Array.isArray(task.comments) ? task.comments.length : (task.commentsCount || 0);
  const attachmentsCount = Array.isArray(task.attachments) ? task.attachments.length : (task.attachmentsCount || 0);

  return (
    <motion.div
      className={`task-card ${task.completed ? 'task-card--completed' : ''} ${isOverdue ? 'task-card--overdue' : ''}`}
      initial={animateMount ? { opacity: 0, y: 20 } : false}
      animate={animateMount ? { opacity: 1, y: 0 } : false}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="task-card__main">
        {/* Checkbox */}
        <label className="task-card__checkbox-wrap">
          <input
            type="checkbox"
            checked={task.completed || false}
            onChange={() => {
              if (!task.completed) {
                haptic.heavy(); // completing a task
              } else {
                haptic.light(); // uncheck
              }
              onToggle(task.id);
            }}
            className="task-card__checkbox-input"
            aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <motion.span
            className={`task-card__checkbox ${task.completed ? 'is-checked' : ''}`}
            whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            aria-hidden="true"
          >
            <svg className="checkbox__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d="M5 12l4 4L19 7"
                initial={false}
                animate={{ pathLength: task.completed ? 1 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeOut' }}
              />
            </svg>
          </motion.span>
        </label>

        {/* Content */}
        <div className="task-card__content">
          {/* Header: Title + Actions */}
          <div className="task-card__header">
            <motion.h4
              className="task-card__title"
              onClick={() => onEdit(task.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onEdit(task.id);
                }
              }}
              initial={false}
              animate={{ opacity: task.completed ? 0.6 : 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            >
              {task.priority && (
                <span className={`task-card__priority-dot ${getPriorityDotClass(task.priority)}`} aria-hidden="true" />
              )}
              {truncateTitle(task.title)}
              <motion.span
                className="task-card__strike"
                initial={false}
                animate={{ scaleX: task.completed ? 1 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: 'easeOut' }}
                aria-hidden="true"
              />
            </motion.h4>

            {/* Actions Menu */}
            <div className="task-card__actions">
              {task.completed && (
                <button
                  className="task-card__undo-btn"
                  onClick={() => onToggle(task.id)}
                  aria-label="Undo complete"
                  title="Undo"
                >
                  ↩️
                </button>
              )}
              <button
                className="task-card__menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Task actions"
                aria-expanded={isMenuOpen}
              >
                ⋮
              </button>

              {isMenuOpen && (
                <motion.div
                  className="task-card__menu"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  <button
                    onClick={() => {
                      onEdit(task.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(task.id);
                      setIsMenuOpen(false);
                    }}
                    className="task-card__menu-delete"
                  >
                    🗑️ Delete
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Inline Meta */}
          <div className="task-card__meta">
            <span className={`task-card__meta-item task-card__due ${isOverdue ? 'task-card__due--overdue' : ''} ${isSoon ? 'task-card__due--soon' : ''}`}>
              📅 {formatDate(task.dueDate)}
            </span>
            {task.assignee && (
              <span className="task-card__meta-item task-card__assignee" title="Assignee">
                👤 {task.assignee}
              </span>
            )}
            {commentsCount > 0 && (
              <span className="task-card__meta-item" title="Comments">
                💬 {commentsCount}
              </span>
            )}
            {attachmentsCount > 0 && (
              <span className="task-card__meta-item" title="Attachments">
                📎 {attachmentsCount}
              </span>
            )}
            {task.project && (
              <span className="task-card__meta-item task-card__project" title="Project">
                📁 {task.project}
              </span>
            )}
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="task-card__tags">
              {task.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="task-card__tag">
                  #{tag}
                </span>
              ))}
              {task.tags.length > 3 && (
                <span className="task-card__tag-more">
                  +{task.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default TaskCard;
