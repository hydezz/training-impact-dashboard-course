import type { VisualKey } from "@/types/course";

/** Self-designed framework visuals (no copyrighted diagrams). */

function Pyramid() {
  const levels = [
    { label: "Level 4 · Results", desc: "Kết quả kinh doanh", w: "w-full", color: "bg-brand-800" },
    { label: "Level 3 · Behavior", desc: "Hành vi tại nơi làm việc", w: "w-5/6", color: "bg-brand-700" },
    { label: "Level 2 · Learning", desc: "Kiến thức & kỹ năng", w: "w-2/3", color: "bg-brand-600" },
    { label: "Level 1 · Reaction", desc: "Phản ứng & mức độ phù hợp", w: "w-1/2", color: "bg-accent-600" },
  ];
  return (
    <figure className="mx-auto max-w-md">
      <div className="flex flex-col-reverse items-center gap-1">
        {levels.map((l) => (
          <div key={l.label} className={`${l.w} ${l.color} rounded-md px-4 py-2.5 text-center text-white`}>
            <p className="text-sm font-semibold">{l.label}</p>
            <p className="text-xs opacity-80">{l.desc}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center text-xs text-slate-500">
        Mô hình 4 cấp độ Kirkpatrick — càng lên cao, bằng chứng càng gần kết quả kinh doanh
      </figcaption>
    </figure>
  );
}

function JourneyMap() {
  const phases = ["Define", "Measure", "Analyze", "Visualize", "Explain", "Recommend"];
  return (
    <figure>
      <ol className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        {phases.map((p, i) => (
          <li key={p} className="flex items-center gap-1 sm:gap-2">
            <span className="rounded-full bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white sm:text-sm">
              {p}
            </span>
            {i < phases.length - 1 && (
              <span aria-hidden className="text-slate-400">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-2 text-center text-xs text-slate-500">
        Learner journey của khóa học — cũng là quy trình của một dự án đo lường thật
      </figcaption>
    </figure>
  );
}

function ActivityVsImpact() {
  return (
    <figure className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg border border-slate-300 bg-white p-4">
        <p className="text-sm font-bold text-slate-500">TRAINING ACTIVITY</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-600">
          <li>· 12 lớp học đã tổ chức</li>
          <li>· 120 học viên tham dự</li>
          <li>· 95% hoàn thành</li>
          <li>· Hài lòng 4.2/5</li>
        </ul>
        <p className="mt-3 text-xs italic text-slate-400">&ldquo;Chúng tôi đã bận rộn&rdquo;</p>
      </div>
      <div className="rounded-lg border-2 border-accent-500 bg-accent-500/5 p-4">
        <p className="text-sm font-bold text-accent-600">TRAINING IMPACT</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          <li>· Kiến thức +38% so với baseline</li>
          <li>· 74% coaching hàng tháng (từ 39%)</li>
          <li>· Hiệu suất đội +8.4%</li>
          <li>· Gắn với giảm turnover</li>
        </ul>
        <p className="mt-3 text-xs font-medium italic text-accent-600">&ldquo;Chúng tôi tạo ra thay đổi&rdquo;</p>
      </div>
    </figure>
  );
}

function Level1Dimensions() {
  const dims = [
    { name: "Satisfaction", power: 1, note: "Trải nghiệm có dễ chịu?" },
    { name: "Engagement", power: 2, note: "Có tham gia tích cực?" },
    { name: "Confidence", power: 3, note: "Có tự tin áp dụng?" },
    { name: "Relevance", power: 4, note: "Có sát công việc?" },
    { name: "Intention to apply", power: 4, note: "Có kế hoạch dùng?" },
  ];
  return (
    <figure>
      <div className="space-y-2">
        {dims.map((d) => (
          <div key={d.name} className="flex items-center gap-3">
            <span className="w-36 shrink-0 text-right text-xs font-semibold text-slate-700 sm:text-sm">{d.name}</span>
            <div className="h-4 flex-1 overflow-hidden rounded bg-slate-100">
              <div className="h-full rounded bg-brand-600" style={{ width: `${d.power * 25}%` }} />
            </div>
            <span className="hidden w-40 text-xs text-slate-500 md:block">{d.note}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center text-xs text-slate-500">
        Sức mạnh dự báo transfer (minh họa): relevance và intention vượt xa satisfaction
      </figcaption>
    </figure>
  );
}

function PrePostFlow() {
  return (
    <figure className="flex flex-wrap items-center justify-center gap-2 text-center text-xs font-medium sm:text-sm">
      <div className="rounded-lg border border-brand-200 bg-white px-4 py-3">
        <p className="font-bold text-brand-800">PRE-TEST</p>
        <p className="text-slate-500">Baseline: 57</p>
      </div>
      <span aria-hidden className="text-slate-400">→</span>
      <div className="rounded-lg bg-brand-700 px-4 py-3 text-white">
        <p className="font-bold">TRAINING</p>
        <p className="opacity-80">Học + thực hành</p>
      </div>
      <span aria-hidden className="text-slate-400">→</span>
      <div className="rounded-lg border border-brand-200 bg-white px-4 py-3">
        <p className="font-bold text-brand-800">POST-TEST</p>
        <p className="text-slate-500">Kết quả: 79</p>
      </div>
      <span aria-hidden className="text-slate-400">=</span>
      <div className="rounded-lg bg-accent-600 px-4 py-3 text-white">
        <p className="font-bold">+22 điểm</p>
        <p className="opacity-90">≈ +38.6%</p>
      </div>
    </figure>
  );
}

function TransferTimeline() {
  const marks = [
    { day: "Ngày 0", label: "Kết thúc khóa học", note: "Đo L1 + L2" },
    { day: "Ngày 30", label: "Bắt đầu áp dụng?", note: "Khảo sát đợt 1 + rào cản" },
    { day: "Ngày 60", label: "Duy trì không?", note: "Khảo sát đợt 2" },
    { day: "Ngày 90", label: "Thành thói quen?", note: "Khảo sát 3 + manager observation" },
  ];
  return (
    <figure>
      <ol className="grid gap-2 sm:grid-cols-4">
        {marks.map((m, i) => (
          <li key={m.day} className="relative rounded-lg border border-slate-200 bg-white p-3">
            <span className="text-xs font-bold text-accent-600">{m.day}</span>
            <p className="text-sm font-semibold text-slate-800">{m.label}</p>
            <p className="text-xs text-slate-500">{m.note}</p>
            {i < marks.length - 1 && (
              <span aria-hidden className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-slate-300 sm:block">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-2 text-center text-xs text-slate-500">Nhịp đo hành vi 30/60/90 ngày</figcaption>
    </figure>
  );
}

function LeadingLagging() {
  return (
    <figure className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg border border-accent-500/40 bg-accent-500/5 p-4">
        <p className="text-sm font-bold text-accent-600">LEADING (dẫn dắt)</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          <li>· Tần suất coaching hàng tháng</li>
          <li>· Điểm engagement pulse</li>
          <li>· Tỷ lệ lỗi theo tuần</li>
        </ul>
        <p className="mt-2 text-xs text-slate-500">Thay đổi sớm → can thiệp kịp</p>
      </div>
      <div className="rounded-lg border border-brand-200 bg-brand-50 p-4">
        <p className="text-sm font-bold text-brand-800">LAGGING (kết quả)</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          <li>· Turnover 12 tháng</li>
          <li>· Hiệu suất quý</li>
          <li>· Chi phí chất lượng năm</li>
        </ul>
        <p className="mt-2 text-xs text-slate-500">Thay đổi chậm → khẳng định giá trị</p>
      </div>
    </figure>
  );
}

function KpiFamilies() {
  const fams = [
    { name: "Activity", ex: "Participation, Completion", color: "bg-slate-500" },
    { name: "Efficiency", ex: "Cost per Learner", color: "bg-slate-600" },
    { name: "Learning", ex: "Knowledge Improvement", color: "bg-brand-600" },
    { name: "Behavior", ex: "Application Rate", color: "bg-brand-700" },
    { name: "Business", ex: "Performance, Impact Value", color: "bg-brand-800" },
  ];
  return (
    <figure>
      <div className="flex flex-wrap justify-center gap-2">
        {fams.map((f) => (
          <div key={f.name} className={`${f.color} min-w-[130px] flex-1 rounded-lg p-3 text-center text-white`}>
            <p className="text-sm font-bold">{f.name}</p>
            <p className="text-xs opacity-80">{f.ex}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center text-xs text-slate-500">
        Bộ KPI cân bằng có đại diện từ đủ 5 nhóm
      </figcaption>
    </figure>
  );
}

function DataQualityFlow() {
  const steps = ["Đọc Data Dictionary", "Quét 6 loại lỗi", "Làm sạch trên bản copy", "Ghi log thay đổi", "Tính KPI"];
  return (
    <figure>
      <ol className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-1 sm:gap-2">
            <span className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700">
              {i + 1}. {s}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden className="text-slate-400">→</span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-2 text-center text-xs text-slate-500">Quy trình làm sạch trước phân tích</figcaption>
    </figure>
  );
}

function DashboardAnatomy() {
  return (
    <figure className="mx-auto max-w-md rounded-lg border border-slate-300 bg-white p-3">
      <div className="mb-2 grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded bg-brand-100 p-1.5 text-center text-[10px] font-semibold text-brand-800">
            KPI {i}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <div className="col-span-2 grid grid-cols-2 gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex h-14 items-end justify-around rounded bg-slate-100 p-1.5">
              {[40, 70, 55].map((h, j) => (
                <div key={j} className="w-2.5 rounded-t bg-brand-600" style={{ height: `${h}%` }} />
              ))}
            </div>
          ))}
        </div>
        <div className="rounded bg-accent-500/10 p-1.5 text-[9px] leading-tight text-accent-600">
          <p className="font-bold">INSIGHTS</p>
          <p className="mt-1">Điều dữ liệu muốn nói, bằng chữ…</p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-xs text-slate-500">
        Visual hierarchy: KPI cards → charts → insight panel
      </figcaption>
    </figure>
  );
}

function ReportStructure() {
  const parts = [
    { q: "What happened?", a: "Kết quả chính so với target — dẫn đầu bằng con số đắt nhất" },
    { q: "Why does it matter?", a: "Ý nghĩa kinh doanh + giới hạn dữ liệu nêu trung thực" },
    { q: "What should we do next?", a: "2–3 khuyến nghị có owner + next measurement step" },
  ];
  return (
    <figure className="space-y-2">
      {parts.map((p, i) => (
        <div key={p.q} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">
            {i + 1}
          </span>
          <div>
            <p className="text-sm font-bold text-brand-800">{p.q}</p>
            <p className="text-xs text-slate-600">{p.a}</p>
          </div>
        </div>
      ))}
    </figure>
  );
}

export default function Visual({ keyName }: { keyName: VisualKey }) {
  switch (keyName) {
    case "kirkpatrick-pyramid":
      return <Pyramid />;
    case "journey-map":
      return <JourneyMap />;
    case "activity-vs-impact":
      return <ActivityVsImpact />;
    case "level1-dimensions":
      return <Level1Dimensions />;
    case "pre-post-flow":
      return <PrePostFlow />;
    case "transfer-timeline":
      return <TransferTimeline />;
    case "leading-lagging":
      return <LeadingLagging />;
    case "kpi-families":
      return <KpiFamilies />;
    case "data-quality-flow":
      return <DataQualityFlow />;
    case "dashboard-anatomy":
      return <DashboardAnatomy />;
    case "report-structure":
      return <ReportStructure />;
    default:
      return null;
  }
}
