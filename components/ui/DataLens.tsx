"use client";

import React from 'react';
import { useDataLens } from '@/context/DataLensContext';
import { CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DataLens() {
  const { data } = useDataLens();

  const confidenceColor = data?.confidence === 'High' 
    ? 'text-emerald-400' 
    : data?.confidence === 'Medium' 
    ? 'text-amber-400' 
    : 'text-orange-400';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {data ? (
          // Active State: Show Data Details
          <div className="flex items-start gap-4">
            {/* Decorative Line */}
            <div className="w-px h-12 bg-gradient-to-b from-emerald-400/50 to-transparent mt-1" />
            
            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h4 className="text-sm font-semibold text-white font-mono">{data.title}</h4>
                {data.confidence && (
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border",
                    data.confidence === 'High' 
                      ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
                      : data.confidence === 'Medium'
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      : "bg-orange-500/10 border-orange-500/30 text-orange-400"
                  )}>
                    <CheckCircle2 size={10} />
                    <span>{data.confidence} Confidence</span>
                  </div>
                )}
              </div>
              
              {data.source && (
                <p className="text-xs text-zinc-400 font-mono">
                  Source: <span className="text-zinc-300">{data.source}</span>
                </p>
              )}
              
              {data.description && (
                <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
                  {data.description}
                </p>
              )}
              
              {data.link && (
                <a 
                  href={data.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-emerald-400 hover:text-emerald-400 font-mono uppercase tracking-wider inline-flex items-center gap-1"
                >
                  View Source
                  <span className="text-emerald-400">↗</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          // Default State: System Ready
          <div className="flex items-center gap-3">
            <div className="w-px h-8 bg-zinc-700/50" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-zinc-500 font-mono">
                System Ready. Hover over data points for intelligence.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

