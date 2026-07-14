"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import rawData from "@/data/training-impact-data.json";
import type { DashboardFilters, LearnerRecord } from "@/types/data";
import { ALL, EMPTY_FILTERS } from "@/types/data";
import { applyFilters, computeKpis, fmt, groupKpis, uniqueValues } from "@/lib/kpi";
import { buildInsights } from "@/lib/insights";
import ChartCard, { EmptyChart } from "@/components/dashboard/ChartCard";

const records = rawData as LearnerRecord[];

const BRAND = "#1e4f88";
const BRAND_LIGHT = "#7ba3d0";
const ACCENT = "#0d9488";
const SLATE = "#94a3b8";

const SHORT_NAMES: Record<string, string> = {
  "Coaching Skills for Frontline Managers": "Coaching Skills",
  "Data Literacy Fundamentals": "Data Literacy",
  "Customer Service Excellence": "Customer Service",
  "Safety Leadership in Operations": "Safety Leadership",
};
const short = (name: string) => SHORT_NAMES[name] ?? name;

const FILTER_DEFS: Array<{ key: keyof DashboardFilters; label: string; recordKey: keyof LearnerRecord }> = [
  { key: "program", label: "Training Program", recordKey: "trainingProgram" },
  { key: "department", label: "Department", recordKey: "department" },
  { key: "businessUnit", label: "Business Unit", recordKey: "businessUnit" },
  { key: "region", label: "Region", recordKey: "region" },
  { key: "quarter", label: "Time Period", recordKey: "quarter" },
  { key: "jobLevel", label: "Learner Group", recordKey: "jobLevel" },
  { key: "facilitator", label: "Facilitator", recordKey: "facilitator" },
  { key: "deliveryMethod", label: "Delivery Method", recordKey: "deliveryMethod" },
];

export default function DashboardView() {
  const [filters, setFilters] = useState<DashboardFilters>(EMPTY_FILTERS);

  const filtered = useMemo(() => applyFilters(records, filters), [filters]);
  const kpis = useMemo(() => computeKpis(filtered), [filtered]);

  const byProgram = useMemo(() => groupKpis(filtered, (r) => short(r.trainingProgram)), [filtered]);
  const byDepartment = useMemo(() => groupKpis(filtered, (r) => r.department), [filtered]);
  const byBU = useMemo(() => groupKpis(filtered, (r) => r.businessUnit), [filtered]);
  const byQuarter = useMemo(() => groupKpis(filtered, (r) => r.quarter), [filtered]);

  const insights = useMemo(() => {
    const kiByDept = byDepartment
      .filter((d) => d.kpis.knowledgeImprovementPct !== null)
      .map((d) => ({ group: d.group, value: d.kpis.knowledgeImprovementPct as number }));
    const best = kiByDept.length > 1 ? kiByDept.reduce((a, b) => (b.value > a.value ? b : a)) : undefined;

    const perfByRegion = groupKpis(filtered, (r) => r.region)
      .filter((d) => d.kpis.performanceImprovementPct !== null)
      .map((d) => ({ group: d.group, value: d.kpis.performanceImprovementPct as number }));
    const worst = perfByRegion.length > 1 ? perfByRegion.reduce((a, b) => (b.value < a.value ? b : a)) : undefined;

    return buildInsights(kpis, filters, { bestDepartmentKI: best, worstRegionPerf: worst });
  }, [kpis, filters, byDepartment, filtered]);

  const setFilter = (key: keyof DashboardFilters, value: string) =>
    setFilters((f) => ({ ...f, [key]: value }));
  const hasActiveFilter = Object.values(filters).some((v) => v !== ALL);

  /* chart datasets */
  const participationData = byProgram.map((g) => ({
    name: g.group,
    "Participation %": round(g.kpis.participationRate),
    "Completion %": round(g.kpis.completionRate),
  }));
  const prePostData = byProgram.map((g) => ({
    name: g.group,
    "Pre-test": round(g.kpis.preAvg),
    "Post-test": round(g.kpis.postAvg),
  }));
  const kiDeptData = byDepartment.map((g) => ({
    name: g.group,
    "Knowledge Improvement %": round(g.kpis.knowledgeImprovementPct),
  }));
  const applicationData = [
    { name: "30 ngày", "Application %": round(kpis.applicationRate30) },
    { name: "60 ngày", "Application %": round(kpis.applicationRate60) },
    { name: "90 ngày", "Application %": round(kpis.applicationRate90) },
  ];
  const perfBUData = byBU.map((g) => ({
    name: g.group.replace(" Division", "").replace(" Office", ""),
    "Performance Improvement %": round(g.kpis.performanceImprovementPct),
  }));
  const costData = byProgram.map((g) => ({
    name: g.group,
    "Cost per Learner $": round(g.kpis.costPerLearner, 0),
  }));
  const impactTrendData = byQuarter.map((g) => ({
    name: g.group,
    "Impact Value $K": Math.round(g.kpis.businessImpactValue / 1000),
  }));
  const kirkpatrickData = [
    { name: "L1 Relevance (/5)", value: achievement(kpis.relevanceAvg, 4.0), actual: fmt.num(kpis.relevanceAvg) },
    { name: "L2 Knowledge (+%)", value: achievement(kpis.knowledgeImprovementPct, 25), actual: fmt.pct(kpis.knowledgeImprovementPct) },
    { name: "L3 Application 90d", value: achievement(kpis.applicationRate90, 70), actual: fmt.pct(kpis.applicationRate90) },
    { name: "L4 Performance (+%)", value: achievement(kpis.performanceImprovementPct, 8), actual: fmt.pct(kpis.performanceImprovementPct) },
  ];

  const kpiCards = [
    { label: "Participation Rate", value: fmt.pct(kpis.participationRate), target: "≥90%", hint: "Attendees / Enrolled" },
    { label: "Completion Rate", value: fmt.pct(kpis.completionRate), target: "≥85%", hint: "Completed / Enrolled" },
    { label: "Knowledge Improvement", value: fmt.pct(kpis.knowledgeImprovementPct), target: "≥25%", hint: "(Post − Pre)/Pre, học viên đủ 2 bài test" },
    { label: "Application Rate (90d)", value: fmt.pct(kpis.applicationRate90), target: "≥70%", hint: "Thể hiện hành vi / Được đánh giá" },
    { label: "Performance Improvement", value: fmt.pct(kpis.performanceImprovementPct), target: "≥8%", hint: "(After − Before)/Before" },
    { label: "Cost per Learner", value: fmt.usd(kpis.costPerLearner), target: "≤$250", hint: "Tổng chi phí / Người tham dự" },
    { label: "Business Impact Value", value: fmt.usd(kpis.businessImpactValue), target: "Ước tính", hint: "Tổng giá trị ước tính (assumption-based)" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Learning Impact Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Dữ liệu thực hành: {records.length} học viên · 4 chương trình · 07/2025 – 03/2026. Mọi KPI tính theo công thức
          trong KPI Dictionary; học viên thiếu dữ liệu được loại khỏi mẫu số tương ứng.
        </p>
      </header>

      {/* filters */}
      <section aria-label="Bộ lọc" className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
          {FILTER_DEFS.map((def) => (
            <label key={def.key} className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">{def.label}</span>
              <select
                value={filters[def.key]}
                onChange={(e) => setFilter(def.key, e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-2 py-2 text-sm"
              >
                <option value={ALL}>Tất cả</option>
                {uniqueValues(records, def.recordKey).map((v) => (
                  <option key={v} value={v}>
                    {def.recordKey === "trainingProgram" ? short(v) : v}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            {filtered.length} / {records.length} học viên khớp bộ lọc
          </p>
          <button
            type="button"
            onClick={() => setFilters(EMPTY_FILTERS)}
            disabled={!hasActiveFilter}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-600 disabled:opacity-40"
          >
            ↺ Reset filters
          </button>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-lg font-semibold text-slate-700">Không có dữ liệu khớp với bộ lọc</p>
          <p className="mt-1 text-sm text-slate-500">Hãy nới lỏng một vài điều kiện hoặc bấm Reset filters.</p>
        </div>
      ) : (
        <>
          {/* KPI cards */}
          <section aria-label="KPI tổng quan" className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {kpiCards.map((c) => (
              <div key={c.label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm" title={c.hint}>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{c.label}</p>
                <p className="mt-1 text-xl font-bold text-brand-800">{c.value}</p>
                <p className="text-[11px] text-slate-400">Target: {c.target}</p>
              </div>
            ))}
          </section>

          {/* insight panel */}
          <section aria-label="Insight summary" className="mb-6 rounded-xl border border-accent-500/30 bg-accent-500/5 p-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent-600">💡 Insight Summary</h2>
            <ul className="mt-2 space-y-1.5">
              {insights.map((ins, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                  {ins}
                </li>
              ))}
            </ul>
          </section>

          {/* charts */}
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard
              title="1 · Tham dự cao nhưng hoàn thành có khoảng cách — theo dõi khoảng rơi rụng ở từng chương trình"
              subtitle="Participation & Completion rate (%) theo chương trình"
            >
              {participationData.length === 0 ? <EmptyChart /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={participationData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="Participation %" fill={BRAND} radius={[3, 3, 0, 0]} />
                    <Bar dataKey="Completion %" fill={ACCENT} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard
              title="2 · Mọi chương trình đều tạo mức tăng kiến thức rõ rệt so với baseline"
              subtitle="Điểm pre-test vs post-test trung bình (0–100), học viên có đủ cả hai bài"
            >
              {prePostData.length === 0 ? <EmptyChart /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={prePostData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="Pre-test" fill={BRAND_LIGHT} radius={[3, 3, 0, 0]} />
                    <Bar dataKey="Post-test" fill={BRAND} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard
              title="3 · Mức tăng kiến thức tương đối đồng đều giữa các phòng ban"
              subtitle="Knowledge Improvement % theo Department"
            >
              {kiDeptData.length === 0 ? <EmptyChart /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={kiDeptData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={100} />
                    <Tooltip />
                    <Bar dataKey="Knowledge Improvement %" fill={BRAND} radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard
              title="4 · Tỷ lệ áp dụng hành vi tăng dần qua 90 ngày — hành vi đang bám rễ"
              subtitle="Application Rate (%) tại 30 / 60 / 90 ngày (trên học viên được đánh giá tại từng mốc)"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationData} margin={{ top: 10, right: 20, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="Application %"
                    stroke={ACCENT}
                    strokeWidth={3}
                    dot={{ r: 5, fill: ACCENT }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard
              title="5 · Cải thiện hiệu suất khác nhau giữa các khối kinh doanh"
              subtitle="Performance Improvement % theo Business Unit (đọc theo hướng contribution)"
            >
              {perfBUData.length === 0 ? <EmptyChart /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={perfBUData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="Performance Improvement %" fill={BRAND} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard
              title="6 · Chi phí mỗi học viên chênh lệch giữa các chương trình"
              subtitle="Training Cost per Learner (USD) theo chương trình"
            >
              {costData.length === 0 ? <EmptyChart /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="Cost per Learner $" fill={SLATE} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard
              title="7 · Giá trị tác động ước tính tích lũy theo quý"
              subtitle="Business Impact Value ($K, ước tính assumption-based) theo quý đào tạo"
            >
              {impactTrendData.length === 0 ? <EmptyChart /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={impactTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="Impact Value $K" stroke={BRAND} strokeWidth={3} dot={{ r: 4, fill: BRAND }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard
              title="8 · Cả 4 cấp độ Kirkpatrick đều tiến gần hoặc vượt target"
              subtitle="% đạt target của KPI đại diện từng cấp độ (100% = đúng target; giá trị thật trong tooltip)"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kirkpatrickData} layout="vertical" margin={{ top: 5, right: 25, left: 55, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 150]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={120} />
                  <Tooltip
                    formatter={(value, _name, item) => [
                      `${Number(value).toFixed(0)}% of target (thực tế: ${(item?.payload as { actual?: string })?.actual ?? ""})`,
                      "Đạt target",
                    ]}
                  />
                  <Bar dataKey="value" fill={ACCENT} radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <p className="mt-6 rounded-lg bg-slate-100 p-4 text-xs leading-relaxed text-slate-600">
            <strong>Giới hạn dữ liệu:</strong> Application rate dựa một phần trên self-report; Business Impact Value là
            ước tính dựa trên giả định vận hành; không có control group ngẫu nhiên — các kết quả nên đọc theo hướng
            <em> contribution</em> (đóng góp), không phải <em>attribution</em> (nguyên nhân duy nhất). Học viên thiếu dữ
            liệu được loại khỏi mẫu số của KPI tương ứng.
          </p>
        </>
      )}
    </div>
  );
}

function round(v: number | null, digits = 1): number | null {
  if (v === null) return null;
  const f = 10 ** digits;
  return Math.round(v * f) / f;
}

function achievement(value: number | null, target: number): number {
  if (value === null || target === 0) return 0;
  return Math.min(150, Math.round((value / target) * 100));
}
