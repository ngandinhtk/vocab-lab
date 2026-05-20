import supabase from './db.js';

async function seedLessons() {
  console.log('Seeding level-based curriculum (Lessons + Kanji + Vocab + Grammar)...');

  // 1. Clear existing data related to N5 and N4 lessons to avoid duplicates
  const { error: delLessonError } = await supabase.from('lessons').delete().in('level', [5, 4]);
  if (delLessonError) {
    console.error('Error clearing old lessons:', delLessonError);
    return;
  }
  
  // Also clean up Kanji, Vocab, and Grammar for N5 and N4 (this will cascade to junction tables)
  await supabase.from('kanji').delete().in('jlpt_level', [5, 4]);
  await supabase.from('vocabulary').delete().in('jlpt_level', [5, 4]);
  await supabase.from('grammar').delete().in('level', [5, 4]);

  // ==========================================
  // CURRICULUM DATA
  // ==========================================
  const curriculum = [
    {
      level: 5,
      lessons: [
        {
          title: "Bài 1: Làm quen & Chào hỏi",
          type: "vocab",
          description: "Những từ vựng và ngữ pháp cơ bản nhất để giới thiệu bản thân.",
          kanji: [
            { character: "日", strokes: 4, meaning: "Ngày, Mặt trời", onyomi: "ニチ, ジツ", kunyomi: "ひ, -か", radical: "日" },
            { character: "本", strokes: 5, meaning: "Sách, Bản gốc", onyomi: "ホン", kunyomi: "もと", radical: "木" },
            { character: "人", strokes: 2, meaning: "Người", onyomi: "ジン, ニン", kunyomi: "ひと", radical: "人" }
          ],
          vocabulary: [
            { word: "私", reading: "わたし", meaning: "Tôi" },
            { word: "日本", reading: "にほん", meaning: "Nhật Bản" },
            { word: "日本人", reading: "にほんじん", meaning: "Người Nhật" },
            { word: "学生", reading: "がくせい", meaning: "Học sinh, Sinh viên" },
            { word: "先生", reading: "せんせい", meaning: "Giáo viên" }
          ],
          grammar: [
            {
              title: "N1 は N2 です",
              explanation: "Câu khẳng định: N1 là N2. 'は' (wa) là trợ từ chỉ chủ đề.",
              examples: [
                { ja: "私は学生です。", vi: "Tôi là sinh viên." },
                { ja: "彼は日本人です。", vi: "Anh ấy là người Nhật." }
              ]
            },
            {
              title: "N1 は N2 じゃありません",
              explanation: "Câu phủ định: N1 không phải là N2.",
              examples: [
                { ja: "私は先生じゃありません。", vi: "Tôi không phải là giáo viên." }
              ]
            }
          ]
        },
        {
          title: "Bài 2: Sinh hoạt hàng ngày",
          type: "vocab",
          description: "Nói về các hành động diễn ra hàng ngày như ăn, uống, đi lại.",
          kanji: [
            { character: "水", strokes: 4, meaning: "Nước", onyomi: "スイ", kunyomi: "みず", radical: "水" },
            { character: "食", strokes: 9, meaning: "Ăn", onyomi: "ショク", kunyomi: "た.べる", radical: "食" },
            { character: "飲", strokes: 12, meaning: "Uống", onyomi: "イン", kunyomi: "の.む", radical: "食" },
            { character: "行", strokes: 6, meaning: "Đi", onyomi: "コウ, ギョウ", kunyomi: "い.く", radical: "行" }
          ],
          vocabulary: [
            { word: "水", reading: "みず", meaning: "Nước" },
            { word: "食べる", reading: "たべる", meaning: "Ăn" },
            { word: "飲む", reading: "のむ", meaning: "Uống" },
            { word: "行く", reading: "いく", meaning: "Đi" },
            { word: "学校", reading: "がっこう", meaning: "Trường học" }
          ],
          grammar: [
            {
              title: "N を Vます",
              explanation: "Hành động tác động lên đối tượng. 'を' (o) là trợ từ chỉ tân ngữ trực tiếp.",
              examples: [
                { ja: "水を飲みます。", vi: "Tôi uống nước." },
                { ja: "パンを食べます。", vi: "Tôi ăn bánh mì." }
              ]
            },
            {
              title: "N へ 行きます",
              explanation: "Di chuyển đến một địa điểm. 'へ' (e) là trợ từ chỉ hướng.",
              examples: [
                { ja: "学校へ行きます。", vi: "Tôi đi đến trường." },
                { ja: "日本へ行きます。", vi: "Tôi đi Nhật." }
              ]
            }
          ]
        }
      ]
    },
    {
      level: 4,
      lessons: [
        {
          title: "Bài 1: Kinh nghiệm và Khả năng",
          type: "vocab",
          description: "Nói về những việc đã từng làm hoặc có thể làm.",
          kanji: [
            { character: "乗", strokes: 9, meaning: "Lên xe, cỡi", onyomi: "ジョウ", kunyomi: "の.る", radical: "丿" },
            { character: "語", strokes: 14, meaning: "Ngôn ngữ", onyomi: "ゴ", kunyomi: "かた.る", radical: "言" }
          ],
          vocabulary: [
            { word: "乗る", reading: "のる", meaning: "Lên (xe, tàu...)" },
            { word: "日本語", reading: "にほんご", meaning: "Tiếng Nhật" },
            { word: "話す", reading: "はなす", meaning: "Nói chuyện" },
            { word: "泳ぐ", reading: "およぐ", meaning: "Bơi" }
          ],
          grammar: [
            {
              title: "Vた ことがあります",
              explanation: "Diễn tả một kinh nghiệm, trải nghiệm trong quá khứ (đã từng làm gì đó).",
              examples: [
                { ja: "日本へ行ったことがあります。", vi: "Tôi đã từng đến Nhật Bản." },
                { ja: "馬に乗ったことがありますか。", vi: "Bạn đã từng cưỡi ngựa chưa?" }
              ]
            },
            {
              title: "Vることができる",
              explanation: "Diễn tả khả năng có thể làm một việc gì đó.",
              examples: [
                { ja: "日本語を話すことができます。", vi: "Tôi có thể nói tiếng Nhật." },
                { ja: "泳ぐことができます。", vi: "Tôi có thể bơi." }
              ]
            }
          ]
        }
      ]
    }
  ];

  // ==========================================
  // INSERTION LOGIC
  // ==========================================
  for (const levelData of curriculum) {
    const level = levelData.level;
    
    for (const lessonData of levelData.lessons) {
      // 1. Insert Lesson
      const { data: lesson, error: lError } = await supabase
        .from('lessons')
        .insert([{
          title: lessonData.title,
          level: level,
          type: lessonData.type,
          description: lessonData.description
        }])
        .select()
        .single();
        
      if (lError) {
        console.error('Error inserting lesson:', lError);
        continue;
      }
      console.log(`Created Lesson: ${lesson.title}`);

      // 2. Insert Kanji and Link
      for (const kData of lessonData.kanji) {
        let kanjiId;
        // Try to insert
        const { data: kNew, error: kErr } = await supabase
          .from('kanji')
          .insert([{ ...kData, jlpt_level: level }])
          .select()
          .single();
        
        if (kErr && kErr.code === '23505') { // Unique constraint violation (Kanji already exists)
           const { data: kExist } = await supabase.from('kanji').select('id').eq('character', kData.character).single();
           kanjiId = kExist.id;
        } else if (kNew) {
           kanjiId = kNew.id;
        }

        if (kanjiId) {
          await supabase.from('lesson_kanji').insert([{ lesson_id: lesson.id, kanji_id: kanjiId }]);
        }
      }

      // 3. Insert Vocabulary and Link
      for (const vData of lessonData.vocabulary) {
        const { data: vNew, error: vErr } = await supabase
          .from('vocabulary')
          .insert([{ ...vData, jlpt_level: level }])
          .select()
          .single();
        
        if (vNew) {
          await supabase.from('lesson_vocabulary').insert([{ lesson_id: lesson.id, vocabulary_id: vNew.id }]);
        }
      }

      // 4. Insert Grammar and Link
      for (const gData of lessonData.grammar) {
        const { data: gNew, error: gErr } = await supabase
          .from('grammar')
          .insert([{ ...gData, level: level }])
          .select()
          .single();
        
        if (gNew) {
          await supabase.from('lesson_grammar').insert([{ lesson_id: lesson.id, grammar_id: gNew.id }]);
        }
      }
    }
  }

  console.log('Curriculum seeding completed successfully.');
}

seedLessons();
