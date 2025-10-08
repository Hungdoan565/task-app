# Luồng Thiết Kế Mới - Dashboard Redesign

## Trạng Thái Hiện Tại

✅ **Đã dọn dẹp:**
- Backup layouts cũ (DashboardLayout.jsx.backup, AppShell.jsx.backup)
- Reset các trang dashboard về placeholder
- Tạo AppShell mới minimal để bắt đầu

## Luồng Thiết Kế A-Z

### 1. Layout & Navigation Structure
**Mục tiêu:** Thiết kế lại cấu trúc điều hướng và layout tổng thể

**Các file cần làm:**
- [ ] `src/components/layout/AppShell.jsx` - Main layout wrapper
- [ ] `src/components/navigation/Sidebar.jsx` - Sidebar navigation (nếu có)
- [ ] `src/components/navigation/TopBar.jsx` - Header/TopBar
- [ ] `src/components/navigation/MobileNav.jsx` - Mobile navigation

**Quyết định thiết kế:**
- [ ] Sidebar hay TopNav?
- [ ] Responsive breakpoints
- [ ] Dark mode strategy
- [ ] Animation/transitions

### 2. Dashboard Home Page
**Mục tiêu:** Trang chủ dashboard với overview

**Các file cần làm:**
- [ ] `src/pages/HomePage.jsx`
- [ ] `src/components/dashboard/StatsGrid.jsx` - KPI cards
- [ ] `src/components/dashboard/QuickActions.jsx`
- [ ] `src/components/dashboard/RecentActivity.jsx`

**Tính năng:**
- [ ] Statistics overview (tasks, completion rate)
- [ ] Quick add task
- [ ] Recent activity feed
- [ ] Upcoming due dates

### 3. Tasks Management Pages
**Mục tiêu:** Quản lý tasks với nhiều view modes

**Các file cần làm:**
- [ ] `src/pages/TasksPage.jsx` - Main tasks page
- [ ] `src/pages/KanbanPage.jsx` - Kanban board view
- [ ] `src/components/task/TaskList.jsx` - List view
- [ ] `src/components/task/TaskCard.jsx` - Task card component
- [ ] `src/components/task/TaskModal.jsx` - Task detail/edit modal

**Tính năng:**
- [ ] Multiple view modes (list, kanban, calendar)
- [ ] Filters & search
- [ ] Drag-and-drop
- [ ] Quick actions

### 4. Calendar & Timeline
**Mục tiêu:** Xem tasks theo thời gian

**Các file cần làm:**
- [ ] `src/pages/CalendarPage.jsx`
- [ ] `src/components/calendar/CalendarGrid.jsx`
- [ ] `src/components/calendar/DayView.jsx`
- [ ] `src/components/calendar/WeekView.jsx`

### 5. Settings & Profile
**Mục tiêu:** Quản lý tài khoản và cài đặt

**Các file cần làm:**
- [ ] `src/pages/ProfilePage.jsx`
- [ ] `src/pages/SettingsPage.jsx`
- [ ] `src/components/settings/GeneralSettings.jsx`
- [ ] `src/components/settings/NotificationSettings.jsx`

### 6. UI Components Library
**Tái sử dụng và chuẩn hóa:**

**Đã có sẵn (giữ lại):**
- ✅ `src/components/ui/Skeletons.jsx` - Loading states
- ✅ `src/components/ui/Avatar.jsx` - User avatars
- ✅ `src/components/ui/ThemeToggle.jsx` - Dark mode toggle
- ✅ `src/components/dashboard/KpiCard.jsx` - Stat cards
- ✅ `src/components/task/TaskItem.jsx` - Task list item

**Cần thêm:**
- [ ] Button variants
- [ ] Input components
- [ ] Modal/Dialog
- [ ] Dropdown/Select
- [ ] Toast notifications
- [ ] Empty states

## Design System Principles

### Colors
```
Primary: Blue (#3B82F6)
Success: Green (#10B981)
Warning: Amber (#F59E0B)
Danger: Red (#EF4444)
Neutral: Warm Gray
```

### Typography
```
Headings: Inter/SF Pro
Body: Inter/SF Pro
Mono: JetBrains Mono (code)
```

### Spacing
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Focus indicators
- [ ] Color contrast ratios

## Implementation Order

### Phase 1: Foundation (Week 1)
1. ✅ Backup old code
2. [ ] Define design system tokens
3. [ ] Create base AppShell layout
4. [ ] Implement navigation structure
5. [ ] Setup routing

### Phase 2: Core Pages (Week 2)
1. [ ] HomePage with stats
2. [ ] TasksPage list view
3. [ ] Task detail modal
4. [ ] Basic CRUD operations

### Phase 3: Advanced Features (Week 3)
1. [ ] Kanban board
2. [ ] Calendar view
3. [ ] Search & filters
4. [ ] Saved views

### Phase 4: Polish (Week 4)
1. [ ] Settings & Profile
2. [ ] Animations & transitions
3. [ ] Performance optimization
4. [ ] Accessibility audit
5. [ ] Documentation

## Notes

**Các components có thể tái sử dụng từ code cũ:**
- Services: `src/services/taskService.js` (giữ nguyên)
- Hooks: `src/hooks/useTasks.js` (giữ nguyên)
- Contexts: `src/contexts/UserContext.jsx` (giữ nguyên)
- Firebase config: `src/lib/firebase.js` (giữ nguyên)

**Code cũ được backup tại:**
- `src/components/layout/AppShell.jsx.backup`
- `src/components/layout/DashboardLayout.jsx.backup`

## Bắt đầu thiết kế

Hãy mô tả chi tiết luồng thiết kế của bạn, bao gồm:
1. Layout structure (sidebar, topbar, content area)
2. Navigation pattern
3. Color scheme & branding
4. Key features & interactions
5. Mobile responsiveness strategy

Sau đó chúng ta sẽ implement từng phần theo thứ tự.
