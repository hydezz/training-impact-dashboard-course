import type { KpiSummary } from "@/lib/kpi";
import type { DashboardFilters } from "@/types/data";
import { ALL } from "@/types/data";
import { fmt } from "@/lib/kpi";

/** Rule-based insight sentences that react to the current filter selection. */
export function buildInsights(
  kpis: KpiSummary,
  filters: DashboardFilters,
  groupHighlights: {
    bestDepartmentKI?: { group: string; value: number };
    worstRegionPerf?: { group: string; value: number };
  }
): string[] {
  const scope: string[] = [];
  if (filters.program !== ALL) scope.push(filters.program);
  if (filters.region !== ALL) scope.push(`khu vực ${filters.region}`);
  if (filters.department !== ALL) scope.push(`phòng ${filters.department}`);
  if (filters.quarter !== ALL) scope.push(filters.quarter);
  const scopeLabel = scope.length > 0 ? scope.join(", ") : "toàn bộ 4 chương trình";

  const out: string[] = [];

  if (kpis.enrolled === 0) {
    return ["Không có dữ liệu khớp với bộ lọc hiện tại. Hãy nới lỏng hoặc reset bộ lọc."];
  }

  out.push(
    `Phạm vi hiện tại: ${scopeLabel} — ${kpis.enrolled} học viên đăng ký, ${fmt.pct(kpis.participationRate)} tham dự và ${fmt.pct(kpis.completionRate)} hoàn thành.`
  );

  if (kpis.knowledgeImprovementPct !== null && kpis.preAvg !== null && kpis.postAvg !== null) {
    out.push(
      `Kiến thức tăng từ ${fmt.num(kpis.preAvg, 0)} lên ${fmt.num(kpis.postAvg, 0)} điểm (+${fmt.pct(kpis.knowledgeImprovementPct)}), tính trên học viên có đủ cả pre-test và post-test.`
    );
  }

  if (kpis.applicationRate30 !== null && kpis.applicationRate90 !== null) {
    const trend =
      kpis.applicationRate90 > kpis.applicationRate30
        ? "tăng dần — hành vi đang bám rễ thay vì phai dần"
        : kpis.applicationRate90 < kpis.applicationRate30
          ? "giảm dần — cần can thiệp duy trì hành vi"
          : "ổn định qua các mốc đo";
    out.push(
      `Tỷ lệ áp dụng đạt ${fmt.pct(kpis.applicationRate30)} (30 ngày) → ${fmt.pct(kpis.applicationRate90)} (90 ngày): ${trend}.`
    );
  }

  if (kpis.performanceImprovementPct !== null) {
    out.push(
      `Hiệu suất công việc cải thiện ${fmt.pct(kpis.performanceImprovementPct)} so với trước đào tạo. Lưu ý: kết quả này gắn với chương trình nhưng còn chịu tác động của các yếu tố khác — đọc theo hướng đóng góp (contribution), không phải nguyên nhân duy nhất.`
    );
  }

  if (groupHighlights.bestDepartmentKI) {
    out.push(
      `Phòng ${groupHighlights.bestDepartmentKI.group} có mức tăng kiến thức cao nhất (${fmt.pct(groupHighlights.bestDepartmentKI.value)}).`
    );
  }
  if (groupHighlights.worstRegionPerf) {
    out.push(
      `Khu vực ${groupHighlights.worstRegionPerf.group} có mức cải thiện hiệu suất thấp nhất (${fmt.pct(groupHighlights.worstRegionPerf.value)}) — ứng viên cho phân tích rào cản và manager enablement.`
    );
  }

  if (kpis.costPerLearner !== null) {
    out.push(
      `Chi phí bình quân ${fmt.usd(kpis.costPerLearner)}/học viên; tổng giá trị tác động ước tính ${fmt.usd(kpis.businessImpactValue)} (ước lượng dựa trên giả định vận hành, không phải số liệu kế toán).`
    );
  }

  return out;
}
