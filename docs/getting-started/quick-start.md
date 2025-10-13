# Quick Start Guide

Hướng dẫn nhanh để bắt đầu với TaskApp trong vòng 5 phút.

## 🚀 Prerequisites

Trước khi bắt đầu, đảm bảo bạn đã cài đặt:

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 hoặc **yarn** >= 1.22.0
- **Git** >= 2.30.0
- **Firebase CLI** (tùy chọn)

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/Hungdoan565/task-app.git
cd task-app
```

### 2. Install Dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Environment Setup

Tạo file `.env.local` trong thư mục gốc:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Optional: Sentry DSN for error tracking
VITE_SENTRY_DSN=your_sentry_dsn

# Optional: Suppress logs in production
VITE_SUPPRESS_LOGS=false
```

### 4. Firebase Setup

1. Tạo project tại [Firebase Console](https://console.firebase.google.com/)
2. Bật Authentication với Email/Password, Google, và GitHub
3. Tạo Firestore database
4. Cập nhật Firebase config trong `src/lib/firebase.js`

### 5. Start Development Server

```bash
npm run dev
# hoặc
yarn dev
```

Mở [http://localhost:5173](http://localhost:5173) trong trình duyệt.

## 🎯 First Steps

### 1. Tạo Tài Khoản

- Truy cập `/auth` để đăng ký tài khoản
- Sử dụng Email/Password hoặc OAuth (Google/GitHub)

### 2. Khám Phá Dashboard

- Dashboard chính tại `/dashboard`
- Tạo task đầu tiên với Quick Capture
- Khám phá các widgets và tính năng

### 3. Tùy Chỉnh Layout

- Kéo thả để sắp xếp lại widgets
- Thu gọn/mở rộng sidebar
- Chuyển đổi dark/light mode

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint errors

# Testing
npm run test          # Run tests
npm run test:ui       # Run tests with UI
npm run test:coverage # Run tests with coverage

# Firebase
npm run firebase:login        # Login to Firebase
npm run deploy:rules          # Deploy Firestore rules
npm run deploy:indexes       # Deploy Firestore indexes
npm run emu:start:firestore   # Start Firestore emulator
```

## 📱 PWA Features

TaskApp hỗ trợ PWA với các tính năng:

- **Installable**: Cài đặt như app native
- **Offline Support**: Hoạt động offline
- **Push Notifications**: Thông báo đẩy (sắp có)
- **Background Sync**: Đồng bộ nền

## 🔧 Troubleshooting

### Common Issues

**1. Firebase Connection Error**
```bash
# Kiểm tra Firebase config
# Đảm bảo project ID đúng
# Kiểm tra Firestore rules
```

**2. Build Errors**
```bash
# Clear cache và reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Port Already in Use**
```bash
# Sử dụng port khác
npm run dev -- --port 3000
```

### Debug Mode

Bật debug mode để xem thêm thông tin:

```env
VITE_SUPPRESS_LOGS=false
```

## 📚 Next Steps

Sau khi setup xong, hãy đọc:

- [Development Setup](./development-setup.md) - Cài đặt chi tiết
- [Project Structure](./project-structure.md) - Cấu trúc dự án
- [Development Workflow](../development/workflow.md) - Quy trình phát triển

## 🆘 Need Help?

- **Documentation**: [docs/](../README.md)
- **Issues**: [GitHub Issues](https://github.com/Hungdoan565/task-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Hungdoan565/task-app/discussions)

---

**Chúc mừng!** Bạn đã sẵn sàng phát triển với TaskApp! 🎉
