// src/components/dashboard/FilterPanel.jsx
// Advanced filters with progressive disclosure
import React from 'react';
import { motion } from 'framer-motion';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  const priorities = ['high', 'medium', 'low'];
  const statuses = ['all', 'active', 'completed', 'overdue'];
  const projects = ['Website Redesign', 'Mobile App', 'Marketing Campaign', 'Backend API'];

  return (
    <motion.div
      className="filter-panel"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="filter-panel__header">
        <h3>Advanced Filters</h3>
        <button
          className="filter-panel__reset"
          onClick={onReset}
          aria-label="Reset all filters"
        >
          Reset All
        </button>
      </div>

      <div className="filter-panel__body">
        {/* Status Filter */}
        <div className="filter-group">
          <label className="filter-group__label" id="status-filter-label">
            Status
          </label>
          <div className="filter-group__options" role="group" aria-labelledby="status-filter-label">
            {statuses.map((status) => (
              <button
                key={status}
                className={`filter-option ${filters.status === status ? 'active' : ''}`}
                onClick={() => onFilterChange({ ...filters, status })}
                aria-pressed={filters.status === status}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div className="filter-group">
          <label className="filter-group__label" id="priority-filter-label">
            Priority
          </label>
          <div className="filter-group__options" role="group" aria-labelledby="priority-filter-label">
            <button
              className={`filter-option ${filters.priority === 'all' ? 'active' : ''}`}
              onClick={() => onFilterChange({ ...filters, priority: 'all' })}
              aria-pressed={filters.priority === 'all'}
            >
              All
            </button>
            {priorities.map((priority) => (
              <button
                key={priority}
                className={`filter-option filter-option--${priority} ${
                  filters.priority === priority ? 'active' : ''
                }`}
                onClick={() => onFilterChange({ ...filters, priority })}
                aria-pressed={filters.priority === priority}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Project Filter */}
        <div className="filter-group">
          <label className="filter-group__label" htmlFor="project-select">
            Project
          </label>
          <select
            id="project-select"
            className="filter-select"
            value={filters.project || 'all'}
            onChange={(e) => onFilterChange({ ...filters, project: e.target.value })}
          >
            <option value="all">All Projects</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="filter-group">
          <label className="filter-group__label">Due Date Range</label>
          <div className="filter-date-range">
            <input
              type="date"
              className="filter-date"
              placeholder="From"
              value={filters.dateFrom || ''}
              onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value })}
              aria-label="Date from"
            />
            <span className="filter-date-separator">to</span>
            <input
              type="date"
              className="filter-date"
              placeholder="To"
              value={filters.dateTo || ''}
              onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value })}
              aria-label="Date to"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
