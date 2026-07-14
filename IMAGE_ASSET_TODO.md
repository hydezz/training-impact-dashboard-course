# Image Assets — Cần bổ sung

## tony-profile.jpg

- **Vị trí cần đặt:** `public/images/tony-profile.jpg`
- **Dùng ở:** Instructor section trên landing page (`src/app/page.tsx`)
- **Hiện tại:** Placeholder chuyên nghiệp — vòng tròn nền brand với chữ "TH" (không phải khuôn mặt AI, không broken image).
- **Khi có ảnh thật:** Đặt file vào đường dẫn trên rồi thay khối placeholder trong `src/app/page.tsx` bằng `next/image`:

```tsx
import Image from "next/image";

<Image
  src="/images/tony-profile.jpg"
  alt="Chân dung Nhan Ha (Tony), Learning & Talent Development Leader"
  width={112}
  height={112}
  className="h-28 w-28 shrink-0 rounded-full object-cover"
/>
```

- Sau khi thay, cập nhật `public/images/training-impact-course/image-manifest.json` (status, downloadDate).

## Ghi chú chung

Mọi diagram/framework visual (Kirkpatrick pyramid, journey map, KPI families, dashboard anatomy…) đã được tự thiết kế bằng React + SVG/CSS trong `src/components/course/Visuals.tsx` — không phụ thuộc ảnh bên ngoài và không copy diagram có bản quyền. Website không có ảnh hỏng.
