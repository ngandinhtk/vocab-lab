export default function JlptPage({
  selectedTestLevel,
  currentTest,
  testAnswers,
  setTestLevel,
  setTestAnswer,
  submitTest,
  resetTest,
  setActivePage
}) {
  return (
    <section className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">JLPT mock test</p>
          <h1>Tầng làm đề riêng trước khi xem kết quả.</h1>
          <p className="lede">
            Trang này chỉ tập trung vào việc chọn level và trả lời câu hỏi. Sau khi chấm điểm, hệ thống
            sẽ chuyển sang trang kết quả riêng.
          </p>
        </div>
        <div className="mini-summary">
          <span>UI wireframe</span>
          <strong>Test layer</strong>
        </div>
      </section>

      <section className="studio-grid jlpt-grid">
        <article className="panel">
          <div className="section-head">
            <p>Test setup</p>
            <h2>Chọn cấp độ</h2>
            <span>Mỗi level có mini test riêng để tạo trải nghiệm nhiều tầng.</span>
          </div>

          <div className="level-tabs">
            {["N5", "N4", "N3", "N2", "N1"].map((level) => (
              <button
                key={level}
                type="button"
                className={`level-chip ${selectedTestLevel === level ? "active" : ""}`}
                onClick={() => setTestLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="quiz-card">
            <div className="quiz-badge">
              <span>{currentTest.title}</span>
              <span>{currentTest.passScore}% pass</span>
              <span>{currentTest.questions.length} câu</span>
            </div>
            <p>{currentTest.description}</p>

            <div className="quiz-stack">
              {currentTest.questions.map((question, index) => (
                <article className="quiz-item" key={question.id}>
                  <div className="quiz-item-head">
                    <span>{question.section}</span>
                    <strong>Câu {index + 1}</strong>
                  </div>
                  <p className="quiz-prompt">{question.prompt}</p>
                  <div className="quiz-options">
                    {question.choices.map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        className={`quiz-option ${testAnswers[question.id] === choice ? "is-selected" : ""}`}
                        onClick={() => setTestAnswer(question.id, choice)}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="button-row mt-16">
              <button className="btn btn-primary" type="button" onClick={submitTest}>
                Chấm điểm
              </button>
              <button className="btn btn-secondary" type="button" onClick={resetTest}>
                Làm lại
              </button>
            </div>
          </div>
        </article>

        <aside className="panel">
          <div className="section-head">
            <p>Next step</p>
            <h2>Đi sau màn này</h2>
            <span>Sau khi submit, app sẽ chuyển sang trang kết quả riêng.</span>
          </div>

          <div className="wireframe-list">
            <div className="wireframe-row">
              <span>01</span>
              <div>
                <strong>Chọn câu trả lời</strong>
                <p>Hệ thống lưu tạm đáp án từng câu.</p>
              </div>
            </div>
            <div className="wireframe-row">
              <span>02</span>
              <div>
                <strong>Bấm chấm điểm</strong>
                <p>Kết quả sẽ được tính và lưu lịch sử.</p>
              </div>
            </div>
            <div className="wireframe-row">
              <span>03</span>
              <div>
                <strong>Sang result page</strong>
                <p>Người học xem điểm, section summary và đáp án sai.</p>
              </div>
            </div>
          </div>

          <div className="button-row mt-16">
            <button className="btn btn-primary" type="button" onClick={() => setActivePage("grammar")}>
              Ôn ngữ pháp
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setActivePage("progress")}>
              Xem tiến độ
            </button>
          </div>
        </aside>
      </section>
    </section>
  );
}

