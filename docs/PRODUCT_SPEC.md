# PRODUCT_SPEC.md

Đặc tả sản phẩm và luồng chức năng (user flows) cho TaskApp. Mục tiêu là giúp nắm rõ cấu trúc tổng thể và tiêu chí chấp nhận (acceptance criteria) cho các tính năng chính.

## 1) Tổng quan
- TaskApp: công cụ quản lý công việc lấy cảm hứng từ Notion — đơn giản, mượt, realtime, hỗ trợ offline cơ bản qua PWA + Firestore persistence.
- Persona mục tiêu: cá nhân, nhóm nhỏ cần quản lý task theo danh sách và kanban.
- Mục tiêu chính: tạo/ghi nhớ/cập nhật công việc nhanh; kéo thả trực quan; theo dõi tiến độ.

## 2) Phạm vi tính năng (MVP+)
- Landing: giới thiệu, CTA rõ ràng; SEO cơ bản + OG/Twitter
- Auth: Email/Password, Google, GitHub; hỗ trợ tạo hồ sơ user trong Firestore
- Dashboard/Home: tổng quan nhanh (số task, done…), truy cập Tasks/Kanban
- Tasks Panel: danh sách, tạo nhanh, lọc theo trạng thái, tìm kiếm (client-side)
- Kanban Board: cột `todo → in_progress → done`, kéo thả giữa các cột
- Task Detail Modal: xem/sửa chi tiết, đổi trạng thái, xóa
- Settings/Appearance: theme light/dark/system; tôn trọng reduced-motion
- PWA: precache, runtime cache tối thiểu; offline persistence Firestore
- Analytics: theo dõi sự kiện UI quan trọng, không PII

## 3) Kiến trúc & cấu trúc (ngắn gọn)
- Frontend: React + Vite, Tailwind v4, Framer Motion
- State: Context (Theme, User) + Zustand cho feature store khi cần
- Data: Firebase Auth + Firestore (full SDK, onSnapshot, offline persistence)
- Routing: React Router DOM (lazy routes + Suspense)
- SEO: react-helmet-async
- PWA: vite-plugin-pwa (generateSW)

## 4) Luồng chức năng (User Flows)

### 4.1 Landing → Auth
- Người dùng vào trang chủ, thấy giới thiệu và CTA (Sign up/Sign in)
- Khi hover CTA, prefetch bundle Auth để tăng tốc
- Bấm CTA → điều hướng /auth (EnhancedAuthPage) kèm `mode` (login/register) nếu có
- Analytics:
  - cta_click: { id: 'hero_start' | 'navbar_auth', source: 'landing' }
  - route_view: { path: '/' }

### 4.2 Đăng nhập/Đăng ký (Auth)
- Email & Password:
  - Đăng nhập: nhập email/password → submit → nếu thành công điều hướng Dashboard/Home
  - Đăng ký: nhập full name/email/password/confirm → tạo user, cập nhật profile → điều hướng Home
- OAuth:
  - Google/GitHub popup → nếu thành công tạo/cập nhật profile Firestore → điều hướng Home
- Xử lý lỗi: hiển thị thông điệp thân thiện; tắt spinner; không lộ chi tiết kỹ thuật
- Analytics:
  - auth_success | auth_register_success (giữ lịch sử)
  - login_success | register_success: { method: 'email' | 'google' | 'github' }
  - auth_error: { method, code }

### 4.3 Onboarding nhanh (trong Home)
- Lần đầu: gợi ý tạo task đầu tiên, xem Kanban, chuyển theme
- CTA tạo task → mở ô nhập nhanh hoặc chuyển tới Tasks Panel
- Analytics: funnel_step: { step: 'onboarding_*' }

### 4.4 Tasks Panel (Danh sách)
- Hiển thị danh sách task của user (realtime onSnapshot); mặc định sắp xếp theo createdAt desc
- Tạo nhanh: nhập tiêu đề và Enter → thêm task mới ở đầu danh sách
- Filter: all/todo/in_progress/done
- Search: lọc client-side theo title/description
- Mở chi tiết: mở TaskModal để xem/sửa/xóa
- Analytics:
  - create_task: { source: 'tasks_panel' }
  - tasks_filter: { filter }
  - search_performed: { location: 'tasks_panel', q_len }
  - task_modal_open | task_modal_close
  - task_update | task_delete
  - task_moved: { from, to }

### 4.5 Kanban Board
- 3 cột: todo, in_progress, done
- Có thể tạo task ngay trong cột; kéo thả card để đổi cột
- Analytics:
  - create_task: { source: 'kanban', column }
  - kanban_drag_start | kanban_drag_cancel
  - kanban_drop: { id, from, to }
  - task_moved: { source: 'kanban', from, to }

### 4.6 Settings/Appearance
- Theme: light/dark/system; cập nhật `.dark` trên html, đổi màu theme-color và favicon
- Reduced motion: giảm bớt animation; AnimatedBackground rút gọn trên mobile/reduced-motion
- Analytics:
  - theme_set: { mode: 'light'|'dark'|'system', effective: 'light'|'dark' }
  - user properties: { preferred_theme }

### 4.7 PWA & Offline
- Precache asset tĩnh; runtime cache đơn giản cho resource Firebase tĩnh
- Firestore: IndexedDB persistence cho đọc/ghi offline tạm thời; đồng bộ khi online
- Fallback: hiển thị thông báo khi offline nếu cần

## 5) Tiêu chí chấp nhận (Acceptance Criteria)

### Auth
- [ ] Đăng nhập email hợp lệ điều hướng sang Home/Dashboard
- [ ] Đăng ký email hợp lệ tạo user + profile, điều hướng sau 1–2s
- [ ] OAuth Google/GitHub hoạt động; xử lý popup đóng
- [ ] Sự kiện analytics login_success/register_success được bắn đúng method

### Tasks Panel
- [ ] Tạo task bằng Enter thêm vào đầu danh sách và hiển thị ngay (realtime)
- [ ] Bộ lọc hoạt động: all/todo/in_progress/done cập nhật kết quả
- [ ] Tìm kiếm nội bộ theo title/description; debounce ≥ 300–400ms
- [ ] Task modal mở/đóng trơn tru; chỉnh sửa, xoá hoạt động
- [ ] Sự kiện create_task, search_performed, task_moved được bắn theo hành vi

### Kanban Board
- [ ] Tạo task ngay trong cột; kéo thả mượt; đổi cột cập nhật ngay
- [ ] Sự kiện kanban_drop và task_moved có from/to chính xác

### Settings/Theme
- [ ] Tắt/mở dark mode không FOUC; body đổi nền/chữ đúng
- [ ] Mode `system` theo dõi thay đổi hệ thống
- [ ] Giảm chuyển động khi reduced-motion bật

### PWA
- [ ] Build có service worker; `npm run preview` hoạt động offline cơ bản (assets)
- [ ] Không block hoạt động online/realtime của Firestore

## 6) Theo dõi & Analytics (tóm tắt)
- Quy ước: snake_case; không PII
- Sự kiện chính:
  - route_view, cta_click
  - login_success, register_success, auth_error
  - create_task, task_update, task_delete, task_moved, task_modal_open/close
  - tasks_filter, search_performed
  - theme_set
- Tham số (ví dụ): { method, source, from, to, q_len }

## 7) Ràng buộc phi chức năng
- Hiệu năng: TTI nhanh; lazy routes; bundle được chia hợp lý; prefetch khi có thể
- A11y: keyboard, focus ring, tương phản màu, aria
- SEO: title/description, OG/Twitter cards, có thể bổ sung JSON-LD sau
- Bảo mật: không log PII; rules Firestore an toàn; .env khi triển khai

## 8) Rủi ro & edge cases
- Mất kết nối khi ghi Firestore: cần thông báo/đồng bộ lại khi online
- Kéo thả trên thiết bị chạm (mobile) cần tinh chỉnh
- Xung đột dữ liệu realtime khi nhiều thiết bị chỉnh cùng lúc

## 9) Lộ trình ngắn hạn (gợi ý)
- Onboarding checklist nhẹ trong Home
- Settings nâng cao: density, accent color, reduced motion toggle
- Offline fallback UI tốt hơn; sentry/error reporting
- Mở rộng analytics: funnel đầy đủ từ landing → activation
