import supabase from './db.js';

async function seedJlpt() {
  console.log('Seeding JLPT tests and questions...');

  // 1. Clear existing data
  const { error: delQError } = await supabase.from('jlpt_questions').delete().neq('id', 0);
  const { error: delTError } = await supabase.from('jlpt_tests').delete().neq('id', 0);

  if (delQError || delTError) {
    console.error('Error clearing data:', delQError || delTError);
    return;
  }

  const tests = [
    {
      level: 5,
      title: "Mini mock test N5",
      description: "Câu ngắn, dễ hiểu, tập trung vào trợ từ và mẫu câu nền tảng.",
      pass_score: 60,
      questions: [
        {
          section: "Ngữ pháp",
          prompt: "___ は学生です。",
          choices: ["わたし", "わたしが", "わたしを", "わたしに"],
          answer: "わたし",
          explanation: "は đánh dấu chủ đề của câu."
        },
        {
          section: "Ngữ pháp",
          prompt: "水を___ください。",
          choices: ["飲んで", "飲み", "飲む", "飲め"],
          answer: "飲んで",
          explanation: "Mẫu てください dùng để nhờ hoặc yêu cầu."
        },
        {
          section: "Từ vựng",
          prompt: "「学校」の意味はどれですか。",
          choices: ["trường học", "bệnh viện", "thư viện", "siêu thị"],
          answer: "trường học",
          explanation: "学校 nghĩa là trường học."
        },
        {
          section: "Đọc hiểu",
          prompt: "レストランは ここ です。 Ý đúng là gì?",
          choices: ["Nhà hàng ở đây", "Nhà hàng ở kia", "Không có nhà hàng", "Tôi thích nhà hàng"],
          answer: "Nhà hàng ở đây",
          explanation: "ここ có nghĩa là ở đây."
        }
      ]
    },
    {
      level: 4,
      title: "Mini mock test N4",
      description: "Câu dài hơn, có trải nghiệm, thói quen và trình tự hành động.",
      pass_score: 65,
      questions: [
        {
          section: "Ngữ pháp",
          prompt: "日本へ行った___があります。",
          choices: ["こと", "の", "よう", "だけ"],
          answer: "こと",
          explanation: "Vた + ことがある diễn tả trải nghiệm."
        },
        {
          section: "Ngữ pháp",
          prompt: "音楽を聞き___勉強します。",
          choices: ["ながら", "たり", "まで", "しか"],
          answer: "ながら",
          explanation: "ながら diễn tả hai hành động cùng lúc."
        },
        {
          section: "Từ vựng",
          prompt: "「雨」の読み方はどれですか。",
          choices: ["あめ", "ゆき", "はな", "やま"],
          answer: "あめ",
          explanation: "雨 đọc là あめ."
        },
        {
          section: "Đọc hiểu",
          prompt: "休日は映画を見たり寝たりします. Ý đúng là gì?",
          choices: ["Ngày nghỉ làm nhiều việc khác nhau", "Chỉ xem phim", "Chỉ ngủ", "Không làm gì cả"],
          answer: "Ngày nghỉ làm nhiều việc khác nhau",
          explanation: "〜たり〜たりする dùng để liệt kê các hành động điển hình."
        }
      ]
    },
    {
      level: 3,
      title: "Mini mock test N3",
      description: "Bắt đầu kiểm tra khả năng suy luận ngữ pháp và đọc hiểu ngắn.",
      pass_score: 70,
      questions: [
        {
          section: "Ngữ pháp",
          prompt: "日本語が少し読める___になりました。",
          choices: ["よう", "こと", "ので", "しか"],
          answer: "よう",
          explanation: "ようになる dùng cho sự thay đổi trạng thái."
        },
        {
          section: "Ngữ pháp",
          prompt: "雨가 降り___です。",
          choices: ["そう", "らしい", "だけ", "ほど"],
          answer: "そう",
          explanation: "そうだ ở đây mang nghĩa suy đoán từ dấu hiệu trước mắt."
        },
        {
          section: "Từ vựng",
          prompt: "「必要」の意味はどれですか。",
          choices: ["cần thiết", "thành công", "đúng giờ", "đẹp"],
          answer: "cần thiết",
          explanation: "必要 nghĩa là cần thiết."
        },
        {
          section: "Đọc hiểu",
          prompt: "彼は忙しいらしいです。 Câu này gần nhất với nghĩa nào?",
          choices: ["Nghe nói anh ấy có vẻ bận", "Anh ấy chắc chắn đang ngủ", "Anh ấy không bận", "Anh ấy thích ăn"],
          answer: "Nghe nói anh ấy có vẻ bận",
          explanation: "らしい ở đây là phỏng đoán gián tiếp."
        }
      ]
    },
    {
      level: 2,
      title: "Mini mock test N2",
      description: "Ngữ pháp trừu tượng hơn, nhiều câu văn mang tính học thuật.",
      pass_score: 75,
      questions: [
        {
          section: "Ngữ pháp",
          prompt: "嫌いなわけ___ないです。",
          choices: ["では", "가", "を", "へ"],
          answer: "では",
          explanation: "わけではない là phủ định mềm."
        },
        {
          section: "Ngữ pháp",
          prompt: "彼は知っている___違いない。",
          choices: ["に", "で", "を", "へ"],
          answer: "に",
          explanation: "に違いない diễn tả suy đoán mạnh."
        },
        {
          section: "Từ vựng",
          prompt: "「判断」の意味はどれですか。",
          choices: ["phán đoán", "ký ức", "khởi đầu", "tranh luận"],
          answer: "phán đoán",
          explanation: "判断 nghĩa là phán đoán, đánh giá."
        },
        {
          section: "Đọc hiểu",
          prompt: "インターネットを通じて学びました。 Ý đúng là gì?",
          choices: ["Học thông qua Internet", "Học trên lớp", "Học rất nhanh", "Không học gì cả"],
          answer: "Học thông qua Internet",
          explanation: "を通じて dùng với nghĩa 'thông qua'."
        }
      ]
    },
    {
      level: 1,
      title: "Mini mock test N1",
      description: "Câu văn dài hơn, sắc thái trang trọng và đọc hiểu logic hơn.",
      pass_score: 80,
      questions: [
        {
          section: "Ngữ pháp",
          prompt: "これは努力の結果に___ない。",
          choices: ["ほか", "さえ", "だけ", "ほど"],
          answer: "ほか",
          explanation: "にほかならない là mẫu nhấn mạnh rất trang trọng."
        },
        {
          section: "Ngữ pháp",
          prompt: "事情があるので、行か___得ない。",
          choices: ["ざるを", "ない", "なくて", "ないで"],
          answer: "ざるを",
          explanation: "ざるを得ない nghĩa là buộc phải làm."
        },
        {
          section: "Từ vựng",
          prompt: "「核心」の意味はどれですか。",
          choices: ["trọng tâm", "màu sắc", "chiếc hộp", "âm thanh"],
          answer: "trọng tâm",
          explanation: "核心 là trọng tâm, cốt lõi."
        },
        {
          section: "Đọc hiểu",
          prompt: "経験に加えて、判断力 cũng quan trọng. Ý chính là gì?",
          choices: ["Ngoài kinh nghiệm, phán đoán cũng quan trọng", "Chỉ kinh nghiệm là đủ", "Chỉ phán đoán là đủ", "Không cần gì cả"],
          answer: "Ngoài kinh nghiệm, phán đoán cũng quan trọng",
          explanation: "に加えて nghĩa là ngoài ra / cộng thêm."
        }
      ]
    }
  ];

  for (const testData of tests) {
    const { questions, ...testInfo } = testData;
    
    const { data: test, error: tError } = await supabase
      .from('jlpt_tests')
      .insert([testInfo])
      .select()
      .single();

    if (tError) {
      console.error(`Error inserting test ${testInfo.title}:`, tError);
      continue;
    }

    const questionsWithTestId = questions.map(q => ({ ...q, test_id: test.id }));
    const { error: qError } = await supabase
      .from('jlpt_questions')
      .insert(questionsWithTestId);

    if (qError) {
      console.error(`Error inserting questions for test ${test.id}:`, qError);
    } else {
      console.log(`Successfully seeded test: ${test.title}`);
    }
  }

  console.log('JLPT seeding completed.');
}

seedJlpt();
