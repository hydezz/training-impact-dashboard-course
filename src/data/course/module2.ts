import type { CourseModule } from "@/types/course";

export const module2: CourseModule = {
  id: "m2",
  order: 2,
  title: "Kirkpatrick Level 1 – Reaction and Relevance",
  titleVi: "Kirkpatrick Cấp độ 1 – Phản ứng và mức độ phù hợp",
  phase: "Measure",
  minutes: 13,
  description:
    "Đo phản ứng của người học đúng cách: vượt qua 'happy sheet' để thu được tín hiệu dự báo khả năng áp dụng.",
  portfolioOutput: "Level 1 measurement plan: survey questions, data source, timing, success criteria",
  steps: [
    {
      id: "m2-1",
      title: "Level 1 đo điều gì (và không đo điều gì)",
      kind: "learn",
      minutes: 2,
      objective: "Hiểu phạm vi thật sự của Level 1 trong mô hình Kirkpatrick.",
      content: [
        "Mô hình Kirkpatrick có 4 cấp độ: Reaction (phản ứng), Learning (học được gì), Behavior (hành vi thay đổi), Results (kết quả kinh doanh). Level 1 trả lời: người học phản ứng thế nào với trải nghiệm đào tạo?",
        "Level 1 làm tốt sẽ cho tín hiệu sớm về khả năng transfer. Nhưng nó không chứng minh ai học được gì hay sẽ áp dụng gì — đó là việc của Level 2 và 3.",
      ],
      bullets: [
        "Level 1 là cấp độ dễ đo nhất và bị lạm dụng nhiều nhất.",
        "Điểm hài lòng cao không dự báo thay đổi hành vi.",
        "Giá trị thật của Level 1: phát hiện vấn đề sớm (nội dung không liên quan, giảng viên yếu, sai đối tượng).",
      ],
      visual: "kirkpatrick-pyramid",
      takeaway: "Level 1 là nhiệt kế của trải nghiệm học — hữu ích, nhưng đừng nhầm nó với kết quả điều trị.",
    },
    {
      id: "m2-2",
      title: "5 chiều đo của Level 1 hiện đại",
      kind: "learn",
      minutes: 2,
      objective: "Phân biệt satisfaction, relevance, engagement, confidence và intention to apply.",
      content: [
        "Khảo sát 'happy sheet' truyền thống chỉ hỏi mức độ hài lòng. Level 1 hiện đại đo 5 chiều khác nhau — và chiều dự báo transfer tốt nhất không phải là satisfaction.",
      ],
      bullets: [
        "Satisfaction: trải nghiệm có dễ chịu không? (yếu nhất trong dự báo áp dụng)",
        "Relevance: nội dung có sát công việc của tôi không? (dự báo transfer tốt hơn hẳn)",
        "Engagement: tôi có thực sự tham gia tích cực không?",
        "Confidence: tôi có tự tin áp dụng được không?",
        "Intention to apply: tôi có kế hoạch dùng điều đã học trong 30 ngày tới không?",
      ],
      visual: "level1-dimensions",
      example: {
        title: "Câu hỏi tương ứng trong khảo sát Coaching Skills",
        body: [
          "Relevance: 'Các tình huống coaching trong khóa học sát với thực tế đội của tôi.' (1–5)",
          "Confidence: 'Tôi tự tin thực hiện một phiên coaching GROW với nhân viên của mình.' (1–5)",
          "Intention: 'Tôi sẽ thực hiện phiên coaching đầu tiên trong vòng 2 tuần tới.' (Có/Không + ngày dự kiến)",
        ],
      },
      takeaway: "Relevance và intention to apply là hai tín hiệu Level 1 đáng tin hơn satisfaction.",
    },
    {
      id: "m2-3",
      title: "Sai lầm với 'happy sheet' và thời điểm thu thập",
      kind: "learn",
      minutes: 2,
      objective: "Tránh các lỗi phổ biến khi thiết kế và thu khảo sát Level 1.",
      content: [
        "Khảo sát phát ngay sau bữa trưa ngon và một giảng viên vui tính sẽ cho điểm cao bất kể chất lượng học. Thời điểm và cách hỏi quyết định độ tin cậy của dữ liệu Level 1.",
        "Thu thập ngay cuối khóa cho tỷ lệ phản hồi cao nhất; một khảo sát ngắn sau 1–2 tuần ('bạn đã dùng được gì chưa?') cho tín hiệu thực tế hơn.",
      ],
      bullets: [
        "Lỗi 1: chỉ hỏi cảm xúc, không hỏi relevance hay intention.",
        "Lỗi 2: câu hỏi gộp ('Giảng viên nhiệt tình và nội dung hữu ích?' — hai ý trong một câu).",
        "Lỗi 3: khảo sát 25 câu — tỷ lệ bỏ dở cao, dữ liệu rác.",
        "Lỗi 4: không định nghĩa trước thế nào là 'đạt' (success criteria).",
      ],
      warning: "Điểm satisfaction 4.5/5 kèm relevance 3.1/5 là tín hiệu xấu được ngụy trang tốt: học viên vui, nhưng nội dung không sát việc.",
      takeaway: "Khảo sát ngắn, tách bạch từng chiều đo, có success criteria định trước — đó là Level 1 đúng nghĩa.",
    },
    {
      id: "m2-4",
      title: "Try It: Phân loại câu hỏi khảo sát",
      kind: "activity",
      minutes: 3,
      objective: "Nhận diện câu hỏi khảo sát tốt và chưa tốt.",
      content: [
        "Kéo thả tư duy: với mỗi câu hỏi khảo sát dưới đây, hãy phân loại nó là câu hỏi Tốt hay Chưa tốt.",
      ],
      activity: {
        type: "classification",
        intro: "Phân loại từng câu hỏi khảo sát Level 1:",
        categories: ["Tốt", "Chưa tốt"],
        items: [
          {
            text: "'Các tình huống trong khóa học sát với công việc hằng ngày của tôi.' (1–5)",
            category: "Tốt",
            explanation: "Đo relevance — một chiều rõ ràng, một ý duy nhất, thang đo cụ thể.",
          },
          {
            text: "'Giảng viên nhiệt tình và tài liệu dễ hiểu.' (1–5)",
            category: "Chưa tốt",
            explanation: "Câu hỏi gộp (double-barreled): giảng viên và tài liệu là hai thứ khác nhau — điểm 3 nghĩa là gì?",
          },
          {
            text: "'Tôi sẽ áp dụng kỹ năng X trong 30 ngày tới.' (Có/Không + tình huống dự kiến)",
            category: "Tốt",
            explanation: "Đo intention to apply kèm cam kết cụ thể — tín hiệu dự báo transfer tốt.",
          },
          {
            text: "'Bạn thấy khóa học thế nào?' (câu trả lời tự do, bắt buộc)",
            category: "Chưa tốt",
            explanation: "Quá mơ hồ để tổng hợp thành chỉ số; câu mở nên là tùy chọn và có định hướng ('Điều gì hữu ích nhất?').",
          },
          {
            text: "'Tôi tự tin thực hiện một phiên coaching GROW hoàn chỉnh.' (1–5)",
            category: "Tốt",
            explanation: "Đo confidence gắn với hành vi cụ thể (phiên GROW) thay vì cảm giác chung chung.",
          },
        ],
      },
      takeaway: "Một câu hỏi tốt đo đúng một chiều, gắn với hành vi cụ thể, và tổng hợp được thành chỉ số.",
    },
    {
      id: "m2-5",
      title: "Check: Kiến thức Level 1",
      kind: "check",
      minutes: 1,
      objective: "Kiểm tra hiểu biết về Level 1 và KPI tương ứng.",
      content: ["Chọn đáp án đúng nhất."],
      scored: true,
      activity: {
        type: "single-choice",
        question: "KPI Level 1 nào dự báo khả năng áp dụng (transfer) tốt nhất?",
        options: [
          {
            text: "Learner satisfaction score",
            correct: false,
            explanation: "Satisfaction là chỉ số yếu nhất trong dự báo transfer — học viên có thể rất vui mà không đổi hành vi nào.",
          },
          {
            text: "Content relevance score và intention to apply",
            correct: true,
            explanation: "Đúng! Nội dung sát việc + ý định áp dụng cụ thể là hai tín hiệu Level 1 gắn với transfer mạnh nhất.",
          },
          {
            text: "Số lượng học viên tham dự",
            correct: false,
            explanation: "Participation là activity metric, không phải tín hiệu về khả năng áp dụng.",
          },
          {
            text: "Điểm đánh giá cơ sở vật chất phòng học",
            correct: false,
            explanation: "Hữu ích cho hậu cần, vô nghĩa cho dự báo hành vi.",
          },
        ],
      },
      takeaway: "Khi chỉ được giữ 2 chỉ số Level 1, hãy giữ relevance và intention to apply.",
    },
    {
      id: "m2-6",
      title: "Add to Portfolio: Level 1 Measurement Plan",
      kind: "portfolio",
      minutes: 3,
      objective: "Thiết kế kế hoạch đo Level 1 cho case của bạn.",
      content: [
        "Điền kế hoạch đo Level 1. KPI gợi ý: participation rate, completion rate, satisfaction, relevance score, confidence to apply.",
      ],
      portfolioFields: [
        {
          id: "m2-survey",
          label: "Survey questions (3–5 câu chính)",
          placeholder: "Liệt kê các câu khảo sát, mỗi câu đo một chiều",
          sampleValue:
            "1) Nội dung sát với công việc quản lý của tôi (1–5). 2) Tôi tự tin thực hiện phiên coaching GROW (1–5). 3) Tôi sẽ coaching nhân viên đầu tiên trong 2 tuần tới (Có/Không + ngày). 4) Trải nghiệm tổng thể (1–5). 5) Điều gì có thể cản trở bạn áp dụng? (mở, tùy chọn)",
          multiline: true,
        },
        {
          id: "m2-source",
          label: "Data source",
          placeholder: "Dữ liệu Level 1 lấy từ đâu?",
          sampleValue: "Khảo sát online cuối khóa (LMS) + danh sách điểm danh từ LMS.",
        },
        {
          id: "m2-timing",
          label: "Collection timing",
          placeholder: "Thu thập khi nào?",
          sampleValue: "Khảo sát chính: 10 phút cuối buổi học. Pulse survey 3 câu: sau 2 tuần.",
        },
        {
          id: "m2-criteria",
          label: "Success criteria",
          placeholder: "Thế nào là 'đạt' ở Level 1?",
          sampleValue: "Participation ≥90%; Relevance ≥4.0/5; Confidence ≥3.8/5; ≥70% có ý định áp dụng trong 30 ngày.",
          multiline: true,
        },
      ],
      takeaway: "Level 1 plan xong — bạn đã có 'hệ thống cảnh báo sớm' cho chương trình.",
    },
  ],
};
