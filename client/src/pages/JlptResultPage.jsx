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
  selectedTestLevel = "N5",
  currentTest = { title: "JLPT Test", passScore: 70 },
  currentResult = null,
  setActivePage = () => {},
  resetTest = () => {}
}) {
  const result = currentResult;
  const sectionStats = result ? buildSectionStats(result.sectionSummary) : [];
  const weakestSection = sectionStats[0];
  const strongestSection = sectionStats[sectionStats.length - 1];
  const wrongAnswers = result ? result.questionResults.filter((question) => !question.isCorrect) : [];
  const recommendations = buildRecommendations(selectedTestLevel, weakestSection, wrongAnswers);

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-rose-400 via-pink-400 to-amber-400 text-white p-8 sm:p-12 rounded-3xl shadow-lg">
        <p className="text-sm font-bold uppercase tracking-widest opacity-90">JLPT / result</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4">Trang kết quả dạng dashboard.</h1>
        <p className="text-lg opacity-95">
          Không chỉ hiện điểm tổng, trang này còn cho thấy section nào yếu, câu nào sai, và đâu là điểm mạnh của bài làm hiện tại.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Result Panel */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-rose-100 space-y-8">
          {/* Score Section */}
          <div>
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-widest text-rose-500">Score</p>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">{currentTest.title}</h2>
              <span className="text-gray-500 text-sm">{selectedTestLevel} · pass at {currentTest.passScore}%</span>
            </div>

            {result ? (
              <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-8 rounded-2xl border border-rose-200">
                <div className="text-center mb-8">
                  <span className={`inline-block px-6 py-2 rounded-full font-bold text-white ${result.passed ? 'bg-green-500' : 'bg-gray-400'}`}>
                    {result.passed ? "✓ Đạt" : "✗ Chưa đạt"}
                  </span>
                  <div className="text-5xl font-extrabold text-gray-900 mt-4 mb-2">{result.percent}%</div>
                  <p className="text-gray-700 font-medium">Đúng {result.correct}/{result.total} câu</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-rose-100 text-center">
                    <span className="text-xs font-bold uppercase text-gray-500">Điểm mạnh</span>
                    <strong className="text-lg text-gray-900 block mt-1">{strongestSection ? strongestSection.section : "—"}</strong>
                    <p className="text-sm text-gray-600 mt-1">{strongestSection ? `${strongestSection.percent}% chính xác` : "Chưa có"}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-amber-100 text-center">
                    <span className="text-xs font-bold uppercase text-gray-500">Cần ôn</span>
                    <strong className="text-lg text-gray-900 block mt-1">{weakestSection ? weakestSection.section : "—"}</strong>
                    <p className="text-sm text-gray-600 mt-1">{weakestSection ? `${weakestSection.percent}% chính xác` : "Chưa có"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-8 rounded-2xl text-center">
                <span className="inline-block px-6 py-2 rounded-full font-bold bg-gray-400 text-white mb-4">Chưa có kết quả</span>
                <p className="text-gray-700 font-medium">Submit bài để xem dashboard điểm.</p>
              </div>
            )}
          </div>

          {result && (
            <>
              {/* Section Summary */}
              <div>
                <div className="mb-6">
                  <p className="text-sm font-bold uppercase tracking-widest text-rose-500">Section summary</p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">Điểm theo phần</h2>
                </div>

                <div className="space-y-4">
                  {sectionStats.map((section) => (
                    <div key={section.section} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <strong className="text-gray-900">{section.section}</strong>
                          <span className="text-xs text-gray-500 ml-2">{section.correct}/{section.total} đúng</span>
                        </div>
                        <strong className={`${section.percent >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                          {section.percent}%
                        </strong>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${section.percent >= 70 ? 'bg-green-500' : 'bg-orange-500'}`}
                          style={{ width: `${section.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
                  <span className="text-xs font-bold uppercase text-gray-500">Nhận xét</span>
                  <p className="text-sm text-gray-700 mt-2 font-medium">
                    {result.passed ? "Chạm mốc pass ✓" : "Cần ôn thêm"}
                  </p>
                </div>
                <div className="bg-pink-50 p-4 rounded-xl border border-pink-200 text-center">
                  <span className="text-xs font-bold uppercase text-gray-500">Câu sai</span>
                  <strong className="text-2xl text-gray-900 block mt-2">{wrongAnswers.length}</strong>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
                  <span className="text-xs font-bold uppercase text-gray-500">Level</span>
                  <strong className="text-2xl text-gray-900 block mt-2">{selectedTestLevel}</strong>
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <div className="mb-6">
                  <p className="text-sm font-bold uppercase tracking-widest text-rose-500">Auto suggestions</p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">Gợi ý ôn tập tự động</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendations.map((item) => (
                    <div key={item.title} className="bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md transition-all">
                      <span className="inline-block text-xs font-bold uppercase bg-gray-100 text-gray-600 px-3 py-1 rounded mb-3">
                        {item.page}
                      </span>
                      <strong className="text-gray-900 block mb-2">{item.title}</strong>
                      <p className="text-sm text-gray-600 mb-4">{item.text}</p>
                      <button 
                        className="w-full px-3 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-all text-sm active:scale-95"
                        type="button" 
                        onClick={() => setActivePage(item.page)}
                      >
                        Đi tới {item.page}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar - Answer Review */}
        <aside className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100 h-fit">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-rose-500">Review</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Câu cần xem lại</h2>
            <span className="text-gray-500 text-sm mt-1 block">Danh sách ưu tiên câu sai để ôn trước.</span>
          </div>

          <div className="space-y-3 mb-8 max-h-96 overflow-y-auto">
            {result ? (
              wrongAnswers.length ? (
                wrongAnswers.map((question) => (
                  <div key={question.id} className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <strong className="text-gray-900 text-sm block">{question.prompt}</strong>
                    <p className="text-xs text-gray-600 mt-2">{question.explanation}</p>
                    <span className="inline-block mt-2 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">Sai</span>
                  </div>
                ))
              ) : (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <strong className="text-gray-900 block">Không có câu sai</strong>
                  <p className="text-sm text-gray-600 mt-1">Bài làm rất sạch. Chuyển sang level cao hơn.</p>
                </div>
              )
            ) : (
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Submit bài để xem review.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <button 
              className="w-full px-4 py-3 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition-all active:scale-95 shadow-sm"
              type="button" 
              onClick={() => setActivePage("jlpt")}
            >
              Làm lại đề
            </button>
            <button 
              className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
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
      </div>
    </div>
  );
}
