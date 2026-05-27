// src/App.jsx
import Layout from "./components/Layout.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RoadmapPage from "./pages/RoadmapPage.jsx";
import GrammarPage from "./pages/GrammarPage.jsx";
import GrammarDetailPage from "./pages/GrammarDetailPage.jsx";
import JlptPage from "./pages/JlptPage.jsx";
import JlptResultPage from "./pages/JlptResultPage.jsx";
import ProgressPage from "./pages/ProgressPage.jsx";
import { useVocabState } from "./state/useVocabState.js";

import VocabularyPage from "./pages/VocabularyPage.jsx";
import KanjiPage from "./pages/KanjiPage.jsx";
import RoadmapDetailPage from "./pages/RoadmapDetailPage.jsx";

// A simple router to render the correct page based on the state.
function PageRouter({ app }) {
  const page = app.state.activePage;
  const levelProps = {
    selectedLevel: app.state.selectedLevel,
    setSelectedLevel: app.setSelectedLevel,
    t: app.t
  };

  if (page === "home") return <HomePage stats={app.stats} setActivePage={app.setActivePage} t={app.t} />;
  if (page === "roadmap") return <RoadmapPage lessons={app.lessons} lessonProgress={app.state.lessonProgress} setActivePage={app.setActivePage} setSelectedLessonId={app.setSelectedLessonId} markLessonProgress={app.markLessonProgress} {...levelProps} />;
  if (page === "lesson-detail") return <RoadmapDetailPage lessonId={app.state.selectedLessonId} token={app.state.token} lessonProgress={app.state.lessonProgress} markLessonProgress={app.markLessonProgress} onBack={() => app.setActivePage('roadmap')} t={app.t} />;
  if (page === "vocabulary") return <VocabularyPage vocabulary={app.vocabulary} {...levelProps} />;
  if (page === "kanji") return <KanjiPage kanji={app.kanji} {...levelProps} />;
  if (page === "grammar") return <GrammarPage {...app} {...levelProps} />;
  if (page === "grammar-detail") return <GrammarDetailPage {...app} />;
  if (page === "jlpt") return <JlptPage {...app} testAttemptId={app.testAttemptId} />;
  if (page === "jlpt-result") return <JlptResultPage {...app} />;
  if (page === "progress") return <ProgressPage stats={app.stats} testHistory={app.state.testHistory} t={app.t} />;
  
  // Fallback to home page if no route matches
  return <HomePage stats={app.stats} setActivePage={app.setActivePage} t={app.t} />;
}

export default function App() {
  const app = useVocabState();

  // If the user is not authenticated, show the AuthPage
  if (!app.isAuthenticated) {
    return <AuthPage onLogin={app.login} onRegister={app.register} language={app.language} setLanguage={app.setLanguage} t={app.t} />;
  }

  // If authenticated, show the main application layout
  return (
    <Layout
      user={app.user}
      activePage={app.state.activePage}
      setActivePage={app.setActivePage}
      onLogout={app.logout}
      language={app.language}
      setLanguage={app.setLanguage}
      t={app.t}
    >
      <PageRouter app={app} />
    </Layout>
  );
}
