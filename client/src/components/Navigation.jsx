import React from 'react';

export default function Navigation({ activePage, setActivePage, onNavigate, t }) {
  const navItems = [
    { id: 'home', label: t?.('nav.home') ?? 'Dashboard', icon: '🏠' },
    { id: 'roadmap', label: t?.('nav.roadmap') ?? 'Roadmap', icon: '🗺️' },
    { id: 'vocabulary', label: t?.('nav.vocabulary') ?? 'Vocabulary', icon: '📚' },
    { id: 'kanji', label: t?.('nav.kanji') ?? 'Kanji', icon: '✍️' },
    { id: 'grammar', label: t?.('nav.grammar') ?? 'Grammar', icon: '⛩️' },
    { id: 'jlpt', label: t?.('nav.jlpt') ?? 'JLPT', icon: '📝' },
    { id: 'progress', label: t?.('nav.progress') ?? 'Progress', icon: '📊' },
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
