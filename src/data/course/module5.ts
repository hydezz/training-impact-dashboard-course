import type { CourseModule } from "@/types/course";

export const module5: CourseModule = {
  id: "m5",
  order: 5,
  title: "Kirkpatrick Level 4 – Business Results",
  titleVi: "Kirkpatrick Cấp độ 4 – Kết quả kinh doanh",
  phase: "Measure",
  minutes: 17,
  description:
    "Nối đào tạo với business metrics một cách trung thực: leading/lagging indicators, correlation vs causation, attribution vs contribution.",
  portfolioOutput: "Level 4 plan: business metric, baseline, target, data owner, external factors, attribution limitations",
  steps: [
    {
      id: "m5-1",
      title: "Level 4: kết quả kinh doanh liên quan",
      kind: "learn",
      minutes: 2,
      objective: "Hiểu Level 4 đo gì và chọn business metric nào.",
      content: [
        "Level 4 trả lời: những kết quả kinh doanh nào đã cải thiện, và đào tạo đóng góp vào đó như thế nào? Từ khóa là 'liên quan' — chọn metric nằm trên đường dây logic từ target behavior, không phải mọi chỉ số công ty có.",
        "Nếu hành vi mục tiêu là coaching hàng tháng, metric liên quan là hiệu suất đội và retention — không phải giá cổ phiếu.",
      ],
      bullets: [
        "Metric phải nối logic được với target behavior.",
        "Cần baseline trước đào tạo và target rõ ràng.",
        "Metric thuộc sở hữu của business (data owner), không phải của L&D.",
      ],
      example: {
        title: "Chuỗi logic của case Coaching Skills",
        body: [
          "Đào tạo coaching → quản lý coaching hàng tháng (Level 3) → nhân viên được hỗ trợ tốt hơn → hiệu suất đội tăng, turnover giảm (Level 4).",
          "Mỗi mũi tên là một giả định cần kiểm chứng bằng dữ liệu — không phải một sự thật hiển nhiên.",
        ],
      },
      takeaway: "Level 4 tốt bắt đầu bằng một chuỗi logic rõ ràng từ hành vi đến kết quả.",
    },
    {
      id: "m5-2",
      title: "Leading và lagging indicators",
      kind: "learn",
      minutes: 2,
      objective: "Phân biệt chỉ số dẫn dắt và chỉ số kết quả.",
      content: [
        "Lagging indicators (turnover, doanh thu, lợi nhuận) là kết quả cuối — quan trọng nhưng thay đổi chậm, có khi cần 6–12 tháng mới thấy. Leading indicators (tần suất coaching, điểm engagement, tỷ lệ lỗi tuần) thay đổi sớm hơn và dự báo lagging.",
        "Dashboard tốt theo dõi cả hai: leading để can thiệp kịp, lagging để chứng minh giá trị cuối cùng.",
      ],
      bullets: [
        "Leading: đo sớm, can thiệp được, dự báo tương lai.",
        "Lagging: đo muộn, khẳng định kết quả, thuyết phục lãnh đạo.",
        "Báo cáo leading trong khi chờ lagging — đừng im lặng 6 tháng.",
      ],
      visual: "leading-lagging",
      takeaway: "Leading indicators giúp bạn lái; lagging indicators cho biết bạn đã đến nơi chưa.",
    },
    {
      id: "m5-3",
      title: "Correlation ≠ Causation, Attribution vs Contribution",
      kind: "learn",
      minutes: 3,
      objective: "Diễn giải kết quả kinh doanh một cách trung thực.",
      content: [
        "Hiệu suất tăng 8% sau đào tạo KHÔNG chứng minh đào tạo gây ra mức tăng đó. Cùng kỳ có thể có mùa cao điểm, chính sách thưởng mới, thay đổi nhân sự. Correlation (xảy ra cùng nhau) khác causation (cái này gây ra cái kia).",
        "Ngôn ngữ trung thực: dùng 'contribution' (đào tạo đóng góp vào kết quả, cùng các yếu tố khác) thay vì 'attribution' (kết quả này 100% do đào tạo). Khi khả thi, so sánh nhóm đã đào tạo với nhóm chưa đào tạo (control/comparison group) để tách tín hiệu.",
      ],
      bullets: [
        "Liệt kê công khai các yếu tố ngoài đào tạo cùng tác động.",
        "So sánh nhóm áp dụng vs nhóm chưa áp dụng nếu không có control group.",
        "Viết: 'gắn với', 'đóng góp vào' — không viết 'nhờ đào tạo mà'.",
      ],
      warning: "Không ép mọi khóa học phải quy đổi thành ROI tài chính. Một con số ROI thiếu cơ sở làm mất uy tín nhanh hơn là không có con số nào.",
      takeaway: "Sự trung thực về giới hạn dữ liệu là thứ khiến lãnh đạo tin phần còn lại của báo cáo.",
    },
    {
      id: "m5-4",
      title: "Try It: Phát hiện kết luận nhân quả không hợp lệ",
      kind: "activity",
      minutes: 4,
      objective: "Nhận diện tuyên bố causal thiếu cơ sở.",
      content: ["Đọc từng kết luận và đánh giá cách diễn giải có hợp lệ không."],
      activity: {
        type: "classification",
        intro: "Phân loại từng kết luận:",
        categories: ["Diễn giải hợp lệ", "Diễn giải không hợp lệ"],
        items: [
          {
            text: "'Doanh số Q4 tăng 12% sau khóa Sales Training tháng 9 — chương trình đã tạo ra 12% tăng trưởng này.'",
            category: "Diễn giải không hợp lệ",
            explanation: "Q4 là mùa cao điểm bán hàng; quy toàn bộ mức tăng cho đào tạo là attribution thiếu cơ sở.",
          },
          {
            text: "'Đội của các quản lý coaching đều đặn có hiệu suất tăng 8.4%, so với 2.1% ở đội không coaching — coaching có vẻ đóng góp vào khác biệt này, dù hai nhóm có thể khác nhau ở yếu tố khác.'",
            category: "Diễn giải hợp lệ",
            explanation: "So sánh nhóm áp dụng vs không áp dụng + thừa nhận giới hạn = contribution language chuẩn mực.",
          },
          {
            text: "'Điểm hài lòng khóa học 4.6/5 chứng tỏ chương trình chắc chắn sẽ cải thiện hiệu suất.'",
            category: "Diễn giải không hợp lệ",
            explanation: "Satisfaction (Level 1) không dự báo hiệu suất (Level 4) — nhảy cóc 3 cấp độ không có bằng chứng trung gian.",
          },
          {
            text: "'Tỷ lệ lỗi báo cáo giảm 15% ở nhóm đã học Data Literacy trong khi nhóm chưa học giữ nguyên — dữ liệu nhất quán với giả thuyết chương trình có tác động, cần theo dõi thêm 1 quý.'",
            category: "Diễn giải hợp lệ",
            explanation: "Có nhóm so sánh, ngôn ngữ thận trọng, kèm bước kiểm chứng tiếp theo.",
          },
        ],
      },
      takeaway: "Câu hỏi vàng khi đọc mọi kết luận: 'Còn cách giải thích nào khác cho con số này không?'",
    },
    {
      id: "m5-5",
      title: "Check: Kiến thức Level 4",
      kind: "check",
      minutes: 3,
      objective: "Kiểm tra hiểu biết về đo kết quả kinh doanh.",
      content: ["Chọn đáp án đúng nhất."],
      scored: true,
      activity: {
        type: "single-choice",
        question: "Vì sao nên báo cáo 'contribution' thay vì 'attribution' khi trình bày Level 4?",
        options: [
          {
            text: "Vì contribution nghe khiêm tốn hơn nên dễ được duyệt ngân sách",
            correct: false,
            explanation: "Không phải vấn đề khiêm tốn — đây là vấn đề chính xác về mặt phương pháp.",
          },
          {
            text: "Vì kết quả kinh doanh luôn chịu tác động của nhiều yếu tố ngoài đào tạo, nên tuyên bố đào tạo là nguyên nhân duy nhất thường không có cơ sở",
            correct: true,
            explanation: "Chính xác! Trừ khi có thiết kế thí nghiệm chặt chẽ (control group, randomization), bạn chỉ có thể nói đào tạo đóng góp vào kết quả cùng các yếu tố khác.",
          },
          {
            text: "Vì attribution chỉ dùng được cho chương trình kỹ thuật",
            correct: false,
            explanation: "Loại chương trình không liên quan — vấn đề là thiết kế đo lường có tách được nguyên nhân hay không.",
          },
          {
            text: "Vì lãnh đạo không quan tâm đến nguyên nhân",
            correct: false,
            explanation: "Ngược lại — lãnh đạo rất quan tâm nguyên nhân, vì vậy càng phải trình bày trung thực.",
          },
        ],
      },
      takeaway: "Contribution + giới hạn được nêu rõ = báo cáo đáng tin. Attribution vô căn cứ = mất uy tín.",
    },
    {
      id: "m5-6",
      title: "Add to Portfolio: Level 4 Measurement Plan",
      kind: "portfolio",
      minutes: 3,
      objective: "Hoàn thành kế hoạch đo kết quả kinh doanh cho case của bạn.",
      content: ["Điền kế hoạch Level 4 — mảnh ghép cuối của Kirkpatrick Measurement Plan."],
      portfolioFields: [
        {
          id: "m5-metric",
          label: "Level 4 business metric",
          placeholder: "Chỉ số kinh doanh nào nằm trên chuỗi logic từ target behavior?",
          sampleValue: "Chỉ số hiệu suất đội (performance index) và turnover rate của nhóm frontline thuộc các quản lý tham gia chương trình.",
          multiline: true,
        },
        {
          id: "m5-baseline",
          label: "Baseline",
          placeholder: "Giá trị hiện tại trước đào tạo",
          sampleValue: "Performance index trung bình 68/100 (đo 3 tháng trước chương trình); turnover frontline 24%/năm.",
        },
        {
          id: "m5-target",
          label: "Target & success threshold",
          placeholder: "Mức cải thiện kỳ vọng",
          sampleValue: "Performance index +8% sau 6 tháng ở đội của quản lý áp dụng coaching; turnover giảm ≥3 điểm % sau 12 tháng.",
          multiline: true,
        },
        {
          id: "m5-owner",
          label: "Data owner",
          placeholder: "Ai sở hữu và cung cấp dữ liệu này?",
          sampleValue: "Operations (performance index, cập nhật tháng); HR Analytics (turnover, cập nhật quý).",
        },
        {
          id: "m5-external",
          label: "External factors",
          placeholder: "Yếu tố ngoài đào tạo nào cùng tác động?",
          sampleValue: "Mùa cao điểm Q4; chính sách thưởng mới từ tháng 11; biến động nhân sự quản lý ở miền Trung.",
          multiline: true,
        },
        {
          id: "m5-attribution",
          label: "Attribution limitations",
          placeholder: "Giới hạn nào cần nêu rõ khi diễn giải?",
          sampleValue:
            "Không có control group ngẫu nhiên; so sánh nhóm áp dụng vs chưa áp dụng có thể lệch do khác biệt sẵn có; báo cáo theo ngôn ngữ contribution, không attribution.",
          multiline: true,
        },
      ],
      takeaway: "Kirkpatrick Measurement Plan 4 cấp độ của bạn đã hoàn chỉnh — giờ là lúc chọn KPI.",
    },
  ],
};
