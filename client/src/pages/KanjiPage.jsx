import React, { useState } from 'react';
import LevelTabs from '../components/LevelTabs.jsx';
import { translate } from '../i18n.js';

export default function KanjiPage({ kanji = [], selectedLevel, setSelectedLevel }) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchPlaceholder = `${translate('vi', 'kanji.searchPlaceholder')} / ${translate('en', 'kanji.searchPlaceholder')}`;
  const noMatchText = `${translate('vi', 'kanji.noMatch')} / ${translate('en', 'kanji.noMatch')}`;

  const normalizeMeaning = (item) => {
    const viMeaning = item.meaning_vi || (item.meaning && /[ăâđêôơưáàạảãéèẽẻẹíìịîóòỏõọôơúùủũụưýỳỷỹỵ]/i.test(item.meaning) ? item.meaning : '');
    const enMeaning = item.meaning_en || (item.meaning && !viMeaning ? item.meaning : '');
    return { viMeaning, enMeaning };
  };

  const filteredKanji = kanji.filter((item) => {
    const levelNum = parseInt(selectedLevel.replace('N', ''));
    if (item.jlpt_level !== levelNum) return false;

    const query = searchQuery.toLowerCase();
    return (
      item.character.includes(query) ||
      item.meaning.toLowerCase().includes(query) ||
      item.onyomi?.toLowerCase().includes(query) ||
      item.kunyomi?.toLowerCase().includes(query)
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
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent rounded-2xl shadow-sm focus:ring-4 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all text-lg"
        />
      </div>

      {filteredKanji.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredKanji.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm hover:shadow-xl transition-all text-center group cursor-help relative">
              <span className="absolute top-2 right-2 text-[10px] font-bold text-purple-300">N{item.jlpt_level}</span>
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform">
                {item.character}
              </div>
              {(() => {
                const { viMeaning, enMeaning } = normalizeMeaning(item);
                return (
                  <div className="space-y-1 text-left">
                    {enMeaning ? (
                      <p className="text-xs font-bold text-purple-600 truncate">{enMeaning}</p>
                    ) : null}
                    {viMeaning ? (
                      <p className="text-xs font-bold text-purple-600 truncate">{viMeaning}</p>
                    ) : null}
                    {!enMeaning && !viMeaning ? (
                      <p className="text-xs font-bold text-purple-600 mb-1 truncate">{item.meaning || '-'}</p>
                    ) : null}
                  </div>
                );
              })()}
              <div className="text-[10px] text-gray-400 space-y-0.5">
                <p>On: {item.onyomi || '-'}</p>
                <p>Kun: {item.kunyomi || '-'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-purple-200">
          <p className="text-gray-500">{noMatchText}</p>
        </div>
      )}
    </div>
  );
}
