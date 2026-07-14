import type { ReactNode } from "react";

export function TipBox({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-accent-500/30 bg-accent-500/5 p-4 text-sm text-slate-700">
      <p className="mb-1 font-semibold text-accent-600">💡 Mẹo</p>
      {children}
    </div>
  );
}

export function WarningBox({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-soft p-4 text-sm text-slate-800">
      <p className="mb-1 font-semibold text-amber-800">⚠ Lưu ý</p>
      {children}
    </div>
  );
}

export function TakeawayBox({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg bg-brand-800 p-4 text-sm text-white">
      <p className="mb-1 font-semibold text-brand-200">🔑 Key takeaway</p>
      {children}
    </div>
  );
}

export function ExampleBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-brand-200 bg-brand-50 p-4 text-sm text-slate-700">
      <p className="mb-2 font-semibold text-brand-800">📋 {title}</p>
      {children}
    </div>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Tiến độ"}
      className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
    >
      <div className="h-full rounded-full bg-accent-500 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}
