export default function ProgressPage({ 
  stats = { totalGrammar: 0, totalTests: 0, averageScore: 0, bestScore: 0 }, 
  testHistory = [] 
}) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white p-8 sm:p-12 rounded-3xl shadow-lg">
        <p className="text-sm font-bold uppercase tracking-widest opacity-90">Tiến độ</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4">Nhìn rõ điểm số, lịch sử và nhịp học của bạn.</h1>
        {/* <p className="text-lg opacity-95">
          Trang này gom các tín hiệu học tập: số đề đã làm, điểm trung bình, điểm cao nhất và lịch sử gần đây.
        </p> */}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stats Panel */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-widest text-purple-500">Learning snapshot</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Tổng quan</h2>
            <span className="text-gray-500 text-sm mt-1 block">Bảng chỉ số nhanh để biết bạn đang tiến tới đâu.</span>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-200">
              <span className="text-xs font-bold uppercase text-gray-500">Tổng ngữ pháp</span>
              <strong className="text-3xl text-gray-900 block mt-2">{stats.totalGrammar}</strong>
              <p className="text-xs text-gray-600 mt-1">Bộ mẫu câu hiện có</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
              <span className="text-xs font-bold uppercase text-gray-500">Đề đã làm</span>
              <strong className="text-3xl text-gray-900 block mt-2">{stats.totalTests}</strong>
              <p className="text-xs text-gray-600 mt-1">Lưu trong lịch sử</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
              <span className="text-xs font-bold uppercase text-gray-500">Điểm TB</span>
              <strong className="text-3xl text-gray-900 block mt-2">{stats.averageScore}%</strong>
              <p className="text-xs text-gray-600 mt-1">Mốc tiến bộ chung</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <span className="text-xs font-bold uppercase text-gray-500">Điểm cao nhất</span>
              <strong className="text-3xl text-gray-900 block mt-2">{stats.bestScore}%</strong>
              <p className="text-xs text-gray-600 mt-1">Bài làm tốt nhất</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">Overall Progress</p>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                style={{ width: `${stats.averageScore}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">{stats.averageScore}% complete</p>
          </div>
        </div>

        {/* History Panel */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-purple-500">Recent tests</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Lịch sử làm đề</h2>
            <span className="text-gray-500 text-sm mt-1 block">Các bài gần nhất sẽ hiện lên đầu.</span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {testHistory.length ? (
              testHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="flex-1">
                    <strong className="text-gray-900 block">{item.level}</strong>
                    <p className="text-xs text-gray-500 mt-1">{item.at} · {item.time}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600 block mb-1">{item.correct}/{item.total}</span>
                    <strong className={`inline-block px-3 py-1 rounded font-bold text-sm ${
                      item.passed 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.percent}%
                    </strong>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center border border-dashed border-gray-300 rounded-lg">
                <p className="text-2xl opacity-50 mb-3">📭</p>
                <strong className="text-gray-900 block">Chưa có bài làm</strong>
                <p className="text-sm text-gray-600 mt-1">Hãy sang tab JLPT để làm đề đầu tiên.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

