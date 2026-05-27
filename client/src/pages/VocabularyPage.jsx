import React, { useState } from 'react';
import LevelTabs from '../components/LevelTabs.jsx';
import { translate } from '../i18n.js';

export default function VocabularyPage({ vocabulary = [], selectedLevel, setSelectedLevel }) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchPlaceholder = `${translate('vi', 'vocabulary.searchPlaceholder')} / ${translate('en', 'vocabulary.searchPlaceholder')}`;
  const noMatchText = `${translate('vi', 'vocabulary.noMatch')} / ${translate('en', 'vocabulary.noMatch')}`;

  const filteredVocab = vocabulary.filter((item) => {
    // JLPT level in database is an integer (5, 4, 3, 2, 1)
    const levelNum = parseInt(selectedLevel.replace('N', ''));
    if (item.jlpt_level !== levelNum) return false;

    const query = searchQuery.toLowerCase();
    return (
      item.word.toLowerCase().includes(query) ||
      item.reading?.toLowerCase().includes(query) ||
      item.meaning.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <LevelTabs selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />
      
      <div className="max-w-2xl mx-auto relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-xl">
          🔍
        </div>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg"
        />
      </div>

      {filteredVocab.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVocab.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">N{item.jlpt_level}</span>
                {item.audio_url && (
                  <button className="text-blue-400 hover:text-blue-600 transition-colors">🔊</button>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.word}</h3>
              <p className="text-sm text-gray-500 mb-4 font-medium">【{item.reading}】</p>
              <p className="text-gray-700 mb-4"><span className="font-bold">Meaning / Ý nghĩa:</span> {item.meaning}</p>
              
              {item.example_sentences && item.example_sentences.length > 0 && (() => {
                const example = item.example_sentences[0];
                return (
                  <div className="pt-4 border-t border-blue-50">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Example / Ví dụ</p>
                    <p className="text-sm text-gray-600 italic">"{example.ja}"</p>
                    {example.vi && <p className="text-sm text-gray-700 mt-2">{example.vi}</p>}
                    {example.en && <p className="text-sm text-gray-500 mt-1 italic">{example.en}</p>}
                  </div>
                );
              })()}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-blue-200">
          <p className="text-gray-500">{noMatchText}</p>
        </div>
      )}
    </div>
  );
}
