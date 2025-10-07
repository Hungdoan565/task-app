# 🔧 Xóa Session Firebase

## ⚠️ Vấn đề
Nếu console báo có user authenticated dù chưa đăng nhập, đó là do Firebase lưu session trong localStorage/sessionStorage của trình duyệt.

## ✅ Giải pháp

### Cách 1: Xóa qua DevTools (Khuyến nghị)
1. Mở DevTools (F12 hoặc Ctrl+Shift+I)
2. Vào tab **Application** (hoặc **Storage** trên Firefox)
3. Trong sidebar bên trái, mở **Local Storage** → `http://localhost:5173`
4. Click chuột phải và chọn **Clear** hoặc xóa các key bắt đầu với `firebase:`
5. Làm tương tự với **Session Storage** nếu có
6. Refresh trang (F5)

### Cách 2: Logout qua UI
1. Nếu đã đăng nhập, vào Dashboard
2. Nhấn nút **Logout/Đăng xuất**
3. Hệ thống sẽ tự động xóa session

### Cách 3: Dùng Console Command
1. Mở DevTools → tab **Console**
2. Chạy lệnh:
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Cách 4: Clear toàn bộ site data
1. Mở DevTools → tab **Application**
2. Trong sidebar, click **Clear storage** (hoặc **Storage**)
3. Chọn tất cả các loại data muốn xóa
4. Click button **Clear site data**
5. Refresh trang

## 🎯 Kết quả mong đợi
Sau khi xóa session:
- Console sẽ không còn log "User authenticated"
- Bạn sẽ thấy landing page ở trạng thái chưa đăng nhập
- Nút "Đăng nhập" và "Đăng ký" hoạt động bình thường

## 📌 Lưu ý
- Firebase tự động lưu session để maintain login state
- Điều này là **behavior mong đợi** của Firebase Authentication
- Chỉ cần xóa session khi muốn test giao diện chưa đăng nhập
- Trong production, user sẽ muốn giữ session để không phải đăng nhập lại

## 🔍 Debug thêm
Nếu vẫn còn vấn đề, kiểm tra:
```javascript
// Trong Console DevTools
console.log('Auth State:', firebase.auth().currentUser);
console.log('LocalStorage:', localStorage);
```
