"use client";

import Link from "next/link";
import { courseModules } from "@/data/course";
import { useProgress } from "@/hooks/useProgress";
import { ReportPreview } from "@/components/course/ReportBuilder";
import { reportToText } from "@/lib/report";
import { useState } from "react";

export default function PortfolioPage() {
  const { progress, loaded, coursePct } = useProgress();
  const [copied, setCopied] = useState(false);

  if (!loaded) return <div className="p-10 text-center text-slate-500">Đang tải…</div>;

  const modulesWithFields = courseModules
    .map((m) => ({
      module: m,
      fields: m.steps.flatMap((s) => s.portfolioFields ?? []),
    }))
    .filter((x) => x.fields.length > 0);

  const filledCount = modulesWithFields.reduce(
    (sum, x) => sum + x.fields.filter((f) => (progress.portfolio[f.id] ?? "").trim() !== "").length,
    0
  );
  const totalFields = modulesWithFields.reduce((sum, x) => sum + x.fields.length, 0);

  const copyAll = async () => {
    const parts: string[] = ["TRAINING IMPACT MEASUREMENT PORTFOLIO", "=".repeat(50), ""];
    for (const { module: m, fields } of modulesWithFields) {
      parts.push(`## ${m.title}`);
      for (const f of fields) {
        parts.push(`${f.label}:`);
        parts.push(progress.portfolio[f.id] || "(chưa điền)");
        parts.push("");
      }
    }
    parts.push("## Executive Report");
    parts.push(reportToText(progress.finalReport));
    try {
      await navigator.clipboard.writeText(parts.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="no-print flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Training Impact Measurement Portfolio</h1>
          <p className="mt-1 text-sm text-slate-600">
            {filledCount}/{totalFields} mục đã điền · Tiến độ khóa học: {coursePct}%
            {progress.selectedCase && (
              <> · Case: {progress.selectedCase === "sample" ? "Coaching Skills (sample)" : "Chương trình của bạn"}</>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copyAll}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-600"
          >
            {copied ? "✓ Đã copy" : "📋 Copy toàn bộ"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
          >
            🖨 Print / PDF
          </button>
        </div>
      </div>

      {filledCount === 0 && (
        <div className="no-print mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="font-semibold text-slate-700">Portfolio của bạn còn trống</p>
          <p className="mt-1 text-sm text-slate-500">
            Mỗi module trong khóa học sẽ thêm một phần vào đây thông qua các bước &ldquo;Add to Portfolio&rdquo;.
          </p>
          <Link
            href="/course/orientation"
            className="mt-4 inline-block rounded-md bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Bắt đầu từ Orientation
          </Link>
        </div>
      )}

      {modulesWithFields.map(({ module: m, fields }) => {
        const hasContent = fields.some((f) => (progress.portfolio[f.id] ?? "").trim() !== "");
        if (!hasContent) return null;
        return (
          <section key={m.id} className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">
              {m.id === "orientation" ? "Orientation" : `Module ${m.order}`} · {m.phase}
            </p>
            <h2 className="mt-0.5 font-bold text-slate-900">{m.title}</h2>
            <dl className="mt-3 space-y-3">
              {fields.map((f) => {
                const value = (progress.portfolio[f.id] ?? "").trim();
                if (!value) return null;
                return (
                  <div key={f.id}>
                    <dt className="text-sm font-semibold text-slate-700">{f.label}</dt>
                    <dd className="mt-0.5 whitespace-pre-line rounded-md bg-slate-50 p-3 text-sm text-slate-700">
                      {value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        );
      })}

      {progress.finalReport.programName.trim() !== "" && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-slate-900">Executive Report</h2>
          <ReportPreview report={progress.finalReport} />
        </section>
      )}

      <div className="no-print mt-8 rounded-lg bg-brand-50 p-4 text-sm text-brand-800">
        Hoàn thành đủ điều kiện? <Link href="/certificate" className="font-semibold underline">Nhận chứng chỉ của bạn →</Link>
      </div>
    </div>
  );
}
