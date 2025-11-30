"use client";

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const suggestedPrompts = [
  "Which AI companies raised >$10M in 2024?",
  "Show Riyadh deep-tech investments with sovereign backing",
  "Compare PIF vs. Sanabil AI portfolio strategies",
  "Identify emerging AI unicorns in KSA ecosystem",
  "Red-team NEOM AI pipeline risks & opportunities",
];

export default function AICopilot() {
  const [query, setQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Query submitted:', query);
      // TODO: Implement AI copilot functionality
      setQuery('');
    }
  };

  const handlePromptClick = (prompt: string) => {
    setQuery(prompt);
    setSelectedPrompt(prompt);
  };

  return (
    <div className="glass-panel rounded-xl p-6 border border-[#44403c] bg-[#292524]/80 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-semibold text-emerald-400 font-serif">AI COPILOT</h2>
          <span className="px-2 py-0.5 rounded text-xs font-mono uppercase tracking-wide border border-[#44403c] text-[#78716c] bg-[#1c1917]">
            BETA
          </span>
        </div>
        <p className="text-sm text-[#78716c] font-sans">
          Ask anything about the investment landscape. Use suggested prompts or type your own.
        </p>
      </div>

      {/* Suggested Prompts */}
      <div className="flex-1 space-y-2 mb-4 overflow-y-auto">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(prompt)}
            className={`w-full px-4 py-3 rounded-lg border text-left text-sm font-sans transition-all ${
              selectedPrompt === prompt
                ? 'border-emerald-400 bg-emerald-400/10 text-[#a8a29e]'
                : 'border-[#44403c] bg-[#1c1917] text-[#a8a29e] hover:border-emerald-400/50 hover:bg-[#292524]'
            }`}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Section */}
      <form onSubmit={handleSubmit} className="mt-auto">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedPrompt(null);
            }}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-3 rounded-lg border border-[#44403c] bg-[#1c1917] text-[#a8a29e] placeholder-[#78716c] font-sans focus:outline-none focus:border-emerald-400/50 transition-colors"
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className="w-12 h-12 rounded-full bg-emerald-400 flex items-center justify-center text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-[#44403c]">
        <p className="text-xs text-[#78716c] font-mono">
          Powered by GPT-4 + Real-time KSA data feeds
        </p>
      </div>
    </div>
  );
}

