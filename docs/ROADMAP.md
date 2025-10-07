# ROADMAP.md

Lộ trình phát triển TaskApp (đề xuất). Tối ưu để tăng tốc MVP, tính ổn định, và trải nghiệm người dùng.

## Nguyên tắc chung
- Ưu tiên giá trị người dùng và độ ổn định
- Mỗi milestone có tiêu chí rõ ràng và có thể kiểm thử
- Không phá vỡ analytics và tracking

## Milestone 0 — Nền tảng (đã làm phần lớn)
- [x] Anti-FOUC dark mode + body dark bg
- [x] Lazy routes + Suspense + AnimatePresence
- [x] Analytics wrapper + sự kiện core (auth, tasks, kanban)
- [x] PWA cơ bản (generateSW), robots/sitemap
- [x] Firestore full SDK + offline persistence

## Milestone 1 — Onboarding & Landing polish
- [ ] Onboarding checklist nhẹ tại Home
- [ ] Landing: social proof, sticky CTA, ảnh/screenshot thật
- [ ] Prefetch assets hợp lý

## Milestone 2 — Settings & A11y
- [ ] Settings/Appearance: density, accent color, reduced motion toggle
- [ ] A11y pass: focus ring, aria, landmarks, trap focus ở modal
- [ ] Kiểm tra tương phản màu theo WCAG AA

## Milestone 3 — Offline & Monitoring
- [ ] Offline fallback page
- [ ] Sentry (FE runtime errors) + performance sampling nhẹ
- [ ] Health checks nhẹ (log lỗi quan trọng)

## Milestone 4 — SEO & Metadata nâng cao
- [ ] JSON-LD schemas: WebApplication, Organization
- [ ] Mở rộng Helmet (OG/Twitter)
- [ ] Kiểm tra Lighthouse SEO

## Milestone 5 — Testing & CI/CD
- [ ] Vitest + RTL cho services/components chính
- [ ] E2E smoke (đăng nhập → tạo/kéo thả → tìm kiếm → đổi theme)
- [ ] Thiết lập CI lint/test/build

## Milestone 6 — Feature mở rộng
- [ ] Projects/tags cho tasks
- [ ] Quick actions/keyboard shortcuts
- [ ] Nhắc việc (notifications cơ bản)

## Rủi ro & phương án
- Vite plugin PWA & Vite 7: đã dùng legacy peer deps; giữ pin version
- Giao diện kéo thả mobile: cần tinh chỉnh sensors
- Realtime conflicts: xem xét merge strategy và hiển thị conflict tối thiểu
