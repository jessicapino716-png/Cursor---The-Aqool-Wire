'use client'

import { useState, useEffect } from 'react'
// import { supabase } from '@/lib/supabase'
import { MarketGap } from '@/types/database'
import { mockMarketGaps } from '@/data/mockData'

export default function GapAnalysis() {
  const [gaps, setGaps] = useState<MarketGap[]>([])
  const [loading, setLoading] = useState(true)
  const [maxGap, setMaxGap] = useState(0)

  useEffect(() => {
    // Using mock data instead of Supabase for preview
    // TODO: Replace with real Supabase call when API keys are available
    // async function fetchGaps() {
    //   try {
    //     const { data, error } = await supabase
    //       .from('market_gaps')
    //       .select('*')
    //
    //     if (error) throw error
    //     setGaps(data || [])
    //     
    //     // Calculate max gap for progress bar scaling
    //     if (data && data.length > 0) {
    //       const max = Math.max(...data.map(gap => gap.numeric_gap_estimate || 0))
    //       setMaxGap(max)
    //     }
    //   } catch (error) {
    //     console.error('Error fetching market gaps:', error)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    //
    // fetchGaps()

    // Simulate loading delay for better UX
    setTimeout(() => {
      setGaps(mockMarketGaps)
      
      // Calculate max gap for progress bar scaling
      if (mockMarketGaps.length > 0) {
        const max = Math.max(...mockMarketGaps.map(gap => gap.numeric_gap_estimate || 0))
        setMaxGap(max)
      }
      
      setLoading(false)
    }, 300)
  }, [])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
        <div className="text-neon-green font-mono text-xs">Loading gap analysis...</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
      <h2 className="text-lg font-semibold text-white font-mono mb-4">Gap Analysis</h2>
      <div className="space-y-3">
        {gaps.length === 0 ? (
          <div className="text-gray-500 font-mono text-xs">No market gaps found</div>
        ) : (
          gaps.map((gap, index) => {
            const percentage = maxGap > 0 ? (gap.numeric_gap_estimate / maxGap) * 100 : 0
            return (
              <div key={gap.id || index} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-mono tabular-nums">
                    Gap #{index + 1}
                  </span>
                  <span className="text-xs text-neon-green font-mono tabular-nums font-semibold">
                    {formatNumber(gap.numeric_gap_estimate)}
                  </span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-neon-green transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

