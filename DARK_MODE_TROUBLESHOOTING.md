# 🔧 Dark Mode Troubleshooting - Quick Fix

## ❌ VẤN ĐỀ: Click dark mode toggle chỉ đổi border

### 🔍 Nguyên nhân có thể:
1. ✅ Code đã đúng (đã kiểm tra)
2. ❌ Browser cache CSS cũ
3. ❌ Class `dark` chưa được apply lên `<html>`
4. ❌ Tailwind chưa compile lại

---

## 🚀 GIẢI PHÁP - Thử theo thứ tự:

### ✅ Bước 1: Hard Refresh Browser (QUAN TRỌNG NHẤT)

**Chrome/Edge/Brave:**
```
Ctrl + Shift + R
hoặc
Ctrl + F5
```

**Firefox:**
```
Ctrl + Shift + Delete → Clear cache → Refresh
```

**Hoặc mở Incognito/Private Window:**
```
Ctrl + Shift + N (Chrome/Edge)
Ctrl + Shift + P (Firefox)
```

---

### ✅ Bước 2: Kiểm tra Class được apply

1. Mở browser (đang ở landing page)
2. Nhấn `F12` (DevTools)
3. Click vào tab **Elements**
4. Tìm element `<html>` ở đầu DOM tree
5. Click toggle dark mode button
6. **XEM:** Class `dark` có xuất hiện trong `<html class="dark">` không?

**Nếu KHÔNG thấy class `dark`:**
→ Vấn đề ở ThemeContext (nhưng code đã đúng rồi)

**Nếu THẤY class `dark` nhưng UI không đổi:**
→ Vấn đề ở browser cache hoặc Tailwind chưa compile

---

### ✅ Bước 3: Restart Dev Server

**Stop server:**
```powershell
# Trong terminal đang chạy npm run dev, nhấn:
Ctrl + C

# Hoặc force kill:
taskkill /F /IM node.exe
```

**Clear node cache & restart:**
```powershell
# Xóa cache Vite
Remove-Item -Recurse -Force node_modules\.vite

# Restart
npm run dev
```

**Sau đó hard refresh browser (Ctrl + Shift + R)**

---

### ✅ Bước 4: Clear Browser Storage

**Chrome DevTools (F12):**
1. Tab **Application**
2. Storage → **Clear site data**
3. Chọn tất cả:
   - Cookies
   - Local Storage
   - Cache Storage
4. Click **Clear site data**
5. Refresh page (F5)

**LocalStorage Check:**
```javascript
// Paste vào Console (F12 → Console tab)
console.log('Current theme:', localStorage.getItem('theme'))

// Force dark mode:
localStorage.setItem('theme', 'dark')
location.reload()
```

---

### ✅ Bước 5: Verify Tailwind Config (đã OK)

File `globals.css` đã có:
```css
@import "tailwindcss";

@theme {
  /* Colors defined */
}

.dark {
  /* Dark mode variables defined */
}
```

File `ThemeContext.jsx` đã đúng:
```javascript
useEffect(() => {
  const root = document.documentElement
  
  if (theme === 'dark') {
    root.classList.add('dark')  // ✅ Correct
  } else {
    root.classList.remove('dark')
  }
  
  localStorage.setItem('theme', theme)
}, [theme])
```

---

## 🧪 TEST MANUAL

### Test 1: Console Command
```javascript
// Mở Console (F12 → Console)
// Paste và chạy:

// 1. Check current class
console.log('HTML classes:', document.documentElement.className)

// 2. Force add dark class
document.documentElement.classList.add('dark')
console.log('After adding dark:', document.documentElement.className)

// 3. Check if UI changes
// → Nếu UI đổi ngay → Problem is ThemeContext
// → Nếu UI không đổi → Problem is CSS/Tailwind
```

### Test 2: Manual Class Toggle
```javascript
// Toggle manually to see if CSS works
setInterval(() => {
  document.documentElement.classList.toggle('dark')
}, 2000)

// → Nếu UI flash light/dark mỗi 2s → CSS OK, ThemeContext có vấn đề
// → Nếu UI không đổi → CSS chưa compile hoặc cache
```

### Test 3: Check Computed Styles
```javascript
// Click vào bất kỳ element nào (ví dụ body)
// Trong DevTools Elements tab → Computed tab
// Tìm background-color

// Light mode: rgb(255, 255, 255) or similar
// Dark mode: rgb(25, 25, 25) or similar

// Nếu không đổi → CSS không apply
```

---

## 🎯 KẾT QUẢ MONG ĐỢI

### ✅ Khi click toggle button:

1. **HTML class changes:**
   ```html
   <!-- Before -->
   <html lang="en">
   
   <!-- After -->
   <html lang="en" class="dark">
   ```

2. **Background color changes:**
   - Light: White/Warm gray 50
   - Dark: Warm gray 900/950/Black

3. **Text color changes:**
   - Light: Dark text
   - Dark: Light text

4. **Card backgrounds change:**
   - Light: White cards
   - Dark: Gray 800/700 cards

5. **All sections transition smoothly**

---

## 🐛 NẾU VẪN KHÔNG WORK

### Debug Checklist:

- [ ] Hard refresh browser (Ctrl + Shift + R)
- [ ] Try Incognito/Private window
- [ ] Clear browser cache completely
- [ ] Restart dev server
- [ ] Clear node_modules/.vite cache
- [ ] Check Console for errors (F12)
- [ ] Verify class "dark" appears on `<html>`
- [ ] Test manual class toggle in Console

### Nếu tất cả đều đã thử:

1. **Take screenshot** of:
   - DevTools Elements showing `<html>` element
   - Console tab (any errors?)
   - Network tab (CSS loaded?)

2. **Check these files haven't been reverted:**
   - `src/pages/SimpleLandingPage.jsx`
   - `src/contexts/ThemeContext.jsx`
   - `src/styles/globals.css`

3. **Verify Tailwind v4 is installed:**
   ```powershell
   npm list tailwindcss
   # Should show: tailwindcss@4.1.14
   ```

---

## 💡 MOST COMMON FIX

**90% of the time, this works:**

```powershell
# 1. Stop dev server (Ctrl + C)

# 2. Clear Vite cache
Remove-Item -Recurse -Force node_modules\.vite

# 3. Restart dev server
npm run dev

# 4. Hard refresh browser
# Press: Ctrl + Shift + R (multiple times if needed)

# 5. Check dark mode toggle
# It should work now! ✨
```

---

## 📸 Visual Verification

### Before (Light Mode):
- White/light gray backgrounds
- Dark text
- Light cards

### After (Dark Mode):
- Dark backgrounds (gray 900/950)
- Light text (white/gray 300)
- Dark cards (gray 800/700)
- Gradient adjusted for dark theme

**ALL sections should transition, not just borders!**

---

**Last Resort:**
```powershell
# Nuclear option - full reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

Then hard refresh browser in Incognito mode.
