"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import {
  CERTIFICATE_TITLE,
  CERTIFICATE_TITLE_VI,
  COURSE_TITLE,
  INSTRUCTOR_NAME,
  INSTRUCTOR_ROLE,
  totalCourseMinutes,
} from "@/data/course";
import { generateCertificateId } from "@/lib/report";

const SKILLS = [
  "Kirkpatrick four-level measurement planning",
  "Training KPI selection and definition",
  "Training data analysis with Excel and AI",
  "Learning impact dashboard design",
  "Evidence-based executive reporting",
];

export default function CertificatePage() {
  const { progress, loaded, certificateEligible, certificateBlockers, totalScore, update } = useProgress();

  if (!loaded) return <div className="p-10 text-center text-slate-500">Đang tải…</div>;

  const cert = progress.certificate;

  const issue = () => {
    const name = progress.learnerName.trim();
    if (!name) return;
    update({
      certificate: {
        id: generateCertificateId(),
        learnerName: name,
        issuedDate: new Date().toISOString().slice(0, 10),
      },
    });
  };

  const linkedInUrl = cert
    ? `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
        CERTIFICATE_TITLE
      )}&organizationName=${encodeURIComponent("Training Impact Course by Nhan Ha (Tony)")}&issueYear=${cert.issuedDate.slice(0, 4)}&issueMonth=${Number(
        cert.issuedDate.slice(5, 7)
      )}&certId=${cert.id}`
    : "#";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="no-print text-2xl font-bold text-slate-900">Chứng chỉ hoàn thành</h1>

      {!cert && (
        <div className="no-print mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Điều kiện nhận chứng chỉ</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              "Hoàn thành 100% learning steps",
              "Hoàn thành tất cả knowledge checks",
              `Đạt tối thiểu 70% tổng điểm (hiện tại: ${totalScore.pct}%)`,
              "Hoàn thành Measurement Portfolio",
              "Hoàn thành Executive Report trong Final Challenge",
            ].map((c) => (
              <li key={c} className="flex gap-2 text-slate-700">
                <span aria-hidden>📋</span> {c}
              </li>
            ))}
          </ul>

          {certificateEligible ? (
            <div className="mt-5">
              <p className="rounded-md bg-green-50 p-3 text-sm font-medium text-green-800">
                🎉 Chúc mừng! Bạn đã đủ điều kiện nhận chứng chỉ.
              </p>
              {!progress.learnerName.trim() && (
                <label className="mt-4 block max-w-md">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">Tên in trên chứng chỉ</span>
                  <input
                    type="text"
                    value={progress.learnerName}
                    onChange={(e) => update({ learnerName: e.target.value })}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </label>
              )}
              <button
                type="button"
                onClick={issue}
                disabled={!progress.learnerName.trim()}
                className="mt-4 rounded-md bg-accent-600 px-6 py-3 font-semibold text-white hover:bg-accent-500 disabled:opacity-40"
              >
                🎓 Nhận chứng chỉ
              </button>
            </div>
          ) : (
            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-700">Bạn còn thiếu:</p>
              <ul className="mt-2 space-y-1.5">
                {certificateBlockers.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-amber-800">
                    <span aria-hidden>⚠</span> {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/course"
                className="mt-4 inline-block rounded-md bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
              >
                Tiếp tục khóa học →
              </Link>
            </div>
          )}
        </div>
      )}

      {cert && (
        <>
          <div className="no-print mt-4 mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
            >
              🖨 Print / Download PDF
            </button>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-600"
            >
              in Share on LinkedIn
            </a>
          </div>

          <div className="print-page rounded-2xl border-4 border-double border-brand-800 bg-white p-8 text-center shadow-lg sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">{CERTIFICATE_TITLE}</p>
            <p className="mt-1 text-xs text-slate-500">{CERTIFICATE_TITLE_VI}</p>

            <p className="mt-8 text-sm text-slate-500">This certifies that</p>
            <p className="mt-2 text-3xl font-bold text-brand-900">{cert.learnerName}</p>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-600">
              has successfully completed the applied learning program{" "}
              <strong className="text-slate-800">{COURSE_TITLE}</strong> and demonstrated the ability to create a
              training measurement plan, calculate learning KPIs, analyze training data, build a learning impact
              dashboard, and communicate evidence-based recommendations.
            </p>

            <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-3 text-sm">
              <div>
                <p className="font-semibold text-slate-800">{cert.issuedDate}</p>
                <p className="text-xs text-slate-500">Completion date</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">{totalCourseMinutes} minutes</p>
                <p className="text-xs text-slate-500">Course duration</p>
              </div>
              <div>
                <p className="font-semibold text-slate-800">{cert.id}</p>
                <p className="text-xs text-slate-500">Certificate ID</p>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-md border-t border-slate-200 pt-4">
              <p className="font-semibold text-slate-800">{INSTRUCTOR_NAME}</p>
              <p className="text-xs text-slate-500">{INSTRUCTOR_ROLE} · Instructor</p>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Skills demonstrated</p>
              <p className="mx-auto mt-1 max-w-xl text-xs text-slate-600">{SKILLS.join(" · ")}</p>
            </div>

            <p className="mt-6 text-[10px] text-slate-400">
              Certificate ID được tạo trên trình duyệt của học viên; khóa học không có hệ thống xác thực trực tuyến.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
