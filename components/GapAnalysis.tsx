'use client'

import { useState, useEffect } from 'react'
// import { supabase } from '@/lib/supabase'
import { MarketGap } from '@/types/database'
import { mockMarketGaps } from '@/data/mockData'

const heatScale = (ratio: number) => {
  if (ratio >= 0.66) return '#ef4444' // Opportunity
  if (ratio >= 0.33) return '#f97316' // Emerging
  return '#22c55e' // Saturated
}

export default function GapAnalysis() {
  const [gaps, setGaps] = useState<MarketGap[]>([])
  const [loading, setLoading] = useState(true)
  const [maxGap, setMaxGap] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setGaps(mockMarketGaps)
      if (mockMarketGaps.length > 0) {
        const max = Math.max(...mockMarketGaps.map((gap) => gap.numeric_gap_estimate || 0))
        setMaxGap(max)
      }
      setLoading(false)
    }, 200)
  }, [])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
        <div className="text-emerald-400 font-mono text-xs">Loading gap heatmap...</div>
      </div>
    )
  }

  const gridColumns = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(gaps.length || 1))))

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Opportunity Grid</p>
          <h2 className="text-lg font-semibold text-white">Gap Analysis</h2>
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-wide text-zinc-500">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-[#ef4444]" /> High Gap
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-[#f97316]" /> Emerging
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm bg-[#22c55e]" /> Saturated
          </div>
        </div>
      </div>

      {gaps.length === 0 ? (
        <div className="text-zinc-500 font-mono text-xs">No market gaps found</div>
      ) : (
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
          }}
        >
          {gaps.map((gap, index) => {
            const ratio = maxGap > 0 ? (gap.numeric_gap_estimate || 0) / maxGap : 0
            const color = heatScale(ratio)

            return (
              <div key={gap.id || index} className="group relative aspect-square">
                <div
                  className="h-full w-full rounded-xl border border-zinc-800 flex flex-col items-center justify-center gap-2 text-center"
                  style={{
                    background:
                      ratio >= 0.66
                        ? 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(244,114,182,0.1))'
                        : ratio >= 0.33
                        ? 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(251,191,36,0.1))'
                        : 'linear-gradient(135deg, rgba(34,197,94,0.18), rgba(16,185,129,0.1))',
                  }}
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">Gap #{index + 1}</p>
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-lg text-white tabular-nums">{formatNumber(gap.numeric_gap_estimate)}</span>
                    <span className="text-[10px] text-zinc-500">SAR</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color }}>
                    {ratio >= 0.66 ? 'High Opportunity' : ratio >= 0.33 ? 'Emerging' : 'Saturated'}
                  </span>
                </div>
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-48 -translate-x-1/2 -translate-y-[calc(50%+70px)] rounded-lg border border-zinc-800 bg-zinc-900/95 p-3 text-left opacity-0 group-hover:opacity-100 transition-none shadow-2xl">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 mb-1">Signal Detail</p>
                  <p className="text-xs text-zinc-300 font-mono">
                    Relative intensity: {(ratio * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">Hover for instant brief. No wait state.</p>
                  <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-zinc-800 bg-zinc-900/95" />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

