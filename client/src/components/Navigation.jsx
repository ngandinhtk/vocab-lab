const groups = [
  {
    label: "はじめに | Start",
    items: [
      ["home", "Portal"],
      ["roadmap", "Lộ trình"]
    ]
  },
  {
    label: "学習 | Study",
    items: [
      ["grammar", "Ngữ pháp"],
      ["grammar-detail", "Chi tiết"]
    ]
  },
  {
    label: "試験 | Exam",
    items: [
      ["jlpt", "JLPT"],
      ["jlpt-result", "Kết quả"]
    ]
  },
  {
    label: "進捗 | Progress",
    items: [["progress", "Tiến độ"]]
  }
];

export default function Navigation({ activePage, setActivePage, menuOpen }) {
  return (
    <nav className={`site-nav ${menuOpen ? "is-open" : ""}`}>
      {groups.map((group) => (
        <div className="nav-group" key={group.label}>
          <span className="nav-group-label">{group.label}</span>
          <div className="nav-group-items">
            {group.items.map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`nav-link ${activePage === key ? "active" : ""}`}
                onClick={() => setActivePage(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
