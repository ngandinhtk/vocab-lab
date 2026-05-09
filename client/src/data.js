export const levelOrder = ["N5", "N4", "N3", "N2", "N1"];

export const pageBlueprint = [
  { key: "home", label: "Trang chủ", note: "Hero, lộ trình ngắn, CTA vào học" },
  { key: "roadmap", label: "Lộ trình", note: "Bản đồ học từ N5 đến N1" },
  { key: "grammar", label: "Ngữ pháp", note: "Lọc level, đọc cấu trúc, xem ví dụ" },
  { key: "jlpt", label: "JLPT", note: "Làm đề thử, chấm điểm, xem giải thích" },
  { key: "progress", label: "Tiến độ", note: "Lịch sử bài làm, điểm số, gợi ý ôn" }
];

export const heroMetrics = [
  { label: "Lộ trình", value: "5 cấp độ", note: "Từ N5 đến N1" },
  { label: "Ngữ pháp", value: "15 mẫu", note: "Tổng hợp cơ bản" },
  { label: "Mock test", value: "20 câu", note: "Chấm điểm tự động" },
  { label: "UI", value: "Anime cute", note: "Sáng, sạch, dễ dùng" }
];

export const studyPillars = [
  {
    title: "Học nền tảng",
    text: "Bắt đầu bằng hệ chữ, cách chào hỏi, trợ từ cơ bản và mẫu câu N5.",
    action: "Đi tới lộ trình"
  },
  {
    title: "Nắm ngữ pháp",
    text: "Mỗi mẫu có ý nghĩa, cấu trúc, ví dụ và ghi chú dễ nhầm.",
    action: "Xem ngữ pháp"
  },
  {
    title: "Làm đề thử",
    text: "Chọn cấp độ, làm nhanh, nhận điểm số và phần cần ôn lại.",
    action: "Bắt đầu thi thử"
  }
];

export const roadmapSteps = [
  {
    id: "start",
    level: "N5",
    title: "Khởi động",
    subtitle: "1-2 tuần đầu",
    goal: "Làm quen hiragana, katakana, phát âm và mẫu câu chào hỏi.",
    lessons: ["Bảng chữ cái", "Cách chào", "Số đếm", "Trợ từ は / が / を"],
    output: "Đọc được câu ngắn và hiểu được cấu trúc cơ bản."
  },
  {
    id: "core",
    level: "N5",
    title: "Cấu trúc nền",
    subtitle: "Tuần 3-4",
    goal: "Hiểu động từ thể ます, て-form, tính từ và câu hỏi đơn giản.",
    lessons: ["Động từ cơ bản", "Tính từ i / na", "Câu hỏi", "Mệnh lệnh nhẹ"],
    output: "Tự giới thiệu và hỏi đáp trong tình huống hằng ngày."
  },
  {
    id: "grow",
    level: "N4",
    title: "Mở rộng",
    subtitle: "Sau N5",
    goal: "Ghép câu dài hơn, diễn tả nguyên nhân, khả năng và thói quen.",
    lessons: ["〜ことがある", "〜ながら", "〜ておく", "〜たり〜たりする"],
    output: "Đọc đoạn ngắn và hiểu ý chính của hội thoại."
  },
  {
    id: "pass",
    level: "N3",
    title: "Đọc hiểu",
    subtitle: "Mục tiêu trung cấp",
    goal: "Tập trung vào tốc độ đọc, ngữ cảnh và mẫu diễn đạt phổ biến.",
    lessons: ["〜ようになる", "〜そうだ", "〜みたいだ", "〜らしい"],
    output: "Làm được câu hỏi đọc hiểu cơ bản trong đề JLPT."
  },
  {
    id: "master",
    level: "N2",
    title: "Lên level cao hơn",
    subtitle: "Sau khi ổn N3",
    goal: "Mài ngữ pháp trừu tượng, logic câu và đọc hiểu dài.",
    lessons: ["〜わけではない", "〜に違いない", "〜を通じて", "〜に加えて"],
    output: "Vào nhịp luyện đề thật, tối ưu điểm số theo section."
  }
];

export const grammarItems = [
  {
    id: "n5-desu-masu",
    level: "N5",
    title: "〜です / 〜ます",
    meaning: "Mẫu câu lịch sự cơ bản dùng trong giao tiếp hằng ngày.",
    structure: "N / Adj / V + です, Vます",
    examples: [
      { ja: "わたしは学生です。", vi: "Tôi là học sinh." },
      { ja: "毎日、日本語を勉強します。", vi: "Tôi học tiếng Nhật mỗi ngày." }
    ],
    notes: "Dùng ở văn phong lịch sự, rất quan trọng cho người mới.",
    tips: "N5 thường ưu tiên độ chính xác hơn độ dài câu."
  },
  {
    id: "n5-particles",
    level: "N5",
    title: "は / が / を",
    meaning: "Ba trợ từ nền tảng để xác định chủ đề, chủ ngữ và tân ngữ.",
    structure: "Topic は, subject が, object を",
    examples: [
      { ja: "わたしはパンを食べます。", vi: "Tôi ăn bánh mì." },
      { ja: "だれが来ますか。", vi: "Ai sẽ đến?" }
    ],
    notes: "Nhiều bạn mới học hay nhầm は và が.",
    tips: "Đọc câu theo chức năng của trợ từ, không chỉ theo nghĩa từ vựng."
  },
  {
    id: "n5-te-kudasai",
    level: "N5",
    title: "〜てください",
    meaning: "Dùng để yêu cầu, đề nghị hoặc nhờ ai đó làm gì.",
    structure: "Vて + ください",
    examples: [
      { ja: "ここに名前を書いてください。", vi: "Xin hãy viết tên vào đây." },
      { ja: "少し待ってください。", vi: "Xin hãy chờ một chút." }
    ],
    notes: "Ngữ điệu mềm, phù hợp với giao tiếp lịch sự.",
    tips: "Hãy nhớ thể て của động từ trước rồi mới ghép ください."
  },
  {
    id: "n4-koto-ga-aru",
    level: "N4",
    title: "〜ことがある",
    meaning: "Diễn tả trải nghiệm hoặc thỉnh thoảng xảy ra.",
    structure: "Vた + ことがある",
    examples: [
      { ja: "日本へ行ったことがあります。", vi: "Tôi đã từng đến Nhật." },
      { ja: "夜に勉強することがあります。", vi: "Thỉnh thoảng tôi học vào buổi tối." }
    ],
    notes: "Phân biệt với nghĩa 'có lúc' trong ngữ cảnh thời gian.",
    tips: "Khi nhìn thấy た + ことがある, hãy nghĩ đến trải nghiệm."
  },
  {
    id: "n4-nagara",
    level: "N4",
    title: "〜ながら",
    meaning: "Diễn tả hai hành động cùng lúc hoặc trạng thái đi kèm.",
    structure: "Vます stem + ながら",
    examples: [
      { ja: "音楽を聞きながら勉強します。", vi: "Tôi học trong lúc nghe nhạc." },
      { ja: "歩きながら話しました。", vi: "Chúng tôi đã nói chuyện trong lúc đi bộ." }
    ],
    notes: "Không nên lạm dụng trong các câu quá dài ở giai đoạn đầu.",
    tips: "Nhớ rằng hành động chính thường nằm ở phía sau."
  },
  {
    id: "n4-tari",
    level: "N4",
    title: "〜たり〜たりする",
    meaning: "Liệt kê một số hành động tiêu biểu theo kiểu 'nào là... nào là...'.",
    structure: "Vた + り, Vた + り + する",
    examples: [
      { ja: "休日は映画を見たり、寝たりします。", vi: "Ngày nghỉ tôi xem phim, ngủ, v.v." },
      { ja: "雨が降ったりやんだりしました。", vi: "Mưa lúc có lúc không." }
    ],
    notes: "Dùng để kể ví dụ điển hình, không phải liệt kê đầy đủ.",
    tips: "Có thể kết hợp nhiều động từ nhưng giữ nhịp câu nhẹ."
  },
  {
    id: "n3-you-ni-naru",
    level: "N3",
    title: "〜ようになる",
    meaning: "Diễn tả sự thay đổi, chuyển sang trạng thái mới.",
    structure: "V辞書形 / Vない形 + ようになる",
    examples: [
      { ja: "日本語が少し読めるようになりました。", vi: "Tôi đã bắt đầu đọc được tiếng Nhật một chút." },
      { ja: "早起きするようになりました。", vi: "Tôi đã hình thành thói quen dậy sớm." }
    ],
    notes: "Thường gắn với sự tiến bộ hoặc thay đổi theo thời gian.",
    tips: "Nghĩ đến 'đã trở nên có thể' hoặc 'đã hình thành thói quen'."
  },
  {
    id: "n3-sou-da",
    level: "N3",
    title: "〜そうだ",
    meaning: "Dùng để suy đoán dựa trên dấu hiệu trước mắt.",
    structure: "Vます stem / い Adj stem / な Adj stem + そうだ",
    examples: [
      { ja: "雨が降りそうです。", vi: "Có vẻ trời sắp mưa." },
      { ja: "このケーキはおいしそうです。", vi: "Cái bánh này trông ngon quá." }
    ],
    notes: "Hai nghĩa 'trông như' và 'nghe nói' cần tách riêng.",
    tips: "Ở đây đang dùng nghĩa suy đoán từ dấu hiệu."
  },
  {
    id: "n3-rashii",
    level: "N3",
    title: "〜らしい",
    meaning: "Diễn tả phỏng đoán gián tiếp hoặc 'có vẻ là'.",
    structure: "N / V辞書形 + らしい",
    examples: [
      { ja: "彼は忙しいらしいです。", vi: "Nghe nói anh ấy có vẻ bận." },
      { ja: "今日は休みらしいです。", vi: "Hình như hôm nay là ngày nghỉ." }
    ],
    notes: "Khác với みたい, sắc thái thường khách quan hơn.",
    tips: "Dùng khi thông tin đến từ nguồn gián tiếp."
  },
  {
    id: "n2-wake-dewa-nai",
    level: "N2",
    title: "〜わけではない",
    meaning: "Phủ định mềm, nghĩa là 'không hẳn là' hoặc 'không phải cứ'.",
    structure: "V / Adj / N + わけではない",
    examples: [
      { ja: "嫌いなわけではないです。", vi: "Không phải là tôi ghét nó." },
      { ja: "毎日忙しいわけではありません。", vi: "Không phải ngày nào cũng bận." }
    ],
    notes: "Rất hay xuất hiện trong ngữ pháp đọc hiểu.",
    tips: "Nghe 'không hoàn toàn' thay vì phủ định tuyệt đối."
  },
  {
    id: "n2-ni-chigainai",
    level: "N2",
    title: "〜に違いない",
    meaning: "Khẳng định suy đoán mạnh, gần như chắc chắn.",
    structure: "V / Adj / N + に違いない",
    examples: [
      { ja: "彼は知っているに違いない。", vi: "Chắc chắn anh ấy biết." },
      { ja: "この道で合っているに違いない。", vi: "Chắc chắn con đường này là đúng." }
    ],
    notes: "Sắc thái mạnh hơn ようだ / らしい.",
    tips: "Dùng khi bạn tin rằng phán đoán gần như chắc chắn."
  },
  {
    id: "n2-tsuujite",
    level: "N2",
    title: "〜を通じて",
    meaning: "Thông qua, suốt cả, hoặc xuyên suốt một khoảng thời gian.",
    structure: "N + を通じて",
    examples: [
      { ja: "インターネットを通じて学びました。", vi: "Tôi đã học thông qua Internet." },
      { ja: "一年を通じて忙しかったです。", vi: "Tôi bận suốt cả năm." }
    ],
    notes: "Có thể dùng cho phương tiện lẫn khoảng thời gian.",
    tips: "Đọc kỹ xem đang nói về 'through' hay 'throughout'."
  },
  {
    id: "n1-ni-hokanaranai",
    level: "N1",
    title: "〜にほかならない",
    meaning: "Nhấn mạnh rằng điều được nói là chính xác, không gì khác.",
    structure: "V / N + にほかならない",
    examples: [
      { ja: "これは努力の結果にほかならない。", vi: "Đây chẳng qua là kết quả của nỗ lực." },
      { ja: "成功の秘訣は継続にほかならない。", vi: "Bí quyết thành công chính là sự bền bỉ." }
    ],
    notes: "Văn viết trang trọng, thường gặp trong bài đọc N1.",
    tips: "Có sắc thái nhấn mạnh rất mạnh, không phù hợp giao tiếp thông thường."
  },
  {
    id: "n1-zeru-wo-enai",
    level: "N1",
    title: "〜ざるを得ない",
    meaning: "Không thể không làm, buộc phải làm vì hoàn cảnh.",
    structure: "Vない stem + ざるを得ない",
    examples: [
      { ja: "事情があるので、行かざるを得ない。", vi: "Vì có chuyện nên đành phải đi." },
      { ja: "その案には反対せざるを得ない。", vi: "Tôi không thể không phản đối đề xuất đó." }
    ],
    notes: "Mẫu văn viết, tính bắt buộc rất rõ.",
    tips: "Hiểu theo nghĩa 'can not help but do'."
  },
  {
    id: "n1-ni-kagete",
    level: "N1",
    title: "〜に加えて",
    meaning: "Ngoài ra, cộng thêm, dùng để thêm thông tin.",
    structure: "N + に加えて",
    examples: [
      { ja: "経験に加えて、判断力も大切です。", vi: "Ngoài kinh nghiệm, khả năng phán đoán cũng quan trọng." },
      { ja: "暑さに加えて、湿気も高いです。", vi: "Ngoài nóng ra, độ ẩm cũng cao." }
    ],
    notes: "Hay đi kèm câu văn trang trọng và thông tin bổ sung.",
    tips: "Dùng khi muốn nối thêm một ý theo kiểu 'thêm vào đó'."
  }
];

function makeChoices(answer, distractors) {
  return [answer, ...distractors];
}

export const jlptTests = {
  N5: {
    level: "N5",
    title: "Mini mock test N5",
    passScore: 60,
    description: "Câu ngắn, dễ hiểu, tập trung vào trợ từ và mẫu câu nền tảng.",
    questions: [
      {
        id: "n5-q1",
        section: "Ngữ pháp",
        prompt: "___ は学生です。",
        choices: makeChoices("わたし", ["わたしが", "わたしを", "わたしに"]),
        answer: "わたし",
        explanation: "は đánh dấu chủ đề của câu."
      },
      {
        id: "n5-q2",
        section: "Ngữ pháp",
        prompt: "水を___ください。",
        choices: makeChoices("飲んで", ["飲み", "飲む", "飲め"]),
        answer: "飲んで",
        explanation: "Mẫu てください dùng để nhờ hoặc yêu cầu."
      },
      {
        id: "n5-q3",
        section: "Từ vựng",
        prompt: "「学校」の意味はどれですか。",
        choices: makeChoices("trường học", ["bệnh viện", "thư viện", "siêu thị"]),
        answer: "trường học",
        explanation: "学校 nghĩa là trường học."
      },
      {
        id: "n5-q4",
        section: "Đọc hiểu",
        prompt: "レストランは ここ です。 Ý đúng là gì?",
        choices: makeChoices("Nhà hàng ở đây", ["Nhà hàng ở kia", "Không có nhà hàng", "Tôi thích nhà hàng"]),
        answer: "Nhà hàng ở đây",
        explanation: "ここ có nghĩa là ở đây."
      }
    ]
  },
  N4: {
    level: "N4",
    title: "Mini mock test N4",
    passScore: 65,
    description: "Câu dài hơn, có trải nghiệm, thói quen và trình tự hành động.",
    questions: [
      {
        id: "n4-q1",
        section: "Ngữ pháp",
        prompt: "日本へ行った___があります。",
        choices: makeChoices("こと", ["の", "よう", "だけ"]),
        answer: "こと",
        explanation: "Vた + ことがある diễn tả trải nghiệm."
      },
      {
        id: "n4-q2",
        section: "Ngữ pháp",
        prompt: "音楽を聞き___勉強します。",
        choices: makeChoices("ながら", ["たり", "まで", "しか"]),
        answer: "ながら",
        explanation: "ながら diễn tả hai hành động cùng lúc."
      },
      {
        id: "n4-q3",
        section: "Từ vựng",
        prompt: "「雨」の読み方はどれですか。",
        choices: makeChoices("あめ", ["ゆき", "はな", "やま"]),
        answer: "あめ",
        explanation: "雨 đọc là あめ."
      },
      {
        id: "n4-q4",
        section: "Đọc hiểu",
        prompt: "休日は映画を見たり寝たりします。 Ý đúng là gì?",
        choices: makeChoices("Ngày nghỉ làm nhiều việc khác nhau", ["Chỉ xem phim", "Chỉ ngủ", "Không làm gì cả"]),
        answer: "Ngày nghỉ làm nhiều việc khác nhau",
        explanation: "〜たり〜たりする dùng để liệt kê các hành động điển hình."
      }
    ]
  },
  N3: {
    level: "N3",
    title: "Mini mock test N3",
    passScore: 70,
    description: "Bắt đầu kiểm tra khả năng suy luận ngữ pháp và đọc hiểu ngắn.",
    questions: [
      {
        id: "n3-q1",
        section: "Ngữ pháp",
        prompt: "日本語が少し読める___になりました。",
        choices: makeChoices("よう", ["こと", "ので", "しか"]),
        answer: "よう",
        explanation: "ようになる dùng cho sự thay đổi trạng thái."
      },
      {
        id: "n3-q2",
        section: "Ngữ pháp",
        prompt: "雨が降り___です。",
        choices: makeChoices("そう", ["らしい", "だけ", "ほど"]),
        answer: "そう",
        explanation: "そうだ ở đây mang nghĩa suy đoán từ dấu hiệu trước mắt."
      },
      {
        id: "n3-q3",
        section: "Từ vựng",
        prompt: "「必要」の意味はどれですか。",
        choices: makeChoices("cần thiết", ["thành công", "đúng giờ", "đẹp"]),
        answer: "cần thiết",
        explanation: "必要 nghĩa là cần thiết."
      },
      {
        id: "n3-q4",
        section: "Đọc hiểu",
        prompt: "彼は忙しいらしいです。 Câu này gần nhất với nghĩa nào?",
        choices: makeChoices("Nghe nói anh ấy có vẻ bận", ["Anh ấy chắc chắn đang ngủ", "Anh ấy không bận", "Anh ấy thích ăn"]),
        answer: "Nghe nói anh ấy có vẻ bận",
        explanation: "らしい ở đây là phỏng đoán gián tiếp."
      }
    ]
  },
  N2: {
    level: "N2",
    title: "Mini mock test N2",
    passScore: 75,
    description: "Ngữ pháp trừu tượng hơn, nhiều câu văn mang tính học thuật.",
    questions: [
      {
        id: "n2-q1",
        section: "Ngữ pháp",
        prompt: "嫌いなわけ___ないです。",
        choices: makeChoices("では", ["が", "を", "へ"]),
        answer: "では",
        explanation: "わけではない là phủ định mềm."
      },
      {
        id: "n2-q2",
        section: "Ngữ pháp",
        prompt: "彼は知っている___違いない。",
        choices: makeChoices("に", ["で", "を", "へ"]),
        answer: "に",
        explanation: "に違いない diễn tả suy đoán mạnh."
      },
      {
        id: "n2-q3",
        section: "Từ vựng",
        prompt: "「判断」の意味はどれですか。",
        choices: makeChoices("phán đoán", ["ký ức", "khởi đầu", "tranh luận"]),
        answer: "phán đoán",
        explanation: "判断 nghĩa là phán đoán, đánh giá."
      },
      {
        id: "n2-q4",
        section: "Đọc hiểu",
        prompt: "インターネットを通じて学びました。 Ý đúng là gì?",
        choices: makeChoices("Học thông qua Internet", ["Học trên lớp", "Học rất nhanh", "Không học gì cả"]),
        answer: "Học thông qua Internet",
        explanation: "を通じて dùng với nghĩa 'thông qua'."
      }
    ]
  },
  N1: {
    level: "N1",
    title: "Mini mock test N1",
    passScore: 80,
    description: "Câu văn dài hơn, sắc thái trang trọng và đọc hiểu logic hơn.",
    questions: [
      {
        id: "n1-q1",
        section: "Ngữ pháp",
        prompt: "これは努力の結果に___ない。",
        choices: makeChoices("ほか", ["さえ", "だけ", "ほど"]),
        answer: "ほか",
        explanation: "にほかならない là mẫu nhấn mạnh rất trang trọng."
      },
      {
        id: "n1-q2",
        section: "Ngữ pháp",
        prompt: "事情があるので、行か___得ない。",
        choices: makeChoices("ざるを", ["ない", "なくて", "ないで"]),
        answer: "ざるを",
        explanation: "ざるを得ない nghĩa là buộc phải làm."
      },
      {
        id: "n1-q3",
        section: "Từ vựng",
        prompt: "「核心」の意味はどれですか。",
        choices: makeChoices("trọng tâm", ["màu sắc", "chiếc hộp", "âm thanh"]),
        answer: "trọng tâm",
        explanation: "核心 là trọng tâm, cốt lõi."
      },
      {
        id: "n1-q4",
        section: "Đọc hiểu",
        prompt: "経験に加えて、判断力も大切です。 Ý chính là gì?",
        choices: makeChoices("Ngoài kinh nghiệm, phán đoán cũng quan trọng", ["Chỉ kinh nghiệm là đủ", "Chỉ phán đoán là đủ", "Không cần gì cả"]),
        answer: "Ngoài kinh nghiệm, phán đoán cũng quan trọng",
        explanation: "に加えて nghĩa là ngoài ra / cộng thêm."
      }
    ]
  }
};

