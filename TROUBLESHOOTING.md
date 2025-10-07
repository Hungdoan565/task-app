# 🔧 Troubleshooting Guide - TaskApp

## ⚠️ Vấn đề: Nhấn vào nút Đăng nhập/Đăng ký nhưng trở về Landing Page

### Nguyên nhân
Bạn đã đăng nhập trước đó và Firebase đã lưu session trong trình duyệt. Khi click vào `/auth`, ứng dụng phát hiện bạn đã authenticated và hiển thị màn hình "Bạn đã đăng nhập".

---

## ✅ Giải pháp

### Cách 1: Sử dụng Debug Tool (Khuyến nghị)

1. Truy cập: `http://localhost:5173/debug-auth.html`
2. Xem trạng thái hiện tại của Firebase session
3. Click nút **"🗑️ Xóa tất cả session"**
4. Confirm và reload
5. Quay lại ứng dụng

### Cách 2: DevTools Manual Clear

1. Mở DevTools (F12)
2. Tab **Application** → **Storage** → **Clear site data**
3. Hoặc xóa từng mục:
   - Local Storage: Xóa tất cả key bắt đầu với `firebase:`
   - Session Storage: Xóa tương tự
4. Refresh trang (F5 hoặc Ctrl+R)

### Cách 3: Console Command (Nhanh nhất)

```javascript
// Copy và paste vào Console (F12)
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Cách 4: Đăng xuất qua UI

Nếu bạn có thể truy cập Dashboard:
1. Vào Dashboard
2. Click nút **Logout** / **Đăng xuất**
3. Hệ thống sẽ tự động xóa session

---

## 🎯 Kết quả mong đợi

Sau khi xóa session:

✅ Click "Đăng nhập" → Hiển thị form đăng nhập  
✅ Click "Đăng ký" → Hiển thị form đăng ký  
✅ Console không còn log "User authenticated"  
✅ Landing page hiển thị ở trạng thái chưa đăng nhập

---

## 🔍 Kiểm tra auth state hiện tại

### Qua Console:
```javascript
// Check localStorage
console.log('LocalStorage:', Object.keys(localStorage));

// Check if has Firebase keys
const hasFirebase = Object.keys(localStorage)
  .some(key => key.includes('firebase'));
console.log('Has Firebase session:', hasFirebase);
```

### Qua React DevTools:
1. Mở React DevTools
2. Tìm component `UserProvider`
3. Xem state `isAuthenticated`, `user`, `profile`

---

## 📋 Luồng Authentication hiện tại

### 1. User chưa đăng nhập
```
Landing Page (/) 
  → Click "Đăng ký" 
  → /auth (default: form Đăng ký)

Landing Page (/)
  → Click "Đăng nhập"
  → /auth?mode=login (form Đăng nhập)
```

### 2. User đã đăng nhập
```
Landing Page (/)
  → Click "Đăng ký" hoặc "Đăng nhập"
  → /auth
  → Hiển thị: "Bạn đã đăng nhập!"
  → Nút "Đến Dashboard" → /dashboard
```

### 3. Protected Routes
```
/dashboard/*
  → Check isAuthenticated
  → Nếu FALSE → Redirect to /auth
  → Nếu TRUE → Cho phép truy cập
```

---

## 🐛 Debug Checklist

Nếu vẫn gặp vấn đề, kiểm tra:

- [ ] Server đang chạy? (`npm run dev`)
- [ ] Console có báo lỗi không?
- [ ] Network tab có request bị fail?
- [ ] LocalStorage đã được xóa chưa?
- [ ] React DevTools có hiển thị user state?
- [ ] Firebase config đã đúng chưa? (`.env` file)

---

## 🔐 Firebase Session Behavior

### Mặc định:
- Firebase **TỰ ĐỘNG** lưu session trong localStorage
- Session **PERSIST** qua các lần reload
- Đây là **TÍNH NĂNG**, không phải bug

### Mục đích:
- Giữ user đăng nhập khi reload trang
- Tránh phải đăng nhập lại liên tục
- Tương tự "Remember me" checkbox

### Khi nào cần xóa:
- ✅ Testing UI chưa đăng nhập
- ✅ Debugging authentication flow
- ✅ Switching between test accounts
- ❌ KHÔNG cần xóa trong production use

---

## 📝 Code Changes Summary

### Đã thay đổi:

**1. SimpleLandingPage.jsx**
- ✅ Fixed Hero CTA: `/auth?mode=register` → `/auth`
- ✅ Navbar login: `/auth?mode=login`
- ✅ Navbar signup: `/auth`

**2. UserContext.jsx**
- ✅ Removed console logs
- ✅ Kept error logs only

**3. EnhancedAuthPage.jsx**
- ✅ Disabled auto-redirect useEffect
- ✅ Added "Already logged in" screen
- ✅ Show redirect to dashboard option

---

## 🚀 Production Notes

### Trong production:
- Session persistence là **MONG MUỐN**
- User sẽ **KHÔNG** muốn đăng nhập lại mỗi lần
- Chỉ test/dev environment mới cần xóa session thường xuyên

### Best practices:
- Có nút **Logout** rõ ràng trong UI
- Hiển thị user info khi đã đăng nhập
- Redirect hợp lý giữa public/protected routes
- Loading states trong khi check auth

---

## 💡 Tips

### Quick Test Flow:
1. Clear session: `http://localhost:5173/debug-auth.html`
2. Test landing page CTAs
3. Test login flow
4. Test signup flow
5. Test protected routes
6. Test logout
7. Repeat

### Keyboard Shortcuts:
- `Ctrl+Shift+I` - Open DevTools
- `Ctrl+Shift+C` - Inspect Element
- `Ctrl+Shift+R` - Hard Reload (clear cache)
- `Ctrl+Shift+Delete` - Clear browsing data

---

## 📞 Still Having Issues?

Nếu vẫn gặp vấn đề sau khi thử tất cả các cách trên:

1. **Check console errors** - Có lỗi JavaScript không?
2. **Check network tab** - Có request failed không?
3. **Check Firebase config** - File `.env` đúng chưa?
4. **Try incognito mode** - Có hoạt động không?
5. **Clear all data** - Hard reset trình duyệt

### Contact:
- GitHub Issues: https://github.com/Hungdoan565/task-app/issues
- Check `docs/` folder for more documentation

---

**Last Updated:** 2025-10-07  
**Version:** 1.0.0
