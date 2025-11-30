"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRegulations } from '@/data/mockData';
import { Regulation } from '@/types/database';
import SourceIndicator from '@/components/ui/SourceIndicator';

const getImpactColor = (level: Regulation['impactLevel']) => {
  switch (level) {
    case 'High':
      return 'bg-red-500';
    case 'Medium':
      return 'bg-yellow-500';
    case 'Low':
      return 'bg-emerald-400';
    default:
      return 'bg-zinc-500';
  }
};

const getTypeColor = (type: Regulation['type']) => {
  switch (type) {
    case 'Law':
      return 'text-amber-400';
    case 'Policy':
      return 'text-blue-400';
    case 'Guideline':
      return 'text-emerald-400';
    default:
      return 'text-zinc-400';
  }
};

// Simulated AI analysis text
const generateAIAnalysis = (regulation: Regulation): string => {
  const keyTakeaways = [
    `Key Takeaway: ${regulation.title} introduces mandatory compliance requirements for organizations operating in the ${regulation.authority} jurisdiction.`,
    `Impact Assessment: This ${regulation.type.toLowerCase()} requires immediate attention due to its ${regulation.impactLevel.toLowerCase()} impact level on AI operations.`,
    `Action Required: Organizations must review their current AI governance frameworks and align with the new ${regulation.type.toLowerCase()} requirements within the specified compliance window.`,
    `Strategic Implication: The regulation emphasizes ${regulation.authority}'s focus on ${regulation.impactLevel === 'High' ? 'critical' : 'emerging'} AI governance standards, signaling broader regulatory trends in the Kingdom.`,
  ];
  return keyTakeaways.join(' ');
};

// Typing effect component
function TypingText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Typing speed: 30ms per character

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <p className="text-sm text-[#a8a29e] leading-relaxed font-sans">
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-0.5 h-4 bg-emerald-400 ml-1 animate-pulse" />
      )}
    </p>
  );
}

export default function RegulationFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});

  const handleSummarize = (regulation: Regulation) => {
    if (expandedId === regulation.id) {
      setExpandedId(null);
    } else {
      setExpandedId(regulation.id);
      if (!aiAnalysis[regulation.id]) {
        // Generate AI analysis on first expand
        setAiAnalysis(prev => ({
          ...prev,
          [regulation.id]: generateAIAnalysis(regulation),
        }));
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1c1917]/60">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#44403c]">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-[#a8a29e] font-serif">Regulatory Radar</h2>
          <SourceIndicator 
            source="SDAIA, NCA, CMA" 
            date="Nov 2024" 
            confidence="High"
            badgeText="OFFICIAL"
          />
        </div>
        <span className="text-[10px] font-mono text-[#78716c] uppercase tracking-wider">
          {mockRegulations.length} Active
        </span>
      </div>

      {/* Regulation Cards List */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        {mockRegulations.map((regulation) => {
          const isExpanded = expandedId === regulation.id;
          const analysis = aiAnalysis[regulation.id] || '';

          return (
            <motion.div
              key={regulation.id}
              className="glass-panel rounded-xl overflow-hidden bg-[#292524]/80 border border-[#44403c]"
              initial={false}
              animate={{ height: 'auto' }}
            >
              <div className="p-4">
                {/* Card Content */}
                <div className="flex items-start gap-4">
                  {/* Left: Authority Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[#1c1917] border border-[#44403c] flex items-center justify-center">
                      <span className="text-xs font-bold text-[#a8a29e] font-mono uppercase tracking-tight">
                        {regulation.authority}
                      </span>
                    </div>
                  </div>

                  {/* Center: Title + Type/Date */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-serif text-[#a8a29e] font-semibold mb-1.5 leading-tight">
                      {regulation.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-mono text-[#78716c]">
                      <span className={getTypeColor(regulation.type)}>
                        {regulation.type}
                      </span>
                      <span className="text-[#44403c]">•</span>
                      <span>{regulation.date}</span>
                    </div>
                  </div>

                  {/* Right: Pulse Dot */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <div className="relative">
                      <div
                        className={`w-3 h-3 rounded-full ${getImpactColor(regulation.impactLevel)} ${
                          regulation.impactLevel === 'High' ? 'animate-pulse' : ''
                        }`}
                      />
                      {regulation.impactLevel === 'High' && (
                        <div
                          className={`absolute inset-0 w-3 h-3 rounded-full ${getImpactColor(regulation.impactLevel)} animate-ping opacity-75`}
                        />
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-[#78716c] uppercase">
                      {regulation.impactLevel}
                    </span>
                  </div>
                </div>

                {/* Action Area: AI Summarize Button */}
                <div className="mt-4 pt-4 border-t border-[#44403c]">
                  <button
                    onClick={() => handleSummarize(regulation)}
                    className="flex items-center gap-2 text-sm font-mono text-[#78716c] hover:text-emerald-400 transition-colors duration-200 group"
                  >
                    <Sparkles className="w-4 h-4 group-hover:text-emerald-400 transition-colors" strokeWidth={1.5} />
                    <span>AI Summarize</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* AI Analysis Accordion */}
                <AnimatePresence>
                  {isExpanded && analysis && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-[#44403c]">
                        <div className="bg-[#0c0a09] rounded-lg p-4 border border-[#292524]">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                              AI Analysis
                            </span>
                          </div>
                          <TypingText text={analysis} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

