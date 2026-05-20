export default function GrammarDetailPage({
  selectedGrammar,
  currentGrammarList = [],
  setSelectedLevel = () => {},
  openGrammarDetail = () => {},
  setActivePage = () => {}
}) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-400 via-emerald-400 to-green-400 text-white p-8 sm:p-12 rounded-3xl shadow-lg">
        <p className="text-sm font-bold uppercase tracking-widest opacity-90">Ngữ pháp / chi tiết</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4">Trang chi tiết riêng cho từng mẫu câu.</h1>
        <p className="text-lg opacity-95">
          Đây là tầng sâu hơn của ngữ pháp. Người học đọc xong một thẻ sẽ thấy toàn bộ ý nghĩa, ví dụ, và ghi chú trong một màn hình riêng.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar with Grammar List */}
        <aside className="bg-white p-8 rounded-2xl shadow-sm border border-teal-100 h-fit">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-teal-500">Context</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Các mẫu cùng level</h2>
            <span className="text-gray-500 text-sm mt-1 block">Điều hướng nhanh giữa các mẫu liên quan.</span>
          </div>

          <div className="space-y-2 mb-8 max-h-96 overflow-y-auto">
            {currentGrammarList.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openGrammarDetail(item.id)}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  selectedGrammar?.id === item.id
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'bg-white border border-gray-200 text-gray-900 hover:border-teal-300'
                }`}
              >
                <strong className="block">{item.title}</strong>
                <span className={`text-xs mt-1 block ${selectedGrammar?.id === item.id ? 'opacity-90' : 'text-gray-500'}`}>
                  N{item.level}
                </span>
                <p className={`text-sm mt-2 line-clamp-1 ${selectedGrammar?.id === item.id ? 'opacity-90' : 'text-gray-600'}`}>
                  {item.explanation}
                </p>
                <div className={`flex gap-2 mt-2 text-xs ${selectedGrammar?.id === item.id ? 'opacity-80' : 'opacity-60'}`}>
                  <span>{item.examples?.length || 0} ví dụ</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <button 
              className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
              type="button" 
              onClick={() => setSelectedLevel("N5")}
            >
              Về N5
            </button>
            <button 
              className="w-full px-4 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
              type="button" 
              onClick={() => setActivePage("grammar")}
            >
              Quay lại danh sách
            </button>
          </div>
        </aside>

        {/* Main Detail Panel */}
        <article className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-teal-100">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-widest text-teal-500">Detail view</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedGrammar?.title ?? "Chưa chọn mẫu"}</h2>
            {/* <span className="text-gray-500 text-sm mt-1 block">Trang này tách riêng để tạo cảm giác nhiều tầng nội dung.</span> */}
          </div>

          {selectedGrammar ? (
            <>
              {/* Detail Header */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-xl mb-8 border border-teal-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-teal-600 uppercase">N{selectedGrammar.level}</p>
                    <strong className="text-2xl text-gray-900">{selectedGrammar.title}</strong>
                  </div>
                </div>
              </div>

              {/* Detail Grid */}
              <div className="mb-8">
                <dt className="text-sm font-bold uppercase text-gray-500 mb-4">Giải thích & Cấu trúc</dt>
                <dd className="text-gray-800 font-medium whitespace-pre-wrap leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-100">
                  {selectedGrammar.explanation}
                </dd>
              </div>

              {/* Examples Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ví dụ</h3>
                <div className="space-y-3">
                  {selectedGrammar.examples?.map((example, idx) => (
                    <div key={idx} className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
                      <strong className="block text-gray-900 mb-2 text-lg">{example.ja}</strong>
                      {example.vi && <p className="text-gray-700 mb-1 font-medium">{example.vi}</p>}
                      {example.en && <p className="text-gray-500 italic">{example.en}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium">Chưa chọn mẫu</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button 
              className="flex-1 px-4 py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-all active:scale-95 shadow-sm"
              type="button" 
              onClick={() => setActivePage("jlpt")}
            >
              Sang JLPT
            </button>
            <button 
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
              type="button" 
              onClick={() => setActivePage("progress")}
            >
              Xem tiến độ
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

