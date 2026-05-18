export default function JlptPage({
  selectedTestLevel = "N5",
  currentTest = { title: "Loading...", passScore: 70, questions: [], description: "Loading test data..." },
  testAnswers = {},
  setTestLevel = () => {},
  setTestAnswer = () => {},
  submitTest = () => {},
  resetTest = () => {},
  setActivePage = () => {}
}) {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 text-white p-8 sm:p-12 rounded-3xl shadow-lg">
        <p className="text-sm font-bold uppercase tracking-widest opacity-90">JLPT mock test</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4">Tầng làm đề riêng trước khi xem kết quả.</h1>
        <p className="text-lg opacity-95 mb-6">
          Trang này chỉ tập trung vào việc chọn level và trả lời câu hỏi. Sau khi chấm điểm, hệ thống sẽ chuyển sang trang kết quả riêng.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-80">UI wireframe</span>
          <strong className="text-xl">Test layer</strong>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Test Panel */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">Test setup</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Chọn cấp độ</h2>
            <span className="text-gray-500 text-sm mt-1 block">Mỗi level có mini test riêng để tạo trải nghiệm nhiều tầng.</span>
          </div>

          {/* Level Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["N5", "N4", "N3", "N2", "N1"].map((level) => (
              <button
                key={level}
                type="button"
                className={`px-4 py-2 font-bold rounded-xl transition-all ${
                  selectedTestLevel === level
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setTestLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Quiz Card */}
          <div className="border border-orange-100 rounded-2xl p-6">
            {/* Quiz Badge */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl mb-6 border border-orange-100">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <strong className="text-lg">{currentTest.title}</strong>
                <div className="flex gap-4 text-sm">
                  <span className="font-semibold">Pass: {currentTest.passScore}%</span>
                  <span className="font-semibold">{currentTest.questions.length} câu</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{currentTest.description}</p>

            {/* Quiz Questions */}
            <div className="space-y-6 mb-8">
              {currentTest.questions.map((question, index) => (
                <article key={question.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-lg">{question.section}</span>
                    <strong className="text-gray-900">Câu {index + 1}</strong>
                  </div>
                  <p className="text-gray-800 font-medium mb-4">{question.prompt}</p>
                  <div className="space-y-2">
                    {question.choices.map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all border-2 ${
                          testAnswers[question.id] === choice
                            ? 'border-orange-500 bg-orange-50 text-orange-900'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                        }`}
                        onClick={() => setTestAnswer(question.id, choice)}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                className="flex-1 px-4 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-sm"
                type="button" 
                onClick={submitTest}
              >
                Chấm điểm
              </button>
              <button 
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                type="button" 
                onClick={resetTest}
              >
                Làm lại
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 h-fit">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">Next step</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Đi sau màn này</h2>
            <span className="text-gray-500 text-sm mt-1 block">Sau khi submit, app sẽ chuyển sang trang kết quả riêng.</span>
          </div>

          {/* Step Guide */}
          <div className="space-y-3 mb-8">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold">01</span>
              <div>
                <strong className="text-gray-900">Chọn câu trả lời</strong>
                <p className="text-sm text-gray-600 mt-1">Hệ thống lưu tạm đáp án từng câu.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold">02</span>
              <div>
                <strong className="text-gray-900">Bấm chấm điểm</strong>
                <p className="text-sm text-gray-600 mt-1">Kết quả sẽ được tính và lưu lịch sử.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold">03</span>
              <div>
                <strong className="text-gray-900">Sang result page</strong>
                <p className="text-sm text-gray-600 mt-1">Người học xem điểm, section summary và đáp án sai.</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col gap-3">
            <button 
              className="w-full px-4 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-sm"
              type="button" 
              onClick={() => setActivePage("grammar")}
            >
              Ôn ngữ pháp
            </button>
            <button 
              className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
              type="button" 
              onClick={() => setActivePage("progress")}
            >
              Xem tiến độ
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

