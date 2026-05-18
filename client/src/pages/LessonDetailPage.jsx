import React, { useEffect, useState } from 'react';

export default function LessonDetailPage({ lessonId, token, onBack }) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessonDetail() {
      try {
        const res = await fetch(`/api/lessons/${lessonId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setLesson(data);
        }
      } catch (error) {
        console.error("Failed to fetch lesson detail:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (lessonId) {
      fetchLessonDetail();
    }
  }, [lessonId, token]);

  if (loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin text-4xl">⏳</div></div>;
  }

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Không tìm thấy bài học.</p>
        <button onClick={onBack} className="text-pink-500 font-bold hover:underline">Quay lại</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 relative">
        <button onClick={onBack} className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 font-bold text-sm bg-gray-100 px-3 py-1 rounded-lg">
          ← Quay lại
        </button>
        <span className="text-xs font-bold px-3 py-1 bg-pink-100 text-pink-700 rounded-lg mb-4 inline-block">JLPT N{lesson.level}</span>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{lesson.title}</h1>
        <p className="text-gray-600">{lesson.description}</p>
      </div>

      {/* Kanji Section */}
      {lesson.kanji && lesson.kanji.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-purple-500">✍️</span> Kanji cần học
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {lesson.kanji.map(k => (
              <div key={k.id} className="bg-white p-4 rounded-2xl border border-purple-100 text-center shadow-sm hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-gray-900 mb-1">{k.character}</div>
                <div className="text-xs font-bold text-purple-600 truncate">{k.meaning}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Vocabulary Section */}
      {lesson.vocabulary && lesson.vocabulary.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-500">📚</span> Từ vựng mới
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lesson.vocabulary.map(v => (
              <div key={v.id} className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-center">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xl font-bold text-gray-900">{v.word}</h3>
                  <span className="text-sm font-medium text-gray-500">【{v.reading}】</span>
                </div>
                <p className="text-gray-700 text-sm">{v.meaning}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grammar Section */}
      {lesson.grammar && lesson.grammar.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-green-500">⛩️</span> Cấu trúc Ngữ pháp
          </h2>
          <div className="space-y-4">
            {lesson.grammar.map(g => (
              <div key={g.id} className="bg-white p-6 rounded-2xl border border-green-100 shadow-sm">
                <h3 className="text-xl font-bold text-green-700 mb-2">{g.title}</h3>
                <p className="text-gray-700 mb-4">{g.explanation}</p>
                {g.examples && g.examples.map((ex, idx) => (
                  <div key={idx} className="mt-3 pl-4 border-l-2 border-green-200">
                    <p className="text-gray-900 font-medium">{ex.ja}</p>
                    <p className="text-gray-500 text-sm italic">{ex.vi}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Action */}
      <div className="flex justify-center pt-8">
        <button className="px-8 py-4 bg-pink-500 text-white font-black text-lg rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-600 hover:-translate-y-1 transition-all active:scale-95">
          Bắt đầu luyện tập (SRS) 🚀
        </button>
      </div>
    </div>
  );
}
