# Measure Training Impact with Kirkpatrick, Excel and AI

**Đo lường hiệu quả đào tạo bằng Kirkpatrick, Excel và AI**

Một khóa học microlearning 120 phút dạng website standalone (Next.js), dành cho L&D / Talent Development professionals: xây Measurement Plan theo 4 cấp độ Kirkpatrick, tính KPI đào tạo, phân tích dữ liệu bằng Excel + AI, và hoàn thành một Learning Impact Dashboard kèm Executive Report.

## Tính năng chính

- **Khóa học 120 phút** — Orientation + 9 modules, 57 microlearning steps, mỗi step có mục tiêu, ví dụ, activity và key takeaway.
- **Interaction engine** — multiple choice, true/false, matching, classification, formula challenge, checklist; feedback + giải thích + thử lại sau mỗi câu.
- **Excel workbook thực hành** — `public/downloads/training-impact-practice-data.xlsx`: 420 learner records, 8 sheets (Learner Records, Program Summary, KPI Dictionary, Data Dictionary, Measurement Plan, Executive Report Template, Sample Completed Case, Prompt Library) kèm lỗi dữ liệu có chủ đích để thực hành làm sạch.
- **Learning Impact Dashboard** — 7 KPI cards, 8 charts (Recharts), 8 filters, insight panel cập nhật theo filter; dữ liệu sạch sinh từ cùng nguồn với workbook.
- **Prompt Library** — 18 prompt templates dùng với Claude, có nút copy, biến cần thay, ví dụ đầu ra và quality checklist.
- **Training Impact Measurement Portfolio** — mỗi module đóng góp một phần; xem/copy/in toàn bộ tại `/portfolio`.
- **Executive Report Builder** — edit/preview/copy/print/PDF + Master Prompt generator để tiếp tục phân tích trong Claude.
- **Certificate** — Certificate in Training Measurement and Learning Analytics; unlock khi hoàn thành 100% steps, tất cả knowledge checks với ≥70% điểm, Portfolio và Executive Report.
- **Không cần API key, database hay đăng nhập** — mọi thứ chạy client-side; tiến độ lưu localStorage (`training-impact-dashboard-course-progress-v1`).

## Chạy local

1. Cài [Node.js](https://nodejs.org) (khuyến nghị bản LTS ≥ 20).
2. Cài dependencies:
   ```bash
   npm install
   ```
3. (Tùy chọn — file đã được commit sẵn) Tái tạo workbook Excel + JSON dashboard:
   ```bash
   npm run generate-training-data
   ```
4. Chạy dev server:
   ```bash
   npm run dev
   ```
   Mở http://localhost:3000
5. Kiểm tra build production:
   ```bash
   npm run build
   ```

Các lệnh khác: `npm run lint`, `npm run typecheck`, `npm run verify-course-duration`.

## Deploy lên Vercel

1. Tạo GitHub repository mới (ví dụ `training-impact-dashboard-course`).
2. Push source code:
   ```bash
   git init
   git add .
   git commit -m "Training impact dashboard course"
   git branch -M main
   git remote add origin https://github.com/<your-username>/training-impact-dashboard-course.git
   git push -u origin main
   ```
3. Vào [vercel.com](https://vercel.com) → **Add New Project** → Import repository vừa push.
4. Vercel tự nhận Next.js — giữ nguyên cấu hình mặc định (không cần env variable nào).
5. Đặt tên project `training-impact-dashboard` → **Deploy**.
6. Sau khi deploy, kiểm tra:
   - Trang chủ, Start Course, điều hướng module.
   - `/dashboard` — filters, KPI cards và charts cập nhật.
   - Nút **Download Workbook** tải được file Excel.
   - `/certificate` — điều kiện hiển thị đúng.

Workbook đã được generate và commit trong `public/downloads/`, nên deploy không cần bước build data riêng. Nếu chỉnh script data, chạy lại `npm run generate-training-data` và commit kết quả.

## Cấu trúc project

```
scripts/
  generate-training-impact-data.mjs   # sinh Excel (8 sheets, có lỗi chủ đích) + JSON sạch từ 1 nguồn
  verify-course-duration.mjs          # kiểm tra tổng thời lượng = 120 phút
src/
  app/                                # routes: /, /course, /course/orientation,
                                      # /course/module/[id], /dashboard, /workbook,
                                      # /prompt-library, /portfolio, /certificate
  components/
    activities/                       # interaction engine (6 loại activity)
    course/                           # ModulePlayer, Visuals, CaseSetup, ReportBuilder…
    dashboard/                        # DashboardView, ChartCard
    prompts/ shared/
  data/
    course/                           # nội dung 10 modules (content-driven)
    prompts.ts                        # 18 prompt templates
    training-impact-data.json         # dữ liệu sạch cho dashboard (generated)
  hooks/useProgress.tsx               # progress + certificate logic (localStorage)
  lib/                                # kpi.ts (công thức), insights.ts, report.ts
  types/
public/downloads/training-impact-practice-data.xlsx
```

## Ghi chú

- Dữ liệu học viên là **giả lập** (seeded random) — không chứa thông tin cá nhân thật.
- Certificate ID được tạo phía client và **không xác thực trực tuyến được** (project không có backend).
- Ảnh instructor: xem `IMAGE_ASSET_TODO.md`.
