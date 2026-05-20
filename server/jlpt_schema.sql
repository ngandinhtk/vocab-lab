-- JLPT Tests Table
CREATE TABLE IF NOT EXISTS public.jlpt_tests (
    id SERIAL PRIMARY KEY,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 5),
    title TEXT NOT NULL,
    description TEXT,
    pass_score INTEGER DEFAULT 60,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- JLPT Questions Table
CREATE TABLE IF NOT EXISTS public.jlpt_questions (
    id SERIAL PRIMARY KEY,
    test_id INTEGER REFERENCES public.jlpt_tests(id) ON DELETE CASCADE,
    section TEXT NOT NULL, -- 'Ngữ pháp', 'Từ vựng', 'Đọc hiểu', 'Nghe hiểu'
    prompt TEXT NOT NULL,
    choices JSONB NOT NULL, -- Array of strings
    answer TEXT NOT NULL,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- JLPT Test Results Table (Expanded version of prisma TestResult if needed, but let's stick to simple one for now)
CREATE TABLE IF NOT EXISTS public.jlpt_results (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    test_id INTEGER REFERENCES public.jlpt_tests(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    percent INTEGER NOT NULL,
    passed BOOLEAN NOT NULL,
    section_summary JSONB, -- { "Ngữ pháp": { "correct": 2, "total": 2 }, ... }
    created_at TIMESTAMPTZ DEFAULT NOW()
);
