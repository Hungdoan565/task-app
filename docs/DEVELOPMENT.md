# HƯỚNG DẪN PHÁT TRIỂN DỰ ÁN TASK MANAGEMENT APP

## 📋 TỔNG QUAN DỰ ÁN

**Tên dự án:** Task Management App
**Công nghệ:** React 19 + Vite 7 + JavaScript (ES6+)
**Mô tả:** Ứng dụng quản lý công việc với drag & drop, real-time collaboration, và notifications

## 🚀 SETUP DỰ ÁN

### Bước 1: Cài đặt Dependencies

```powershell
# Cài đặt các thư viện cần thiết
npm install

# Cài đặt TailwindCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Cài đặt Firebase
npm install firebase

# Cài đặt thư viện Drag & Drop
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Cài đặt State Management
npm install zustand

# Cài đặt Routing
npm install react-router-dom

# Cài đặt Date utilities
npm install date-fns

# Cài đặt Icons
npm install lucide-react

# Cài đặt Form validation
npm install react-hook-form zod @hookform/resolvers
```

### Bước 2: Cấu hình TailwindCSS

Xem file `tailwind.config.js` - đã được config theo design system

### Bước 3: Setup Firebase

1. Tạo project trên [Firebase Console](https://console.firebase.google.com/)
2. Tạo file `.env` trong thư mục root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
# Tuỳ chọn: đặt false để chạy mock (không cần Firebase)
VITE_USE_FIREBASE=true
```

3. Không cần sửa code: `src/lib/firebase.js` tự đọc biến môi trường. Nếu thiếu biến hoặc `VITE_USE_FIREBASE=false`, app sẽ chạy ở MOCK MODE (dùng localStorage) để dev UI.
4. Enable Authentication (Email/Password + Google) và Firestore Database trong Firebase Console.
5. (Khuyến nghị) Dán Security Rules từ `docs/firebase-structure.json`.

### Bước 4: Chạy Development Server

```powershell
npm run dev
```

## 📂 CẤU TRÚC THƯ MỤC

```
task-app/
├── docs/                          # Tài liệu dự án
│   ├── design-system.json        # Hệ thống thiết kế (colors, typography, spacing)
│   ├── DEVELOPMENT.md            # Hướng dẫn phát triển (file này)
│   ├── ARCHITECTURE.md           # Kiến trúc hệ thống
│   ├── UI-COMPONENTS.md          # Danh sách components cần xây dựng
│   └── firebase-structure.json   # Cấu trúc Firestore database
│
├── public/                        # Static assets
│   └── vite.svg
│
├── src/
│   ├── components/               # React components
│   │   ├── ui/                   # Base UI components (Button, Input, Card, Dialog...)
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Dialog.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Avatar.jsx
│   │   │   └── Dropdown.jsx
│   │   │
│   │   ├── board/                # Board-related components
│   │   │   ├── Board.jsx         # Container cho tất cả columns
│   │   │   ├── Column.jsx        # Single column (Todo, In Progress, Done)
│   │   │   ├── TaskCard.jsx      # Task card với drag & drop
│   │   │   └── AddTaskButton.jsx
│   │   │
│   │   ├── task/                 # Task-related components
│   │   │   ├── TaskDetail.jsx    # Modal xem chi tiết task
│   │   │   ├── TaskForm.jsx      # Form tạo/sửa task
│   │   │   ├── TaskPriority.jsx  # Priority selector
│   │   │   └── TaskDueDate.jsx   # Due date picker
│   │   │
│   │   ├── auth/                 # Authentication components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.jsx        # Top navigation bar
│   │   │   ├── Sidebar.jsx       # Left sidebar
│   │   │   ├── MainLayout.jsx    # Main layout wrapper
│   │   │   └── Footer.jsx
│   │   │
│   │   └── common/               # Common/shared components
│   │       ├── LoadingSpinner.jsx
│   │       ├── ErrorBoundary.jsx
│   │       ├── Notification.jsx
│   │       └── ThemeToggle.jsx
│   │
│   ├── pages/                    # Page components (routes)
│   │   ├── HomePage.jsx          # Landing page
│   │   ├── LoginPage.jsx         # Login page
│   │   ├── RegisterPage.jsx      # Register page
│   │   ├── DashboardPage.jsx     # Main dashboard với boards
│   │   ├── BoardPage.jsx         # Single board view
│   │   └── NotFoundPage.jsx      # 404 page
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.js            # Hook quản lý authentication
│   │   ├── useTasks.js           # Hook quản lý tasks (CRUD + real-time)
│   │   ├── useBoards.js          # Hook quản lý boards
│   │   ├── useRealtime.js        # Hook Firestore real-time listeners
│   │   ├── useNotifications.js   # Hook quản lý notifications
│   │   └── useTheme.js           # Hook quản lý theme (light/dark)
│   │
│   ├── contexts/                 # React Context providers
│   │   ├── AuthContext.jsx       # Authentication context
│   │   └── ThemeContext.jsx      # Theme context
│   │
│   ├── stores/                   # Zustand stores
│   │   ├── taskStore.js          # Task state management
│   │   ├── boardStore.js         # Board state management
│   │   └── uiStore.js            # UI state (modals, sidebar...)
│   │
│   ├── lib/                      # Libraries & utilities
│   │   ├── firebase.js           # Firebase config & initialization
│   │   ├── firestore.js          # Firestore helper functions
│   │   ├── auth.js               # Firebase Auth helper functions
│   │   ├── utils.js              # Utility functions (cn, formatDate...)
│   │   ├── constants.js          # Constants (status, priorities...)
│   │   └── validators.js         # Zod validation schemas
│   │
│   ├── styles/                   # Styling files
│   │   ├── globals.css           # Global styles + TailwindCSS imports
│   │   └── animations.css        # Custom animations
│   │
│   ├── assets/                   # Assets (images, icons)
│   │   ├── icons/
│   │   └── react.svg
│   │
│   ├── App.jsx                   # Root App component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Base CSS
│
├── .env                          # Environment variables (KHÔNG commit)
├── .env.example                  # Example environment variables
├── .gitignore
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── postcss.config.js             # PostCSS config
├── tailwind.config.js            # TailwindCSS config
├── vite.config.js                # Vite config
├── WARP.md                       # Warp AI guidelines
└── README.md                     # Project readme
```

## 🔄 LUỒNG PHÁT TRIỂN (DEVELOPMENT FLOW)

### Phase 1: Setup & Foundation (Tuần 1-2)
**Mục tiêu:** Thiết lập nền tảng dự án

- [x] Cấu trúc thư mục
- [ ] Setup TailwindCSS với design system
- [ ] Setup Firebase (Auth + Firestore)
- [ ] Tạo base UI components (Button, Input, Card)
- [ ] Setup routing (React Router)
- [ ] Theme Provider (Dark/Light mode)
- [ ] Layout components (Header, Sidebar, MainLayout)

**Các file cần tạo:**
- `src/lib/firebase.js` - Firebase config
- `src/contexts/ThemeContext.jsx` - Theme provider
- `src/components/ui/Button.jsx` - Button component
- `src/components/ui/Input.jsx` - Input component
- `src/components/ui/Card.jsx` - Card component
- `src/components/layout/Header.jsx` - Header
- `src/components/layout/Sidebar.jsx` - Sidebar
- `src/components/layout/MainLayout.jsx` - Main layout

### Phase 2: Authentication (Tuần 2)
**Mục tiêu:** Xây dựng hệ thống đăng nhập/đăng ký

**Features:**
- Đăng ký với Email/Password
- Đăng nhập với Email/Password
- Đăng nhập với Google OAuth
- Quên mật khẩu
- Protected routes
- User profile

**Các file cần tạo:**
- `src/lib/auth.js` - Auth helper functions
- `src/contexts/AuthContext.jsx` - Auth context
- `src/hooks/useAuth.js` - Auth hook
- `src/components/auth/LoginForm.jsx`
- `src/components/auth/RegisterForm.jsx`
- `src/components/auth/ForgotPassword.jsx`
- `src/components/auth/ProtectedRoute.jsx`
- `src/pages/LoginPage.jsx`
- `src/pages/RegisterPage.jsx`

**Testing checklist:**
- [ ] User có thể đăng ký với email/password
- [ ] User có thể đăng nhập với email/password
- [ ] User có thể đăng nhập với Google
- [ ] User có thể reset password
- [ ] Protected routes redirect đến login
- [ ] Session được maintain sau khi refresh

### Phase 3: Core Task Management (Tuần 3-4)
**Mục tiêu:** Xây dựng tính năng quản lý task cơ bản

**Features:**
- Board layout với columns
- CRUD operations cho tasks
- Drag & drop giữa columns
- Priority levels
- Due dates

**Các file cần tạo:**
- `src/lib/firestore.js` - Firestore helpers
- `src/stores/taskStore.js` - Task state
- `src/stores/boardStore.js` - Board state
- `src/hooks/useTasks.js` - Task hook
- `src/components/board/Board.jsx`
- `src/components/board/Column.jsx`
- `src/components/board/TaskCard.jsx`
- `src/components/task/TaskForm.jsx`
- `src/components/task/TaskDetail.jsx`
- `src/pages/BoardPage.jsx`

**Testing checklist:**
- [ ] Hiển thị board với 3 columns (Todo, In Progress, Done)
- [ ] Tạo task mới
- [ ] Xem chi tiết task
- [ ] Sửa task
- [ ] Xóa task
- [ ] Drag task giữa columns
- [ ] Set priority cho task
- [ ] Set due date cho task

### Phase 4: Drag & Drop Implementation (Tuần 4)
**Mục tiêu:** Implement drag & drop với @dnd-kit

**Implementation steps:**
1. Wrap Board trong DndContext
2. Làm TaskCard thành draggable
3. Làm Column thành droppable
4. Handle onDragEnd event
5. Update Firestore khi drop
6. Thêm visual feedback (dragging state)

**Code example:**
```javascript
// src/components/board/Board.jsx
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

function Board() {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    // Update task position in Firestore
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      {/* Columns và TaskCards */}
    </DndContext>
  );
}
```

**Testing checklist:**
- [ ] Có thể drag task
- [ ] Có thể drop task vào column khác
- [ ] Visual feedback khi dragging
- [ ] Task position được save vào Firestore
- [ ] Smooth animation

### Phase 5: Real-time Collaboration (Tuần 5)
**Mục tiêu:** Implement Firestore real-time listeners

**Features:**
- Real-time task updates
- Multiple users cùng xem board
- Optimistic updates

**Các file cần tạo/update:**
- `src/hooks/useRealtime.js` - Real-time hook
- Update `src/hooks/useTasks.js` - Thêm real-time listeners

**Code example:**
```javascript
// src/hooks/useRealtime.js
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useRealtimeTasks(boardId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'tasks'),
      where('boardId', '==', boardId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [boardId]);

  return { tasks, loading };
}
```

**Testing checklist:**
- [ ] Tasks update real-time khi có thay đổi
- [ ] Multiple tabs/users thấy changes instantly
- [ ] Không có memory leaks (cleanup listeners)

### Phase 6: Notifications (Tuần 6)
**Mục tiêu:** Implement notification system

**Features:**
- Firebase Cloud Messaging setup
- Browser notifications
- In-app notification center
- Notification triggers (task assigned, due date, mentions)

**Các file cần tạo:**
- `public/firebase-messaging-sw.js` - Service worker
- `src/hooks/useNotifications.js` - Notifications hook
- `src/components/common/NotificationCenter.jsx`
- `src/components/common/NotificationItem.jsx`

**Testing checklist:**
- [ ] User được hỏi permission cho notifications
- [ ] Browser notifications hoạt động
- [ ] In-app notification center hiển thị
- [ ] Mark notification as read

### Phase 7: Polish & Optimization (Tuần 7-8)
**Mục tiêu:** Hoàn thiện và tối ưu hóa

**Tasks:**
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading states & skeletons
- [ ] Error handling & error boundaries
- [ ] Performance optimization (React.memo, useMemo, useCallback)
- [ ] Code splitting & lazy loading
- [ ] SEO optimization
- [ ] Accessibility (a11y)
- [ ] Testing (unit tests, integration tests)

## 🎨 STYLING GUIDELINES

### 1. Sử dụng TailwindCSS
- Ưu tiên dùng Tailwind utility classes
- Tham khảo `docs/design-system.json` cho colors, spacing
- Dùng custom classes trong `src/styles/globals.css` cho complex styles

### 2. Color System
```javascript
// Light mode
bg-white text-slate-900
bg-slate-50 border-slate-200

// Primary colors
bg-indigo-600 text-white
hover:bg-indigo-700

// Priority colors
bg-red-100 text-red-700    // High
bg-amber-100 text-amber-700 // Medium
bg-gray-100 text-gray-700   // Low
```

### 3. Spacing & Layout
```javascript
// Container
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

// Card spacing
p-4 sm:p-6 lg:p-8

// Gap between items
space-y-4 space-x-4
gap-4 gap-6
```

### 4. Responsive Design
```javascript
// Mobile first approach
<div className="
  px-4          // Mobile
  sm:px-6       // Tablet (640px+)
  lg:px-8       // Desktop (1024px+)
">
```

## 🔥 FIREBASE GUIDELINES

### 1. Firestore Collections Structure
```
users/{userId}
  - name, email, avatar, createdAt

workspaces/{workspaceId}
  - name, members[], createdBy, createdAt

boards/{boardId}
  - workspaceId, name, columns[], createdAt

tasks/{taskId}
  - boardId, columnId, title, description
  - assignedTo[], priority, dueDate
  - position, createdBy, createdAt

notifications/{notificationId}
  - userId, type, message, read, createdAt
```

### 2. Security Rules Principles
- User chỉ đọc/ghi data của mình
- Tasks: đọc nếu là member, ghi nếu là creator/assignee
- Validate data structure trước khi write

### 3. Query Optimization
- Sử dụng indexes cho compound queries
- Limit query results (pagination)
- Cache data khi có thể

## 🧪 TESTING STRATEGY

### Unit Tests (Vitest)
```powershell
# Chạy tests
npm run test

# Chạy tests với coverage
npm run test:coverage
```

Test các utility functions, hooks, và pure components.

### Component Tests (React Testing Library)
Test user interactions và component behavior.

### E2E Tests (Cypress)
Test các user flows chính:
- Authentication flow
- Create/edit/delete task
- Drag & drop tasks
- Real-time updates

## 📝 COMMIT GUIDELINES

Sử dụng Conventional Commits format:

```
feat: thêm drag & drop cho task cards
fix: sửa lỗi real-time listener không cleanup
docs: cập nhật hướng dẫn setup Firebase
style: format code với Prettier
refactor: tối ưu TaskCard component
test: thêm tests cho useAuth hook
chore: update dependencies
```

## 🚨 COMMON ISSUES & SOLUTIONS

### Issue 1: Firebase không connect được
**Solution:** Kiểm tra `.env` file, đảm bảo tất cả variables có prefix `VITE_`

### Issue 2: Drag & drop không hoạt động
**Solution:** Kiểm tra DndContext wrapper và unique IDs cho draggable items

### Issue 3: Real-time listeners gây memory leak
**Solution:** Đảm bảo cleanup listeners trong useEffect return function

### Issue 4: Build size quá lớn
**Solution:** 
- Sử dụng dynamic imports cho code splitting
- Kiểm tra bundle size với `npm run build -- --analyze`
- Tree-shake unused dependencies

## 📚 TÀI LIỆU THAM KHẢO

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [dnd-kit Documentation](https://docs.dndkit.com/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [React Router Documentation](https://reactrouter.com/)

## 🎯 NEXT STEPS

1. **Hiện tại:** Setup project structure & dependencies
2. **Tiếp theo:** Implement authentication
3. **Sau đó:** Build core task management features
4. **Cuối cùng:** Polish & deploy

---

**Lưu ý:** File này sẽ được cập nhật liên tục trong quá trình phát triển. Mọi thay đổi về architecture hoặc workflow cần được document lại ở đây.
