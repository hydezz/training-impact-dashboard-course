import type { CourseModule } from "@/types/course";

export const orientation: CourseModule = {
  id: "orientation",
  order: 0,
  title: "Course Orientation: Why Training Impact Matters",
  titleVi: "Định hướng: Vì sao phải đo tác động đào tạo",
  phase: "Define",
  minutes: 5,
  description:
    "Hiểu pain point của L&D, cách khóa học vận hành, và chọn running case bạn sẽ theo suốt khóa.",
  portfolioOutput: "Thông tin chương trình đào tạo và business question ban đầu",
  steps: [
    {
      id: "or-1",
      title: "Pain point: 'Training thành công' chưa phải là tác động",
      kind: "learn",
      minutes: 1,
      objective: "Nhận diện khoảng cách giữa tổ chức đào tạo và chứng minh tác động.",
      content: [
        "Hầu hết L&D professionals có thể tổ chức một chương trình đào tạo trọn vẹn: học viên tham gia đông, khảo sát cuối khóa điểm cao, tỷ lệ hoàn thành ấn tượng. Nhưng khi lãnh đạo hỏi: 'Chương trình này đã thay đổi được gì?', nhiều người chỉ có số lớp học và số người tham dự để trả lời.",
        "Khóa học này giúp bạn chuyển từ 'training đã diễn ra thành công' sang 'training tạo ra những thay đổi nào, bằng chứng là gì, và doanh nghiệp nên làm gì tiếp theo'.",
      ],
      bullets: [
        "Số người tham gia là activity, không phải impact.",
        "Lãnh đạo quan tâm hành vi, hiệu suất và kết quả kinh doanh.",
        "Đo lường tốt bắt đầu trước khi khóa học diễn ra.",
      ],
      visual: "activity-vs-impact",
      takeaway: "Tổ chức đào tạo tốt và chứng minh tác động là hai năng lực khác nhau — khóa học này dạy năng lực thứ hai.",
    },
    {
      id: "or-2",
      title: "Sản phẩm cuối khóa: Training Impact Measurement Portfolio",
      kind: "learn",
      minutes: 1,
      objective: "Biết rõ bạn sẽ tạo ra gì sau 120 phút.",
      content: [
        "Đây là khóa học ứng dụng: mỗi module đóng góp một phần vào bộ Portfolio hoàn chỉnh mà bạn có thể dùng ngay cho chương trình đào tạo thật của mình.",
        "Portfolio gồm: Kirkpatrick Measurement Plan, Training KPI Framework, Data Collection Plan, file Excel thực hành, Learning Impact Dashboard, Key Insights, Executive Report, Action Recommendations, Data Quality Checklist và AI Prompt Pack.",
      ],
      bullets: [
        "Mỗi module kết thúc bằng một phần 'Add to Portfolio'.",
        "Final Challenge ghép các phần lại thành Executive Report.",
        "Hoàn thành đủ điều kiện sẽ nhận Certificate in Training Measurement and Learning Analytics.",
      ],
      tip: "Bạn có thể xem Portfolio bất kỳ lúc nào tại trang Portfolio trên thanh điều hướng.",
      takeaway: "Học đến đâu, xây sản phẩm thật đến đó — không có bài tập nào bị bỏ phí.",
    },
    {
      id: "or-3",
      title: "Cách học: Define → Measure → Analyze → Visualize → Explain → Recommend",
      kind: "learn",
      minutes: 1,
      objective: "Hiểu learning journey và cấu trúc microlearning của khóa học.",
      content: [
        "Khóa học đi theo đúng trình tự một dự án đo lường thật: xác định câu hỏi kinh doanh, thiết kế đo lường theo 4 cấp độ Kirkpatrick, phân tích dữ liệu bằng Excel và AI, trực quan hóa bằng dashboard, rồi diễn giải và đề xuất hành động.",
        "Mỗi module chia thành các learning step ngắn theo nhịp Learn → See an Example → Try It → Check → Add to Portfolio. Mỗi step có mục tiêu, ví dụ và key takeaway riêng.",
      ],
      bullets: [
        "Tổng thời lượng: khoảng 120 phút, chia thành 10 phần.",
        "Tiến độ được lưu tự động trên trình duyệt của bạn.",
        "Bạn có thể dừng và quay lại bằng nút Continue Learning.",
      ],
      visual: "journey-map",
      takeaway: "Bạn học theo đúng quy trình sẽ dùng ngoài đời: từ câu hỏi kinh doanh đến khuyến nghị hành động.",
    },
    {
      id: "or-4",
      title: "Chọn running case của bạn",
      kind: "portfolio",
      minutes: 2,
      objective: "Chọn case study sẽ theo bạn suốt khóa học và điền thông tin ban đầu.",
      content: [
        "Suốt khóa học, bạn sẽ áp dụng mọi kỹ thuật vào một chương trình đào tạo cụ thể. Bạn có thể dùng sample case (khuyến nghị cho lần học đầu) hoặc chương trình thật của tổ chức bạn.",
        "Sample case: một công ty triển khai chương trình Coaching Skills cho 120 Frontline Managers. Ban lãnh đạo muốn biết chương trình có thực sự cải thiện chất lượng coaching, hiệu suất nhân viên và kết quả vận hành hay không.",
      ],
      special: "case-setup",
      portfolioFields: [
        {
          id: "case-program",
          label: "Training program name",
          placeholder: "Tên chương trình đào tạo",
          sampleValue: "Coaching Skills for Frontline Managers",
        },
        {
          id: "case-context",
          label: "Business context",
          placeholder: "Bối cảnh kinh doanh: vấn đề gì khiến chương trình này ra đời?",
          sampleValue:
            "Khảo sát nhân viên cho thấy 61% frontline staff không nhận được coaching định kỳ; turnover ở nhóm này cao hơn trung bình 8 điểm phần trăm và hiệu suất vận hành không đồng đều giữa các khu vực.",
          multiline: true,
        },
        {
          id: "case-learners",
          label: "Target learners",
          placeholder: "Ai là người học?",
          sampleValue: "120 Frontline Managers thuộc 3 miền, quản lý trực tiếp 8–15 nhân viên mỗi người.",
        },
        {
          id: "case-objective",
          label: "Training objective ban đầu",
          placeholder: "Chương trình muốn thay đổi điều gì?",
          sampleValue:
            "Trang bị kỹ năng coaching có cấu trúc để mỗi quản lý thực hiện coaching hàng tháng cho từng nhân viên, từ đó cải thiện hiệu suất và giữ chân đội ngũ.",
          multiline: true,
        },
        {
          id: "case-question",
          label: "Business question cần trả lời (bản nháp)",
          placeholder: "Lãnh đạo muốn biết điều gì? (bạn sẽ tinh chỉnh câu này ở Module 1)",
          sampleValue:
            "Chương trình Coaching Skills có làm tăng tỷ lệ quản lý coaching hàng tháng không, và thay đổi đó có gắn với cải thiện hiệu suất đội ngũ không?",
          multiline: true,
        },
      ],
      takeaway: "Một case cụ thể ngay từ đầu giúp mọi module sau đều có 'đất' để áp dụng.",
    },
  ],
};
