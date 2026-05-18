    -- Enable necessary extensions
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Enum for Lesson Type
    DO $$ BEGIN
        CREATE TYPE lesson_type AS ENUM ('vocab', 'kanji', 'grammar', 'conversation');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;

    -- User Table
    CREATE TABLE IF NOT EXISTS public.users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT,
        level INTEGER DEFAULT 1,
        streak INTEGER DEFAULT 0,
        exp INTEGER DEFAULT 0,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Profile Table
    CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
        native_language TEXT DEFAULT 'vi',
        learning_goal TEXT,
        daily_goal INTEGER DEFAULT 10, -- minutes or points
        avatar_url TEXT,
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Vocabulary Table
    CREATE TABLE IF NOT EXISTS public.vocabulary (
        id SERIAL PRIMARY KEY,
        word TEXT NOT NULL,
        reading TEXT,
        meaning TEXT NOT NULL,
        jlpt_level INTEGER CHECK (jlpt_level BETWEEN 1 AND 5),
        example_sentences JSONB, -- Array of objects: [{ "ja": "...", "vi": "...", "en": "..." }]
        audio_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Kanji Table
    CREATE TABLE IF NOT EXISTS public.kanji (
        id SERIAL PRIMARY KEY,
        character CHAR(1) NOT NULL UNIQUE,
        strokes INTEGER,
        meaning TEXT,
        onyomi TEXT,
        kunyomi TEXT,
        radical TEXT,
        jlpt_level INTEGER CHECK (jlpt_level BETWEEN 1 AND 5),
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Grammar Table
    CREATE TABLE IF NOT EXISTS public.grammar (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        explanation TEXT,
        examples JSONB, -- Array of objects: [{ "ja": "...", "vi": "...", "en": "..." }]
        level INTEGER CHECK (level BETWEEN 1 AND 5),
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Lesson Table
    CREATE TABLE IF NOT EXISTS public.lessons (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        level INTEGER,
        type lesson_type NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Lesson Content Junction Tables
    CREATE TABLE IF NOT EXISTS public.lesson_vocabulary (
        lesson_id INTEGER REFERENCES public.lessons(id) ON DELETE CASCADE,
        vocabulary_id INTEGER REFERENCES public.vocabulary(id) ON DELETE CASCADE,
        PRIMARY KEY(lesson_id, vocabulary_id)
    );

    CREATE TABLE IF NOT EXISTS public.lesson_kanji (
        lesson_id INTEGER REFERENCES public.lessons(id) ON DELETE CASCADE,
        kanji_id INTEGER REFERENCES public.kanji(id) ON DELETE CASCADE,
        PRIMARY KEY(lesson_id, kanji_id)
    );

    CREATE TABLE IF NOT EXISTS public.lesson_grammar (
        lesson_id INTEGER REFERENCES public.lessons(id) ON DELETE CASCADE,
        grammar_id INTEGER REFERENCES public.grammar(id) ON DELETE CASCADE,
        PRIMARY KEY(lesson_id, grammar_id)
    );

    -- UserProgress Table
    CREATE TABLE IF NOT EXISTS public.user_progress (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
        lesson_id INTEGER REFERENCES public.lessons(id) ON DELETE CASCADE,
        score INTEGER,
        completed_at TIMESTAMPTZ DEFAULT NOW(),
        last_review TIMESTAMPTZ,
        UNIQUE(user_id, lesson_id)
    );

    -- FlashcardReview (SRS - Spaced Repetition System)
    CREATE TABLE IF NOT EXISTS public.flashcard_reviews (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
        item_type TEXT NOT NULL, -- 'vocabulary' or 'kanji'
        item_id INTEGER NOT NULL,
        repetition INTEGER DEFAULT 0,
        interval INTEGER DEFAULT 1, -- in days
        ease_factor FLOAT DEFAULT 2.5,
        next_review TIMESTAMPTZ DEFAULT NOW(),
        last_reviewed_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Achievements Table
    CREATE TABLE IF NOT EXISTS public.achievements (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        icon_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- User Achievements Table
    CREATE TABLE IF NOT EXISTS public.user_achievements (
        user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
        achievement_id INTEGER REFERENCES public.achievements(id) ON DELETE CASCADE,
        earned_at TIMESTAMPTZ DEFAULT NOW(),
        PRIMARY KEY(user_id, achievement_id)
    );

    -- Streaks Table
    CREATE TABLE IF NOT EXISTS public.streaks (
        user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
        current_streak INTEGER DEFAULT 0,
        max_streak INTEGER DEFAULT 0,
        last_activity_date DATE DEFAULT CURRENT_DATE
    );

    -- UserSettings Table
    CREATE TABLE IF NOT EXISTS public.user_settings (
        user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
        notifications_enabled BOOLEAN DEFAULT TRUE,
        theme TEXT DEFAULT 'light',
        language_preference TEXT DEFAULT 'vi',
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Triggers for updated_at
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ language 'plpgsql';

    CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON public.user_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
