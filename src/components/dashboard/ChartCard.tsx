import type { ReactNode } from "react";

export default function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold leading-snug text-slate-800">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
      <div className="mt-3 h-64">{children}</div>
    </section>
  );
}

export function EmptyChart() {
  return (
    <div className="grid h-full place-items-center rounded-lg bg-slate-50 text-sm text-slate-400">
      Không có dữ liệu với bộ lọc hiện tại
    </div>
  );
}
