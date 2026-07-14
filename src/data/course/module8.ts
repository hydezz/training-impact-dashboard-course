import type { CourseModule } from "@/types/course";

export const module8: CourseModule = {
  id: "m8",
  order: 8,
  title: "Build the Learning Impact Dashboard",
  titleVi: "Xây dựng Learning Impact Dashboard",
  phase: "Visualize",
  minutes: 10,
  description:
    "Thiết kế dashboard trả lời đúng business question: chọn chart phù hợp, viết title theo insight, và khám phá dashboard tương tác của khóa học.",
  portfolioOutput: "Dashboard configuration: KPI cards, charts, và cách diễn giải",
  steps: [
    {
      id: "m8-1",
      title: "Dashboard phải trả lời câu hỏi, không trưng bày dữ liệu",
      kind: "learn",
      minutes: 2,
      objective: "Phân biệt executive dashboard và operational dashboard.",
      content: [
        "Executive dashboard trả lời business question trong 30 giây: tác động có xảy ra không, ở đâu, và cần làm gì. Operational dashboard phục vụ L&D vận hành hằng ngày: lớp nào sắp chạy, ai chưa hoàn thành. Trộn hai loại này là lý do phổ biến nhất khiến dashboard bị lãnh đạo bỏ qua.",
        "Cấu trúc executive dashboard tốt theo visual hierarchy: KPI cards trên cùng (kết quả tổng), charts ở giữa (so sánh và xu hướng), insight text ở cạnh (ý nghĩa).",
      ],
      bullets: [
        "Trên cùng: 5–9 KPI cards so với target.",
        "Giữa: charts trả lời 'ở đâu tốt, ở đâu chưa'.",
        "Insight panel: điều dữ liệu muốn nói, bằng chữ.",
      ],
      visual: "dashboard-anatomy",
      takeaway: "Nếu lãnh đạo nhìn 30 giây mà chưa thấy câu trả lời, dashboard chưa đạt.",
    },
    {
      id: "m8-2",
      title: "Chọn chart đúng và tránh biểu đồ gây hiểu nhầm",
      kind: "learn",
      minutes: 2,
      objective: "Chọn loại chart theo loại câu hỏi và giữ tính trung thực thị giác.",
      content: [
        "Mỗi loại câu hỏi có loại chart phù hợp: so sánh giữa các nhóm → bar chart; thay đổi theo thời gian → line chart; before/after → grouped bar; cơ cấu phần trăm → stacked bar (hạn chế pie chart khi có hơn 3 phần).",
        "Tính trung thực thị giác quan trọng hơn vẻ đẹp: trục Y bắt đầu từ 0 với bar chart, không cắt trục để phóng đại khác biệt, không dùng 3D, và luôn ghi rõ mẫu số (n=?).",
      ],
      bullets: [
        "So sánh nhóm → bar. Xu hướng → line. Trước/sau → grouped bar.",
        "Chart title nên là insight: 'Application tăng dần sau 90 ngày' thay vì 'Application Rate Chart'.",
        "Trục bị cắt là cách phổ biến nhất để nói dối bằng biểu đồ — kể cả vô tình.",
      ],
      tip: "Viết title như một câu có chủ ngữ vị ngữ. Nếu title chỉ là tên metric, người xem phải tự đoán thông điệp.",
      takeaway: "Chart tốt = đúng loại + title có thông điệp + trục trung thực.",
    },
    {
      id: "m8-3",
      title: "Try It: Chọn chart cho từng câu hỏi",
      kind: "activity",
      minutes: 2,
      objective: "Ghép loại chart với câu hỏi phân tích.",
      content: ["Ghép mỗi câu hỏi phân tích với loại chart phù hợp nhất."],
      activity: {
        type: "matching",
        intro: "Câu hỏi này nên trả lời bằng chart nào?",
        pairs: [
          {
            left: "Điểm pre-test và post-test khác nhau thế nào ở từng chương trình?",
            right: "Grouped bar chart (2 cột cạnh nhau mỗi chương trình)",
          },
          {
            left: "Application rate thay đổi ra sao qua các mốc 30, 60, 90 ngày?",
            right: "Line chart theo 3 mốc thời gian",
          },
          {
            left: "Phòng ban nào có knowledge improvement cao nhất?",
            right: "Bar chart xếp hạng theo phòng ban",
          },
          {
            left: "Business impact tích lũy qua các quý có xu hướng gì?",
            right: "Line/area chart theo quý",
          },
        ],
      },
      takeaway: "Bắt đầu từ câu hỏi, chart tự chọn ra nó.",
    },
    {
      id: "m8-4",
      title: "Check: Kiến thức dashboard",
      kind: "check",
      minutes: 1,
      objective: "Kiểm tra tư duy thiết kế dashboard.",
      content: ["Chọn đáp án đúng nhất."],
      scored: true,
      activity: {
        type: "single-choice",
        question: "Chart title nào theo phong cách 'insight title' đúng nghĩa?",
        options: [
          {
            text: "'Biểu đồ Application Rate'",
            correct: false,
            explanation: "Đây là tên metric, không phải thông điệp — người xem phải tự tìm insight.",
          },
          {
            text: "'Hình 3'",
            correct: false,
            explanation: "Không mang thông tin nào.",
          },
          {
            text: "'Tỷ lệ áp dụng coaching tăng từ 66% lên 74% sau 90 ngày — hành vi đang bám rễ'",
            correct: true,
            explanation: "Đúng! Title nêu con số, xu hướng và ý nghĩa — người xem hiểu thông điệp trước cả khi đọc chart.",
          },
          {
            text: "'DATA: application_rate_30_60_90_v2_final'",
            correct: false,
            explanation: "Tên file kỹ thuật không bao giờ nên xuất hiện trên dashboard.",
          },
        ],
      },
      takeaway: "Title tốt làm 80% công việc truyền đạt — chart chỉ minh họa cho nó.",
    },
    {
      id: "m8-5",
      title: "Khám phá Learning Impact Dashboard",
      kind: "activity",
      minutes: 2,
      objective: "Sử dụng dashboard tương tác với dữ liệu thực hành.",
      content: [
        "Giờ hãy mở Learning Impact Dashboard của khóa học (menu Dashboard) — được xây từ chính dữ liệu 420 học viên bạn đã tải về. Dashboard có 7 KPI cards, 8 charts, 8 filters và insight panel cập nhật theo filter.",
        "Nhiệm vụ khám phá: lọc theo chương trình Coaching Skills, sau đó lọc tiếp theo từng miền. Quan sát KPI cards và insight panel thay đổi.",
      ],
      activity: {
        type: "checklist",
        intro: "Hoàn thành các nhiệm vụ khám phá sau trên trang Dashboard (mở tab mới), rồi đánh dấu:",
        items: [
          "Lọc theo Training Program = Coaching Skills và đọc 7 KPI cards",
          "So sánh Application Rate 30/60/90 ngày trên chart số 4",
          "Lọc theo từng Region và tìm miền có Performance Improvement thấp nhất",
          "Đọc Insight Panel và đối chiếu với con số trên chart",
          "Bấm Reset Filters để trở về toàn cảnh",
        ],
        minChecked: 5,
        completionNote: "Tuyệt! Bạn đã trải nghiệm đúng cách một stakeholder sẽ dùng dashboard của bạn.",
      },
      takeaway: "Filter + insight panel biến dashboard từ báo cáo tĩnh thành công cụ trả lời câu hỏi.",
    },
    {
      id: "m8-6",
      title: "Add to Portfolio: Dashboard Configuration",
      kind: "portfolio",
      minutes: 1,
      objective: "Ghi lại cấu hình dashboard cho case của bạn.",
      content: ["Chốt danh sách KPI cards, charts và cách diễn giải dashboard của bạn."],
      portfolioFields: [
        {
          id: "m8-config",
          label: "Dashboard configuration (KPI cards + charts đã chọn)",
          placeholder: "Liệt kê KPI cards và charts cho dashboard của bạn",
          sampleValue:
            "KPI cards: Participation, Completion, Knowledge Improvement, Application Rate 90d, Performance Improvement, Cost per Learner, Business Impact Value. Charts: 1) Participation & Completion theo chương trình 2) Pre vs Post theo chương trình 3) Knowledge Improvement theo phòng ban 4) Application 30/60/90 5) Performance Improvement theo BU 6) Cost theo chương trình 7) Business Impact theo quý 8) Kirkpatrick summary.",
          multiline: true,
        },
        {
          id: "m8-interpretation",
          label: "Dashboard interpretation (đọc dashboard này như thế nào?)",
          placeholder: "Hướng dẫn 3–4 câu cho người xem lần đầu",
          sampleValue:
            "Đọc từ trên xuống: KPI cards cho biết chương trình đạt/chưa đạt target. Chart 2 và 4 là chuỗi bằng chứng chính: học được → làm được. Chart 5 chỉ ra khu vực cần can thiệp. Insight panel tóm tắt thông điệp — mọi kết luận dùng ngôn ngữ contribution, không causation.",
          multiline: true,
        },
      ],
      takeaway: "Dashboard của bạn đã có thiết kế — Final Challenge sẽ chuyển nó thành câu chuyện cho lãnh đạo.",
    },
  ],
};
