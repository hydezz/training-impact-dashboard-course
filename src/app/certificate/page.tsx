"use client";

import Link from "next/link";
import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { CERTIFICATE_TITLE, CERTIFICATE_TITLE_VI, COURSE_TITLE, totalCourseMinutes } from "@/data/course";
import { generateCertificateId } from "@/lib/report";
import TicSeal from "@/components/certificate/TicSeal";

type Lang = "vi" | "en";

const T = {
  vi: {
    pageTitle: "Chứng chỉ hoàn thành",
    conditionsTitle: "Điều kiện nhận chứng chỉ",
    conditions: (score: number) => [
      "Hoàn thành 100% learning steps",
      "Hoàn thành tất cả knowledge checks",
      `Đạt tối thiểu 70% tổng điểm (hiện tại: ${score}%)`,
      "Hoàn thành Measurement Portfolio",
      "Hoàn thành Executive Report trong Final Challenge",
    ],
    congrats: "🎉 Chúc mừng! Bạn đã đủ điều kiện nhận chứng chỉ.",
    nameLabel: "Tên in trên chứng chỉ",
    issueBtn: "🎓 Nhận chứng chỉ",
    missing: "Bạn còn thiếu:",
    continueBtn: "Tiếp tục khóa học →",
    printBtn: "🖨 In / Tải PDF",
    linkedinBtn: "in Chia sẻ lên LinkedIn",
    certHeading: "CHỨNG NHẬN HOÀN THÀNH",
    certifies: "Chứng nhận",
    statement: (course: string) =>
      `đã hoàn thành xuất sắc chương trình học ứng dụng “${course}” và thể hiện năng lực xây dựng kế hoạch đo lường đào tạo, tính toán các KPI học tập, phân tích dữ liệu đào tạo, xây dựng learning impact dashboard và truyền đạt khuyến nghị dựa trên bằng chứng.`,
    skillsTitle: "Năng lực đã chứng minh",
    skills: [
      "Lập kế hoạch đo lường theo 4 cấp độ Kirkpatrick",
      "Lựa chọn và định nghĩa KPI đào tạo",
      "Phân tích dữ liệu đào tạo bằng Excel và AI",
      "Thiết kế Learning Impact Dashboard",
      "Viết báo cáo executive dựa trên bằng chứng",
    ],
    duration: "Thời lượng học",
    durationValue: `${totalCourseMinutes} phút học ứng dụng`,
    completionDate: "Ngày hoàn thành",
    certId: "Mã chứng chỉ",
    authorRole: "Một người đam mê phát triển con người và tổ chức",
    authorLabel: "Tác giả khóa học",
    certifiedBy: "Certified by",
    fineprint:
      "Mã chứng chỉ được tạo trên trình duyệt của học viên; chứng chỉ ghi nhận việc hoàn thành khóa học và không có hệ thống xác thực trực tuyến.",
  },
  en: {
    pageTitle: "Certificate of Completion",
    conditionsTitle: "Certificate requirements",
    conditions: (score: number) => [
      "Complete 100% of learning steps",
      "Complete all knowledge checks",
      `Score at least 70% overall (current: ${score}%)`,
      "Complete the Measurement Portfolio",
      "Complete the Executive Report in the Final Challenge",
    ],
    congrats: "🎉 Congratulations! You are eligible for the certificate.",
    nameLabel: "Name printed on the certificate",
    issueBtn: "🎓 Claim certificate",
    missing: "Still missing:",
    continueBtn: "Continue the course →",
    printBtn: "🖨 Print / Download PDF",
    linkedinBtn: "in Share on LinkedIn",
    certHeading: "CERTIFICATE OF COMPLETION",
    certifies: "This certifies that",
    statement: (course: string) =>
      `has successfully completed the applied learning program “${course}” and demonstrated the ability to create a training measurement plan, calculate learning KPIs, analyze training data, build a learning impact dashboard, and communicate evidence-based recommendations.`,
    skillsTitle: "Skills demonstrated",
    skills: [
      "Kirkpatrick four-level measurement planning",
      "Training KPI selection and definition",
      "Training data analysis with Excel and AI",
      "Learning impact dashboard design",
      "Evidence-based executive reporting",
    ],
    duration: "Course duration",
    durationValue: `${totalCourseMinutes} minutes of applied learning`,
    completionDate: "Completion date",
    certId: "Certificate ID",
    authorRole: "Passionate about developing people and organizations",
    authorLabel: "Course Author",
    certifiedBy: "Certified by",
    fineprint:
      "The certificate ID is generated in the learner's browser; this certificate records course completion and has no online verification system.",
  },
} as const;

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const cls = {
    tl: "left-2 top-2 border-l-2 border-t-2",
    tr: "right-2 top-2 border-r-2 border-t-2",
    bl: "bottom-2 left-2 border-b-2 border-l-2",
    br: "bottom-2 right-2 border-b-2 border-r-2",
  }[pos];
  return <div aria-hidden className={`absolute h-10 w-10 border-amber-700/70 ${cls}`} />;
}

export default function CertificatePage() {
  const { progress, loaded, certificateEligible, certificateBlockers, totalScore, update } = useProgress();
  const [lang, setLang] = useState<Lang>("vi");
  const t = T[lang];

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
      )}&organizationName=${encodeURIComponent("Training Impact by Claude (TIC)")}&issueYear=${cert.issuedDate.slice(0, 4)}&issueMonth=${Number(
        cert.issuedDate.slice(5, 7)
      )}&certId=${cert.id}`
    : "#";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* page header with language toggle at top-right */}
      <div className="no-print mb-6 flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">{t.pageTitle}</h1>
        <div
          role="group"
          aria-label="Chọn ngôn ngữ / Choose language"
          className="flex overflow-hidden rounded-lg border border-slate-300 bg-white text-sm font-semibold shadow-sm"
        >
          {(["vi", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`px-4 py-2 transition-colors ${
                lang === l ? "bg-brand-800 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {l === "vi" ? "🇻🇳 VI" : "🇬🇧 EN"}
            </button>
          ))}
        </div>
      </div>

      {!cert && (
        <div className="no-print rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">{t.conditionsTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {t.conditions(totalScore.pct).map((c) => (
              <li key={c} className="flex gap-2 text-slate-700">
                <span aria-hidden>📋</span> {c}
              </li>
            ))}
          </ul>

          {certificateEligible ? (
            <div className="mt-5">
              <p className="rounded-md bg-green-50 p-3 text-sm font-medium text-green-800">{t.congrats}</p>
              {!progress.learnerName.trim() && (
                <label className="mt-4 block max-w-md">
                  <span className="mb-1 block text-sm font-semibold text-slate-700">{t.nameLabel}</span>
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
                {t.issueBtn}
              </button>
            </div>
          ) : (
            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-700">{t.missing}</p>
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
                {t.continueBtn}
              </Link>
            </div>
          )}
        </div>
      )}

      {cert && (
        <>
          <div className="no-print mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
            >
              {t.printBtn}
            </button>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-600"
            >
              {t.linkedinBtn}
            </a>
          </div>

          {/* ============ CERTIFICATE ============ */}
          <div className="print-page rounded-sm bg-brand-900 p-2 shadow-2xl sm:p-3">
            <div className="rounded-sm border border-amber-600/70 p-1">
              <div className="relative overflow-hidden rounded-sm border border-brand-800 bg-[#fdfcf8] px-5 py-8 sm:px-12 sm:py-10">
                <Corner pos="tl" />
                <Corner pos="tr" />
                <Corner pos="bl" />
                <Corner pos="br" />

                {/* watermark */}
                <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center opacity-[0.045]">
                  <TicSeal size={430} />
                </div>

                <div className="relative text-center">
                  {/* letterhead */}
                  <div className="flex items-center justify-center gap-3">
                    <span aria-hidden className="hidden h-px w-16 bg-amber-700/60 sm:block" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-brand-800">
                      Training Impact by Claude
                    </p>
                    <span aria-hidden className="hidden h-px w-16 bg-amber-700/60 sm:block" />
                  </div>

                  <h2 className="mt-5 font-serif text-3xl font-bold tracking-wide text-brand-900 sm:text-4xl">
                    {t.certHeading}
                  </h2>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">
                    {CERTIFICATE_TITLE}
                  </p>
                  <p className="text-xs italic text-slate-500">{CERTIFICATE_TITLE_VI}</p>

                  <p className="mt-7 text-sm text-slate-500">{t.certifies}</p>
                  <p className="mx-auto mt-2 inline-block border-b border-amber-700/50 px-8 pb-2 font-serif text-3xl font-semibold italic text-brand-900 sm:text-4xl">
                    {cert.learnerName}
                  </p>

                  <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600">
                    {t.statement(COURSE_TITLE)}
                  </p>

                  {/* skills learned */}
                  <div className="mx-auto mt-6 max-w-2xl rounded-md border border-brand-100 bg-white/70 px-5 py-4 text-left">
                    <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-brand-800">
                      {t.skillsTitle}
                    </p>
                    <ul className="mt-3 grid gap-x-8 gap-y-1.5 text-[13px] text-slate-700 sm:grid-cols-2">
                      {t.skills.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span aria-hidden className="text-amber-700">✦</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* details */}
                  <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-stretch justify-center gap-x-10 gap-y-4">
                    {[
                      { label: t.duration, value: t.durationValue },
                      { label: t.completionDate, value: cert.issuedDate },
                      { label: t.certId, value: cert.id },
                    ].map((d) => (
                      <div key={d.label}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{d.label}</p>
                        <p className="mt-1 font-serif text-sm font-semibold text-brand-900">{d.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* signature + seal */}
                  <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-between gap-6 border-t border-slate-200 pt-6 sm:flex-row sm:items-end">
                    <div className="text-center sm:text-left">
                      <p className="font-serif text-lg font-semibold text-brand-900">Nhan Ha (Tony), MBA, SHRM-CP</p>
                      <p className="text-xs italic text-slate-500">{t.authorRole}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        {t.authorLabel}
                      </p>
                    </div>
                    <div className="text-center">
                      <TicSeal size={84} />
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        {t.certifiedBy} <span className="text-brand-800">TIC</span>
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-[9px] leading-relaxed text-slate-400">{t.fineprint}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
