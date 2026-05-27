import React, { useState } from 'react';
import { translate } from '../i18n.js';

/**
 * GrammarPage component allows users to browse and search for Japanese grammar points.
 * It features a real-time search bar that filters the list by title or meaning.
 */
export default function GrammarPage({ grammar = [], setActivePage, setSelectedGrammar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchPlaceholder = 'Tìm theo tiêu đề hoặc ý nghĩa... / Search by title or meaning...';
  const noResultTitle = 'Không tìm thấy! / Nothing found!';
  const noResultDesc = `Chúng tôi không tìm thấy mẫu ngữ pháp phù hợp với "${searchQuery}". / We couldn't find any grammar points matching "${searchQuery}".`;
  const reviewLabel = `${translate('en', 'grammar.reviewPoint', 'Review Point')} / ${translate('vi', 'grammar.reviewPoint', 'Điểm ôn tập')}`;

  // Filter logic for title and explanation
  const filteredGrammar = grammar.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(query) ||
      item.explanation?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8">
      {/* Search bar with Icon */}
      <div className="relative group max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-2xl">
          🔍
        </div>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent rounded-2xl shadow-sm focus:ring-4 focus:ring-pink-100 focus:border-pink-500 outline-none transition-all text-lg placeholder:text-gray-400"
        />
      </div>

      {/* Results Section */}
      {filteredGrammar.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGrammar.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (setSelectedGrammar) setSelectedGrammar(item);
                setActivePage('grammar-detail');
              }}
              className="group relative p-8 bg-white border border-pink-100 rounded-3xl text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                  {item.title}
                </h3>
                <div className="w-8 h-8 flex items-center justify-center bg-pink-50 rounded-xl text-pink-500 font-black text-xs">
                  語
                </div>
              </div>
              <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6 italic">
                {item.explanation}
              </p>
              
              <div className="flex items-center text-pink-500 font-bold text-sm">
                {reviewLabel}
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-24 bg-white/50 rounded-3xl border-2 border-dashed border-pink-200">
          <div className="text-6xl mb-6 opacity-60">🙈</div>
          <h3 className="text-2xl font-bold text-gray-900">{noResultTitle}</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">{noResultDesc}</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-8 px-8 py-3 bg-pink-500 text-white font-black rounded-2xl hover:bg-pink-600 transition-all active:scale-95 shadow-lg shadow-pink-200"
          >
            Reset Search / Xóa tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
}