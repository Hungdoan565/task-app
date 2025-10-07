# RULES.md

Quy tắc code, quy trình và tiêu chuẩn thực thi cho dự án TaskApp. Tài liệu này dùng để đồng bộ cách làm việc trong team và đảm bảo chất lượng, khả năng mở rộng về lâu dài.

## 1) Mục tiêu
- Code rõ ràng, nhất quán, dễ bảo trì
- UI mượt mà, tôn trọng a11y và reduced-motion
- Dữ liệu an toàn, hiệu năng tốt, offline-first
- Tracking analytics chuẩn hoá, không lộ PII

## 2) Công nghệ chính
- React 19 + Vite 7
- Tailwind CSS v4 (class-based dark mode)
- Framer Motion (animation)
- Firebase (Auth, Firestore full SDK, Analytics)
- React Router DOM
- Zustand (state cục bộ/feature)
- vite-plugin-pwa (PWA, offline cache)

## 3) Cấu trúc thư mục (tóm tắt)
- src/components
  - ui/ (Base UI, nhỏ gọn, tái sử dụng)
  - task/ (TasksPanel, TaskItem, TaskModal…)
  - board/ (KanbanBoard, KanbanColumn, KanbanCard…)
  - layout/ (DashboardLayout…)
  - auth/, common/
- src/pages (SimpleLandingPage, EnhancedAuthPage, HomePage…)
- src/contexts (ThemeContext, UserContext…)
- src/stores (Zustand)
- src/lib (firebase, analytics, utils…)
- src/styles (globals.css)

## 4) Quy ước đặt tên & format
- Components: PascalCase (TaskItem.jsx)
- Hooks: useCamelCase (useTasks.ts)
- Stores: useSomethingStore (Zustand)
- Utils: camelCase (formatDate)
- Files: theo chức năng, không dồn nhiều component to vào 1 file
- Import: nhóm từ built-in -> libs -> nội bộ; dùng alias `@/` khi phù hợp
- Format/Lint: bật ESLint + Prettier (tuân theo cấu hình mặc định của dự án nếu có)

## 5) React & State
- Chỉ dùng Functional Components + Hooks
- Tránh prop drilling sâu: tách Context/Zustand hợp lý theo feature
- useMemo/useCallback cho phần tính toán nặng hoặc prop callback truyền sâu
- Không lưu dữ liệu server-side vào Context toàn cục nếu chỉ dùng cục bộ
- Side effects (useEffect) phải có dependency rõ ràng; dọn dẹp listener onSnapshot

## 6) Tailwind & Giao diện
- Ưu tiên utility class; tránh CSS tuỳ biến khi không cần thiết
- Dark mode dùng class `.dark` trên html (anti-FOUC đã bật). Body và container gốc cần `bg-*` + `dark:bg-*`
- Dùng token màu/biến CSS ở `styles/globals.css` khi cần đồng bộ
- Khoảng cách/định tuyến: theo scale mặc định Tailwind; ưu tiên `min-h-screen` cho trang chính
- Tránh inline style trừ khi rất đơn giản/động

## 7) Animation
- Dùng Framer Motion; tôn trọng `prefers-reduced-motion`
- Thời lượng animation ngắn gọn, easing mượt; tránh lặp vô hạn gây xao nhãng
- Route transitions dùng AnimatePresence ở App.jsx đã cấu hình

## 8) Firebase/Firestore
- Dùng full Firestore SDK + `onSnapshot` cho realtime; bật IndexedDB persistence
- Truy vấn có index khi cần; tránh n+1; paginate nếu danh sách lớn
- Lỗi mạng: có fallback UI và retry nhẹ; log gọn, không lộ thông tin nhạy cảm
- Bảo mật:
  - Không commit khoá/API key nhạy cảm ngoài public Firebase config
  - Env: đặt biến vào .env.* khi deploy
  - Firestore Security Rules: bắt buộc thiết kế theo nguyên tắc least privilege

## 9) Analytics
- Luôn dùng wrapper: `src/lib/analytics.js` (trackEvent, track.*)
- Quy ước event snake_case: `create_task`, `task_moved`, `login_success`, `register_success`, `search_performed`…
- Param snake_case, không PII (không gửi email, tên đầy đủ…). Có thể gửi `method`, `source`, `from`, `to`, chiều dài chuỗi tìm kiếm (`q_len`), v.v.
- Gọi sự kiện tại điểm tương tác quan trọng (đã cover trong TasksPanel, KanbanBoard, Auth)

## 10) PWA & hiệu năng
- Build PWA với `vite-plugin-pwa` (generateSW). Precache asset tĩnh; runtime cache Firebase tĩnh khi cần
- Code splitting: lazy routes + `manualChunks` trong Vite config
- Prefetch/Preload: có thể prefetch bundle Auth khi hover CTA
- Ảnh/SVG: tối ưu kích thước; dùng SVG inline với tiết chế

## 11) A11y (Accessibility)
- Tất cả nút/bộ điều khiển phải có aria-label hợp lý
- Focus ring rõ ràng; không tắt outline mà không có giải pháp thay thế
- Màu sắc tương phản đạt tối thiểu WCAG AA
- Bàn phím: có thể tab/enter/space điều khiển các tương tác chính

## 12) Xử lý lỗi & UX trạng thái
- Sử dụng ErrorBoundary cho lỗi không mong muốn
- Trạng thái: loading/skeleton, empty/error state rõ ràng
- Thông báo lỗi thân thiện; không lộ chi tiết nội bộ

## 13) Testing & QA
- Unit: Vitest + RTL cho logic và component chính
- E2E: (TBD) kịch bản đăng nhập, tạo/kéo thả task, tìm kiếm
- Snapshot UI chỉ dùng bổ trợ, tránh lạm dụng

## 14) Git workflow
- Nhánh: `feature/*`, `fix/*`, `chore/*`, `docs/*`
- Commit: Conventional Commits
  - feat: thêm tính năng
  - fix: sửa lỗi
  - chore: tác vụ phụ trợ (build, deps…)
  - docs: tài liệu
  - refactor: tái cấu trúc không đổi hành vi
  - test: thêm/cập nhật test
- Pull Request nhỏ, mô tả rõ, kèm ảnh/GIF nếu là UI. Rebase trước khi merge nếu có xung đột

## 15) PR Checklist (rút gọn)
- [ ] Tên/description rõ ràng; có liên kết issue nếu có
- [ ] Không commit secrets/.env
- [ ] Pass build/lint
- [ ] Không phá vỡ typing/prop API công khai
- [ ] UI tôn trọng dark mode, reduced motion, focus state
- [ ] Sự kiện analytics (nếu có tương tác mới)
- [ ] Test/thử nghiệm đường dẫn chính (login, tạo/kéo thả task, tìm kiếm)

## 16) Bảo mật
- Không ghi log dữ liệu nhạy cảm
- Kiểm tra nguồn dữ liệu render (nếu cho phép rich text sau này, cần sanitize)
- Hạn chế quyền truy cập/ghi Firestore theo user/role

## 17) Phát hành & version
- Gắn tag theo SemVer khi có milestone lớn
- Lập CHANGELOG ngắn gọn các thay đổi đáng chú ý

## 18) Cập nhật tài liệu
- Nếu bạn thêm tính năng, cập nhật: PRODUCT_SPEC.md, ANALYTICS.md (nếu có event mới), DATA_MODEL.md (nếu đổi schema), và README/ROADMAP
