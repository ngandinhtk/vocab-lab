const translations = {
  vi: {
    layout: {
      brand: 'Nihongo Kawaii',
      brandSub: 'Master Japanese',
      logout: 'Đăng xuất',
      pageMeta: {
        home: { title: 'Dashboard', subtitle: 'Cách dễ thương để học tiếng Nhật.' },
        roadmap: { title: 'Lộ trình', subtitle: 'Con đường của bạn từ N5 đến N1.' },
        grammar: { title: 'Ngữ pháp', subtitle: 'Khám phá mẫu câu tiếng Nhật theo cấp độ JLPT.' },
        'grammar-detail': { title: 'Chi tiết ngữ pháp', subtitle: 'Xem chi tiết các mẫu ngữ pháp.' },
        jlpt: { title: 'Luyện JLPT', subtitle: 'Kiểm tra kiến thức với đề thử.' },
        'jlpt-result': { title: 'Kết quả JLPT', subtitle: 'Xem lại hiệu suất làm đề.' },
        progress: { title: 'Tiến độ', subtitle: 'Theo dõi lịch sử và điểm số học tập.' }
      }
    },
    nav: {
      home: 'Dashboard',
      roadmap: 'Lộ trình',
      vocabulary: 'Từ vựng',
      kanji: 'Kanji',
      grammar: 'Ngữ pháp',
      jlpt: 'JLPT',
      progress: 'Tiến độ'
    },
    auth: {
      welcomeBack: 'Chào mừng trở lại!',
      createAccount: 'Tạo tài khoản',
      loginSub: 'Tiếp tục hành trình học của bạn.',
      registerSub: 'Tham gia để bắt đầu học tiếng Nhật!',
      username: 'Tên người dùng',
      email: 'Email',
      password: 'Mật khẩu',
      passwordMinError: 'Mật khẩu phải có ít nhất 6 ký tự.',
      processing: 'Đang xử lý...',
      logIn: 'Đăng nhập',
      createAccountButton: 'Tạo tài khoản',
      needAccount: 'Cần tài khoản? Đăng ký',
      haveAccount: 'Đã có tài khoản? Đăng nhập',
      placeholderUsername: 'Tên người dùng của bạn',
      placeholderEmail: 'ban@vi.du',
      placeholderPassword: 'Mật khẩu của bạn'
    },
    home: {
      heroTitle: 'Xin chào, người học!',
      heroSubtitle: 'Sẵn sàng bước tiếp trên hành trình tiếng Nhật chưa? 頑張って！',
      stats: {
        grammar: 'Ngữ pháp đã học',
        tests: 'Đề đã làm',
        average: 'Điểm trung bình'
      },
      action: {
        continueTitle: 'Tiếp tục con đường của bạn',
        continueDesc: 'Bước tiếp theo của bạn là: {stepName} ({level}). {goal}',
        continueButton: 'Xem lộ trình đầy đủ',
        practiceTitle: 'Ôn ngữ pháp',
        practiceDesc: 'Xem lại mẫu ngữ pháp, ví dụ và củng cố cấu trúc câu tiếng Nhật.',
        practiceButton: 'Xem ngữ pháp',
        testTitle: 'Làm đề thử',
        testDesc: 'Thử thách bản thân với đề JLPT để đo năng lực và xác định điểm yếu.',
        testButton: 'Bắt đầu JLPT'
      }
    },
    roadmap: {
      heroTag: 'Lộ trình học tập',
      heroTitle: 'Danh sách bài học',
      heroSubtitle: 'Phương pháp học tổng hợp. Mỗi bài học kết hợp Kanji, Từ vựng và Ngữ pháp.',
      noLessons: 'Chưa có dữ liệu bài học.'
    },
    grammar: {
      searchPlaceholder: 'Tìm theo tiêu đề hoặc ý nghĩa (ví dụ: "~wa", "topic", "request")...',
      reviewPoint: 'Điểm ôn tập',
      nothingFoundTitle: 'Không tìm thấy!',
      nothingFoundDesc: 'Không tìm thấy mẫu ngữ pháp nào phù hợp với "{query}".',
      resetSearch: 'Xóa tìm kiếm'
    },
    grammarDetail: {
      heroTag: 'Ngữ pháp / chi tiết',
      heroTitle: 'Trang chi tiết cho mỗi mẫu câu.',
      heroSubtitle: 'Đây là tầng sâu hơn của ngữ pháp. Người học sẽ thấy ý nghĩa, ví dụ và ghi chú riêng.',
      context: 'Ngữ cảnh',
      sameLevel: 'Các mẫu cùng level',
      sameLevelNote: 'Điều hướng nhanh giữa các mẫu liên quan.',
      backToN5: 'Về N5',
      backToList: 'Quay lại danh sách',
      detailView: 'Chế độ chi tiết',
      explanation: 'Giải thích & Cấu trúc',
      examples: 'Ví dụ',
      noSelection: 'Chưa chọn mẫu',
      toJlpt: 'Sang JLPT',
      viewProgress: 'Xem tiến độ'
    },
    jlpt: {
      heroTag: 'Đề JLPT',
      heroTitle: 'Tầng làm đề riêng trước khi xem kết quả.',
      heroMeta: 'UI wireframe',
      heroLabel: 'Tầng test',
      setupTag: 'Đặt cấu hình đề',
      chooseLevel: 'Chọn cấp độ',
      chooseLevelNote: 'Mỗi level có mini test riêng để tạo trải nghiệm nhiều tầng.',
      pass: 'Đạt',
      questions: 'câu',
      selectAnswer: 'Chọn câu trả lời',
      submit: 'Chấm điểm',
      reset: 'Làm lại',
      nextStepTag: 'Bước tiếp theo',
      nextStepTitle: 'Đi sau màn này',
      nextStepNote: 'Sau khi submit, app sẽ chuyển sang trang kết quả.',
      step1Title: 'Chọn câu trả lời',
      step1Text: 'Hệ thống lưu tạm đáp án từng câu.',
      step2Title: 'Bấm chấm điểm',
      step2Text: 'Kết quả sẽ được tính và lưu lịch sử.',
      step3Title: 'Sang trang kết quả',
      step3Text: 'Người học xem điểm, phần summary và câu sai.',
      reviewGrammar: 'Ôn ngữ pháp',
      viewProgress: 'Xem tiến độ'
    },
    jlptResult: {
      heroTag: 'JLPT / kết quả',
      heroTitle: 'Trang dashboard kết quả.',
      heroSubtitle: 'Không chỉ hiện điểm tổng, còn cho thấy phần yếu, câu sai và điểm mạnh.',
      scoreLabel: 'Điểm',
      passLabel: 'Đạt',
      questionLabel: 'Câu',
      noResult: 'Chưa có kết quả',
      noResultDetail: 'Submit bài để xem dashboard điểm.',
      sectionSummaryTag: 'Tóm tắt phần',
      sectionLabel: 'Điểm theo phần',
      insights: 'Nhận xét',
      passed: 'Đạt',
      failed: 'Cần ôn thêm',
      wrong: 'Câu sai',
      level: 'Level',
      recommendations: 'Gợi ý tự động',
      reviewTag: 'Ôn tập',
      reviewTitle: 'Câu cần xem lại',
      reviewNote: 'Danh sách ưu tiên câu sai để ôn trước.',
      retake: 'Làm lại đề',
      backToReview: 'Quay về ôn',
      mistakeText: 'Bạn đang có {count} câu sai. Hãy làm lại đúng các câu đó trước khi đổi level.',
      keepMomentum: 'Giữ phong độ',
      backRoadmap: 'Quay về roadmap',
      grammarReview: 'Ôn ngữ pháp ngay',
      grammarReviewText: 'Quay lại bộ ngữ pháp {level} và đọc lại các mẫu liên quan trước khi làm đề tiếp.',
      vocabReview: 'Tăng vốn từ',
      vocabReviewText: 'Ôn từ vựng theo chủ đề của level {level}, sau đó làm lại mini test để kiểm tra nhớ từ.',
      readingPractice: 'Luyện đọc hiểu',
      readingPracticeText: 'Tập trung vào câu dài, tìm keyword, rồi quay lại đề {level} để đo tốc độ đọc.'
    },
    progress: {
      heroTag: 'Tiến độ',
      heroTitle: 'Nhìn rõ điểm số, lịch sử và nhịp học của bạn.',
      snapshotTag: 'Ảnh học tập',
      overview: 'Tổng quan',
      overviewNote: 'Bảng chỉ số nhanh để biết bạn đang tiến tới đâu.',
      totalGrammar: 'Tổng ngữ pháp',
      totalTests: 'Đề đã làm',
      avgScore: 'Điểm TB',
      bestScore: 'Điểm cao nhất',
      overallProgress: 'Tiến độ chung',
      complete: 'hoàn thành',
      recentTests: 'Đề gần nhất',
      history: 'Lịch sử làm đề',
      noTests: 'Chưa có bài làm',
      noTestsNote: 'Hãy sang tab JLPT để làm đề đầu tiên.'
    },
    kanji: {
      searchPlaceholder: 'Tìm Kanji, ý nghĩa hoặc cách đọc...',
      noMatch: 'Không tìm thấy Kanji phù hợp.'
    },
    vocabulary: {
      searchPlaceholder: 'Tìm từ vựng, cách đọc hoặc ý nghĩa...',
      noMatch: 'Không tìm thấy từ vựng phù hợp.'
    },
    lessonDetail: {
      notFound: 'Không tìm thấy bài học.',
      back: 'Quay lại',
      jlpt: 'JLPT N{level}',
      kanjiTitle: 'Kanji cần học',
      vocabTitle: 'Từ vựng mới',
      grammarTitle: 'Cấu trúc ngữ pháp',
      startPractice: 'Bắt đầu luyện tập (SRS) 🚀'
    }
  },
  en: {
    layout: {
      brand: 'Nihongo Kawaii',
      brandSub: 'Master Japanese',
      logout: 'Log Out',
      pageMeta: {
        home: { title: 'Dashboard', subtitle: 'A cute way to learn Japanese.' },
        roadmap: { title: 'Roadmap', subtitle: 'Your path from N5 to N1.' },
        grammar: { title: 'Grammar', subtitle: 'Explore Japanese grammar points by JLPT level.' },
        'grammar-detail': { title: 'Grammar Detail', subtitle: 'Detailed view of a grammar point.' },
        jlpt: { title: 'JLPT Practice', subtitle: 'Test your knowledge with mock exams.' },
        'jlpt-result': { title: 'JLPT Results', subtitle: 'Review your test performance.' },
        progress: { title: 'Progress', subtitle: 'Track your learning history and stats.' }
      }
    },
    nav: {
      home: 'Dashboard',
      roadmap: 'Roadmap',
      vocabulary: 'Vocabulary',
      kanji: 'Kanji',
      grammar: 'Grammar',
      jlpt: 'JLPT',
      progress: 'Progress'
    },
    auth: {
      welcomeBack: 'Welcome Back!',
      createAccount: 'Create Your Account',
      loginSub: 'Let’s continue your learning journey.',
      registerSub: 'Join us to start learning Japanese!',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      passwordMinError: 'Password must be at least 6 characters long.',
      processing: 'Processing...',
      logIn: 'Log In',
      createAccountButton: 'Create Account',
      needAccount: 'Need an account? Sign up',
      haveAccount: 'Already have an account? Log in',
      placeholderUsername: 'Your username',
      placeholderEmail: 'you@example.com',
      placeholderPassword: 'Your password'
    },
    home: {
      heroTitle: 'Welcome, Learner!',
      heroSubtitle: 'Ready to take the next step in your Japanese journey? 頑張って！',
      stats: {
        grammar: 'Grammar Learned',
        tests: 'Tests Taken',
        average: 'Average Score'
      },
      action: {
        continueTitle: 'Continue Your Path',
        continueDesc: 'Your next step is: {stepName} ({level}). {goal}',
        continueButton: 'View Full Roadmap',
        practiceTitle: 'Practice Grammar',
        practiceDesc: 'Review grammar points, study examples, and solidify your understanding of Japanese sentence structure.',
        practiceButton: 'Review Grammar',
        testTitle: 'Take a Mock Test',
        testDesc: 'Challenge yourself with a JLPT mock test to gauge your skills and identify areas for improvement.',
        testButton: 'Start JLPT Test'
      }
    },
    roadmap: {
      heroTag: 'Learning roadmap',
      heroTitle: 'Lesson List',
      heroSubtitle: 'A holistic study path. Each lesson blends Kanji, Vocabulary, and Grammar.',
      noLessons: 'No lessons found.'
    },
    grammar: {
      searchPlaceholder: 'Search by title or meaning (e.g., "~wa", "topic", "request")...',
      reviewPoint: 'Review Point',
      nothingFoundTitle: 'Nothing found!',
      nothingFoundDesc: 'We couldn’t find any grammar points matching "{query}".',
      resetSearch: 'Reset Search'
    },
    grammarDetail: {
      heroTag: 'Grammar / detail',
      heroTitle: 'Dedicated detail page for each pattern.',
      heroSubtitle: 'This is a deeper grammar layer. Learners see meaning, examples, and notes in a separate screen.',
      context: 'Context',
      sameLevel: 'Same level patterns',
      sameLevelNote: 'Quickly navigate between related patterns.',
      backToN5: 'Back to N5',
      backToList: 'Back to list',
      detailView: 'Detail view',
      explanation: 'Explanation & Structure',
      examples: 'Examples',
      noSelection: 'No pattern selected',
      toJlpt: 'Go to JLPT',
      viewProgress: 'View progress'
    },
    jlpt: {
      heroTag: 'JLPT mock test',
      heroTitle: 'A separate test layer before viewing results.',
      heroMeta: 'UI wireframe',
      heroLabel: 'Test layer',
      setupTag: 'Test setup',
      chooseLevel: 'Choose a level',
      chooseLevelNote: 'Each level has its own mini test for layered experience.',
      pass: 'Pass',
      questions: 'questions',
      selectAnswer: 'Choose an answer',
      submit: 'Submit',
      reset: 'Reset',
      nextStepTag: 'Next step',
      nextStepTitle: 'What comes after this screen',
      nextStepNote: 'After submitting, the app moves to the result page.',
      step1Title: 'Select answers',
      step1Text: 'The system saves each answer temporarily.',
      step2Title: 'Press score',
      step2Text: 'Results will be calculated and stored.',
      step3Title: 'Go to result page',
      step3Text: 'Learners see score, section summary, and wrong answers.',
      reviewGrammar: 'Review Grammar',
      viewProgress: 'View progress'
    },
    jlptResult: {
      heroTag: 'JLPT / result',
      heroTitle: 'Result dashboard page.',
      heroSubtitle: 'This page shows not only total score, but section weaknesses, wrong answers, and strengths.',
      scoreLabel: 'Score',
      passLabel: 'Pass',
      questionLabel: 'Question',
      noResult: 'No result yet',
      noResultDetail: 'Submit the test to see the score dashboard.',
      sectionSummaryTag: 'Section summary',
      sectionLabel: 'Score by section',
      insights: 'Insights',
      passed: 'Passed',
      failed: 'Needs more review',
      wrong: 'Wrong questions',
      level: 'Level',
      recommendations: 'Auto suggestions',
      reviewTag: 'Review',
      reviewTitle: 'Questions to review',
      reviewNote: 'Priority list of wrong answers to review first.',
      retake: 'Retake test',
      backToReview: 'Back to study',
      mistakeText: 'You have {count} wrong questions. Review them before changing levels.',
      keepMomentum: 'Keep momentum',
      backRoadmap: 'Back to roadmap',
      grammarReview: 'Review grammar now',
      grammarReviewText: 'Return to grammar set {level} and reread related patterns before taking another test.',
      vocabReview: 'Increase vocabulary',
      vocabReviewText: 'Review vocabulary for level {level}, then retry the mini test to check retention.',
      readingPractice: 'Practice reading',
      readingPracticeText: 'Focus on longer sentences, find keywords, then return to {level} to measure reading speed.'
    },
    progress: {
      heroTag: 'Progress',
      heroTitle: 'See your score, history, and learning rhythm.',
      snapshotTag: 'Learning snapshot',
      overview: 'Overview',
      overviewNote: 'Quick metrics to know where you stand.',
      totalGrammar: 'Total grammar',
      totalTests: 'Tests taken',
      avgScore: 'Average score',
      bestScore: 'Best score',
      overallProgress: 'Overall progress',
      complete: 'complete',
      recentTests: 'Recent tests',
      history: 'Test history',
      noTests: 'No tests yet',
      noTestsNote: 'Go to JLPT to take your first test.'
    },
    kanji: {
      searchPlaceholder: 'Search kanji, meaning, or readings...',
      noMatch: 'No matching kanji found.'
    },
    vocabulary: {
      searchPlaceholder: 'Search vocabulary, reading, or meaning...',
      noMatch: 'No matching vocabulary found.'
    },
    lessonDetail: {
      notFound: 'Lesson not found.',
      back: 'Back',
      jlpt: 'JLPT N{level}',
      kanjiTitle: 'Kanji to learn',
      vocabTitle: 'New vocabulary',
      grammarTitle: 'Grammar structures',
      startPractice: 'Start practice (SRS) 🚀'
    }
  }
};

function resolvePath(obj, path) {
  return path.split('.').reduce((current, segment) => current?.[segment], obj);
}

export function translate(language = 'vi', key = '', fallback = '', params = {}) {
  const locale = translations[language] || translations.vi;
  let text = resolvePath(locale, key) ?? resolvePath(translations.vi, key) ?? fallback ?? key;
  Object.entries(params).forEach(([paramKey, paramValue]) => {
    text = String(text).replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
  });
  return text;
}

export const LANGUAGES = ['vi', 'en'];
