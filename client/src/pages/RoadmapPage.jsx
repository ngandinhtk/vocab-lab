export default function RoadmapPage({ roadmapSteps, blueprints, setActivePage }) {
  return (
    <section className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Lộ trình</p>
          <h1>Roadmap học tiếng Nhật theo nhịp dễ theo dõi.</h1>
          <p className="lede">
            Bản đồ này đi từ nền tảng N5 đến N1. Mỗi chặng có mục tiêu, bài học chính và đầu ra rõ ràng
            để người học biết mình đang ở đâu.
          </p>
        </div>
        <div className="mini-summary">
          <span>UI wireframe</span>
          <strong>Roadmap cards</strong>
        </div>
      </section>

      <section className="studio-grid roadmap-grid">
        <article className="panel">
          <div className="section-head">
            <p>Roadmap detail</p>
            <h2>Các chặng học</h2>
            <span>Đi từng lớp thay vì ném quá nhiều thứ lên một màn hình.</span>
          </div>

          <div className="roadmap-list">
            {roadmapSteps.map((step) => (
              <article className="roadmap-card" key={step.id}>
                <div className="roadmap-head">
                  <span>{step.level}</span>
                  <strong>{step.subtitle}</strong>
                </div>
                <h3>{step.title}</h3>
                <p>{step.goal}</p>
                <div className="tag-row">
                  {step.lessons.map((lesson) => (
                    <span key={lesson}>{lesson}</span>
                  ))}
                </div>
                <div className="roadmap-footer">
                  <span>Đầu ra</span>
                  <p>{step.output}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <aside className="panel">
          <div className="section-head">
            <p>Wireframe map</p>
            <h2>Khung trang</h2>
            <span>Các màn hình chính của app và vai trò từng trang.</span>
          </div>

          <div className="blueprint-list">
            {blueprints.map((item) => (
              <article className="mini-card" key={item.key}>
                <strong>{item.label}</strong>
                <p>{item.note}</p>
              </article>
            ))}
          </div>

          <div className="button-row mt-16">
            <button className="btn btn-primary" type="button" onClick={() => setActivePage("grammar")}>
              Đi tới ngữ pháp
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setActivePage("jlpt")}>
              Sang JLPT
            </button>
          </div>
        </aside>
      </section>
    </section>
  );
}

