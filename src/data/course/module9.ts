import type { CourseModule } from "@/types/course";

export const module9: CourseModule = {
  id: "m9",
  order: 9,
  title: "Final Challenge – Executive Training Impact Report",
  titleVi: "Thử thách cuối – Báo cáo tác động đào tạo cho lãnh đạo",
  phase: "Recommend",
  minutes: 5,
  description:
    "Ghép toàn bộ Portfolio thành một executive report một trang: What happened? Why does it matter? What should we do next?",
  portfolioOutput: "Executive Training Impact Report hoàn chỉnh + Master Prompt",
  steps: [
    {
      id: "m9-1",
      title: "Cấu trúc executive report một trang",
      kind: "learn",
      minutes: 1,
      objective: "Nắm cấu trúc báo cáo mà lãnh đạo thực sự đọc.",
      content: [
        "Lãnh đạo không đọc báo cáo 20 trang. Executive report tốt gói toàn bộ câu chuyện đo lường vào một trang theo ba nhịp: What happened (kết quả chính so với target), Why does it matter (ý nghĩa kinh doanh + giới hạn dữ liệu), What should we do next (2–3 khuyến nghị có người chịu trách nhiệm).",
        "Phần Limitations không làm yếu báo cáo — nó là thứ khiến các con số còn lại đáng tin. Báo cáo không có limitations sẽ nhận về những câu hỏi khó ngay tại cuộc họp.",
      ],
      bullets: [
        "8 thành phần: context, approach, KPI results, top insights, interpretation, limitations, recommendations, next step.",
        "Insight dẫn đầu bằng con số quan trọng nhất với quyết định.",
        "Mỗi khuyến nghị cần một owner và một thời hạn.",
      ],
      visual: "report-structure",
      takeaway: "Một trang, ba nhịp, và sự trung thực về giới hạn — đó là công thức của báo cáo được tin.",
    },
    {
      id: "m9-2",
      title: "Hoàn thành Executive Report của bạn",
      kind: "portfolio",
      minutes: 3,
      objective: "Điền Executive Report Builder từ những gì bạn đã xây suốt khóa học.",
      content: [
        "Mở Report Builder dưới đây. Các trường được gợi ý sẵn từ sample case — hãy chỉnh theo case của bạn. Sau khi hoàn thành, bạn có thể preview, copy, in/lưu PDF, và sinh Master Prompt để tiếp tục hoàn thiện cùng Claude.",
      ],
      special: "report-builder",
      takeaway: "Báo cáo này chính là sản phẩm bạn mang về trình bày với management.",
    },
    {
      id: "m9-3",
      title: "Check: Tư duy báo cáo executive",
      kind: "check",
      minutes: 1,
      objective: "Kiểm tra cuối khóa về cách trình bày kết quả đo lường.",
      content: ["Câu hỏi cuối cùng của khóa học."],
      scored: true,
      activity: {
        type: "single-choice",
        question:
          "Trong executive report, cách trình bày kết quả Level 4 nào là chuẩn mực nhất?",
        options: [
          {
            text: "'Chương trình tạo ra ROI 340%' — không kèm cách tính hay giả định",
            correct: false,
            explanation: "Một con số ROI không có cơ sở tính toán minh bạch sẽ sụp đổ ngay câu hỏi đầu tiên của CFO.",
          },
          {
            text: "'Hiệu suất đội tăng 8.4% ở nhóm quản lý áp dụng coaching (vs 2.1% ở nhóm chưa áp dụng). Kết quả này gắn với chương trình nhưng cùng kỳ có 2 sáng kiến khác; chúng tôi báo cáo theo hướng đóng góp, không quy toàn bộ cho đào tạo.'",
            correct: true,
            explanation: "Đúng! Con số cụ thể + nhóm so sánh + thừa nhận yếu tố ngoài + ngôn ngữ contribution = trình bày Level 4 chuẩn mực.",
          },
          {
            text: "'Kết quả rất tích cực trên nhiều phương diện' — không có con số",
            correct: false,
            explanation: "Không có con số thì không có căn cứ ra quyết định — đây là báo cáo cảm tính.",
          },
          {
            text: "Chỉ trình bày satisfaction score vì đó là số đẹp nhất",
            correct: false,
            explanation: "Cherry-picking chỉ số đẹp là cách nhanh nhất đánh mất niềm tin của lãnh đạo vào L&D.",
          },
        ],
      },
      takeaway: "Bạn đã hoàn thành toàn bộ khóa học — hãy kiểm tra Portfolio và nhận chứng chỉ!",
    },
  ],
};
