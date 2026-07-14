"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CourseModule } from "@/types/course";
import { courseModules } from "@/data/course";
import { useProgress } from "@/hooks/useProgress";
import ActivityRunner from "@/components/activities/ActivityRunner";
import Visual from "@/components/course/Visuals";
import PortfolioFields from "@/components/course/PortfolioFields";
import CaseSetup from "@/components/course/CaseSetup";
import ReportBuilder from "@/components/course/ReportBuilder";
import WorkbookDownload from "@/components/shared/WorkbookDownload";
import { ExampleBox, ProgressBar, TakeawayBox, TipBox, WarningBox } from "@/components/shared/Boxes";

const KIND_LABEL: Record<string, string> = {
  learn: "Learn",
  example: "See an Example",
  activity: "Try It",
  check: "Check",
  portfolio: "Add to Portfolio",
};

export default function ModulePlayer({ module: mod }: { module: CourseModule }) {
  const { progress, loaded, completeStep, recordQuiz, modulePct } = useProgress();
  const [stepIdx, setStepIdx] = useState(0);
  const step = mod.steps[stepIdx];

  // resume at first incomplete step once progress loads
  useEffect(() => {
    if (!loaded) return;
    const firstIncomplete = mod.steps.findIndex((s) => !progress.completedSteps.includes(s.id));
    if (firstIncomplete > 0) setStepIdx(firstIncomplete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, mod.id]);

  const [activityDone, setActivityDone] = useState<Record<string, boolean>>({});

  const stepCompleted = progress.completedSteps.includes(step.id);
  const needsActivity = Boolean(step.activity);
  const activityFinished = activityDone[step.id] || stepCompleted;
  const canAdvance = !needsActivity || activityFinished;

  const moduleIdx = courseModules.findIndex((m) => m.id === mod.id);
  const prevModule = moduleIdx > 0 ? courseModules[moduleIdx - 1] : null;
  const nextModule = moduleIdx < courseModules.length - 1 ? courseModules[moduleIdx + 1] : null;

  const moduleHref = (m: CourseModule) => (m.id === "orientation" ? "/course/orientation" : `/course/module/${m.id}`);

  const markDoneAndNext = () => {
    completeStep(step.id);
    if (stepIdx < mod.steps.length - 1) {
      setStepIdx(stepIdx + 1);
      window.scrollTo({ top: 0 });
    }
  };

  const isLastStep = stepIdx === mod.steps.length - 1;
  const doneMinutes = useMemo(
    () => mod.steps.slice(0, stepIdx).reduce((s, x) => s + x.minutes, 0),
    [mod.steps, stepIdx]
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* module header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-600">
          {mod.id === "orientation" ? "Orientation" : `Module ${mod.order}`} · Phase: {mod.phase} · {mod.minutes} phút
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">{mod.title}</h1>
        <p className="text-sm text-slate-500">{mod.titleVi}</p>
        <div className="mt-3 flex items-center gap-3">
          <ProgressBar value={modulePct(mod.id)} label={`Tiến độ ${mod.title}`} />
          <span className="shrink-0 text-xs font-medium text-slate-500">{modulePct(mod.id)}%</span>
        </div>
      </div>

      {/* step progress */}
      <nav aria-label="Các bước trong module" className="mb-6 flex flex-wrap gap-1.5">
        {mod.steps.map((s, i) => {
          const done = progress.completedSteps.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStepIdx(i)}
              aria-current={i === stepIdx ? "step" : undefined}
              title={s.title}
              className={`h-9 min-w-9 rounded-md px-2 text-xs font-semibold ${
                i === stepIdx
                  ? "bg-brand-700 text-white"
                  : done
                    ? "bg-accent-500/15 text-accent-600"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {done && i !== stepIdx ? "✓" : i + 1}
            </button>
          );
        })}
      </nav>

      {/* step card */}
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-bold uppercase tracking-widest text-accent-600">
          {KIND_LABEL[step.kind]} · Step {stepIdx + 1}/{mod.steps.length} · ~{step.minutes} phút
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">{step.title}</h2>
        <p className="mt-1 text-sm italic text-slate-500">🎯 {step.objective}</p>

        <div className="mt-4 space-y-3">
          {step.content.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-slate-700">
              {p}
            </p>
          ))}
        </div>

        {step.bullets && (
          <ul className="mt-4 space-y-1.5">
            {step.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-[15px] text-slate-700">
                <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                {b}
              </li>
            ))}
          </ul>
        )}

        {step.visual && (
          <div className="mt-5 rounded-lg bg-slate-50 p-4">
            <Visual keyName={step.visual} />
          </div>
        )}

        {step.example && (
          <div className="mt-5">
            <ExampleBox title={step.example.title}>
              <div className="space-y-2">
                {step.example.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </ExampleBox>
          </div>
        )}

        {step.tip && (
          <div className="mt-4">
            <TipBox>
              <p>{step.tip}</p>
            </TipBox>
          </div>
        )}

        {step.warning && (
          <div className="mt-4">
            <WarningBox>
              <p>{step.warning}</p>
            </WarningBox>
          </div>
        )}

        {step.special === "case-setup" && (
          <div className="mt-5">
            <CaseSetup />
          </div>
        )}

        {step.special === "workbook-download" && (
          <div className="mt-5">
            <WorkbookDownload />
          </div>
        )}

        {step.special === "report-builder" && (
          <div className="mt-5">
            <ReportBuilder />
          </div>
        )}

        {step.activity && (
          <div className="mt-6 rounded-lg border border-brand-200 bg-brand-50/50 p-4 sm:p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-700">
              {step.kind === "check" ? "Knowledge check (tính điểm)" : "Hoạt động bắt buộc"}
            </p>
            <ActivityRunner
              key={step.id}
              activity={step.activity}
              onComplete={(score) => {
                setActivityDone((d) => ({ ...d, [step.id]: true }));
                if (step.scored) recordQuiz(step.id, score);
              }}
            />
          </div>
        )}

        {step.portfolioFields && !step.special && (
          <div className="mt-6 rounded-lg border border-accent-500/30 bg-accent-500/5 p-4 sm:p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent-600">
              📁 Thêm vào Portfolio của bạn
            </p>
            <PortfolioFields fields={step.portfolioFields} />
          </div>
        )}

        {step.special === "case-setup" && step.portfolioFields && (
          <div className="mt-5 rounded-lg border border-accent-500/30 bg-accent-500/5 p-4 sm:p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent-600">📁 Thông tin case của bạn</p>
            <PortfolioFields fields={step.portfolioFields} />
          </div>
        )}

        <div className="mt-6">
          <TakeawayBox>
            <p>{step.takeaway}</p>
          </TakeawayBox>
        </div>
      </article>

      {/* navigation */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {stepIdx > 0 ? (
          <button
            type="button"
            onClick={() => {
              setStepIdx(stepIdx - 1);
              window.scrollTo({ top: 0 });
            }}
            className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-600"
          >
            ← Previous
          </button>
        ) : prevModule ? (
          <Link
            href={moduleHref(prevModule)}
            className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-600"
          >
            ← {prevModule.id === "orientation" ? "Orientation" : `Module ${prevModule.order}`}
          </Link>
        ) : (
          <span />
        )}

        {!isLastStep ? (
          <button
            type="button"
            onClick={markDoneAndNext}
            disabled={!canAdvance}
            className="rounded-md bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {canAdvance ? "Next →" : "Hoàn thành hoạt động để tiếp tục"}
          </button>
        ) : nextModule ? (
          <Link
            href={moduleHref(nextModule)}
            onClick={() => completeStep(step.id)}
            aria-disabled={!canAdvance}
            className={`rounded-md bg-accent-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-500 ${
              !canAdvance ? "pointer-events-none opacity-40" : ""
            }`}
          >
            Hoàn thành → {nextModule.id === "orientation" ? "Orientation" : `Module ${nextModule.order}`}
          </Link>
        ) : (
          <Link
            href="/portfolio"
            onClick={() => completeStep(step.id)}
            aria-disabled={!canAdvance}
            className={`rounded-md bg-accent-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-500 ${
              !canAdvance ? "pointer-events-none opacity-40" : ""
            }`}
          >
            🎉 Hoàn thành khóa học → Xem Portfolio
          </Link>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-slate-400">
        Đã học ~{doneMinutes}/{mod.minutes} phút trong module này
      </p>
    </div>
  );
}
