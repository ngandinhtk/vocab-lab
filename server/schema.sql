-- Khởi tạo bảng Users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    subscription_tier VARCHAR(20) DEFAULT 'free', -- 'free' hoặc 'premium'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Khởi tạo bảng Levels (N5 -> N1)
CREATE TABLE IF NOT EXISTS levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(10) UNIQUE NOT NULL,
    description TEXT
);

-- Khởi tạo bảng Grammar Points
CREATE TABLE IF NOT EXISTS grammar_points (
    id SERIAL PRIMARY KEY,
    level_id INTEGER REFERENCES levels(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    structure TEXT,
    meaning TEXT,
    examples JSONB, -- Lưu mảng các object [{ja: "...", vi: "..."}, ...]
    notes TEXT,
    tips TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Khởi tạo bảng JLPT Questions
CREATE TABLE IF NOT EXISTS jlpt_questions (
    id SERIAL PRIMARY KEY,
    level_id INTEGER REFERENCES levels(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50), -- 'grammar', 'vocabulary', 'reading'
    options JSONB,             -- Lưu mảng các lựa chọn ["A", "B", "C", "D"]
    correct_answer_index INTEGER,
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Chèn dữ liệu mẫu cho các cấp độ JLPT
INSERT INTO levels (name, description) VALUES 
('N5', 'Cấp độ cơ bản nhất cho người mới bắt đầu'),
('N4', 'Sơ cấp: Có thể hiểu các chủ đề quen thuộc'),
('N3', 'Trung cấp: Có thể hiểu các tình huống hằng ngày'),
('N2', 'Thượng trung cấp: Hiểu được nhiều tình huống đa dạng'),
('N1', 'Cao cấp: Thành thạo tiếng Nhật trong nhiều ngữ cảnh');

-- Chèn một user mẫu (Password là 'password123' đã qua hash - ví dụ)
-- Lưu ý: Thực tế bạn sẽ dùng API /register để tạo user
INSERT INTO users (username, email, password_hash, subscription_tier) VALUES 
('admin', 'admin@nihongokawaii.com', '$2b$10$SomethingSecretHash', 'premium'),
('learner', 'student@example.com', '$2b$10$AnotherSecretHash', 'free');