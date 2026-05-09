import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import RoadmapPage from "./pages/RoadmapPage.jsx";
import GrammarPage from "./pages/GrammarPage.jsx";
import GrammarDetailPage from "./pages/GrammarDetailPage.jsx";
import JlptPage from "./pages/JlptPage.jsx";
import JlptResultPage from "./pages/JlptResultPage.jsx";
import ProgressPage from "./pages/ProgressPage.jsx";
import { useVocabState } from "./state/useVocabState.js";

const pageMeta = {
  home: {
    title: "ポータル | Portal",
    subtitle: "学習エリアへの入り口",
    breadcrumb: ["Portal"]
  },
  roadmap: {
    title: "ロードマップ | Roadmap",
    subtitle: "基礎からJLPTまでの学習地図",
    breadcrumb: ["Portal", "Roadmap"]
  },
  grammar: {
    title: "文法 | Grammar",
    subtitle: "レベル別の文法項目リスト",
    breadcrumb: ["Portal", "Grammar"]
  },
  "grammar-detail": {
    title: "文法詳細 | Detail",
    subtitle: "文法項目の詳細ページ",
    breadcrumb: ["Portal", "Grammar", "Detail"]
  },
  jlpt: {
    title: "試験 | JLPT",
    subtitle: "模擬試験と採点エリア",
    breadcrumb: ["Portal", "JLPT"]
  },
  "jlpt-result": {
    title: "試験結果 | Result",
    subtitle: "結果ダッシュボードと復習の提案",
    breadcrumb: ["Portal", "JLPT", "Result"]
  },
  progress: {
    title: "進捗 | Progress",
    subtitle: "学習履歴とスコアの推移",
    breadcrumb: ["Portal", "Progress"]
  }
};

export default function App() {
  const app = useVocabState();
  const currentMeta = pageMeta[app.state.activePage] ?? pageMeta.home;

  return (
    <Layout
      activePage={app.navigationPage}
      currentMeta={currentMeta}
      setActivePage={app.setActivePage}
      stats={app.stats}
    >
      {app.state.activePage === "home" ? (
        <HomePage
          stats={app.stats}
          roadmapSteps={app.roadmap}
          studyPillars={app.studyPillars}
          featuredMetrics={app.featuredMetrics}
          blueprints={app.blueprints}
          setActivePage={app.setActivePage}
        />
      ) : null}

      {app.state.activePage === "roadmap" ? (
        <RoadmapPage
          roadmapSteps={app.roadmap}
          blueprints={app.blueprints}
          setActivePage={app.setActivePage}
        />
      ) : null}

      {app.state.activePage === "grammar" ? (
        <GrammarPage
          selectedLevel={app.state.selectedLevel}
          setSelectedLevel={app.setSelectedLevel}
          currentGrammarList={app.currentGrammarList}
          selectedGrammar={app.selectedGrammar}
          selectGrammar={app.selectGrammar}
          openGrammarDetail={app.openGrammarDetail}
          setActivePage={app.setActivePage}
        />
      ) : null}

      {app.state.activePage === "grammar-detail" ? (
        <GrammarDetailPage
          selectedGrammar={app.selectedGrammar}
          currentGrammarList={app.currentGrammarList}
          setSelectedLevel={app.setSelectedLevel}
          openGrammarDetail={app.openGrammarDetail}
          setActivePage={app.setActivePage}
        />
      ) : null}

      {app.state.activePage === "jlpt" ? (
        <JlptPage
          selectedTestLevel={app.state.selectedTestLevel}
          currentTest={app.currentTest}
          testAnswers={app.state.testAnswers}
          testSubmitted={app.state.testSubmitted}
          currentResult={app.currentResult}
          setTestLevel={app.setTestLevel}
          setTestAnswer={app.setTestAnswer}
          submitTest={app.submitTest}
          resetTest={app.resetTest}
          setActivePage={app.setActivePage}
        />
      ) : null}

      {app.state.activePage === "jlpt-result" ? (
        <JlptResultPage
          selectedTestLevel={app.state.selectedTestLevel}
          currentTest={app.currentTest}
          currentResult={app.currentResult}
          setActivePage={app.setActivePage}
          resetTest={app.resetTest}
        />
      ) : null}

      {app.state.activePage === "progress" ? (
        <ProgressPage stats={app.stats} testHistory={app.state.testHistory} />
      ) : null}
    </Layout>
  );
}
