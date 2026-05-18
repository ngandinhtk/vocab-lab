// src/state/useVocabState.js
import { useEffect, useMemo, useState } from "react";
import { grammarItems, heroMetrics, jlptTests, levelOrder, pageBlueprint, roadmapSteps, studyPillars } from "../data.js";
import { jwtDecode } from "jwt-decode";

const STORAGE_KEY = "nihongo-kawaii-state";
const TOKEN_KEY = "nihongo-kawaii-token";

// --- Helper Functions ---
function normalize(value = "") { return String(value).trim().toLowerCase().replace(/\s+/g, " "); }
function formatTime(date = new Date()) { return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
function formatDate(date = new Date()) { return date.toLocaleDateString("en-CA"); }

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

  return { correct, total, percent, passed: percent >= test.passScore, questionResults, sectionSummary };
}

function createInitialState() {
  return {
    activePage: "home",
    selectedLevel: "N5",
    selectedGrammarId: null,
    selectedTestLevel: "N5",
    testAnswers: {},
    testSubmitted: false,
    testResult: null,
    testHistory: [],
    // Data from API
    vocabulary: [],
    kanji: [],
    grammar: [],
    lessons: [],
    // Auth state
    token: null,
    user: null,
  };
}

// --- State Loading ---
function loadState() {
  const initialState = createInitialState();
  if (typeof window === "undefined") return initialState;

  const rawState = window.localStorage.getItem(STORAGE_KEY);
  let parsedState = {};
  if (rawState) {
    try {
      parsedState = JSON.parse(rawState);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }
  
  const token = window.localStorage.getItem(TOKEN_KEY);
  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  }

  return { ...initialState, ...parsedState, token, user };
}

// --- Main Hook ---
export function useVocabState() {
  const [state, setState] = useState(loadState);

  // Fetch initial data when authenticated
  useEffect(() => {
    if (state.token) {
      fetchAllData();
    }
  }, [state.token]);

  async function fetchAllData() {
    try {
      const headers = { 'Authorization': `Bearer ${state.token}` };
      const [vRes, kRes, gRes, lRes] = await Promise.all([
        fetch('/api/vocabulary', { headers }),
        fetch('/api/kanji', { headers }),
        fetch('/api/grammar', { headers }),
        fetch('/api/lessons', { headers })
      ]);

      const [vocabulary, kanji, grammar, lessons] = await Promise.all([
        vRes.json(), kRes.json(), gRes.json(), lRes.json()
      ]);

      setState(curr => ({ ...curr, vocabulary, kanji, grammar, lessons }));
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  }

  // Persist app state (excluding auth and heavy data)
  useEffect(() => {
    const { token, user, vocabulary, kanji, grammar, lessons, ...appState } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [state]);

  // --- Auth Functions ---
  async function register({ username, email, password }) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || 'Registration failed');
    }
    await login({ email, password });
  }

  async function login({ email, password }) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || 'Login failed');
    }

    const { token } = await response.json();
    const user = jwtDecode(token);
    
    window.localStorage.setItem(TOKEN_KEY, token);
    setState(current => ({ ...current, token, user }));
  }
  
  function logout() {
    window.localStorage.removeItem(TOKEN_KEY);
    setState(current => ({ ...current, token: null, user: null }));
  }

  // --- Memos and Derived State ---
  const currentGrammarList = useMemo(() => {
    const levelNum = parseInt(state.selectedLevel.replace('N', ''));
    return state.grammar.filter(g => g.level === levelNum);
  }, [state.grammar, state.selectedLevel]);

  const selectedGrammar = state.grammar.find((item) => item.id === state.selectedGrammarId) ?? currentGrammarList[0];
  const currentTest = jlptTests[state.selectedTestLevel] ?? jlptTests.N5;
  const currentResult = state.testSubmitted ? state.testResult : null;

  const stats = useMemo(() => ({
    totalGrammar: state.grammar.length,
    totalVocabulary: state.vocabulary.length,
    totalKanji: state.kanji.length,
    totalTests: state.testHistory.length,
    averageScore: state.testHistory.length ? Math.round(state.testHistory.reduce((sum, entry) => sum + entry.percent, 0) / state.testHistory.length) : 0,
  }), [state.grammar, state.vocabulary, state.kanji, state.testHistory]);

  // --- State Updaters ---
  function setActivePage(activePage) { setState((current) => ({ ...current, activePage })); }
  function setSelectedLevel(selectedLevel) { setState((current) => ({ ...current, selectedLevel })); }
  function selectGrammar(selectedGrammarId) { setState((current) => ({ ...current, selectedGrammarId })); }
  function openGrammarDetail(selectedGrammarId) { setState((current) => ({ ...current, selectedGrammarId, activePage: "grammar-detail" })); }
  function setSelectedLessonId(selectedLessonId) { setState((current) => ({ ...current, selectedLessonId })); }
  function setTestLevel(selectedTestLevel) { setState((current) => ({ ...current, selectedTestLevel, testAnswers: {}, testSubmitted: false, testResult: null })); }
  function setTestAnswer(questionId, value) { setState((current) => ({ ...current, testAnswers: { ...current.testAnswers, [questionId]: value } })); }
  function resetTest() { setState((current) => ({ ...current, testAnswers: {}, testSubmitted: false, testResult: null })); }

  function submitTest() {
    setState((current) => {
      if (current.testSubmitted) return current;
      const test = jlptTests[current.selectedTestLevel] ?? jlptTests.N5;
      const result = scoreTest(test, current.testAnswers);
      return {
        ...current,
        testSubmitted: true,
        testResult: result,
        activePage: "jlpt-result",
        testHistory: [{
          id: `${current.selectedTestLevel}-${Date.now()}`,
          level: current.selectedTestLevel,
          percent: result.percent,
          correct: result.correct,
          total: result.total,
          passed: result.passed,
          at: formatDate(),
          time: formatTime()
        }, ...current.testHistory],
      };
    });
  }
  
  return {
    // State
    state,
    user: state.user,
    isAuthenticated: !!state.token,
    
    // Data
    stats,
    currentTest,
    currentResult,
    selectedGrammar,
    currentGrammarList,
    vocabulary: state.vocabulary,
    kanji: state.kanji,
    grammar: state.grammar,
    lessons: state.lessons,
    roadmap: roadmapSteps,
    blueprints: pageBlueprint,
    studyPillars,
    
    // Actions
    setActivePage,
    setSelectedLevel,
    selectGrammar,
    openGrammarDetail,
    setTestLevel,
    setTestAnswer,
    submitTest,
    resetTest,
    login,
    register,
    logout,
    refreshData: fetchAllData
  };
}
