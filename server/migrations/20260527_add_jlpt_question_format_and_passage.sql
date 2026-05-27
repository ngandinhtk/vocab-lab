ALTER TABLE public.jlpt_questions
  ADD COLUMN IF NOT EXISTS format TEXT,
  ADD COLUMN IF NOT EXISTS passage TEXT;

