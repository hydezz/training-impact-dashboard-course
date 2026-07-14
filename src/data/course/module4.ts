import type { CourseModule } from "@/types/course";

export const module4: CourseModule = {
  id: "m4",
  order: 4,
  title: "Kirkpatrick Level 3 – Behavior Application",
  titleVi: "Kirkpatrick Cấp độ 3 – Áp dụng hành vi",
  phase: "Measure",
  minutes: 17,
  description:
    "Đo sự thay đổi hành vi thật tại nơi làm việc: application rate, manager observation, enablers và barriers, và thời điểm đo 30/60/90 ngày.",
  portfolioOutput: "Level 3 plan: observable indicators, data collection method, timeline, manager involvement, success criteria",
  steps: [
    {
      id: "m4-1",
      title: "Level 3: nơi tác động thật bắt đầu",
      kind: "learn",
      minutes: 2,
      objective: "Hiểu vì sao Level 3 là cấp độ quyết định của đo lường đào tạo.",
      content: [
        "Level 3 trả lời câu hỏi quan trọng nhất: sau khi trở lại công việc, người học có thực sự làm khác đi không? Đây là 'learning transfer' — cây cầu nối giữa lớp học và kết quả kinh doanh.",
        "Không có thay đổi hành vi thì không thể có tác động kinh doanh từ đào tạo. Vì vậy nếu chỉ đủ nguồn lực đo thêm một cấp độ ngoài Level 1–2, hãy đo Level 3.",
      ],
      bullets: [
        "Level 3 đo hành vi tại nơi làm việc, không phải trong lớp.",
        "Cần định nghĩa hành vi quan sát được (observable) trước khi đo.",
        "Transfer thường thất bại vì môi trường, không phải vì khóa học.",
      ],
      visual: "transfer-timeline",
      takeaway: "Level 3 là mắt xích quyết định: không có hành vi mới thì không có kết quả mới.",
    },
    {
      id: "m4-2",
      title: "Nguồn bằng chứng: self-report, manager, workplace evidence",
      kind: "learn",
      minutes: 3,
      objective: "Biết các nguồn dữ liệu Level 3 và giới hạn của từng nguồn.",
      content: [
        "Không nguồn dữ liệu hành vi nào hoàn hảo. Chiến lược tốt là kết hợp: self-report cho độ phủ, manager observation cho độ tin, workplace evidence cho tính khách quan.",
      ],
      bullets: [
        "Self-report (follow-up survey): rẻ, phủ rộng — nhưng người ta thường tự đánh giá cao hơn thực tế.",
        "Manager observation (checklist/rubric): đáng tin hơn — nhưng cần manager được hướng dẫn cách quan sát.",
        "Workplace evidence (coaching log, hồ sơ hệ thống, số liệu vận hành): khách quan nhất — nhưng không phải hành vi nào cũng để lại dấu vết.",
      ],
      example: {
        title: "Case Coaching Skills: tam giác bằng chứng",
        body: [
          "Self-report: khảo sát 30/60/90 ngày — 'Bạn đã coaching bao nhiêu nhân viên tháng này?'",
          "Manager observation: quản lý cấp trên dự thính 1 phiên coaching mỗi quý, chấm rubric 5 tiêu chí.",
          "Workplace evidence: coaching log trong HR system — số phiên được ghi nhận mỗi tháng.",
        ],
      },
      warning: "Chỉ dùng self-report cho một quyết định lớn (nhân rộng chương trình) là rủi ro — luôn tìm nguồn thứ hai để đối chiếu.",
      takeaway: "Một hành vi, ít nhất hai nguồn bằng chứng.",
    },
    {
      id: "m4-3",
      title: "Thời điểm đo và enablers/barriers",
      kind: "learn",
      minutes: 2,
      objective: "Chọn thời điểm 30/60/90 ngày và hiểu vai trò của môi trường làm việc.",
      content: [
        "Đo quá sớm, hành vi chưa kịp hình thành; đo quá muộn, không kịp can thiệp. Chuẩn thực hành phổ biến là 3 mốc: 30 ngày (bắt đầu áp dụng chưa?), 60 ngày (duy trì không?), 90 ngày (thành thói quen chưa?).",
        "Đồng thời, hãy đo cả enablers và barriers: sự ủng hộ của manager, thời gian, công cụ, độ ưu tiên. Nghiên cứu transfer nhất quán chỉ ra manager support là yếu tố môi trường mạnh nhất.",
      ],
      bullets: [
        "30 ngày: tín hiệu áp dụng sớm + phát hiện rào cản.",
        "60 ngày: độ duy trì; ai rớt lại và vì sao.",
        "90 ngày: mức độ ổn định của hành vi + so sánh với baseline.",
      ],
      tip: "Trong khảo sát follow-up, luôn có câu: 'Điều gì cản trở bạn áp dụng?' — dữ liệu barrier là vàng cho khuyến nghị hành động.",
      takeaway: "Hành vi cần thời gian: đo lặp lại 30/60/90 ngày, kèm câu hỏi về rào cản.",
    },
    {
      id: "m4-4",
      title: "Try It: Ghép bằng chứng với hành vi",
      kind: "activity",
      minutes: 3,
      objective: "Chọn đúng loại bằng chứng cho từng hành vi mục tiêu.",
      content: ["Ghép mỗi target behavior với nguồn bằng chứng phù hợp nhất."],
      activity: {
        type: "matching",
        intro: "Ghép hành vi (trái) với bằng chứng phù hợp nhất (phải):",
        pairs: [
          {
            left: "Quản lý coaching nhân viên hàng tháng",
            right: "Coaching log trong HR system + khảo sát nhân viên được coaching",
          },
          {
            left: "Nhân viên kiểm tra dữ liệu trước khi nộp báo cáo",
            right: "Tỷ lệ lỗi báo cáo phát hiện bởi bộ phận kiểm soát",
          },
          {
            left: "Nhân viên phục vụ áp dụng quy trình xử lý phàn nàn",
            right: "Mystery shopper / ghi âm cuộc gọi chấm theo checklist",
          },
          {
            left: "Supervisor thực hiện safety walk hàng tuần",
            right: "Safety walk log + số safety conversation được ghi nhận",
          },
        ],
      },
      takeaway: "Bằng chứng tốt nhất là dấu vết tự nhiên mà hành vi để lại trong hệ thống làm việc.",
    },
    {
      id: "m4-5",
      title: "Scenario: Chọn cách đo phù hợp",
      kind: "activity",
      minutes: 2,
      objective: "Ra quyết định đo lường trong tình huống nguồn lực giới hạn.",
      content: [
        "Bạn có ngân sách đo lường giới hạn cho chương trình Coaching Skills (120 quản lý, 3 miền). Bạn chỉ triển khai được MỘT phương án đo Level 3 chính.",
      ],
      activity: {
        type: "single-choice",
        question: "Phương án nào cho bằng chứng hành vi đáng tin nhất với chi phí hợp lý?",
        options: [
          {
            text: "Khảo sát tự đánh giá 1 lần duy nhất ngay cuối khóa học: 'Bạn có định coaching hàng tháng không?'",
            correct: false,
            explanation: "Đây là intention (Level 1), không phải behavior. Hỏi ngay cuối khóa thì chưa ai kịp áp dụng gì.",
          },
          {
            text: "Khảo sát follow-up 30/60/90 ngày kết hợp xác nhận chéo từ coaching log của HR system",
            correct: true,
            explanation: "Đúng! Self-report lặp lại theo mốc thời gian + một nguồn khách quan đối chiếu = độ tin cao, chi phí thấp, phủ đủ 120 người.",
          },
          {
            text: "Thuê chuyên gia dự thính toàn bộ phiên coaching của 120 quản lý trong 3 tháng",
            correct: false,
            explanation: "Bằng chứng rất tốt nhưng chi phí phi thực tế và hiệu ứng quan sát (bị dự thính thì ai cũng coaching 'đúng bài').",
          },
          {
            text: "Phỏng vấn sâu 5 quản lý thân thiết với L&D",
            correct: false,
            explanation: "Mẫu 5/120 tự chọn (self-selected) không đại diện — dễ tạo bức tranh màu hồng sai lệch.",
          },
        ],
      },
      takeaway: "Thiết kế đo lường tốt = cân bằng giữa độ tin cậy, độ phủ và chi phí.",
    },
    {
      id: "m4-6",
      title: "Check: Kiến thức Level 3",
      kind: "check",
      minutes: 2,
      objective: "Kiểm tra hiểu biết về đo lường hành vi.",
      content: ["Đúng hay Sai?"],
      scored: true,
      activity: {
        type: "true-false",
        statements: [
          {
            text: "Self-report là nguồn dữ liệu Level 3 rẻ và phủ rộng, nhưng thường bị thổi phồng so với thực tế.",
            answer: true,
            explanation: "Đúng — vì vậy nên đối chiếu self-report với manager observation hoặc workplace evidence.",
          },
          {
            text: "Nên đo hành vi một lần duy nhất ngay khi khóa học kết thúc để có dữ liệu sớm nhất.",
            answer: false,
            explanation: "Sai — cuối khóa học chưa có hành vi nào tại nơi làm việc để đo. Chuẩn là 30/60/90 ngày sau đào tạo.",
          },
          {
            text: "Manager support là một trong những yếu tố môi trường ảnh hưởng mạnh nhất đến learning transfer.",
            answer: true,
            explanation: "Đúng — nếu manager không tạo điều kiện, hành vi mới hiếm khi sống sót qua tháng đầu tiên.",
          },
        ],
      },
      takeaway: "Level 3 = hành vi thật + thời gian thật + môi trường thật.",
    },
    {
      id: "m4-7",
      title: "Add to Portfolio: Level 3 Measurement Plan",
      kind: "portfolio",
      minutes: 3,
      objective: "Thiết kế kế hoạch đo hành vi cho case của bạn.",
      content: ["Hoàn thiện kế hoạch Level 3 — phần quan trọng nhất của Measurement Plan."],
      portfolioFields: [
        {
          id: "m4-indicators",
          label: "Observable indicators",
          placeholder: "Hành vi mục tiêu biểu hiện qua những dấu hiệu quan sát được nào?",
          sampleValue:
            "1) Số phiên coaching được ghi trong coaching log/tháng. 2) Nhân viên xác nhận được coaching trong pulse survey. 3) Chất lượng phiên coaching theo rubric khi manager cấp trên dự thính.",
          multiline: true,
        },
        {
          id: "m4-method",
          label: "Data collection method",
          placeholder: "Thu bằng chứng bằng cách nào?",
          sampleValue:
            "Follow-up survey 30/60/90 ngày (self-report) + coaching log từ HR system (khách quan) + manager observation mỗi quý (rubric 5 tiêu chí).",
          multiline: true,
        },
        {
          id: "m4-timeline",
          label: "Measurement timeline",
          placeholder: "Các mốc đo cụ thể",
          sampleValue: "Ngày 30: khảo sát đợt 1 + đọc log. Ngày 60: khảo sát đợt 2 + barrier analysis. Ngày 90: khảo sát đợt 3 + manager observation + báo cáo Level 3.",
          multiline: true,
        },
        {
          id: "m4-manager",
          label: "Manager involvement",
          placeholder: "Manager cấp trên tham gia thế nào?",
          sampleValue:
            "Briefing 30 phút trước chương trình về vai trò hỗ trợ; nhận checklist quan sát; cam kết dự thính 1 phiên coaching/quản lý/quý; nhận báo cáo application rate của khu vực mình.",
          multiline: true,
        },
        {
          id: "m4-criteria",
          label: "Level 3 success criteria",
          placeholder: "Thế nào là thành công về hành vi?",
          sampleValue: "Application rate ≥70% tại 90 ngày; manager observation trung bình ≥3.8/5; barrier 'không có thời gian' giảm dưới 30% số phản hồi.",
          multiline: true,
        },
      ],
      takeaway: "Level 3 plan xong — đây là phần lãnh đạo sẽ đọc kỹ nhất trong Measurement Plan của bạn.",
    },
  ],
};
