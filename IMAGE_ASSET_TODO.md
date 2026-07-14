# Hướng dẫn đặt ảnh profile tác giả

Website đã được lập trình để **tự động hiển thị ảnh khi file tồn tại** — bạn KHÔNG cần sửa code.

## Cách làm (3 bước)

1. Chuẩn bị một ảnh chân dung, đặt tên đúng là `tony-profile.jpg`
   - Định dạng: JPG (nếu ảnh là PNG, đổi tên đuôi không đủ — hãy convert sang JPG thật).
   - Khuyến nghị: ảnh vuông, tối thiểu 400×400px, dung lượng < 300KB.
2. Copy file vào thư mục:
   ```
   training-impact-dashboard-course\public\images\tony-profile.jpg
   ```
3. Commit và push để cập nhật website đang chạy trên Vercel:
   ```bash
   git add public/images/tony-profile.jpg
   git commit -m "Add author profile photo"
   git push
   ```
   Vercel sẽ tự động deploy lại sau ~1 phút.

## Cách hoạt động

- Component `AuthorAvatar` trong `src/app/page.tsx` thử tải `/images/tony-profile.jpg`.
- Nếu file **tồn tại** → hiển thị ảnh tròn 112px có viền.
- Nếu file **chưa có** → tự động hiển thị placeholder chữ "TH" (không bao giờ có ảnh vỡ).
- Kiểm tra local trước khi push: `npm run dev` rồi mở http://localhost:3000 và cuộn xuống phần "Tác giả khóa học".

## Sau khi thêm ảnh

Cập nhật `public/images/training-impact-course/image-manifest.json`: đổi `status` thành `"DONE"` và điền `downloadDate`.

## Ghi chú chung

Mọi diagram/framework visual (Kirkpatrick pyramid, journey map, KPI families, dashboard anatomy…) đã được tự thiết kế bằng React + SVG/CSS trong `src/components/course/Visuals.tsx` — không phụ thuộc ảnh bên ngoài và không copy diagram có bản quyền.
