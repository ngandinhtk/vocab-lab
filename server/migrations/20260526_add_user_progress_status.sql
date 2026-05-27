ALTER TABLE public.user_progress
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'in-progress',
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

UPDATE public.user_progress
SET status = CASE
  WHEN completed_at IS NOT NULL THEN 'completed'
  ELSE 'in-progress'
END
WHERE status IS NULL OR status = '';

CREATE UNIQUE INDEX IF NOT EXISTS user_progress_user_lesson_idx
  ON public.user_progress (user_id, lesson_id);
