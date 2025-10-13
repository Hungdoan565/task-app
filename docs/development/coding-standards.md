# Coding Standards

Tiêu chuẩn viết code và best practices cho TaskApp để đảm bảo tính nhất quán và chất lượng.

## 📝 General Principles

### 1. Code Quality Principles

#### SOLID Principles
- **Single Responsibility**: Mỗi function/component chỉ có một trách nhiệm
- **Open/Closed**: Mở rộng, đóng sửa đổi
- **Liskov Substitution**: Thay thế được
- **Interface Segregation**: Tách interface
- **Dependency Inversion**: Đảo ngược phụ thuộc

#### DRY (Don't Repeat Yourself)
```javascript
// ❌ Bad: Duplicate code
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validateUserEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ✅ Good: Reusable function
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validateUserEmail = validateEmail
```

#### KISS (Keep It Simple, Stupid)
```javascript
// ❌ Bad: Overcomplicated
const getTaskStatus = (task) => {
  if (task.completed === true) {
    return 'completed'
  } else if (task.inProgress === true) {
    return 'in-progress'
  } else if (task.pending === true) {
    return 'pending'
  } else {
    return 'unknown'
  }
}

// ✅ Good: Simple and clear
const getTaskStatus = (task) => {
  if (task.completed) return 'completed'
  if (task.inProgress) return 'in-progress'
  return 'pending'
}
```

### 2. Code Organization

#### File Structure
```javascript
// 1. Imports (grouped)
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { useUser } from '@/contexts/UserContext'
import { createTask } from '@/services/taskService'

// 2. Constants
const TASK_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
}

// 3. Types/Interfaces
interface TaskFormProps {
  onSubmit: (data: TaskData) => void
  initialData?: TaskData
}

// 4. Component
const TaskForm = ({ onSubmit, initialData }: TaskFormProps) => {
  // 5. State
  const [formData, setFormData] = useState(initialData || {})
  const [loading, setLoading] = useState(false)
  
  // 6. Hooks
  const navigate = useNavigate()
  const { user } = useUser()
  
  // 7. Event handlers
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
    } finally {
      setLoading(false)
    }
  }
  
  // 8. Effects
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])
  
  // 9. Render
  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  )
}

// 10. Export
export default TaskForm
```

## 🎨 JavaScript/TypeScript Standards

### 1. Variable Declarations

#### Use const by default
```javascript
// ✅ Good: Use const for immutable values
const API_BASE_URL = 'https://api.example.com'
const TASK_STATUSES = ['todo', 'in-progress', 'done']

// ✅ Good: Use let for mutable values
let currentUser = null
let taskCount = 0

// ❌ Bad: Use var
var oldVariable = 'deprecated'
```

#### Descriptive naming
```javascript
// ✅ Good: Descriptive names
const userTaskList = []
const isTaskCompleted = true
const taskCreationDate = new Date()

// ❌ Bad: Unclear names
const list = []
const flag = true
const date = new Date()
```

### 2. Function Declarations

#### Function styles
```javascript
// ✅ Good: Arrow functions for callbacks
const handleClick = () => {
  console.log('Button clicked')
}

// ✅ Good: Regular functions for components
function TaskCard({ task }) {
  return <div>{task.title}</div>
}

// ✅ Good: Async functions
const fetchTasks = async () => {
  const response = await fetch('/api/tasks')
  return response.json()
}
```

#### Function parameters
```javascript
// ✅ Good: Destructure parameters
const createTask = ({ title, description, priority }) => {
  // Implementation
}

// ✅ Good: Default parameters
const formatDate = (date = new Date()) => {
  return date.toISOString()
}

// ❌ Bad: Too many parameters
const createTask = (title, description, priority, dueDate, tags, assignee, project) => {
  // Too many parameters
}

// ✅ Good: Use object parameter
const createTask = ({ title, description, priority, dueDate, tags, assignee, project }) => {
  // Implementation
}
```

### 3. Error Handling

#### Try-catch blocks
```javascript
// ✅ Good: Proper error handling
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch user data:', error)
    throw error
  }
}

// ✅ Good: Error boundaries in React
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
```

### 4. Async/Await

#### Proper async handling
```javascript
// ✅ Good: Use async/await
const processTasks = async () => {
  try {
    const tasks = await fetchTasks()
    const processedTasks = await Promise.all(
      tasks.map(task => processTask(task))
    )
    return processedTasks
  } catch (error) {
    console.error('Error processing tasks:', error)
    throw error
  }
}

// ❌ Bad: Promise chains
const processTasks = () => {
  return fetchTasks()
    .then(tasks => {
      return Promise.all(tasks.map(task => processTask(task)))
    })
    .catch(error => {
      console.error('Error processing tasks:', error)
      throw error
    })
}
```

## ⚛️ React Standards

### 1. Component Structure

#### Functional components
```javascript
// ✅ Good: Functional component with hooks
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(task)

  useEffect(() => {
    setEditData(task)
  }, [task])

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="task-card"
    >
      {isEditing ? (
        <TaskEditForm
          data={editData}
          onChange={setEditData}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <TaskDisplay
          task={task}
          onEdit={() => setIsEditing(true)}
          onDelete={onDelete}
        />
      )}
    </motion.div>
  )
}

export default TaskCard
```

### 2. Hooks Usage

#### Custom hooks
```javascript
// ✅ Good: Custom hook for task management
const useTasks = (userId) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const userTasks = await getTasksByOwner(userId)
        setTasks(userTasks)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [userId])

  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(userId, taskData)
      setTasks(prev => [newTask, ...prev])
    } catch (err) {
      setError(err)
    }
  }

  return { tasks, loading, error, addTask }
}
```

#### Hook dependencies
```javascript
// ✅ Good: Correct dependencies
useEffect(() => {
  const fetchData = async () => {
    const data = await fetchUserData(userId)
    setUserData(data)
  }
  
  fetchData()
}, [userId]) // Only userId in dependencies

// ❌ Bad: Missing dependencies
useEffect(() => {
  const fetchData = async () => {
    const data = await fetchUserData(userId)
    setUserData(data)
  }
  
  fetchData()
}, []) // Missing userId dependency
```

### 3. State Management

#### Local state
```javascript
// ✅ Good: Use useState for simple state
const [isOpen, setIsOpen] = useState(false)
const [count, setCount] = useState(0)

// ✅ Good: Use useReducer for complex state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all'
}

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(taskReducer, initialState)
```

#### Context usage
```javascript
// ✅ Good: Context for global state
const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const value = {
    user,
    loading,
    setUser,
    login: async (credentials) => {
      const userData = await authenticate(credentials)
      setUser(userData)
    },
    logout: () => {
      setUser(null)
    }
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
```

### 4. Performance Optimization

#### Memoization
```javascript
// ✅ Good: Use React.memo for expensive components
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

// ✅ Good: Use useMemo for expensive calculations
const TaskStats = ({ tasks }) => {
  const stats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length
    }
  }, [tasks])

  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Pending: {stats.pending}</p>
    </div>
  )
}
```

## 🎨 CSS/Styling Standards

### 1. TailwindCSS Usage

#### Class organization
```javascript
// ✅ Good: Organized classes
const Button = ({ variant, size, children, ...props }) => {
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
    sizeClasses[size]
  )
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
```

#### Responsive design
```javascript
// ✅ Good: Mobile-first responsive design
const Card = ({ children }) => {
  return (
    <div className="
      w-full
      p-4
      bg-white
      rounded-lg
      shadow-sm
      border
      border-gray-200
      sm:p-6
      sm:rounded-xl
      md:shadow-md
      lg:p-8
      lg:rounded-2xl
    ">
      {children}
    </div>
  )
}
```

### 2. CSS Modules (if used)

#### Module structure
```css
/* TaskCard.module.css */
.card {
  @apply w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200;
}

.cardHeader {
  @apply flex items-center justify-between mb-3;
}

.cardTitle {
  @apply text-lg font-semibold text-gray-900;
}

.cardContent {
  @apply text-gray-600;
}

.cardActions {
  @apply flex items-center gap-2 mt-4;
}

/* Dark mode */
.dark .card {
  @apply bg-gray-800 border-gray-700;
}

.dark .cardTitle {
  @apply text-white;
}

.dark .cardContent {
  @apply text-gray-300;
}
```

## 🧪 Testing Standards

### 1. Test Structure

#### Component tests
```javascript
// ✅ Good: Component test structure
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TaskCard from '../TaskCard'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('TaskCard', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false
  }

  const mockProps = {
    task: mockTask,
    onUpdate: jest.fn(),
    onDelete: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render task information', () => {
    renderWithRouter(<TaskCard {...mockProps} />)
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('should call onUpdate when task is edited', async () => {
    renderWithRouter(<TaskCard {...mockProps} />)
    
    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)
    
    const titleInput = screen.getByDisplayValue('Test Task')
    fireEvent.change(titleInput, { target: { value: 'Updated Task' } })
    
    const saveButton = screen.getByRole('button', { name: /save/i })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(mockProps.onUpdate).toHaveBeenCalledWith({
        ...mockTask,
        title: 'Updated Task'
      })
    })
  })

  it('should call onDelete when delete button is clicked', () => {
    renderWithRouter(<TaskCard {...mockProps} />)
    
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)
    
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockTask.id)
  })
})
```

#### Service tests
```javascript
// ✅ Good: Service test structure
import { createTask, updateTask, deleteTask } from '../taskService'
import { db } from '../../lib/firebase'

// Mock Firebase
jest.mock('../../lib/firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn(),
      doc: jest.fn(() => ({
        update: jest.fn(),
        delete: jest.fn()
      }))
    }))
  }
}))

describe('taskService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createTask', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        priority: 'high'
      }

      const mockAdd = jest.fn().mockResolvedValue({ id: '1' })
      db.collection.mockReturnValue({ add: mockAdd })

      const result = await createTask('user1', taskData)

      expect(mockAdd).toHaveBeenCalledWith({
        owner: 'user1',
        ownerId: 'user1',
        title: 'Test Task',
        description: 'Test Description',
        priority: 'high',
        status: 'todo',
        position: expect.any(Number),
        createdAt: expect.any(Object),
        updatedAt: expect.any(Object)
      })

      expect(result).toEqual({
        id: '1',
        ...taskData
      })
    })

    it('should handle errors gracefully', async () => {
      const mockAdd = jest.fn().mockRejectedValue(new Error('Network error'))
      db.collection.mockReturnValue({ add: mockAdd })

      await expect(createTask('user1', { title: 'Test' })).rejects.toThrow('Network error')
    })
  })
})
```

### 2. Test Naming

#### Descriptive test names
```javascript
// ✅ Good: Descriptive test names
describe('TaskCard Component', () => {
  it('should display task title and description', () => {})
  it('should show edit form when edit button is clicked', () => {})
  it('should call onUpdate with correct data when form is submitted', () => {})
  it('should show confirmation dialog when delete button is clicked', () => {})
  it('should handle network errors gracefully', () => {})
})

// ❌ Bad: Unclear test names
describe('TaskCard', () => {
  it('should work', () => {})
  it('should handle click', () => {})
  it('should not break', () => {})
})
```

## 📚 Documentation Standards

### 1. Code Comments

#### Function documentation
```javascript
/**
 * Creates a new task for the specified user
 * @param {string} ownerId - The ID of the task owner
 * @param {Object} data - Task data
 * @param {string} data.title - Task title (required)
 * @param {string} data.description - Task description
 * @param {string} data.priority - Task priority ('low' | 'medium' | 'high')
 * @param {Date} data.dueDate - Task due date
 * @returns {Promise<Object>} Created task object with ID
 * @throws {Error} When task creation fails
 * @example
 * const task = await createTask('user123', {
 *   title: 'Complete project',
 *   priority: 'high',
 *   dueDate: new Date('2024-12-31')
 * })
 */
export const createTask = async (ownerId, data) => {
  // Implementation
}
```

#### Component documentation
```javascript
/**
 * TaskCard component displays a single task with edit/delete functionality
 * 
 * @param {Object} props - Component props
 * @param {Object} props.task - Task object
 * @param {string} props.task.id - Task ID
 * @param {string} props.task.title - Task title
 * @param {string} props.task.description - Task description
 * @param {boolean} props.task.completed - Task completion status
 * @param {Function} props.onUpdate - Callback when task is updated
 * @param {Function} props.onDelete - Callback when task is deleted
 * 
 * @example
 * <TaskCard
 *   task={task}
 *   onUpdate={handleUpdate}
 *   onDelete={handleDelete}
 * />
 */
const TaskCard = ({ task, onUpdate, onDelete }) => {
  // Implementation
}
```

### 2. README Documentation

#### Component README
```markdown
# TaskCard Component

A reusable component for displaying and managing individual tasks.

## Features

- Display task information
- Edit task inline
- Delete task with confirmation
- Responsive design
- Accessibility support

## Usage

```jsx
import TaskCard from '@/components/TaskCard'

<TaskCard
  task={task}
  onUpdate={handleUpdate}
  onDelete={handleDelete}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| task | Object | Yes | Task object |
| onUpdate | Function | Yes | Callback when task is updated |
| onDelete | Function | Yes | Callback when task is deleted |

## Examples

### Basic Usage
```jsx
<TaskCard
  task={{
    id: '1',
    title: 'Complete project',
    description: 'Finish the project by Friday',
    completed: false
  }}
  onUpdate={(updatedTask) => console.log('Updated:', updatedTask)}
  onDelete={(taskId) => console.log('Deleted:', taskId)}
/>
```
```

## 🔧 Tool Configuration

### 1. ESLint Configuration

#### Recommended rules
```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      // Code quality
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      
      // React specific
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Import organization
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always'
      }]
    }
  }
]
```

### 2. Prettier Configuration

#### Formatting rules
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### 3. VS Code Settings

#### Recommended settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact"
  ],
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

---

**Lưu ý**: Các tiêu chuẩn này được thiết kế để đảm bảo tính nhất quán, khả năng đọc và bảo trì code. Tất cả thành viên team cần tuân theo các tiêu chuẩn này.
