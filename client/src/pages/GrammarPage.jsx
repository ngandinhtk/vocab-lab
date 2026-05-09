const levels = ["N5", "N4", "N3", "N2", "N1"];

export default function GrammarPage({
  selectedLevel,
  setSelectedLevel,
  currentGrammarList,
  selectedGrammar,
  selectGrammar,
  openGrammarDetail,
  setActivePage
}) {
  return (
    <section className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Ngữ pháp</p>
          <h1>Tổng hợp ngữ pháp theo cấp độ JLPT.</h1>
          <p className="lede">
            Đây là tầng danh sách. Bấm vào từng mẫu để mở trang chi tiết riêng, thay vì nhét toàn bộ
            nội dung vào một màn hình.
          </p>
        </div>
        <div className="mini-summary">
          <span>UI wireframe</span>
          <strong>List layer</strong>
        </div>
      </section>

      <section className="studio-grid grammar-grid">
        <aside className="panel">
          <div className="section-head">
            <p>Level filter</p>
            <h2>Chọn cấp độ</h2>
            <span>Mỗi level sẽ hiện bộ mẫu ngữ pháp riêng.</span>
          </div>

          <div className="level-tabs">
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                className={`level-chip ${selectedLevel === level ? "active" : ""}`}
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="word-list">
            {currentGrammarList.map((item) => (
              <article
                className={`word-card ${selectedGrammar?.id === item.id ? "is-active" : ""}`}
                key={item.id}
              >
                <button type="button" className="word-card-main" onClick={() => selectGrammar(item.id)}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.structure}</span>
                  </div>
                  <p>{item.meaning}</p>
                  <div className="word-meta">
                    <span>{item.level}</span>
                    <span>{item.examples.length} ví dụ</span>
                  </div>
                </button>
                <div className="card-action-row">
                  <span>Xem chi tiết</span>
                  <button type="button" className="inline-link" onClick={() => openGrammarDetail(item.id)}>
                    Mở trang
                  </button>
                </div>
              </article>
            ))}
          </div>
        </aside>

        <article className="panel">
          <div className="section-head">
            <p>Preview</p>
            <h2>Khung xem trước</h2>
            <span>Chi tiết đầy đủ sẽ ở trang riêng, phù hợp với flow nhiều tầng.</span>
          </div>

          {selectedGrammar ? (
            <div className="detail-card grammar-detail">
              <div className="detail-head">
                <div>
                  <p>{selectedGrammar.level}</p>
                  <strong>{selectedGrammar.title}</strong>
                </div>
                <span className="chip">{selectedGrammar.structure}</span>
              </div>

              <dl className="detail-grid">
                <div>
                  <dt>Ý nghĩa</dt>
                  <dd>{selectedGrammar.meaning}</dd>
                </div>
                <div>
                  <dt>Ghi chú</dt>
                  <dd>{selectedGrammar.notes}</dd>
                </div>
                <div>
                  <dt>Mẹo nhớ</dt>
                  <dd>{selectedGrammar.tips}</dd>
                </div>
                <div>
                  <dt>Gợi ý luyện</dt>
                  <dd>Dùng lại mẫu này trong đề JLPT và tự đặt 1 câu mới.</dd>
                </div>
              </dl>

              <div className="example-stack">
                {selectedGrammar.examples.map((example) => (
                  <article className="example-card" key={example.ja}>
                    <strong>{example.ja}</strong>
                    <p>{example.vi}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="button-row mt-16">
            <button className="btn btn-primary" type="button" onClick={() => setActivePage("jlpt")}>
              Làm đề JLPT
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setActivePage("roadmap")}>
              Quay về roadmap
            </button>
          </div>
        </article>
      </section>
    </section>
  );
}

