# ANALYTICS.md

Chuẩn hoá sự kiện analytics cho TaskApp. Mục tiêu: đo lường hành vi quan trọng mà không xâm phạm quyền riêng tư.

## 1) Nguyên tắc
- Tên sự kiện snake_case (ví dụ: `create_task`)
- Tham số snake_case, chỉ gồm metadata cần thiết; tuyệt đối không PII (email, tên đầy đủ…)
- Dùng wrapper `src/lib/analytics.js` để gọi `trackEvent(name, params)`
- Debounce/throttle ở nơi hợp lý (ví dụ: search)
- Có thể set user properties an toàn: `preferred_theme`, v.v.

## 2) User properties
- preferred_theme: 'light' | 'dark'
- plan (tương lai)
- locale (tương lai)

## 3) Danh mục sự kiện (catalog)

- route_view: { path }
- cta_click: { id, source }
- theme_set: { mode: 'light'|'dark'|'system', effective: 'light'|'dark' }

Auth
- login_success: { method: 'email'|'google'|'github' }
- register_success: { method: 'email'|'google'|'github' }
- auth_success (giữ lịch sử): { method }
- auth_register_success (giữ lịch sử): { method }
- auth_error: { method, code }

Tasks (List)
- create_task: { source: 'tasks_panel'|'kanban', column? }
- task_update: { id?, keys }
- task_delete: { id? }
- task_moved: { from, to, source? }
- task_modal_open: { id }
- task_modal_close: {}
- tasks_filter: { filter }
- search_performed: { location, q_len }

Kanban
- kanban_drag_start: { id }
- kanban_drag_cancel: {}
- kanban_drop: { id, from, to }

## 4) Map tương tác → sự kiện
- TasksPanel: tạo → create_task; tìm kiếm → search_performed; đổi trạng thái → task_moved; filter → tasks_filter; modal open/close → task_modal_*
- KanbanBoard: kéo thả xong → kanban_drop + task_moved; tạo task trong cột → create_task{source:'kanban'}
- Auth: đăng nhập/đăng ký thành công → login_success/register_success; lỗi → auth_error
- ThemeToggle/ThemeContext: theme_set + user property preferred_theme

## 5) Ví dụ sử dụng
```js path=null start=null
import { trackEvent } from '@/lib/analytics'

// Tạo task từ TasksPanel
trackEvent('create_task', { source: 'tasks_panel' })

// Kéo thả card
trackEvent('task_moved', { from: 'todo', to: 'in_progress', source: 'kanban' })

// Đăng nhập thành công
trackEvent('login_success', { method: 'google' })
```

## 6) QA & Debug
- Sử dụng Google Analytics DebugView khi chạy bản development
- Wrapper `isSupported()` đã phòng ngừa lỗi môi trường
- Kiểm tra payload: không chứa PII; độ dài param hợp lý
- Đối với search, chỉ gửi độ dài chuỗi (`q_len`), không gửi nội dung tìm kiếm

## 7) Quy trình thêm sự kiện mới
1. Đặt tên snake_case, xác định tham số tối thiểu
2. Cập nhật docs/ANALYTICS.md và docs/analytics-schema.json
3. Thêm trackEvent vào đúng điểm tương tác (UI hoặc service)
4. QA trên Dev/Preview với DebugView

## 8) Privacy & Compliance
- Không gửi dữ liệu nhận dạng cá nhân trực tiếp (PII)
- Nếu cần user_id, dùng Firebase Analytics userId (do hệ thống cấp), không log email
- Tuân thủ chính sách cookie/consent nếu triển khai công khai
