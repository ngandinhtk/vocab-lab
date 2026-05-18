import React from 'react';

export default function LevelTabs({ selectedLevel, setSelectedLevel }) {
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  
  return (
    <div className="flex justify-center gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2">
      {levels.map(level => (
        <button
          key={level}
          onClick={() => setSelectedLevel(level)}
          className={`px-6 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            selectedLevel === level 
              ? 'bg-pink-500 text-white shadow-md shadow-pink-200 scale-105' 
              : 'bg-white text-gray-500 hover:bg-pink-50 border border-gray-200 hover:text-pink-500'
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
}
