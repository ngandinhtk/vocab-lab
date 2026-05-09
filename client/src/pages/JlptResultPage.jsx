function buildSectionStats(sectionSummary) {
  return Object.entries(sectionSummary)
    .map(([section, summary]) => {
      const percent = Math.round((summary.correct / summary.total) * 100);
      return { section, ...summary, percent };
    })
    .sort((a, b) => a.percent - b.percent);
}

function buildRecommendations(selectedTestLevel, weakestSection, wrongAnswers) {
  const baseLevel = selectedTestLevel;
  const section = weakestSection?.section ?? "Ngữ pháp";

  const sectionAction =
    section === "Ngữ pháp"
      ? {
          title: "Ôn ngữ pháp ngay",
          text: `Quay lại bộ ngữ pháp ${baseLevel} và đọc lại các mẫu liên quan trước khi làm đề tiếp.`,
          page: "grammar"
        }
      : section === "Từ vựng"
        ? {
            title: "Tăng vốn từ",
            text: `Ôn từ vựng theo chủ đề của level ${baseLevel}, sau đó làm lại mini test để kiểm tra nhớ từ.`,
            page: "grammar"
          }
        : {
            title: "Luyện đọc hiểu",
            text: `Tập trung vào câu dài, tìm keyword, rồi quay lại đề ${baseLevel} để đo tốc độ đọc.`,
            page: "roadmap"
          };

  const mistakeCount = wrongAnswers.length;

  return [
    sectionAction,
    {
      title: mistakeCount ? "Chốt lại câu sai" : "Giữ phong độ",
      text: mistakeCount
        ? `Bạn đang có ${mistakeCount} câu sai. Hãy làm lại đúng các câu đó trước khi đổi level.`
        : "Không có câu sai. Có thể nhảy sang level cao hơn hoặc làm lại với timer.",
      page: "jlpt"
    },
    {
      title: "Quay về roadmap",
      text: "Nếu muốn học có hệ thống hơn, chuyển sang roadmap để tiếp tục lộ trình.",
      page: "roadmap"
    }
  ];
}

export default function JlptResultPage({
  selectedTestLevel,
  currentTest,
  currentResult,
  setActivePage,
  resetTest
}) {
  const result = currentResult;
  const sectionStats = result ? buildSectionStats(result.sectionSummary) : [];
  const weakestSection = sectionStats[0];
  const strongestSection = sectionStats[sectionStats.length - 1];
  const wrongAnswers = result ? result.questionResults.filter((question) => !question.isCorrect) : [];
  const recommendations = buildRecommendations(selectedTestLevel, weakestSection, wrongAnswers);

  return (
    <section className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">JLPT / result</p>
          <h1>Trang kết quả dạng dashboard.</h1>
          <p className="lede">
            Không chỉ hiện điểm tổng, trang này còn cho thấy section nào yếu, câu nào sai, và đâu là
            điểm mạnh của bài làm hiện tại.
          </p>
        </div>
        <div className="mini-summary">
          <span>UI wireframe</span>
          <strong>Result dashboard</strong>
        </div>
      </section>

      <section className="studio-grid result-grid">
        <article className="panel">
          <div className="section-head">
            <p>Score</p>
            <h2>{currentTest.title}</h2>
            <span>{selectedTestLevel} · pass at {currentTest.passScore}%</span>
          </div>

          {result ? (
            <div className="result-hero-card">
              <div className="result-main-score">
                <span className={`result-pill ${result.passed ? "success" : "neutral"}`}>
                  {result.passed ? "Đạt" : "Chưa đạt"}
                </span>
                <strong>{result.percent}%</strong>
                <p>
                  Đúng {result.correct}/{result.total} câu
                </p>
              </div>

              <div className="result-highlight-grid">
                <article>
                  <span>Điểm mạnh</span>
                  <strong>{strongestSection ? strongestSection.section : "—"}</strong>
                  <p>{strongestSection ? `${strongestSection.percent}% chính xác` : "Chưa có dữ liệu"}</p>
                </article>
                <article>
                  <span>Cần ôn</span>
                  <strong>{weakestSection ? weakestSection.section : "—"}</strong>
                  <p>{weakestSection ? `${weakestSection.percent}% chính xác` : "Chưa có dữ liệu"}</p>
                </article>
              </div>
            </div>
          ) : (
            <div className="result-hero-card">
              <div className="result-main-score">
                <span className="result-pill neutral">Chưa có kết quả</span>
                <strong>—</strong>
                <p>Submit bài để xem dashboard điểm.</p>
              </div>
            </div>
          )}

          {result ? (
            <>
              <div className="section-head mt-16">
                <p>Section summary</p>
                <h2>Điểm theo phần</h2>
              </div>

              <div className="section-bars">
                {sectionStats.map((section) => (
                  <article className="section-bar-row" key={section.section}>
                    <div className="section-bar-label">
                      <strong>{section.section}</strong>
                      <span>
                        {section.correct}/{section.total} đúng
                      </span>
                    </div>
                    <div className="section-bar-track">
                      <span style={{ width: `${section.percent}%` }} />
                    </div>
                    <strong className={section.percent >= 70 ? "score-good" : "score-bad"}>{section.percent}%</strong>
                  </article>
                ))}
              </div>

              <div className="insight-strip mt-16">
                <article>
                  <span>Nhận xét</span>
                  <strong>
                    {result.passed
                      ? "Bạn đã chạm mốc pass của level này."
                      : "Chưa đạt mốc pass, nhưng đã có dữ liệu rõ để ôn tập."}
                  </strong>
                </article>
                <article>
                  <span>Câu sai</span>
                  <strong>{wrongAnswers.length}</strong>
                </article>
                <article>
                  <span>Level</span>
                  <strong>{selectedTestLevel}</strong>
                </article>
              </div>

              <div className="section-head mt-16">
                <p>Auto suggestions</p>
                <h2>Gợi ý ôn tập tự động</h2>
              </div>

              <div className="suggestion-grid">
                {recommendations.map((item) => (
                  <article className="suggestion-card" key={item.title}>
                    <span className="suggestion-pill">{item.page}</span>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                    <button className="btn btn-secondary" type="button" onClick={() => setActivePage(item.page)}>
                      Đi tới {item.page}
                    </button>
                  </article>
                ))}
              </div>
            </>
          ) : null}
        </article>

        <aside className="panel">
          <div className="section-head">
            <p>Review</p>
            <h2>Câu cần xem lại</h2>
            <span>Danh sách này ưu tiên câu sai để ôn trước.</span>
          </div>

          <div className="answer-review">
            {result ? (
              wrongAnswers.length ? (
                wrongAnswers.map((question) => (
                  <article className="answer-line wrong" key={question.id}>
                    <div>
                      <strong>{question.prompt}</strong>
                      <p>{question.explanation}</p>
                    </div>
                    <span>Sai · {question.answer}</span>
                  </article>
                ))
              ) : (
                <article className="answer-line correct">
                  <div>
                    <strong>Không có câu sai</strong>
                    <p>Hiện tại bài làm rất sạch. Có thể chuyển sang level cao hơn.</p>
                  </div>
                  <span>Tốt</span>
                </article>
              )
            ) : (
              <article className="answer-line">
                <div>
                  <strong>Không có dữ liệu</strong>
                  <p>Submit bài để hiện answer review.</p>
                </div>
              </article>
            )}
          </div>

          <div className="button-row mt-16">
            <button className="btn btn-primary" type="button" onClick={() => setActivePage("jlpt")}>
              Làm lại đề
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                resetTest();
                setActivePage("grammar");
              }}
            >
              Quay về ôn
            </button>
          </div>
        </aside>
      </section>
    </section>
  );
}
