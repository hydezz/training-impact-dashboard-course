"use client";

import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import type { ExecutiveReport } from "@/types/progress";
import { SAMPLE_REPORT, buildMasterPrompt, reportToText } from "@/lib/report";

const FIELDS: Array<{ key: keyof ExecutiveReport; label: string; rows: number }> = [
  { key: "programName", label: "Program name", rows: 1 },
  { key: "businessObjective", label: "Business objective", rows: 2 },
  { key: "learnerPopulation", label: "Learner population", rows: 1 },
  { key: "measurementPeriod", label: "Measurement period", rows: 1 },
  { key: "keyResults", label: "Key KPI results", rows: 3 },
  { key: "level1Insight", label: "Level 1 insight (Reaction)", rows: 2 },
  { key: "level2Insight", label: "Level 2 insight (Learning)", rows: 2 },
  { key: "level3Insight", label: "Level 3 insight (Behavior)", rows: 2 },
  { key: "level4Insight", label: "Level 4 insight (Results)", rows: 2 },
  { key: "businessInterpretation", label: "Business interpretation", rows: 3 },
  { key: "dataLimitations", label: "Data limitations", rows: 3 },
  { key: "recommendations", label: "Action recommendations (kèm owner)", rows: 3 },
  { key: "nextSteps", label: "Next measurement step", rows: 2 },
];

export default function ReportBuilder() {
  const { progress, setReport } = useProgress();
  const report = progress.finalReport;
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [copied, setCopied] = useState<"report" | "prompt" | null>(null);

  const setField = (key: keyof ExecutiveReport, value: string) => {
    setReport({ ...report, [key]: value });
  };

  const copy = async (kind: "report" | "prompt") => {
    const text = kind === "report" ? reportToText(report) : buildMasterPrompt(report);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      window.prompt("Copy thủ công đoạn text sau:", text);
    }
  };

  return (
    <div>
      <div className="no-print mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setView("edit")}
          aria-pressed={view === "edit"}
          className={`rounded-md px-4 py-2 text-sm font-semibold ${
            view === "edit" ? "bg-brand-700 text-white" : "border border-slate-300 bg-white text-slate-700"
          }`}
        >
          ✏️ Edit
        </button>
        <button
          type="button"
          onClick={() => setView("preview")}
          aria-pressed={view === "preview"}
          className={`rounded-md px-4 py-2 text-sm font-semibold ${
            view === "preview" ? "bg-brand-700 text-white" : "border border-slate-300 bg-white text-slate-700"
          }`}
        >
          👁 Preview
        </button>
        <button
          type="button"
          onClick={() => setReport({ ...SAMPLE_REPORT })}
          className="rounded-md border border-accent-500 bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-600"
        >
          Điền mẫu từ sample case
        </button>
        <button
          type="button"
          onClick={() => copy("report")}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-600"
        >
          {copied === "report" ? "✓ Đã copy" : "📄 Copy report"}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-600"
        >
          🖨 Print / Save PDF
        </button>
        <button
          type="button"
          onClick={() => copy("prompt")}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-600"
        >
          {copied === "prompt" ? "✓ Đã copy" : "🤖 Copy Master Prompt cho Claude"}
        </button>
      </div>

      {view === "edit" ? (
        <div className="no-print grid gap-4 md:grid-cols-2">
          {FIELDS.map((f) => (
            <label key={f.key} className={`block ${f.rows >= 3 ? "md:col-span-2" : ""}`}>
              <span className="mb-1 block text-sm font-semibold text-slate-700">{f.label}</span>
              <textarea
                value={report[f.key]}
                onChange={(e) => setField(f.key, e.target.value)}
                rows={f.rows}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
          ))}
        </div>
      ) : (
        <ReportPreview report={report} />
      )}
    </div>
  );
}

export function ReportPreview({ report }: { report: ExecutiveReport }) {
  const Section = ({ title, body }: { title: string; body: string }) => (
    <section className="mt-4">
      <h3 className="text-sm font-bold uppercase tracking-wide text-brand-800">{title}</h3>
      <p className="mt-1 whitespace-pre-line text-sm text-slate-700">{body || "—"}</p>
    </section>
  );

  return (
    <article className="print-page rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <header className="border-b border-slate-200 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">Executive Training Impact Report</p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">{report.programName || "Chưa đặt tên chương trình"}</h2>
        <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm text-slate-600 sm:grid-cols-2">
          <div>
            <dt className="inline font-semibold">Học viên: </dt>
            <dd className="inline">{report.learnerPopulation || "—"}</dd>
          </div>
          <div>
            <dt className="inline font-semibold">Kỳ đo lường: </dt>
            <dd className="inline">{report.measurementPeriod || "—"}</dd>
          </div>
        </dl>
      </header>
      <Section title="Business objective" body={report.businessObjective} />
      <Section title="What happened — Key results" body={report.keyResults} />
      <section className="mt-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-brand-800">Insights by Kirkpatrick level</h3>
        <ul className="mt-1 space-y-1.5 text-sm text-slate-700">
          <li><strong>L1 Reaction:</strong> {report.level1Insight || "—"}</li>
          <li><strong>L2 Learning:</strong> {report.level2Insight || "—"}</li>
          <li><strong>L3 Behavior:</strong> {report.level3Insight || "—"}</li>
          <li><strong>L4 Results:</strong> {report.level4Insight || "—"}</li>
        </ul>
      </section>
      <Section title="Why it matters — Business interpretation" body={report.businessInterpretation} />
      <Section title="Data limitations" body={report.dataLimitations} />
      <Section title="What we should do next — Recommendations" body={report.recommendations} />
      <Section title="Next measurement step" body={report.nextSteps} />
    </article>
  );
}
