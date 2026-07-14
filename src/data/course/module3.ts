import type { CourseModule } from "@/types/course";

export const module3: CourseModule = {
  id: "m3",
  order: 3,
  title: "Kirkpatrick Level 2 – Learning",
  titleVi: "Kirkpatrick Cấp độ 2 – Học tập",
  phase: "Measure",
  minutes: 13,
  description:
    "Đo lường kiến thức, kỹ năng và sự tự tin bằng pre-test/post-test và assessment gắn với learning objectives.",
  portfolioOutput: "Level 2 measurement plan: assessment method, baseline, target, passing criteria",
  steps: [
    {
      id: "m3-1",
      title: "Level 2: học được gì, giỏi lên bao nhiêu",
      kind: "learn",
      minutes: 2,
      objective: "Hiểu Level 2 đo kiến thức, kỹ năng, thái độ và sự tự tin.",
      content: [
        "Level 2 trả lời: sau đào tạo, người học có kiến thức, kỹ năng hoặc sự tự tin mà trước đó họ chưa có không? Đây là cấp độ đầu tiên đo được 'sự thay đổi' thay vì chỉ 'cảm nhận'.",
        "Muốn đo thay đổi thì phải có điểm xuất phát. Vì vậy pre-test (trước khóa học) là bắt buộc nếu bạn muốn nói 'kiến thức tăng X%' — không có baseline, bạn chỉ có một con số lơ lửng.",
      ],
      bullets: [
        "Kiến thức: pre-test / post-test.",
        "Kỹ năng: skill demonstration, role-play có rubric chấm điểm.",
        "Sự tự tin: confidence before/after (1–5).",
      ],
      visual: "pre-post-flow",
      takeaway: "Không có pre-test thì không có câu chuyện 'cải thiện' — chỉ có một điểm số không biết so với gì.",
    },
    {
      id: "m3-2",
      title: "Công thức Knowledge Improvement",
      kind: "example",
      minutes: 2,
      objective: "Tính knowledge improvement từ pre-test và post-test.",
      content: [
        "Hai cách biểu diễn mức cải thiện kiến thức, dùng song song trong báo cáo:",
        "Knowledge Improvement (điểm) = Điểm post-test trung bình − Điểm pre-test trung bình. Knowledge Improvement % = (Post − Pre) / Pre × 100.",
      ],
      example: {
        title: "Case Coaching Skills",
        body: [
          "Pre-test trung bình: 57 điểm. Post-test trung bình: 79 điểm.",
          "Improvement = 79 − 57 = 22 điểm.",
          "Improvement % = (79 − 57) / 57 × 100 ≈ 38.6%.",
          "Cách đọc: 'Kiến thức coaching của quản lý tăng gần 39% so với trước khóa học.'",
        ],
      },
      tip: "Chỉ tính trên những người có CẢ pre-test lẫn post-test. Người thiếu một trong hai phải loại khỏi phép tính, nếu không con số sẽ méo.",
      takeaway: "Luôn báo cáo cả điểm tuyệt đối lẫn phần trăm — mỗi con số kể một nửa câu chuyện.",
    },
    {
      id: "m3-3",
      title: "Assessment phải khớp với objective",
      kind: "learn",
      minutes: 2,
      objective: "Nhận diện assessment hợp lệ và không hợp lệ.",
      content: [
        "Một assessment hợp lệ phải đo đúng thứ learning objective hứa hẹn. Nếu objective là 'thực hiện được phiên coaching GROW' mà bài kiểm tra chỉ hỏi định nghĩa 4 chữ cái G-R-O-W, bạn đang đo trí nhớ, không đo kỹ năng.",
        "Và một cảnh báo quan trọng: điểm quiz cao không đồng nghĩa với khả năng áp dụng. Biết cách làm trong phòng thi khác với làm được trước một nhân viên đang phòng thủ.",
      ],
      bullets: [
        "Objective 'giải thích được' → quiz kiến thức là đủ.",
        "Objective 'thực hiện được' → cần skill demonstration + rubric.",
        "Objective 'quyết định được' → cần scenario-based assessment.",
      ],
      warning: "Pass rate 95% với một bài test quá dễ là vanity metric — kiểm tra độ khó trước khi ăn mừng.",
      takeaway: "Assessment đo đúng động từ trong learning objective: 'giải thích', 'thực hiện' hay 'quyết định'.",
    },
    {
      id: "m3-4",
      title: "Try It: Formula Challenge",
      kind: "activity",
      minutes: 3,
      objective: "Tự tính knowledge improvement percentage.",
      content: [
        "Chương trình Data Literacy có pre-test trung bình 50 điểm và post-test trung bình 68 điểm (chỉ tính học viên có đủ cả hai bài). Hãy tính Knowledge Improvement %.",
      ],
      activity: {
        type: "formula",
        prompt: "Pre-test trung bình = 50. Post-test trung bình = 68. Knowledge Improvement % = ?",
        formulaHint: "(Post − Pre) / Pre × 100",
        inputLabel: "Knowledge Improvement %",
        answer: 36,
        tolerance: 0.5,
        unit: "%",
        explanation: "(68 − 50) / 50 × 100 = 18 / 50 × 100 = 36%. Kiến thức tăng 36% so với baseline trước khóa học.",
      },
      takeaway: "Mẫu số luôn là điểm PRE — bạn đang so mức cải thiện với điểm xuất phát.",
    },
    {
      id: "m3-5",
      title: "Check: Kiến thức Level 2",
      kind: "check",
      minutes: 1,
      objective: "Kiểm tra hiểu biết về đo lường học tập.",
      content: ["Chọn đáp án đúng nhất."],
      scored: true,
      activity: {
        type: "single-choice",
        question:
          "Learning objective là 'Quản lý thực hiện được một phiên coaching GROW hoàn chỉnh'. Assessment nào KHÔNG hợp lệ cho objective này?",
        options: [
          {
            text: "Role-play phiên coaching với observer chấm theo rubric",
            correct: false,
            explanation: "Đây là assessment hợp lệ nhất — đo trực tiếp việc 'thực hiện được'.",
          },
          {
            text: "Quiz trắc nghiệm hỏi định nghĩa của G, R, O, W",
            correct: true,
            explanation: "Chính xác — đây là assessment KHÔNG hợp lệ. Nó đo trí nhớ về khái niệm, trong khi objective yêu cầu thực hiện kỹ năng. Điểm cao ở quiz này không nói lên khả năng coaching.",
          },
          {
            text: "Video ghi lại phiên coaching thật được chấm theo checklist hành vi",
            correct: false,
            explanation: "Hợp lệ — bằng chứng trực tiếp về kỹ năng thực hiện trong bối cảnh thật.",
          },
          {
            text: "Scenario: xem tình huống nhân viên và chọn phản hồi coaching phù hợp",
            correct: false,
            explanation: "Hợp lệ một phần — đo khả năng ra quyết định coaching, gần với kỹ năng hơn quiz định nghĩa.",
          },
        ],
      },
      takeaway: "Sai lệch giữa objective và assessment là lỗi Level 2 phổ biến nhất — và dễ sửa nhất.",
    },
    {
      id: "m3-6",
      title: "Add to Portfolio: Level 2 Measurement Plan",
      kind: "portfolio",
      minutes: 3,
      objective: "Thiết kế kế hoạch đo Level 2 cho case của bạn.",
      content: ["Điền kế hoạch đo Level 2 với assessment method, baseline, target và passing criteria."],
      portfolioFields: [
        {
          id: "m3-method",
          label: "Assessment method",
          placeholder: "Đo kiến thức/kỹ năng bằng cách nào?",
          sampleValue:
            "Pre-test và post-test 20 câu scenario-based về kỹ năng coaching + role-play cuối khóa chấm theo rubric GROW 4 tiêu chí.",
          multiline: true,
        },
        {
          id: "m3-baseline",
          label: "Baseline",
          placeholder: "Điểm xuất phát đo khi nào, dự kiến bao nhiêu?",
          sampleValue: "Pre-test thực hiện 1 tuần trước khóa học. Baseline dự kiến ~55–60/100 dựa trên pilot.",
        },
        {
          id: "m3-target",
          label: "Target",
          placeholder: "Mức cải thiện mong muốn",
          sampleValue: "Knowledge Improvement ≥25%; điểm role-play trung bình ≥3.5/5.",
        },
        {
          id: "m3-passing",
          label: "Passing criteria",
          placeholder: "Thế nào là 'đạt' với một học viên?",
          sampleValue: "Post-test ≥70/100 VÀ hoàn thành role-play đạt ≥3/5 ở cả 4 tiêu chí rubric.",
          multiline: true,
        },
      ],
      takeaway: "Level 2 plan xong — bạn đã có bằng chứng 'học được', bước tiếp theo là 'làm được'.",
    },
  ],
};
