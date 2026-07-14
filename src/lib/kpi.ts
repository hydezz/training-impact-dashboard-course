import type { DashboardFilters, LearnerRecord } from "@/types/data";
import { ALL } from "@/types/data";

/** Average of non-null values; null when nothing to average (avoids divide-by-zero). */
export function avg(values: Array<number | null>): number | null {
  const nums = values.filter((v): v is number => v !== null && !Number.isNaN(v));
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function pct(numerator: number, denominator: number): number | null {
  if (denominator === 0) return null;
  return (numerator / denominator) * 100;
}

export function applyFilters(records: LearnerRecord[], f: DashboardFilters): LearnerRecord[] {
  return records.filter(
    (r) =>
      (f.program === ALL || r.trainingProgram === f.program) &&
      (f.department === ALL || r.department === f.department) &&
      (f.businessUnit === ALL || r.businessUnit === f.businessUnit) &&
      (f.region === ALL || r.region === f.region) &&
      (f.quarter === ALL || r.quarter === f.quarter) &&
      (f.jobLevel === ALL || r.jobLevel === f.jobLevel) &&
      (f.facilitator === ALL || r.facilitator === f.facilitator) &&
      (f.deliveryMethod === ALL || r.deliveryMethod === f.deliveryMethod)
  );
}

export interface KpiSummary {
  enrolled: number;
  attended: number;
  completed: number;
  participationRate: number | null;
  completionRate: number | null;
  /** Average post − average pre, computed only on records having both. */
  knowledgeImprovementPts: number | null;
  knowledgeImprovementPct: number | null;
  preAvg: number | null;
  postAvg: number | null;
  /** Share demonstrating the behavior at 90 days among those assessed at 90 days. */
  applicationRate30: number | null;
  applicationRate60: number | null;
  applicationRate90: number | null;
  performanceImprovementPct: number | null;
  perfBeforeAvg: number | null;
  perfAfterAvg: number | null;
  costPerLearner: number | null;
  totalCost: number;
  /** Sum of estimated business impact values (assumption-based estimate). */
  businessImpactValue: number;
  satisfactionAvg: number | null;
  relevanceAvg: number | null;
  managerSupportAvg: number | null;
  managerObservationAvg: number | null;
}

function applicationRate(records: LearnerRecord[], key: "applied30" | "applied60" | "applied90"): number | null {
  const assessed = records.filter((r) => r[key] !== null);
  if (assessed.length === 0) return null;
  return pct(assessed.filter((r) => r[key] === true).length, assessed.length);
}

export function computeKpis(records: LearnerRecord[]): KpiSummary {
  const enrolled = records.length;
  const attended = records.filter((r) => r.attended).length;
  const completed = records.filter((r) => r.completed).length;

  // Knowledge improvement: only records with BOTH pre and post.
  const withBoth = records.filter((r) => r.preTest !== null && r.postTest !== null);
  const preAvg = avg(withBoth.map((r) => r.preTest));
  const postAvg = avg(withBoth.map((r) => r.postTest));
  const kiPts = preAvg !== null && postAvg !== null ? postAvg - preAvg : null;
  const kiPct = preAvg !== null && postAvg !== null && preAvg > 0 ? ((postAvg - preAvg) / preAvg) * 100 : null;

  const withPerf = records.filter((r) => r.performanceBefore !== null && r.performanceAfter !== null);
  const perfBefore = avg(withPerf.map((r) => r.performanceBefore));
  const perfAfter = avg(withPerf.map((r) => r.performanceAfter));
  const perfPct =
    perfBefore !== null && perfAfter !== null && perfBefore > 0
      ? ((perfAfter - perfBefore) / perfBefore) * 100
      : null;

  const participants = records.filter((r) => r.attended);
  const totalCost = participants.reduce((s, r) => s + r.trainingCost, 0);

  return {
    enrolled,
    attended,
    completed,
    participationRate: pct(attended, enrolled),
    completionRate: pct(completed, enrolled),
    knowledgeImprovementPts: kiPts,
    knowledgeImprovementPct: kiPct,
    preAvg,
    postAvg,
    applicationRate30: applicationRate(records, "applied30"),
    applicationRate60: applicationRate(records, "applied60"),
    applicationRate90: applicationRate(records, "applied90"),
    performanceImprovementPct: perfPct,
    perfBeforeAvg: perfBefore,
    perfAfterAvg: perfAfter,
    costPerLearner: participants.length > 0 ? totalCost / participants.length : null,
    totalCost,
    businessImpactValue: records.reduce((s, r) => s + (r.businessImpactValue ?? 0), 0),
    satisfactionAvg: avg(records.map((r) => r.satisfaction)),
    relevanceAvg: avg(records.map((r) => r.relevance)),
    managerSupportAvg: avg(records.map((r) => r.managerSupport)),
    managerObservationAvg: avg(records.map((r) => r.managerObservation)),
  };
}

/** Group records by a key and compute KPIs per group, sorted by group name. */
export function groupKpis(
  records: LearnerRecord[],
  keyFn: (r: LearnerRecord) => string
): Array<{ group: string; kpis: KpiSummary }> {
  const map = new Map<string, LearnerRecord[]>();
  for (const r of records) {
    const k = keyFn(r);
    const arr = map.get(k);
    if (arr) arr.push(r);
    else map.set(k, [r]);
  }
  return [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([group, recs]) => ({ group, kpis: computeKpis(recs) }));
}

export function uniqueValues(records: LearnerRecord[], key: keyof LearnerRecord): string[] {
  return [...new Set(records.map((r) => String(r[key])))].sort();
}

export const fmt = {
  pct: (v: number | null, digits = 1) => (v === null ? "—" : `${v.toFixed(digits)}%`),
  num: (v: number | null, digits = 1) => (v === null ? "—" : v.toFixed(digits)),
  int: (v: number | null) => (v === null ? "—" : Math.round(v).toLocaleString("en-US")),
  usd: (v: number | null) => (v === null ? "—" : `$${Math.round(v).toLocaleString("en-US")}`),
};
