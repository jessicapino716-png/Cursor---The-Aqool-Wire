"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import SourceIndicator from '@/components/ui/SourceIndicator';

interface SummaryCardProps {
  label: string;
  value: string;
  unit?: string;
  lastUpdated: string;
  sourceUrl?: string;
  sourceLabel?: string;
  icon?: React.ReactNode;
  href?: string;
}

export function SummaryCard({
  label,
  value,
  unit,
  lastUpdated,
  sourceUrl,
  sourceLabel,
  icon,
  href,
}: SummaryCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`glass-panel rounded-xl p-4 border border-[#44403c] bg-[#292524]/80 ${href ? 'cursor-pointer hover:border-emerald-400/50 transition-all' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && <div className="text-[#78716c]">{icon}</div>}
            <p className="text-xs uppercase tracking-[0.25em] text-[#78716c] font-mono">
              {label}
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-mono text-[#a8a29e] font-semibold">
              {value}
            </p>
            {unit && (
              <span className="text-sm font-mono text-[#78716c]">{unit}</span>
            )}
          </div>
        </div>
        {sourceLabel && (
          <SourceIndicator
            source={sourceLabel}
            date={lastUpdated}
            confidence="High"
            link={sourceUrl}
          />
        )}
      </div>
      <p className="text-[10px] text-[#78716c] font-mono mt-2">
        Updated {lastUpdated}
      </p>
    </div>
  );
}

