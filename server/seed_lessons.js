import supabase from './db.js';

const LEVELS = [1, 2, 3, 4, 5];

function lesson(title, description, exampleJa, exampleVi, kanji, vocabulary) {
  const richExplanation = `${description} Mẫu này nên được đọc trong bối cảnh thực tế, không chỉ học thuộc mặt chữ. Khi làm bài, hãy chú ý sắc thái lịch sự, trật tự thành phần câu và các cấu trúc gần nghĩa dễ nhầm.`;
  return {
    title,
    type: 'grammar',
    description,
    kanji,
    vocabulary,
    grammar: [
      {
        title,
        explanation: richExplanation,
        examples: [{ ja: exampleJa, vi: exampleVi }]
      }
    ]
  };
}

function k(character, strokes, meaning, onyomi = '', kunyomi = '') {
  return { character, strokes, meaning, onyomi, kunyomi };
}

function v(word, reading, meaning, exampleJa = '', exampleVi = '') {
  const example_sentences = [
    {
      ja: exampleJa || `${word}を使います。`,
      vi: exampleVi || `Tôi dùng ${meaning.toLowerCase()}.`
    }
  ];

  return { word, reading, meaning, example_sentences };
}

function uniqueBy(items, key) {
  const seen = new Set();
  const result = [];

  for (const item of items) {
    const value = item?.[key];
    if (!value || seen.has(value)) continue;
    seen.add(value);
    result.push(item);
  }

  return result;
}

function rotate(items, offset) {
  if (!items.length) return [];
  const normalized = offset % items.length;
  return [...items.slice(normalized), ...items.slice(0, normalized)];
}

function buildLevelPools(curriculumData) {
  return Object.fromEntries(
    curriculumData.map((section) => {
      const lessons = section.lessons || [];
      return [
        section.level,
        {
          kanji: uniqueBy(lessons.flatMap((item) => item.kanji || []), 'character'),
          vocabulary: uniqueBy(lessons.flatMap((item) => item.vocabulary || []), 'word')
        }
      ];
    })
  );
}

function expandLessonAssets(lessonData, levelPool, lessonIndex) {
  const targetKanjiCount = 6;
  const targetVocabCount = 8;

  const kanjiBase = lessonData.kanji || [];
  const vocabBase = lessonData.vocabulary || [];

  const extraKanjiCount = Math.max(0, targetKanjiCount - kanjiBase.length);
  const extraVocabCount = Math.max(0, targetVocabCount - vocabBase.length);

  const extraKanji = rotate(levelPool.kanji, lessonIndex * 2)
    .filter((item) => !kanjiBase.some((base) => base.character === item.character))
    .slice(0, extraKanjiCount);

  const extraVocab = rotate(levelPool.vocabulary, lessonIndex * 3)
    .filter((item) => !vocabBase.some((base) => base.word === item.word))
    .slice(0, extraVocabCount);

  return {
    ...lessonData,
    kanji: uniqueBy([...kanjiBase, ...extraKanji], 'character'),
    vocabulary: uniqueBy([...vocabBase, ...extraVocab], 'word')
  };
}

const curriculum = [
  {
    level: 5,
    lessons: [
      lesson(
        'Bài 1: Bảng chữ cái',
        'Làm quen với hiragana, katakana và cách đọc cơ bản.',
        'あいうえおを覚えます。',
        'Tôi học bảng chữ cái cơ bản.',
        [k('日', 4, 'Ngày, mặt trời', 'ニチ, ジツ', 'ひ, -か'), k('本', 5, 'Sách, gốc', 'ホン', 'もと'), k('人', 2, 'Người', 'ジン, ニン', 'ひと')],
        [v('ひらがな', 'ひらがな', 'Hiragana'), v('カタカナ', 'カタカナ', 'Katakana'), v('あいさつ', 'あいさつ', 'Lời chào'), v('かな', 'かな', 'Kana')]
      ),
      lesson(
        'Bài 2: Chào hỏi',
        'Học cách chào hỏi, tự giới thiệu và phản hồi lịch sự.',
        'はじめまして、わたしはリンです。',
        'Rất vui được gặp bạn, tôi là Linh.',
        [k('先', 6, 'Trước, tiên', 'セン', 'さき'), k('生', 5, 'Sống, học sinh', 'セイ, ショウ', 'い.きる'), k('名', 6, 'Tên', 'メイ, ミョウ', 'な')],
        [v('こんにちは', 'こんにちは', 'Xin chào'), v('はじめまして', 'はじめまして', 'Rất vui được gặp'), v('ありがとう', 'ありがとう', 'Cảm ơn'), v('よろしく', 'よろしく', 'Mong được giúp đỡ')]
      ),
      lesson(
        'Bài 3: Số đếm và thời gian',
        'Đọc số, hỏi giờ và nói về lịch trình đơn giản.',
        '7時に学校へ行きます。',
        'Tôi đi học lúc 7 giờ.',
        [k('一', 1, 'Một', 'イチ', 'ひと'), k('二', 2, 'Hai', 'ニ', 'ふた'), k('三', 3, 'Ba', 'サン', 'み')],
        [v('いち', 'いち', 'Một'), v('に', 'に', 'Hai'), v('さん', 'さん', 'Ba'), v('じかん', 'じかん', 'Thời gian')]
      ),
      lesson(
        'Bài 4: Trợ từ nền tảng',
        'Ôn lại は, が, を, に, で trong các câu cơ bản.',
        '私はパンを食べます。',
        'Tôi ăn bánh mì.',
        [k('私', 7, 'Tôi', 'シ, サイ', 'わたし'), k('学', 8, 'Học', 'ガク', 'まな.ぶ'), k('校', 10, 'Trường học', 'コウ', '')],
        [v('は', 'は', 'Trợ từ chủ đề'), v('が', 'が', 'Trợ từ chủ ngữ'), v('を', 'を', 'Trợ từ tân ngữ'), v('に', 'に', 'Trợ từ chỉ đích đến')]
      ),
      lesson(
        'Bài 5: Động từ -ます',
        'Làm quen với động từ lịch sự ở thì hiện tại và phủ định.',
        '毎日日本語を勉強します。',
        'Tôi học tiếng Nhật mỗi ngày.',
        [k('行', 6, 'Đi', 'コウ, ギョウ', 'い.く'), k('来', 7, 'Đến', 'ライ', 'く.る'), k('食', 9, 'Ăn', 'ショク', 'た.べる')],
        [v('いきます', 'いきます', 'Đi'), v('きます', 'きます', 'Đến'), v('たべます', 'たべます', 'Ăn'), v('のみます', 'のみます', 'Uống')]
      ),
      lesson(
        'Bài 6: Tính từ i / na',
        'Nhận biết và ghép tính từ để mô tả người, vật và cảm xúc.',
        'この部屋はきれいです。',
        'Căn phòng này sạch sẽ.',
        [k('大', 3, 'To, lớn', 'ダイ, タイ', 'おお.きい'), k('小', 3, 'Nhỏ', 'ショウ', 'ちい.さい'), k('高', 10, 'Cao, đắt', 'コウ', 'たか.い')],
        [v('おおきい', 'おおきい', 'To, lớn'), v('ちいさい', 'ちいさい', 'Nhỏ'), v('たかい', 'たかい', 'Cao, đắt'), v('しずか', 'しずか', 'Yên tĩnh')]
      ),
      lesson(
        'Bài 7: Mẫu câu sở hữu',
        'Diễn tả sở hữu, vị trí và câu chỉ định đơn giản.',
        'これは私の本です。',
        'Đây là quyển sách của tôi.',
        [k('家', 10, 'Nhà', 'カ', 'いえ'), k('友', 4, 'Bạn', 'ユウ', 'とも'), k('本', 5, 'Sách', 'ホン', 'もと')],
        [v('わたしの', 'わたしの', 'Của tôi'), v('これ', 'これ', 'Cái này'), v('それ', 'それ', 'Cái đó'), v('あれ', 'あれ', 'Cái kia')]
      ),
      lesson(
        'Bài 8: Xin phép và yêu cầu',
        'Học cách nhờ vả, xin phép và nói lịch sự hơn.',
        'ちょっと待ってください。',
        'Làm ơn chờ một chút.',
        [k('待', 9, 'Chờ', 'タイ', 'ま.つ'), k('聞', 14, 'Nghe, hỏi', 'ブン, モン', 'き.く'), k('見', 7, 'Nhìn, xem', 'ケン', 'み.る')],
        [v('ください', 'ください', 'Xin hãy'), v('おねがいします', 'おねがいします', 'Làm ơn'), v('ちょっと', 'ちょっと', 'Một chút'), v('まって', 'まって', 'Chờ')]
      ),
      lesson(
        'Bài 9: Gia đình và bạn bè',
        'Từ vựng về người thân, bạn bè và quan hệ cơ bản.',
        '私の家族は4人です。',
        'Gia đình tôi có 4 người.',
        [k('家', 10, 'Nhà', 'カ', 'いえ'), k('族', 11, 'Gia đình', 'ゾク', ''), k('女', 3, 'Nữ', 'ジョ, ニョ', 'おんな')],
        [v('かぞく', 'かぞく', 'Gia đình'), v('ともだち', 'ともだち', 'Bạn bè'), v('はは', 'はは', 'Mẹ'), v('ちち', 'ちち', 'Bố')]
      ),
      lesson(
        'Bài 10: Ôn tập N5',
        'Tổng hợp lại toàn bộ nền tảng N5 trước khi sang cấp độ mới.',
        'N5の文法をもう一度復習します。',
        'Tôi ôn lại ngữ pháp N5 một lần nữa.',
        [k('語', 14, 'Ngôn ngữ, lời nói', 'ゴ', 'かた.る'), k('日', 4, 'Ngày, mặt trời', 'ニチ, ジツ', 'ひ'), k('生', 5, 'Sinh, sống', 'セイ, ショウ', 'い.きる')],
        [v('ふくしゅう', 'ふくしゅう', 'Ôn tập'), v('まとめ', 'まとめ', 'Tổng hợp'), v('ことば', 'ことば', 'Từ ngữ'), v('きほん', 'きほん', 'Cơ bản')]
      )
    ]
  },
  {
    level: 4,
    lessons: [
      lesson(
        'Bài 1: Trải nghiệm quá khứ',
        'Diễn tả điều đã từng làm và chia sẻ trải nghiệm cá nhân.',
        '日本へ行ったことがあります。',
        'Tôi đã từng đi Nhật.',
        [k('旅', 10, 'Du lịch', 'リョ', 'たび'), k('去', 5, 'Đi qua, đã qua', 'キョ', 'さ.る'), k('行', 6, 'Đi', 'コウ, ギョウ', 'い.く')],
        [v('たことがあります', 'たことがあります', 'Đã từng'), v('りょこう', 'りょこう', 'Du lịch'), v('けいけん', 'けいけん', 'Trải nghiệm'), v('いった', 'いった', 'Đã đi')]
      ),
      lesson(
        'Bài 2: Khả năng và sở thích',
        'Nói về điều mình có thể làm, thích làm hoặc không thích làm.',
        '日本語で話すことができます。',
        'Tôi có thể nói bằng tiếng Nhật.',
        [k('話', 13, 'Nói chuyện', 'ワ', 'はな.す'), k('練', 14, 'Luyện', 'レン', 'ね.る'), k('会', 6, 'Gặp, họp', 'カイ, エ', 'あ.う')],
        [v('できます', 'できます', 'Có thể'), v('すき', 'すき', 'Thích'), v('しゅみ', 'しゅみ', 'Sở thích'), v('はなします', 'はなします', 'Nói')]
      ),
      lesson(
        'Bài 3: Đang làm và trạng thái',
        'Dùng các mẫu để diễn tả hành động đang diễn ra hoặc trạng thái hiện tại.',
        '今、友だちを待っています。',
        'Bây giờ tôi đang đợi bạn.',
        [k('今', 4, 'Bây giờ', 'コン', 'いま'), k('中', 4, 'Trong', 'チュウ', 'なか'), k('状', 7, 'Trạng', 'ジョウ', '')],
        [v('しています', 'しています', 'Đang làm'), v('まっています', 'まっています', 'Đang đợi'), v('べんきょうしています', 'べんきょうしています', 'Đang học'), v('いま', 'いま', 'Bây giờ')]
      ),
      lesson(
        'Bài 4: So sánh và mức độ',
        'So sánh hai đối tượng, chọn lựa và diễn tả mức độ hơn kém.',
        'この店のほうが安いです。',
        'Cửa hàng này rẻ hơn.',
        [k('比', 4, 'So sánh', 'ヒ', 'くら.べる'), k('安', 6, 'Rẻ', 'アン', 'やす.い'), k('高', 10, 'Cao, đắt', 'コウ', 'たか.い')],
        [v('より', 'より', 'Hơn'), v('ほうが', 'ほうが', 'Thì hơn'), v('どちら', 'どちら', 'Cái nào'), v('いちばん', 'いちばん', 'Nhất')]
      ),
      lesson(
        'Bài 5: Nguyên nhân và lý do',
        'Nói về nguyên nhân, lý do và kết quả trong ngữ cảnh hằng ngày.',
        '雨なので、外へ行きません。',
        'Vì trời mưa nên tôi không ra ngoài.',
        [k('雨', 8, 'Mưa', 'ウ', 'あめ'), k('理', 11, 'Lý', 'リ', 'ことわり'), k('由', 5, 'Lý do', 'ユウ, ユ', 'よし')],
        [v('ので', 'ので', 'Vì nên'), v('から', 'から', 'Vì'), v('どうして', 'どうして', 'Tại sao'), v('りゆう', 'りゆう', 'Lý do')]
      ),
      lesson(
        'Bài 6: Dự định và mục đích',
        'Diễn tả kế hoạch, ý định và mục tiêu trong tương lai gần.',
        '週末に映画を見に行くつもりです。',
        'Cuối tuần tôi dự định đi xem phim.',
        [k('予', 4, 'Dự', 'ヨ', ''), k('定', 8, 'Định, dự định', 'テイ', 'さだ.める'), k('目', 5, 'Mắt, mục', 'モク', 'め')],
        [v('つもり', 'つもり', 'Dự định'), v('よてい', 'よてい', 'Kế hoạch'), v('もくてき', 'もくてき', 'Mục đích'), v('けいかく', 'けいかく', 'Kế hoạch')]
      ),
      lesson(
        'Bài 7: Lời khuyên và đề nghị',
        'Học cách góp ý, khuyên nhủ và đề xuất lịch sự hơn.',
        'もっとゆっくり話したほうがいいです。',
        'Bạn nên nói chậm hơn một chút.',
        [k('助', 7, 'Giúp', 'ジョ', 'たす.ける'), k('言', 7, 'Nói', 'ゲン, ゴン', 'い.う'), k('必', 5, 'Ắt hẳn', 'ヒツ', '')],
        [v('ほうがいい', 'ほうがいい', 'Nên'), v('べき', 'べき', 'Nên phải'), v('すすめる', 'すすめる', 'Khuyên, đề nghị'), v('ちゅうい', 'ちゅうい', 'Chú ý')]
      ),
      lesson(
        'Bài 8: Thói quen hằng ngày',
        'Mô tả nhịp sinh hoạt, hoạt động lặp lại và thời gian biểu.',
        '毎朝コーヒーを飲みます。',
        'Mỗi sáng tôi uống cà phê.',
        [k('毎', 6, 'Mỗi', 'マイ', 'ごと'), k('朝', 12, 'Sáng', 'チョウ', 'あさ'), k('晩', 12, 'Tối', 'バン', 'よる')],
        [v('まいにち', 'まいにち', 'Mỗi ngày'), v('まいあさ', 'まいあさ', 'Mỗi sáng'), v('しゅうかん', 'しゅうかん', 'Thói quen'), v('くせ', 'くせ', 'Tật, thói quen')]
      ),
      lesson(
        'Bài 9: Hành động liên tục',
        'Nối các hành động, mô tả việc đang diễn ra hoặc liên tiếp.',
        '音楽を聞きながら勉強します。',
        'Tôi học trong lúc nghe nhạc.',
        [k('聞', 14, 'Nghe, hỏi', 'ブン, モン', 'き.く'), k('音', 9, 'Âm thanh', 'オン', 'おと'), k('学', 8, 'Học', 'ガク', 'まな.ぶ')],
        [v('ながら', 'ながら', 'Trong khi'), v('つづける', 'つづける', 'Tiếp tục'), v('どうじに', 'どうじに', 'Đồng thời'), v('おんがく', 'おんがく', 'Âm nhạc')]
      ),
      lesson(
        'Bài 10: Ôn tập N4',
        'Củng cố toàn bộ điểm ngữ pháp thường gặp ở mức N4.',
        'N4の表現をまとめて復習します。',
        'Tôi tổng hợp và ôn lại các mẫu N4.',
        [k('定', 8, 'Định, dự định', 'テイ', 'さだ.める'), k('行', 6, 'Đi', 'コウ, ギョウ', 'い.く'), k('始', 8, 'Bắt đầu', 'シ', 'はじ.める')],
        [v('まとめ', 'まとめ', 'Tổng hợp'), v('復習', 'ふくしゅう', 'Ôn tập'), v('けいかく', 'けいかく', 'Kế hoạch'), v('たび', 'たび', 'Chuyến đi')]
      )
    ]
  },
  {
    level: 3,
    lessons: [
      lesson(
        'Bài 1: Nối câu và diễn giải',
        'Ghép ý bằng cách nói dài hơn và tự nhiên hơn trong văn viết.',
        '説明をつなげて話します。',
        'Tôi nối các ý lại để diễn đạt.',
        [k('理', 11, 'Lý', 'リ', 'ことわり'), k('論', 15, 'Luận', 'ロン', ''), k('説', 14, 'Thuyết, giải thích', 'セツ', 'と.く')],
        [v('ので', 'ので', 'Vì nên'), v('ため', 'ため', 'Do, vì'), v('つまり', 'つまり', 'Tức là'), v('したがって', 'したがって', 'Do đó')]
      ),
      lesson(
        'Bài 2: Suy đoán và phỏng đoán',
        'Dựa vào dấu hiệu để suy ra điều có thể đang xảy ra.',
        '空が暗いので、雨が降りそうです。',
        'Trời tối nên có vẻ sắp mưa.',
        [k('雨', 8, 'Mưa', 'ウ', 'あめ'), k('雲', 12, 'Mây', 'ウン', 'くも'), k('風', 9, 'Gió', 'フウ, フ', 'かぜ')],
        [v('そうです', 'そうです', 'Có vẻ'), v('らしい', 'らしい', 'Nghe nói, có vẻ'), v('たぶん', 'たぶん', 'Có lẽ'), v('きっと', 'きっと', 'Chắc chắn')]
      ),
      lesson(
        'Bài 3: Điều kiện và giả định',
        'Nói về điều kiện, giả định và hệ quả nếu một việc xảy ra.',
        '時間があれば、図書館へ行きます。',
        'Nếu có thời gian, tôi sẽ đi thư viện.',
        [k('条', 7, 'Điều', 'ジョウ', ''), k('件', 6, 'Kiện, điều kiện', 'ケン', ''), k('場', 12, 'Địa điểm, bối cảnh', 'ジョウ, バ', 'ば')],
        [v('なら', 'なら', 'Nếu'), v('ば', 'ば', 'Nếu'), v('たら', 'たら', 'Nếu khi'), v('もし', 'もし', 'Nếu như')]
      ),
      lesson(
        'Bài 4: Bị động cơ bản',
        'Nhận biết câu bị động trong các tình huống quen thuộc.',
        '先生にほめられました。',
        'Tôi đã được thầy cô khen.',
        [k('受', 8, 'Nhận', 'ジュ', 'う.ける'), k('動', 11, 'Động', 'ドウ', 'うご.く'), k('先', 6, 'Trước, tiên', 'セン', 'さき')],
        [v('れる', 'れる', 'Được, bị'), v('られる', 'られる', 'Được, bị'), v('こまる', 'こまる', 'Khó xử'), v('ほめる', 'ほめる', 'Khen')]
      ),
      lesson(
        'Bài 5: Sai khiến cơ bản',
        'Diễn đạt việc cho phép, bắt buộc hoặc khiến ai đó làm gì.',
        '母に早く寝るように言われました。',
        'Tôi được mẹ bảo đi ngủ sớm.',
        [k('使', 8, 'Dùng', 'シ', 'つか.う'), k('命', 8, 'Mệnh lệnh', 'メイ', 'いのち'), k('働', 13, 'Làm việc', 'ドウ', 'はたら.く')],
        [v('せる', 'せる', 'Cho phép / bắt'), v('させる', 'させる', 'Bắt làm'), v('いかせる', 'いかせる', 'Cho đi'), v('させられる', 'させられる', 'Bị bắt làm')]
      ),
      lesson(
        'Bài 6: Mục đích và kết quả',
        'Nói rõ mục tiêu của hành động hoặc kết quả của một lựa chọn.',
        '日本語を上手になるために毎日練習します。',
        'Tôi luyện tập mỗi ngày để giỏi tiếng Nhật.',
        [k('目', 5, 'Mắt, mục', 'モク', 'め'), k('的', 8, 'Đích, tính chất', 'テキ', ''), k('成', 6, 'Thành', 'セイ', 'な.る')],
        [v('ために', 'ために', 'Để'), v('ように', 'ように', 'Để'), v('おかげで', 'おかげで', 'Nhờ'), v('せいで', 'せいで', 'Do, tại')]
      ),
      lesson(
        'Bài 7: Sắc thái và cảm nhận',
        'Phân biệt các cách nói gần nghĩa nhưng khác sắc thái.',
        'この表現は少しかたいです。',
        'Cách diễn đạt này hơi trang trọng.',
        [k('微', 13, 'Vi, nhỏ', 'ビ', 'かす.か'), k('妙', 7, 'Tinh tế', 'ミョウ', 'たえ'), k('細', 11, 'Nhỏ, tinh', 'サイ', 'ほそ.い')],
        [v('かたい', 'かたい', 'Cứng, trang trọng'), v('やわらかい', 'やわらかい', 'Mềm, nhẹ nhàng'), v('きびしい', 'きびしい', 'Nghiêm khắc'), v('あいまい', 'あいまい', 'Mơ hồ')]
      ),
      lesson(
        'Bài 8: Đọc hiểu đoạn ngắn',
        'Luyện đọc đoạn văn ngắn với nhiều thông tin hơn N4.',
        '案内文を読んで意味を考えます。',
        'Tôi đọc thông báo và suy nghĩ về ý nghĩa.',
        [k('文', 4, 'Văn', 'ブン', 'ふみ'), k('章', 11, 'Chương, đoạn', 'ショウ', ''), k('段', 9, 'Đoạn, bậc', 'ダン', '')],
        [v('ようやく', 'ようやく', 'Tóm tắt'), v('しゅし', 'しゅし', 'Chủ ý'), v('ないよう', 'ないよう', 'Nội dung'), v('いんよう', 'いんよう', 'Trích dẫn')]
      ),
      lesson(
        'Bài 9: Từ vựng học thuật',
        'Làm quen với từ vựng xuất hiện trong tài liệu, báo cáo và bài đọc.',
        '理由と結果を整理します。',
        'Tôi sắp xếp lại lý do và kết quả.',
        [k('抽', 8, 'Trừu tượng', 'チュウ', ''), k('象', 12, 'Tượng, hình tượng', 'ショウ', ''), k('資', 13, 'Tư liệu', 'シ', '')],
        [v('りろん', 'りろん', 'Lý thuyết'), v('がいねん', 'がいねん', 'Khái niệm'), v('ぶんせき', 'ぶんせき', 'Phân tích'), v('こうさつ', 'こうさつ', 'Khảo sát')]
      ),
      lesson(
        'Bài 10: Ôn tập N3',
        'Tổng ôn các điểm thường gặp để chuyển sang bài đọc khó hơn.',
        'N3の文法を整理して復習します。',
        'Tôi hệ thống và ôn lại ngữ pháp N3.',
        [k('理', 11, 'Lý', 'リ', 'ことわり'), k('論', 15, 'Luận', 'ロン', ''), k('文', 4, 'Văn', 'ブン', 'ふみ')],
        [v('ふくしゅう', 'ふくしゅう', 'Ôn tập'), v('りかい', 'りかい', 'Hiểu'), v('まとめる', 'まとめる', 'Tổng hợp'), v('けつろん', 'けつろん', 'Kết luận')]
      )
    ]
  },
  {
    level: 2,
    lessons: [
      lesson(
        'Bài 1: Cấu trúc trang trọng',
        'Làm quen với cách nói lịch sự hơn trong văn bản và hội thoại.',
        'ご確認のほど、よろしくお願いします。',
        'Mong bạn xác nhận giúp tôi.',
        [k('議', 20, 'Nghị, thảo luận', 'ギ', ''), k('題', 18, 'Đề tài', 'ダイ', ''), k('資', 13, 'Tư liệu', 'シ', '')],
        [v('ご確認', 'ごかくにん', 'Xác nhận giúp'), v('いたします', 'いたします', 'Xin được làm'), v('申し上げる', 'もうしあげる', 'Kính thưa / nói'), v('ご了承', 'ごりょうしょう', 'Xin hiểu cho')]
      ),
      lesson(
        'Bài 2: Tương phản và nhượng bộ',
        'Nói về hai ý đối lập hoặc chấp nhận một điều kiện khó khăn.',
        '忙しいにもかかわらず、手伝ってくれました。',
        'Dù bận, bạn ấy vẫn giúp tôi.',
        [k('忙', 6, 'Bận', 'ボウ', 'いそが.しい'), k('逆', 9, 'Ngược', 'ギャク', 'さか'), k('条', 7, 'Điều', 'ジョウ', '')],
        [v('にもかかわらず', 'にもかかわらず', 'Mặc dù'), v('しかし', 'しかし', 'Tuy nhiên'), v('それでも', 'それでも', 'Dù vậy'), v('とはいえ', 'とはいえ', 'Dẫu vậy')]
      ),
      lesson(
        'Bài 3: Trích dẫn và suy luận',
        'Diễn đạt lời nói, suy nghĩ và phỏng đoán theo văn cảnh.',
        '彼は来ないだろうと言っていました。',
        'Anh ấy đã nói rằng có lẽ sẽ không đến.',
        [k('言', 7, 'Nói', 'ゲン, ゴン', 'い.う'), k('思', 9, 'Nghĩ', 'シ', 'おも.う'), k('考', 13, 'Suy nghĩ', 'コウ', 'かんが.える')],
        [v('という', 'という', 'Rằng'), v('らしい', 'らしい', 'Nghe nói / có vẻ'), v('ようだ', 'ようだ', 'Có vẻ'), v('とおり', 'とおり', 'Đúng như')]
      ),
      lesson(
        'Bài 4: Mức độ và giới hạn',
        'Nhấn mạnh độ mạnh, giới hạn hoặc phạm vi của một ý.',
        '思ったほど難しくありません。',
        'Không khó như tôi đã nghĩ.',
        [k('限', 9, 'Giới hạn', 'ゲン', 'かぎ.る'), k('度', 9, 'Độ, mức', 'ド', 'たび'), k('程', 12, 'Mức độ', 'テイ', 'ほど')],
        [v('ほど', 'ほど', 'Đến mức'), v('だけ', 'だけ', 'Chỉ'), v('くらい', 'くらい', 'Khoảng'), v('まで', 'まで', 'Cho đến')]
      ),
      lesson(
        'Bài 5: Nguyên nhân và kết quả',
        'Liên kết mạch nguyên nhân và kết quả trong câu dài hơn.',
        '電車が遅れたため、遅刻しました。',
        'Vì tàu đến muộn nên tôi đã trễ giờ.',
        [k('因', 6, 'Nguyên nhân', 'イン', ''), k('果', 8, 'Kết quả', 'カ', 'は.たす'), k('原', 10, 'Nguồn gốc', 'ゲン', 'はら')],
        [v('ため', 'ため', 'Vì / do'), v('ので', 'ので', 'Vì nên'), v('せいで', 'せいで', 'Tại vì'), v('おかげで', 'おかげで', 'Nhờ')]
      ),
      lesson(
        'Bài 6: Văn phong đọc hiểu',
        'Nhận diện các câu thường gặp trong bài đọc và tài liệu thực tế.',
        '記事の要点をまとめます。',
        'Tôi tóm tắt ý chính của bài báo.',
        [k('記', 11, 'Ghi', 'キ', 'しる.す'), k('要', 9, 'Yếu, cần', 'ヨウ', 'かなめ'), k('点', 9, 'Điểm', 'テン', 'つ.ける')],
        [v('要点', 'ようてん', 'Ý chính'), v('まとめ', 'まとめ', 'Tóm tắt'), v('つまり', 'つまり', 'Tức là'), v('内容', 'ないよう', 'Nội dung')]
      ),
      lesson(
        'Bài 7: Cụm từ học thuật',
        'Mở rộng vốn từ dùng trong nghiên cứu, báo cáo và tin tức.',
        '資料を比較して結論を出します。',
        'Tôi so sánh tài liệu rồi rút ra kết luận.',
        [k('比', 4, 'So sánh', 'ヒ', 'くら.べる'), k('較', 13, 'So sánh', 'カク', ''), k('検', 12, 'Kiểm, xét', 'ケン', 'しら.べる')],
        [v('比較', 'ひかく', 'So sánh'), v('検討', 'けんとう', 'Xem xét'), v('分析', 'ぶんせき', 'Phân tích'), v('結論', 'けつろん', 'Kết luận')]
      ),
      lesson(
        'Bài 8: Câu phức và liên kết',
        'Nối nhiều mệnh đề bằng các quan hệ logic tự nhiên hơn.',
        '準備が整い次第、出発します。',
        'Ngay khi chuẩn bị xong, chúng tôi sẽ xuất phát.',
        [k('構', 14, 'Cấu', 'コウ', 'かま.える'), k('成', 6, 'Thành', 'セイ', 'な.る'), k('統', 12, 'Thống', 'トウ', '')],
        [v('ところが', 'ところが', 'Thế nhưng'), v('そのため', 'そのため', 'Vì vậy'), v('したがって', 'したがって', 'Do đó'), v('一方', 'いっぽう', 'Mặt khác')]
      ),
      lesson(
        'Bài 9: Luyện tốc độ',
        'Rèn kỹ năng đọc nhanh và chọn thông tin đúng trọng tâm.',
        '制限時間内に答えを探します。',
        'Tôi tìm câu trả lời trong giới hạn thời gian.',
        [k('時', 10, 'Giờ', 'ジ', 'とき'), k('間', 12, 'Khoảng, giữa', 'カン', 'あいだ'), k('限', 9, 'Giới hạn', 'ゲン', 'かぎ.る')],
        [v('制限時間', 'せいげんじかん', 'Giới hạn thời gian'), v('ざっと', 'ざっと', 'Sơ qua'), v('素早く', 'すばやく', 'Nhanh chóng'), v('重要', 'じゅうよう', 'Quan trọng')]
      ),
      lesson(
        'Bài 10: Ôn tập N2',
        'Tập hợp những cấu trúc quan trọng nhất của mức N2.',
        'N2の表現をまとめて復習します。',
        'Tôi tổng hợp và ôn lại các mẫu N2.',
        [k('論', 15, 'Luận', 'ロン', ''), k('証', 12, 'Chứng', 'ショウ', ''), k('計', 9, 'Kế, tính', 'ケイ', 'はか.る')],
        [v('復習', 'ふくしゅう', 'Ôn tập'), v('総合', 'そうごう', 'Tổng hợp'), v('確認', 'かくにん', 'Xác nhận'), v('判断', 'はんだん', 'Phán đoán')]
      )
    ]
  },
  {
    level: 1,
    lessons: [
      lesson(
        'Bài 1: Sắc thái nâng cao',
        'Nhận biết cách diễn đạt có sắc thái rất gần nhau nhưng khác ý nghĩa.',
        '言葉のニュアンスを見分けます。',
        'Tôi phân biệt sắc thái của từ.',
        [k('概', 13, 'Khái quát', 'ガイ', ''), k('念', 8, 'Niệm, ý nghĩ', 'ネン', ''), k('抽', 8, 'Trừu tượng', 'チュウ', '')],
        [v('意味合い', 'いみあい', 'Sắc thái nghĩa'), v('ニュアンス', 'ニュアンス', 'Sắc thái'), v('示唆', 'しさ', 'Gợi ý, hàm ý'), v('本質', 'ほんしつ', 'Bản chất')]
      ),
      lesson(
        'Bài 2: Diễn đạt trang trọng',
        'Dùng ngôn ngữ phù hợp cho văn bản, thuyết trình và bối cảnh chính thức.',
        '会議では慎重に意見を述べます。',
        'Trong cuộc họp tôi nêu ý kiến một cách thận trọng.',
        [k('機', 16, 'Cơ, máy', 'キ', ''), k('構', 14, 'Cấu', 'コウ', 'かま.える'), k('密', 11, 'Mật', 'ミツ', '')],
        [v('慎重', 'しんちょう', 'Thận trọng'), v('丁寧', 'ていねい', 'Lịch sự'), v('厳密', 'げんみつ', 'Nghiêm ngặt'), v('形式', 'けいしき', 'Hình thức')]
      ),
      lesson(
        'Bài 3: Văn viết học thuật',
        'Làm quen với cách viết chặt chẽ, logic và súc tích hơn.',
        '研究の目的を明確に示します。',
        'Tôi nêu rõ mục tiêu của nghiên cứu.',
        [k('論', 15, 'Luận', 'ロン', ''), k('文', 4, 'Văn', 'ブン', 'ふみ'), k('章', 11, 'Chương', 'ショウ', '')],
        [v('主張', 'しゅちょう', 'Chủ trương'), v('根拠', 'こんきょ', 'Căn cứ'), v('研究', 'けんきゅう', 'Nghiên cứu'), v('目的', 'もくてき', 'Mục đích')]
      ),
      lesson(
        'Bài 4: Phủ định tinh tế',
        'Hiểu các cách phủ định gián tiếp hoặc giảm nhẹ trong câu.',
        '必ずしも正しいとは言えません。',
        'Không thể nói là lúc nào cũng đúng.',
        [k('非', 8, 'Phi, không', 'ヒ', ''), k('必', 5, 'Ắt hẳn', 'ヒツ', ''), k('全', 6, 'Toàn bộ', 'ゼン', 'すべ.て')],
        [v('必ずしも', 'かならずしも', 'Không nhất thiết'), v('決して', 'けっして', 'Tuyệt đối không'), v('あながち', 'あながち', 'Không hẳn'), v('全く', 'まったく', 'Hoàn toàn')]
      ),
      lesson(
        'Bài 5: Câu nhấn mạnh',
        'Học cách nhấn trọng tâm và làm nổi bật phần quan trọng của câu.',
        '大切なのは続けることです。',
        'Điều quan trọng là phải tiếp tục.',
        [k('重', 9, 'Nặng, trọng', 'ジュウ', 'おも.い'), k('要', 9, 'Yếu, cần', 'ヨウ', 'かなめ'), k('核', 10, 'Hạt nhân, cốt lõi', 'カク', '')],
        [v('こそ', 'こそ', 'Chính là'), v('まさに', 'まさに', 'Quả thật'), v('とりわけ', 'とりわけ', 'Đặc biệt'), v('こそが', 'こそが', 'Chính là')]
      ),
      lesson(
        'Bài 6: Liên kết logic dài',
        'Kết nối nhiều ý trong một đoạn văn dài mà vẫn giữ mạch tự nhiên.',
        '理由を整理したうえで結論を述べます。',
        'Tôi sắp xếp lý do rồi mới nêu kết luận.',
        [k('因', 6, 'Nguyên nhân', 'イン', ''), k('果', 8, 'Kết quả', 'カ', 'は.たす'), k('続', 13, 'Tiếp tục', 'ゾク', 'つづ.く')],
        [v('したがって', 'したがって', 'Do đó'), v('それゆえ', 'それゆえ', 'Vì vậy'), v('その結果', 'そのけっか', 'Kết quả là'), v('もっとも', 'もっとも', 'Tuy nhiên')]
      ),
      lesson(
        'Bài 7: Diễn giải và ẩn ý',
        'Đọc được hàm ý, ẩn dụ và cách nói vòng trong văn bản nâng cao.',
        '文脈から本当の意味を読み取ります。',
        'Tôi đọc ra ý nghĩa thật từ ngữ cảnh.',
        [k('示', 5, 'Chỉ ra', 'ジ', 'しめ.す'), k('唆', 11, 'Gợi ý', 'サ', ''), k('解', 13, 'Giải', 'カイ', 'と.く')],
        [v('含意', 'がんい', 'Hàm ý'), v('皮肉', 'ひにく', 'Mỉa mai'), v('暗示', 'あんじ', 'Ám chỉ'), v('文脈', 'ぶんみゃく', 'Ngữ cảnh')]
      ),
      lesson(
        'Bài 8: Đọc hiểu tổng hợp',
        'Luyện bài đọc dài với nhiều lớp thông tin và câu hỏi suy luận.',
        '複数の情報を比べて理解します。',
        'Tôi so sánh nhiều thông tin để hiểu bài.',
        [k('複', 14, 'Phức', 'フク', ''), k('数', 13, 'Số', 'スウ', 'かず'), k('情', 11, 'Tình', 'ジョウ', '')],
        [v('比較', 'ひかく', 'So sánh'), v('把握', 'はあく', 'Nắm bắt'), v('要旨', 'ようし', 'Ý chính'), v('具体的', 'ぐたいてき', 'Cụ thể')]
      ),
      lesson(
        'Bài 9: Từ vựng cấp cao',
        'Mở rộng vốn từ thường xuất hiện trong báo cáo, bình luận và tin tức.',
        '抽象的な概念を説明します。',
        'Tôi giải thích các khái niệm trừu tượng.',
        [k('抽', 8, 'Trừu tượng', 'チュウ', ''), k('象', 12, 'Tượng, hình tượng', 'ショウ', ''), k('界', 9, 'Giới', 'カイ', 'さかい')],
        [v('前提', 'ぜんてい', 'Tiền đề'), v('構想', 'こうそう', 'Ý tưởng tổng thể'), v('省察', 'せいさつ', 'Tự suy xét'), v('洗練', 'せんれん', 'Tinh luyện')]
      ),
      lesson(
        'Bài 10: Ôn tập N1',
        'Hệ thống lại phần khó nhất trước khi bước vào giai đoạn luyện đề sâu.',
        'N1の表現を総復習します。',
        'Tôi ôn tập toàn bộ biểu đạt N1.',
        [k('概', 13, 'Khái quát', 'ガイ', ''), k('念', 8, 'Niệm, ý nghĩ', 'ネン', ''), k('論', 15, 'Luận', 'ロン', '')],
        [v('総復習', 'そうふくしゅう', 'Ôn tập tổng hợp'), v('応用', 'おうよう', 'Ứng dụng'), v('体系', 'たいけい', 'Hệ thống'), v('仕上げ', 'しあげ', 'Hoàn thiện')]
      )
    ]
  }
];

async function upsertKanji(item, level) {
  const { data: existing, error: lookupError } = await supabase
    .from('kanji')
    .select('id')
    .eq('character', item.character)
    .maybeSingle();

  if (lookupError) throw lookupError;
  if (existing) return existing.id;

  const { data, error } = await supabase
    .from('kanji')
    .insert([{ ...item, jlpt_level: level }])
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

async function upsertVocabulary(item, level) {
  const { data: existing, error: lookupError } = await supabase
    .from('vocabulary')
    .select('id')
    .eq('word', item.word)
    .eq('reading', item.reading)
    .eq('jlpt_level', level)
    .maybeSingle();

  if (lookupError) throw lookupError;
  if (existing) return existing.id;

  const { data, error } = await supabase
    .from('vocabulary')
    .insert([{ ...item, jlpt_level: level }])
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

async function seedLessons() {
  console.log('Seeding roadmap lessons for N5 to N1...');

  const levelPools = buildLevelPools(curriculum);

  const { error: lessonDeleteError } = await supabase.from('lessons').delete().in('level', LEVELS);
  if (lessonDeleteError) {
    console.error('Error clearing lessons:', lessonDeleteError);
    return;
  }

  await Promise.all([
    supabase.from('kanji').delete().in('jlpt_level', LEVELS),
    supabase.from('vocabulary').delete().in('jlpt_level', LEVELS),
    supabase.from('grammar').delete().in('level', LEVELS)
  ]);

  for (const section of curriculum) {
    const levelPool = levelPools[section.level] || { kanji: [], vocabulary: [] };

    for (const [lessonIndex, lessonDataRaw] of section.lessons.entries()) {
      const lessonData = expandLessonAssets(lessonDataRaw, levelPool, lessonIndex);
      const { data: lessonRow, error: lessonError } = await supabase
        .from('lessons')
        .insert([{
          title: lessonData.title,
          level: section.level,
          type: lessonData.type,
          description: lessonData.description
        }])
        .select()
        .single();

      if (lessonError || !lessonRow) {
        console.error(`Error inserting lesson "${lessonData.title}":`, lessonError);
        continue;
      }

      for (const kanjiItem of lessonData.kanji) {
        try {
          const kanjiId = await upsertKanji(kanjiItem, section.level);
          await supabase.from('lesson_kanji').insert([{ lesson_id: lessonRow.id, kanji_id: kanjiId }]);
        } catch (error) {
          console.error(`Error inserting kanji for "${lessonData.title}":`, error);
        }
      }

      for (const vocabItem of lessonData.vocabulary) {
        try {
          const vocabularyId = await upsertVocabulary(vocabItem, section.level);
          await supabase.from('lesson_vocabulary').insert([{ lesson_id: lessonRow.id, vocabulary_id: vocabularyId }]);
        } catch (error) {
          console.error(`Error inserting vocabulary for "${lessonData.title}":`, error);
        }
      }

      for (const grammarItem of lessonData.grammar) {
        const { data: grammarRow, error: grammarError } = await supabase
          .from('grammar')
          .insert([{
            title: grammarItem.title,
            explanation: grammarItem.explanation,
            examples: grammarItem.examples,
            level: section.level
          }])
          .select()
          .single();

        if (grammarError || !grammarRow) {
          console.error(`Error inserting grammar for "${lessonData.title}":`, grammarError);
          continue;
        }

        await supabase.from('lesson_grammar').insert([{ lesson_id: lessonRow.id, grammar_id: grammarRow.id }]);
      }
    }
  }

  console.log('Roadmap lesson seeding completed successfully.');
}

seedLessons();
