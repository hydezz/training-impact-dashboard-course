import type { CourseModule } from "@/types/course";

export const module7: CourseModule = {
  id: "m7",
  order: 7,
  title: "Analyze Training Data with Excel and AI",
  titleVi: "Phân tích dữ liệu đào tạo bằng Excel và AI",
  phase: "Analyze",
  minutes: 13,
  description:
    "Làm việc với file dữ liệu thực hành: làm sạch dữ liệu, tính KPI bằng Excel, và dùng Claude làm trợ lý phân tích có trách nhiệm.",
  portfolioOutput: "Data quality checklist, KPI calculations, AI analysis prompt, preliminary insights",
  steps: [
    {
      id: "m7-1",
      title: "Tải workbook và hiểu cấu trúc dữ liệu",
      kind: "learn",
      minutes: 2,
      objective: "Nắm cấu trúc file thực hành trước khi phân tích.",
      content: [
        "Tải file training-impact-practice-data.xlsx — dữ liệu giả lập của 420 học viên qua 4 chương trình đào tạo. File có 8 sheet: Learner Records (dữ liệu chính), Program Summary, KPI Dictionary, Data Dictionary, Measurement Plan, Executive Report Template, Sample Completed Case và Prompt Library.",
        "Nguyên tắc số 1 khi nhận bất kỳ dataset nào: đọc Data Dictionary trước khi đọc dữ liệu. Nó cho biết mỗi cột nghĩa là gì, giá trị hợp lệ, và những vấn đề chất lượng đã biết.",
      ],
      bullets: [
        "Sheet Learner Records: 420 dòng, 28 cột — mỗi dòng một học viên.",
        "Dữ liệu chứa lỗi CÓ CHỦ ĐÍCH để bạn thực hành làm sạch.",
        "Data Dictionary ghi rõ từng loại lỗi ở cột nào.",
      ],
      special: "workbook-download",
      takeaway: "Data Dictionary là bản đồ — đừng khám phá dữ liệu mà không mang theo nó.",
    },
    {
      id: "m7-2",
      title: "6 lỗi dữ liệu phổ biến trong dữ liệu đào tạo",
      kind: "learn",
      minutes: 2,
      objective: "Nhận diện các vấn đề chất lượng trước khi tính toán.",
      content: [
        "Tính KPI trên dữ liệu bẩn cho ra con số sai với vẻ ngoài chính xác. Trước mọi phép tính, quét qua 6 loại lỗi này:",
      ],
      bullets: [
        "Duplicate: Learner_ID trùng làm đếm sai số học viên.",
        "Inconsistent naming: 'Sales' vs 'sales ' vs 'SALES' bị Excel coi là 3 nhóm khác nhau.",
        "Missing data: post-test trống — là 'chưa thi' hay 'mất dữ liệu'? Hai cách xử lý khác nhau.",
        "Out-of-range: điểm 112/100, satisfaction 6.5/5 — lỗi nhập liệu.",
        "Mixed date formats: '2025-08-18' lẫn '18/08/2025' làm hỏng sort và filter.",
        "Outliers: Training Cost gấp 10 lần bình thường — lỗi hay sự thật? Điều tra trước khi xóa.",
      ],
      visual: "data-quality-flow",
      warning: "Đừng bao giờ xóa dữ liệu gốc. Luôn làm sạch trên một bản copy và ghi lại từng thay đổi.",
      takeaway: "Missing data không phải số 0, và outlier không tự động là lỗi — cả hai cần được điều tra.",
    },
    {
      id: "m7-3",
      title: "Dùng Claude làm trợ lý phân tích",
      kind: "example",
      minutes: 3,
      objective: "Viết prompt phân tích dữ liệu hiệu quả và có trách nhiệm.",
      content: [
        "Claude có thể tăng tốc mọi bước: hiểu cấu trúc dữ liệu, rà soát chất lượng, đề xuất công thức Excel, phân tích xu hướng, và chuyển số liệu thành insight. Chất lượng đầu ra phụ thuộc vào ngữ cảnh bạn cung cấp: cấu trúc dữ liệu, business question, và yêu cầu đầu ra cụ thể.",
        "Quy tắc an toàn dữ liệu: không dán dữ liệu cá nhân hay dữ liệu nhạy cảm của công ty vào AI khi chưa được phép. Thay tên bằng mã ID, dùng dữ liệu tổng hợp (pivot summary) thay vì dữ liệu thô khi có thể.",
      ],
      example: {
        title: "Prompt yếu vs Prompt mạnh",
        body: [
          "Yếu: 'Phân tích dữ liệu đào tạo này giúp tôi.' — Claude phải đoán bạn muốn gì.",
          "Mạnh: 'Bạn là learning analytics consultant. Đây là bảng tổng hợp theo chương trình [dán pivot]. Business question: [câu hỏi]. Hãy tìm 3 pattern đáng chú ý nhất, so sánh giữa các khu vực, và chỉ ra dữ liệu này KHÔNG kết luận được điều gì. Dùng ngôn ngữ thận trọng: association, không causation.'",
        ],
      },
      tip: "Yêu cầu Claude chỉ ra 'dữ liệu này không kết luận được gì' — đó là phần giá trị nhất mà ít người hỏi.",
      takeaway: "Ngữ cảnh + câu hỏi cụ thể + yêu cầu thận trọng = prompt phân tích tốt. Và luôn ẩn danh dữ liệu trước.",
    },
    {
      id: "m7-4",
      title: "Try It: Data Quality Challenge",
      kind: "activity",
      minutes: 2,
      objective: "Phát hiện vấn đề dữ liệu trong tình huống thật.",
      content: [
        "Bạn mở sheet Learner Records và thấy: Department có cả 'Sales' lẫn 'sales '; 7 học viên hoàn thành khóa nhưng thiếu post-test; một Training Cost là $2,400 trong khi trung bình là $220.",
      ],
      activity: {
        type: "true-false",
        intro: "Cách xử lý nào đúng?",
        statements: [
          {
            text: "'Sales' và 'sales ' nên được chuẩn hóa về một giá trị trước khi tính KPI theo phòng ban.",
            answer: true,
            explanation: "Đúng — dùng TRIM + chuẩn hóa chữ hoa/thường, nếu không phòng Sales sẽ bị chia đôi trong mọi biểu đồ.",
          },
          {
            text: "7 học viên thiếu post-test nên được tính là 0 điểm khi tính Knowledge Improvement.",
            answer: false,
            explanation: "Sai — thiếu dữ liệu không phải là 0 điểm. Tính 0 sẽ kéo trung bình xuống sai lệch. Loại họ khỏi phép tính và ghi chú coverage (413/420 có đủ dữ liệu).",
          },
          {
            text: "Training Cost $2,400 nên xóa ngay vì chắc chắn là lỗi nhập liệu.",
            answer: false,
            explanation: "Sai — outlier cần điều tra trước, không xóa ngay. Có thể là học viên học chương trình đắt tiền thật, hoặc lỗi thừa số 0. Hỏi nguồn dữ liệu trước.",
          },
        ],
      },
      takeaway: "Chuẩn hóa tên, loại missing khỏi mẫu số, điều tra outlier — ba phản xạ làm sạch cơ bản.",
    },
    {
      id: "m7-5",
      title: "Check: Formula Challenge với dữ liệu thật",
      kind: "check",
      minutes: 2,
      objective: "Tính KPI từ số liệu tổng hợp của dataset thực hành.",
      content: [
        "Trong dataset thực hành, chương trình Coaching Skills có 120 người đăng ký, 111 người tham dự, và 104 người hoàn thành. Hãy tính Completion Rate.",
      ],
      scored: true,
      activity: {
        type: "formula",
        prompt: "Enrolled = 120, Attended = 111, Completed = 104. Completion Rate = ?",
        formulaHint: "Completed / Enrolled × 100",
        inputLabel: "Completion Rate",
        answer: 86.7,
        tolerance: 0.5,
        unit: "%",
        explanation: "Completion Rate = 104 / 120 × 100 ≈ 86.7%. Lưu ý mẫu số là số ĐĂNG KÝ (enrolled), không phải số tham dự — completion rate đo trên cam kết ban đầu.",
      },
      takeaway: "Chọn đúng mẫu số là một nửa của việc tính KPI đúng.",
    },
    {
      id: "m7-6",
      title: "Add to Portfolio: Data Quality Checklist & AI Prompt",
      kind: "portfolio",
      minutes: 2,
      objective: "Chốt checklist làm sạch và prompt phân tích cho case của bạn.",
      content: ["Lưu quy trình làm sạch dữ liệu và prompt AI bạn sẽ dùng."],
      portfolioFields: [
        {
          id: "m7-checklist",
          label: "Data Quality Checklist",
          placeholder: "Các bước kiểm tra trước khi phân tích",
          sampleValue:
            "1) Đọc Data Dictionary. 2) Đếm & xử lý duplicate Learner_ID. 3) Chuẩn hóa Department và Program name (TRIM, đúng chính tả). 4) Đánh dấu missing post-test/application — loại khỏi mẫu số, ghi coverage. 5) Kiểm tra range: điểm 0–100, thang đo 1–5. 6) Thống nhất định dạng ngày ISO. 7) Điều tra outlier Training Cost trước khi quyết định. 8) Làm việc trên bản copy, ghi log thay đổi.",
          multiline: true,
        },
        {
          id: "m7-prompt",
          label: "AI Analysis Prompt của bạn",
          placeholder: "Prompt bạn sẽ dùng với Claude cho dữ liệu của mình",
          sampleValue:
            "Bạn là learning analytics consultant. Business question: Sau chương trình Coaching Skills, tỷ lệ quản lý coaching hàng tháng có tăng không và có gắn với hiệu suất đội không? Dưới đây là bảng tổng hợp đã ẩn danh theo chương trình/khu vực: [DÁN PIVOT]. Hãy: 1) nêu 3 pattern đáng chú ý nhất; 2) so sánh application rate theo mức manager support; 3) chỉ ra những gì dữ liệu KHÔNG kết luận được; 4) đề xuất 2 phân tích tiếp theo. Dùng ngôn ngữ association, không causation.",
          multiline: true,
        },
        {
          id: "m7-insights",
          label: "Preliminary insights (2–3 quan sát đầu tiên)",
          placeholder: "Bạn nhận thấy gì từ dữ liệu?",
          sampleValue:
            "1) Application rate tăng dần qua 30→90 ngày (66%→74%) — hành vi đang bám rễ thay vì phai dần. 2) Nhóm có Manager Support ≥4 áp dụng cao hơn hẳn nhóm <3. 3) Knowledge improvement đồng đều giữa các miền nhưng application chênh lệch — vấn đề nằm ở môi trường, không phải khóa học.",
          multiline: true,
        },
      ],
      takeaway: "Bạn đã có dữ liệu sạch, KPI tính được và insight sơ bộ — sẵn sàng lên dashboard.",
    },
  ],
};
