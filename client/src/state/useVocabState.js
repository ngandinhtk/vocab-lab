import { useEffect, useMemo, useState } from "react";
import { grammarItems, heroMetrics, jlptTests, levelOrder, pageBlueprint, roadmapSteps, studyPillars } from "../data.js";

const STORAGE_KEY = "nihongo-kawaii-state";

function normalize(value = "") {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(date = new Date()) {
  return date.toLocaleDateString("en-CA");
}

function getInitialLevel() {
  return grammarItems[0]?.level ?? "N5";
}

function getGrammarForLevel(level) {
  return grammarItems.filter((item) => item.level === level);
}

function getTest(level) {
  return jlptTests[level] ?? jlptTests.N5;
}

function scoreTest(test, answers) {
  const questionResults = test.questions.map((question) => {
    const given = answers[question.id] ?? "";
    const isCorrect = normalize(given) === normalize(question.answer);
    return { ...question, given, isCorrect };
  });

  const correct = questionResults.filter((question) => question.isCorrect).length;
  const total = questionResults.length;
  const percent = total ? Math.round((correct / total) * 100) : 0;

  const sectionSummary = questionResults.reduce((acc, question) => {
    const entry = acc[question.section] ?? { correct: 0, total: 0 };
    entry.total += 1;
    entry.correct += question.isCorrect ? 1 : 0;
    acc[question.section] = entry;
    return acc;
  }, {});

  return {
    correct,
    total,
    percent,
    passed: percent >= test.passScore,
    questionResults,
    sectionSummary
  };
}

function createInitialState() {
  return {
    activePage: "home",
    selectedLevel: getInitialLevel(),
    selectedGrammarId: grammarItems[0]?.id ?? null,
    selectedTestLevel: "N5",
    testAnswers: {},
    testSubmitted: false,
    testResult: null,
    testHistory: []
  };
}

function loadState() {
  if (typeof window === "undefined") return createInitialState();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return createInitialState();

  try {
    const parsed = JSON.parse(raw);
    return {
      ...createInitialState(),
      ...parsed,
      testAnswers: parsed.testAnswers ?? {},
      testHistory: parsed.testHistory ?? []
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return createInitialState();
  }
}

export function useVocabState() {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const roadmap = roadmapSteps;
  const featuredMetrics = heroMetrics;
  const blueprints = pageBlueprint;

  const grammarByLevel = useMemo(
    () =>
      levelOrder.reduce((acc, level) => {
        acc[level] = getGrammarForLevel(level);
        return acc;
      }, {}),
    []
  );

  const currentGrammarList = grammarByLevel[state.selectedLevel] ?? grammarByLevel.N5 ?? [];
  const selectedGrammar =
    grammarItems.find((item) => item.id === state.selectedGrammarId) ??
    currentGrammarList[0] ??
    grammarItems[0];

  const currentTest = getTest(state.selectedTestLevel);
  const currentResult = state.testSubmitted ? state.testResult : null;

  const stats = useMemo(() => {
    const totalGrammar = grammarItems.length;
    const lockedLevels = new Set(grammarItems.map((item) => item.level));
    const averageScore = state.testHistory.length
      ? Math.round(
          state.testHistory.reduce((sum, entry) => sum + entry.percent, 0) / state.testHistory.length
        )
      : 0;
    const bestScore = state.testHistory.length
      ? Math.max(...state.testHistory.map((entry) => entry.percent))
      : 0;

    return {
      totalGrammar,
      totalLevels: lockedLevels.size,
      totalTests: state.testHistory.length,
      averageScore,
      bestScore,
      latestScore: state.testHistory[0]?.percent ?? 0,
      selectedLevel: state.selectedLevel,
      selectedGrammar,
      currentGrammarList
    };
  }, [currentGrammarList, selectedGrammar, state.selectedLevel, state.testHistory]);

  function setActivePage(activePage) {
    setState((current) => ({ ...current, activePage }));
  }

  function getNavigationPage(activePage = state.activePage) {
    if (activePage === "grammar-detail") return "grammar";
    if (activePage === "jlpt-result") return "jlpt";
    return activePage;
  }

  function setSelectedLevel(selectedLevel) {
    setState((current) => {
      const nextList = getGrammarForLevel(selectedLevel);
      return {
        ...current,
        selectedLevel,
        selectedGrammarId: nextList[0]?.id ?? current.selectedGrammarId
      };
    });
  }

  function selectGrammar(selectedGrammarId) {
    setState((current) => ({ ...current, selectedGrammarId }));
  }

  function openGrammarDetail(selectedGrammarId) {
    setState((current) => ({
      ...current,
      selectedGrammarId,
      activePage: "grammar-detail"
    }));
  }

  function setTestLevel(selectedTestLevel) {
    setState((current) => ({
      ...current,
      selectedTestLevel,
      testAnswers: {},
      testSubmitted: false,
      testResult: null
    }));
  }

  function setTestAnswer(questionId, value) {
    setState((current) => ({
      ...current,
      testAnswers: {
        ...current.testAnswers,
        [questionId]: value
      }
    }));
  }

  function resetTest() {
    setState((current) => ({
      ...current,
      testAnswers: {},
      testSubmitted: false,
      testResult: null
    }));
  }

  function submitTest() {
    let nextResult = null;

    setState((current) => {
      if (current.testSubmitted) return current;

      const result = scoreTest(getTest(current.selectedTestLevel), current.testAnswers);
      nextResult = result;

      return {
        ...current,
        testSubmitted: true,
        testResult: result,
        activePage: "jlpt-result",
        testHistory: [
          {
            id: `${current.selectedTestLevel}-${Date.now()}`,
            level: current.selectedTestLevel,
            percent: result.percent,
            correct: result.correct,
            total: result.total,
            passed: result.passed,
            at: formatDate(),
            time: formatTime()
          },
          ...current.testHistory
        ]
      };
    });

    return nextResult;
  }

  return {
    state,
    navigationPage: getNavigationPage(),
    stats,
    currentTest,
    currentResult,
    selectedGrammar,
    currentGrammarList,
    roadmap,
    featuredMetrics,
    blueprints,
    studyPillars,
    setActivePage,
    setSelectedLevel,
    selectGrammar,
    openGrammarDetail,
    setTestLevel,
    setTestAnswer,
    submitTest,
    resetTest
  };
}
