import React from 'react';
import LevelTabs from '../components/LevelTabs.jsx';

export default function RoadmapPage({ lessons = [], setActivePage, setSelectedLessonId, selectedLevel, setSelectedLevel }) {
  const filteredLessons = lessons.filter(lesson => {
    const levelNum = parseInt(selectedLevel.replace('N', ''));
    return lesson.level === levelNum;
  });

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 text-white p-8 sm:p-12 rounded-3xl shadow-lg">
        <p className="text-sm font-bold uppercase tracking-widest opacity-90">Lộ trình học tập</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4">Danh sách Bài học</h1>
        <p className="text-lg opacity-95 mb-6 max-w-2xl">
          Phương pháp học tổng hợp. Mỗi bài học được thiết kế để bạn tiếp thu Kanji, Từ vựng và Ngữ pháp trong cùng một ngữ cảnh.
        </p>
      </div>
      
      <LevelTabs selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />

      {/* Lesson List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => {
                if (setSelectedLessonId) setSelectedLessonId(lesson.id);
                setActivePage('lesson-detail');
              }}
              className="text-left bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-pink-200 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-lg group-hover:bg-pink-50 group-hover:text-pink-600 transition-colors">
                  N{lesson.level}
                </span>
                <span className="text-gray-300 group-hover:text-pink-400 transition-colors">→</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">{lesson.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">{lesson.description}</p>
            </button>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500">Chưa có dữ liệu bài học.</p>
          </div>
        )}
      </div>
    </div>
  );
}
