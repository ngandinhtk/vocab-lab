import supabase from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const allowedProgressStatuses = new Set(['not-started', 'in-progress', 'completed']);

function mapLessonProgressRow(row) {
  return {
    lessonId: row.lesson_id,
    status: row.status || (row.completed_at ? 'completed' : 'in-progress'),
    updatedAt: row.updated_at || row.completed_at || row.last_review || null
  };
}

function normalizeProgressMap(rows = []) {
  return rows.reduce((acc, row) => {
    acc[row.lessonId] = row;
    return acc;
  }, {});
}

function buildReadingPractice(lesson) {
  const vocabulary = lesson.vocabulary || [];
  const kanji = lesson.kanji || [];
  const firstVocab = vocabulary[0];
  const secondVocab = vocabulary[1];
  const thirdVocab = vocabulary[2];
  const firstKanji = kanji[0];
  const secondKanji = kanji[1];
  const thirdKanji = kanji[2];

  const title = String(lesson.title || "");
  const scenario = (() => {
    if (title.includes("Bảng chữ cái")) return [
      "Trong lớp học đầu tiên, giáo viên treo bảng hiragana và katakana ở phía trước.",
      "Học viên đọc chậm từng hàng, rồi chép lại những ký tự dễ nhầm như ひ, し, つ.",
      "Điểm quan trọng là nhận ra âm và nét viết trước khi đọc câu dài."
    ];
    if (title.includes("Chào hỏi")) return [
      "Một buổi gặp gỡ đầu tiên bắt đầu bằng lời chào, giới thiệu tên và một nụ cười lịch sự.",
      "Người học cần phân biệt khi nào dùng はじめまして, こんにちは và よろしく.",
      "Hãy chú ý sắc thái lịch sự vì đây là nền tảng của giao tiếp."
    ];
    if (title.includes("Số đếm")) return [
      "Một lịch trình buổi sáng ghi rõ giờ đi học, giờ ăn và giờ nghỉ.",
      "Người học đọc các mốc thời gian rồi ghép chúng với hoạt động tương ứng.",
      "Điểm cần tìm là thứ tự và từ chỉ thời gian như 午前, 午後, 時間."
    ];
    if (title.includes("Trợ từ nền tảng")) return [
      "Trong một câu ngắn, từng trợ từ quyết định vai trò của chủ đề, chủ ngữ và tân ngữ.",
      "Người học so sánh は, が, を, に và で để hiểu vì sao câu đổi nghĩa khi thay trợ từ.",
      "Đây là bài đọc nhỏ nhưng rất quan trọng để tránh lỗi cơ bản."
    ];
    if (title.includes("Động từ -ます")) return [
      "Một bạn học kể về thói quen hằng ngày bằng các động từ lịch sự ở dạng -ます.",
      "Nhịp câu đều và rõ, giúp người đọc thấy rõ hành động lặp lại và mức độ trang trọng.",
      "Hãy để ý các động từ như 行きます, 食べます, 飲みます và cách chúng nối thành thói quen."
    ];
    if (title.includes("Tính từ")) return [
      "Một căn phòng, một khuôn mặt và một cảm xúc được mô tả bằng tính từ i và na.",
      "Người học cần tách phần miêu tả vật lý với phần đánh giá cảm xúc để hiểu đúng ngữ cảnh.",
      "Các từ như きれい, たかい, しずか thường giúp đoạn văn trở nên cụ thể hơn."
    ];
    if (title.includes("Mẫu câu sở hữu")) return [
      "Một chiếc túi, một quyển sách và một bức ảnh đều được gắn với chủ sở hữu rõ ràng.",
      "Người đọc phải nhận ra これ, それ, あれ và cấu trúc の để xác định thuộc về ai.",
      "Bài này kiểm tra khả năng nhìn quan hệ sở hữu ngay trong một đoạn rất ngắn."
    ];
    if (title.includes("Xin phép")) return [
      "Một đoạn hội thoại lịch sự dùng để nhờ người khác chờ một chút hoặc giúp một việc nhỏ.",
      "Người học cần nghe được sự mềm mỏng trong ください, おねがいします và các cách nói giảm nhẹ.",
      "Bối cảnh là giao tiếp hằng ngày, nên thái độ quan trọng không kém nội dung."
    ];
    if (title.includes("Gia đình")) return [
      "Một học viên mô tả gia đình mình có bao nhiêu người và từng thành viên là ai.",
      "Đoạn đọc dùng các từ chỉ quan hệ thân thuộc như 母, 父, 兄, 姉, 友だち.",
      "Mục tiêu là hiểu mối quan hệ giữa các thành viên chứ không chỉ nhớ từ vựng."
    ];
    if (title.includes("Ôn tập N5")) return [
      "Một đoạn ôn tập tổng hợp nhắc lại bảng chữ cái, trợ từ, động từ và cách chào hỏi cơ bản.",
      "Người học cần ráp lại các mảng kiến thức đã học để nhận ra thứ nào còn mơ hồ.",
      "Đây là bài kiểm tra xem nền tảng N5 đã đủ vững để chuyển sang cấp cao hơn chưa."
    ];
    if (title.includes("Trải nghiệm quá khứ")) return [
      "Một người kể về chuyến đi Nhật và nhấn mạnh trải nghiệm mình đã từng có.",
      "Đoạn văn tập trung vào mẫu ことがあります và các dấu hiệu thời gian quá khứ.",
      "Hãy xác định đâu là trải nghiệm thật, đâu là sự kiện chỉ mới được nhắc lại."
    ];
    if (title.includes("Khả năng")) return [
      "Một người nói về kỹ năng có thể làm được và sở thích cá nhân trong cùng một đoạn.",
      "Các cụm như ことができます và すき giúp thể hiện năng lực lẫn thái độ.",
      "Người đọc cần tách giữa năng lực thực tế và điều mình thích làm."
    ];
    if (title.includes("Đang làm")) return [
      "Một người đang đợi bạn bè trong lúc trò chuyện về những việc diễn ra ngay lúc đó.",
      "Đoạn văn xoay quanh ています để mô tả hành động đang tiếp diễn hoặc trạng thái hiện tại.",
      "Hãy quan sát các dấu hiệu thời gian như 今 và những động từ dạng tiếp diễn."
    ];
    if (title.includes("So sánh")) return [
      "Trong một cửa hàng, hai món đồ được đặt cạnh nhau để so sánh giá, chất lượng và mức độ phù hợp.",
      "Người học cần đọc được cấu trúc hơn kém và lựa chọn tốt nhất trong số hai phương án.",
      "Các từ như ほうが, より, どちら, いちばん là chìa khóa của bài này."
    ];
    if (title.includes("Nguyên nhân và lý do")) return [
      "Một chuyến tàu trễ làm cả lịch trình thay đổi, nên người viết phải giải thích lý do rõ ràng.",
      "Đoạn văn dùng từ nối nguyên nhân-kết quả để người đọc thấy chuỗi sự việc liền mạch.",
      "Hãy phân biệt đâu là nguyên nhân, đâu là kết quả và đâu là cách diễn đạt mềm hơn."
    ];
    if (title.includes("Dự định")) return [
      "Một cuối tuần được lên kế hoạch trước với mục tiêu đi xem phim, gặp bạn và hoàn thành việc cá nhân.",
      "Các cụm như つもり, よてい và もくてき cho thấy mức độ chắc chắn của kế hoạch.",
      "Người học nên đọc xem đó là ý định ngắn hạn hay mục tiêu dài hơn."
    ];
    if (title.includes("Lời khuyên")) return [
      "Một người đưa ra lời khuyên nhẹ nhàng để người khác nói chậm hơn, chuẩn bị kỹ hơn và tránh lỗi.",
      "Đoạn văn dùng các cách nói khuyên nhủ, đề nghị và nhấn mạnh sự cần thiết.",
      "Hãy chú ý sắc thái: khuyên, đề nghị và bắt buộc không hoàn toàn giống nhau."
    ];
    if (title.includes("Thói quen")) return [
      "Một buổi sáng quen thuộc được mô tả bằng những hành động lặp lại như uống cà phê, tập thể dục và đi làm.",
      "Người học theo dõi chuỗi việc thường xuyên để hiểu nhịp sinh hoạt của nhân vật.",
      "Từ khóa ở đây là tần suất và thói quen, không phải hành động đơn lẻ."
    ];
    if (title.includes("Hành động liên tục")) return [
      "Một người vừa nghe nhạc vừa học, vừa di chuyển vừa nói chuyện và vừa quan sát xung quanh.",
      "Đoạn đọc giúp người học nhìn rõ cách hai hành động cùng tồn tại trong một câu.",
      "Điểm mấu chốt là quan hệ đồng thời, không phải chỉ là nối hai việc tách rời."
    ];
    if (title.includes("Ôn tập N4")) return [
      "Một bài tổng ôn gom lại trải nghiệm, so sánh, lý do, kế hoạch và cách diễn đạt đang diễn ra.",
      "Đoạn văn buộc người học phải nhớ các mẫu câu đã học trong nhiều bài trước đó.",
      "Mục tiêu là đọc được một đoạn tổng hợp mà không bị rối bởi nhiều cấu trúc khác nhau."
    ];
    if (title.includes("Nối câu")) return [
      "Một người đang giải thích ý tưởng của mình bằng nhiều câu nối tiếp để làm rõ lập luận.",
      "Đoạn đọc dùng các từ nối như ので, ため, つまり để dẫn người đọc qua từng lớp ý.",
      "Hãy xem đây như một bài kiểm tra khả năng theo dõi dòng suy nghĩ."
    ];
    if (title.includes("Suy đoán")) return [
      "Nhìn lên bầu trời tối, người đọc phải đoán xem có thể sắp mưa hay không.",
      "Câu chuyện không khẳng định trực tiếp mà gợi ý bằng dấu hiệu và suy luận.",
      "Các từ như そう, らしい, たぶん giúp bạn hiểu mức độ chắc chắn của dự đoán."
    ];
    if (title.includes("Điều kiện")) return [
      "Nếu có thời gian, nhân vật sẽ đến thư viện; nếu không, họ sẽ ở lại nhà.",
      "Bài đọc tập trung vào giả định và hệ quả, nên câu nào cũng gắn với một điều kiện.",
      "Hãy đọc xem điều kiện nào dẫn đến hành động nào."
    ];
    if (title.includes("Bị động")) return [
      "Một học viên được giáo viên khen, rồi kể lại chuyện đó bằng giọng bị động.",
      "Người đọc cần nhận ra ai là người nhận hành động và ai là tác nhân của hành động.",
      "Đây là cách nhìn câu từ góc của người chịu tác động."
    ];
    if (title.includes("Sai khiến")) return [
      "Một người mẹ yêu cầu con mình đi ngủ sớm, và câu chuyện được kể từ góc nhìn của người bị sai khiến.",
      "Đoạn văn cho thấy cách một người có thể cho phép hoặc bắt người khác làm điều gì đó.",
      "Hãy phân biệt giữa cho phép, bắt buộc và bị bắt làm."
    ];
    if (title.includes("Mục đích")) return [
      "Một người luyện tập tiếng Nhật mỗi ngày để đạt mục tiêu rõ ràng hơn.",
      "Đoạn văn xoay quanh mục tiêu, lý do và kết quả của hành động.",
      "Hãy xác định phần nào là mục đích và phần nào là nỗ lực để đạt được nó."
    ];
    if (title.includes("Sắc thái")) return [
      "Hai câu gần giống nhau nhưng mang sắc thái khác nhau được đặt cạnh để người học so sánh.",
      "Đoạn đọc yêu cầu bạn nhìn ra sự khác biệt rất nhỏ giữa các cách diễn đạt.",
      "Đây là bài học về độ tinh tế, không phải chỉ về nghĩa từ điển."
    ];
    if (title.includes("Đọc hiểu đoạn ngắn")) return [
      "Một thông báo ngắn có vài chi tiết quan trọng mà người đọc phải lọc ra thật nhanh.",
      "Nhiệm vụ là tìm ý chính và không bị lạc trong các thông tin phụ.",
      "Hãy chú ý cấu trúc thông báo, vì đây là kiểu văn bản hay gặp trong đời sống."
    ];
    if (title.includes("Từ vựng học thuật")) return [
      "Một bài báo cáo ngắn dùng nhiều từ trừu tượng như lý do, kết quả, phân tích và khảo sát.",
      "Người học phải đọc theo mạch giải thích chứ không chỉ nhớ nghĩa từng từ.",
      "Đây là kiểu từ vựng thường xuất hiện trong tài liệu và bài đọc học thuật."
    ];
    if (title.includes("Ôn tập N3")) return [
      "Một đoạn tổng ôn gom các mẫu suy đoán, điều kiện, bị động và sai khiến vào cùng một khung đọc.",
      "Người học phải chuyển liên tục giữa các dạng câu để theo kịp mạch văn.",
      "Mục tiêu là nhìn ra cấu trúc trước khi đọc nghĩa chi tiết."
    ];
    if (title.includes("Cấu trúc trang trọng")) return [
      "Một email hoặc thông báo chính thức cần cách diễn đạt lịch sự và chặt chẽ hơn bình thường.",
      "Đoạn văn tập trung vào hình thức trang trọng, câu mời và lời nhắn xác nhận.",
      "Điều quan trọng là chọn đúng mức độ lịch sự cho bối cảnh."
    ];
    if (title.includes("Tương phản")) return [
      "Dù rất bận, nhân vật vẫn giúp người khác, và chi tiết nhượng bộ làm câu văn có chiều sâu hơn.",
      "Người đọc phải hiểu rằng sự đối lập ở đây không phá vỡ nghĩa chính mà làm nó rõ hơn.",
      "Các từ như にもかかわらず, しかし và それでも là chìa khóa."
    ];
    if (title.includes("Trích dẫn")) return [
      "Một câu nói được nhắc lại gián tiếp, rồi đi kèm suy luận của người kể.",
      "Bài đọc này buộc người học phân biệt giữa lời gốc và phần diễn giải sau đó.",
      "Hãy xem phần nào là trích dẫn, phần nào là phỏng đoán."
    ];
    if (title.includes("Mức độ")) return [
      "Điều được mong đợi hóa ra không khó đến mức đó, và người viết dùng cách nói để giảm bớt sức nặng.",
      "Đoạn văn xoay quanh mức độ, phạm vi và giới hạn của cảm nhận cá nhân.",
      "Các từ như ほど, だけ, くらい, まで giúp xác định cường độ."
    ];
    if (title.includes("Văn phong đọc hiểu")) return [
      "Một bài báo ngắn được tóm tắt bằng ngôn ngữ gọn gàng, rất giống văn phong trong đề thi.",
      "Người học phải nắm được ý chính trước, rồi mới đi vào chi tiết.",
      "Đây là kiểu văn bản cần tốc độ và khả năng nắm cấu trúc."
    ];
    if (title.includes("Cụm từ học thuật")) return [
      "Một bộ tài liệu được so sánh để rút ra kết luận, vì vậy cách diễn đạt mang tính phân tích rõ rệt.",
      "Đoạn văn dùng từ ngữ học thuật hơn và ít cảm xúc hơn so với giao tiếp thường ngày.",
      "Hãy đọc như đang xử lý một báo cáo ngắn."
    ];
    if (title.includes("Câu phức")) return [
      "Khi việc chuẩn bị hoàn tất, nhóm sẽ xuất phát, nhưng trước đó họ vẫn phải giữ tiến độ và kiểm tra lại kế hoạch.",
      "Câu văn dài hơn, nhiều mệnh đề hơn và cần theo dõi mạch logic liên tục.",
      "Bài này tập trung vào việc đọc câu phức mà vẫn giữ được trật tự ý."
    ];
    if (title.includes("Luyện tốc độ")) return [
      "Trong bài thi có giới hạn thời gian, người đọc phải tìm câu trả lời nhanh nhưng vẫn chính xác.",
      "Đoạn văn được viết sao cho người học buộc phải đọc lướt, rồi quay lại xác nhận ý chính.",
      "Đây là phần rèn tốc độ xử lý thông tin hơn là dịch từng chữ."
    ];
    if (title.includes("Ôn tập N2")) return [
      "Một đoạn tổng hợp nhắc lại văn phong, so sánh, liên kết logic và đọc hiểu mức trung cấp cao.",
      "Đây là bài đọc để xem bạn đã sẵn sàng bước lên phần khó hơn chưa.",
      "Hãy đọc theo cụm ý thay vì cố dịch từng từ."
    ];
    if (title.includes("Sắc thái nâng cao")) return [
      "Hai cách nói rất gần nhau nhưng sắc thái khác nhau được đặt vào cùng một bối cảnh.",
      "Người học cần đọc bằng con mắt tinh để thấy khác biệt cực nhỏ giữa các lựa chọn.",
      "Bài này yêu cầu cảm nhận ngôn ngữ hơn là ghi nhớ máy móc."
    ];
    if (title.includes("Diễn đạt trang trọng")) return [
      "Một cuộc họp chính thức yêu cầu diễn đạt cẩn trọng, ngắn gọn và đúng mức độ lịch sự.",
      "Đoạn văn thể hiện cách một người chọn từ phù hợp để tránh gây hiểu lầm.",
      "Đây là bài đọc về phong cách, không chỉ về nghĩa."
    ];
    if (title.includes("Văn viết học thuật")) return [
      "Một mục tiêu nghiên cứu được nêu rõ trước khi đi vào lập luận và bằng chứng.",
      "Người đọc phải theo dõi cấu trúc chặt chẽ, vì mỗi câu đều nối vào luận điểm chính.",
      "Các ý được sắp xếp như trong một bài viết nghiên cứu ngắn."
    ];
    if (title.includes("Phủ định tinh tế")) return [
      "Không phải lúc nào điều đó cũng đúng, và người viết cố tình dùng cách nói giảm nhẹ để tránh khẳng định tuyệt đối.",
      "Đoạn văn cho thấy phủ định trong tiếng Nhật có nhiều mức độ khác nhau.",
      "Người học cần nhận ra sắc thái 'không hẳn' thay vì chỉ 'không'."
    ];
    if (title.includes("Câu nhấn mạnh")) return [
      "Điều quan trọng nhất được đẩy lên đầu câu để người đọc không bỏ sót trọng tâm.",
      "Đoạn văn nhấn mạnh một ý duy nhất nhưng làm nó nổi bật bằng nhiều lớp cấu trúc.",
      "Bài này giúp bạn thấy cách tiếng Nhật đặt trọng tâm."
    ];
    if (title.includes("Liên kết logic dài")) return [
      "Người viết sắp xếp lý do trước, rồi mới đưa ra kết luận để lập luận không bị rời rạc.",
      "Đoạn văn dài nhưng vẫn có trục logic rõ ràng từ đầu đến cuối.",
      "Hãy bám vào các từ nối để hiểu mạch suy nghĩ."
    ];
    if (title.includes("Diễn giải và ẩn ý")) return [
      "Câu chữ bề mặt không nói hết ý, nên người đọc phải dựa vào ngữ cảnh để hiểu hàm ý thật.",
      "Đây là bài đọc về ẩn dụ, bóng gió và cách nói vòng.",
      "Hãy đọc cả những gì không được nói trực tiếp."
    ];
    if (title.includes("Đọc hiểu tổng hợp")) return [
      "Nhiều thông tin được đưa vào cùng một đoạn, buộc người học phải so sánh và sắp xếp lại trước khi trả lời.",
      "Bài này giống một bài đọc dài thu nhỏ, có nhiều lớp dữ kiện.",
      "Mấu chốt là tìm quan hệ giữa các ý thay vì đọc rời từng câu."
    ];
    if (title.includes("Từ vựng cấp cao")) return [
      "Một bài viết sử dụng các khái niệm trừu tượng để mô tả ý tưởng và đánh giá.",
      "Người học cần hiểu không chỉ từ đơn lẻ mà còn sắc thái của cả cụm từ.",
      "Đây là nhóm từ hay xuất hiện trong bình luận, báo cáo và phân tích."
    ];
    if (title.includes("Ôn tập N1")) return [
      "Đây là đoạn đọc tổng hợp ở mức cao nhất, nơi sắc thái, logic và ẩn ý cùng xuất hiện.",
      "Người học phải xử lý nhanh các lớp nghĩa để giữ mạch văn.",
      "Nếu đọc được đoạn này, bạn đã khá sẵn sàng cho phần luyện đề sâu hơn."
    ];

    return [
      `Bài ${lesson.title} đưa người học vào một ngữ cảnh ngắn để kiểm tra cách dùng từ và cấu trúc.`,
      lesson.description || "Hãy đọc kỹ để nắm ý chính của bài.",
      "Sau đó đối chiếu với ví dụ để xem mình hiểu đúng hay chưa."
    ];
  })();

  const vocabFocus = [firstVocab?.word, secondVocab?.word, thirdVocab?.word].filter(Boolean).join("、");
  const kanjiFocus = [firstKanji?.character, secondKanji?.character, thirdKanji?.character].filter(Boolean).join("、");

  const passage = [
    ...scenario,
    vocabFocus ? `Từ khóa cần chú ý: 「${vocabFocus}」.` : "",
    kanjiFocus ? `Các kanji nổi bật trong bài là 「${kanjiFocus}」.` : "",
    "Cuối cùng, hãy kiểm tra xem ý chính của bài có khớp với ví dụ hay không."
  ].filter(Boolean);

  const miniQuestions = [
    {
      prompt: "Bài này nên ưu tiên ghi nhớ từ nào trước?",
      choices: [firstVocab?.word, secondVocab?.word, thirdVocab?.word].filter(Boolean),
      answer: firstVocab?.word || "",
      explanation: firstVocab
        ? `Từ khóa đầu tiên thường xuất hiện sớm trong bài đọc và là điểm bám để hiểu ngữ cảnh.`
        : "Bài này chưa có đủ từ vựng để tạo câu hỏi."
    },
    {
      prompt: "Kanji nào xuất hiện trong phần đọc?",
      choices: [firstKanji?.character, secondKanji?.character, thirdKanji?.character].filter(Boolean),
      answer: firstKanji?.character || "",
      explanation: firstKanji
        ? `Kanji đầu tiên được chọn từ bộ từ vựng cốt lõi của bài, nên thường mang vai trò gợi chủ đề.`
        : "Bài này chưa có đủ kanji để tạo câu hỏi."
    },
    {
      prompt: "Điểm chính của bài là gì?",
      choices: [
        lesson.description,
        intro,
        "Ôn lại toàn bộ từ vựng theo thứ tự bảng chữ cái"
      ],
      answer: lesson.description,
      explanation: "Điểm chính được rút ra từ mô tả của lesson và cách các từ vựng được dùng trong ngữ cảnh."
    }
  ];

  return { passage, miniQuestions };
}

export function registerApiRoutes(app) {
  
  // ==========================================
  // VOCABULARY API
  // ==========================================
  app.get("/api/vocabulary", async (req, res) => {
    try {
      const { data, error } = await supabase.from('vocabulary').select('*').order('id');
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get("/api/vocabulary/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid vocabulary id' });

      const { data, error } = await supabase.from('vocabulary').select('*').eq('id', id).single();
      if (error || !data) return res.status(404).json({ error: 'Vocabulary not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ==========================================
  // KANJI API
  // ==========================================
  app.get("/api/kanji", async (req, res) => {
    try {
      const { data, error } = await supabase.from('kanji').select('*').order('id');
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get("/api/kanji/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid kanji id' });

      const { data, error } = await supabase.from('kanji').select('*').eq('id', id).single();
      if (error || !data) return res.status(404).json({ error: 'Kanji not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ==========================================
  // GRAMMAR API
  // ==========================================
  app.get('/api/grammar', async (req, res) => {
    try {
      const { data, error } = await supabase.from('grammar').select('*').order('id');
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/grammar/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid grammar id' });

      const { data, error } = await supabase.from('grammar').select('*').eq('id', id).single();
      if (error || !data) return res.status(404).json({ error: 'Grammar point not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ==========================================
  // LESSONS API
  // ==========================================
  app.get('/api/lessons', async (req, res) => {
    try {
      const { data, error } = await supabase.from('lessons').select('*').order('level').order('id');
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/lessons/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'Invalid lesson id' });
      }

      const { data, error } = await supabase
        .from('lessons')
        .select(`
          *,
          lesson_vocabulary ( vocabulary ( * ) ),
          lesson_kanji ( kanji ( * ) ),
          lesson_grammar ( grammar ( * ) )
        `)
        .eq('id', id)
        .single();
        
      if (error || !data) {
        console.error('Supabase error:', error);
        return res.status(404).json({ error: 'Lesson not found' });
      }
      
      // Flatten the nested data structure for the frontend
      // Supabase returns an array of objects for the join, we map it to just the content
      const formattedData = {
        ...data,
        vocabulary: data.lesson_vocabulary?.map(lv => lv.vocabulary).filter(Boolean) || [],
        kanji: data.lesson_kanji?.map(lk => lk.kanji).filter(Boolean) || [],
        grammar: data.lesson_grammar?.map(lg => lg.grammar).filter(Boolean) || [],
      };
      
      // Clean up the raw join table data
      delete formattedData.lesson_vocabulary;
      delete formattedData.lesson_kanji;
      delete formattedData.lesson_grammar;

      formattedData.readingPractice = buildReadingPractice(formattedData);

      res.json(formattedData);
    } catch (err) {
      console.error('Server error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ==========================================
  // LESSON PROGRESS API
  // ==========================================
  app.get('/api/lesson-progress', authenticateToken, async (req, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_id, status, completed_at, last_review, updated_at')
        .eq('user_id', req.user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      res.json(normalizeProgressMap((data || []).map(mapLessonProgressRow)));
    } catch (err) {
      console.error('Failed to fetch lesson progress:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.put('/api/lesson-progress/:lessonId', authenticateToken, async (req, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const lessonId = Number(req.params.lessonId);
      const { status } = req.body || {};

      if (!Number.isInteger(lessonId)) {
        return res.status(400).json({ error: 'Invalid lesson id' });
      }

      if (!allowedProgressStatuses.has(status)) {
        return res.status(400).json({ error: 'Invalid progress status' });
      }

      if (status === 'not-started') {
        const { error } = await supabase
          .from('user_progress')
          .delete()
          .eq('user_id', req.user.id)
          .eq('lesson_id', lessonId);

        if (error) throw error;
        return res.json({ lessonId, status: 'not-started' });
      }

      const now = new Date().toISOString();
      const payload = {
        user_id: req.user.id,
        lesson_id: lessonId,
        status,
        last_review: now,
        completed_at: status === 'completed' ? now : null,
        updated_at: now
      };

      const { data, error } = await supabase
        .from('user_progress')
        .upsert(payload, { onConflict: 'user_id,lesson_id' })
        .select('lesson_id, status, completed_at, last_review, updated_at')
        .single();

      if (error) throw error;

      res.json(mapLessonProgressRow(data));
    } catch (err) {
      console.error('Failed to save lesson progress:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ==========================================
  // JLPT API
  // ==========================================
  app.get('/api/jlpt/tests/:level', async (req, res) => {
    try {
      const level = parseInt(req.params.level.replace('N', ''));
      const { data, error } = await supabase
        .from('jlpt_tests')
        .select(`
          *,
          questions:jlpt_questions(*)
        `)
        .eq('level', level);
      
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/jlpt/results', authenticateToken, async (req, res) => {
    try {
      const { testId, score, total, percent, passed, sectionSummary } = req.body;
      const { data, error } = await supabase
        .from('jlpt_results')
        .insert([{
          user_id: req.user.id,
          test_id: testId,
          score,
          total,
          percent,
          passed,
          section_summary: sectionSummary
        }])
        .select()
        .single();
      
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/jlpt/history', authenticateToken, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('jlpt_results')
        .select(`
          *,
          test:jlpt_tests(title, level)
        `)
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ==========================================
  // USER PROFILE API (Protected)
  // ==========================================
  app.get('/api/users/profile', authenticateToken, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          users ( email, name, level, streak, exp, role )
        `)
        .eq('id', req.user.id)
        .single();
      
      if (error || !data) return res.status(404).json({ error: 'Profile not found' });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

}
