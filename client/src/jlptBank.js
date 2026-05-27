function makeChoices(answer, distractors) {
  return [answer, ...distractors];
}

function getBonusQuestions(level, sectionLabel) {
  const base = {
    "Language Knowledge": {
      N5: {
        format: "one-choice",
        prompt: "「先生」の読み方はどれですか。",
        choices: makeChoices("せんせい", ["がくせい", "ともだち", "かいしゃ"]),
        answer: "せんせい",
        explanation: "先生 đọc là せんせい."
      },
      N4: {
        format: "one-choice",
        prompt: "「約束」の意味はどれですか。",
        choices: makeChoices("lời hẹn", ["sự im lặng", "trí nhớ", "niềm vui"]),
        answer: "lời hẹn",
        explanation: "約束 nghĩa là lời hẹn."
      },
      N3: {
        format: "one-choice",
        prompt: "「効率」にいちばん近い意味はどれですか。",
        choices: makeChoices("hiệu quả", ["may mắn", "mơ hồ", "nghi ngờ"]),
        answer: "hiệu quả",
        explanation: "効率 nghĩa là hiệu quả."
      },
      N2: {
        format: "one-choice",
        prompt: "「把握」にいちばん近い意味はどれですか。",
        choices: makeChoices("nắm bắt", ["xếp đặt", "phân tán", "kéo dài"]),
        answer: "nắm bắt",
        explanation: "把握 nghĩa là nắm bắt."
      },
      N1: {
        format: "one-choice",
        prompt: "「示唆」にいちばん近い意味はどれですか。",
        choices: makeChoices("gợi ý", ["phủ định", "phân loại", "xóa bỏ"]),
        answer: "gợi ý",
        explanation: "示唆 nghĩa là gợi ý / hàm ý."
      }
    },
    "Grammar/Vocab": {
      N5: {
        format: "sentence-completion",
        prompt: "水を___ください。",
        choices: makeChoices("飲んで", ["飲み", "飲む", "飲め"]),
        answer: "飲んで",
        explanation: "て-form + ください dùng để nhờ hoặc yêu cầu."
      },
      N4: {
        format: "sentence-completion",
        prompt: "雨がふった___、出かけませんでした。",
        choices: makeChoices("ので", ["まで", "より", "しか"]),
        answer: "ので",
        explanation: "ので đưa ra lý do."
      },
      N3: {
        format: "sentence-completion",
        prompt: "留学する___、日本語をもっと勉強したい。",
        choices: makeChoices("ために", ["ので", "しか", "より"]),
        answer: "ために",
        explanation: "ために diễn tả mục đích."
      },
      N2: {
        format: "sentence-completion",
        prompt: "___、新しい方法を試す価値はある。",
        choices: makeChoices("失敗を恐れすぎるより", ["予定がないので", "説明が長いから", "人が多いほど"]),
        answer: "失敗を恐れすぎるより",
        explanation: "Câu này cần một cụm so sánh / đối chiếu."
      },
      N1: {
        format: "sentence-completion",
        prompt: "状況を踏まえると、計画の延期は___を得ない。",
        choices: makeChoices("避けざる", ["避ける", "避けても", "避けない"]),
        answer: "避けざる",
        explanation: "避けざるを得ない = không thể tránh khỏi."
      }
    },
    Reading: {
      N5: {
        format: "reading-passage",
        passage: "駅のとなりに小さいカフェがあります。朝は学生でにぎやかですが、午後になると少し静かになります。店の人は毎日、コーヒーとパンを準備しています。",
        prompt: "「コーヒーを飲みます。紅茶は飲みません。」Câu nào đúng nhất?",
        choices: makeChoices("Người nói uống cà phê, không uống trà", ["Người nói không uống gì", "Người nói chỉ uống trà", "Người nói thích nước lọc"]),
        answer: "Người nói uống cà phê, không uống trà",
        explanation: "は trong câu thứ hai kết hợp với ません tạo phủ định."
      },
      N4: {
        format: "reading-passage",
        passage: "週末の予定について、山田さんは『土曜日は図書館で勉強して、日曜日は友だちと会うつもりです』と言いました。雨が降っても、日曜日の約束は変えないそうです。",
        prompt: "今日は会議があるので、早く帰ります。 Vì sao người nói về sớm?",
        choices: makeChoices("Vì có cuộc họp", ["Vì trời mưa", "Vì muốn đi chơi", "Vì không có việc gì"]),
        answer: "Vì có cuộc họp",
        explanation: "ので ở đây là biểu thị nguyên nhân."
      },
      N3: {
        format: "reading-passage",
        passage: "会社では、毎朝10分だけ全員で今日の予定を確認する時間があります。短い時間ですが、仕事の順番がはっきりするので、午後のミスが少なくなりました。",
        prompt: "雨が強くなったので、傘を持って出かけた。Kết luận hợp lý nhất là gì?",
        choices: makeChoices("Mưa mạnh lên nên đi mang ô", ["Nắng lên nên đi bơi", "Không có lý do gì", "Đi mà không cần ô"]),
        answer: "Mưa mạnh lên nên đi mang ô",
        explanation: "Đây là quan hệ nguyên nhân - kết quả."
      },
      N2: {
        format: "reading-passage",
        passage: "新しい計画は完璧ではありません。しかし、課題が見えているということは、修正の方向も見つけやすいということです。そこで、いま急いで止めるより、少しずつ見直しながら進めるほうが良いと考えられます。",
        prompt: "この件については、状況を見ない限り、すぐに判断できない。 Ý hợp lý nhất là gì?",
        choices: makeChoices("Chưa thể kết luận ngay khi chưa xem tình hình", ["Có thể quyết định ngay", "Tình hình không quan trọng", "Phải hủy mọi việc"]),
        answer: "Chưa thể kết luận ngay khi chưa xem tình hình",
        explanation: "見ない限り = nếu chưa xem / chừng nào chưa xem."
      },
      N1: {
        format: "reading-passage",
        passage: "技術の発展は、生活を便利にする一方で、人に新しい判断を求める。自動化が進めば進むほど、最後に決めるのは人間であるという前提が重くなる。つまり、便利さだけを見て安心するのではなく、その裏で生じる責任の重さにも目を向ける必要がある。",
        prompt: "技術の進歩は便利さをもたらす一方で、人に新しい判断を求める。Ý phù hợp nhất là gì?",
        choices: makeChoices("Công nghệ vừa tiện lợi vừa đòi hỏi con người phải ra quyết định mới", ["Công nghệ không mang lại lợi ích", "Con người không cần học gì thêm", "Công nghệ chỉ tạo ra phiền phức"]),
        answer: "Công nghệ vừa tiện lợi vừa đòi hỏi con người phải ra quyết định mới",
        explanation: "一方で = một mặt..., mặt khác..."
      }
    }
  };

  return [base[sectionLabel]?.[level]].filter(Boolean);
}

function getExtraReadingQuestions(level, sectionLabel) {
  if (sectionLabel !== "Reading") {
    return [];
  }

  const extra = {
    N5: [
      {
        format: "reading-passage",
        passage: "ã‚¢ãƒªã•ã‚“ã¯æ¯æœæ—©ãèµ·ã‘ãŸã‚ã€å…¬åœ’ã‚’æ•£æ­©ã—ã¾ã™ã€‚\n\næœ€è¿‘ã¯ä¸Šã®æ–¹ã¾ã§æ³¨æ„ã—ãªãŒã‚‰æ­©ãã“ã¨ãŒã€ã„ã¡ã°ã‚“åˆã‚ã¾ã—ãŸã€‚",
        prompt: "ã‚¢ãƒªã•ã‚“ã«ã¤ã„ã¦æ­£ã—ã„ã®ã¯ã©ã‚Œã§ã™ã‹ã€‚",
        choices: makeChoices("æœ€è¿‘ã€å§¿å‹¢ã‚’æ„è­˜ã—ã¦æ­©ãã‚ˆã†ã«ãªã£ãŸ", ["æ¯æœã€å…¬åœ’ã§äººã«ä¼šã†", "ãã‚“ãªã«å¤–å‡ºã™ã‚‹ã“ã¨ã¯ãªã„", "æ—©ãèµ·ã‘ãªã„"]),
        answer: "æœ€è¿‘ã€å§¿å‹¢ã‚’æ„è­˜ã—ã¦æ­©ãã‚ˆã†ã«ãªã£ãŸ",
        explanation: "æ–‡ç« ã§ã€æ­©ãã¨ãã«ã„ã¡ã°ã‚“åˆã‚ã¦ã€‚ã¨ã‚ã‚‹ã®ã§ã€ç¿’æ…£ãŒå¤‰åŒ–ã—ãŸã¨èª­ã‚ã‚‹ã€‚"
      }
    ],
    N4: [
      {
        format: "reading-passage",
        passage: "ä¸­å¤®ãƒ»ãƒ‹ãƒ‹ãƒ³ã•ã‚“ã¯ç©ºã„ãŸæ‚é–“ã«é€²ã¦ã„ã‚‹ä¹¦åº—ã§ã€ç§€è¡ã®ãƒŠã‚¤ãƒˆã‚’ã‚ã‚Šã¾ã—ãŸã€‚\n\nã“ã®äººã®è¨€è‘‰ã¯ã€å‡ºæ¥ãªã„ã¨æ€€ã„ã‚„ã‚ŠãŸã„æ°—æŒã¡ãŒå¤‰ã‚ã‚‹ã¨ä¼ åãˆã¦ã„ã¾ã™ã€‚",
        prompt: "ä¸­å¤®ãƒ»ãƒ‹ãƒ‹ãƒ³ã•ã‚“ã®è¨€ã„ãŸã„ã“ã¨ã¯ä½•ã§ã™ã‹ã€‚",
        choices: makeChoices("å°ã•ã„è¡Œå‹•ã§ã‚‚æ°—åˆ†ãŒå¤‰ã‚ã‚‹", ["ä¹¦åº—ã«è¡Œã£ã¦ã‚‚æ„å‘³ãŒãªã„", "å¤œã¯å¥åº·ã«æ‚ªã„", "ç§€è¡Œã¯æœ‰åã§ã‚ã‚‹"]),
        answer: "å°ã•ã„è¡Œå‹•ã§ã‚‚æ°—åˆ†ãŒå¤‰ã‚ã‚‹",
        explanation: "ã‚ã‚Šã¾ã—ãŸã¨æ€€ã„ã‚„ã‚ŠãŸã„æ°—æŒã¡ãŒå¤‰ã‚ã‚‹ã€‚ã¨ã„ã†éƒ¨åˆ†ã‹ã‚‰ã€å°ã•ã„è¡Œå‹•ãŒå¿ƒæƒ…ã«å½±éŸ¿ã™ã‚‹ã¨èª­ã‚ã‚‹ã€‚"
      }
    ],
    N3: [
      {
        format: "reading-passage",
        passage: "ã‚ã‚‹ç”·ã®å­¦ç”Ÿã¯ã€æ¯æ—¥ã®èª²é¡Œã‚’æ¯æ™‚åŒã„ã§æ¸©ã“ã†ã¨ã—ã¦ã„ã¾ã—ãŸã€‚\n\nã—ã‹ã—ã€å†™çœŸã‚’è¦‹ç›´ã—ã¦æ™‚é–“ã‚’çµ¶ã¤ã›ã‚‹ã¨ã€ã‚€ã—ã‚æ–¹é‡Šã§ã‚‚åºã‹ã‚‰ã‚Œã‚‹ã¨æ°—ä»˜ã„ãŸã€‚",
        prompt: "ã“ã®æ–‡ç« ãŒä¼ çãˆãŸã„ã“ã¨ã¯ä½•ã§ã™ã‹ã€‚",
        choices: makeChoices("æ–¹æ³•ã‚’è¦‹ç›´ã™ã¨çµæžœãŒè‰¯ããªã‚‹ã“ã¨ãŒã‚ã‚‹", ["æ®µå–ã‚’ä¸‹ãã‚Œã°å¤±æ•—ã™ã‚‹", "å†™çœŸã¯å½±éŸ¿ã—ãªã„", "æ™‚é–“ã¯å¿…ãšè·‘ã£ãŸæ–¹ãŒã‚ˆã„"]),
        answer: "æ–¹æ³•ã‚’è¦‹ç›´ã™ã¨çµæžœãŒè‰¯ããªã‚‹ã“ã¨ãŒã‚ã‚‹",
        explanation: "å•ã«æ»žã‚‹ã®ã§ã¯ãªãã€æ–¹æ³•ã‚’å¤‰ãˆã‚‹ã¨èƒ½åŠ›ãŒä¸ŠãŒã‚‹ã‚ã¨èª­ã‚ã‚‹ã€‚"
      }
    ],
    N2: [
      {
        format: "reading-passage",
        passage: "æ–°ã—ã„èª¿æŸ»ã§ã¯ã€å‚¾å‘ã‚’äººã«èª­ã¿ã¨ã‚‹ã ã‘ã§ã¯ãªãã€ãªãœãã†ãªã‚‹ã‹ã‚‚æƒ³åƒã™ã‚‹å¿…è¦ãŒã‚ã‚Šã¾ã™ã€‚\n\næ•°å­—ã«è¦‹ãˆã‚‹çµæžœã¨ã€çŽ°ç†ã®è‚‰ã£ã¦ã„ã‚‹åŽŸå›ã‚’ä¸¢ã‚Šã‹ã­ã¦ã¯ã„ã‘ã¾ã›ã‚“ã€‚",
        prompt: "ã“ã®æ–‡ç« ã®ä¸»å¼µã¯ä½•ã§ã™ã‹ã€‚",
        choices: makeChoices("çµæžœã¨åŽŸå›ã‚’ä¸¡æ–¹ã¨è¦‹ã‚‹å¿…è¦ãŒã‚ã‚‹", ["æ•°å­—ã ã‘è¦‹ã‚Œã°ååˆ†", "äººã®æ„æƒ…ã¯ä¸è¦ã§ã‚ã‚‹", "åŽŸå›ã¯å¸¸ã«ä¸€ã¤ã§ã‚ã‚‹"]),
        answer: "çµæžœã¨åŽŸå›ã‚’ä¸¡æ–¹ã¨è¦‹ã‚‹å¿…è¦ãŒã‚ã‚‹",
        explanation: "æ–‡ç« ã§ã¯ã€æ•°å­—ã®çµæžœã ã‘ã§ãªãåŽŸå›ã‚’è¦‹ã‚‹å¿…è¦ãŒã‚ã‚‹ã¨è¨€ã£ã¦ã„ã‚‹ã€‚"
      }
    ],
    N1: [
      {
        format: "reading-passage",
        passage: "ç¤¾ä¼šã®ãƒ«ãƒ¼ãƒ«ã¯ã€é–“é•ã„ã‚’é˜²ãŽã€äººã‚’å®ˆã‚‹ãŸã‚ã«ã‚ã‚‹ã€‚\n\nãã‹ã—ã€ãƒ«ãƒ¼ãƒ«ã®éµå®ˆã«æ³¨å¿ƒãããŽã‚‹ã¨ã€å€‹åˆ¥ã®çŠ¶æ³ã‚’è¦‹ã¤ã‘ã‚‹åŠ›ã‚’å¤±ã„ã‹ã­ãªã„ã€‚",
        prompt: "ã“ã®æ–‡ç« ãŒä¼ çãˆãŸã„ã“ã¨ã¯ä½•ã§ã™ã‹ã€‚",
        choices: makeChoices("ãƒ«ãƒ¼ãƒ«ã¯å¤§åˆ‡ã ãŒã€çŠ¶æ³ã«ã‚ˆã£ã¦ç�µæ´»ã«é‹ç”¨ã™ã‚‹å¿…è¦ãŒã‚ã‚‹", ["ãƒ«ãƒ¼ãƒ«ã¯å¤šã„ã»ã©è‰¯ã„", "äººã‚’å®ˆã‚‹ã«ã¯ãƒ«ãƒ¼ãƒ«ã ã‘ã§ååˆ†", "å€‹åˆ¥ã®çŠ¶æ³ã¯è€ƒãˆãªãã¦ã‚‚ã‚ˆã„"]),
        answer: "ãƒ«ãƒ¼ãƒ«ã¯å¤§åˆ‡ã ãŒã€çŠ¶æ³ã«ã‚ˆã£ã¦ç�µæ´»ã«é‹ç”¨ã™ã‚‹å¿…è¦ãŒã‚ã‚‹",
        explanation: "ãƒ«ãƒ¼ãƒ«ã‚’å®ˆã‚‹ã ã‘ã§ã¯åŠ›ãŒä¸è¶³ã—ãçŠ¶æ³ã‚’è¦‹ã‚‹å¿…è¦ã‚’èª­ã‚ã‚‹ã€‚"
      }
    ]
  };

  return extra[level] ?? [];
}

function sectionedTest({ level, title, passScore, description, sections }) {
  return {
    level,
    title,
    passScore,
    description,
    sections: sections.map((section) => ({
      key: section.key,
      label: section.label,
      timeLimitMinutes: section.timeLimitMinutes,
      questions: section.questions
    })),
    questions: sections.flatMap((section) => {
      const bonusQuestions = getBonusQuestions(level, section.label);
      const extraReadingQuestions = getExtraReadingQuestions(level, section.label);
      const expandedQuestions = [...section.questions, ...bonusQuestions, ...extraReadingQuestions];
      return expandedQuestions.map((question, index) => ({
        id: `${String(level).toLowerCase()}-${section.key}-${index + 1}`,
        section: section.label,
        format: question.format,
        passage: question.passage,
        prompt: question.prompt,
        choices: question.choices,
        answer: question.answer,
        explanation: question.explanation
      }));
    })
  };
}

export const jlptTests = {
  N5: sectionedTest({
    level: "N5",
    title: "JLPT N5 - 3 phan co ban",
    passScore: 60,
    description: "De N5 gom 3 phan ro rang: Language Knowledge, Grammar/Vocab, va Reading. Cac cau duoc sap tang dan do kho.",
    sections: [
      {
        key: "language-knowledge",
        label: "Language Knowledge",
        timeLimitMinutes: 6,
        questions: [
          {
            prompt: "「学校」の意味はどれですか。",
            choices: makeChoices("trường học", ["bệnh viện", "siêu thị", "công viên"]),
            answer: "trường học",
            explanation: "学校 nghĩa là trường học."
          },
          {
            prompt: "「あさ」にいちばん近い意味はどれですか。",
            choices: makeChoices("buổi sáng", ["buổi trưa", "buổi tối", "ngày mai"]),
            answer: "buổi sáng",
            explanation: "あさ là buổi sáng."
          },
          {
            prompt: "「みず」にいちばん近い意味はどれですか。",
            choices: makeChoices("nước", ["cơm", "sách", "bút"]),
            answer: "nước",
            explanation: "みず là nước."
          },
          {
            prompt: "「学生」の読み方はどれですか。",
            choices: makeChoices("がくせい", ["せんせい", "こうこう", "だいがく"]),
            answer: "がくせい",
            explanation: "学生 đọc là がくせい."
          }
        ]
      },
      {
        key: "grammar-vocab",
        label: "Grammar/Vocab",
        timeLimitMinutes: 8,
        questions: [
          {
            prompt: "___ は学生です。",
            choices: makeChoices("わたし", ["わたしが", "わたしを", "わたしに"]),
            answer: "わたし",
            explanation: "は đánh dấu chủ đề của câu."
          },
          {
            prompt: "みずを___ください。",
            choices: makeChoices("のんで", ["のみ", "のむ", "のめ"]),
            answer: "のんで",
            explanation: "て-form + ください dùng để yêu cầu lịch sự."
          },
          {
            prompt: "Tôi đi ___ trường bằng xe buýt.",
            choices: makeChoices("へ", ["で", "を", "に"]),
            answer: "へ",
            explanation: "へ chỉ hướng đi đến nơi nào đó."
          },
          {
            prompt: "水を___ください。",
            choices: makeChoices("飲んで", ["飲み", "飲む", "飲め"]),
            answer: "飲んで",
            explanation: "て-form + ください dùng để nhờ hoặc yêu cầu."
          }
        ]
      },
      {
        key: "reading",
        label: "Reading",
        timeLimitMinutes: 10,
        questions: [
          {
            prompt: "ここはえきです。Ý đúng là gì?",
            choices: makeChoices("Đây là nhà ga", ["Đây là bến xe", "Đây là cửa hàng", "Đây là công viên"]),
            answer: "Đây là nhà ga",
            explanation: "えき nghĩa là nhà ga."
          },
          {
            prompt: "A: これ、いくらですか。 B: 500円です。A đang hỏi gì?",
            choices: makeChoices("Giá bao nhiêu", ["Mấy giờ rồi", "Ở đâu vậy", "Ai là người bán"]),
            answer: "Giá bao nhiêu",
            explanation: "いくらですか dùng để hỏi giá."
          },
          {
            prompt: "「コーヒーを飲みます。紅茶は飲みません。」Câu nào đúng nhất?",
            choices: makeChoices("Người nói uống cà phê, không uống trà", ["Người nói không uống gì", "Người nói chỉ uống trà", "Người nói thích nước lọc"]),
            answer: "Người nói uống cà phê, không uống trà",
            explanation: "は trong câu thứ hai kết hợp với ません tạo phủ định."
          },
          {
            prompt: "「ここはえきです。」の意味はどれですか。",
            choices: makeChoices("Đây là nhà ga", ["Đây là trường học", "Đây là cửa hàng", "Đây là công viên"]),
            answer: "Đây là nhà ga",
            explanation: "えき nghĩa là nhà ga."
          }
        ]
      }
    ]
  }),
  N4: sectionedTest({
    level: "N4",
    title: "JLPT N4 - Cau truc va ngu canh",
    passScore: 65,
    description: "De N4 mo rong sang 3 phan quen thuoc cua JLPT: Language Knowledge, Grammar/Vocab, va Reading.",
    sections: [
      {
        key: "language-knowledge",
        label: "Language Knowledge",
        timeLimitMinutes: 7,
        questions: [
          {
            prompt: "「予定」にいちばん近い意味はどれですか。",
            choices: makeChoices("kế hoạch", ["đồ dùng", "ký ức", "thời tiết"]),
            answer: "kế hoạch",
            explanation: "予定 nghĩa là dự định/kế hoạch."
          },
          {
            prompt: "「便利」の意味はどれですか。",
            choices: makeChoices("tiện lợi", ["đắt đỏ", "ồn ào", "nguy hiểm"]),
            answer: "tiện lợi",
            explanation: "便利 nghĩa là tiện lợi."
          },
          {
            prompt: "「雨」の読み方はどれですか。",
            choices: makeChoices("あめ", ["ゆき", "はれ", "くもり"]),
            answer: "あめ",
            explanation: "雨 đọc là あめ."
          },
          {
            prompt: "「勉強」の意味はどれですか。",
            choices: makeChoices("học tập", ["nghỉ ngơi", "đi lại", "nấu ăn"]),
            answer: "học tập",
            explanation: "勉強 nghĩa là học tập."
          }
        ]
      },
      {
        key: "grammar-vocab",
        label: "Grammar/Vocab",
        timeLimitMinutes: 9,
        questions: [
          {
            prompt: "日本へ行ったことが___。",
            choices: makeChoices("あります", ["できます", "ありますか", "しません"]),
            answer: "あります",
            explanation: "〜たことがある diễn tả trải nghiệm."
          },
          {
            prompt: "音楽を聞き___勉強します。",
            choices: makeChoices("ながら", ["ので", "まで", "より"]),
            answer: "ながら",
            explanation: "〜ながら dùng khi hai hành động xảy ra cùng lúc."
          },
          {
            prompt: "雨がふった___、出かけませんでした。",
            choices: makeChoices("ので", ["まで", "より", "しか"]),
            answer: "ので",
            explanation: "ので đưa ra lý do."
          },
          {
            prompt: "音楽を聞き___、宿題をしました。",
            choices: makeChoices("ながら", ["ので", "しか", "より"]),
            answer: "ながら",
            explanation: "〜ながら thể hiện hai hành động xảy ra cùng lúc."
          }
        ]
      },
      {
        key: "reading",
        label: "Reading",
        timeLimitMinutes: 12,
        questions: [
          {
            prompt: "今日は会議があるので、早く帰ります。 Vì sao người nói về sớm?",
            choices: makeChoices("Vì có cuộc họp", ["Vì trời mưa", "Vì muốn đi chơi", "Vì không có việc gì"]),
            answer: "Vì có cuộc họp",
            explanation: "ので ở đây là biểu thị nguyên nhân."
          },
          {
            prompt: "週末は友だちと映画を見たり、カフェで話したりします。 Ý chính là gì?",
            choices: makeChoices("Cuối tuần làm nhiều việc khác nhau với bạn bè", ["Cuối tuần chỉ ở nhà", "Cuối tuần đi làm", "Cuối tuần học một mình"]),
            answer: "Cuối tuần làm nhiều việc khác nhau với bạn bè",
            explanation: "〜たり〜たりする dùng để liệt kê các hành động tiêu biểu."
          },
          {
            prompt: "この店は安いだけでなく、サービスも良い。 Ý chính là gì?",
            choices: makeChoices("Cửa hàng này rẻ và dịch vụ cũng tốt", ["Cửa hàng này đắt", "Cửa hàng này chỉ đẹp", "Cửa hàng này đóng cửa"]),
            answer: "Cửa hàng này rẻ và dịch vụ cũng tốt",
            explanation: "AだけでなくBも = không chỉ A mà còn B."
          },
          {
            prompt: "今日は会議があるので、早く帰ります。 Vì sao người nói về sớm?",
            choices: makeChoices("Vì có cuộc họp", ["Vì trời mưa", "Vì muốn đi chơi", "Vì không có việc gì"]),
            answer: "Vì có cuộc họp",
            explanation: "ので ở đây là biểu thị nguyên nhân."
          }
        ]
      }
    ]
  }),
  N3: sectionedTest({
    level: "N3",
    title: "JLPT N3 - Suy luan va doan y",
    passScore: 70,
    description: "De N3 bat dau co mau cau phuc tap hon, co phan suy luan va doc hieu logic.",
    sections: [
      {
        key: "language-knowledge",
        label: "Language Knowledge",
        timeLimitMinutes: 8,
        questions: [
          {
            prompt: "「影響」にいちばん近い意味はどれですか。",
            choices: makeChoices("ảnh hưởng", ["kết thúc", "giải thích", "thói quen"]),
            answer: "ảnh hưởng",
            explanation: "影響 nghĩa là ảnh hưởng."
          },
          {
            prompt: "「判断」にいちばん近い意味はどれですか。",
            choices: makeChoices("phán đoán", ["ký ức", "bắt đầu", "tranh luận"]),
            answer: "phán đoán",
            explanation: "判断 nghĩa là phán đoán."
          },
          {
            prompt: "「余裕」にいちばん近い意味はどれですか。",
            choices: makeChoices("dư dả", ["áp lực", "mơ hồ", "tranh cãi"]),
            answer: "dư dả",
            explanation: "余裕 nghĩa là còn dư khoảng trong hoặc nguồn lực."
          }
        ]
      },
      {
        key: "grammar-vocab",
        label: "Grammar/Vocab",
        timeLimitMinutes: 10,
        questions: [
          {
            prompt: "毎朝ニュースを読む___しています。",
            choices: makeChoices("ように", ["ばかり", "しか", "ほど"]),
            answer: "ように",
            explanation: "〜ようにする diễn tả ý thức tạo thói quen."
          },
          {
            prompt: "電車で寝て___、駅を乗り過ごしました。",
            choices: makeChoices("しまって", ["あって", "おいて", "いって"]),
            answer: "しまって",
            explanation: "〜てしまう biểu thị hành động xảy ra ngoài ý muốn."
          },
          {
            prompt: "安いからといって、必ずしも悪い___ない。",
            choices: makeChoices("わけでは", ["はずが", "ように", "ことに"]),
            answer: "わけでは",
            explanation: "〜わけではない phủ định một cách mềm."
          }
        ]
      },
      {
        key: "reading",
        label: "Reading",
        timeLimitMinutes: 14,
        questions: [
          {
            prompt: "彼は忙しいが、時間を作って勉強を続けている。Ý nào đúng nhất?",
            choices: makeChoices("Anh ấy bận nhưng vẫn tiếp tục học", ["Anh ấy bỏ học", "Anh ấy chỉ chơi", "Anh ấy không có thời gian làm gì"]),
            answer: "Anh ấy bận nhưng vẫn tiếp tục học",
            explanation: "Có thời gian nghĩa là cố gắng sắp xếp thời gian."
          },
          {
            prompt: "雨が強くなったので、傘を持って出かけた。Kết luận hợp lý nhất là gì?",
            choices: makeChoices("Mưa mạnh lên nên đi mang ô", ["Nắng lên nên đi bơi", "Không có lý do gì", "Đi mà không cần ô"]),
            answer: "Mưa mạnh lên nên đi mang ô",
            explanation: "Đây là quan hệ nguyên nhân - kết quả."
          },
          {
            prompt: "この店は安いだけでなく、サービスも良い。Ý chính là gì?",
            choices: makeChoices("Cửa hàng này rẻ và dịch vụ cũng tốt", ["Cửa hàng này đắt", "Cửa hàng này chỉ đẹp", "Cửa hàng này đóng cửa"]),
            answer: "Cửa hàng này rẻ và dịch vụ cũng tốt",
            explanation: "Mẫu だけでなく...も nhấn mạnh sự bổ sung."
          }
        ]
      }
    ]
  }),
  N2: sectionedTest({
    level: "N2",
    title: "JLPT N2 - Van phong va suy dien",
    passScore: 75,
    description: "De N2 di vao van phong ro hon, co su nhan biet sac thai va suy luan theo doan.",
    sections: [
      {
        key: "language-knowledge",
        label: "Language Knowledge",
        timeLimitMinutes: 9,
        questions: [
          {
            prompt: "「調整」にいちばん近い意味はどれですか。",
            choices: makeChoices("điều chỉnh", ["xóa bỏ", "hối tiếc", "bắt đầu"]),
            answer: "điều chỉnh",
            explanation: "調整 nghĩa là điều chỉnh."
          },
          {
            prompt: "「促す」にいちばん近い意味はどれですか。",
            choices: makeChoices("thúc giục", ["nghi ngờ", "hủy bỏ", "tách rời"]),
            answer: "thúc giục",
            explanation: "促す nghĩa là thúc giục."
          },
          {
            prompt: "「余地」にいちばん近い意味はどれですか。",
            choices: makeChoices("khoảng trống cho phép", ["màu sắc", "điểm tựa", "sự ngẫu nhiên"]),
            answer: "khoảng trống cho phép",
            explanation: "余地 là khoảng cho phép để làm gì đó."
          }
        ]
      },
      {
        key: "grammar-vocab",
        label: "Grammar/Vocab",
        timeLimitMinutes: 11,
        questions: [
          {
            prompt: "彼の説明には少し無理がある___、結論としては納得できる。",
            choices: makeChoices("ものの", ["とはいえ", "わけでは", "にしては"]),
            answer: "ものの",
            explanation: "ものの = dù cho / mặc dù."
          },
          {
            prompt: "会議を途中で抜ける___わけにはいかない。",
            choices: makeChoices("ことは", ["ものの", "ほうが", "ような"]),
            answer: "ことは",
            explanation: "わけにはいかない = không thể làm."
          },
          {
            prompt: "___、新しい方法を試す価値はある。",
            choices: makeChoices("失敗を恐れすぎるより", ["予定がないので", "説明が長いから", "人が多いほど"]),
            answer: "失敗を恐れすぎるより",
            explanation: "Câu này cần một cụm so sánh / đối chiếu."
          }
        ]
      },
      {
        key: "reading",
        label: "Reading",
        timeLimitMinutes: 16,
        questions: [
          {
            prompt: "予算は限られているが、計画を少し見直せば実現できる。Kết luận phù hợp nhất là gì?",
            choices: makeChoices("Có thể thực hiện nếu điều chỉnh kế hoạch", ["Không thể thực hiện dù làm gì", "Ngân sách không liên quan", "Phải hủy toàn bộ kế hoạch"]),
            answer: "Có thể thực hiện nếu điều chỉnh kế hoạch",
            explanation: "見直せば = xem xét lại."
          },
          {
            prompt: "この企画は完璧ではないが、改善点が明確だから進める価値がある。Kết luận phù hợp nhất là gì?",
            choices: makeChoices("Dự án nên tiếp tục vì điểm cần cải thiện đã rõ", ["Dự án phải dừng ngay", "Dự án hoàn hảo", "Không có cách nào cải thiện"]),
            answer: "Dự án nên tiếp tục vì điểm cần cải thiện đã rõ",
            explanation: "Dự án chưa hoàn hảo nhưng có giá trị tiếp tục."
          },
          {
            prompt: "彼は来ると言っておきながら、結局来なかった。Ý đúng nhất là gì?",
            choices: makeChoices("Anh ấy đã nói sẽ đến nhưng cuối cùng không đến", ["Anh ấy đến đúng giờ", "Anh ấy không nói gì", "Anh ấy đã ở đó từ đầu"]),
            answer: "Anh ấy đã nói sẽ đến nhưng cuối cùng không đến",
            explanation: "と言っておきながら nhấn mạnh sự đối lập với lời đã nói."
          }
        ]
      }
    ]
  }),
  N1: sectionedTest({
    level: "N1",
    title: "JLPT N1 - Van canh cao va tinh te",
    passScore: 80,
    description: "De N1 tap trung vao van phong cao, sac thai tinh te va suy dien dai hon.",
    sections: [
      {
        key: "language-knowledge",
        label: "Language Knowledge",
        questions: [
          {
            prompt: "「皮肉」にいちばん近い意味はどれですか。",
            choices: makeChoices("mỉa mai", ["chân thành", "thuần khiết", "vội vàng"]),
            answer: "mỉa mai",
            explanation: "皮肉 nghĩa là mỉa mai."
          },
          {
            prompt: "「婉曲」にいちばん近い意味はどれですか。",
            choices: makeChoices("diễn đạt vòng vo", ["cứng nhắc", "vội vã", "thô bạo"]),
            answer: "diễn đạt vòng vo",
            explanation: "婉曲 là nói vòng, nói giảm."
          },
          {
            prompt: "「慎重」にいちばん近い意味はどれですか。",
            choices: makeChoices("cẩn trọng", ["táo bạo", "hờ hững", "ngẫu nhiên"]),
            answer: "cẩn trọng",
            explanation: "慎重 nghĩa là cẩn trọng."
          }
        ]
      },
      {
        key: "grammar-vocab",
        label: "Grammar/Vocab",
        questions: [
          {
            prompt: "この変更は、現場の負担を増やす___ではない。",
            choices: makeChoices("ものではない", ["とは限らない", "わけにはいかない", "にすぎない"]),
            answer: "ものではない",
            explanation: "〜ものではない: không nên / không phải là."
          },
          {
            prompt: "状況を踏まえると、計画の延期は___を得ない。",
            choices: makeChoices("避けざる", ["避ける", "避けても", "避けない"]),
            answer: "避けざる",
            explanation: "避けざるを得ない = không thể tránh khỏi."
          },
          {
            prompt: "研究成果は、長年の努力の積み重ねの___生まれたものだ。",
            choices: makeChoices("うえで", ["ゆえに", "あまり", "そばから"]),
            answer: "うえで",
            explanation: "〜のうえで = sau khi / dựa trên."
          }
        ]
      },
      {
        key: "reading",
        label: "Reading",
        questions: [
          {
            prompt: "会議では反対意見も出たが、最終的には計画を見直すことになった。『見直す』に最も近いものはどれですか。",
            choices: makeChoices("xem xét lại", ["bỏ qua", "sao chép", "trì hoãn vô thời hạn"]),
            answer: "xem xét lại",
            explanation: "見直す = xem xét lại."
          },
          {
            prompt: "技術の進歩は便利さをもたらす一方で、人に新しい判断を求める。Ý phù hợp nhất là gì?",
            choices: makeChoices("Công nghệ vừa tiện lợi vừa đòi hỏi con người phải ra quyết định mới", ["Công nghệ không mang lại lợi ích", "Con người không cần học gì thêm", "Công nghệ chỉ tạo ra phiền phức"]),
            answer: "Công nghệ vừa tiện lợi vừa đòi hỏi con người phải ra quyết định mới",
            explanation: "一方で = một mặt..., mặt khác..."
          },
          {
            prompt: "この件については、状況を見ない限り、すぐに判断できない。 Ý hợp lý nhất là gì?",
            choices: makeChoices("Chưa thể kết luận ngay khi chưa xem tình hình", ["Có thể quyết định ngay", "Tình hình không quan trọng", "Phải hủy mọi việc"]),
            answer: "Chưa thể kết luận ngay khi chưa xem tình hình",
            explanation: "見ない限り = nếu chưa xem / chừng nào chưa xem."
          }
        ]
      }
    ]
  })
};
