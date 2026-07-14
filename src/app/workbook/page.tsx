import WorkbookDownload from "@/components/shared/WorkbookDownload";

export const metadata = { title: "Workbook · Training Impact Course" };

const SHEETS = [
  { name: "Learner Records", desc: "420 dòng dữ liệu học viên qua 4 chương trình — kèm lỗi chất lượng có chủ đích để thực hành làm sạch." },
  { name: "Program Summary", desc: "Thông tin 4 chương trình: đối tượng, thời lượng, chi phí, mục tiêu kinh doanh, target behavior và target KPI." },
  { name: "KPI Dictionary", desc: "12 KPI với định nghĩa, công thức, cấp độ Kirkpatrick, nguồn dữ liệu, target, cách diễn giải và giới hạn." },
  { name: "Data Dictionary", desc: "Ý nghĩa từng cột, kiểu dữ liệu, giá trị hợp lệ và ghi chú về các lỗi chất lượng đã cài." },
  { name: "Measurement Plan", desc: "Template kế hoạch đo lường 4 cấp độ: KPI, baseline, target, nguồn, thời điểm, owner, giới hạn." },
  { name: "Executive Report Template", desc: "Khung báo cáo một trang: What happened / Why it matters / What we should do next." },
  { name: "Sample Completed Case", desc: "Ví dụ hoàn chỉnh cho running case Coaching Skills — từ business question đến khuyến nghị." },
  { name: "Prompt Library", desc: "Các prompt quan trọng dùng với Claude (bản đầy đủ 18 prompts trên trang Prompt Library)." },
];

const ISSUES = [
  "Một số Learner_ID bị trùng",
  "Department viết không nhất quán ('sales ', 'HR', 'OPERATIONS')",
  "Một số dòng completed nhưng thiếu post-test",
  "Vài điểm số vượt phạm vi hợp lệ (112/100, 6.5/5)",
  "Một số ngày dùng định dạng dd/mm/yyyy lẫn với ISO",
  "Một số Application 30/60 ngày bị thiếu",
  "Tên chương trình gần giống nhau ('Front-line' vs 'Frontline')",
  "Vài Training Cost bất thường (gấp ~10 lần)",
  "Một số Manager Observation Score bị thiếu",
];

export default function WorkbookPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Excel Workbook thực hành</h1>
      <p className="mt-2 text-slate-600">
        File dữ liệu giả lập dùng xuyên suốt Module 7 (phân tích) và Module 8 (dashboard). Không chứa dữ liệu cá nhân
        thật. Phiên bản dữ liệu sạch của cùng dataset được dùng cho Learning Impact Dashboard trên website.
      </p>

      <div className="mt-6">
        <WorkbookDownload />
      </div>

      <h2 className="mt-10 text-lg font-bold text-slate-900">8 sheets trong workbook</h2>
      <ol className="mt-4 space-y-2">
        {SHEETS.map((s, i) => (
          <li key={s.name} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="font-semibold text-slate-800">
              {i + 1}. {s.name}
            </p>
            <p className="mt-0.5 text-sm text-slate-600">{s.desc}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-10 text-lg font-bold text-slate-900">Lỗi dữ liệu có chủ đích (để thực hành)</h2>
      <p className="mt-1 text-sm text-slate-600">
        Sheet Learner Records chứa các vấn đề sau — vị trí chính xác được ghi chú trong Data Dictionary:
      </p>
      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {ISSUES.map((i) => (
          <li key={i} className="flex gap-2 text-sm text-slate-700">
            <span aria-hidden className="text-amber-600">⚠</span> {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
