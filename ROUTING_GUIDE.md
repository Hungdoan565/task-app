# Routing Guide - TaskApp Landing Page

## ✅ **CTA Buttons - Đã hoạt động đúng**

### **1. Navbar (Desktop & Mobile)**

**Desktop:**
- **"Đăng nhập"** → `navigate('/auth?mode=login')` ✅
  - Mở trang auth với form đăng nhập
  
- **"Đăng ký"** → `navigate('/auth')` ✅
  - Mở trang auth với form đăng ký (mặc định)

**Mobile Menu:**
- Giống desktop, đóng menu sau khi click

---

### **2. Hero Section**

- **"Bắt đầu sử dụng"** → `navigate('/auth?mode=register')` ✅
  - Đưa user tới form đăng ký
  
- **"Xem Source Code"** → `https://github.com/Hungdoan565/task-app` ✅
  - External link, mở tab mới

---

### **3. Final CTA Section**

- **"Đăng ký miễn phí"** → `navigate('/auth')` ✅
  - Form đăng ký (default mode)
  
- **"Đăng nhập"** → `navigate('/auth?mode=login')` ✅
  - Form đăng nhập

---

## 📋 **Auth Page Mode Logic**

File: `src/pages/EnhancedAuthPage.jsx`

### **URL → Form Display:**

```javascript
// Đọc query param 'mode' từ URL
const mode = searchParams.get('mode')

// Logic:
/auth                  → isLogin = false (REGISTER form)
/auth?mode=register    → isLogin = false (REGISTER form)
/auth?mode=login       → isLogin = true  (LOGIN form)
```

### **Form Toggle:**
- User có thể toggle giữa login/register bằng nút trong slide panel
- Slide panel bên trái: "Chưa có tài khoản? → Đăng ký"
- Slide panel bên phải: "Đã có tài khoản? → Đăng nhập"

---

## 🔗 **External Links**

Tất cả link GitHub đều hoạt động:

### **Hero Section:**
- Button "Xem Source Code" → `https://github.com/Hungdoan565/task-app`

### **FAQ Section:**
- "Báo lỗi trên GitHub Issues" → `https://github.com/Hungdoan565/task-app/issues`

### **Footer:**
- GitHub Repo → `https://github.com/Hungdoan565/task-app`
- Báo lỗi → `https://github.com/Hungdoan565/task-app/issues`
- Tài liệu → `https://github.com/Hungdoan565/task-app#readme`
- License → `https://github.com/Hungdoan565/task-app/blob/main/LICENSE`
- Author profile → `https://github.com/Hungdoan565`

---

## 🧭 **Navigation Flow**

```
Landing Page (/)
    ↓
    ├─ Đăng ký → /auth (default)
    │              ↓
    │          [Register Form]
    │              ↓
    │          Success → /home
    │
    └─ Đăng nhập → /auth?mode=login
                   ↓
               [Login Form]
                   ↓
               Success → /home
```

---

## ✅ **Checklist Testing**

### **Landing Page CTAs:**
- [ ] Navbar "Đăng nhập" → Mở form login
- [ ] Navbar "Đăng ký" → Mở form register
- [ ] Hero "Bắt đầu sử dụng" → Mở form register
- [ ] Hero "Xem Source Code" → Mở GitHub (new tab)
- [ ] CTA "Đăng ký miễn phí" → Mở form register
- [ ] CTA "Đăng nhập" → Mở form login
- [ ] Mobile menu buttons → Đúng routing

### **Auth Page:**
- [ ] `/auth` → Hiển thị Register form
- [ ] `/auth?mode=login` → Hiển thị Login form
- [ ] `/auth?mode=register` → Hiển thị Register form
- [ ] Toggle giữa forms hoạt động
- [ ] Redirect về `/home` sau login/register thành công

### **Footer Links:**
- [ ] Tất cả GitHub links mở đúng repo
- [ ] External links có icon ↗
- [ ] Author name link tới GitHub profile

---

## 🎯 **Notes cho Developer**

1. **useSearchParams** từ react-router-dom được dùng để đọc query params
2. **Default behavior**: `/auth` không có mode → hiển thị Register (user journey thông thường)
3. **All external links**: `target="_blank"` + `rel="noopener noreferrer"` (security best practice)
4. **Framer Motion**: Tất cả buttons có animation whileHover/whileTap
5. **Responsive**: Mobile menu tự động đóng sau khi navigate

---

**Last Updated:** 2024-10-07  
**Author:** Đoàn Vĩnh Hưng  
**Repo:** https://github.com/Hungdoan565/task-app
