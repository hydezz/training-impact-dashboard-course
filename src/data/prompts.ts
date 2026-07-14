export interface PromptTemplate {
  id: string;
  name: string;
  purpose: string;
  useWhen: string;
  prompt: string;
  variables: string[];
  exampleOutput: string;
  checklist: string[];
  category: "Define" | "Measure" | "Analyze" | "Visualize" | "Explain" | "Recommend";
}

export const promptLibrary: PromptTemplate[] = [
  {
    id: "p1",
    name: "Business Question Clarification Prompt",
    purpose: "Biến một yêu cầu đo lường mơ hồ thành measurement question rõ ràng.",
    useWhen: "Khi stakeholder nói 'hãy đo hiệu quả khóa học' mà chưa rõ họ cần quyết định gì.",
    prompt: `Bạn là learning analytics consultant. Tôi cần làm rõ câu hỏi đo lường cho một chương trình đào tạo.

Chương trình: [TÊN CHƯƠNG TRÌNH]
Đối tượng: [ĐỐI TƯỢNG HỌC]
Vấn đề kinh doanh đằng sau: [MÔ TẢ VẤN ĐỀ]
Người cần câu trả lời: [STAKEHOLDER] — họ sẽ dùng nó để quyết định: [QUYẾT ĐỊNH]

Hãy: 1) đặt cho tôi 5 câu hỏi làm rõ theo khung: business problem, expected performance, current performance, target behavior, desired business result; 2) đề xuất 3 phiên bản measurement question theo công thức "Sau [chương trình], [hành vi] có [thay đổi đo được] không, và có gắn với [kết quả kinh doanh] không?"; 3) chỉ ra phiên bản nào trả lời được bằng dữ liệu sẵn có.`,
    variables: ["TÊN CHƯƠNG TRÌNH", "ĐỐI TƯỢNG HỌC", "MÔ TẢ VẤN ĐỀ", "STAKEHOLDER", "QUYẾT ĐỊNH"],
    exampleOutput:
      "3 phiên bản measurement question xếp theo độ khả thi, kèm 5 câu hỏi làm rõ để mang vào cuộc họp với sponsor.",
    checklist: ["Câu hỏi cuối có nêu hành vi cụ thể?", "Có thể trả lời bằng một con số/biểu đồ?", "Gắn với quyết định của stakeholder?"],
    category: "Define",
  },
  {
    id: "p2",
    name: "Kirkpatrick Measurement Planning Prompt",
    purpose: "Dựng khung đo lường 4 cấp độ hoàn chỉnh cho một chương trình.",
    useWhen: "Sau khi đã có business question, cần bản Measurement Plan đầu tiên nhanh.",
    prompt: `Bạn là chuyên gia đo lường đào tạo theo mô hình Kirkpatrick. Hãy lập Measurement Plan 4 cấp độ cho:

Chương trình: [TÊN + MÔ TẢ NGẮN]
Business question: [CÂU HỎI ĐO LƯỜNG]
Target behavior: [HÀNH VI MỤC TIÊU]
Nguồn dữ liệu sẵn có: [LMS/KHẢO SÁT/HỆ THỐNG VẬN HÀNH...]

Với mỗi cấp độ (1-Reaction, 2-Learning, 3-Behavior, 4-Results), đề xuất: điều cần đo, 2-3 KPI kèm công thức, nguồn dữ liệu, thời điểm thu thập, target gợi ý, và 1 giới hạn cần lưu ý. Trình bày dạng bảng. Ưu tiên phương án khả thi với nguồn lực L&D thông thường.`,
    variables: ["TÊN + MÔ TẢ NGẮN", "CÂU HỎI ĐO LƯỜNG", "HÀNH VI MỤC TIÊU", "NGUỒN DỮ LIỆU"],
    exampleOutput: "Bảng 4 hàng (L1–L4) × 6 cột: measure, KPI + công thức, nguồn, thời điểm, target, giới hạn.",
    checklist: ["Level 3 có ít nhất 2 nguồn bằng chứng?", "Level 4 metric nối logic với target behavior?", "Mỗi cấp độ có giới hạn được nêu?"],
    category: "Define",
  },
  {
    id: "p3",
    name: "Level 1 Survey Design Prompt",
    purpose: "Thiết kế khảo sát Level 1 vượt qua 'happy sheet'.",
    useWhen: "Trước khi chốt khảo sát cuối khóa.",
    prompt: `Thiết kế khảo sát Level 1 (tối đa 8 câu) cho chương trình [TÊN CHƯƠNG TRÌNH] dành cho [ĐỐI TƯỢNG].

Yêu cầu: đo đủ 5 chiều — satisfaction, relevance, engagement, confidence, intention to apply. Mỗi câu chỉ đo MỘT ý (không double-barreled). Relevance và confidence phải gắn với hành vi cụ thể: [TARGET BEHAVIOR]. Thêm 1 câu mở tùy chọn về rào cản áp dụng. Với mỗi câu, ghi rõ: chiều đo, thang đo, và ngưỡng 'đạt' gợi ý.`,
    variables: ["TÊN CHƯƠNG TRÌNH", "ĐỐI TƯỢNG", "TARGET BEHAVIOR"],
    exampleOutput: "8 câu khảo sát phân theo 5 chiều đo, kèm thang đo và success criteria từng câu.",
    checklist: ["Không câu nào gộp 2 ý?", "Có câu intention to apply với mốc thời gian?", "Tổng ≤8 câu?"],
    category: "Measure",
  },
  {
    id: "p4",
    name: "Level 2 Assessment Design Prompt",
    purpose: "Thiết kế pre/post assessment khớp với learning objectives.",
    useWhen: "Khi xây bài kiểm tra trước–sau cho chương trình.",
    prompt: `Bạn là chuyên gia thiết kế đánh giá học tập. Learning objectives của chương trình:
[DANH SÁCH OBJECTIVES — mỗi dòng một objective với động từ rõ ràng]

Hãy: 1) với mỗi objective, chỉ ra loại assessment hợp lệ (quiz kiến thức / scenario-based / skill demonstration với rubric) và giải thích vì sao; 2) viết 3 câu hỏi scenario-based mẫu cho objective quan trọng nhất; 3) đề xuất cấu trúc pre-test và post-test tương đương nhau (không trùng câu nhưng cùng độ khó); 4) cảnh báo những cách mà bài test này có thể cho điểm cao giả tạo.`,
    variables: ["DANH SÁCH OBJECTIVES"],
    exampleOutput: "Ma trận objective → loại assessment, 3 câu scenario mẫu, thiết kế pre/post song song.",
    checklist: ["Động từ objective khớp loại assessment?", "Pre và post tương đương độ khó?", "Có rubric cho phần kỹ năng?"],
    category: "Measure",
  },
  {
    id: "p5",
    name: "Level 3 Behavior Observation Prompt",
    purpose: "Xây checklist quan sát hành vi cho manager.",
    useWhen: "Khi cần manager tham gia đánh giá application mà chưa có công cụ.",
    prompt: `Tạo Behavior Observation Checklist cho manager để đánh giá nhân viên sau chương trình [TÊN CHƯƠNG TRÌNH].

Target behavior: [HÀNH VI MỤC TIÊU]
Bối cảnh quan sát: [KHI NÀO MANAGER CÓ THỂ QUAN SÁT]

Yêu cầu: 5-7 observable indicators (hành vi nhìn thấy được, không phải phẩm chất); thang đánh giá 1-5 với mô tả hành vi cụ thể cho mức 1, 3, 5; hướng dẫn 5 dòng cho manager về cách quan sát công bằng (tránh halo effect, quan sát ít nhất 2 lần); và 2 câu hỏi về enablers/barriers manager nhận thấy.`,
    variables: ["TÊN CHƯƠNG TRÌNH", "HÀNH VI MỤC TIÊU", "KHI NÀO MANAGER CÓ THỂ QUAN SÁT"],
    exampleOutput: "Checklist 5-7 indicators + rubric 3 mốc + hướng dẫn quan sát + câu hỏi barrier.",
    checklist: ["Mọi indicator đều quan sát được?", "Rubric có mô tả hành vi từng mức?", "Có phần barriers?"],
    category: "Measure",
  },
  {
    id: "p6",
    name: "Level 4 Business Metric Mapping Prompt",
    purpose: "Nối target behavior với business metrics hợp lý.",
    useWhen: "Khi chưa rõ chương trình nên gắn với chỉ số kinh doanh nào.",
    prompt: `Bạn là consultant về đo lường hiệu quả đào tạo. Giúp tôi nối chương trình với business metrics.

Chương trình: [TÊN]
Target behavior: [HÀNH VI]
Bộ phận/chức năng: [PHÒNG BAN]
Các chỉ số doanh nghiệp đang theo dõi: [LIỆT KÊ METRICS SẴN CÓ]

Hãy: 1) vẽ chuỗi logic behavior → kết quả trung gian → business metric (nêu rõ từng giả định trong chuỗi); 2) phân loại metrics thành leading và lagging; 3) chỉ ra metric nào KHÔNG nên hứa với lãnh đạo vì quá xa hành vi; 4) liệt kê các yếu tố ngoài đào tạo cùng tác động lên từng metric.`,
    variables: ["TÊN", "HÀNH VI", "PHÒNG BAN", "METRICS SẴN CÓ"],
    exampleOutput: "Sơ đồ chuỗi logic + bảng leading/lagging + danh sách yếu tố nhiễu cho từng metric.",
    checklist: ["Mỗi mũi tên trong chuỗi có giả định được nêu?", "Có cả leading lẫn lagging?", "Yếu tố ngoài đào tạo được liệt kê?"],
    category: "Measure",
  },
  {
    id: "p7",
    name: "Training KPI Selection Prompt",
    purpose: "Chọn bộ KPI cân bằng 5-9 chỉ số cho chương trình.",
    useWhen: "Khi danh sách KPI tiềm năng quá dài và cần thu gọn.",
    prompt: `Từ danh sách KPI tiềm năng sau: [DANH SÁCH KPI], hãy chọn ra bộ 5-9 KPI cân bằng cho executive dashboard của chương trình [TÊN CHƯƠNG TRÌNH].

Business question: [CÂU HỎI ĐO LƯỜNG]

Yêu cầu: bộ KPI phải phủ đủ activity → learning → behavior → business + ít nhất 1 efficiency metric; loại bỏ vanity metrics và giải thích vì sao từng cái bị loại; với mỗi KPI được chọn, nêu 1 câu: nó giúp stakeholder quyết định điều gì.`,
    variables: ["DANH SÁCH KPI", "TÊN CHƯƠNG TRÌNH", "CÂU HỎI ĐO LƯỜNG"],
    exampleOutput: "Bộ KPI cuối + lý do loại từng vanity metric + giá trị quyết định của từng KPI giữ lại.",
    checklist: ["Đủ 4 nhóm Kirkpatrick + efficiency?", "≤9 KPI?", "Mỗi KPI nối được với một quyết định?"],
    category: "Measure",
  },
  {
    id: "p8",
    name: "KPI Definition Prompt",
    purpose: "Viết định nghĩa KPI chuẩn để hai người tính ra cùng một số.",
    useWhen: "Khi KPI đã chọn nhưng chưa có định nghĩa vận hành.",
    prompt: `Viết KPI definition đầy đủ cho: [TÊN KPI] trong bối cảnh chương trình [TÊN CHƯƠNG TRÌNH].

Cấu trúc bắt buộc: 1) Định nghĩa một câu; 2) Công thức chính xác (nêu rõ tử số, mẫu số, cách xử lý dữ liệu thiếu); 3) Nguồn dữ liệu; 4) Tần suất báo cáo; 5) Target và ngưỡng cảnh báo; 6) Owner; 7) Cách diễn giải (khi nào con số này là tin tốt/xấu); 8) Giới hạn (con số này KHÔNG nói lên điều gì).

Sau đó tự kiểm tra: hai analyst đọc định nghĩa này có thể tính ra hai con số khác nhau ở điểm nào không?`,
    variables: ["TÊN KPI", "TÊN CHƯƠNG TRÌNH"],
    exampleOutput: "KPI definition 8 phần + phân tích điểm mơ hồ còn sót.",
    checklist: ["Mẫu số được định nghĩa rõ?", "Cách xử lý missing data được nêu?", "Có phần giới hạn?"],
    category: "Measure",
  },
  {
    id: "p9",
    name: "Data Quality Audit Prompt",
    purpose: "Rà soát chất lượng dữ liệu trước khi phân tích.",
    useWhen: "Ngay sau khi nhận bất kỳ dataset đào tạo nào, trước mọi phép tính.",
    prompt: `Bạn là data quality analyst. Đây là mô tả cột và 20 dòng mẫu (đã ẩn danh) từ dataset đào tạo của tôi:

[DÁN DANH SÁCH CỘT + 20 DÒNG MẪU ĐÃ ẨN DANH]

Kiểm tra: duplicate ID, tên phòng ban/chương trình không nhất quán, giá trị thiếu, điểm vượt thang đo, định dạng ngày lẫn lộn, outlier chi phí. Với mỗi vấn đề tìm thấy: ví dụ cụ thể, rủi ro nếu không xử lý (KPI nào sẽ méo, méo theo hướng nào), và cách xử lý đề xuất trong Excel. Kết thúc bằng cleaning checklist xếp theo mức ưu tiên.`,
    variables: ["DANH SÁCH CỘT + 20 DÒNG MẪU"],
    exampleOutput: "Báo cáo audit theo từng loại lỗi + cleaning checklist ưu tiên hóa.",
    checklist: ["Dữ liệu đã ẩn danh trước khi dán?", "Mỗi lỗi có nêu KPI bị ảnh hưởng?", "Checklist có thứ tự ưu tiên?"],
    category: "Analyze",
  },
  {
    id: "p10",
    name: "Excel Formula Recommendation Prompt",
    purpose: "Nhận công thức Excel chính xác cho từng KPI.",
    useWhen: "Khi biết KPI cần tính nhưng chưa chắc công thức Excel.",
    prompt: `Tôi có sheet Excel 'Learner Records' với các cột: [DÁN TÊN CỘT].

Viết công thức Excel (AVERAGEIFS/COUNTIFS, không VBA) để tính: [DANH SÁCH KPI CẦN TÍNH, ví dụ: Participation Rate theo chương trình; Knowledge Improvement % theo phòng ban; Application Rate 90 ngày theo khu vực].

Với mỗi công thức: giải thích từng phần bằng ngôn ngữ thường; chỉ rõ cách công thức xử lý ô trống để không méo kết quả; và một cách kiểm tra chéo nhanh (sanity check) xem kết quả có hợp lý không.`,
    variables: ["TÊN CỘT", "DANH SÁCH KPI CẦN TÍNH"],
    exampleOutput: "Công thức từng KPI + giải thích + cách xử lý blank + sanity check.",
    checklist: ["Công thức loại ô trống khỏi mẫu số?", "Có sanity check?", "Hiểu được từng phần công thức?"],
    category: "Analyze",
  },
  {
    id: "p11",
    name: "Training Data Analysis Prompt",
    purpose: "Tìm pattern đáng chú ý trong dữ liệu đã làm sạch.",
    useWhen: "Sau khi dữ liệu sạch và KPI cơ bản đã tính xong.",
    prompt: `Bạn là learning analytics consultant. Business question: [CÂU HỎI ĐO LƯỜNG].

Dưới đây là bảng tổng hợp đã ẩn danh (theo chương trình / phòng ban / khu vực / mức manager support): [DÁN PIVOT SUMMARY]

Hãy: 1) nêu 3 pattern đáng chú ý nhất xét theo mức độ liên quan đến quyết định; 2) so sánh các phân khúc và chỉ ra khác biệt lớn nhất; 3) phân tích quan hệ giữa manager support và application rate; 4) nêu rõ những gì dữ liệu này KHÔNG kết luận được; 5) đề xuất 2 phân tích tiếp theo. Dùng ngôn ngữ association/contribution, tuyệt đối không causation khi chưa có control group.`,
    variables: ["CÂU HỎI ĐO LƯỜNG", "PIVOT SUMMARY"],
    exampleOutput: "3 patterns xếp hạng + so sánh phân khúc + giới hạn + 2 phân tích tiếp theo.",
    checklist: ["Pattern gắn với business question?", "Có phần 'không kết luận được'?", "Không có tuyên bố nhân quả trần?"],
    category: "Analyze",
  },
  {
    id: "p12",
    name: "Dashboard Design Prompt",
    purpose: "Thiết kế layout dashboard trước khi dựng.",
    useWhen: "Trước khi xây dashboard trong Excel/BI tool.",
    prompt: `Thiết kế executive Learning Impact Dashboard cho: [TÊN CHƯƠNG TRÌNH].
Business question: [CÂU HỎI]. KPI đã chọn: [DANH SÁCH KPI]. Người xem: [STAKEHOLDER].

Đề xuất: 1) 5-7 KPI cards hàng đầu và thứ tự sắp xếp; 2) 5-8 charts — với mỗi chart: loại chart, vì sao loại đó, và insight title mẫu (title là một câu có thông điệp, không phải tên metric); 3) bộ filters cần có; 4) nội dung insight panel; 5) những bẫy trực quan cần tránh với dữ liệu này (trục cắt, pie nhiều mảnh...).`,
    variables: ["TÊN CHƯƠNG TRÌNH", "CÂU HỎI", "DANH SÁCH KPI", "STAKEHOLDER"],
    exampleOutput: "Bản thiết kế dashboard: cards, charts với insight titles, filters, insight panel.",
    checklist: ["Mỗi chart có insight title mẫu?", "Loại chart khớp loại câu hỏi?", "Có danh sách bẫy trực quan?"],
    category: "Visualize",
  },
  {
    id: "p13",
    name: "Insight Writing Prompt",
    purpose: "Chuyển số liệu thành câu insight cho lãnh đạo.",
    useWhen: "Khi có kết quả phân tích nhưng chưa thành thông điệp.",
    prompt: `Chuyển các phát hiện sau thành executive insights: [DÁN CÁC PHÁT HIỆN DẠNG SỐ LIỆU]

Quy tắc: mỗi insight gồm 1 câu WHAT (dữ liệu cho thấy gì, có con số) + 1 câu SO WHAT (nghĩa là gì với doanh nghiệp). Không thuật ngữ chuyên môn. Không tuyên bố nhân quả khi không có control group — dùng 'gắn với', 'đóng góp vào'. Xếp 3 insight quan trọng nhất theo thứ tự ưu tiên cho [STAKEHOLDER], và giải thích vì sao xếp vậy.`,
    variables: ["CÁC PHÁT HIỆN", "STAKEHOLDER"],
    exampleOutput: "Top 3 insights định dạng WHAT + SO WHAT, xếp theo mức liên quan đến quyết định.",
    checklist: ["Mỗi insight có con số?", "Có SO WHAT rõ ràng?", "Ngôn ngữ thận trọng về nhân quả?"],
    category: "Explain",
  },
  {
    id: "p14",
    name: "Executive Report Prompt",
    purpose: "Soạn báo cáo tác động một trang cho management.",
    useWhen: "Khi cần bản nháp executive report nhanh từ kết quả đã có.",
    prompt: `Soạn executive training impact report MỘT TRANG (tối đa 350 từ).

Bối cảnh: [CHƯƠNG TRÌNH, ĐỐI TƯỢNG, MỤC TIÊU]
Kết quả KPI: [KẾT QUẢ SO VỚI TARGET]
Giới hạn dữ liệu: [GIỚI HẠN]

Cấu trúc: What happened (kết quả chính) / Why it matters (ý nghĩa kinh doanh + giới hạn nêu trung thực) / What we should do next (3 khuyến nghị, mỗi cái có owner và thời hạn). Giọng văn: tự tin nhưng trung thực về giới hạn. Kết thúc bằng next measurement step và quyết định nó sẽ hỗ trợ.`,
    variables: ["CHƯƠNG TRÌNH, ĐỐI TƯỢNG, MỤC TIÊU", "KẾT QUẢ SO VỚI TARGET", "GIỚI HẠN"],
    exampleOutput: "Báo cáo 350 từ theo 3 nhịp, 3 khuyến nghị có owner.",
    checklist: ["≤350 từ?", "Limitations có mặt và trung thực?", "Mỗi khuyến nghị có owner?"],
    category: "Explain",
  },
  {
    id: "p15",
    name: "Action Recommendation Prompt",
    purpose: "Biến insight thành khuyến nghị hành động cụ thể.",
    useWhen: "Khi insight đã rõ nhưng khuyến nghị còn chung chung.",
    prompt: `Từ các insight sau: [DÁN INSIGHTS], đề xuất khuyến nghị hành động cho [TÊN CHƯƠNG TRÌNH].

Yêu cầu với mỗi khuyến nghị: hành động cụ thể (không phải 'nên cải thiện...'); owner đề xuất; thời hạn; chi phí/nỗ lực ước lượng (thấp/vừa/cao); và chỉ số sẽ chứng minh khuyến nghị có tác dụng. Chia thành: hành động ngay (30 ngày), trung hạn (quý), và điều kiện để nhân rộng chương trình. Tối đa 5 khuyến nghị — ưu tiên tác động/nỗ lực tốt nhất.`,
    variables: ["INSIGHTS", "TÊN CHƯƠNG TRÌNH"],
    exampleOutput: "≤5 khuyến nghị phân theo thời gian, mỗi cái có owner + thời hạn + chỉ số kiểm chứng.",
    checklist: ["Không có khuyến nghị chung chung?", "Mỗi cái có owner + deadline?", "Có chỉ số kiểm chứng?"],
    category: "Recommend",
  },
  {
    id: "p16",
    name: "Correlation and Causation Review Prompt",
    purpose: "Kiểm tra báo cáo trước khi gửi để loại tuyên bố nhân quả thiếu cơ sở.",
    useWhen: "Bước rà soát cuối trước khi gửi bất kỳ báo cáo tác động nào.",
    prompt: `Bạn là reviewer khó tính về phương pháp. Đọc bản nháp báo cáo sau: [DÁN BÁO CÁO]

Nhiệm vụ: 1) gạch ra mọi câu tuyên bố hoặc ngụ ý nhân quả (kể cả ngầm định qua từ 'nhờ', 'tạo ra', 'giúp tăng'); 2) với mỗi câu, đánh giá bằng chứng hiện có đủ mạnh chưa (có control group? có so sánh nhóm? có loại yếu tố nhiễu?); 3) viết lại các câu chưa đủ cơ sở bằng ngôn ngữ association/contribution; 4) liệt kê các cách giải thích thay thế cho kết quả mà báo cáo chưa đề cập.`,
    variables: ["BÁO CÁO"],
    exampleOutput: "Danh sách câu có vấn đề + bản viết lại + các giải thích thay thế bị bỏ sót.",
    checklist: ["Đã quét cả từ ngụ ý nhân quả?", "Bản viết lại vẫn giữ được thông điệp?", "Giải thích thay thế được ghi nhận?"],
    category: "Explain",
  },
  {
    id: "p17",
    name: "Management Presentation Prompt",
    purpose: "Chuẩn bị bài trình bày kết quả 10 phút trước lãnh đạo.",
    useWhen: "Khi được mời trình bày kết quả đo lường tại cuộc họp quản lý.",
    prompt: `Giúp tôi chuẩn bị trình bày 10 phút về kết quả đo lường chương trình [TÊN] trước [ĐỐI TƯỢNG NGHE].

Nội dung nguồn: [DÁN EXECUTIVE REPORT]

Hãy tạo: 1) cấu trúc 5 slide (mỗi slide: tiêu đề dạng thông điệp + 3 bullet + biểu đồ/hình gợi ý); 2) opening 30 giây bắt đầu bằng con số đắt giá nhất; 3) 5 câu hỏi khó nhất lãnh đạo có thể hỏi (đặc biệt về nhân quả và chi phí) kèm câu trả lời gợi ý trung thực; 4) một câu chốt đề nghị quyết định cụ thể.`,
    variables: ["TÊN", "ĐỐI TƯỢNG NGHE", "EXECUTIVE REPORT"],
    exampleOutput: "Outline 5 slide + opening + Q&A khó + câu chốt xin quyết định.",
    checklist: ["Slide title là thông điệp?", "Có chuẩn bị cho câu hỏi nhân quả?", "Kết thúc bằng đề nghị quyết định?"],
    category: "Recommend",
  },
  {
    id: "p18",
    name: "Full Training Impact Analysis Master Prompt",
    purpose: "Prompt tổng hợp để tiếp tục toàn bộ phân tích trong Claude.",
    useWhen: "Khi hoàn thành khóa học và muốn Claude đồng hành phân tích chương trình thật.",
    prompt: `Bạn là learning analytics partner của tôi. Chúng ta sẽ phân tích tác động một chương trình đào tạo theo Kirkpatrick.

BỐI CẢNH
- Chương trình: [TÊN] cho [ĐỐI TƯỢNG], mục tiêu: [MỤC TIÊU]
- Business question: [CÂU HỎI ĐO LƯỜNG]
- Target behavior: [HÀNH VI MỤC TIÊU]

MEASUREMENT PLAN
- Level 1: [KPI, target] | Level 2: [KPI, baseline, target] | Level 3: [KPI, mốc 30/60/90] | Level 4: [metric, baseline, target]

DỮ LIỆU CHÍNH (đã ẩn danh)
[DÁN KẾT QUẢ KPI VÀ PIVOT SUMMARY]

GIỚI HẠN ĐÃ BIẾT
[GIỚI HẠN: coverage, self-report, yếu tố ngoài...]

Nhiệm vụ của bạn: 1) chất vấn cách diễn giải của tôi — tìm lỗ hổng logic; 2) đưa các giải thích thay thế cho kết quả; 3) giúp tôi mài sắc top-3 insights theo định dạng WHAT + SO WHAT; 4) soạn khuyến nghị có owner; 5) thiết kế chu kỳ đo lường tiếp theo. Thách thức mọi tuyên bố nhân quả yếu của tôi. Bắt đầu bằng 3 câu hỏi làm rõ quan trọng nhất.`,
    variables: ["TÊN", "ĐỐI TƯỢNG", "MỤC TIÊU", "CÂU HỎI ĐO LƯỜNG", "HÀNH VI MỤC TIÊU", "KPI/BASELINE/TARGET các cấp", "KẾT QUẢ KPI", "GIỚI HẠN"],
    exampleOutput: "Phiên làm việc phân tích hoàn chỉnh: chất vấn, giải thích thay thế, insights, khuyến nghị, chu kỳ đo tiếp theo.",
    checklist: ["Đã điền đủ các biến?", "Dữ liệu đã ẩn danh?", "Sẵn sàng bị thách thức về nhân quả?"],
    category: "Recommend",
  },
];
