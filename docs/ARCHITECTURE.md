# ARCHITECTURE.md

Tổng quan kiến trúc hệ thống cho TaskApp. Tài liệu này mô tả các thành phần chính, luồng dữ liệu, nguyên tắc thiết kế, và đề xuất cải tiến khi mở rộng.

## 1) Mục tiêu kiến trúc
- Đơn giản, dễ hiểu, phù hợp MVP nhưng dễ mở rộng
- Realtime-first với Firestore, hỗ trợ offline (IndexedDB persistence)
- UI mượt, dark mode class-based, tôn trọng reduced-motion
- Theo dõi hành vi bằng analytics không xâm phạm quyền riêng tư

## 2) Thành phần chính
- UI (React 19 + Tailwind v4 + Framer Motion)
  - pages/ (route-level)
  - components/ (feature folders: task, board, ui, layout, auth)
- State/Context
  - contexts/ThemeContext: quản lý theme (light/dark/system) + cập nhật class html & meta
  - contexts/UserContext (hoặc AuthContext/UserContext tùy theo dự án): thông tin người dùng, prefer
  - stores/ (Zustand) cho state cục bộ/feature khi cần
- Data Layer
  - lib/firebase: khởi tạo Firebase (Auth, Firestore, Analytics)
  - services/*: tách hàm CRUD (createTask, updateTask…) khỏi UI, gom logic truy vấn
  - Firestore full SDK + onSnapshot
- Analytics
  - lib/analytics.js: wrapper trackEvent, setUserId, setUserProperties; isSupported guard
- Routing
  - React Router DOM + lazy routes + Suspense + AnimatePresence transitions
- PWA
  - vite-plugin-pwa (generateSW) + runtime caching
- SEO
  - react-helmet-async, OG/Twitter cards

## 3) Luồng dữ liệu (ví dụ: Tasks)
1. UI (TasksPanel/KanbanBoard) gọi service (taskService) để đọc/ghi
2. Đọc: đăng ký onSnapshot(query) → cập nhật state cục bộ (useState/Zustand) → render
3. Ghi: create/update/delete → thành công sẽ phản chiếu ngay (optimistic) + server sync; onSnapshot đồng bộ lại
4. Analytics: tại điểm tương tác UI → gọi trackEvent qua wrapper

Sơ đồ (mô tả văn bản):
UI (React) ↔ Services (taskService, userService) ↔ Firestore (onSnapshot/CRUD)
           ↘ Analytics wrapper (logEvent Firebase Analytics)

## 4) Theming & chống FOUC
- index.html có anti-FOUC script: xét localStorage('theme') & system, gắn class .dark vào html trước khi hydrate
- ThemeContext đồng bộ: thêm/bớt .dark, cập nhật meta theme-color, favicon
- Body có lớp nền/chữ: `bg-white dark:bg-warm-gray-950 text-warm-gray-900 dark:text-warm-gray-100`
- Tailwind v4 với `@custom-variant dark` đã structure để dark variant hoạt động xuyên suốt

## 5) Routing & Code Splitting
- App.jsx: lazy import các page, bọc bởi Suspense + PageLoadingSkeleton
- AnimatePresence dùng để chuyển cảnh nhẹ nhàng
- Prefetch: khi hover CTA landing → prefetch bundle auth

## 6) Animation & Reduced Motion
- Framer Motion cho enter/exit; xem `AnimatedBackground`, components
- Tôn trọng `prefers-reduced-motion`: giảm/skip animation nặng, rút gọn hiệu ứng nền

## 7) Analytics
- Wrapper `src/lib/analytics.js` bảo vệ `isSupported()` và lọc param rỗng
- Tên sự kiện snake_case; không gửi PII
- Điểm tích hợp hiện tại: Auth (login/register), TasksPanel (create/search/move), Kanban (drag/drop)

## 8) PWA & Offline
- vite-plugin-pwa với precache assets
- Firestore IndexedDB persistence: đọc/ghi được khi offline, đồng bộ lại khi online
- Nên cân nhắc trang offline fallback (đang trong roadmap)

## 9) Xử lý lỗi
- ErrorBoundary ở root
- Tại services: normalize lỗi Firebase (mã lỗi → thông điệp thân thiện), không log PII
- UI hiển thị lỗi ngắn gọn + retry nhẹ

## 10) Hiệu năng
- Lazy routes, manualChunks trong vite config
- Giảm re-render: memo hóa list, key ổn định, tách nhỏ components
- Icon: ưu tiên gói nhẹ; ảnh/SVG tối ưu

## 11) Cải tiến đề xuất (nếu cần)
- Chuẩn hóa Services: đảm bảo tất cả Firestore CRUD chỉ qua services (không gọi trực tiếp trong UI)
- Tách hooks domain: useTasks, useKanban để gom logic subscribe/transform
- TanStack Query (tùy chọn): có thể cân nhắc cho phần không realtime hoặc khi cần caching nâng cao
- Logging/Monitoring: Sentry cho FE lỗi runtime + performance
- Mở rộng domain: projects/labels; coi xét subcollection nếu quy mô lớn

## 12) Testing
- Unit/Component: Vitest + RTL cho services và components chính
- E2E (sau): đăng nhập → tạo/kéo thả task → tìm kiếm → đổi theme → offline preview
