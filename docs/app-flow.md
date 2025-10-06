# 🚀 TaskApp - Application Flow & Architecture

## 📋 Tổng quan

TaskApp được thiết kế với flow logic chuyên nghiệp, rõ ràng giữa public và protected areas.

---

## 🔄 User Flow

### 1️⃣ **Landing Page** (Public - `/`)
- **Mục đích**: Marketing page để giới thiệu sản phẩm
- **Đối tượng**: Người dùng chưa đăng nhập
- **Chức năng**:
  - Hiển thị thông tin về ứng dụng
  - CTA buttons: "Get Started Free" và "Learn More"
  - **Auto-redirect**: Nếu user đã đăng nhập → redirect về `/dashboard`

### 2️⃣ **Auth Page** (`/auth`)
- **Mục đích**: Xác thực người dùng
- **Chức năng**:
  - Login với Email/Password
  - Login với Google OAuth
  - Login với GitHub OAuth
  - Sign up cho người dùng mới
- **Sau khi đăng nhập thành công**: Redirect về `/dashboard`

### 3️⃣ **Dashboard** (Protected - `/dashboard/*`)
Tất cả routes dưới `/dashboard` đều được bảo vệ bởi `ProtectedRoute` component.
Nếu user chưa đăng nhập → redirect về `/auth`

#### **Dashboard Layout Structure**
```
┌─────────────────────────────────────────┐
│  Sidebar    │   Main Content Area      │
│             │                           │
│  🏠 Home    │  [Dynamic content based   │
│  📝 Tasks   │   on current route]       │
│  👤 Profile │                           │
│  ⚙️ Settings│                           │
│             │                           │
│  User Info  │                           │
│  Sign Out   │                           │
└─────────────────────────────────────────┘
```

#### **Protected Routes**:

**a) Home - `/dashboard`** (Default landing after login)
- Dashboard overview với statistics
- Quick action cards
- Pro tips và recent activity
- **Highlights**:
  - Total Tasks, Completed, In Progress, To Do stats
  - Quick actions: Create Task, View All Tasks, Edit Profile

**b) Tasks - `/dashboard/tasks`**
- Quản lý tasks chính
- CRUD operations
- Filter và search
- Status management (Todo → In Progress → Done)

**c) Profile - `/dashboard/profile`**
- Basic Information (Display Name, Email, Provider)
- Account Statistics
- Preferences (Notifications settings)
- Account Details (Status, Member Since, Last Login)

**d) Settings - `/dashboard/settings`**
- Application preferences
- (Placeholder - Coming soon)

---

## 🔐 Authentication Flow

```
User visits Landing Page (/)
    │
    ├─→ Not authenticated
    │   ├─→ Can browse landing page
    │   └─→ Click "Get Started" → Go to /auth
    │
    └─→ Already authenticated
        └─→ Auto redirect to /dashboard
```

```
User on /auth page
    │
    ├─→ Choose login method
    │   ├─→ Email/Password
    │   ├─→ Google OAuth
    │   └─→ GitHub OAuth
    │
    └─→ After successful auth
        ├─→ Create/Update Firestore profile
        └─→ Redirect to /dashboard
```

```
User tries to access /dashboard/*
    │
    ├─→ Authenticated
    │   └─→ Show protected content
    │
    └─→ Not authenticated
        └─→ Redirect to /auth
```

---

## 📁 File Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx       # Route protection wrapper
│   └── layout/
│       └── DashboardLayout.jsx      # Sidebar + main content layout
│
├── pages/
│   ├── LandingPage.jsx              # Public marketing page
│   ├── EnhancedAuthPage.jsx         # Authentication page
│   ├── HomePage.jsx                 # Dashboard home/overview
│   ├── DashboardPage.jsx            # Tasks management
│   ├── ProfilePage.jsx              # User profile
│   └── SettingsPage.jsx             # App settings
│
├── contexts/
│   └── UserContext.jsx              # Auth & user state management
│
└── App.jsx                          # Main routing logic
```

---

## 🎨 Design Principles

### 1. **Separation of Concerns**
- Public pages (Landing, Auth) are separate from protected areas
- Each page has a single, clear responsibility

### 2. **User-First Navigation**
- Clear visual indicators for active routes
- Consistent navigation across all dashboard pages
- Quick access to frequently used features

### 3. **Progressive Disclosure**
- Landing page shows minimal info to encourage signup
- Dashboard reveals full functionality after authentication
- Home page provides overview before deep diving into specific areas

### 4. **Security First**
- All dashboard routes protected by authentication
- Automatic redirects prevent unauthorized access
- Loading states prevent flashing of unauthorized content

---

## 🛣️ Route Table

| Route | Access | Component | Purpose |
|-------|--------|-----------|---------|
| `/` | Public | LandingPage | Marketing & introduction |
| `/auth` | Public | EnhancedAuthPage | User authentication |
| `/dashboard` | Protected | HomePage | Dashboard overview |
| `/dashboard/tasks` | Protected | DashboardPage | Task management |
| `/dashboard/profile` | Protected | ProfilePage | User profile |
| `/dashboard/settings` | Protected | SettingsPage | App settings |
| `/*` | Any | Redirect to `/` | Catch-all route |

---

## 🔧 Key Components

### **ProtectedRoute**
```jsx
<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>
```
- Wraps protected routes
- Shows loading state while checking auth
- Redirects to `/auth` if not authenticated

### **DashboardLayout**
```jsx
<DashboardLayout>
  <YourDashboardContent />
</DashboardLayout>
```
- Provides consistent sidebar navigation
- Shows user info and sign out button
- Handles active route highlighting

---

## 🎯 Next Steps for Enhancement

1. **Add real-time updates** for tasks using Firestore listeners
2. **Implement search functionality** in tasks
3. **Add keyboard shortcuts** (Ctrl+K for search)
4. **Create Settings page** with real functionality
5. **Add notifications system**
6. **Implement task categories/tags**
7. **Add Kanban board view**
8. **Implement drag-and-drop** for tasks

---

## 📝 Notes

- All protected routes require active Firebase Authentication
- User profile is automatically created/updated in Firestore on login
- Stats are calculated from Firestore tasks collection
- Dark mode support is built-in throughout the app
