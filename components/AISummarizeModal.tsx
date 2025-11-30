"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2, ExternalLink } from 'lucide-react';

interface AISummarizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  documentUrl: string;
  onSummarize: () => Promise<string>;
}

export function AISummarizeModal({
  isOpen,
  onClose,
  documentTitle,
  documentUrl,
  onSummarize,
}: AISummarizeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !summary && !isLoading) {
      handleSummarize();
    }
  }, [isOpen]);

  const handleSummarize = async () => {
    setIsLoading(true);
    setError(null);
    setSummary('');

    try {
      const result = await onSummarize();
      setSummary(result);
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
      console.error('Summarization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSummary('');
    setError(null);
    setIsLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-panel rounded-2xl border border-[#44403c] bg-[#1c1917] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#44403c]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#292524] border border-[#44403c] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#a8a29e] font-serif">AI Document Summary</h2>
                    <p className="text-sm text-[#78716c] font-mono mt-1">{documentTitle}</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-[#292524] transition-colors text-[#78716c] hover:text-[#a8a29e]"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mb-4" />
                    <p className="text-sm text-[#78716c] font-mono">Analyzing document...</p>
                    <p className="text-xs text-[#78716c] font-mono mt-2">This may take a few moments</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-sm text-red-400 font-mono">{error}</p>
                    <button
                      onClick={handleSummarize}
                      className="mt-3 px-4 py-2 bg-[#292524] border border-[#44403c] rounded-lg text-sm text-[#a8a29e] hover:text-emerald-400 transition-colors font-mono"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {summary && !isLoading && (
                  <div className="space-y-4">
                    <div className="bg-[#0c0a09] rounded-lg p-4 border border-[#292524]">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                          AI Analysis
                        </span>
                      </div>
                      <p className="text-sm text-[#a8a29e] leading-relaxed font-sans whitespace-pre-wrap">
                        {summary}
                      </p>
                    </div>
                  </div>
                )}

                {!isLoading && !summary && !error && (
                  <div className="text-center py-12">
                    <p className="text-sm text-[#78716c] font-mono">Click "Generate Summary" to begin</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#44403c] flex items-center justify-between">
                <a
                  href={documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#78716c] hover:text-emerald-400 transition-colors font-mono"
                >
                  <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  View Original Document
                </a>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 border border-[#44403c] rounded-lg text-sm text-[#78716c] hover:text-[#a8a29e] hover:border-[#78716c] transition-colors font-mono"
                  >
                    Close
                  </button>
                  {!isLoading && !summary && (
                    <button
                      onClick={handleSummarize}
                      className="px-4 py-2 bg-[#292524] border border-emerald-400/30 rounded-lg text-sm text-emerald-400 hover:bg-emerald-400/10 transition-colors font-mono flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                      Generate Summary
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

