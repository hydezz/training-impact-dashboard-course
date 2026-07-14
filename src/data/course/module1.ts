import type { CourseModule } from "@/types/course";

export const module1: CourseModule = {
  id: "m1",
  order: 1,
  title: "Start with the Business Question",
  titleVi: "Bắt đầu từ câu hỏi kinh doanh",
  phase: "Define",
  minutes: 14,
  description:
    "Học cách xác định business question trước khi nghĩ đến dashboard, và viết một measurement question đủ tốt để dẫn dắt toàn bộ dự án đo lường.",
  portfolioOutput: "Business question, training objective, target behavior, desired business result, key stakeholder",
  steps: [
    {
      id: "m1-1",
      title: "Vì sao không bắt đầu bằng dashboard",
      kind: "learn",
      minutes: 2,
      objective: "Hiểu vì sao dashboard là bước cuối, không phải bước đầu.",
      content: [
        "Sai lầm phổ biến nhất trong learning analytics: mở Excel, gom mọi dữ liệu có sẵn, rồi vẽ dashboard thật đẹp. Kết quả là một dashboard trả lời những câu hỏi không ai hỏi — số lớp học, số giờ đào tạo, tỷ lệ hoàn thành — trong khi lãnh đạo vẫn không biết chương trình có đáng đầu tư tiếp hay không.",
        "Đo lường hiệu quả bắt đầu từ câu hỏi mà doanh nghiệp cần trả lời. Câu hỏi quyết định dữ liệu nào cần thu thập, khi nào thu thập, và dashboard cần hiển thị gì.",
      ],
      bullets: [
        "Dữ liệu có sẵn ≠ dữ liệu cần thiết.",
        "Dashboard chỉ tốt khi câu hỏi phía sau nó tốt.",
        "Câu hỏi tốt tiết kiệm hàng chục giờ phân tích vô ích.",
      ],
      warning: "Nếu bạn không nói được dashboard này giúp ai ra quyết định gì, đừng xây nó vội.",
      takeaway: "Câu hỏi đi trước, dữ liệu đi sau, dashboard đi cuối cùng.",
    },
    {
      id: "m1-2",
      title: "Training activity ≠ Training impact",
      kind: "learn",
      minutes: 2,
      objective: "Phân biệt rõ chỉ số hoạt động và chỉ số tác động.",
      content: [
        "Activity metrics mô tả những gì L&D đã làm: số khóa học, số học viên, số giờ, tỷ lệ hoàn thành. Chúng cần thiết để vận hành nhưng không chứng minh giá trị.",
        "Impact metrics mô tả những gì thay đổi nhờ đào tạo: kiến thức tăng, hành vi mới xuất hiện tại nơi làm việc, chỉ số kinh doanh cải thiện. 100% học viên hoàn thành khóa học vẫn có thể đồng nghĩa với 0% thay đổi hành vi.",
      ],
      bullets: [
        "Activity: 'Chúng tôi đã đào tạo 120 quản lý.'",
        "Impact: '74% quản lý coaching hàng tháng, hiệu suất đội tăng 8%.'",
        "Lãnh đạo trả tiền cho impact, không phải activity.",
      ],
      example: {
        title: "Cùng một chương trình, hai cách báo cáo",
        body: [
          "Báo cáo A: '12 lớp Coaching Skills, 120 học viên, 95% hoàn thành, hài lòng 4.2/5.'",
          "Báo cáo B: 'Sau 90 ngày, 74% quản lý duy trì coaching hàng tháng (baseline: 39%). Hiệu suất đội của nhóm có coaching tăng 8.4% so với 2.1% ở nhóm không coaching.'",
          "Báo cáo B khiến CEO muốn mở rộng chương trình. Báo cáo A chỉ xác nhận ngân sách đã được tiêu.",
        ],
      },
      visual: "activity-vs-impact",
      takeaway: "Completion không phải là impact — nó chỉ là điều kiện để impact có cơ hội xảy ra.",
    },
    {
      id: "m1-3",
      title: "Khung 5 câu hỏi để xác định vấn đề",
      kind: "learn",
      minutes: 2,
      objective: "Dùng 5 câu hỏi để nối chương trình đào tạo với kết quả kinh doanh.",
      content: [
        "Trước khi thiết kế đo lường, trả lời 5 câu hỏi này cùng stakeholder. Chúng tạo thành chuỗi logic từ vấn đề kinh doanh đến hành vi cần thay đổi — chính là 'đường dây' bạn sẽ đo ở các module sau.",
      ],
      bullets: [
        "Business problem: vấn đề kinh doanh nào đang tồn tại?",
        "Expected performance: hiệu suất mong muốn trông như thế nào?",
        "Current performance: hiện tại đang ở đâu (baseline)?",
        "Target behavior: hành vi cụ thể nào cần xuất hiện/thay đổi?",
        "Desired business result: nếu hành vi thay đổi, chỉ số kinh doanh nào sẽ nhúc nhích?",
      ],
      example: {
        title: "Áp dụng vào case Coaching Skills",
        body: [
          "Problem: turnover cao và hiệu suất không đồng đều ở frontline. Expected: mỗi nhân viên được coaching hàng tháng. Current: chỉ 39% quản lý coaching định kỳ. Target behavior: quản lý thực hiện ≥1 phiên coaching có cấu trúc/nhân viên/tháng. Desired result: hiệu suất đội +8%, turnover giảm.",
        ],
      },
      takeaway: "Nếu không nêu được target behavior, bạn chưa sẵn sàng đo bất cứ điều gì.",
    },
    {
      id: "m1-4",
      title: "Viết measurement question",
      kind: "example",
      minutes: 2,
      objective: "Biết một measurement question tốt trông như thế nào.",
      content: [
        "Measurement question tốt phải cụ thể về hành vi, có thể trả lời bằng dữ liệu, và gắn với kết quả doanh nghiệp quan tâm. Câu hỏi mơ hồ tạo ra đo lường mơ hồ.",
        "Công thức gợi ý: 'Sau [chương trình], [hành vi cụ thể] có [thay đổi đo được] không, và thay đổi đó có gắn với [kết quả kinh doanh] không?'",
      ],
      example: {
        title: "Chưa tốt vs. Tốt hơn",
        body: [
          "Chưa tốt: 'Khóa học có thành công không?' — không nói rõ 'thành công' nghĩa là gì, đo bằng gì.",
          "Tốt hơn: 'Sau chương trình Coaching Skills, tỷ lệ quản lý thực hiện coaching hàng tháng có tăng không, và sự thay đổi đó có liên quan đến mức độ cải thiện hiệu suất của nhân viên hay không?'",
          "Câu thứ hai chỉ rõ: hành vi (coaching hàng tháng), phép đo (tỷ lệ tăng), và liên kết kinh doanh (hiệu suất nhân viên).",
        ],
      },
      tip: "Đọc lại câu hỏi và tự kiểm: có thể trả lời bằng một con số hoặc một biểu đồ không? Nếu không, hãy viết lại.",
      takeaway: "Một measurement question tốt luôn nêu được: hành vi gì, đo bằng gì, gắn với kết quả nào.",
    },
    {
      id: "m1-5",
      title: "Try It: Chọn và sửa measurement question",
      kind: "activity",
      minutes: 3,
      objective: "Thực hành nhận diện và cải thiện measurement question.",
      content: [
        "Một chuỗi nhà hàng vừa đào tạo 'Upselling Skills' cho 200 nhân viên phục vụ. Giám đốc vận hành muốn biết chương trình có đáng nhân rộng không. Hãy chọn measurement question tốt nhất.",
      ],
      activity: {
        type: "single-choice",
        question: "Câu hỏi nào giúp giám đốc vận hành ra quyết định nhân rộng?",
        options: [
          {
            text: "Nhân viên có thích khóa học Upselling không?",
            correct: false,
            explanation: "Đây là câu hỏi Level 1 (reaction). Mức độ yêu thích không nói lên hành vi hay doanh thu — không đủ để quyết định nhân rộng.",
          },
          {
            text: "Bao nhiêu phần trăm nhân viên hoàn thành khóa học?",
            correct: false,
            explanation: "Completion là activity metric. 100% hoàn thành vẫn có thể không tạo ra thay đổi nào tại nhà hàng.",
          },
          {
            text: "Sau khóa học, tỷ lệ nhân viên chủ động gợi ý món thêm có tăng không, và giá trị trung bình mỗi hóa đơn có cải thiện ở các nhà hàng đã đào tạo không?",
            correct: true,
            explanation: "Chính xác! Câu này nêu rõ hành vi (gợi ý món thêm), phép đo (tỷ lệ tăng) và kết quả kinh doanh (giá trị hóa đơn) — đủ căn cứ để quyết định nhân rộng.",
          },
          {
            text: "Điểm bài kiểm tra cuối khóa trung bình là bao nhiêu?",
            correct: false,
            explanation: "Điểm kiểm tra là Level 2 (learning). Biết kỹ thuật upselling và thực sự upselling trước khách hàng là hai chuyện khác nhau.",
          },
        ],
      },
      takeaway: "Câu hỏi tốt nhất luôn chứa cả hành vi lẫn kết quả kinh doanh.",
    },
    {
      id: "m1-6",
      title: "Check: Kiến thức Module 1",
      kind: "check",
      minutes: 1,
      objective: "Kiểm tra nhanh các khái niệm cốt lõi của Module 1.",
      content: ["Trả lời các câu sau để hoàn thành knowledge check của Module 1."],
      scored: true,
      activity: {
        type: "true-false",
        intro: "Đúng hay Sai?",
        statements: [
          {
            text: "Tỷ lệ hoàn thành khóa học cao chứng minh chương trình đã tạo ra tác động kinh doanh.",
            answer: false,
            explanation: "Completion là activity metric — điều kiện cần chứ không phải bằng chứng của impact.",
          },
          {
            text: "Nên xác định target behavior trước khi chọn dữ liệu cần thu thập.",
            answer: true,
            explanation: "Đúng. Hành vi mục tiêu quyết định dữ liệu nào có ý nghĩa; thu thập trước, hỏi sau là công thức của dashboard vô dụng.",
          },
          {
            text: "'Khóa học có thành công không?' là một measurement question tốt vì nó ngắn gọn.",
            answer: false,
            explanation: "Ngắn nhưng mơ hồ: không định nghĩa 'thành công', không nêu hành vi hay kết quả nào cần đo.",
          },
        ],
      },
      takeaway: "Bạn đã nắm nền tảng Define — mọi cấp độ Kirkpatrick phía sau đều xây trên nó.",
    },
    {
      id: "m1-7",
      title: "Add to Portfolio: Business Question",
      kind: "portfolio",
      minutes: 2,
      objective: "Chốt business question và các thành phần Define cho case của bạn.",
      content: [
        "Hoàn thiện phần đầu tiên của Measurement Plan. Nếu dùng sample case, bạn có thể giữ nguyên gợi ý hoặc chỉnh theo ý mình.",
      ],
      portfolioFields: [
        {
          id: "m1-business-question",
          label: "Business question (bản hoàn chỉnh)",
          placeholder: "Sau [chương trình], [hành vi] có [thay đổi đo được] không, và có gắn với [kết quả kinh doanh] không?",
          sampleValue:
            "Sau chương trình Coaching Skills, tỷ lệ quản lý thực hiện coaching hàng tháng có tăng không, và sự thay đổi đó có liên quan đến mức độ cải thiện hiệu suất của nhân viên hay không?",
          multiline: true,
        },
        {
          id: "m1-objective",
          label: "Training objective",
          placeholder: "Chương trình được thiết kế để thay đổi điều gì?",
          sampleValue: "Mỗi Frontline Manager thực hiện coaching có cấu trúc hàng tháng cho từng nhân viên trong đội.",
          multiline: true,
        },
        {
          id: "m1-behavior",
          label: "Target behavior",
          placeholder: "Hành vi cụ thể, quan sát được",
          sampleValue: "Quản lý thực hiện ≥1 phiên coaching có cấu trúc (GROW) cho mỗi nhân viên mỗi tháng, có ghi nhận trong coaching log.",
          multiline: true,
        },
        {
          id: "m1-result",
          label: "Desired business result",
          placeholder: "Chỉ số kinh doanh nào sẽ cải thiện?",
          sampleValue: "Hiệu suất đội tăng ≥8% so với baseline; turnover nhóm frontline giảm trong 12 tháng.",
          multiline: true,
        },
        {
          id: "m1-stakeholder",
          label: "Key stakeholder",
          placeholder: "Ai cần câu trả lời này để ra quyết định?",
          sampleValue: "COO (sponsor quyết định nhân rộng), HR Director, Regional Operations Managers.",
        },
      ],
      takeaway: "Phần Define của Portfolio đã xong — từ đây mọi KPI đều phải phục vụ câu hỏi này.",
    },
  ],
};
