"use client";

import Link from "next/link";
import { courseModules, totalCourseMinutes } from "@/data/course";
import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "@/components/shared/Boxes";

export default function CourseOverviewPage() {
  const { progress, loaded, coursePct, completedMinutes, remainingMinutes, modulePct, resetProgress, totalScore } =
    useProgress();

  const nextModule =
    courseModules.find((m) => m.steps.some((s) => !progress.completedSteps.includes(s.id))) ?? null;
  const moduleHref = (id: string) => (id === "orientation" ? "/course/orientation" : `/course/module/${id}`);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Khóa học của bạn</h1>
      <p className="mt-1 text-sm text-slate-600">
        Measure Training Impact with Kirkpatrick, Excel and AI · {totalCourseMinutes} phút
      </p>

      {loaded && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Tiến độ tổng: {coursePct}% · Đã học ~{completedMinutes} phút · Còn lại ~{remainingMinutes} phút
              </p>
              {totalScore.total > 0 && (
                <p className="mt-0.5 text-xs text-slate-500">
                  Điểm knowledge checks: {totalScore.correct}/{totalScore.total} ({totalScore.pct}%) — cần ≥70% để nhận
                  chứng chỉ
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {nextModule && (
                <Link
                  href={moduleHref(nextModule.id)}
                  className="rounded-md bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
                >
                  ⏵ Continue Learning
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Xóa toàn bộ tiến độ, portfolio và điểm số? Hành động này không hoàn tác được.")) {
                    resetProgress();
                  }
                }}
                className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:border-red-400 hover:text-red-600"
              >
                Reset progress
              </button>
            </div>
          </div>
          <div className="mt-3">
            <ProgressBar value={coursePct} label="Tiến độ khóa học" />
          </div>
        </div>
      )}

      <ol className="mt-6 space-y-3">
        {courseModules.map((m) => {
          const pct = modulePct(m.id);
          return (
            <li key={m.id}>
              <Link
                href={moduleHref(m.id)}
                className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-brand-600"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
                      {m.id === "orientation" ? "Orientation" : `Module ${m.order}`} · {m.phase} · {m.minutes} phút ·{" "}
                      {m.steps.length} steps
                    </p>
                    <h2 className="mt-0.5 truncate font-semibold text-slate-900">{m.title}</h2>
                    <p className="truncate text-sm text-slate-500">{m.titleVi}</p>
                  </div>
                  <div className="w-24 shrink-0 text-right">
                    <span
                      className={`text-sm font-bold ${pct === 100 ? "text-accent-600" : "text-slate-500"}`}
                    >
                      {pct === 100 ? "✓ Xong" : `${pct}%`}
                    </span>
                    <div className="mt-1">
                      <ProgressBar value={pct} label={`Tiến độ ${m.title}`} />
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
