# System Patterns - TaskApp

## 🏗️ Architecture Overview

TaskApp follows a modern React architecture with clear separation of concerns, optimized for performance and maintainability.

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Presentation  │    │   Application   │    │   Infrastructure│
│   Layer         │    │   Layer         │    │   Layer         │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • Components    │    │ • Contexts      │    │ • Firebase      │
│ • Pages         │    │ • Hooks          │    │ • Services      │
│ • UI Library    │    │ • Stores         │    │ • Utils         │
│ • Animations    │    │ • State Mgmt     │    │ • Analytics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Key Technical Decisions

### 1. **React 19 + Vite 7 Stack**
**Decision**: Use latest React with Vite for maximum performance
**Rationale**: 
- React 19: Latest features, better performance, improved hydration
- Vite 7: Fastest build tool, excellent dev experience, optimized bundling
- Future-proof: Staying current with ecosystem

**Implementation**:
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/firestore'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    }
  }
})
```

### 2. **Firebase Backend**
**Decision**: Firebase for backend services
**Rationale**:
- Real-time synchronization
- Built-in authentication
- Scalable infrastructure
- Offline support
- Cost-effective for startup

**Services Used**:
- **Firestore**: Real-time database
- **Auth**: Authentication (Email, Google, GitHub)
- **Hosting**: CDN and hosting
- **Analytics**: User behavior tracking
- **Functions**: Serverless functions (future)

### 3. **Context + Hooks State Management**
**Decision**: React Context with custom hooks instead of Redux
**Rationale**:
- Simpler for small-medium apps
- Better TypeScript integration
- Less boilerplate
- Easier testing
- Built-in React patterns

**Implementation**:
```javascript
// contexts/UserContext.jsx
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Custom hooks for specific functionality
  const getUserDisplayName = useCallback(() => {
    return user?.displayName || user?.email || 'User'
  }, [user])
  
  return (
    <UserContext.Provider value={{ user, loading, getUserDisplayName }}>
      {children}
    </UserContext.Provider>
  )
}
```

### 4. **TailwindCSS v4 Design System**
**Decision**: Utility-first CSS with design tokens
**Rationale**:
- Rapid development
- Consistent design
- Small bundle size
- Easy maintenance
- Responsive by default

**Design Tokens**:
```css
:root {
  /* Colors */
  --primary: 217 91% 60%; /* #6172f3 */
  --secondary: 160 84% 39%; /* #14b8a6 */
  
  /* Typography */
  --font-family: 'Inter', system-ui, sans-serif;
  --font-size-base: 1.125rem; /* 18px */
  
  /* Spacing */
  --spacing-unit: 0.25rem; /* 4px */
}
```

### 5. **Framer Motion Animations**
**Decision**: Framer Motion for all animations
**Rationale**:
- Declarative API
- Performance optimized
- Accessibility support
- Rich animation library
- React integration

**Performance Optimization**:
```javascript
// lib/animationConfig.js
export const getAnimationConfig = (shouldAnimate) => {
  if (!shouldAnimate) {
    return { initial: {}, animate: {}, exit: {}, transition: { duration: 0 } }
  }
  
  return {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }
}
```

## 🔧 Component Architecture

### 1. **Component Hierarchy**
```
App
├── ThemeProvider
├── UserProvider
├── ToastProvider
└── Router
    ├── Public Routes
    │   ├── LandingPage
    │   └── AuthPage
    └── Protected Routes
        ├── DashboardV2
        ├── TasksPage
        ├── ProjectsPage
        └── SettingsPage
```

### 2. **Component Patterns**

#### **Layout Components**
```javascript
// components/dashboardV2/Layout.jsx
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-warm-gray-900">
      <Sidebar />
      <div className="lg:pl-64">
        <TopBar />
        <main className="py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

#### **Feature Components**
```javascript
// components/dashboardV2/QuickCapture.jsx
export default function QuickCapture({ onAddTask }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleSubmit = (data) => {
    onAddTask(data)
    setIsOpen(false)
  }
  
  return (
    <SectionCard title="Quick Capture">
      <button onClick={() => setIsOpen(true)}>
        Add new task...
      </button>
      {isOpen && <TaskForm onSubmit={handleSubmit} />}
    </SectionCard>
  )
}
```

#### **UI Components**
```javascript
// components/ui/SectionCard.jsx
export default function SectionCard({ title, children, className }) {
  return (
    <div className={`bg-white dark:bg-warm-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-warm-gray-700 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-warm-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-warm-gray-100">
            {title}
          </h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
```

### 3. **Custom Hooks Pattern**
```javascript
// hooks/useTasks.js
export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'tasks'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const tasksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setTasks(tasksData)
        setLoading(false)
      }
    )
    
    return unsubscribe
  }, [])
  
  const addTask = useCallback(async (taskData) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        ...taskData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }, [])
  
  return { tasks, loading, addTask }
}
```

## 🔄 Data Flow Patterns

### 1. **Firebase Integration**
```javascript
// lib/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  // Config from environment
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
```

### 2. **Real-time Data Sync**
```javascript
// services/taskService.js
export const subscribeToTasks = (userId, callback) => {
  return onSnapshot(
    query(
      collection(db, 'tasks'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    ),
    callback
  )
}
```

### 3. **Optimistic Updates**
```javascript
// components/TaskItem.jsx
const toggleTask = async (taskId) => {
  // Optimistic update
  setTasks(prev => prev.map(t => 
    t.id === taskId ? { ...t, completed: !t.completed } : t
  ))
  
  try {
    // Server update
    await updateDoc(doc(db, 'tasks', taskId), {
      completed: !task.completed,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    // Rollback on error
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: task.completed } : t
    ))
  }
}
```

## 🎨 Design Patterns

### 1. **Theme System**
```javascript
// contexts/ThemeContext.jsx
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system')
  
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', prefersDark)
    }
  }, [theme])
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### 2. **Responsive Design**
```javascript
// hooks/useMediaQuery.js
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    
    return () => media.removeEventListener('change', listener)
  }, [query])
  
  return matches
}
```

### 3. **Performance Optimization**
```javascript
// components/LazySection.jsx
const LazySection = lazy(() => import('./Section'))

export default function Page() {
  return (
    <Suspense fallback={<SectionSkeleton />}>
      <LazySection />
    </Suspense>
  )
}
```

## 🔒 Security Patterns

### 1. **Authentication Flow**
```javascript
// lib/auth.js
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    console.error('Google sign-in error:', error)
    throw error
  }
}
```

### 2. **Protected Routes**
```javascript
// components/auth/ProtectedRoute.jsx
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/auth" replace />
  
  return children
}
```

### 3. **Firestore Security Rules**
```javascript
// firebase/firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## 📊 Performance Patterns

### 1. **Code Splitting**
```javascript
// App.jsx
const DashboardV2 = lazy(() => import('./pages/DashboardV2'))
const TasksPage = lazy(() => import('./pages/v2/TasksPage'))

export default function App() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <Routes>
        <Route path="/dashboard" element={<DashboardV2 />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Suspense>
  )
}
```

### 2. **Memoization**
```javascript
// components/TaskList.jsx
const TaskList = memo(({ tasks, onToggleTask }) => {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggleTask}
        />
      ))}
    </div>
  )
})
```

### 3. **Virtual Scrolling** (Future)
```javascript
// components/VirtualTaskList.jsx
export default function VirtualTaskList({ tasks }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={tasks.length}
      itemSize={80}
    >
      {({ index, style }) => (
        <div style={style}>
          <TaskItem task={tasks[index]} />
        </div>
      )}
    </FixedSizeList>
  )
}
```

## 🧪 Testing Patterns

### 1. **Component Testing**
```javascript
// tests/TaskItem.test.jsx
describe('TaskItem', () => {
  it('should toggle task completion', () => {
    const mockTask = { id: '1', title: 'Test task', completed: false }
    const mockOnToggle = jest.fn()
    
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />)
    
    fireEvent.click(screen.getByRole('checkbox'))
    expect(mockOnToggle).toHaveBeenCalledWith('1')
  })
})
```

### 2. **Hook Testing**
```javascript
// tests/useTasks.test.js
describe('useTasks', () => {
  it('should fetch tasks on mount', async () => {
    const { result } = renderHook(() => useTasks())
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.tasks).toHaveLength(3)
  })
})
```

---

**Last Updated**: January 2025  
**Status**: Active Development  
**Next Review**: February 2025
