import { useState } from "react";
import Navigation from "./Navigation.jsx";

export default function Layout({ activePage, currentMeta, setActivePage, stats, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileTabs = [
    ["home", "Home"],
    ["grammar", "Học"],
    ["jlpt", "JLPT"],
    ["progress", "Tiến độ"]
  ];

  function handleNavigate(page) {
    setActivePage(page);
    setMenuOpen(false);
  }

  return (
    <div className="app-shell-grid">
      <aside className={`portal-rail ${menuOpen ? "is-open" : ""}`}>
        <div className="portal-brand">
          <button type="button" className="brand" onClick={() => handleNavigate("home")}>
            <span className="brand-mark">語</span>
            <span>
              <strong>Vocab Lab</strong>
              <small>日本語を学ぶ</small>
            </span>
          </button>
        </div>

        <div className="portal-current">
          <span className="portal-label">現在地</span>
          <strong>{currentMeta.title}</strong>
          <p>{currentMeta.subtitle}</p>
        </div>

        <Navigation activePage={activePage} setActivePage={handleNavigate} menuOpen={menuOpen} />

        <div className="portal-stats compact">
          <div>
            <span>文法</span>
            <strong>{stats.totalGrammar}</strong>
          </div>
          <div>
            <span>試験</span>
            <strong>{stats.totalTests}</strong>
          </div>
          <div>
            <span>平均</span>
            <strong>{stats.averageScore}%</strong>
          </div>
        </div>
      </aside>

      <div className="portal-main">
        <header className="workspace-bar">
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              {currentMeta.breadcrumb.map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </nav>
            <h1>{currentMeta.title}</h1>
            <p>{currentMeta.subtitle}</p>
          </div>
          <div className="workspace-chip">
            <span>Portal app</span>
            <strong>{activePage}</strong>
          </div>
        </header>

        <main className="app-shell">
          <div key={activePage} className="page-transition">
            {children}
          </div>
        </main>
      </div>

      <nav className="mobile-bottom-nav" aria-label="Điều hướng nhanh">
        {mobileTabs.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`mobile-tab ${activePage === key ? "active" : ""}`}
            onClick={() => handleNavigate(key)}
          >
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
