export default function GrammarDetailPage({
  selectedGrammar,
  currentGrammarList,
  setSelectedLevel,
  openGrammarDetail,
  setActivePage
}) {
  return (
    <section className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Ngữ pháp / chi tiết</p>
          <h1>Trang chi tiết riêng cho từng mẫu câu.</h1>
          <p className="lede">
            Đây là tầng sâu hơn của ngữ pháp. Người học đọc xong một thẻ sẽ thấy toàn bộ ý nghĩa, ví dụ,
            và ghi chú trong một màn hình riêng.
          </p>
        </div>
        <div className="mini-summary">
          <span>UI wireframe</span>
          <strong>Detail layer</strong>
        </div>
      </section>

      <section className="studio-grid grammar-grid">
        <aside className="panel">
          <div className="section-head">
            <p>Context</p>
            <h2>Các mẫu cùng level</h2>
            <span>Điều hướng nhanh giữa các mẫu liên quan.</span>
          </div>

          <div className="word-list">
            {currentGrammarList.map((item) => (
              <article className={`word-card ${selectedGrammar?.id === item.id ? "is-active" : ""}`} key={item.id}>
                <button type="button" className="word-card-main" onClick={() => openGrammarDetail(item.id)}>
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
              </article>
            ))}
          </div>

          <div className="button-row mt-16">
            <button className="btn btn-secondary" type="button" onClick={() => setSelectedLevel("N5")}>
              Về N5
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setActivePage("grammar")}>
              Quay lại danh sách
            </button>
          </div>
        </aside>

        <article className="panel">
          <div className="section-head">
            <p>Detail view</p>
            <h2>{selectedGrammar?.title ?? "Chưa chọn mẫu"}</h2>
            <span>Trang này tách riêng để tạo cảm giác nhiều tầng nội dung.</span>
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
                  <dt>Cách dùng</dt>
                  <dd>Đặt câu mới bằng đúng cấu trúc rồi so với ví dụ mẫu.</dd>
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
              Sang JLPT
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setActivePage("progress")}>
              Xem tiến độ
            </button>
          </div>
        </article>
      </section>
    </section>
  );
}

