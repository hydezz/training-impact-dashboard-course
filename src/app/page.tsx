"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { courseModules, totalCourseMinutes, INSTRUCTOR_NAME, CERTIFICATE_TITLE } from "@/data/course";
import { useProgress } from "@/hooks/useProgress";
import Visual from "@/components/course/Visuals";

/** Shows /images/tony-profile.jpg when the file exists; falls back to an initials badge otherwise. */
function AuthorAvatar() {
  const [photoAvailable, setPhotoAvailable] = useState(true);

  if (!photoAvailable) {
    return (
      <div
        aria-hidden
        className="grid h-28 w-28 shrink-0 place-items-center rounded-full bg-brand-800 text-3xl font-bold text-white"
      >
        TH
      </div>
    );
  }

  return (
    <Image
      src="/images/tony-profile.jpg"
      alt="Chân dung Nhan Ha (Tony)"
      width={112}
      height={112}
      loading="eager"
      onError={() => setPhotoAvailable(false)}
      className="h-28 w-28 shrink-0 rounded-full border-2 border-brand-200 object-cover"
    />
  );
}

const OUTCOMES = [
  "Giải thích 4 cấp độ Kirkpatrick và chọn KPI phù hợp cho từng cấp",
  "Phân biệt participation, satisfaction, learning, behavior và business results",
  "Xây dựng Training Measurement Plan hoàn chỉnh với nguồn dữ liệu và thời điểm thu thập",
  "Phân tích dữ liệu đào tạo bằng Excel và AI, tính các KPI cơ bản",
  "Xây Learning Impact Dashboard với filters và insight panel",
  "Phân biệt correlation với causation và nhận diện giới hạn dữ liệu",
  "Viết executive training-impact report và đề xuất hành động dựa trên dữ liệu",
];

const PORTFOLIO_ITEMS = [
  "Kirkpatrick Measurement Plan",
  "Training KPI Framework",
  "Data Collection Plan",
  "File Excel thực hành (420 records)",
  "Learning Impact Dashboard",
  "Key Insights Summary",
  "Management Executive Report",
  "Action Recommendations",
  "Data Quality Checklist",
  "AI Analysis Prompt Pack",
];

const AUDIENCE = [
  "L&D / Talent Development Professionals",
  "HR Business Partners & Training Managers",
  "Corporate Trainers & People Managers",
  "Người mới bắt đầu với learning analytics — không cần biết lập trình",
];

export default function LandingPage() {
  const { coursePct, loaded, remainingMinutes } = useProgress();
  const started = loaded && coursePct > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-500">
                Khóa học ứng dụng · {totalCourseMinutes} phút · Chứng chỉ hoàn thành
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Measure Training Impact with Kirkpatrick, Excel and AI
              </h1>
              <p className="mt-2 text-lg text-brand-200">Đo lường hiệu quả đào tạo bằng Kirkpatrick, Excel và AI</p>
              <p className="mt-5 text-brand-100">
                Không chỉ đo số người tham gia. Hãy học cách chứng minh đào tạo đã thay đổi kiến thức, hành vi và kết
                quả kinh doanh như thế nào.
              </p>
              <p className="mt-3 text-sm text-brand-200">
                Trong 120 phút, bạn sẽ xây dựng một Measurement Plan, tính các KPI đào tạo, phân tích dữ liệu và hoàn
                thành một Learning Impact Dashboard dành cho management.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/course/orientation"
                  className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white hover:bg-accent-600"
                >
                  {started ? "▶ Bắt đầu lại từ Orientation" : "▶ Start Course"}
                </Link>
                {started && (
                  <Link
                    href="/course"
                    className="rounded-lg border border-brand-200/40 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20"
                  >
                    ⏵ Continue Learning ({coursePct}% · còn ~{remainingMinutes} phút)
                  </Link>
                )}
                <a
                  href="/downloads/training-impact-practice-data.xlsx"
                  download
                  className="rounded-lg border border-brand-200/40 px-6 py-3 font-semibold text-brand-100 hover:bg-white/10"
                >
                  ⬇ Download Workbook
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
              <Visual keyName="kirkpatrick-pyramid" />
            </div>
          </div>
        </div>
      </section>

      {/* Pain point + audience */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Từ &ldquo;training đã diễn ra&rdquo; đến &ldquo;training tạo ra gì&rdquo;</h2>
            <p className="mt-3 text-slate-600">
              Nhiều L&amp;D professional tổ chức chương trình rất tốt — nhưng gặp khó khi lãnh đạo hỏi: chương trình đã
              thay đổi hành vi, hiệu suất và kết quả kinh doanh như thế nào? Khóa học này trang bị cho bạn quy trình,
              công cụ và ngôn ngữ để trả lời câu hỏi đó bằng bằng chứng.
            </p>
            <div className="mt-6">
              <Visual keyName="journey-map" />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">Khóa học dành cho</h3>
            <ul className="mt-3 space-y-2">
              {AUDIENCE.map((a) => (
                <li key={a} className="flex gap-2 text-sm text-slate-700">
                  <span aria-hidden className="text-accent-600">✓</span> {a}
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-bold text-slate-900">Learning outcomes</h3>
            <ul className="mt-3 space-y-2">
              {OUTCOMES.map((o) => (
                <li key={o} className="flex gap-2 text-sm text-slate-700">
                  <span aria-hidden className="text-accent-600">✓</span> {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-slate-900">Curriculum · {totalCourseMinutes} phút</h2>
          <p className="mt-1 text-sm text-slate-500">
            10 phần · {courseModules.reduce((s, m) => s + m.steps.length, 0)} microlearning steps · mỗi module đóng góp
            một phần vào Portfolio
          </p>
          <ol className="mt-6 grid gap-3 md:grid-cols-2">
            {courseModules.map((m) => (
              <li key={m.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
                      {m.id === "orientation" ? "Orientation" : `Module ${m.order}`} · {m.phase}
                    </p>
                    <h3 className="mt-0.5 font-semibold text-slate-900">{m.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{m.description}</p>
                    <p className="mt-2 text-xs text-slate-500">📁 Portfolio: {m.portfolioOutput}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-brand-100 px-2.5 py-1 text-xs font-bold text-brand-800">
                    {m.minutes}&apos;
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Previews */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900">Bạn sẽ xây dựng gì</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="rounded-lg bg-slate-50 p-3">
              <Visual keyName="dashboard-anatomy" />
            </div>
            <h3 className="mt-4 font-bold text-slate-900">Learning Impact Dashboard</h3>
            <p className="mt-1 text-sm text-slate-600">
              7 KPI cards, 8 biểu đồ, 8 filters và insight panel — dựng sẵn từ 420 learner records để bạn khám phá.
            </p>
            <Link href="/dashboard" className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline">
              Xem dashboard →
            </Link>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="rounded-lg bg-slate-50 p-4 text-center">
              <p className="text-5xl" aria-hidden>📊</p>
              <p className="mt-2 text-sm font-semibold text-slate-700">training-impact-practice-data.xlsx</p>
              <p className="text-xs text-slate-500">8 sheets · 420 records · Data + KPI Dictionary</p>
            </div>
            <h3 className="mt-4 font-bold text-slate-900">Excel Workbook thực hành</h3>
            <p className="mt-1 text-sm text-slate-600">
              Dữ liệu giả lập kèm lỗi chất lượng có chủ đích để bạn thực hành làm sạch và tính KPI — kèm Sample
              Completed Case.
            </p>
            <Link href="/workbook" className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline">
              Xem workbook →
            </Link>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="rounded-lg border-2 border-dashed border-brand-200 bg-brand-50 p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">Certificate</p>
              <p className="mt-1 text-sm font-bold text-brand-900">{CERTIFICATE_TITLE}</p>
              <p className="mt-1 text-xs text-slate-500">Print · PDF · LinkedIn share</p>
            </div>
            <h3 className="mt-4 font-bold text-slate-900">Chứng chỉ hoàn thành</h3>
            <p className="mt-1 text-sm text-slate-600">
              Hoàn thành 100% steps, các knowledge checks (≥70% điểm), Portfolio và Executive Report để nhận chứng chỉ.
            </p>
            <Link href="/certificate" className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline">
              Điều kiện chứng chỉ →
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-slate-900">Training Impact Measurement Portfolio</h3>
          <p className="mt-1 text-sm text-slate-600">Mỗi module đóng góp một phần — kết thúc khóa bạn có trọn bộ:</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {PORTFOLIO_ITEMS.map((p, i) => (
              <li key={p} className="text-sm text-slate-700">
                {i + 1}. {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Author */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:flex-row sm:items-start">
            <AuthorAvatar />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">Tác giả khóa học</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">{INSTRUCTOR_NAME}</h2>
              <p className="text-sm font-medium text-slate-600">Một người đam mê phát triển con người</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Tony không tự nhận mình là chuyên gia — chỉ là một người làm nghề L&amp;D nhiều năm, từng loay hoay
                trước câu hỏi &ldquo;đào tạo này mang lại gì?&rdquo; và tự mày mò tìm cách trả lời bằng dữ liệu. Khóa
                học này là những gì Tony ước có ai đó chỉ cho mình từ những ngày đầu: cách đo lường thực tế, trung
                thực với giới hạn của dữ liệu, và luôn bắt đầu từ con người thay vì con số.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a
                  href="mailto:nhanhd.1505@gmail.com"
                  className="font-medium text-brand-700 hover:underline"
                >
                  ✉ nhanhd.1505@gmail.com
                </a>
                <a
                  href="https://github.com/hydezz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-700 hover:underline"
                >
                  ⌂ github.com/hydezz
                </a>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Mọi góp ý về nội dung khóa học đều được chào đón — hãy viết thư cho Tony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Sẵn sàng chứng minh giá trị đào tạo?</h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-600">
          120 phút — một Measurement Plan, một bộ KPI, một dashboard và một executive report bạn dùng được ngay.
        </p>
        <Link
          href="/course/orientation"
          className="mt-6 inline-block rounded-lg bg-brand-700 px-8 py-3.5 font-semibold text-white hover:bg-brand-800"
        >
          ▶ Bắt đầu khóa học
        </Link>
      </section>
    </div>
  );
}
