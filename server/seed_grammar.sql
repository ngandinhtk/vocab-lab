INSERT INTO levels (name, description) VALUES ('N5', 'Beginner Japanese') ON CONFLICT (name) DO NOTHING;
INSERT INTO levels (name, description) VALUES ('N4', 'Elementary Japanese') ON CONFLICT (name) DO NOTHING;
INSERT INTO levels (name, description) VALUES ('N3', 'Intermediate Japanese') ON CONFLICT (name) DO NOTHING;
INSERT INTO levels (name, description) VALUES ('N2', 'Upper-Intermediate Japanese') ON CONFLICT (name) DO NOTHING;
INSERT INTO levels (name, description) VALUES ('N1', 'Advanced Japanese') ON CONFLICT (name) DO NOTHING;

DO $$
DECLARE
    n5_id INTEGER;
    n4_id INTEGER;
    n3_id INTEGER;
    n2_id INTEGER;
    n1_id INTEGER;
BEGIN
    SELECT id INTO n5_id FROM levels WHERE name = 'N5';
    SELECT id INTO n4_id FROM levels WHERE name = 'N4';
    SELECT id INTO n3_id FROM levels WHERE name = 'N3';
    SELECT id INTO n2_id FROM levels WHERE name = 'N2';
    SELECT id INTO n1_id FROM levels WHERE name = 'N1';

    INSERT INTO grammar_points (level_id, title, structure, meaning, examples, notes) VALUES
    (n5_id, '~は (wa)', 'N は N です', 'A is B (topic particle)', ARRAY['わたしはがくせいです。(Watashi wa gakusei desu.) - I am a student.', 'これはほんです。(Kore wa hon desu.) - This is a book.'], 'Marks the topic of the sentence.'),
    (n5_id, '~です (desu)', 'N です', 'Is, am, are (polite)', ARRAY['これはペンです。(Kore wa pen desu.) - This is a pen.', 'かれはエンジニアです。(Kare wa enjinia desu.) - He is an engineer.'], 'Used at the end of a sentence to make it polite.'),
    (n5_id, '~か (ka)', 'Sentence か', 'Question particle', ARRAY['これはペンですか。(Kore wa pen desu ka?) - Is this a pen?', 'かれはがくせいですか。(Kare wa gakusei desu ka?) - Is he a student?'], 'Turns a statement into a question.');

    INSERT INTO grammar_points (level_id, title, structure, meaning, examples, notes) VALUES
    (n4_id, '~てください (~te kudasai)', 'V-te + ください', 'Please do ~ (request)', ARRAY['まいにちべんきょうしてください。(Mainichi benkyou shite kudasai.) - Please study every day.', 'ここにきてください。(Koko ni kite kudasai.) - Please come here.'], 'Used to make a polite request.'),
    (n4_id, '~てもいいですか (~temo ii desu ka)', 'V-te + もいいですか', 'May I ~? / Is it okay to ~?', ARRAY['ここでしゃしんをとってもいいですか。(Koko de shashin o totte mo ii desu ka?) - May I take a picture here?', 'これたべてもいいですか。(Kore tabete mo ii desu ka?) - May I eat this?'], 'Asks for permission.'),
    (n4_id, '~ています (~te imasu)', 'V-te + います', '~ing / State of being', ARRAY['わたしはほんをよんでいます。(Watashi wa hon o yonde imasu.) - I am reading a book.', 'かれはけっこんしています。(Kare wa kekkon shite imasu.) - He is married.'], 'Indicates an ongoing action or a state resulting from an action.');

    INSERT INTO grammar_points (level_id, title, structure, meaning, examples, notes) VALUES
    (n3_id, '~ようになる (~yō ni naru)', 'V-ru/nai + ようになる', 'Come to be able to / Come to ~ (change in ability/habit)', ARRAY['まえはにほんごがはなせませんでしたが、いまははなせるようになりました。(Mae wa nihongo ga hanasemasen deshita ga, ima wa hanaseru you ni narimashita.) - I couldn't speak Japanese before, but now I can.', 'さむくなると、さけがのみたくなる。(Samuku naru to, sake ga nomitaku naru.) - When it gets cold, I want to drink sake.'], 'Indicates a change over time.'),
    (n3_id, '~やすい (~yasui)', 'V-stem + やすい', 'Easy to do ~', ARRAY['このぺんはかきやすいです。(Kono pen wa kakiyasui desu.) - This pen is easy to write with.', 'こどもはこわれやすいおもちゃでよくあそぶ。(Kodomo wa kowareyasui omocha de yoku asobu.) - Children often play with easily breakable toys.'], 'Indicates something is easy to do or prone to happening.'),
    (n3_id, '~にくい (~nikui)', 'V-stem + にくい', 'Difficult to do ~', ARRAY['このくつははきにくい。(Kono kutsu wa hakinikui.) - These shoes are difficult to wear.', 'こんなくるまはうんてんしにくい。(Konna kuruma wa unten shinikui.) - This kind of car is difficult to drive.'], 'Indicates something is difficult to do or unlikely to happen.');

    INSERT INTO grammar_points (level_id, title, structure, meaning, examples, notes) VALUES
    (n2_id, '~わけがない (~wake ga nai)', 'Plain form + わけがない', 'There is no way / It's impossible that ~', ARRAY['うそをつくわけがない。(Uso o tsuku wake ga nai.) - There's no way I'd lie.', 'かれがしっているわけがない。(Kare ga shitte iru wake ga nai.) - There's no way he knows.'], 'Expresses strong denial or conviction that something is impossible.'),
    (n2_id, '~ばかりでなく (~bakari de naku)', 'N/V/Adj-plain + ばかりでなく', 'Not only ~ but also ~', ARRAY['かれはにほんごばかりでなく、えいごもはなせる。(Kare wa nihongo bakari de naku, eigo mo hanaseru.) - He can speak not only Japanese but also English.', 'このレストランはたかいばかりでなく、サービスもわるい。(Kono resutoran wa takai bakari de naku, sa-bisu mo warui.) - This restaurant is not only expensive, but the service is also bad.'], 'Connects two clauses, emphasizing the second.'),
    (n2_id, '~にすぎない (~ni suginai)', 'N/V-plain + にすぎない', 'Merely / Only ~', ARRAY['これはうわさにすぎない。(Kore wa uwasa ni suginai.) - This is merely a rumor.', 'かれはせんせいにすぎません。(Kare wa sensei ni sugimasen.) - He is nothing more than a teacher.'], 'Emphasizes that something is not as important or significant as it might seem.');

    INSERT INTO grammar_points (level_id, title, structure, meaning, examples, notes) VALUES
    (n1_id, '~つつある (~tsutsu aru)', 'V-stem + つつある', 'In the process of ~ / Is continuing to ~', ARRAY['けいざいはかいふくしつつある。(Keizai wa kaifuku shitsutsu aru.) - The economy is in the process of recovering.', 'このまちもへんかしつつある。(Kono machi mo henka shitsutsu aru.) - This town is also continuing to change.'], 'Indicates an ongoing change or progression.'),
    (n1_id, '~とあいまって (~to aimatte)', 'N + と相まって', 'Combined with ~ / Coupled with ~', ARRAY['かれのどりょくとうんがとあいまって、せいこうをおさめた。(Kare no doryoku to un ga aimatte, seikou o osameta.) - His efforts combined with luck led to success.', 'けしきときせつがとあいまって、すばらしいけいかんだった。(Keshiki to kisetsu ga aimatte, subarashii keikan datta.) - The scenery combined with the season made for a wonderful view.'], 'Used to express that multiple factors combine to create a certain result.'),
    (n1_id, '~をおいてほかにない (~o oite hoka ni nai)', 'N + をおいてほかにない', 'There is no one/nothing else but ~', ARRAY['かれをおいてこのしごとができるものはいない。(Kare o oite kono shigoto ga dekiru mono wa inai.) - There is no one else but him who can do this job.', 'いまのじだいをしゅくふくするにかれをおいてほかにない。(Ima no jidai o shukufuku suru ni kare o oite hoka ni nai.) - There is no one else but him to bless this era.'], 'Expresses that something/someone is unique or the only one suitable.');

END $$;
