// src/pages/HomePage.jsx
import React from 'react';

// Card for high-level stats.
const StatCard = ({ icon, label, value, colorClass }) => (
  <div className={`p-6 rounded-2xl flex items-center space-x-4 shadow-sm border border-black/5 hover:shadow-md transition-shadow duration-300 ${colorClass}`}>
    <div className="text-4xl">{icon}</div>
    <div>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

// Card for primary user actions.
const ActionCard = ({ icon, title, description, buttonText, onClick, colorClass }) => (
  <div className={`p-8 rounded-3xl flex flex-col items-start shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-black/5 ${colorClass}`}>
    <div className="text-5xl mb-6 bg-white/30 p-4 rounded-2xl shadow-inner">{icon}</div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="flex-grow mb-8 opacity-90 leading-relaxed text-balance">{description}</p>
    <button
      onClick={onClick}
      className="w-full mt-auto px-4 py-3 bg-white/50 backdrop-blur-sm font-bold rounded-2xl hover:bg-white/80 transition-all active:scale-95 shadow-sm"
    >
      {buttonText}
    </button>
  </div>
);

export default function HomePage({ stats, setActivePage }) {
  // Dummy data for demonstration to make the page feel more alive.
  const nextRoadmapStep = { level: "N5", title: "Beginner Basics", goal: "Master hiragana, katakana, and basic greetings." };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Welcome Header */}
      <div className="relative overflow-hidden p-10 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 text-white rounded-3xl text-center shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150" />
        <h1 className="text-4xl font-extrabold tracking-tight">Welcome, Learner!</h1>
        <p className="mt-2 text-lg opacity-90">Ready to take the next step in your Japanese journey? 頑張って！</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard 
          icon="📚" 
          label="Grammar Learned" 
          value={stats.totalGrammar} 
          colorClass="bg-rose-100 text-rose-800"
        />
        <StatCard 
          icon="📝" 
          label="Tests Taken" 
          value={stats.totalTests} 
          colorClass="bg-sky-100 text-sky-800"
        />
        <StatCard 
          icon="🏆" 
          label="Average Score" 
          value={`${stats.averageScore}%`} 
          colorClass="bg-emerald-100 text-emerald-800"
        />
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ActionCard
          icon="🗺️"
          title="Continue Your Path"
          description={`Your next step is: **${nextRoadmapStep.title} (${nextRoadmapStep.level})**. ${nextRoadmapStep.goal}`}
          buttonText="View Full Roadmap"
          onClick={() => setActivePage('roadmap')}
          colorClass="bg-rose-300 text-rose-900"
        />
        <ActionCard
          icon="🧠"
          title="Practice Grammar"
          description="Review grammar points, study examples, and solidify your understanding of Japanese sentence structure."
          buttonText="Review Grammar"
          onClick={() => setActivePage('grammar')}
          colorClass="bg-sky-300 text-sky-900"
        />
        <ActionCard
          icon="⏱️"
          title="Take a Mock Test"
          description="Challenge yourself with a JLPT mock test to gauge your skills and identify areas for improvement."
          buttonText="Start JLPT Test"
          onClick={() => setActivePage('jlpt')}
          colorClass="bg-amber-300 text-amber-900"
        />
      </div>
    </div>
  );
}
