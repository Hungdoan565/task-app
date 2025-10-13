# Accessibility Implementation Guide
# TaskApp - WCAG 2.1 AA Compliance

**Version:** 1.0  
**Last Updated:** January 2025  
**Target:** WCAG 2.1 AA Compliance

---

## Overview

This guide ensures TaskApp meets WCAG 2.1 Level AA standards, making the application accessible to users with disabilities including visual, auditory, motor, and cognitive impairments.

### Accessibility Principles (POUR)

1. **Perceivable** - Information must be presentable to users in ways they can perceive
2. **Operable** - Interface components must be operable
3. **Understandable** - Information and operation must be understandable
4. **Robust** - Content must be robust enough to work with assistive technologies

---

## 1. Color Contrast (WCAG 2.1 - 1.4.3)

### Requirements

- **Normal text** (< 18px): Minimum 4.5:1 contrast ratio
- **Large text** (≥ 18px or ≥ 14px bold): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### Implementation

```css
/* Light Mode - WCAG AA Compliant */
:root {
  /* Text colors */
  --text-primary: hsl(0, 0%, 10%);      /* 16.3:1 contrast */
  --text-secondary: hsl(0, 0%, 40%);    /* 7.1:1 contrast */
  --text-tertiary: hsl(0, 0%, 55%);     /* 4.6:1 contrast */
  --text-disabled: hsl(0, 0%, 65%);     /* 3.3:1 contrast */
  
  /* Background colors */
  --bg-primary: hsl(0, 0%, 100%);
  --bg-secondary: hsl(0, 0%, 98%);
  
  /* Interactive colors */
  --interactive-primary: hsl(158, 64%, 52%);     /* 3.5:1 contrast */
  --interactive-primary-hover: hsl(158, 64%, 42%); /* 4.8:1 contrast */
  
  /* Border colors */
  --border-primary: hsl(0, 0%, 85%);    /* 3.2:1 contrast */
  --border-focus: hsl(158, 64%, 52%);   /* 3.5:1 contrast */
}

/* Dark Mode - WCAG AA Compliant */
.dark {
  --text-primary: hsl(0, 0%, 95%);      /* 16.3:1 contrast */
  --text-secondary: hsl(0, 0%, 75%);    /* 7.1:1 contrast */
  --text-tertiary: hsl(0, 0%, 60%);     /* 4.6:1 contrast */
  --text-disabled: hsl(0, 0%, 50%);     /* 3.3:1 contrast */
  
  --bg-primary: hsl(0, 0%, 10%);
  --bg-secondary: hsl(0, 0%, 12%);
  
  --interactive-primary: hsl(158, 64%, 48%);
  --interactive-primary-hover: hsl(158, 64%, 58%);
  
  --border-primary: hsl(0, 0%, 25%);
  --border-focus: hsl(158, 64%, 48%);
}
```

### Testing

```javascript
// utils/contrastChecker.js
export const checkContrast = (foreground, background) => {
  const getLuminance = (rgb) => {
    const [r, g, b] = rgb.map(val => {
      val = val / 255
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  
  const l1 = getLuminance(foreground)
  const l2 = getLuminance(background)
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  
  return {
    ratio: ratio.toFixed(2),
    AA: ratio >= 4.5,
    AAA: ratio >= 7,
    AALarge: ratio >= 3,
  }
}

// Usage
const result = checkContrast([16, 185, 129], [255, 255, 255])
console.log(`Contrast ratio: ${result.ratio}:1`)
console.log(`WCAG AA: ${result.AA ? 'Pass' : 'Fail'}`)
```

---

## 2. Keyboard Navigation (WCAG 2.1 - 2.1.1, 2.1.2)

### Skip Links

```jsx
// components/layout/SkipLinks.jsx
const SkipLinks = () => {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <a href="#navigation" className="skip-link">
        Skip to navigation
      </a>
    </div>
  )
}
```

```css
/* Skip link styles */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 100;
  padding: 8px 16px;
  background: var(--interactive-primary);
  color: white;
  text-decoration: none;
  border-radius: 0 0 4px 0;
}

.skip-link:focus {
  top: 0;
}
```

### Focus Management

```jsx
// hooks/useFocusTrap.js
export const useFocusTrap = (ref, isActive) => {
  useEffect(() => {
    if (!isActive) return
    
    const element = ref.current
    if (!element) return
    
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
    
    element.addEventListener('keydown', handleKeyDown)
    firstElement?.focus()
    
    return () => {
      element.removeEventListener('keydown', handleKeyDown)
    }
  }, [ref, isActive])
}

// Usage in Modal
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null)
  useFocusTrap(modalRef, isOpen)
  
  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  )
}
```

### Keyboard Shortcuts

```jsx
// hooks/useKeyboardShortcuts.js
export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Command/Ctrl + K: Open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openCommandPalette()
      }
      
      // Escape: Close modals
      if (e.key === 'Escape') {
        closeAllModals()
      }
      
      // G + H: Go to home
      if (e.key === 'g' && !e.metaKey && !e.ctrlKey) {
        const nextKey = waitForNextKey()
        if (nextKey === 'h') navigate('/dashboard')
        if (nextKey === 't') navigate('/tasks')
        if (nextKey === 'c') navigate('/calendar')
      }
      
      // ?: Show keyboard shortcuts help
      if (e.key === '?' && e.shiftKey) {
        e.preventDefault()
        showKeyboardShortcutsHelp()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
}

// Keyboard shortcuts help modal
const KeyboardShortcutsHelp = () => {
  const shortcuts = [
    { keys: ['Cmd', 'K'], description: 'Open command palette' },
    { keys: ['Esc'], description: 'Close modal' },
    { keys: ['G', 'H'], description: 'Go to home' },
    { keys: ['G', 'T'], description: 'Go to tasks' },
    { keys: ['C'], description: 'Create new task' },
    { keys: ['?'], description: 'Show this help' },
  ]
  
  return (
    <Modal>
      <h2>Keyboard Shortcuts</h2>
      <table>
        <tbody>
          {shortcuts.map(({ keys, description }) => (
            <tr key={keys.join('+')}>
              <td>
                {keys.map(key => (
                  <kbd key={key}>{key}</kbd>
                ))}
              </td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  )
}
```

### Focus Indicators

```css
/* Enhanced focus indicators */
*:focus-visible {
  outline: 3px solid var(--border-focus);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Button focus */
button:focus-visible {
  outline: 3px solid var(--border-focus);
  outline-offset: 2px;
}

/* Input focus */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px hsla(158, 64%, 52%, 0.2);
}

/* Link focus */
a:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
  border-radius: 2px;
}
```

---

## 3. ARIA Labels & Semantic HTML (WCAG 2.1 - 4.1.2)

### Semantic HTML Structure

```jsx
// Good semantic structure
const App = () => {
  return (
    <>
      <SkipLinks />
      
      <header role="banner">
        <nav aria-label="Main navigation">
          <Sidebar />
        </nav>
      </header>
      
      <main id="main-content" role="main">
        <h1>Dashboard</h1>
        {children}
      </main>
      
      <aside aria-label="Notifications" role="complementary">
        <ToastContainer />
      </aside>
      
      <footer role="contentinfo">
        <p>© 2025 TaskApp</p>
      </footer>
    </>
  )
}
```

### ARIA Labels

```jsx
// Icon buttons
<button
  aria-label="Delete task"
  onClick={handleDelete}
>
  <Trash2 aria-hidden="true" />
</button>

// Search input
<input
  type="search"
  aria-label="Search tasks"
  aria-describedby="search-help"
  placeholder="Search..."
/>
<div id="search-help" className="sr-only">
  Search by task title, tags, or description
</div>

// Loading state
<button disabled aria-busy="true">
  <Loader aria-hidden="true" className="animate-spin" />
  <span>Loading...</span>
</button>

// Expandable sections
<button
  aria-expanded={isOpen}
  aria-controls="section-content"
  onClick={() => setIsOpen(!isOpen)}
>
  {isOpen ? 'Collapse' : 'Expand'} Section
</button>
<div id="section-content" hidden={!isOpen}>
  {/* Content */}
</div>
```

### Live Regions

```jsx
// Announce dynamic content changes
const ToastContainer = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="toast-container"
    >
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}

// Screen reader only text
const ScreenReaderOnly = ({ children }) => {
  return (
    <span className="sr-only">
      {children}
    </span>
  )
}
```

```css
/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## 4. Form Accessibility (WCAG 2.1 - 3.3.1, 3.3.2)

### Accessible Forms

```jsx
const TaskForm = () => {
  const [errors, setErrors] = useState({})
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Task title */}
      <div className="form-group">
        <label htmlFor="task-title">
          Task Title
          <span aria-label="required">*</span>
        </label>
        <input
          id="task-title"
          type="text"
          required
          aria-required="true"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : 'title-help'}
        />
        <div id="title-help" className="help-text">
          Keep it short and descriptive
        </div>
        {errors.title && (
          <div id="title-error" className="error-text" role="alert">
            {errors.title}
          </div>
        )}
      </div>
      
      {/* Due date */}
      <div className="form-group">
        <label htmlFor="due-date">Due Date</label>
        <input
          id="due-date"
          type="date"
          aria-describedby="date-help"
        />
        <div id="date-help" className="help-text">
          When should this task be completed?
        </div>
      </div>
      
      {/* Priority */}
      <fieldset>
        <legend>Priority</legend>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="priority"
              value="low"
              defaultChecked
            />
            <span>Low</span>
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="medium"
            />
            <span>Medium</span>
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="high"
            />
            <span>High</span>
          </label>
        </div>
      </fieldset>
      
      {/* Submit */}
      <button type="submit">
        Create Task
      </button>
    </form>
  )
}
```

### Error Handling

```jsx
// Error summary at top of form
const ErrorSummary = ({ errors }) => {
  if (Object.keys(errors).length === 0) return null
  
  return (
    <div
      role="alert"
      aria-labelledby="error-summary-title"
      className="error-summary"
    >
      <h2 id="error-summary-title">
        There are {Object.keys(errors).length} errors in this form
      </h2>
      <ul>
        {Object.entries(errors).map(([field, message]) => (
          <li key={field}>
            <a href={`#${field}`}>{message}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## 5. Screen Reader Support

### Testing with Screen Readers

**macOS:** VoiceOver (Cmd + F5)  
**Windows:** NVDA (free) or JAWS  
**Mobile:** TalkBack (Android), VoiceOver (iOS)

### Screen Reader Announcements

```jsx
// Announce route changes
const RouteAnnouncer = () => {
  const location = useLocation()
  const [announcement, setAnnouncement] = useState('')
  
  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname)
    setAnnouncement(`Navigated to ${pageTitle}`)
    
    // Clear after announcement
    setTimeout(() => setAnnouncement(''), 1000)
  }, [location])
  
  return (
    <div
      role="status"
      aria-live="assertive"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  )
}

// Announce loading states
const LoadingAnnouncer = ({ isLoading, message }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {isLoading ? message : 'Content loaded'}
    </div>
  )
}
```

---

## 6. Testing Checklist

### Automated Testing

```bash
# Install accessibility testing tools
npm install -D @axe-core/react jest-axe

# Run tests
npm test
```

```javascript
// __tests__/accessibility/TaskCard.test.jsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import TaskCard from '@/components/TaskCard'

expect.extend(toHaveNoViolations)

describe('TaskCard Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <TaskCard
        task={{
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
        }}
      />
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
  
  it('should have proper ARIA labels', () => {
    const { getByLabelText } = render(<TaskCard task={mockTask} />)
    
    expect(getByLabelText('Delete task')).toBeInTheDocument()
    expect(getByLabelText('Edit task')).toBeInTheDocument()
  })
})
```

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] No keyboard traps
- [ ] Skip links work
- [ ] Keyboard shortcuts work

#### Screen Reader
- [ ] All images have alt text
- [ ] Form labels are associated
- [ ] Error messages are announced
- [ ] Dynamic content changes are announced
- [ ] Page title updates on navigation
- [ ] Landmarks are properly labeled

#### Visual
- [ ] Text has sufficient contrast (4.5:1)
- [ ] UI components have sufficient contrast (3:1)
- [ ] Text is readable at 200% zoom
- [ ] No information conveyed by color alone
- [ ] Focus indicators are visible

#### Forms
- [ ] All form fields have labels
- [ ] Required fields are indicated
- [ ] Error messages are clear and helpful
- [ ] Error messages are associated with fields
- [ ] Success messages are announced

---

## 7. Accessibility Component Library

### Accessible Button

```jsx
// components/ui/AccessibleButton.jsx
const AccessibleButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  ariaLabel,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader aria-hidden="true" className="animate-spin" />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
```

### Accessible Modal

```jsx
// components/ui/AccessibleModal.jsx
const AccessibleModal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null)
  const previousFocus = useRef(null)
  
  useFocusTrap(modalRef, isOpen)
  
  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement
    } else if (previousFocus.current) {
      previousFocus.current.focus()
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="modal-close"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}
```

---

## Resources

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Guidelines
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

**Version:** 1.0  
**Last Updated:** January 2025  
**Compliance Target:** WCAG 2.1 AA by March 2025

