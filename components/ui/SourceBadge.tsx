'use client'

import { useState } from 'react'
import { Info, ExternalLink } from 'lucide-react'

interface SourceBadgeProps {
  source: string
  confidence: number // 0-100
  date: string
  link?: string
  badgeText?: string
}

export default function SourceBadge({
  source,
  confidence,
  date,
  link,
  badgeText = 'SPA Verified',
}: SourceBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getConfidenceColor = (conf: number) => {
    if (conf >= 90) return 'bg-emerald-400'
    if (conf >= 50) return 'bg-amber-500'
    return 'bg-orange-500'
  }

  const getConfidenceLabel = (conf: number) => {
    if (conf >= 90) return 'Verified'
    if (conf >= 50) return 'High Confidence'
    return 'Unverified Report'
  }

  const getConfidenceTextColor = (conf: number) => {
    if (conf >= 90) return 'text-emerald-400'
    if (conf >= 50) return 'text-amber-400'
    return 'text-orange-400'
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge/Icon */}
      <div className="flex items-center gap-1 cursor-help">
        <Info className="h-3.5 w-3.5 text-zinc-500 hover:text-emerald-400 transition-colors" strokeWidth={1.5} />
        {badgeText && (
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">{badgeText}</span>
        )}
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-lg border border-zinc-700 bg-zinc-950 p-4 shadow-2xl">
          <div className="space-y-3">
            {/* Source */}
            <div>
              <p className="text-xs font-mono uppercase tracking-wide text-zinc-500 mb-1">Source</p>
              <p className="text-sm text-white font-mono">{source}</p>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline mt-1"
                >
                  View Official Release
                  <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                </a>
              )}
            </div>

            {/* Confidence Meter */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-mono uppercase tracking-wide text-zinc-500">Confidence</p>
                <p className={`text-xs font-mono font-semibold ${getConfidenceTextColor(confidence)}`}>
                  {getConfidenceLabel(confidence)}
                </p>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getConfidenceColor(confidence)} transition-all duration-300`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-zinc-500 mt-1">{confidence}%</p>
            </div>

            {/* Last Updated */}
            <div>
              <p className="text-xs font-mono uppercase tracking-wide text-zinc-500 mb-1">Last Updated</p>
              <p className="text-xs text-zinc-400 font-mono">{date}</p>
            </div>
          </div>

          {/* Tooltip Arrow */}
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-zinc-700 bg-zinc-950" />
        </div>
      )}
    </div>
  )
}

