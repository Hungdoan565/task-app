# TaskApp — Notion-inspired task management

TaskApp là ứng dụng quản lý công việc lấy cảm hứng từ Notion: đơn giản, đẹp, nhanh, ưu tiên trải nghiệm.

## 🚀 Tech Stack

- Frontend: React 19 + Vite 7, TailwindCSS v4, Framer Motion
- Data: Firebase (Auth, Firestore full SDK, Analytics)
- Routing: React Router DOM
- Drag & Drop: @dnd-kit
- Icons: Lucide React, react-icons
- Date: date-fns
- PWA: vite-plugin-pwa

## ✨ Features

- ✅ Dark/Light/System mode chống FOUC + color-scheme + favicon động
- ✅ AnimatedBackground + reduced-motion + route transitions
- ✅ PWA (generateSW) + robots/sitemap, offline precache
- ✅ Analytics event taxonomy (Landing/Auth/Dashboard/Kanban/Tasks/Theme)
- ✅ Drag & drop Kanban + Tasks Panel
- ✅ Auth (Email/Password, Google/GitHub) + User Profile
- ✅ Responsive, A11y cơ bản

## 📦 Quick Start

### 1. Clone repository

```bash
git clone <repository-url>
cd task-app
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Firebase

- Tạo project tại [Firebase Console](https://console.firebase.google.com/)
- Bật Auth (Email/Password + Google/GitHub), Firestore
- Hiện config đang đặt trong `src/lib/firebase.js` (cần tách .env khi deploy)

### 4. Lệnh thường dùng

```bash
npm run dev        # Start dev server
npm run build      # Build production
npm run preview    # Preview production build (PWA SW hoạt động)
npm run lint       # Lint dự án
```

### 5. Setup TailwindCSS

TailwindCSS đã được config trong `tailwind.config.js`. Nếu cần reinstall:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 6. Chạy Development Server

```bash
npm run dev
```

Mở [http://localhost:5173](http://localhost:5173) trong browser.

## 📂 Cấu Trúc Dự Án

```
src/
├── components/       # React components
│   ├── ui/          # Base UI components
│   ├── board/       # Board-related components
│   ├── task/        # Task management components
│   ├── auth/        # Authentication components
│   ├── layout/      # Layout components
│   └── common/      # Shared components
├── pages/           # Route pages
├── hooks/           # Custom React hooks
├── contexts/        # React Context providers
├── stores/          # Zustand stores
├── lib/             # Utilities & Firebase config
├── styles/          # Global styles
└── assets/          # Static assets
```

## 🧱 Kiến trúc & Hiệu năng
- Context: ThemeContext (3 trạng thái), UserContext (profile/preferences/stats)
- Analytics: wrapper an toàn (`docs/ANALYTICS.md`)
- PWA: generateSW + runtime caching Firebase
- Performance: lazy routes, manualChunks, prefetch Auth khi hover CTA

## 🔭 Roadmap vắn tắt
- Onboarding Checklist (Home)
- Settings/Appearance (density, reduced motion, accent)
- Landing social proof + sticky CTA + screenshot thật
- Offline fallback page + Sentry

## 📚 Documentation

Xem thư mục `docs/` để biết thêm chi tiết:

- docs/PRODUCT_SPEC.md — tư duy sản phẩm & flow
- docs/DATA_MODEL.md — schema Firestore
- docs/UX_GUIDELINES.md — Notion-inspired UI
- docs/ANALYTICS.md — event taxonomy & naming
- docs/analytics-schema.json — JSON schema các event
- docs/ROADMAP.md — milestones thực thi
- docs/RULES.md — chuẩn code, git, PR

## 🎨 Design System (rút gọn)
- Font: Inter; Warm Gray palette; Primary Indigo
- Token HSL (background/foreground, notion-*) với biến CSS
- Tailwind v4 + @custom-variant dark (class-based)
- Motion: tôn trọng `prefers-reduced-motion`; hover/press có giới hạn

## 🔐 Security
- Firestore rules và indexes đã có trong repo. Xem docs/DEPLOY_FIREBASE.md để deploy lên staging/production.
- Tách Firebase config ra biến môi trường khi triển khai

## 🧪 Testing
- (Pending) Vitest + RTL + basic e2e

## 📝 Conventions
- Components: PascalCase; Hooks: useCamelCase; Utils: camelCase
- Commits: Conventional Commits (feat/fix/docs/refactor/chore/test)
- PR: nhỏ gọn, có ảnh GIF/ảnh trước-sau nếu là UI

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License

## 🙏 Credits

Built with ❤️ using React, Vite, Firebase, and TailwindCSS.

---

**Lưu ý:** Xem `WARP.md` để biết thêm chi tiết về cấu trúc và patterns khi làm việc với Warp AI.
