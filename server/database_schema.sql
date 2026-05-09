-- Create the 'users' table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'levels' table
CREATE TABLE levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- Create the 'grammar_points' table
CREATE TABLE grammar_points (
    id SERIAL PRIMARY KEY,
    level_id INTEGER REFERENCES levels(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    structure TEXT,
    meaning TEXT,
    examples TEXT[],
    notes TEXT
);

-- Create the 'jlpt_questions' table
CREATE TABLE jlpt_questions (
    id SERIAL PRIMARY KEY,
    level_id INTEGER REFERENCES levels(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50),
    options TEXT[],
    correct_answer_index INTEGER,
    explanation TEXT
);

-- Create the 'tests' table
CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    level_id INTEGER REFERENCES levels(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    questions INTEGER[],
    duration_minutes INTEGER
);

-- Create the 'results' table
CREATE TABLE results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    answers_submitted JSONB,
    taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
