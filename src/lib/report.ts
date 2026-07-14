import type { ExecutiveReport } from "@/types/progress";

export const SAMPLE_REPORT: ExecutiveReport = {
  programName: "Coaching Skills for Frontline Managers",
  businessObjective:
    "Cải thiện chất lượng coaching hàng tháng để tăng hiệu suất đội và giảm turnover nhóm frontline.",
  learnerPopulation: "120 Frontline Managers thuộc 3 miền (North, Central, South).",
  measurementPeriod: "Tháng 7/2025 – Tháng 3/2026 (đo hành vi tại 30/60/90 ngày sau đào tạo).",
  keyResults:
    "Participation 92% · Completion 87% · Knowledge Improvement +38% · Application Rate 74% tại 90 ngày (target 70%) · Performance Improvement +8.4% ở đội của quản lý áp dụng coaching · Cost per Learner $221.",
  level1Insight:
    "Relevance 4.1/5 và confidence tăng từ 2.9 lên 3.9 — chương trình được đánh giá sát thực tế công việc quản lý.",
  level2Insight:
    "Điểm kiến thức tăng từ 57 lên 79 (+38%), đồng đều giữa các miền — khóa học truyền tải hiệu quả ở mọi khu vực.",
  level3Insight:
    "Application rate tăng dần 66% → 74% qua 90 ngày. Nơi Manager Support ≥4/5, tỷ lệ áp dụng cao hơn ~18 điểm — sự ủng hộ của cấp trên là đòn bẩy transfer mạnh nhất.",
  level4Insight:
    "Hiệu suất đội tăng 8.4% ở nhóm quản lý áp dụng coaching, so với 2.1% ở nhóm chưa áp dụng. Giá trị tác động ước tính ~$180K (dựa trên giả định vận hành đã ghi chú).",
  dataLimitations:
    "Application dựa một phần trên self-report (85% được đối chiếu coaching log); không có control group ngẫu nhiên; Q4 trùng mùa cao điểm và chính sách thưởng mới — kết quả đọc theo hướng đóng góp, không quy toàn bộ cho đào tạo.",
  businessInterpretation:
    "Chuỗi bằng chứng nhất quán từ học tập → hành vi → hiệu suất cho thấy chương trình đang đóng góp thực vào cải thiện vận hành, đặc biệt ở các khu vực có manager support cao.",
  recommendations:
    "1) Triển khai manager-enablement briefing tại các khu vực có support thấp — Owner: Regional HRBP, trong 30 ngày. 2) Đưa coaching frequency vào agenda operations review hàng tháng — Owner: Operations Director, từ quý tới. 3) Chuẩn bị phương án nhân rộng cho 300 quản lý cấp tiếp theo sau khi xác nhận kết quả 6 tháng — Owner: L&D Manager.",
  nextSteps:
    "Đo lại tại mốc 6 tháng (behavior consistency + team retention); kết quả sẽ hỗ trợ quyết định nhân rộng chương trình trong kế hoạch ngân sách 2027.",
};

export function reportToText(r: ExecutiveReport): string {
  return `EXECUTIVE TRAINING IMPACT REPORT
${"=".repeat(50)}

PROGRAM: ${r.programName}
OBJECTIVE: ${r.businessObjective}
LEARNERS: ${r.learnerPopulation}
MEASUREMENT PERIOD: ${r.measurementPeriod}

WHAT HAPPENED — KEY RESULTS
${r.keyResults}

INSIGHTS BY KIRKPATRICK LEVEL
• Level 1 (Reaction): ${r.level1Insight}
• Level 2 (Learning): ${r.level2Insight}
• Level 3 (Behavior): ${r.level3Insight}
• Level 4 (Results): ${r.level4Insight}

WHY IT MATTERS — BUSINESS INTERPRETATION
${r.businessInterpretation}

DATA LIMITATIONS
${r.dataLimitations}

WHAT WE SHOULD DO NEXT — RECOMMENDATIONS
${r.recommendations}

NEXT MEASUREMENT STEP
${r.nextSteps}`;
}

export function buildMasterPrompt(r: ExecutiveReport): string {
  return `Bạn là learning analytics partner của tôi. Chúng ta sẽ tiếp tục hoàn thiện phân tích tác động của một chương trình đào tạo theo Kirkpatrick.

BỐI CẢNH
- Chương trình: ${r.programName || "[TÊN CHƯƠNG TRÌNH]"}
- Mục tiêu kinh doanh: ${r.businessObjective || "[MỤC TIÊU]"}
- Học viên: ${r.learnerPopulation || "[ĐỐI TƯỢNG]"}
- Kỳ đo lường: ${r.measurementPeriod || "[GIAI ĐOẠN]"}

KẾT QUẢ CHÍNH
${r.keyResults || "[KẾT QUẢ KPI]"}

INSIGHT THEO CẤP ĐỘ
- Level 1: ${r.level1Insight || "[...]"}
- Level 2: ${r.level2Insight || "[...]"}
- Level 3: ${r.level3Insight || "[...]"}
- Level 4: ${r.level4Insight || "[...]"}

DIỄN GIẢI HIỆN TẠI
${r.businessInterpretation || "[DIỄN GIẢI]"}

GIỚI HẠN ĐÃ BIẾT
${r.dataLimitations || "[GIỚI HẠN]"}

KHUYẾN NGHỊ DỰ KIẾN
${r.recommendations || "[KHUYẾN NGHỊ]"}

Nhiệm vụ của bạn:
1) Chất vấn cách diễn giải của tôi — tìm lỗ hổng logic và tuyên bố nhân quả yếu.
2) Đưa ra các cách giải thích thay thế cho những kết quả trên.
3) Giúp tôi mài sắc top-3 insights theo định dạng WHAT + SO WHAT cho lãnh đạo.
4) Rà soát khuyến nghị: đủ cụ thể chưa, có owner và thời hạn chưa?
5) Thiết kế chu kỳ đo lường tiếp theo (mốc thời gian, KPI, quyết định được hỗ trợ).

Bắt đầu bằng 3 câu hỏi làm rõ quan trọng nhất trước khi phân tích.`;
}

export function generateCertificateId(): string {
  // client-generated, human-readable, not centrally verifiable (no backend)
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let core = "";
  for (let i = 0; i < 8; i++) core += chars[Math.floor(Math.random() * chars.length)];
  return `TIA-${new Date().getFullYear()}-${core.slice(0, 4)}-${core.slice(4)}`;
}
