# DATA_MODEL.md

Mô tả schema dữ liệu trên Firestore cho TaskApp, kèm gợi ý index và nguyên tắc bảo mật.

## 1) Tổng quan
- Firestore (full SDK) + onSnapshot realtime
- Offline persistence (IndexedDB) bật ở app
- Dùng timestamp server (serverTimestamp) cho createdAt/updatedAt

## 2) Collections & Documents

### 2.1 users (collection)
- id (doc id): user.uid
- email: string (không dùng cho analytics)
- fullName: string
- username: string (nếu có từ OAuth)
- photoURL: string (nếu có)
- preferences: object
  - theme: 'light'|'dark'|'system'
  - locale?: string
- createdAt: Timestamp
- updatedAt: Timestamp

Quy ước: chỉ lưu thông tin cần thiết cho trải nghiệm; tránh trùng lặp dữ liệu nhạy cảm.

### 2.2 tasks (collection)
- id (doc id): auto
- owner: string (user.uid)
- title: string (bắt buộc)
- description: string (ngắn gọn)
- status: 'todo'|'in_progress'|'done' (mặc định 'todo')
- priority?: 'low'|'medium'|'high'
- dueDate?: Timestamp
- order?: number (tương lai nếu cần sắp xếp thủ công)
- createdAt: Timestamp
- updatedAt: Timestamp

Truy vấn điển hình:
- tasks where owner == uid orderBy createdAt desc
- tasks where owner == uid and status == 'in_progress' orderBy createdAt desc

## 3) Indexes gợi ý
- Composite:
  - Collection: tasks
    - Fields: owner ASC, createdAt DESC
  - Collection: tasks
    - Fields: owner ASC, status ASC, createdAt DESC

## 4) Quy ước & Thực hành tốt
- Tên trường snake_case trong analytics; trong Firestore có thể camelCase (theo code)
- Luôn lưu createdAt/updatedAt = serverTimestamp()
- Tách logic CRUD vào `services/*` thay vì gọi trực tiếp trong UI
- Không lưu dữ liệu thô từ OAuth nếu không cần

## 5) Security Rules (outline)
- Chỉ cho phép truy cập khi `request.auth != null`
- users: user chỉ được đọc/ghi document của chính mình (id == request.auth.uid)
- tasks: user chỉ được đọc các task có `owner == request.auth.uid`; được tạo/sửa/xoá task của chính mình
- Validate fields: đảm bảo `title` là string ngắn; `status` thuộc enum; chặn ghi trường không mong muốn

Ví dụ quy tắc (mô tả, không phải code hoàn chỉnh):
- match /tasks/{taskId}:
  - allow read: if resource.data.owner == request.auth.uid
  - allow create: if request.resource.data.owner == request.auth.uid
  - allow update/delete: if resource.data.owner == request.auth.uid

## 6) Mở rộng tương lai
- projects (collection): nhóm task theo project
- labels/tags (collection hoặc field mảng trong tasks)
- activity_logs (collection): ghi vắn tắt hoạt động (ẩn danh/không PII)
