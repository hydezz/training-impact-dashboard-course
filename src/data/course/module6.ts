import type { CourseModule } from "@/types/course";

export const module6: CourseModule = {
  id: "m6",
  order: 6,
  title: "Build the Training KPI Framework",
  titleVi: "Xây dựng khung KPI đào tạo",
  phase: "Measure",
  minutes: 13,
  description:
    "Chọn một bộ KPI cân bằng, định nghĩa từng KPI đầy đủ (công thức, nguồn dữ liệu, tần suất, chủ sở hữu) và tránh vanity metrics.",
  portfolioOutput: "Training KPI Dictionary: formula, target, data source, frequency, owner",
  steps: [
    {
      id: "m6-1",
      title: "Một bộ KPI cân bằng trông như thế nào",
      kind: "learn",
      minutes: 2,
      objective: "Phân loại KPI theo 5 nhóm và hiểu vì sao cần cân bằng.",
      content: [
        "Một dashboard chỉ toàn activity metrics kể câu chuyện 'chúng tôi bận rộn'. Một bộ KPI cân bằng kể câu chuyện 'chúng tôi tạo ra thay đổi' — với đại diện từ đủ 5 nhóm:",
      ],
      bullets: [
        "Activity: participation rate, completion rate — chương trình có chạy không?",
        "Efficiency: cost per learner, cost per completion — chạy có hiệu quả chi phí không?",
        "Learning: knowledge improvement, pass rate — có học được không?",
        "Behavior: application rate, manager observation — có làm khác đi không?",
        "Business: performance improvement, business-impact indicator — có tạo kết quả không?",
      ],
      visual: "kpi-families",
      tip: "Quy tắc 7±2: executive dashboard chỉ nên có 5–9 KPI. Nhiều hơn là tiếng ồn.",
      takeaway: "Mỗi nhóm KPI trả lời một câu hỏi khác nhau — bộ KPI tốt phủ đủ chuỗi từ activity đến business.",
    },
    {
      id: "m6-2",
      title: "Định nghĩa KPI đầy đủ: 7 thành phần",
      kind: "example",
      minutes: 2,
      objective: "Viết KPI definition mà bất kỳ ai đọc cũng tính ra cùng một con số.",
      content: [
        "'Application Rate: 74%' — 74% của ai, đo lúc nào, tính thế nào? KPI không có định nghĩa chuẩn sẽ tạo ra tranh cãi thay vì quyết định. Mỗi KPI trong dictionary cần đủ 7 thành phần: tên, định nghĩa, công thức, nguồn dữ liệu, tần suất, target, và owner — kèm cách diễn giải.",
      ],
      example: {
        title: "KPI definition mẫu: Application Rate",
        body: [
          "Định nghĩa: Tỷ lệ học viên hoàn thành khóa học có thực hiện target behavior tại mốc đo.",
          "Công thức: Số người thể hiện hành vi / Số người được đánh giá × 100 (loại người chưa được đo khỏi mẫu số).",
          "Nguồn: Follow-up survey + coaching log. Tần suất: 30/60/90 ngày. Target: ≥70% tại 90 ngày. Owner: L&D Manager.",
          "Diễn giải: dưới 50% ở mốc 30 ngày = cần can thiệp enablement ngay, không đợi mốc 90 ngày.",
        ],
      },
      takeaway: "Một KPI được định nghĩa tốt thì hai người tính độc lập phải ra cùng một con số.",
    },
    {
      id: "m6-3",
      title: "Vanity metrics và cách phát hiện",
      kind: "learn",
      minutes: 2,
      objective: "Nhận diện chỉ số 'đẹp mà rỗng' trước khi chúng lên dashboard.",
      content: [
        "Vanity metric là chỉ số trông ấn tượng nhưng không dẫn đến quyết định nào: tổng giờ đào tạo, số lượt truy cập LMS, số chứng chỉ phát ra. Chúng chỉ tăng chứ hiếm khi 'xấu đi', và không ai thay đổi hành động dựa trên chúng.",
        "Phép thử 3 câu: (1) Chỉ số này giúp ai ra quyết định gì? (2) Nếu nó giảm, chúng ta có làm gì khác không? (3) Nó có nối được với business question không? Ba câu 'không' = vanity metric.",
      ],
      bullets: [
        "'10.000 giờ đào tạo' — nghe lớn, không nói lên thay đổi nào.",
        "Vanity metric hợp lệ khi dùng nội bộ vận hành, nhưng đừng cho lên executive dashboard.",
        "Chỉ số tốt có thể 'xấu đi' — và khi đó bạn biết phải làm gì.",
      ],
      takeaway: "Nếu không ai hành động khác đi khi chỉ số thay đổi, đó là vanity metric.",
    },
    {
      id: "m6-4",
      title: "Try It: Phân loại KPI",
      kind: "activity",
      minutes: 3,
      objective: "Phân loại KPI vào đúng nhóm.",
      content: ["Phân loại từng KPI vào nhóm phù hợp."],
      activity: {
        type: "classification",
        intro: "KPI này thuộc nhóm nào?",
        categories: ["Activity", "Learning", "Behavior", "Business"],
        items: [
          {
            text: "Completion Rate",
            category: "Activity",
            explanation: "Hoàn thành khóa học là hoạt động — chưa nói gì về học tập hay hành vi.",
          },
          {
            text: "Knowledge Improvement %",
            category: "Learning",
            explanation: "Đo mức tăng kiến thức giữa pre-test và post-test — Level 2.",
          },
          {
            text: "Application Rate tại 90 ngày",
            category: "Behavior",
            explanation: "Đo hành vi thật tại nơi làm việc — Level 3.",
          },
          {
            text: "Tỷ lệ lỗi báo cáo giảm sau đào tạo",
            category: "Business",
            explanation: "Kết quả vận hành mà doanh nghiệp quan tâm — Level 4.",
          },
          {
            text: "Manager Observation Score",
            category: "Behavior",
            explanation: "Bằng chứng hành vi từ quan sát của quản lý — Level 3.",
          },
          {
            text: "Participation Rate",
            category: "Activity",
            explanation: "Tham dự là điều kiện đầu vào, thuộc nhóm activity.",
          },
        ],
      },
      takeaway: "Gọi tên đúng nhóm KPI giúp bạn thấy ngay dashboard đang thiếu mảnh nào.",
    },
    {
      id: "m6-5",
      title: "Check: Chọn KPI cho executive dashboard",
      kind: "check",
      minutes: 1,
      objective: "Áp dụng tư duy KPI cân bằng vào lựa chọn thực tế.",
      content: ["Chọn đáp án đúng nhất."],
      scored: true,
      activity: {
        type: "single-choice",
        question:
          "CEO muốn một dashboard 6 KPI cho chương trình Coaching Skills. Bộ nào cân bằng nhất?",
        options: [
          {
            text: "Số lớp học, số học viên, tổng giờ đào tạo, số chứng chỉ, lượt truy cập LMS, điểm hài lòng",
            correct: false,
            explanation: "5/6 là activity/vanity metrics — dashboard này kể chuyện 'bận rộn', không kể chuyện 'tác động'.",
          },
          {
            text: "Participation Rate, Knowledge Improvement, Application Rate 90d, Performance Improvement, Cost per Learner, Business-Impact Indicator",
            correct: true,
            explanation: "Đúng! Phủ đủ activity → learning → behavior → business + efficiency. Mỗi KPI trả lời một câu hỏi khác nhau của lãnh đạo.",
          },
          {
            text: "6 KPI đều về satisfaction ở 6 khu vực khác nhau",
            correct: false,
            explanation: "Chỉ một chiều đo (Level 1) lặp lại 6 lần — chi tiết vận hành, không phải bức tranh executive.",
          },
          {
            text: "Chỉ một KPI duy nhất: ROI tài chính của chương trình",
            correct: false,
            explanation: "Một con số ROI không có chuỗi bằng chứng phía sau (learning → behavior → results) sẽ không trụ được trước câu hỏi 'con số này ở đâu ra?'.",
          },
        ],
      },
      takeaway: "Executive dashboard tốt = chuỗi bằng chứng thu nhỏ, không phải bảng thành tích.",
    },
    {
      id: "m6-6",
      title: "Add to Portfolio: Training KPI Dictionary",
      kind: "portfolio",
      minutes: 3,
      objective: "Chốt bộ KPI và định nghĩa cho case của bạn.",
      content: [
        "Hoàn thiện KPI Dictionary cho chương trình của bạn. 7 KPI cốt lõi của khóa học: Participation Rate, Completion Rate, Knowledge Improvement, Application Rate, Performance Improvement, Training Cost per Learner, Business-Impact Indicator.",
      ],
      portfolioFields: [
        {
          id: "m6-kpis",
          label: "Bộ KPI đã chọn (5–9 KPI, ghi rõ nhóm)",
          placeholder: "Liệt kê KPI và nhóm của nó (activity/efficiency/learning/behavior/business)",
          sampleValue:
            "1) Participation Rate (activity) 2) Completion Rate (activity) 3) Knowledge Improvement % (learning) 4) Application Rate 30/60/90d (behavior) 5) Manager Observation Score (behavior) 6) Performance Improvement % (business) 7) Training Cost per Learner (efficiency) 8) Business-Impact Value (business)",
          multiline: true,
        },
        {
          id: "m6-formulas",
          label: "Công thức các KPI chính",
          placeholder: "Viết công thức cho 3–4 KPI quan trọng nhất",
          sampleValue:
            "Application Rate = Số quản lý coaching hàng tháng / Số quản lý được đánh giá × 100. Knowledge Improvement % = (Post − Pre)/Pre × 100. Performance Improvement % = (Perf sau − Perf trước)/Perf trước × 100. Cost per Learner = Tổng chi phí trực tiếp / Số người tham gia.",
          multiline: true,
        },
        {
          id: "m6-targets",
          label: "Target cho từng KPI",
          placeholder: "Mức đạt của từng KPI",
          sampleValue:
            "Participation ≥90%; Completion ≥85%; Knowledge Improvement ≥25%; Application Rate ≥70% (90d); Manager Observation ≥3.8/5; Performance Improvement ≥8%; Cost per Learner ≤$250.",
          multiline: true,
        },
        {
          id: "m6-sources",
          label: "Data source & reporting frequency",
          placeholder: "Nguồn và tần suất của từng nhóm KPI",
          sampleValue:
            "LMS (activity — theo cohort); pre/post test (learning — theo cohort); follow-up survey + coaching log (behavior — 30/60/90d); performance system (business — quý); finance (cost — theo cohort).",
          multiline: true,
        },
        {
          id: "m6-owners",
          label: "KPI owner",
          placeholder: "Ai chịu trách nhiệm với từng KPI?",
          sampleValue: "L&D Manager: activity + learning. L&D + Line Managers: behavior. Operations Director: performance. Finance Partner: cost.",
          multiline: true,
        },
      ],
      takeaway: "KPI Dictionary xong — mọi con số trên dashboard sắp tới đều đã có định nghĩa chuẩn.",
    },
  ],
};
