-- Xóa dữ liệu cũ (nếu có) để tránh trùng lặp khi chạy nhiều lần
TRUNCATE TABLE public.lesson_grammar, public.lesson_kanji, public.lesson_vocabulary, public.lessons, public.grammar, public.kanji, public.vocabulary RESTART IDENTITY CASCADE;

-- 1. Thêm Kanji (N5)
INSERT INTO public.kanji (character, strokes, meaning, onyomi, kunyomi, radical, jlpt_level) VALUES
('水', 4, 'Nước', 'スイ', 'みず', '水', 5),
('食', 9, 'Ăn', 'ショク', 'た.べる, く.う', '食', 5),
('飲', 12, 'Uống', 'イン', 'の.む', '食', 5),
('見', 7, 'Nhìn, Xem', 'ケン', 'み.る, み.える', '見', 5),
('日', 4, 'Ngày, Mặt trời', 'ニチ, ジツ', 'ひ, -び, -か', '日', 5),
('本', 5, 'Sách, Bản gốc', 'ホン', 'もと', '木', 5),
('人', 2, 'Người', 'ジン, ニン', 'ひと', '人', 5),
('行', 6, 'Đi', 'コウ, ギョウ', 'い.く, ゆ.く', '行', 5);

-- 2. Thêm Từ vựng (N5)
INSERT INTO public.vocabulary (word, reading, meaning, jlpt_level, example_sentences) VALUES
('水', 'みず', 'Nước', 5, '[{"ja": "水を飲みます。", "vi": "Tôi uống nước.", "en": "I drink water."}]'),
('食べる', 'たべる', 'Ăn', 5, '[{"ja": "朝ごはんを食べます。", "vi": "Tôi ăn sáng.", "en": "I eat breakfast."}]'),
('飲む', 'のむ', 'Uống', 5, '[{"ja": "お茶を飲みます。", "vi": "Tôi uống trà.", "en": "I drink tea."}]'),
('見る', 'みる', 'Nhìn, Xem', 5, '[{"ja": "テレビを見ます。", "vi": "Tôi xem tivi.", "en": "I watch TV."}]'),
('日本', 'にほん', 'Nhật Bản', 5, '[{"ja": "日本へ行きます。", "vi": "Tôi đi Nhật Bản.", "en": "I go to Japan."}]'),
('日本人', 'にほんじん', 'Người Nhật', 5, '[{"ja": "彼は日本人です。", "vi": "Anh ấy là người Nhật.", "en": "He is Japanese."}]'),
('行く', 'いく', 'Đi', 5, '[{"ja": "学校に行きます。", "vi": "Tôi đi đến trường.", "en": "I go to school."}]');

-- 3. Thêm Ngữ pháp (N5)
INSERT INTO public.grammar (title, explanation, level, examples) VALUES
('〜は〜です', 'Dùng để khẳng định chủ ngữ là một cái gì đó/ai đó. "は" (wa) là trợ từ chỉ chủ đề.', 5, '[{"ja": "私は学生です。", "vi": "Tôi là học sinh.", "en": "I am a student."}, {"ja": "彼は先生です。", "vi": "Anh ấy là giáo viên.", "en": "He is a teacher."}]'),
('〜を〜ます', 'Diễn tả hành động tác động lên một tân ngữ trực tiếp. "を" (o) là trợ từ chỉ tân ngữ.', 5, '[{"ja": "りんごを食べます。", "vi": "Tôi ăn táo.", "en": "I eat an apple."}, {"ja": "水を飲みます。", "vi": "Tôi uống nước.", "en": "I drink water."}]'),
('〜へ行きます', 'Diễn tả phương hướng di chuyển đến một địa điểm nào đó. "へ" (e) là trợ từ chỉ hướng.', 5, '[{"ja": "日本へ行きます。", "vi": "Tôi đi Nhật Bản.", "en": "I go to Japan."}, {"ja": "うちへ帰ります。", "vi": "Tôi về nhà.", "en": "I go home."}]');

-- 4. Thêm Bài học (Lessons) kết hợp cả 3 thành phần
INSERT INTO public.lessons (id, title, level, type, description) VALUES
(1, 'Bài 1: Giới thiệu bản thân & Quốc gia', 5, 'vocab', 'Học cách giới thiệu bản thân và tên các quốc gia cơ bản.'),
(2, 'Bài 2: Các hoạt động hàng ngày', 5, 'vocab', 'Học từ vựng và ngữ pháp về các hành động thường ngày như ăn, uống, nhìn.');

-- 5. Liên kết Bài học với Kanji, Từ vựng, Ngữ pháp (Học tổng hợp)
-- Bài 1
INSERT INTO public.lesson_kanji (lesson_id, kanji_id) SELECT 1, id FROM public.kanji WHERE character IN ('日', '本', '人');
INSERT INTO public.lesson_vocabulary (lesson_id, vocabulary_id) SELECT 1, id FROM public.vocabulary WHERE word IN ('日本', '日本人');
INSERT INTO public.lesson_grammar (lesson_id, grammar_id) SELECT 1, id FROM public.grammar WHERE title = '〜は〜です';

-- Bài 2
INSERT INTO public.lesson_kanji (lesson_id, kanji_id) SELECT 2, id FROM public.kanji WHERE character IN ('水', '食', '飲', '見', '行');
INSERT INTO public.lesson_vocabulary (lesson_id, vocabulary_id) SELECT 2, id FROM public.vocabulary WHERE word IN ('水', '食べる', '飲む', '見る', '行く');
INSERT INTO public.lesson_grammar (lesson_id, grammar_id) SELECT 2, id FROM public.grammar WHERE title IN ('〜を〜ます', '〜へ行きます');
