import React from 'react';

export default function Navigation({ activePage, setActivePage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Dashboard', icon: '🏠' },
    { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
    { id: 'vocabulary', label: 'Từ vựng', icon: '📚' },
    { id: 'kanji', label: 'Kanji', icon: '✍️' },
    { id: 'grammar', label: 'Ngữ pháp', icon: '⛩️' },
    { id: 'jlpt', label: 'Luyện đề', icon: '📝' },
    { id: 'progress', label: 'Tiến độ', icon: '📊' },
  ];

  return (
    <nav className="p-4 space-y-2">
      {navItems.map((item) => {
        // Ensure parent nav items stay active when viewing sub-pages
        const isActive = 
          activePage === item.id || 
          (item.id === 'grammar' && activePage === 'grammar-detail') ||
          (item.id === 'jlpt' && activePage === 'jlpt-result') ||
          (item.id === 'progress' && activePage === 'progress-detail') ||
          (item.id === 'roadmap' && activePage === 'roadmap-detail');

        return (
          <button
            key={item.id}
            onClick={() => {
              setActivePage(item.id);
              if (onNavigate) onNavigate();
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-100'
                : 'text-gray-500 hover:bg-pink-50 hover:text-pink-600'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
