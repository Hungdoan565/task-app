# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tổng Quan Dự Án

**Tên:** Task Management App  
**Mô tả:** Ứng dụng quản lý công việc với drag & drop, real-time collaboration, và notifications  
**Stack:** React 19 + Vite 7 + JavaScript (ES6+)  
**Database:** Firebase (Firestore + Authentication)  
**Styling:** TailwindCSS với design system tùy chỉnh  
**State Management:** Zustand  
**Drag & Drop:** @dnd-kit  

## Commands Thường Dùng

### Development
```powershell path=null start=null
# Chạy dev server (http://localhost:5173)
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint toàn bộ project
npm run lint

# Lint file cụ thể
npm run lint -- src/components/board/Board.jsx
```

### Setup Dependencies (chỉ chạy lần đầu hoặc khi cần)
```powershell path=null start=null
# Cài đặt tất cả dependencies
npm install

# Setup TailwindCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Cài thư viện bổ sung
npm install firebase @dnd-kit/core @dnd-kit/sortable zustand react-router-dom date-fns lucide-react react-hook-form zod @hookform/resolvers
```

## Kiến Trúc Hệ Thống (High-Level)

### 1. Application Flow
```
index.html → src/main.jsx → src/App.jsx
                                ↓
                    React Router (routes)
                                ↓
              ┌─────────────────┼─────────────────┐
              ↓                 ↓                 ↓
        LoginPage          DashboardPage      BoardPage
                                                  ↓
                                      ┌───────────┴───────────┐
                                      ↓                      ↓
                                   Board                  TaskDetail
                                      ↓
                        ┌─────────────┼─────────────┐
                        ↓             ↓             ↓
                    Column        Column        Column
                     (Todo)    (In Progress)   (Done)
                        ↓             ↓             ↓
                    TaskCard      TaskCard      TaskCard
```

### 2. Cấu Trúc Thư Mục Quan Trọng
```
src/
├── components/
│   ├── ui/          # Base components (Button, Input, Card, Dialog, Badge...)
│   ├── board/       # Board, Column, TaskCard, AddTaskButton
│   ├── task/        # TaskDetail, TaskForm, TaskPriority, TaskDueDate
│   ├── auth/        # LoginForm, RegisterForm, ProtectedRoute
│   ├── layout/      # Header, Sidebar, MainLayout
│   └── common/      # LoadingSpinner, ErrorBoundary, Notification
├── pages/           # Route pages (HomePage, LoginPage, BoardPage...)
├── hooks/           # Custom hooks (useAuth, useTasks, useRealtime...)
├── contexts/        # React Context (AuthContext, ThemeContext)
├── stores/          # Zustand stores (taskStore, boardStore, uiStore)
├── lib/             # Utilities
│   ├── firebase.js  # Firebase config & initialization
│   ├── firestore.js # Firestore helper functions
│   ├── auth.js      # Firebase Auth helpers
│   ├── utils.js     # Utility functions (cn, formatDate...)
│   └── constants.js # Constants (status, priorities...)
└── styles/          # Global styles & animations
```

### 3. State Management Strategy
- **Authentication:** AuthContext (React Context) + Firebase Auth
- **Tasks & Boards:** Zustand stores với Firestore real-time sync
- **UI State:** Zustand uiStore (modals, sidebar open/close...)
- **Theme:** ThemeContext (light/dark mode)

### 4. Data Flow với Firebase
```
Component → Custom Hook (useTasks) → Zustand Store ↔ Firestore
                                           ↓
                                 Real-time listeners
                                           ↓
                            Auto-update UI khi data thay đổi
```

### 5. Drag & Drop Architecture
- Sử dụng @dnd-kit/core và @dnd-kit/sortable
- Board component chứa DndContext
- TaskCard là draggable items (useSortable hook)
- Column là droppable zones (useDroppable hook)
- onDragEnd handler update Firestore position

## Firebase Structure

**Collections:**
- `users/{userId}` - Thông tin user
- `workspaces/{workspaceId}` - Workspace/team
- `boards/{boardId}` - Boards trong workspace
- `tasks/{taskId}` - Tasks với fields: boardId, columnId, title, description, priority, dueDate, assignedTo, position
- `notifications/{notificationId}` - User notifications
- `comments/{commentId}` - Comments trên tasks
- `activityLogs/{logId}` - Activity history

**Chi tiết:** Xem `docs/firebase-structure.json`

## Design System

**Colors:** Indigo primary (#6366f1), slate neutral, priority colors (red/amber/gray)  
**Typography:** Inter font family  
**Spacing:** Tailwind scale (4px base unit)  
**Components:** Định nghĩa trong `docs/design-system.json`  

**Theme Support:** Light & Dark mode với ThemeContext

## Styling Guidelines

### Sử dụng TailwindCSS Utilities
```jsx
// Primary button
<button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">

// Card
<div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">

// Responsive spacing
<div className="px-4 sm:px-6 lg:px-8">
```

### Priority Badge Colors
- **High:** `bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200`
- **Medium:** `bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200`
- **Low:** `bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300`

## Development Phases

### Phase 1: Foundation (Tuần 1-2) ✅ (đang làm)
- Setup TailwindCSS + design system
- Firebase setup
- Base UI components
- Authentication flow

### Phase 2: Core Features (Tuần 3-4)
- Board & Column components
- TaskCard với CRUD
- Drag & drop implementation
- Firestore integration

### Phase 3: Advanced Features (Tuần 5-6)
- Real-time collaboration
- Notifications system
- Comments
- Activity logs

### Phase 4: Polish (Tuần 7-8)
- Responsive design
- Performance optimization
- Testing
- Deployment

## Environment Variables

**Required:** Tạo file `.env` trong root với các biến:
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

**Lưu ý:** Tất cả env vars phải có prefix `VITE_` để Vite expose chúng

## Testing Strategy

*Chưa setup:* Sẽ dùng Vitest cho unit tests, React Testing Library cho component tests, Cypress cho E2E tests

## File Pointers (Quick Navigation)

**Documentation:**
- `docs/DEVELOPMENT.md` - Hướng dẫn phát triển chi tiết (Vietnamese)
- `docs/design-system.json` - Design system specifications
- `docs/firebase-structure.json` - Firestore collections & security rules
- `docs/ARCHITECTURE.md` - System architecture details
- `docs/UI-COMPONENTS.md` - Component specifications

**Config Files:**
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - TailwindCSS theme config
- `eslint.config.js` - ESLint flat config
- `package.json` - Dependencies & scripts

**Entry Points:**
- `index.html` - HTML template
- `src/main.jsx` - App entry point
- `src/App.jsx` - Root component với routing

## Common Patterns

### Creating a New Component
```jsx
// src/components/ui/Button.jsx
import { cn } from '@/lib/utils';

export function Button({ children, variant = 'primary', size = 'md', className, ...props }) {
  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-colors',
        variant === 'primary' && 'bg-indigo-600 hover:bg-indigo-700 text-white',
        size === 'md' && 'px-4 py-2 text-base',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Using Firestore Real-time
```jsx
// src/hooks/useTasks.js
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useTasks(boardId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tasks'), where('boardId', '==', boardId));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskData);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup
  }, [boardId]);

  return { tasks, loading };
}
```

## Conventions

- **Components:** PascalCase (Button.jsx, TaskCard.jsx)
- **Hooks:** camelCase với prefix 'use' (useAuth.js, useTasks.js)
- **Utilities:** camelCase (formatDate, cn)
- **Constants:** UPPER_SNAKE_CASE
- **CSS Classes:** Tailwind utilities ưu tiên, custom classes trong globals.css
- **Commits:** Conventional Commits (feat:, fix:, docs:, style:, refactor:, test:, chore:)

## Troubleshooting

**Firebase không connect:** Kiểm tra `.env` file, ensure VITE_ prefix  
**Drag & drop không work:** Check DndContext wrapper và unique IDs  
**Real-time không update:** Verify Firestore listeners cleanup trong useEffect  
**Build size lớn:** Use dynamic imports, analyze với `npm run build -- --analyze`
