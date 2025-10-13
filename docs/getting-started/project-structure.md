# Project Structure

Tài liệu chi tiết về cấu trúc dự án TaskApp và cách tổ chức code.

## 📁 Root Directory Structure

```
task-app/
├── 📁 config/                 # Configuration files
│   ├── eslint.config.js       # ESLint configuration
│   ├── vite.config.js        # Vite build configuration
│   └── vitest.config.js      # Vitest test configuration
├── 📁 docs/                   # Documentation
│   ├── README.md             # Main documentation
│   ├── getting-started/      # Getting started guides
│   ├── design-system/       # Design system docs
│   ├── architecture/        # Architecture docs
│   ├── development/         # Development guides
│   ├── deployment/          # Deployment guides
│   ├── features/            # Feature documentation
│   ├── security/            # Security guidelines
│   ├── analytics/           # Analytics documentation
│   ├── contributing/        # Contributing guidelines
│   └── maintenance/         # Maintenance guides
├── 📁 firebase/              # Firebase configuration
│   ├── firebase.json        # Firebase project config
│   ├── firestore.rules      # Firestore security rules
│   └── firestore.indexes.json # Firestore indexes
├── 📁 public/                # Static assets
│   ├── favicon-light.svg    # Light theme favicon
│   ├── favicon-dark.svg     # Dark theme favicon
│   ├── robots.txt           # SEO robots file
│   ├── sitemap.xml          # SEO sitemap
│   └── vite.svg             # Vite logo
├── 📁 scripts/               # Build and utility scripts
│   ├── backfill-owner.mjs   # Database migration script
│   ├── rules.test.mjs       # Firestore rules test
│   └── verify-owner.mjs     # Owner verification script
├── 📁 src/                   # Source code
├── 📁 tests/                 # Test files
├── 📁 dist/                  # Build output (generated)
├── 📁 node_modules/          # Dependencies (generated)
├── 📄 package.json           # Project dependencies
├── 📄 package-lock.json      # Dependency lock file
├── 📄 README.md              # Project README
├── 📄 index.html             # HTML entry point
├── 📄 vite.config.js         # Vite config (root)
├── 📄 postcss.config.js      # PostCSS configuration
└── 📄 tailwind.config.js     # TailwindCSS configuration
```

## 📁 Source Code Structure (`src/`)

```
src/
├── 📁 components/            # React components
│   ├── 📁 ui/               # Base UI components
│   │   ├── Avatar.jsx      # User avatar component
│   │   ├── Button.jsx      # Button component
│   │   ├── Card.jsx        # Card component
│   │   ├── Input.jsx       # Input component
│   │   ├── Modal.jsx       # Modal component
│   │   ├── Popover.jsx     # Popover component
│   │   ├── Tooltip.jsx     # Tooltip component
│   │   ├── ThemeToggle.jsx # Theme toggle component
│   │   ├── Skeletons.jsx   # Loading skeletons
│   │   └── Toast.css       # Toast styles
│   ├── 📁 dashboardV2/     # Dashboard-specific components
│   │   ├── Layout.jsx      # Dashboard layout
│   │   ├── Sidebar.jsx     # Navigation sidebar
│   │   ├── TopBar.jsx      # Top navigation bar
│   │   ├── QuickCapture.jsx # Quick task creation
│   │   ├── FocusList.jsx   # Focus task list
│   │   ├── NextUp.jsx      # Upcoming tasks
│   │   ├── AgendaMini.jsx  # Mini agenda
│   │   ├── PinnedCards.jsx # Pinned items
│   │   ├── TinyMetrics.jsx # Mini metrics
│   │   ├── GlanceCounters.jsx # Task counters
│   │   ├── DataInfo.jsx    # Data information
│   │   ├── BarChartMini.jsx # Mini bar chart
│   │   ├── DonutProgress.jsx # Progress donut
│   │   └── AreaChart.jsx   # Area chart
│   ├── 📁 auth/            # Authentication components
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── 📁 common/          # Shared components
│   ├── 📁 landing/         # Landing page components
│   │   ├── EnhancedFAQ.jsx # FAQ section
│   │   ├── EnhancedFeatures.jsx # Features section
│   │   └── LandingSections.jsx # Landing sections
│   ├── ErrorBoundary.jsx   # Error boundary
│   └── RouteAnalytics.jsx  # Route analytics
├── 📁 pages/               # Route pages
│   ├── DashboardV2.jsx    # Main dashboard
│   ├── EnhancedAuthPage.jsx # Authentication page
│   ├── SimpleLandingPage.jsx # Landing page
│   └── 📁 v2/             # Version 2 pages
│       ├── CalendarPage.jsx # Calendar page
│       ├── InboxPage.jsx   # Inbox page
│       ├── InsightsPage.jsx # Analytics page
│       ├── NotesPage.jsx   # Notes page
│       ├── ProjectsPage.jsx # Projects page
│       ├── SystemPages.jsx # System pages
│       ├── TasksPage.jsx   # Tasks page
│       ├── TemplatesPage.jsx # Templates page
│       └── WikiPage.jsx    # Wiki page
├── 📁 contexts/            # React Context providers
│   ├── AuthContext.jsx     # Authentication context
│   ├── ThemeContext.jsx    # Theme context
│   ├── ToastContext.jsx    # Toast notifications
│   └── UserContext.jsx     # User profile context
├── 📁 hooks/               # Custom React hooks
│   ├── useAccessibility.js # Accessibility hook
│   ├── useAnimations.js    # Animation hooks
│   ├── useCountUp.js       # Count up animation
│   ├── useHaptic.js        # Haptic feedback
│   ├── useMediaQuery.js    # Media query hook
│   └── useTasks.js         # Task management hook
├── 📁 lib/                 # Utility libraries
│   ├── analytics.js        # Analytics implementation
│   ├── animations.js       # Animation utilities
│   ├── auth.js             # Authentication utilities
│   ├── commandCenterDesign.js # Command palette design
│   ├── designSystem.js     # Design system utilities
│   ├── firebase.js         # Firebase configuration
│   ├── firestore.js        # Firestore utilities (deprecated)
│   ├── geniusDesignSystem.js # Advanced design system
│   ├── savedViews.js       # Saved views utilities
│   └── utils.js            # General utilities
├── 📁 services/            # Business logic services
│   ├── layoutService.js    # Layout management
│   ├── logger.js           # Logging service
│   ├── taskService.js      # Task management
│   └── userService.js      # User management
├── 📁 store/               # State management
│   ├── layoutStore.js      # Layout state
│   └── v2UIStore.js        # UI state
├── 📁 stores/              # Additional stores (empty)
├── 📁 styles/              # CSS styles
│   ├── dashboardV2.css     # Dashboard styles
│   ├── globals.css         # Global styles
│   └── theme.css           # Theme styles
├── 📁 assets/              # Static assets
│   ├── 📁 icons/           # Icon assets
│   └── 📁 img/             # Image assets
├── 📄 App.jsx              # Main App component
├── 📄 main.jsx             # Application entry point
├── 📄 index.css            # Main CSS file
├── 📄 logging.guard.js     # Logging guard
└── 📄 sentry.client.js     # Sentry error tracking
```

## 🏗️ Architecture Patterns

### 1. Component Organization

#### UI Components (`components/ui/`)
- **Purpose**: Reusable, generic UI components
- **Props**: Well-defined TypeScript interfaces
- **Styling**: TailwindCSS classes
- **Testing**: Unit tests required

#### Feature Components (`components/dashboardV2/`)
- **Purpose**: Feature-specific components
- **Dependencies**: Can use UI components
- **State**: Local state or context
- **Testing**: Integration tests

#### Page Components (`pages/`)
- **Purpose**: Route-level components
- **Structure**: Layout + Feature components
- **State**: Context providers
- **Testing**: E2E tests

### 2. Service Layer (`services/`)

#### Service Pattern
```javascript
// services/taskService.js
export const createTask = async (ownerId, data) => {
  // Business logic
}

export const updateTask = async (id, patch) => {
  // Business logic
}

export default {
  createTask,
  updateTask,
  // ... other methods
}
```

#### Service Responsibilities
- **Data Access**: Firebase/Firestore operations
- **Business Logic**: Data transformation and validation
- **Error Handling**: Consistent error management
- **Logging**: Service-level logging

### 3. Context Pattern (`contexts/`)

#### Context Structure
```javascript
// contexts/UserContext.jsx
const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)
  
  const value = {
    ...state,
    // Actions
    updateProfile: (updates) => dispatch({ type: 'UPDATE_PROFILE', payload: updates }),
    // ... other actions
  }
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
```

### 4. Hook Pattern (`hooks/`)

#### Custom Hook Structure
```javascript
// hooks/useTasks.js
export const useTasks = (ownerId) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const unsubscribe = subscribeTasksByOwner(ownerId, setTasks)
    return unsubscribe
  }, [ownerId])
  
  return { tasks, loading, error }
}
```

## 📋 Naming Conventions

### 1. Files and Directories

#### Components
- **PascalCase**: `Button.jsx`, `UserProfile.jsx`
- **Descriptive**: `QuickCapture.jsx`, `FocusList.jsx`
- **Consistent**: `DashboardV2.jsx`, `EnhancedAuthPage.jsx`

#### Utilities
- **camelCase**: `utils.js`, `taskService.js`
- **Descriptive**: `layoutService.js`, `userService.js`
- **Consistent**: `analytics.js`, `animations.js`

#### Styles
- **kebab-case**: `dashboard-v2.css`, `globals.css`
- **Descriptive**: `theme.css`, `globals.css`

### 2. Variables and Functions

#### React Components
```javascript
// Component names: PascalCase
const UserProfile = () => {}
const QuickCapture = () => {}

// Props: camelCase
const Button = ({ onClick, children, variant }) => {}

// State: camelCase
const [isLoading, setIsLoading] = useState(false)
const [userData, setUserData] = useState(null)
```

#### JavaScript Functions
```javascript
// Function names: camelCase
const createTask = async (data) => {}
const updateUserProfile = (updates) => {}

// Variables: camelCase
const taskService = new TaskService()
const userContext = useContext(UserContext)
```

#### Constants
```javascript
// Constants: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_ATTEMPTS = 3
const DEFAULT_THEME = 'light'
```

### 3. CSS Classes

#### TailwindCSS Classes
```css
/* Utility classes: kebab-case */
.btn-primary { }
.card-hover { }
.text-gradient { }

/* Component classes: BEM-like */
.dv2-link { }
.dv2-icon { }
.dv2-text { }
```

## 🔄 Data Flow

### 1. Component Data Flow
```
User Action → Component → Hook → Service → Firebase
                ↓
            Context → State Update → Re-render
```

### 2. State Management Flow
```
Local State → Context → Global State → Persistence
     ↓
Component Re-render → UI Update
```

### 3. Service Layer Flow
```
Component → Service → Firebase SDK → Firestore
     ↓
Error Handling → Logging → User Feedback
```

## 📦 Import/Export Patterns

### 1. Component Exports
```javascript
// Default export for main component
export default function Button() {}

// Named exports for utilities
export const ButtonVariants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
}

// Re-export from index
export { Button } from './Button'
export { ButtonVariants } from './Button'
```

### 2. Service Exports
```javascript
// Named exports for functions
export const createTask = async (data) => {}
export const updateTask = async (id, data) => {}

// Default export for service object
export default {
  createTask,
  updateTask,
  deleteTask
}
```

### 3. Import Organization
```javascript
// 1. React imports
import React, { useState, useEffect } from 'react'

// 2. Third-party imports
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// 3. Internal imports
import { Button } from '@/components/ui/Button'
import { useUser } from '@/contexts/UserContext'
import { createTask } from '@/services/taskService'

// 4. Relative imports
import './Button.css'
```

## 🧪 Testing Structure

### 1. Test Organization
```
tests/
├── 📁 unit/              # Unit tests
│   ├── components/       # Component tests
│   ├── services/         # Service tests
│   └── utils/            # Utility tests
├── 📁 integration/       # Integration tests
│   ├── auth/             # Authentication tests
│   └── tasks/            # Task management tests
├── 📁 e2e/               # End-to-end tests
│   ├── auth.spec.js      # Authentication flow
│   └── tasks.spec.js     # Task management flow
└── 📁 fixtures/          # Test data
    ├── users.json        # User test data
    └── tasks.json        # Task test data
```

### 2. Test Naming
```javascript
// Test files: *.test.jsx, *.spec.js
Button.test.jsx
taskService.test.js
auth.spec.js

// Test descriptions: descriptive
describe('Button Component', () => {
  it('should render with primary variant', () => {})
  it('should call onClick when clicked', () => {})
})
```

## 📚 Documentation Structure

### 1. Code Documentation
```javascript
/**
 * Creates a new task for the specified user
 * @param {string} ownerId - The ID of the task owner
 * @param {Object} data - Task data
 * @param {string} data.title - Task title
 * @param {string} data.description - Task description
 * @param {string} data.priority - Task priority (low|medium|high)
 * @returns {Promise<Object>} Created task object
 * @throws {Error} When task creation fails
 */
export const createTask = async (ownerId, data) => {
  // Implementation
}
```

### 2. Component Documentation
```javascript
/**
 * Button component with multiple variants and sizes
 * 
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 */
const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  // Implementation
}
```

## 🔧 Build Configuration

### 1. Vite Configuration
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), VitePWA()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore']
        }
      }
    }
  }
})
```

### 2. Environment Configuration
```javascript
// .env.local
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_APP_ENV=development
```

## 🚀 Deployment Structure

### 1. Build Output
```
dist/
├── 📁 assets/             # Bundled assets
│   ├── index-*.js         # JavaScript bundles
│   ├── index-*.css        # CSS bundles
│   └── *.png              # Optimized images
├── 📄 index.html          # HTML entry point
├── 📄 sw.js               # Service worker
├── 📄 manifest.webmanifest # PWA manifest
└── 📄 robots.txt          # SEO files
```

### 2. Firebase Hosting
```
firebase/
├── 📄 firebase.json       # Firebase configuration
├── 📄 firestore.rules     # Security rules
└── 📄 firestore.indexes.json # Database indexes
```

---

**Lưu ý**: Cấu trúc này được thiết kế để dễ bảo trì, mở rộng và hiểu. Khi thêm tính năng mới, hãy tuân theo các patterns đã được thiết lập.
