# 🌓 Theme Toggle - Dark/Light Mode

## ✨ Tính năng

Theme toggle button cho phép người dùng chuyển đổi giữa chế độ sáng (Light) và tối (Dark).

### 🎨 Thiết kế:
- **Button hình tròn** với animation mượt mà
- **Icon động**: Sun ☀️ (Light mode) / Moon 🌙 (Dark mode)
- **Màu sắc hài hòa**: 
  - Light mode: Gradient vàng cam (orange-yellow)
  - Dark mode: Gradient tím xanh (indigo-purple)
- **Hiệu ứng**:
  - Hover: Scale + shadow tăng
  - Click: Scale animation
  - Switch: Rotate + fade transition
  - Ring xoay liên tục (rotating dashed border)

---

## 📍 Vị trí

### Desktop:
- **Navbar phải** - Giữa menu items và user avatar/auth buttons
- Dễ thấy, dễ nhấn
- Không cản trở các elements khác

### Mobile:
- **Mobile menu** - Ở trên cùng trước các nút đăng nhập/đăng ký
- Center aligned để dễ chạm

---

## 🎯 User Experience

### Hoạt động:
1. Click button → Chuyển theme ngay lập tức
2. Theme được **lưu vào localStorage**
3. Reload page → Giữ nguyên theme đã chọn
4. Nếu chưa chọn → Theo system preference

### Animation:
- **Smooth transition**: 0.4s với ease "backOut"
- **Rotate effect**: Icon xoay khi switch
- **Scale animation**: Bounce in/out
- **Ring rotation**: 20s continuous rotation

### Accessibility:
- `aria-label="Toggle theme"` cho screen readers
- Keyboard accessible (có thể tab + enter)
- High contrast trong cả 2 modes

---

## 🎨 Màu sắc

### Light Mode (Sun):
```
Background: orange-100 → yellow-100 gradient
Border: orange-200
Icon: orange-500 (Sun với drop-shadow)
Hover glow: yellow-200/50 → orange-200/50
Ring: orange-300/40 dashed
```

### Dark Mode (Moon):
```
Background: indigo-900 → purple-900 gradient
Border: indigo-700
Icon: indigo-300 (Moon với drop-shadow)
Hover glow: indigo-500/30 → purple-500/30
Ring: indigo-400/40 dashed
```

### Contrast cao:
- Icon rõ ràng trên background
- Border đủ nổi bật
- Không bị "mất" trên navbar
- Drop-shadow giúp icon nổi bật

---

## 🔧 Technical Details

### Component: `ThemeToggle`
**Location:** `src/pages/SimpleLandingPage.jsx`

**Dependencies:**
- `useTheme()` hook from `ThemeContext`
- `framer-motion` for animations
- `react-icons/hi2` for HiSun
- `react-icons/hi` for HiMoon

### Props: None (self-contained)

### State:
- Theme state managed by `ThemeContext`
- Persistent via localStorage
- Auto-sync với system preference

---

## 📱 Responsive

### Desktop (≥1024px):
- Size: `w-12 h-12` (48px)
- Position: Navbar right side
- Gap: `gap-4` with other nav items

### Mobile (<1024px):
- Size: `w-12 h-12` (48px - same)
- Position: Mobile menu top
- Center aligned với `flex justify-center`

---

## ♿ Accessibility

### Keyboard Navigation:
✅ Tab to focus
✅ Enter/Space to toggle
✅ Visible focus ring

### Screen Readers:
✅ `aria-label="Toggle theme"`
✅ Role: button (implicit)
✅ State change announced

### Touch:
✅ Large touch target (48px)
✅ No hover-only functionality
✅ Clear visual feedback

---

## 🔄 Theme Sync

### LocalStorage:
```javascript
localStorage.getItem('theme') // 'light' | 'dark'
localStorage.setItem('theme', 'dark')
```

### System Preference:
```javascript
window.matchMedia('(prefers-color-scheme: dark)').matches
```

### Priority:
1. localStorage (user choice)
2. System preference
3. Default: 'light'

---

## 🎭 Animation Timeline

### Switch to Dark:
```
0ms:   Sun visible (scale: 1, rotate: 0)
0ms:   Start exit animation
200ms: Sun fading + rotating 90deg
400ms: Sun gone (opacity: 0, scale: 0)
400ms: Moon appears (opacity: 0, scale: 0, rotate: -90)
600ms: Moon visible (opacity: 1, scale: 1, rotate: 0)
800ms: Complete
```

### Switch to Light:
```
Same but reversed (Moon → Sun, rotate opposite)
```

### Ring Animation:
```
Continuous: rotate 360deg every 20s
No pause, infinite loop
```

---

## 🐛 Edge Cases Handled

### ✅ Multiple rapid clicks:
- Smooth transitions, no glitches
- State updates correctly

### ✅ During page load:
- No flash of wrong theme (FOUT)
- Theme applied before render

### ✅ System theme change:
- Only affects if no user preference saved
- User choice takes priority

### ✅ Mobile menu close:
- Theme persists when menu closes
- No interference with menu animations

---

## 💡 Tips

### Customization:
```javascript
// Thay đổi animation speed
transition={{ duration: 0.6 }} // Slower

// Thay đổi colors
className="from-blue-100 to-cyan-100" // Different gradient

// Thay đổi ring speed
transition={{ duration: 10 }} // Faster rotation
```

### Testing:
1. Click button multiple times rapidly
2. Check localStorage in DevTools
3. Change system theme while app open
4. Test keyboard navigation
5. Test on mobile touch screen

---

## 📊 Performance

### Impact: Minimal
- Only re-renders on theme change
- No continuous animations (except ring)
- Efficient CSS transitions
- No layout shifts

### Optimization:
- `AnimatePresence mode="wait"` prevents overlap
- CSS `transition-all` for smooth changes
- LocalStorage caching reduces flicker

---

**Last Updated:** 2025-10-07
**Component Version:** 1.0
**Status:** ✅ Production Ready
