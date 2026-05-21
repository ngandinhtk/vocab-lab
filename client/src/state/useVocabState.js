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

  const passThreshold = test.passScore || test.pass_score || 60;
  return { correct, total, percent, passed: percent >= passThreshold, questionResults, sectionSummary };
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
    jlptTests: [],
    selectedLessonId: null,
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

  // Fetch JLPT tests when level changes
  useEffect(() => {
    if (state.token) {
      fetchJlptTests(state.selectedTestLevel);
    }
  }, [state.token, state.selectedTestLevel]);

  async function fetchAllData() {
    try {
      const headers = { 'Authorization': `Bearer ${state.token}` };
      const [vRes, kRes, gRes, lRes, hRes] = await Promise.all([
        fetch('/api/vocabulary', { headers }),
        fetch('/api/kanji', { headers }),
        fetch('/api/grammar', { headers }),
        fetch('/api/lessons', { headers }),
        fetch('/api/jlpt/history', { headers })
      ]);

      // Check if all responses are ok before parsing
      if (!vRes.ok) throw new Error(`Vocabulary API failed: ${vRes.status} ${vRes.statusText}`);
      if (!kRes.ok) throw new Error(`Kanji API failed: ${kRes.status} ${kRes.statusText}`);
      if (!gRes.ok) throw new Error(`Grammar API failed: ${gRes.status} ${gRes.statusText}`);
      if (!lRes.ok) throw new Error(`Lessons API failed: ${lRes.status} ${lRes.statusText}`);
      if (!hRes.ok) throw new Error(`JLPT history API failed: ${hRes.status} ${hRes.statusText}`);

      const [vocabulary, kanji, grammar, lessons, testHistory] = await Promise.all([
        vRes.json(), kRes.json(), gRes.json(), lRes.json(), hRes.json()
      ]);

      // Map backend history to frontend format if needed
      const mappedHistory = testHistory.map(h => ({
        id: h.id,
        level: `N${h.test.level}`,
        percent: h.percent,
        correct: h.score,
        total: h.total,
        passed: h.passed,
        at: new Date(h.created_at).toLocaleDateString("en-CA"),
        time: new Date(h.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }));

      setState(curr => ({ ...curr, vocabulary, kanji, grammar, lessons, testHistory: mappedHistory }));
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  }

  async function fetchJlptTests(level) {
    try {
      const headers = { 'Authorization': `Bearer ${state.token}` };
      const res = await fetch(`/api/jlpt/tests/${level}`, { headers });
      
      if (!res.ok) {
        throw new Error(`JLPT tests API failed: ${res.status} ${res.statusText}`);
      }
      
      const jlptTests = await res.json();
      setState(curr => ({ ...curr, jlptTests }));
    } catch (err) {
      console.error("Failed to fetch JLPT tests:", err);
    }
  }

  // Persist app state (excluding auth and heavy data)
  useEffect(() => {
    const { token, user, vocabulary, kanji, grammar, lessons, jlptTests, ...appState } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [state]);

  // --- Auth Helpers ---
  async function parseJsonSafe(response) {
    const contentType = response.headers.get('content-type') || '';
    const bodyText = await response.text();

    if (!bodyText) {
      return null;
    }

    if (!contentType.includes('application/json')) {
      throw new Error(bodyText);
    }

    try {
      return JSON.parse(bodyText);
    } catch (err) {
      throw new Error(`Invalid JSON response from server: ${err.message}`);
    }
  }

  // --- Auth Functions ---
  async function register({ username, email, password }) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      let errorMessage = `Registration failed: ${response.status} ${response.statusText}`;
      try {
        const data = await parseJsonSafe(response);
        if (data && data.error) errorMessage = data.error;
      } catch (err) {
        if (err.message) errorMessage = err.message;
      }
      throw new Error(errorMessage);
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
      let errorMessage = `Login failed: ${response.status} ${response.statusText}`;
      try {
        const data = await parseJsonSafe(response);
        if (data && data.error) errorMessage = data.error;
      } catch (err) {
        if (err.message) errorMessage = err.message;
      }
      throw new Error(errorMessage);
    }

    const data = await parseJsonSafe(response);
    if (!data || !data.token) {
      throw new Error('Login response did not include a valid token.');
    }

    const { token } = data;
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
  
  const rawTest = state.jlptTests[0];
  const currentTest = rawTest ? { 
    ...rawTest, 
    passScore: rawTest.passScore || rawTest.pass_score 
  } : { title: "Loading...", passScore: 70, questions: [], description: "..." };

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

  async function submitTest() {
    if (state.testSubmitted) return;
    
    const test = state.jlptTests[0];
    if (!test) return;

    const result = scoreTest(test, state.testAnswers);
    
    // Save to backend
    try {
      await fetch('/api/jlpt/results', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({
          testId: test.id,
          score: result.correct,
          total: result.total,
          percent: result.percent,
          passed: result.passed,
          sectionSummary: result.sectionSummary
        })
      });
    } catch (err) {
      console.error("Failed to save test result:", err);
    }

    setState((current) => ({
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
    }));
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
    setSelectedLessonId,
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
