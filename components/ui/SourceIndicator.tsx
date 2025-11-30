"use client";

import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SourceIndicatorProps {
  source: string;
  date?: string;
  confidence?: 'High' | 'Medium' | 'Low';
  link?: string;
  badgeText?: string;
}

export default function SourceIndicator({ source, date = "Nov 2024", confidence = 'High', link, badgeText }: SourceIndicatorProps) {
  const confidenceColor = confidence === 'High' 
    ? 'bg-emerald-400/10 text-emerald-400' 
    : confidence === 'Medium' 
    ? 'bg-amber-500/10 text-amber-400' 
    : 'bg-orange-500/10 text-orange-400';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="inline-flex items-center ml-2 cursor-help">
          {badgeText ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wide bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors">
              {badgeText}
            </span>
          ) : (
            <Info className="w-3 h-3 text-zinc-600 hover:text-zinc-400 transition-colors" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-2">
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Source Of Truth</p>
          <p className="text-xs text-zinc-200 font-semibold">{source}</p>
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] text-blue-400 hover:underline block"
            >
              View Official Release
            </a>
          )}
          <div className="flex items-center justify-between border-t border-zinc-800 pt-2">
            <span className="text-[10px] text-zinc-500">{date}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${confidenceColor}`}>
              {confidence}
            </span>
          </div>
          <div className="mt-2">
            <p className="text-[9px] text-zinc-600 mb-1">Confidence Meter</p>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  confidence === 'High' ? 'bg-emerald-400 w-[95%]' : 
                  confidence === 'Medium' ? 'bg-amber-500 w-[70%]' : 
                  'bg-orange-500 w-[40%]'
                }`} 
              />
            </div>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
