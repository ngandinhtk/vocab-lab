import React from 'react';
import { levelOrder } from '../data.js';

const levelMeta = {
  N5: {
    title: 'Nền tảng',
    subtitle: 'Làm quen hệ chữ, phát âm và câu đơn',
    accent: 'from-rose-500 to-orange-400',
    panel: 'bg-rose-50/80 border-rose-100 text-rose-900'
  },
  N4: {
    title: 'Mở rộng',
    subtitle: 'Ghép câu tự nhiên và hiểu ngữ cảnh',
    accent: 'from-sky-500 to-cyan-400',
    panel: 'bg-sky-50/80 border-sky-100 text-sky-900'
  },
  N3: {
    title: 'Đọc hiểu',
    subtitle: 'Tăng tốc độ đọc và nhận diện cấu trúc',
    accent: 'from-emerald-500 to-lime-400',
    panel: 'bg-emerald-50/80 border-emerald-100 text-emerald-900'
  },
  N2: {
    title: 'Logic cao hơn',
    subtitle: 'Suy luận, sắc thái và văn phong',
    accent: 'from-amber-500 to-orange-400',
    panel: 'bg-amber-50/80 border-amber-100 text-amber-900'
  },
  N1: {
    title: 'Tối ưu',
    subtitle: 'Chuẩn bị cho ngôn ngữ học thuật',
    accent: 'from-violet-500 to-fuchsia-500',
    panel: 'bg-violet-50/80 border-violet-100 text-violet-900'
  }
};

function getLevelNumber(level) {
  const parsed = parseInt(String(level).replace('N', ''), 10);
  return Number.isFinite(parsed) ? parsed : 5;
}

function getLevelRank(level) {
  const index = levelOrder.indexOf(level);
  return index === -1 ? levelOrder.length : index;
}

function RoadmapBadge({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-gray-400">{label}</p>
      <p className="mt-2 text-xl font-black text-gray-900">{value}</p>
    </div>
  );
}

function getLessonStatus(lessonId, lessonProgress = {}) {
  return lessonProgress?.[lessonId]?.status ?? 'not-started';
}

function statusMeta(status) {
  if (status === 'completed') {
    return {
      label: 'Hoàn thành',
      chip: 'bg-emerald-100 text-emerald-700',
      border: 'border-emerald-200',
      glow: 'shadow-emerald-100/60'
    };
  }

  if (status === 'in-progress') {
    return {
      label: 'Đang học',
      chip: 'bg-amber-100 text-amber-700',
      border: 'border-amber-200',
      glow: 'shadow-amber-100/60'
    };
  }

  return {
    label: 'Chưa mở',
    chip: 'bg-gray-100 text-gray-500',
    border: 'border-gray-200',
    glow: 'shadow-gray-100/60'
  };
}

function MilestoneCard({ level, title, subtitle, description, active }) {
  const meta = levelMeta[level] ?? levelMeta.N5;

  return (
    <div
      className={`rounded-3xl border p-5 shadow-sm transition-all duration-300 ${
        active
          ? `${meta.panel} ring-2 ring-white/70 shadow-lg`
          : 'border-white/70 bg-white/75 text-gray-700 hover:-translate-y-0.5 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-current/60">{level}</p>
          <h3 className="mt-2 text-lg font-black">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-current/75">{subtitle}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] ${active ? 'bg-white/70 text-gray-900' : 'bg-gray-100 text-gray-500'}`}>
          {active ? 'Đang chọn' : 'Mốc học'}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-current/75">{description}</p>
    </div>
  );
}

function LessonCard({ lesson, onOpen, status }) {
  const lessonLevel = `N${lesson.level}`;
  const meta = levelMeta[lessonLevel] ?? levelMeta.N5;
  const state = statusMeta(status);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group rounded-[1.75rem] border bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${state.border} ${state.glow}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className={`inline-flex rounded-full bg-gradient-to-r ${meta.accent} px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-white shadow-sm`}>
          {lessonLevel}
        </span>
        <span className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] ${state.chip}`}>
          {state.label}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-black text-gray-900 leading-snug">{lesson.title}</h3>
      <p className="mt-3 text-sm leading-6 text-gray-500 line-clamp-3">{lesson.description}</p>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl bg-gray-50 px-3 py-3">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-gray-400">Kanji</p>
          <p className="mt-1 text-lg font-black text-gray-900">{lesson.kanji?.length ?? 0}</p>
        </div>
        <div className="rounded-2xl bg-gray-50 px-3 py-3">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-gray-400">Từ vựng</p>
          <p className="mt-1 text-lg font-black text-gray-900">{lesson.vocabulary?.length ?? 0}</p>
        </div>
        <div className="rounded-2xl bg-gray-50 px-3 py-3">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-gray-400">Ngữ pháp</p>
          <p className="mt-1 text-lg font-black text-gray-900">{lesson.grammar?.length ?? 0}</p>
        </div>
      </div>
    </button>
  );
}

export default function RoadmapPage({ lessons = [], lessonProgress = {}, setActivePage, setSelectedLessonId, markLessonProgress, selectedLevel, setSelectedLevel }) {
  const normalizedLevel = levelOrder.includes(selectedLevel) ? selectedLevel : 'N5';
  const levelNum = getLevelNumber(normalizedLevel);
  const currentRank = getLevelRank(normalizedLevel);

  const filteredLessons = lessons
    .filter((lesson) => Number(lesson.level) === levelNum)
    .sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

  const visibleLevels = levelOrder.map((level) => ({
    level,
    ...levelMeta[level],
    lessonCount: lessons.filter((lesson) => Number(lesson.level) === getLevelNumber(level)).length
  }));

  const selectedMeta = levelMeta[normalizedLevel] ?? levelMeta.N5;
  const upcomingLevel = levelOrder[Math.min(currentRank + 1, levelOrder.length - 1)];

  const roadmapNotes = [
    {
      level: 'N5',
      title: 'Bắt đầu từ nền tảng',
      subtitle: 'Chữ cái, cách đọc, câu ngắn',
      description: 'Mục tiêu là đọc được câu đơn và nhận diện cấu trúc cơ bản để không bị quá tải ngay từ đầu.'
    },
    {
      level: 'N4',
      title: 'Làm quen câu dài hơn',
      subtitle: 'Mẫu nối ý, nguyên nhân, trạng thái',
      description: 'Khi đã nắm nền tảng, bài học chuyển sang ghép câu mượt hơn và xử lý ngữ cảnh thường gặp.'
    },
    {
      level: 'N3',
      title: 'Tăng tốc độ đọc hiểu',
      subtitle: 'Suy luận và phản xạ ngôn ngữ',
      description: 'Tập trung vào việc đọc nhanh hơn, hiểu ý chính, và bắt đầu làm quen với logic của đề thi.'
    },
    {
      level: 'N2',
      title: 'Nâng độ chính xác',
      subtitle: 'Sắc thái, cấu trúc học thuật',
      description: 'Bài học ở giai đoạn này nên được đọc như một bản đồ để tránh học rời rạc.'
    },
    {
      level: 'N1',
      title: 'Tinh chỉnh để thi',
      subtitle: 'Thành thạo văn phong khó',
      description: 'Đây là giai đoạn tối ưu hóa và đọc hiểu các mẫu diễn đạt có độ nén cao.'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 p-6 text-white shadow-2xl sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.14),transparent_25%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-white/80">Lộ trình học</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              Roadmap theo level, rõ thứ tự, rõ mục tiêu.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
              Mỗi level được đóng gói thành một chặng học có trọng tâm. Chọn N5 đến N1 để xem bài học phù hợp và đi tiếp đúng nhịp.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <RoadmapBadge label="Level hiện tại" value={normalizedLevel} />
            <RoadmapBadge label="Bài trong level" value={filteredLessons.length} />
            <RoadmapBadge label="Chặng tiếp theo" value={upcomingLevel} />
            <RoadmapBadge label="Mục tiêu" value={selectedMeta.title} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-5">
        {visibleLevels.map((item, index) => {
          const active = item.level === normalizedLevel;
          const done = index < currentRank;

          return (
            <button
              key={item.level}
              type="button"
              onClick={() => setSelectedLevel(item.level)}
              className={`rounded-3xl border p-4 text-left transition-all duration-300 ${
                active
                  ? 'border-white bg-gray-900 text-white shadow-xl'
                  : done
                    ? 'border-emerald-100 bg-emerald-50 text-emerald-900 hover:-translate-y-0.5'
                    : 'border-white/70 bg-white/80 text-gray-700 hover:-translate-y-0.5 hover:shadow-md'
              }`}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.28em] opacity-70">{item.level}</p>
              <h2 className="mt-3 text-lg font-black">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 opacity-80">{item.subtitle}</p>
              <div className="mt-4 flex items-center justify-between text-xs font-black uppercase tracking-[0.22em] opacity-70">
                <span>{item.lessonCount} bài</span>
                <span>{active ? 'Đang học' : done ? 'Đã qua' : 'Sắp tới'}</span>
              </div>
            </button>
          );
        })}
      </section>

      <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
        <aside className="space-y-6">
          <div className={`rounded-[1.75rem] border p-6 shadow-sm ${selectedMeta.panel}`}>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-current/60">Focus hiện tại</p>
            <h2 className="mt-3 text-2xl font-black">{selectedMeta.title}</h2>
            <p className="mt-2 text-sm leading-6 text-current/75">{selectedMeta.subtitle}</p>
            <div className="mt-5 rounded-3xl bg-white/70 p-4 shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Gợi ý học</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Ưu tiên hoàn thành các bài trong level này theo thứ tự số bài. Mỗi bài nên được mở từ roadmap để giữ nhịp học ổn định.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.32em] text-gray-400">Mốc học</p>
                <h2 className="mt-2 text-2xl font-black text-gray-900">Bản đồ theo chặng</h2>
              </div>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-pink-600">
                {filteredLessons.length} bài
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {roadmapNotes.map((item) => (
                <MilestoneCard
                  key={item.level}
                  level={item.level}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  active={item.level === normalizedLevel}
                />
              ))}
            </div>
          </div>
        </aside>

        <section className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.32em] text-gray-400">Danh sách bài học</p>
              <h2 className="mt-2 text-3xl font-black text-gray-900">Các bài trong {normalizedLevel}</h2>
            </div>
            <div className="hidden rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm sm:block">
              Sắp xếp theo số bài tăng dần
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson) => (
              <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  status={getLessonStatus(lesson.id, lessonProgress)}
                  onOpen={() => {
                    const currentStatus = getLessonStatus(lesson.id, lessonProgress);
                    if (currentStatus !== 'completed') {
                      markLessonProgress?.(lesson.id, 'in-progress');
                    }
                    if (setSelectedLessonId) setSelectedLessonId(lesson.id);
                    setActivePage('lesson-detail');
                  }}
                />
              ))
            ) : (
              <div className="md:col-span-2 rounded-[1.75rem] border border-dashed border-gray-200 bg-white/80 px-6 py-16 text-center shadow-sm">
                <p className="text-lg font-semibold text-gray-700">Chưa có dữ liệu bài học cho level này.</p>
                <p className="mt-2 text-sm text-gray-500">
                  Hãy chuyển sang level khác hoặc kiểm tra lại dữ liệu lessons từ backend.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.32em] text-gray-400">Chuyến tiếp theo</p>
                <h3 className="mt-2 text-2xl font-black text-gray-900">Đi tiếp sang {upcomingLevel}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLevel(upcomingLevel)}
                className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white transition-transform hover:-translate-y-0.5"
              >
                Xem level kế tiếp
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
