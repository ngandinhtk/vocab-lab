// src/components/Layout.jsx
import React, { useState } from "react";
import Navigation from "./Navigation.jsx";

export default function Layout({ user, activePage, setActivePage, onLogout, children }) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const pageMeta = {
    home: { title: "Dashboard", subtitle: `Welcome back, ${user.username}!` },
    roadmap: { title: "Roadmap", subtitle: "Your path from N5 to N1." },
    grammar: { title: "Grammar", subtitle: "Explore Japanese grammar points by JLPT level." },
    "grammar-detail": { title: "Grammar Detail", subtitle: "Detailed view of a grammar point." },
    jlpt: { title: "JLPT Practice", subtitle: "Test your knowledge with mock exams." },
    "jlpt-result": { title: "JLPT Results", subtitle: "Review your test performance." },
    progress: { title: "Progress", subtitle: "Track your learning history and stats." },
  };
  
  const currentMeta = pageMeta[activePage] || { title: "Nihongo Kawaii", subtitle: "A cute way to learn Japanese." };
  const userInitials = user.username ? user.username.slice(0, 2).toUpperCase() : '??';

  const closeMobileNav = () => setMobileNavOpen(false);
  const toggleMobileNav = () => setMobileNavOpen((value) => !value);

  return (
    <div className="flex min-h-screen bg-pink-50 text-gray-800">
      {/* Mobile overlay */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={closeMobileNav}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex-shrink-0 bg-white border-r border-pink-100 flex flex-col transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Brand/Logo */}
        <div className="h-20 flex items-center px-6 border-b border-pink-100">
          <button type="button" className="flex items-center space-x-3" onClick={() => { setActivePage("home"); closeMobileNav(); }}>
            <span className="text-3xl text-pink-500 bg-pink-50 w-12 h-12 flex items-center justify-center rounded-2xl shadow-inner">語</span>
            <div className="text-left">
              <strong className="text-lg font-black tracking-tight text-gray-900">Nihongo Kawaii</strong>
              <small className="block text-[10px] font-bold uppercase tracking-widest text-pink-400">Master Japanese</small>
            </div>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          <Navigation activePage={activePage} setActivePage={setActivePage} onNavigate={closeMobileNav} />
        </div>

        {/* Footer with Logout */}
        <div className="p-6 border-t border-pink-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-bold text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-100 transition-all active:scale-95"
          >
            <span>👋</span>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-pink-100 flex items-center justify-between gap-4 px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleMobileNav}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-pink-100 bg-white text-pink-600 shadow-sm"
            >
              <span className="text-lg">☰</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentMeta.title}</h1>
              <p className="text-sm text-gray-500">{currentMeta.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">
              Tier: <span className="font-bold text-pink-600">{user.subscription_tier}</span>
            </span>
            <div className="w-10 h-10 rounded-full bg-pink-200 text-pink-600 flex items-center justify-center font-bold">
              {userInitials}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-pink-50">
          <div key={activePage} className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
