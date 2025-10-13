# Component Library

Thư viện component UI của TaskApp với hướng dẫn sử dụng và best practices.

## 🎯 Overview

Component library của TaskApp được xây dựng trên:
- **React 19** với hooks và functional components
- **TailwindCSS** cho styling
- **Framer Motion** cho animations
- **Accessibility** (WCAG 2.1 AA compliant)

## 📦 Base Components

### 1. Button Component

#### Basic Usage
```javascript
import Button from '@/components/ui/Button'

// Primary button
<Button variant="primary" size="md">
  Create Task
</Button>

// Secondary button
<Button variant="secondary" size="md">
  Cancel
</Button>

// Ghost button
<Button variant="ghost" size="md">
  Learn More
</Button>

// Danger button
<Button variant="danger" size="md">
  Delete Task
</Button>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `icon` | `ReactNode` | `null` | Icon element |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `onClick` | `function` | `undefined` | Click handler |
| `children` | `ReactNode` | `undefined` | Button content |

#### Examples
```javascript
// Button with icon
<Button 
  variant="primary" 
  icon={<PlusIcon />}
  iconPosition="left"
>
  Add Task
</Button>

// Loading button
<Button 
  variant="primary" 
  loading={isSubmitting}
  disabled={isSubmitting}
>
  {isSubmitting ? 'Creating...' : 'Create Task'}
</Button>

// Button with custom styling
<Button 
  variant="primary"
  className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
>
  Custom Styled Button
</Button>
```

### 2. Input Component

#### Basic Usage
```javascript
import Input from '@/components/ui/Input'

// Text input
<Input
  type="text"
  placeholder="Enter task title"
  value={title}
  onChange={setTitle}
/>

// Email input
<Input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={setEmail}
  required
/>

// Password input
<Input
  type="password"
  placeholder="Enter password"
  value={password}
  onChange={setPassword}
  showPasswordToggle
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | Input type |
| `placeholder` | `string` | `''` | Placeholder text |
| `value` | `string` | `''` | Input value |
| `onChange` | `function` | `undefined` | Change handler |
| `label` | `string` | `''` | Input label |
| `error` | `string` | `''` | Error message |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `showPasswordToggle` | `boolean` | `false` | Show password toggle |

#### Examples
```javascript
// Input with label and error
<Input
  label="Task Title"
  placeholder="Enter task title"
  value={title}
  onChange={setTitle}
  error={titleError}
  required
/>

// Input with icon
<Input
  type="search"
  placeholder="Search tasks..."
  value={searchQuery}
  onChange={setSearchQuery}
  icon={<SearchIcon />}
/>

// Disabled input
<Input
  label="Created Date"
  value={formatDate(createdAt)}
  disabled
/>
```

### 3. Card Component

#### Basic Usage
```javascript
import Card from '@/components/ui/Card'

// Basic card
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
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outlined' \| 'elevated'` | `'default'` | Card style variant |
| `hover` | `boolean` | `false` | Hover effect |
| `clickable` | `boolean` | `false` | Clickable card |
| `onClick` | `function` | `undefined` | Click handler |
| `children` | `ReactNode` | `undefined` | Card content |

#### Examples
```javascript
// Clickable card
<Card 
  clickable 
  hover
  onClick={() => navigate(`/tasks/${task.id}`)}
>
  <CardContent>
    <h3>{task.title}</h3>
    <p>{task.description}</p>
  </CardContent>
</Card>

// Outlined card
<Card variant="outlined">
  <CardHeader>
    <CardTitle>Settings</CardTitle>
  </CardHeader>
  <CardContent>
    <SettingsForm />
  </CardContent>
</Card>

// Elevated card
<Card variant="elevated">
  <CardContent>
    <h2>Important Notice</h2>
    <p>This is an important message.</p>
  </CardContent>
</Card>
```

### 4. Modal Component

#### Basic Usage
```javascript
import Modal from '@/components/ui/Modal'

// Basic modal
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalHeader>
    <ModalTitle>Create New Task</ModalTitle>
    <ModalCloseButton onClick={onClose} />
  </ModalHeader>
  <ModalBody>
    <TaskForm onSubmit={handleSubmit} />
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

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Modal visibility |
| `onClose` | `function` | `undefined` | Close handler |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal size |
| `closable` | `boolean` | `true` | Show close button |
| `backdrop` | `boolean` | `true` | Show backdrop |
| `children` | `ReactNode` | `undefined` | Modal content |

#### Examples
```javascript
// Large modal
<Modal isOpen={isOpen} onClose={onClose} size="lg">
  <ModalHeader>
    <ModalTitle>Task Details</ModalTitle>
  </ModalHeader>
  <ModalBody>
    <TaskDetails task={task} />
  </ModalBody>
</Modal>

// Non-closable modal
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  closable={false}
  backdrop={false}
>
  <ModalBody>
    <LoadingSpinner />
    <p>Processing your request...</p>
  </ModalBody>
</Modal>
```

### 5. Popover Component

#### Basic Usage
```javascript
import Popover from '@/components/ui/Popover'

// Basic popover
<Popover>
  <PopoverTrigger>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Settings</PopoverTitle>
    </PopoverHeader>
    <PopoverBody>
      <SettingsForm />
    </PopoverBody>
  </PopoverContent>
</Popover>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Popover placement |
| `trigger` | `'click' \| 'hover'` | `'click'` | Trigger type |
| `children` | `ReactNode` | `undefined` | Popover content |

#### Examples
```javascript
// Hover popover
<Popover trigger="hover" placement="top">
  <PopoverTrigger>
    <Button>Hover me</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>This is a hover popover</p>
  </PopoverContent>
</Popover>

// Right placement
<Popover placement="right">
  <PopoverTrigger>
    <Button>Open Right</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover on the right</p>
  </PopoverContent>
</Popover>
```

## 🎨 Dashboard Components

### 1. QuickCapture Component

#### Basic Usage
```javascript
import QuickCapture from '@/components/dashboardV2/QuickCapture'

// Quick capture for tasks
<QuickCapture
  placeholder="What needs to be done?"
  onSubmit={handleQuickCapture}
  maxLength={200}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Quick capture...'` | Placeholder text |
| `onSubmit` | `function` | `undefined` | Submit handler |
| `maxLength` | `number` | `100` | Maximum input length |
| `disabled` | `boolean` | `false` | Disabled state |

#### Examples
```javascript
// Quick capture with validation
<QuickCapture
  placeholder="Add a new task..."
  onSubmit={handleTaskCreation}
  maxLength={200}
  disabled={isLoading}
/>

// Quick capture with custom styling
<QuickCapture
  placeholder="What's on your mind?"
  onSubmit={handleNoteCreation}
  className="bg-blue-50 border-blue-200"
/>
```

### 2. FocusList Component

#### Basic Usage
```javascript
import FocusList from '@/components/dashboardV2/FocusList'

// Focus list for high-priority tasks
<FocusList
  tasks={focusTasks}
  onTaskUpdate={handleTaskUpdate}
  onTaskComplete={handleTaskComplete}
  maxItems={5}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tasks` | `Task[]` | `[]` | Array of focus tasks |
| `onTaskUpdate` | `function` | `undefined` | Task update handler |
| `onTaskComplete` | `function` | `undefined` | Task complete handler |
| `maxItems` | `number` | `5` | Maximum items to show |
| `showProgress` | `boolean` | `true` | Show progress indicator |

#### Examples
```javascript
// Focus list with custom max items
<FocusList
  tasks={highPriorityTasks}
  onTaskUpdate={handleTaskUpdate}
  onTaskComplete={handleTaskComplete}
  maxItems={3}
  showProgress={false}
/>

// Focus list with empty state
<FocusList
  tasks={[]}
  onTaskUpdate={handleTaskUpdate}
  onTaskComplete={handleTaskComplete}
  emptyStateMessage="No focus tasks today"
/>
```

### 3. NextUp Component

#### Basic Usage
```javascript
import NextUp from '@/components/dashboardV2/NextUp'

// Next up tasks
<NextUp
  tasks={upcomingTasks}
  onTaskUpdate={handleTaskUpdate}
  onTaskSnooze={handleTaskSnooze}
  timeRange="today"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tasks` | `Task[]` | `[]` | Array of upcoming tasks |
| `onTaskUpdate` | `function` | `undefined` | Task update handler |
| `onTaskSnooze` | `function` | `undefined` | Task snooze handler |
| `timeRange` | `'today' \| 'tomorrow' \| 'week'` | `'today'` | Time range filter |

#### Examples
```javascript
// Next up for tomorrow
<NextUp
  tasks={tomorrowTasks}
  onTaskUpdate={handleTaskUpdate}
  onTaskSnooze={handleTaskSnooze}
  timeRange="tomorrow"
/>

// Next up with custom styling
<NextUp
  tasks={upcomingTasks}
  onTaskUpdate={handleTaskUpdate}
  onTaskSnooze={handleTaskSnooze}
  className="bg-gradient-to-br from-blue-50 to-purple-50"
/>
```

### 4. AgendaMini Component

#### Basic Usage
```javascript
import AgendaMini from '@/components/dashboardV2/AgendaMini'

// Mini agenda
<AgendaMini
  events={agendaEvents}
  onEventClick={handleEventClick}
  onEventCreate={handleEventCreate}
  date={selectedDate}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | `Event[]` | `[]` | Array of events |
| `onEventClick` | `function` | `undefined` | Event click handler |
| `onEventCreate` | `function` | `undefined` | Event create handler |
| `date` | `Date` | `new Date()` | Selected date |
| `showTime` | `boolean` | `true` | Show event times |

#### Examples
```javascript
// Agenda for specific date
<AgendaMini
  events={todaysEvents}
  onEventClick={handleEventClick}
  onEventCreate={handleEventCreate}
  date={new Date('2024-01-15')}
  showTime={false}
/>

// Agenda with custom styling
<AgendaMini
  events={agendaEvents}
  onEventClick={handleEventClick}
  onEventCreate={handleEventCreate}
  className="border-2 border-blue-200 rounded-lg"
/>
```

### 5. PinnedCards Component

#### Basic Usage
```javascript
import PinnedCards from '@/components/dashboardV2/PinnedCards'

// Pinned items
<PinnedCards
  items={pinnedItems}
  onItemClick={handleItemClick}
  onItemUnpin={handleItemUnpin}
  maxItems={6}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `PinnedItem[]` | `[]` | Array of pinned items |
| `onItemClick` | `function` | `undefined` | Item click handler |
| `onItemUnpin` | `function` | `undefined` | Item unpin handler |
| `maxItems` | `number` | `6` | Maximum items to show |
| `showUnpinButton` | `boolean` | `true` | Show unpin button |

#### Examples
```javascript
// Pinned cards with custom max items
<PinnedCards
  items={pinnedTasks}
  onItemClick={handleTaskClick}
  onItemUnpin={handleTaskUnpin}
  maxItems={4}
  showUnpinButton={false}
/>

// Pinned cards with empty state
<PinnedCards
  items={[]}
  onItemClick={handleItemClick}
  onItemUnpin={handleItemUnpin}
  emptyStateMessage="No pinned items"
/>
```

## 📊 Data Visualization Components

### 1. BarChartMini Component

#### Basic Usage
```javascript
import BarChartMini from '@/components/dashboardV2/BarChartMini'

// Mini bar chart
<BarChartMini
  data={chartData}
  title="Task Completion"
  height={200}
  showTooltip={true}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ChartData[]` | `[]` | Chart data |
| `title` | `string` | `''` | Chart title |
| `height` | `number` | `200` | Chart height |
| `showTooltip` | `boolean` | `true` | Show tooltip |
| `color` | `string` | `'#6172f3'` | Chart color |

#### Examples
```javascript
// Bar chart with custom data
<BarChartMini
  data={[
    { label: 'Mon', value: 5 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 3 },
    { label: 'Thu', value: 7 },
    { label: 'Fri', value: 4 }
  ]}
  title="Weekly Tasks"
  height={150}
  color="#10b981"
/>

// Bar chart with tooltip disabled
<BarChartMini
  data={taskData}
  title="Task Progress"
  showTooltip={false}
/>
```

### 2. DonutProgress Component

#### Basic Usage
```javascript
import DonutProgress from '@/components/dashboardV2/DonutProgress'

// Donut progress chart
<DonutProgress
  value={75}
  max={100}
  title="Task Completion"
  size="md"
  showPercentage={true}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `max` | `number` | `100` | Maximum value |
| `title` | `string` | `''` | Chart title |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Chart size |
| `showPercentage` | `boolean` | `true` | Show percentage |
| `color` | `string` | `'#6172f3'` | Chart color |

#### Examples
```javascript
// Donut progress with custom size
<DonutProgress
  value={60}
  max={100}
  title="Project Progress"
  size="lg"
  color="#f59e0b"
/>

// Donut progress without percentage
<DonutProgress
  value={45}
  max={100}
  title="Tasks Done"
  showPercentage={false}
/>
```

### 3. AreaChart Component

#### Basic Usage
```javascript
import AreaChart from '@/components/dashboardV2/AreaChart'

// Area chart
<AreaChart
  data={chartData}
  title="Task Trends"
  height={300}
  showGrid={true}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ChartData[]` | `[]` | Chart data |
| `title` | `string` | `''` | Chart title |
| `height` | `number` | `300` | Chart height |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `color` | `string` | `'#6172f3'` | Chart color |

#### Examples
```javascript
// Area chart with custom styling
<AreaChart
  data={trendData}
  title="Monthly Trends"
  height={250}
  color="#8b5cf6"
  showGrid={false}
/>

// Area chart with gradient
<AreaChart
  data={performanceData}
  title="Performance Metrics"
  gradient={true}
/>
```

## 🎭 Animation Components

### 1. AnimatedBackground Component

#### Basic Usage
```javascript
import AnimatedBackground from '@/components/ui/AnimatedBackground'

// Animated background
<AnimatedBackground
  variant="gradient"
  speed="slow"
  intensity="medium"
>
  <div>Your content here</div>
</AnimatedBackground>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'gradient' \| 'particles' \| 'waves'` | `'gradient'` | Animation variant |
| `speed` | `'slow' \| 'medium' \| 'fast'` | `'medium'` | Animation speed |
| `intensity` | `'low' \| 'medium' \| 'high'` | `'medium'` | Animation intensity |
| `children` | `ReactNode` | `undefined` | Background content |

#### Examples
```javascript
// Particle background
<AnimatedBackground variant="particles" speed="fast" intensity="high">
  <div className="p-8">
    <h1>Welcome to TaskApp</h1>
  </div>
</AnimatedBackground>

// Wave background
<AnimatedBackground variant="waves" speed="slow" intensity="low">
  <div className="flex items-center justify-center h-screen">
    <Card>Content</Card>
  </div>
</AnimatedBackground>
```

### 2. ProgressRing Component

#### Basic Usage
```javascript
import ProgressRing from '@/components/ui/ProgressRing'

// Progress ring
<ProgressRing
  value={75}
  max={100}
  size="md"
  showLabel={true}
  label="Progress"
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value |
| `max` | `number` | `100` | Maximum value |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ring size |
| `showLabel` | `boolean` | `true` | Show label |
| `label` | `string` | `''` | Label text |
| `color` | `string` | `'#6172f3'` | Ring color |

#### Examples
```javascript
// Progress ring with custom styling
<ProgressRing
  value={60}
  max={100}
  size="lg"
  color="#10b981"
  label="Tasks Completed"
/>

// Progress ring without label
<ProgressRing
  value={45}
  max={100}
  showLabel={false}
/>
```

## 🔧 Utility Components

### 1. EmptyState Component

#### Basic Usage
```javascript
import EmptyState from '@/components/ui/EmptyState'

// Empty state
<EmptyState
  icon={<TaskIcon />}
  title="No tasks yet"
  description="Create your first task to get started"
  action={
    <Button onClick={handleCreateTask}>
      Create Task
    </Button>
  }
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | `null` | Icon element |
| `title` | `string` | `''` | Title text |
| `description` | `string` | `''` | Description text |
| `action` | `ReactNode` | `null` | Action element |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Empty state size |

#### Examples
```javascript
// Empty state with custom icon
<EmptyState
  icon={<SearchIcon className="w-16 h-16 text-gray-400" />}
  title="No results found"
  description="Try adjusting your search criteria"
  action={
    <Button variant="secondary" onClick={handleClearSearch}>
      Clear Search
    </Button>
  }
/>

// Empty state without action
<EmptyState
  icon={<CalendarIcon />}
  title="No events today"
  description="Your schedule is clear"
/>
```

### 2. Skeletons Component

#### Basic Usage
```javascript
import Skeletons from '@/components/ui/Skeletons'

// Loading skeletons
<Skeletons
  type="card"
  count={3}
  showAvatar={true}
  showActions={true}
/>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'card' \| 'list' \| 'table'` | `'card'` | Skeleton type |
| `count` | `number` | `1` | Number of skeletons |
| `showAvatar` | `boolean` | `false` | Show avatar skeleton |
| `showActions` | `boolean` | `false` | Show action skeletons |

#### Examples
```javascript
// List skeletons
<Skeletons
  type="list"
  count={5}
  showAvatar={true}
  showActions={true}
/>

// Table skeletons
<Skeletons
  type="table"
  count={10}
  showActions={false}
/>
```

### 3. Tooltip Component

#### Basic Usage
```javascript
import Tooltip from '@/components/ui/Tooltip'

// Tooltip
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | Tooltip content |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip placement |
| `delay` | `number` | `300` | Show delay in ms |
| `children` | `ReactNode` | `undefined` | Trigger element |

#### Examples
```javascript
// Tooltip with custom placement
<Tooltip content="Delete this task" placement="bottom">
  <Button variant="danger" icon={<TrashIcon />} />
</Tooltip>

// Tooltip with custom delay
<Tooltip content="Save changes" delay={500}>
  <Button variant="primary">Save</Button>
</Tooltip>
```

## 🎨 Styling Guidelines

### 1. Component Styling

#### TailwindCSS Classes
```javascript
// Use TailwindCSS classes for styling
const Button = ({ variant, size, className, ...props }) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2'
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )
  
  return <button className={classes} {...props} />
}
```

#### CSS Custom Properties
```css
/* Use CSS custom properties for theming */
:root {
  --color-primary: #6172f3;
  --color-primary-hover: #4f46e5;
  --color-primary-focus: #3730a3;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}

.dark {
  --color-primary: #8b5cf6;
  --color-primary-hover: #7c3aed;
  --color-primary-focus: #6d28d9;
}
```

### 2. Responsive Design

#### Mobile-First Approach
```javascript
// Use mobile-first responsive design
const Card = ({ children, className }) => {
  return (
    <div className={cn(
      'w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200',
      'sm:p-6 sm:rounded-xl',
      'md:shadow-md',
      'lg:p-8 lg:rounded-2xl',
      className
    )}>
      {children}
    </div>
  )
}
```

#### Breakpoint Usage
```javascript
// Use consistent breakpoints
const ResponsiveGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  )
}
```

## ♿ Accessibility Guidelines

### 1. ARIA Attributes

#### Proper ARIA Usage
```javascript
// Use ARIA attributes for accessibility
const Button = ({ children, disabled, loading, ...props }) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && <span className="sr-only">Loading...</span>}
      {children}
    </button>
  )
}
```

#### Focus Management
```javascript
// Manage focus for accessibility
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null)
  
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className="fixed inset-0 z-50"
    >
      {children}
    </div>
  )
}
```

### 2. Keyboard Navigation

#### Keyboard Support
```javascript
// Support keyboard navigation
const MenuItem = ({ children, onClick, ...props }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(e)
    }
  }
  
  return (
    <div
      {...props}
      role="menuitem"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
    >
      {children}
    </div>
  )
}
```

## 🧪 Testing Components

### 1. Component Tests

#### Testing Structure
```javascript
// Test component rendering and behavior
describe('Button Component', () => {
  it('should render with correct variant', () => {
    render(<Button variant="primary">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600')
  })
  
  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('should be disabled when loading', () => {
    render(<Button loading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

#### Accessibility Tests
```javascript
// Test accessibility features
describe('Button Accessibility', () => {
  it('should have proper ARIA attributes', () => {
    render(<Button loading>Click me</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toHaveAttribute('aria-busy', 'true')
  })
  
  it('should be keyboard accessible', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')
    
    button.focus()
    expect(button).toHaveFocus()
    
    fireEvent.keyDown(button, { key: 'Enter' })
    // Test Enter key behavior
  })
})
```

## 📚 Best Practices

### 1. Component Design

#### Single Responsibility
```javascript
// ✅ Good: Single responsibility
const TaskCard = ({ task, onUpdate, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onUpdate(task.id)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(task.id)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

// ❌ Bad: Multiple responsibilities
const TaskCardWithEverything = ({ task }) => {
  // Handles display, editing, deletion, API calls, etc.
}
```

#### Composition over Inheritance
```javascript
// ✅ Good: Use composition
const TaskList = ({ tasks, onTaskUpdate, onTaskDelete }) => {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={onTaskUpdate}
          onDelete={onTaskDelete}
        />
      ))}
    </div>
  )
}

// ❌ Bad: Use inheritance
class TaskCard extends BaseCard {
  // Inheritance-based approach
}
```

### 2. Performance Optimization

#### Memoization
```javascript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }))
  }, [data])
  
  const handleUpdate = useCallback((id, updates) => {
    onUpdate(id, updates)
  }, [onUpdate])
  
  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onUpdate={handleUpdate} />
      ))}
    </div>
  )
})
```

#### Lazy Loading
```javascript
// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))

const Dashboard = () => {
  const [showChart, setShowChart] = useState(false)
  
  return (
    <div>
      <Button onClick={() => setShowChart(true)}>
        Show Chart
      </Button>
      
      {showChart && (
        <Suspense fallback={<Skeletons type="card" count={1} />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  )
}
```

---

**Lưu ý**: Component library này được thiết kế để đảm bảo tính nhất quán, accessibility và hiệu năng. Khi tạo component mới, hãy tuân theo các patterns và guidelines đã được thiết lập.
