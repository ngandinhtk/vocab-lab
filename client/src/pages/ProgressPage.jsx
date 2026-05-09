export default function ProgressPage({ stats, testHistory }) {
  return (
    <section className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Tiến độ</p>
          <h1>Nhìn rõ điểm số, lịch sử và nhịp học của bạn.</h1>
          <p className="lede">
            Trang này gom các tín hiệu học tập: số đề đã làm, điểm trung bình, điểm cao nhất và lịch sử
            gần đây.
          </p>
        </div>
        <div className="mini-summary">
          <span>UI wireframe</span>
          <strong>Stats + history</strong>
        </div>
      </section>

      <section className="studio-grid">
        <article className="panel">
          <div className="section-head">
            <p>Learning snapshot</p>
            <h2>Tổng quan</h2>
            <span>Đây là bảng chỉ số nhanh để biết mình đang tiến tới đâu.</span>
          </div>

          <div className="metric-row">
            <article className="metric-card">
              <span>Tổng ngữ pháp</span>
              <strong>{stats.totalGrammar}</strong>
              <p>Bộ mẫu câu hiện có</p>
            </article>
            <article className="metric-card">
              <span>Đề đã làm</span>
              <strong>{stats.totalTests}</strong>
              <p>Lưu trong lịch sử local</p>
            </article>
            <article className="metric-card">
              <span>Điểm TB</span>
              <strong>{stats.averageScore}%</strong>
              <p>Mốc tiến bộ chung</p>
            </article>
            <article className="metric-card">
              <span>Điểm cao nhất</span>
              <strong>{stats.bestScore}%</strong>
              <p>Bài làm tốt nhất</p>
            </article>
          </div>

          <div className="progress mt-16">
            <span style={{ width: `${stats.averageScore}%` }} />
          </div>
        </article>

        <article className="panel">
          <div className="section-head">
            <p>Recent tests</p>
            <h2>Lịch sử làm đề</h2>
            <span>Các bài gần nhất sẽ hiện lên đầu.</span>
          </div>

          <div className="history-list">
            {testHistory.length ? (
              testHistory.map((item) => (
                <article className="history-row" key={item.id}>
                  <div>
                    <strong>{item.level}</strong>
                    <p>{item.at} · {item.time}</p>
                  </div>
                  <span>{item.correct}/{item.total}</span>
                  <strong className={item.passed ? "score-good" : "score-bad"}>{item.percent}%</strong>
                </article>
              ))
            ) : (
              <article className="history-row empty">
                <div>
                  <strong>Chưa có bài làm</strong>
                  <p>Hãy sang tab JLPT để làm đề đầu tiên.</p>
                </div>
              </article>
            )}
          </div>
        </article>
      </section>
    </section>
  );
}

