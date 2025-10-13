# Development Setup

Hướng dẫn chi tiết cài đặt môi trường phát triển cho TaskApp.

## 🖥️ System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **RAM**: 8GB (khuyến nghị 16GB)
- **Storage**: 2GB free space
- **CPU**: Dual-core 2.0GHz+

### Required Software

#### 1. Node.js & npm
```bash
# Kiểm tra phiên bản
node --version  # >= 18.0.0
npm --version   # >= 8.0.0

# Cài đặt Node.js từ https://nodejs.org/
# Hoặc sử dụng nvm (khuyến nghị)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### 2. Git
```bash
# Kiểm tra phiên bản
git --version  # >= 2.30.0

# Cài đặt Git
# Windows: https://git-scm.com/download/win
# macOS: brew install git
# Ubuntu: sudo apt install git
```

#### 3. Firebase CLI (Tùy chọn)
```bash
# Cài đặt Firebase CLI
npm install -g firebase-tools

# Kiểm tra phiên bản
firebase --version

# Login vào Firebase
firebase login
```

#### 4. VS Code Extensions (Khuyến nghị)
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "firebase.vscode-firebase-explorer",
    "ms-vscode.vscode-json",
    "christian-kohler.path-intellisense",
    "formulahendry.auto-rename-tag"
  ]
}
```

## 🔧 Project Setup

### 1. Clone Repository
```bash
# Clone repository
git clone https://github.com/Hungdoan565/task-app.git
cd task-app

# Tạo branch mới cho development
git checkout -b feature/your-feature-name
```

### 2. Install Dependencies
```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install

# Hoặc sử dụng pnpm
pnpm install
```

### 3. Environment Configuration

#### Tạo Environment Files
```bash
# Tạo file .env.local
cp .env.example .env.local

# Tạo file .env.development
cp .env.example .env.development
```

#### Cấu hình Firebase
```env
# .env.local
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Cấu hình Development
```env
# .env.development
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3000
VITE_SUPPRESS_LOGS=false
VITE_DEBUG_MODE=true
```

### 4. Firebase Project Setup

#### Tạo Firebase Project
1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới
3. Bật Authentication với:
   - Email/Password
   - Google
   - GitHub
4. Tạo Firestore database
5. Cấu hình Firestore rules

#### Firestore Rules
```javascript
// firebase/firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() { return request.auth != null; }
    
    match /users/{userId} {
      allow create: if isSignedIn() && request.resource.id == request.auth.uid;
      allow read, update: if isSignedIn() && userId == request.auth.uid;
      allow delete: if false;
    }
    
    match /tasks/{taskId} {
      allow create: if isSignedIn() && (
        request.resource.data.owner == request.auth.uid ||
        request.resource.data.ownerId == request.auth.uid
      );
      allow read, update, delete: if isSignedIn() && (
        resource.data.owner == request.auth.uid ||
        resource.data.ownerId == request.auth.uid
      );
    }
  }
}
```

#### Firestore Indexes
```json
// firebase/firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "tasks",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "owner", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

## 🚀 Development Workflow

### 1. Start Development Server
```bash
# Start dev server với hot reload
npm run dev

# Start với port cụ thể
npm run dev -- --port 3000

# Start với host cụ thể
npm run dev -- --host 0.0.0.0
```

### 2. Code Quality Tools

#### ESLint
```bash
# Kiểm tra lỗi
npm run lint

# Tự động sửa lỗi
npm run lint:fix

# Kiểm tra specific file
npx eslint src/components/Button.jsx
```

#### Prettier
```bash
# Format code
npx prettier --write src/

# Kiểm tra format
npx prettier --check src/
```

#### TypeScript (Nếu sử dụng)
```bash
# Kiểm tra type
npx tsc --noEmit

# Build với type checking
npm run build
```

### 3. Testing

#### Unit Tests
```bash
# Chạy tất cả tests
npm run test

# Chạy tests với coverage
npm run test:coverage

# Chạy tests watch mode
npm run test:watch

# Chạy specific test file
npm run test src/components/Button.test.jsx
```

#### E2E Tests
```bash
# Chạy E2E tests
npm run test:e2e

# Chạy E2E tests headless
npm run test:e2e:headless
```

### 4. Build & Preview

#### Development Build
```bash
# Build development
npm run build:dev

# Preview development build
npm run preview:dev
```

#### Production Build
```bash
# Build production
npm run build

# Preview production build
npm run preview

# Analyze bundle size
npm run build:analyze
```

## 🔍 Debugging

### 1. Browser DevTools
- **React DevTools**: Cài đặt extension
- **Redux DevTools**: Cài đặt extension
- **Firebase DevTools**: Cài đặt extension

### 2. VS Code Debugging
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    }
  ]
}
```

### 3. Console Logging
```javascript
// Sử dụng logger service
import { logger } from '@/services/logger'

// Debug logs
logger.debug('Debug message', { data })
logger.info('Info message', { data })
logger.warn('Warning message', { data })
logger.error('Error message', { error })
```

### 4. Network Debugging
```bash
# Sử dụng Firebase Emulator
npm run emu:start:firestore

# Kiểm tra network requests
# Mở DevTools > Network tab
```

## 📱 Mobile Development

### 1. Responsive Testing
```bash
# Test responsive design
npm run dev
# Mở DevTools > Toggle device toolbar
```

### 2. PWA Testing
```bash
# Test PWA features
npm run build
npm run preview
# Mở DevTools > Application > Service Workers
```

### 3. Mobile Debugging
```bash
# Sử dụng ngrok để test trên mobile
npx ngrok http 5173
# Truy cập URL từ mobile device
```

## 🚀 Performance Optimization

### 1. Bundle Analysis
```bash
# Analyze bundle size
npm run build:analyze

# Check for unused dependencies
npx depcheck
```

### 2. Performance Monitoring
```bash
# Lighthouse audit
npx lighthouse http://localhost:5173 --output html

# Web Vitals
npm run test:web-vitals
```

### 3. Code Splitting
```javascript
// Lazy load components
const LazyComponent = lazy(() => import('./LazyComponent'))

// Route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'))
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Tìm process sử dụng port
lsof -i :5173
# Kill process
kill -9 <PID>
```

#### 2. Firebase Connection Issues
```bash
# Kiểm tra Firebase config
# Đảm bảo project ID đúng
# Kiểm tra Firestore rules
```

#### 3. Build Errors
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
```

#### 4. Memory Issues
```bash
# Tăng Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🆘 Support

Nếu gặp vấn đề:
1. Kiểm tra [Troubleshooting Guide](../maintenance/troubleshooting.md)
2. Tìm kiếm [GitHub Issues](https://github.com/Hungdoan565/task-app/issues)
3. Tạo issue mới với thông tin chi tiết

---

**Chúc mừng!** Môi trường phát triển đã sẵn sàng! 🎉
