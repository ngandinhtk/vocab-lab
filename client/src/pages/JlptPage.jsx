import React, { useEffect, useMemo, useState } from "react";

function formatTimeLeft(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function buildSections(currentTest) {
  const sectionMeta = Array.isArray(currentTest.sections) ? currentTest.sections : [];
  if (sectionMeta.length) {
    return sectionMeta.map((section) => ({
      label: section.label,
      timeLimitMinutes: section.timeLimitMinutes ?? 0,
      questions: currentTest.questions.filter((question) => question.section === section.label)
    }));
  }

  const grouped = [];
  for (const question of currentTest.questions) {
    const lastSection = grouped[grouped.length - 1];
    if (!lastSection || lastSection.label !== question.section) {
      grouped.push({ label: question.section, timeLimitMinutes: 0, questions: [question] });
    } else {
      lastSection.questions.push(question);
    }
  }
  return grouped;
}

function getQuestionFormatLabel(question) {
  if (question.format === "one-choice") return "One choice";
  if (question.format === "sentence-completion") return "Sentence completion";
  if (question.format === "reading-passage") return "Reading passage";
  if (question.section === "Reading") return "Reading";
  if (question.section === "Grammar/Vocab") return "Sentence completion";
  return "Choice";
}

function groupReadingQuestions(questions) {
  const groups = [];
  for (const question of questions) {
    const passageKey = question.passage || `__single_${question.id}`;
    const lastGroup = groups[groups.length - 1];
    if (!lastGroup || lastGroup.passageKey !== passageKey) {
      groups.push({ passageKey, passage: question.passage || "", questions: [question] });
    } else {
      lastGroup.questions.push(question);
    }
  }
  return groups;
}

function createTimerState(sections) {
  return sections.reduce((acc, section) => {
    acc[section.label] = {
      secondsLeft: Math.max(0, (section.timeLimitMinutes || 0) * 60),
      locked: false
    };
    return acc;
  }, {});
}

export default function JlptPage({
  selectedTestLevel = "N5",
  currentTest = { title: "Loading...", passScore: 70, questions: [], description: "Loading test data..." },
  testAnswers = {},
  setTestLevel = () => {},
  setTestAnswer = () => {},
  submitTest = () => {},
  resetTest = () => {},
  setActivePage = () => {},
  testAttemptId = 0
}) {
  const sections = useMemo(() => buildSections(currentTest), [currentTest]);
  const [sectionTimerState, setSectionTimerState] = useState(() => createTimerState(sections));

  useEffect(() => {
    setSectionTimerState(createTimerState(sections));
  }, [selectedTestLevel, testAttemptId, sections]);

  useEffect(() => {
    if (!sections.length || currentTest.questions.length === 0) return;

    const timer = window.setInterval(() => {
      setSectionTimerState((current) => {
        let changed = false;
        const next = { ...current };

        for (const section of sections) {
          const currentSection = next[section.label];
          if (!currentSection || currentSection.locked || currentSection.secondsLeft <= 0) continue;

          const nextSeconds = currentSection.secondsLeft - 1;
          next[section.label] = {
            secondsLeft: Math.max(0, nextSeconds),
            locked: nextSeconds <= 0
          };
          changed = true;
        }

        return changed ? next : current;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [sections, currentTest.questions.length]);

  const isSectionLocked = (label) => Boolean(sectionTimerState[label]?.locked);
  const questionCount = sections.reduce((total, section) => total + section.questions.length, 0);
  const allSectionsLocked = sections.length > 0 && sections.every((section) => isSectionLocked(section.label));

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 text-white p-8 sm:p-12 rounded-3xl shadow-lg">
        <p className="text-sm font-bold uppercase tracking-widest opacity-90">JLPT mock test</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4">Tầng làm đề riêng trước khi xem kết quả.</h1>
        {/* <p className="text-lg opacity-95 mb-6">
          Trang này chỉ tập trung vào việc chọn level và trả lời câu hỏi. Sau khi chấm điểm, hệ thống sẽ chuyển sang trang kết quả riêng.
        </p> */}
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
                  <span className="font-semibold">{questionCount} câu</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{currentTest.description}</p>
            <div className="mb-6 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-900">
              {allSectionsLocked
                ? "Hết giờ cho tất cả các phần. Bài làm sẵn sàng để chấm."
                : "Mỗi phần có bộ đếm riêng. Khi hết giờ, phần đó sẽ bị khóa."}
            </div>

            {/* Quiz Questions */}
            <div className="space-y-8 mb-8">
              {sections.map((section) => (
                <section key={section.label} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-lg">{section.label}</span>
                    <span className="text-xs font-semibold text-gray-500">{section.questions.length} câu</span>
                    {section.timeLimitMinutes ? (
                      <span className={`text-xs font-bold px-3 py-1 rounded-lg ${isSectionLocked(section.label) ? "bg-gray-200 text-gray-700" : "bg-rose-100 text-rose-700"}`}>
                        {isSectionLocked(section.label) ? "Hết giờ" : formatTimeLeft(sectionTimerState[section.label]?.secondsLeft ?? 0)}
                      </span>
                    ) : null}
                  </div>

                  {section.label === "Reading" ? (
                    groupReadingQuestions(section.questions).map((group) => (
                      <div key={group.passageKey} className="space-y-4">
                        {group.passage ? (
                          <div className="rounded-xl border border-sky-100 bg-sky-50/80 p-4 text-sm leading-7 text-slate-700 whitespace-pre-line">
                            {group.passage}
                          </div>
                        ) : null}
                        {group.questions.map((question) => (
                          <article key={question.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                            <div className="flex items-baseline justify-between mb-3">
                              <span className="text-xs font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-lg">{question.section}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                                  {getQuestionFormatLabel(question)}
                                </span>
                                <strong className="text-gray-900">Câu {currentTest.questions.findIndex((item) => item.id === question.id) + 1}</strong>
                              </div>
                            </div>
                            <p className="text-gray-800 font-medium mb-4">{question.prompt}</p>
                            <div className="space-y-2">
                              {question.choices.map((choice) => (
                                <button
                                  key={choice}
                                  type="button"
                                  disabled={isSectionLocked(question.section) || currentTest.questions.length === 0}
                                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all border-2 disabled:cursor-not-allowed disabled:opacity-60 ${
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
                    ))
                  ) : (
                    section.questions.map((question) => (
                      <article key={question.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                        <div className="flex items-baseline justify-between mb-3">
                          <span className="text-xs font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-lg">{question.section}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                              {getQuestionFormatLabel(question)}
                            </span>
                            <strong className="text-gray-900">Câu {currentTest.questions.findIndex((item) => item.id === question.id) + 1}</strong>
                          </div>
                        </div>
                        {question.passage ? (
                          <div className="mb-4 rounded-xl border border-sky-100 bg-sky-50/80 p-4 text-sm leading-7 text-slate-700 whitespace-pre-line">
                            {question.passage}
                          </div>
                        ) : null}
                        <p className="text-gray-800 font-medium mb-4">{question.prompt}</p>
                        <div className="space-y-2">
                          {question.choices.map((choice) => (
                            <button
                              key={choice}
                              type="button"
                              disabled={isSectionLocked(question.section) || currentTest.questions.length === 0}
                              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all border-2 disabled:cursor-not-allowed disabled:opacity-60 ${
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
                    ))
                  )}
                </section>
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
            {allSectionsLocked && (
              <p className="mt-4 text-sm text-gray-600">
                Thời gian cho từng phần đã kết thúc. Bạn có thể chấm điểm ngay.
              </p>
            )}
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
