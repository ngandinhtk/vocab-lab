import React, { useEffect, useMemo, useState } from 'react';

const quickNavItems = [
  { id: 'roadmap-kanji', label: 'Kanji', tone: 'from-purple-500 to-fuchsia-500' },
  { id: 'roadmap-vocab', label: 'Vocabulary', tone: 'from-sky-500 to-cyan-500' },
  { id: 'roadmap-reading', label: 'Reading', tone: 'from-amber-500 to-orange-500' },
  { id: 'roadmap-grammar', label: 'Grammar', tone: 'from-emerald-500 to-lime-500' }
];

function SectionCard({ id, title, tone, icon, count, children }) {
  return (
    <section id={id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden scroll-mt-28">
      <div className={`px-6 py-5 border-b ${tone.border} ${tone.bg}`}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl font-black ${tone.title}`}>{icon} {title}</h2>
            <p className={`text-sm ${tone.subtitle} mt-1`}>{count}</p>
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-gray-500">
      {text}
    </div>
  );
}

function statusMeta(status) {
  if (status === 'completed') {
    return {
      label: 'Hoàn thành',
      chip: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      panel: 'bg-emerald-50/80'
    };
  }

  if (status === 'in-progress') {
    return {
      label: 'Đang học',
      chip: 'bg-amber-100 text-amber-700 border-amber-200',
      panel: 'bg-amber-50/80'
    };
  }

  return {
    label: 'Chưa mở',
    chip: 'bg-gray-100 text-gray-500 border-gray-200',
    panel: 'bg-gray-50/80'
  };
}

export default function RoadmapDetailPage({ lessonId, token, lessonProgress = {}, markLessonProgress, onBack }) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const lessonStatus = lessonProgress?.[lessonId]?.status ?? 'not-started';
  const status = statusMeta(lessonStatus);

  useEffect(() => {
    let active = true;

    async function fetchLessonDetail() {
      try {
        const res = await fetch(`/api/lessons/${lessonId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) return;
        const data = await res.json();
        if (active) setLesson(data);
      } catch (error) {
        console.error('Failed to fetch lesson detail:', error);
      } finally {
        if (active) setLoading(false);
      }
    }

    if (lessonId) fetchLessonDetail();

    return () => {
      active = false;
    };
  }, [lessonId, token]);

  const stats = useMemo(() => {
    if (!lesson) return [];
    return [
      { label: 'Cấp độ', value: `N${lesson.level}` },
      { label: 'Kanji', value: lesson.kanji?.length ?? 0 },
      { label: 'Từ vựng', value: lesson.vocabulary?.length ?? 0 },
      { label: 'Ngữ pháp', value: lesson.grammar?.length ?? 0 }
    ];
  }, [lesson]);

  const readingPractice = lesson?.readingPractice || { passage: [], miniQuestions: [] };

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Không tìm thấy bài học.</p>
        <button onClick={onBack} className="text-pink-500 font-bold hover:underline">
          Quay lại roadmap
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.16),transparent_30%)]" />
        <div className="relative p-8 sm:p-10">
          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur-sm hover:bg-white/25 transition-colors"
          >
            ← Quay lại roadmap
          </button>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/85">Roadmap detail</p>
              <h1 className="mt-3 text-3xl sm:text-5xl font-black leading-tight">{lesson.title}</h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/90">
                {lesson.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.24em] ${status.chip}`}>
                  {status.label}
                </span>
                <button
                  type="button"
                  onClick={() => markLessonProgress?.(lessonId, 'in-progress')}
                  className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur-sm hover:bg-white/25 transition-colors"
                >
                  Đánh dấu đang học
                </button>
                <button
                  type="button"
                  onClick={() => markLessonProgress?.(lessonId, 'completed')}
                  className="rounded-full bg-white px-4 py-2 text-sm font-black text-gray-900 transition-transform hover:-translate-y-0.5"
                >
                  Đánh dấu hoàn thành
                </button>
                <button
                  type="button"
                  onClick={() => markLessonProgress?.(lessonId, 'not-started')}
                  className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  Đặt lại tiến độ
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:min-w-[320px]">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/15 px-4 py-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-widest text-white/75">{item.label}</p>
                  <p className="mt-2 text-2xl font-black">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <div className="sticky top-4 z-10 rounded-3xl border border-white/70 bg-white/90 p-3 shadow-lg backdrop-blur-md">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {quickNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`rounded-2xl bg-gradient-to-r ${item.tone} px-4 py-3 text-sm font-black text-white shadow-sm transition-transform hover:-translate-y-0.5`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <SectionCard
            id="roadmap-kanji"
            title="Kanji cần học"
            icon="✍️"
            count={`${lesson.kanji?.length ?? 0} chữ kanji`}
            tone={{
              bg: 'bg-purple-50/70',
              border: 'border-purple-100',
              title: 'text-purple-900',
              subtitle: 'text-purple-700'
            }}
          >
            {lesson.kanji && lesson.kanji.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {lesson.kanji.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-purple-200"
                  >
                    <div className="text-center">
                      <div className="text-4xl font-black text-gray-900">{item.character}</div>
                      <div className="mt-2 text-xs font-bold uppercase tracking-wide text-purple-700">
                        {item.meaning}
                      </div>
                    </div>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between gap-3">
                        <dt className="text-gray-400">Onyomi</dt>
                        <dd className="text-gray-700 text-right">{item.onyomi || '-'}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-gray-400">Kunyomi</dt>
                        <dd className="text-gray-700 text-right">{item.kunyomi || '-'}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState text="Chưa có kanji cho bài này." />
            )}
          </SectionCard>

          <SectionCard
            id="roadmap-reading"
            title="Reading Practice"
            icon="📝"
            count={`${readingPractice.miniQuestions?.length ?? 0} câu hỏi mini`}
            tone={{
              bg: 'bg-amber-50/80',
              border: 'border-amber-100',
              title: 'text-amber-900',
              subtitle: 'text-amber-700'
            }}
          >
            <div className="space-y-6">
              <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-600">Đoạn đọc</p>
                <p className="mt-3 whitespace-pre-line text-gray-800 leading-8">
                  {readingPractice.passage?.join(' ')}
                </p>
              </div>

              {readingPractice.miniQuestions && readingPractice.miniQuestions.length > 0 ? (
                <div className="space-y-4">
                  {readingPractice.miniQuestions.map((question, index) => (
                    <article key={index} className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-black text-amber-800">Câu hỏi {index + 1}</h3>
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                          Mini quiz
                        </span>
                      </div>
                      <p className="mt-3 text-gray-800">{question.prompt}</p>
                      {question.choices && question.choices.length > 0 && (
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          {question.choices.map((choice, choiceIndex) => (
                            <div key={choiceIndex} className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-gray-800">
                              {choice}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Đáp án</p>
                        <p className="mt-1 font-semibold text-gray-900">{question.answer || '-'}</p>
                        <p className="mt-2 text-sm leading-6 text-gray-600">{question.explanation}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState text="Chưa có bài đọc hiểu cho bài này." />
              )}
            </div>
          </SectionCard>

          <SectionCard
            id="roadmap-grammar"
            title="Ngữ pháp"
            icon="⛩️"
            count={`${lesson.grammar?.length ?? 0} mẫu ngữ pháp`}
            tone={{
              bg: 'bg-emerald-50/80',
              border: 'border-emerald-100',
              title: 'text-emerald-900',
              subtitle: 'text-emerald-700'
            }}
          >
            {lesson.grammar && lesson.grammar.length > 0 ? (
              <div className="space-y-4">
                {lesson.grammar.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-black text-emerald-700">{item.title}</h3>
                    <p className="mt-3 text-gray-700 leading-7">{item.explanation}</p>
                    {item.examples && item.examples.length > 0 && (
                      <div className="mt-5 space-y-3">
                        {item.examples.map((example, index) => (
                          <div key={index} className="rounded-xl bg-emerald-50 px-4 py-3">
                            <p className="font-semibold text-gray-900">{example.ja}</p>
                            <p className="mt-1 text-sm italic text-gray-600">{example.vi}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState text="Chưa có ngữ pháp cho bài này." />
            )}
          </SectionCard>
        </div>

        <div className="space-y-8">
          <SectionCard
            id="roadmap-vocab"
            title="Từ vựng"
            icon="📚"
            count={`${lesson.vocabulary?.length ?? 0} từ`}
            tone={{
              bg: 'bg-sky-50/80',
              border: 'border-sky-100',
              title: 'text-sky-900',
              subtitle: 'text-sky-700'
            }}
          >
            {lesson.vocabulary && lesson.vocabulary.length > 0 ? (
              <div className="space-y-3">
                {lesson.vocabulary.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-sky-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-black text-gray-900">{item.word}</h3>
                        <p className="mt-1 text-sm text-gray-500">[{item.reading}]</p>
                      </div>
                      <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                        Vocab
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-700">{item.meaning}</p>
                    {item.example_sentences && item.example_sentences.length > 0 && (
                      <div className="mt-4 rounded-xl bg-sky-50 px-4 py-3">
                        <p className="text-sm font-semibold text-gray-900">{item.example_sentences[0].ja}</p>
                        <p className="mt-1 text-xs italic leading-5 text-gray-600">{item.example_sentences[0].vi}</p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState text="Chưa có từ vựng cho bài này." />
            )}
          </SectionCard>

          <div className="rounded-3xl bg-gray-900 p-6 text-white shadow-lg">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Practice</p>
            <h2 className="mt-3 text-2xl font-black">Ôn luyện ngay trong bài</h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Dùng nút luyện tập để chuyển bài học này thành một buổi ôn tập nhanh.
            </p>
            <button className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-black text-gray-900 transition-transform hover:-translate-y-0.5">
              Bắt đầu luyện tập (SRS)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
