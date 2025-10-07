# UX_GUIDELINES.md

Hướng dẫn UI/UX để giữ trải nghiệm nhất quán, theo phong cách Notion (nhẹ nhàng, trung tính, tập trung nội dung).

## 1) Triết lý
- Tối giản, phân cấp rõ ràng, tránh nhiễu
- Tập trung vào nội dung (tasks) và tương tác chính
- Trạng thái rõ: loading, empty, error

## 2) Typography & Spacing
- Font: Inter; kích thước chữ mặc định 16px; tỉ lệ heading hợp lý
- Spacing: sử dụng scale Tailwind; đừng nén quá nhiều trên mobile
- Line-height thoáng; đoạn mô tả có màu nhẹ hơn (secondary)

## 3) Màu sắc & Dark Mode
- Nền trung tính (warm gray) + primary indigo
- Dark mode: đảm bảo tương phản (WCAG AA); tránh nền quá đen tuyền cho vùng nội dung lớn
- Body và container gốc phải đổi nền/chữ khi dark

## 4) Components chung
- Buttons: kích thước đủ chạm; hover/focus/pressed rõ ràng; disabled mờ
- Inputs: có label, placeholder không thay label; lỗi hiển thị gọn, có icon nếu cần
- Modals: trap focus, có aria-labelledby/aria-describedby; đóng bằng ESC
- Cards/Surfaces: sử dụng bóng nhẹ; tránh quá nặng
- Lists: giữ item height đều; phân tách bằng khoảng cách/border nhẹ

## 5) Motion
- Dùng Framer Motion với thời lượng ngắn (150–250ms)
- Tôn trọng `prefers-reduced-motion`: tắt/giảm hiệu ứng nền, vòng lặp
- Micro-interaction: hover scale/rotate nhỏ; tránh spam

## 6) Kanban & Tasks
- Kéo thả: có phản hồi trực quan khi drag start/over/drop
- Target drop rõ (cột hoặc trước/sau task)
- Chi tiết task: modal gọn, ưu tiên nội dung, nút hành động rõ ràng
- Trạng thái: todo/in_progress/done với màu nhấn tinh tế; tránh quá sặc sỡ

## 7) Empty/Loading/Error
- Empty: icon nhẹ + hướng dẫn tạo task
- Loading: spinner nhỏ hoặc skeleton đơn giản
- Error: thông điệp thân thiện, gợi ý retry

## 8) A11y
- Focus ring hiển thị; không tắt outline không thay thế
- Keyboard: tab đến mọi điều khiển, Enter/Space kích hoạt
- Aria: aria-label cho nút icon; landmarks cho layout

## 9) Responsive
- Breakpoints chuẩn Tailwind; ưu tiên thiết bị nhỏ trước
- Kanban scroll ngang thân thiện; kéo thả trên mobile cần ngưỡng (distance) phù hợp

## 10) Thực hành tốt
- Tránh wall-of-text; chia nhóm thông tin
- Sử dụng màu/biểu tượng nhất quán giữa các page
- Tránh thay đổi layout đột ngột khi dữ liệu đến (dùng skeleton hoặc min-height)
