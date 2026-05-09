export default function HomePage({
  stats,
  roadmapSteps,
  studyPillars,
  featuredMetrics,
  blueprints,
  setActivePage
}) {
  const nextStep = roadmapSteps[0];
  const focusItems = [
    {
      title: "Tiếp tục lộ trình",
      text: nextStep?.goal ?? "Mở roadmap để xem chặng tiếp theo.",
      action: "roadmap"
    },
    {
      title: "Ôn ngữ pháp",
      text: `${stats.totalGrammar} mẫu câu đang sẵn sàng để ôn theo level.`,
      action: "grammar"
    },
    {
      title: "Làm lại đề gần nhất",
      text: `Điểm trung bình hiện tại là ${stats.averageScore}%. Làm lại JLPT để kéo điểm lên.`,
      action: "jlpt"
    }
  ];

  return (
    <section className="page-stack dashboard-page">
      <section className="dashboard-hero">
        <div className="hero-copy dashboard-copy">
          <p className="eyebrow">学習ダッシュボード</p>
          <h1>一箇所ですべてを管理する</h1>
          <p className="lede">
            これはポータルの概要です：進捗をすばやく確認し、必要な学習エリアを開き、タップするだけで文法や試験にジャンプできます。
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" type="button" onClick={() => setActivePage("jlpt")}>
              試験を開始
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setActivePage("grammar")}>
              文法を復習
            </button>
          </div>
        </div>

        <aside className="dashboard-side">
          <article className="panel-card dashboard-status">
            <span className="portal-label">今日の状態</span>
            <strong>{stats.totalTests > 0 ? "学習中" : "今日から始める"}</strong>
            <p>
              {stats.totalTests > 0
                ? `現在${stats.totalTests}回の試験を行い、平均${stats.averageScore}%を維持しています。`
                : "まだ学習履歴がありません。N5から始めるのが理想的です。"}
            </p>
          </article>
        </aside>
      </section>

      <section className="studio-grid dashboard-grid-main">
        <article className="panel home-actions-panel">
          <div className="section-head">
            <p>次は何をしますか？</p>
            <h2>アクションボード</h2>
            <span>学習エリアにすばやくアクセスするためのショートカット。</span>
          </div>

          <div className="page-card-grid dashboard-actions">
            {focusItems.map((item) => (
              <article className="mini-card dashboard-action-card" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <button className="btn btn-secondary" type="button" onClick={() => setActivePage(item.action)}>
                  開く
                </button>
              </article>
            ))}
          </div>
        </article>

        <article className="panel home-learning-panel">
          <div className="section-head">
            <p>学習内容</p>
            <h2>メインコンテンツ</h2>
            <span>アプリの3つの主要エリア。学習フローを明確に保ちます。</span>
          </div>

          <div className="portal-stack">
            {studyPillars.map((pillar, index) => (
              <article className="portal-card" key={pillar.title}>
                <div className="portal-card-index">0{index + 1}</div>
                <div>
                  <strong>{pillar.title}</strong>
                  <p>{pillar.text}</p>
                </div>
                <button className="inline-link" type="button" onClick={() => setActivePage(blueprints[index].key)}>
                  {pillar.action}
                </button>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="studio-grid compact-grid home-roadmap-panel">
        <article className="panel">
          <div className="section-head">
            <p>Roadmap</p>
            <h2>Chặng học sắp tới</h2>
            <span>Nhìn nhanh các bước kế tiếp trong lộ trình.</span>
          </div>

          <div className="timeline">
            {roadmapSteps.slice(0, 4).map((step) => (
              <div className="timeline-row" key={step.id}>
                <span>{step.level}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.goal}</p>
                </div>
                <p>{step.subtitle}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel home-quicklinks-panel">
          <div className="section-head">
            <p>Quick links</p>
            <h2>Đi thẳng tới khu vực</h2>
            <span>Không cần đi qua màn giới thiệu kiểu landing nữa.</span>
          </div>

          <div className="page-card-grid">
            {blueprints.map((item) => (
              <article className="mini-card" key={item.key}>
                <strong>{item.label}</strong>
                <p>{item.note}</p>
                <button type="button" onClick={() => setActivePage(item.key)}>
                  Mở {item.label.toLowerCase()}
                </button>
              </article>
            ))}
          </div>
        </article>
      </section>
    </section>
  );
}
