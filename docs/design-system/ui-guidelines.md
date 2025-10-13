# UI Guidelines

Nguyên tắc thiết kế UI/UX cho TaskApp để đảm bảo tính nhất quán và trải nghiệm người dùng tốt.

## 🎨 Design Principles

### 1. Core Design Principles

#### Simplicity First
- **Minimal Interface**: Giữ giao diện đơn giản, tập trung vào chức năng chính
- **Clear Hierarchy**: Sử dụng typography và spacing để tạo hierarchy rõ ràng
- **Progressive Disclosure**: Chỉ hiển thị thông tin cần thiết, ẩn chi tiết không quan trọng

#### Consistency
- **Design System**: Sử dụng design system nhất quán
- **Component Reuse**: Tái sử dụng components thay vì tạo mới
- **Pattern Consistency**: Áp dụng patterns nhất quán cho các tương tác tương tự

#### Accessibility
- **WCAG 2.1 AA**: Tuân thủ tiêu chuẩn accessibility
- **Keyboard Navigation**: Hỗ trợ điều hướng bằng bàn phím
- **Screen Reader**: Tương thích với screen reader
- **Color Contrast**: Đảm bảo độ tương phản màu sắc đạt chuẩn

#### Performance
- **Fast Loading**: Tối ưu thời gian tải
- **Smooth Animations**: Animations mượt mà, không lag
- **Responsive Design**: Hoạt động tốt trên mọi thiết bị

### 2. Visual Hierarchy

#### Typography Hierarchy
```css
/* Heading Levels */
h1 { font-size: 2.25rem; font-weight: 700; } /* Page titles */
h2 { font-size: 1.875rem; font-weight: 600; } /* Section titles */
h3 { font-size: 1.5rem; font-weight: 600; }   /* Subsection titles */
h4 { font-size: 1.25rem; font-weight: 500; }  /* Card titles */
h5 { font-size: 1.125rem; font-weight: 500; } /* Small headings */
h6 { font-size: 1rem; font-weight: 500; }     /* Labels */

/* Body Text */
body { font-size: 1rem; font-weight: 400; }   /* Main content */
small { font-size: 0.875rem; font-weight: 400; } /* Secondary text */
caption { font-size: 0.75rem; font-weight: 400; } /* Captions */
```

#### Spacing System
```css
/* Spacing Scale (8px base) */
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-2xl: 3rem;    /* 48px */
--spacing-3xl: 4rem;    /* 64px */
```

#### Color Hierarchy
```css
/* Primary Colors */
--color-primary-50: #f0f4ff;
--color-primary-500: #6172f3;
--color-primary-900: #1e1b4b;

/* Neutral Colors */
--color-gray-50: #fafaf9;
--color-gray-500: #78716c;
--color-gray-900: #1c1917;

/* Semantic Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

## 🎯 Component Guidelines

### 1. Button Components

#### Button Variants
```javascript
// Primary Button - Main actions
<Button variant="primary" size="md">
  Create Task
</Button>

// Secondary Button - Secondary actions
<Button variant="secondary" size="md">
  Cancel
</Button>

// Ghost Button - Subtle actions
<Button variant="ghost" size="md">
  Learn More
</Button>

// Danger Button - Destructive actions
<Button variant="danger" size="md">
  Delete Task
</Button>
```

#### Button States
```css
/* Button States */
.btn-primary {
  /* Default */
  background-color: var(--color-primary-500);
  color: white;
  border: 1px solid var(--color-primary-500);
}

.btn-primary:hover {
  background-color: var(--color-primary-600);
  border-color: var(--color-primary-600);
}

.btn-primary:focus {
  outline: 2px solid var(--color-primary-200);
  outline-offset: 2px;
}

.btn-primary:active {
  background-color: var(--color-primary-700);
}

.btn-primary:disabled {
  background-color: var(--color-gray-300);
  border-color: var(--color-gray-300);
  cursor: not-allowed;
}
```

#### Button Sizes
```css
/* Button Sizes */
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  height: 2rem;
}

.btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  height: 2.5rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  height: 3rem;
}
```

### 2. Input Components

#### Input Types
```javascript
// Text Input
<Input
  type="text"
  placeholder="Enter task title"
  value={title}
  onChange={setTitle}
/>

// Email Input
<Input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={setEmail}
/>

// Password Input
<Input
  type="password"
  placeholder="Enter password"
  value={password}
  onChange={setPassword}
/>

// Textarea
<Textarea
  placeholder="Enter task description"
  value={description}
  onChange={setDescription}
  rows={4}
/>
```

#### Input States
```css
/* Input States */
.input {
  /* Default */
  border: 1px solid var(--color-gray-300);
  background-color: white;
  color: var(--color-gray-900);
}

.input:focus {
  border-color: var(--color-primary-500);
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.input:invalid {
  border-color: var(--color-error);
}

.input:disabled {
  background-color: var(--color-gray-100);
  border-color: var(--color-gray-200);
  cursor: not-allowed;
}
```

### 3. Card Components

#### Card Variants
```javascript
// Basic Card
<Card>
  <CardHeader>
    <CardTitle>Task Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Task description goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Interactive Card
<Card className="hover:shadow-lg transition-shadow">
  <CardContent>
    <p>Hover to see shadow effect.</p>
  </CardContent>
</Card>
```

#### Card Structure
```css
/* Card Base */
.card {
  background-color: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 1.5rem 1.5rem 0 1.5rem;
}

.card-content {
  padding: 1rem 1.5rem;
}

.card-footer {
  padding: 0 1.5rem 1.5rem 1.5rem;
}
```

### 4. Modal Components

#### Modal Structure
```javascript
// Basic Modal
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalHeader>
    <ModalTitle>Create New Task</ModalTitle>
    <ModalCloseButton onClick={onClose} />
  </ModalHeader>
  <ModalBody>
    <form onSubmit={handleSubmit}>
      <Input
        label="Task Title"
        value={title}
        onChange={setTitle}
        required
      />
      <Textarea
        label="Description"
        value={description}
        onChange={setDescription}
      />
    </form>
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={onClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSubmit}>
      Create Task
    </Button>
  </ModalFooter>
</Modal>
```

#### Modal Guidelines
- **Size**: Modal width không vượt quá 90% viewport width
- **Position**: Centered trên màn hình
- **Backdrop**: Overlay mờ với blur effect
- **Animation**: Fade in/out với scale effect
- **Keyboard**: ESC để đóng modal
- **Focus**: Focus trap trong modal

### 5. Navigation Components

#### Sidebar Navigation
```javascript
// Sidebar Structure
<Sidebar>
  <SidebarHeader>
    <Logo />
    <UserProfile />
  </SidebarHeader>
  <SidebarContent>
    <NavGroup title="Main">
      <NavItem icon={Home} label="Dashboard" to="/dashboard" />
      <NavItem icon={Tasks} label="Tasks" to="/tasks" />
      <NavItem icon={Calendar} label="Calendar" to="/calendar" />
    </NavGroup>
    <NavGroup title="Tools">
      <NavItem icon={Notes} label="Notes" to="/notes" />
      <NavItem icon={Projects} label="Projects" to="/projects" />
    </NavGroup>
  </SidebarContent>
  <SidebarFooter>
    <NavItem icon={Settings} label="Settings" to="/settings" />
  </SidebarFooter>
</Sidebar>
```

#### Top Navigation
```javascript
// Top Bar Structure
<TopBar>
  <TopBarLeft>
    <SearchInput placeholder="Search tasks..." />
  </TopBarLeft>
  <TopBarRight>
    <NotificationBell />
    <UserMenu />
    <ThemeToggle />
  </TopBarRight>
</TopBar>
```

## 📱 Responsive Design

### 1. Breakpoint System

#### Breakpoints
```css
/* Breakpoints */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X large devices */
```

#### Responsive Utilities
```css
/* Mobile First Approach */
.container {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    margin: 0 auto;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
```

### 2. Mobile Design

#### Touch Targets
```css
/* Minimum touch target size: 44px */
.touch-target {
  min-width: 44px;
  min-height: 44px;
}

/* Button touch targets */
.btn {
  min-height: 44px;
  padding: 0.75rem 1.5rem;
}

/* Input touch targets */
.input {
  min-height: 44px;
  padding: 0.75rem 1rem;
}
```

#### Mobile Navigation
```javascript
// Mobile Menu
<MobileMenu>
  <MobileMenuTrigger>
    <MenuIcon />
  </MobileMenuTrigger>
  <MobileMenuContent>
    <MobileMenuItem>
      <HomeIcon />
      <span>Dashboard</span>
    </MobileMenuItem>
    <MobileMenuItem>
      <TasksIcon />
      <span>Tasks</span>
    </MobileMenuItem>
  </MobileMenuContent>
</MobileMenu>
```

### 3. Tablet Design

#### Tablet Layout
```css
/* Tablet Layout */
@media (min-width: 768px) and (max-width: 1023px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .sidebar {
    position: fixed;
    left: -100%;
    transition: left 0.3s ease;
  }
  
  .sidebar.open {
    left: 0;
  }
}
```

## 🌙 Dark Mode

### 1. Dark Mode Implementation

#### Color Scheme
```css
/* Light Mode */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --border-color: #e2e8f0;
}

/* Dark Mode */
.dark {
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --text-primary: #f7fafc;
  --text-secondary: #a0aec0;
  --border-color: #4a5568;
}
```

#### Dark Mode Toggle
```javascript
// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
```

### 2. Dark Mode Guidelines

#### Color Contrast
- **Text**: Đảm bảo contrast ratio >= 4.5:1
- **UI Elements**: Contrast ratio >= 3:1
- **Focus States**: Contrast ratio >= 3:1

#### Image Handling
```css
/* Dark mode images */
.dark img {
  opacity: 0.9;
  filter: brightness(0.9);
}

/* Dark mode logos */
.dark .logo-light {
  display: none;
}

.dark .logo-dark {
  display: block;
}
```

## ♿ Accessibility Guidelines

### 1. Keyboard Navigation

#### Focus Management
```css
/* Focus Styles */
.focusable:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary-500);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

#### Tab Order
```javascript
// Tab Order Management
const TaskForm = () => {
  const firstInputRef = useRef(null)
  const lastInputRef = useRef(null)
  
  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])
  
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstInputRef.current) {
        e.preventDefault()
        lastInputRef.current?.focus()
      } else if (!e.shiftKey && document.activeElement === lastInputRef.current) {
        e.preventDefault()
        firstInputRef.current?.focus()
      }
    }
  }
  
  return (
    <form onKeyDown={handleKeyDown}>
      <Input ref={firstInputRef} />
      <Input />
      <Input ref={lastInputRef} />
    </form>
  )
}
```

### 2. Screen Reader Support

#### ARIA Labels
```javascript
// ARIA Labels
<button
  aria-label="Delete task"
  onClick={handleDelete}
>
  <TrashIcon />
</button>

// ARIA Described By
<Input
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
<div id="email-error" role="alert">
  Please enter a valid email address
</div>
```

#### Semantic HTML
```javascript
// Semantic HTML Structure
<main>
  <header>
    <h1>Task Management</h1>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/tasks">Tasks</a></li>
      </ul>
    </nav>
  </header>
  
  <section aria-labelledby="tasks-heading">
    <h2 id="tasks-heading">Your Tasks</h2>
    <ul role="list">
      <li role="listitem">
        <article>
          <h3>Task Title</h3>
          <p>Task description</p>
        </article>
      </li>
    </ul>
  </section>
</main>
```

### 3. Color and Contrast

#### Color Contrast Ratios
- **Normal Text**: >= 4.5:1
- **Large Text**: >= 3:1
- **UI Components**: >= 3:1
- **Focus Indicators**: >= 3:1

#### Color Independence
```css
/* Don't rely on color alone */
.status-success {
  color: var(--color-success);
}

.status-success::before {
  content: "✓ ";
}

.status-error {
  color: var(--color-error);
}

.status-error::before {
  content: "✗ ";
}
```

## 🎭 Animation Guidelines

### 1. Animation Principles

#### Purpose-Driven Animations
- **Feedback**: Confirm user actions
- **Guidance**: Direct user attention
- **Delight**: Enhance user experience
- **Performance**: Smooth, not distracting

#### Animation Timing
```css
/* Animation Durations */
--duration-fast: 150ms;    /* Micro-interactions */
--duration-normal: 300ms;  /* Standard transitions */
--duration-slow: 500ms;   /* Complex animations */

/* Animation Easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 2. Common Animations

#### Fade Animations
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn var(--duration-normal) var(--ease-out);
}

/* Fade Out */
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.fade-out {
  animation: fadeOut var(--duration-normal) var(--ease-in);
}
```

#### Slide Animations
```css
/* Slide In From Right */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-right {
  animation: slideInRight var(--duration-normal) var(--ease-out);
}
```

#### Scale Animations
```css
/* Scale In */
@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.scale-in {
  animation: scaleIn var(--duration-normal) var(--ease-out);
}
```

### 3. Reduced Motion

#### Respect User Preferences
```css
/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Conditional Animations */
.animate-if-motion {
  animation: fadeIn var(--duration-normal) var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .animate-if-motion {
    animation: none;
  }
}
```

## 🎯 Smart Features UI

### 1. Natural Language Input

#### Design Guidelines
```jsx
// Smart input with preview
<div className="smart-input-container">
  <input
    type="text"
    placeholder="Type anything... e.g., 'Meeting tomorrow at 3pm'"
    className="smart-input"
  />
  
  {preview && (
    <div className="smart-preview">
      <div className="preview-item">
        <Calendar size={16} />
        <span>{preview.dueDate}</span>
      </div>
      {preview.priority && (
        <div className="preview-item">
          <Flag size={16} />
          <span>{preview.priority}</span>
        </div>
      )}
    </div>
  )}
</div>
```

### 2. AI Suggestions

#### Suggestion Cards
```jsx
<div className="ai-suggestion">
  <div className="suggestion-icon">
    <Sparkles size={20} className="text-primary-500" />
  </div>
  <div className="suggestion-content">
    <h4>Suggested Priority: High</h4>
    <p className="text-sm text-secondary">
      Based on your deadline and similar tasks
    </p>
  </div>
  <div className="suggestion-actions">
    <button className="btn-sm btn-primary">Apply</button>
    <button className="btn-sm btn-ghost">Dismiss</button>
  </div>
</div>
```

## 📊 Data Visualization

### 1. Chart Guidelines

#### Chart Types
- **Bar Charts**: So sánh dữ liệu
- **Line Charts**: Xu hướng theo thời gian
- **Pie Charts**: Phân bố phần trăm
- **Area Charts**: Tổng quan dữ liệu

#### Chart Colors
```css
/* Chart Color Palette */
--chart-color-1: #6172f3; /* Primary Blue */
--chart-color-2: #10b981; /* Success Green */
--chart-color-3: #f59e0b; /* Warning Amber */
--chart-color-4: #ef4444; /* Error Red */
--chart-color-5: #8b5cf6; /* Purple */
--chart-color-6: #06b6d4; /* Cyan */
```

### 2. Progress Indicators

#### Progress Bars
```javascript
// Progress Bar Component
const ProgressBar = ({ value, max = 100, size = 'md' }) => {
  const percentage = (value / max) * 100
  
  return (
    <div className={`progress-bar progress-bar--${size}`}>
      <div
        className="progress-bar__fill"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
        aria-label={`Progress: ${percentage}%`}
      />
    </div>
  )
}
```

#### Loading States
```javascript
// Loading Spinner
const LoadingSpinner = ({ size = 'md' }) => {
  return (
    <div
      className={`loading-spinner loading-spinner--${size}`}
      role="status"
      aria-label="Loading"
    >
      <div className="loading-spinner__circle" />
    </div>
  )
}
```

## 🎨 Icon Guidelines

### 1. Icon System

#### Icon Sizes
```css
/* Icon Sizes */
.icon-xs { width: 0.75rem; height: 0.75rem; }  /* 12px */
.icon-sm { width: 1rem; height: 1rem; }        /* 16px */
.icon-md { width: 1.25rem; height: 1.25rem; }  /* 20px */
.icon-lg { width: 1.5rem; height: 1.5rem; }    /* 24px */
.icon-xl { width: 2rem; height: 2rem; }         /* 32px */
```

#### Icon Usage
```javascript
// Icon Component
const Icon = ({ name, size = 'md', className }) => {
  const IconComponent = iconMap[name]
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }
  
  return (
    <IconComponent
      className={`icon icon--${size} ${className}`}
      aria-hidden="true"
    />
  )
}
```

### 2. Icon Guidelines

#### Icon Consistency
- **Style**: Outline style cho consistency
- **Weight**: 2px stroke weight
- **Corners**: Rounded corners (2px radius)
- **Spacing**: Consistent padding và margins

#### Icon Accessibility
```javascript
// Accessible Icon Usage
<button aria-label="Delete task">
  <TrashIcon aria-hidden="true" />
</button>

// Decorative Icons
<div>
  <CheckIcon aria-hidden="true" />
  <span>Task completed</span>
</div>
```

---

**Lưu ý**: Các nguyên tắc này được thiết kế để đảm bảo tính nhất quán, accessibility và trải nghiệm người dùng tốt. Tất cả thành viên team cần tuân theo các nguyên tắc này khi thiết kế và phát triển UI.
