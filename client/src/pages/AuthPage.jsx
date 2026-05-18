// src/pages/AuthPage.jsx
import React, { useState } from 'react';

// AuthPage component for user login and registration.
// It takes `onLogin` and `onRegister` functions as props, which handle the authentication logic.
export default function AuthPage({ onLogin, onRegister }) {
  // State to toggle between login and registration modes.
  const [isLoginMode, setIsLoginMode] = useState(true);
  // State for username input (only visible in registration mode).
  const [username, setUsername] = useState('');
  // State for email input.
  const [email, setEmail] = useState('');
  // State for password input.
  const [password, setPassword] = useState('');
  // State for displaying error messages.
  const [error, setError] = useState(null);
  // State to track if the form is currently submitting.
  const [isLoading, setIsLoading] = useState(false);

  // Handles form submission for both login and registration.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before new submission

    // Basic client-side validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      if (isLoginMode) {
        // Call the onLogin prop function if in login mode.
        await onLogin({ email, password });
      } else {
        // Call the onRegister prop function if in registration mode.
        await onRegister({ username, email, password });
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Main container for the authentication page, centered vertically and horizontally.
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4">
      {/* Card-like container for the form */}
      <div className="w-full max-w-md p-10 space-y-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {isLoginMode ? 'Welcome Back!' : 'Create Your Account'}
          </h1>
          {/* Dynamic subtitle based on the current mode */}
          <p className="mt-2 text-gray-600">
            {isLoginMode ? "Let's continue your learning journey." : 'Join us to start learning Japanese!'}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username input, only shown in registration mode */}
          {!isLoginMode && (
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                disabled={isLoading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white/50"
                placeholder="Your username"
              />
            </div>
          )}
          {/* Email input */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white/50"
              placeholder="you@example.com"
            />
            {/* Password input */}
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white/50"
              placeholder="Your password"
            />
          </div>

          {/* Error message display */}
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-4 font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg active:scale-[0.98] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : (isLoginMode ? 'Log In' : 'Create Account')}
            </button>
          </div>
        </form>

        {/* Toggle between Login/Register */}
        <div className="text-center">
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-sm text-pink-600 hover:underline"
          >
            {isLoginMode ? 'Need an account? Sign up' : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
