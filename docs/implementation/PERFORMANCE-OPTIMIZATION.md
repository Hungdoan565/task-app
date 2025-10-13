# Performance Optimization Guide
# TaskApp - Speed & Efficiency

**Version:** 1.0  
**Last Updated:** January 2025  
**Target:** < 1s load time, 60fps animations

---

## Performance Goals

| Metric | Current | Target | Priority |
|--------|---------|--------|----------|
| First Contentful Paint (FCP) | 1.2s | < 0.8s | Critical |
| Time to Interactive (TTI) | 2.1s | < 1.5s | Critical |
| Largest Contentful Paint (LCP) | 1.8s | < 1.2s | High |
| Total Blocking Time (TBT) | 250ms | < 150ms | High |
| Cumulative Layout Shift (CLS) | 0.05 | < 0.1 | Medium |
| Bundle Size (Initial) | 450KB | < 200KB | Critical |

---

## 1. Code Splitting & Lazy Loading

### Route-Based Code Splitting

```javascript
// src/App.jsx
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingScreen from '@/components/ui/LoadingScreen'

// Lazy load routes
const DashboardV2 = lazy(() => import('./pages/DashboardV2'))
const TasksPage = lazy(() => import('./pages/v2/TasksPage'))
const CalendarPage = lazy(() => import('./pages/v2/CalendarPage'))
const ProjectsPage = lazy(() => import('./pages/v2/ProjectsPage'))
const NotesPage = lazy(() => import('./pages/v2/NotesPage'))
const WikiPage = lazy(() => import('./pages/v2/WikiPage'))

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/dashboard" element={<DashboardV2 />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/wiki" element={<WikiPage />} />
      </Routes>
    </Suspense>
  )
}
```

### Component-Level Code Splitting

```javascript
// Lazy load heavy components
const CommandPalette = lazy(() => import('@/components/ui/CommandPalette'))
const RichTextEditor = lazy(() => import('@/components/ui/RichTextEditor'))
const ChartComponent = lazy(() => import('@/components/dashboardV2/AreaChart'))

// Usage with loading state
const Dashboard = () => {
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  
  return (
    <div>
      {/* Main content */}
      
      {showCommandPalette && (
        <Suspense fallback={<div>Loading...</div>}>
          <CommandPalette onClose={() => setShowCommandPalette(false)} />
        </Suspense>
      )}
    </div>
  )
}
```

### Vite Configuration

```javascript
// config/vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          
          // Feature chunks
          'dashboard': ['./src/pages/DashboardV2.jsx'],
          'tasks': ['./src/pages/v2/TasksPage.jsx'],
        },
      },
    },
    // Optimize chunks
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
```

---

## 2. Image Optimization

### Responsive Images

```jsx
// Use srcSet for responsive images
<img
  src="/images/hero-640w.webp"
  srcSet="
    /images/hero-320w.webp 320w,
    /images/hero-640w.webp 640w,
    /images/hero-1280w.webp 1280w
  "
  sizes="(max-width: 640px) 100vw, 640px"
  alt="Dashboard preview"
  loading="lazy"
  decoding="async"
/>
```

### Image Component

```jsx
// components/ui/OptimizedImage.jsx
const OptimizedImage = ({ src, alt, width, height, priority = false }) => {
  const [loaded, setLoaded] = useState(false)
  
  return (
    <div className="relative" style={{ aspectRatio: `${width}/${height}` }}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
```

### Build-time Image Optimization

```bash
# Install image optimization tools
npm install -D sharp imagemin imagemin-webp

# Create optimization script
node scripts/optimize-images.js
```

```javascript
// scripts/optimize-images.js
import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const optimizeImages = async (dir) => {
  const files = readdirSync(dir)
  
  for (const file of files) {
    const filePath = join(dir, file)
    
    if (statSync(filePath).isDirectory()) {
      await optimizeImages(filePath)
      continue
    }
    
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      // Convert to WebP
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp'))
      
      // Create responsive versions
      const sizes = [320, 640, 1280]
      for (const size of sizes) {
        await sharp(filePath)
          .resize(size)
          .webp({ quality: 80 })
          .toFile(filePath.replace(/\.(jpg|jpeg|png)$/i, `-${size}w.webp`))
      }
    }
  }
}

optimizeImages('./public/images')
```

---

## 3. Font Optimization

### Font Loading Strategy

```html
<!-- index.html -->
<head>
  <!-- Preload critical fonts -->
  <link
    rel="preload"
    href="/fonts/inter-var.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
  
  <!-- Preconnect to external font sources -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
```

```css
/* src/index.css */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap; /* Show fallback font immediately */
  font-style: normal;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Subset Fonts

```bash
# Use pyftsubset to create font subsets
pip install fonttools brotli

# Create Latin subset
pyftsubset inter-var.woff2 \
  --output-file=inter-var-latin.woff2 \
  --flavor=woff2 \
  --layout-features=* \
  --unicodes=U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD
```

---

## 4. Caching Strategy

### Service Worker Caching

```javascript
// vite.config.js - PWA configuration
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'firebase-storage-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'firestore-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 5, // 5 minutes
              },
            },
          },
        ],
      },
    }),
  ],
})
```

### Browser Caching Headers

```javascript
// firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|webp|svg)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(woff|woff2|ttf|otf)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

---

## 5. React Performance Optimization

### Memoization

```jsx
// Use React.memo for expensive components
const TaskCard = React.memo(({ task, onUpdate, onDelete }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => onUpdate(task.id)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison function
  return (
    prevProps.task.id === nextProps.task.id &&
    prevProps.task.title === nextProps.task.title &&
    prevProps.task.description === nextProps.task.description
  )
})

// Use useMemo for expensive calculations
const TaskStats = ({ tasks }) => {
  const stats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
      overdue: tasks.filter(t => t.dueDate < new Date() && !t.completed).length,
    }
  }, [tasks])
  
  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Pending: {stats.pending}</p>
      <p>Overdue: {stats.overdue}</p>
    </div>
  )
}

// Use useCallback for event handlers
const TaskList = ({ tasks, onTaskUpdate }) => {
  const handleUpdate = useCallback((taskId, updates) => {
    onTaskUpdate(taskId, updates)
  }, [onTaskUpdate])
  
  return (
    <div>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  )
}
```

### Virtual Scrolling

```jsx
// components/ui/VirtualList.jsx
import { useVirtualizer } from '@tanstack/react-virtual'

const VirtualTaskList = ({ tasks }) => {
  const parentRef = useRef(null)
  
  const virtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // Estimated height of each item
    overscan: 5, // Render 5 items above/below viewport
  })
  
  return (
    <div
      ref={parentRef}
      className="h-screen overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const task = tasks[virtualItem.index]
          
          return (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <TaskCard task={task} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

---

## 6. Database Optimization

### Firestore Query Optimization

```javascript
// Use composite indexes
// firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "tasks",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "owner", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "dueAt", "order": "ASCENDING" }
      ]
    }
  ]
}

// Optimize queries
const getTasks = async (userId, status) => {
  // ✅ Good: Use indexed fields
  const q = query(
    collection(db, 'tasks'),
    where('owner', '==', userId),
    where('status', '==', status),
    orderBy('dueAt', 'asc'),
    limit(20) // Always use limit
  )
  
  return getDocs(q)
}

// ❌ Bad: Unindexed query
const getBadTasks = async (userId) => {
  const q = query(
    collection(db, 'tasks'),
    where('owner', '==', userId),
    orderBy('createdAt', 'desc') // No limit, could return thousands
  )
  
  return getDocs(q)
}
```

### Pagination

```javascript
const usePaginatedTasks = (userId, pageSize = 20) => {
  const [tasks, setTasks] = useState([])
  const [lastDoc, setLastDoc] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  
  const loadMore = async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    
    try {
      let q = query(
        collection(db, 'tasks'),
        where('owner', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      )
      
      if (lastDoc) {
        q = query(q, startAfter(lastDoc))
      }
      
      const snapshot = await getDocs(q)
      
      if (snapshot.empty) {
        setHasMore(false)
        return
      }
      
      const newTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      
      setTasks(prev => [...prev, ...newTasks])
      setLastDoc(snapshot.docs[snapshot.docs.length - 1])
      setHasMore(snapshot.docs.length === pageSize)
    } finally {
      setLoading(false)
    }
  }
  
  return { tasks, loadMore, hasMore, loading }
}
```

---

## 7. Animation Performance

### GPU-Accelerated Animations

```css
/* Use transform and opacity for animations */
.animated-element {
  /* ✅ Good: GPU-accelerated */
  transform: translateX(100px);
  opacity: 0.5;
  will-change: transform, opacity;
  
  /* ❌ Bad: Causes reflow/repaint */
  /* left: 100px; */
  /* width: 200px; */
}

/* Enable hardware acceleration */
.hw-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### Framer Motion Optimization

```jsx
// Use layout animations sparingly
const TaskCard = ({ task }) => {
  return (
    <motion.div
      layout // Only use when necessary
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1], // Custom easing
      }}
    >
      {/* Content */}
    </motion.div>
  )
}

// Optimize list animations
const TaskList = ({ tasks }) => {
  return (
    <AnimatePresence mode="popLayout">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </AnimatePresence>
  )
}
```

---

## 8. Monitoring & Measurement

### Performance Monitoring

```javascript
// lib/performance.js
export const measurePerformance = () => {
  if (typeof window === 'undefined') return
  
  // Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log(entry.name, entry.startTime)
      
      // Send to analytics
      trackEvent('performance_metric', {
        metric: entry.name,
        value: entry.startTime,
        rating: getRating(entry.name, entry.startTime),
      })
    }
  })
  
  observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] })
  
  // Measure custom metrics
  performance.mark('app-start')
  
  // Later...
  performance.mark('app-interactive')
  performance.measure('app-load-time', 'app-start', 'app-interactive')
}

const getRating = (metric, value) => {
  const thresholds = {
    'first-contentful-paint': { good: 1800, poor: 3000 },
    'largest-contentful-paint': { good: 2500, poor: 4000 },
    'time-to-interactive': { good: 3800, poor: 7300 },
  }
  
  const threshold = thresholds[metric]
  if (!threshold) return 'unknown'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx vite-bundle-visualizer

# Check for duplicate dependencies
npx depcheck

# Analyze why a package is included
npx whybundled [package-name]
```

---

## Performance Checklist

### Critical (Week 1)
- [ ] Implement route-based code splitting
- [ ] Optimize images (WebP, responsive)
- [ ] Configure font loading strategy
- [ ] Set up service worker caching
- [ ] Add React.memo to expensive components

### High Priority (Week 2)
- [ ] Implement virtual scrolling for long lists
- [ ] Optimize Firestore queries with indexes
- [ ] Add pagination for large datasets
- [ ] Configure bundle splitting
- [ ] Optimize animations (GPU-accelerated)

### Medium Priority (Week 3-4)
- [ ] Implement lazy loading for heavy components
- [ ] Add performance monitoring
- [ ] Optimize third-party scripts
- [ ] Implement request batching
- [ ] Add resource hints (preload, prefetch)

---

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [Firebase Performance](https://firebase.google.com/docs/perf-mon)

---

**Version:** 1.0  
**Last Updated:** January 2025  
**Target Achievement:** March 2025

