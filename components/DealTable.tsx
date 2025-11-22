'use client'

import { useState, useEffect } from 'react'
import { Info } from 'lucide-react'
// import { supabase } from '@/lib/supabase'
import { FundingFlow } from '@/types/database'
import { mockFundingFlows } from '@/data/mockData'

export default function DealTable() {
  const [deals, setDeals] = useState<FundingFlow[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  useEffect(() => {
    // Using mock data instead of Supabase for preview
    // TODO: Replace with real Supabase call when API keys are available
    // async function fetchDeals() {
    //   try {
    //     const { data, error } = await supabase
    //       .from('funding_flows')
    //       .select('*')
    //       .order('year', { ascending: false })
    //
    //     if (error) throw error
    //     setDeals(data || [])
    //   } catch (error) {
    //     console.error('Error fetching deals:', error)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    //
    // fetchDeals()

    // Simulate loading delay for better UX
    setTimeout(() => {
      // Sort by year descending
      const sortedDeals = [...mockFundingFlows].sort((a, b) => b.year - a.year)
      setDeals(sortedDeals)
      setLoading(false)
    }, 300)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <div className="text-neon-green font-mono">Loading deals...</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      <div className="px-4 py-2 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white font-mono">Deal Table</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-mono border-r border-slate-800">
                Investor
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-mono border-r border-slate-800">
                Industry
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-mono border-r border-slate-800">
                Value
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-mono border-r border-slate-800">
                Year
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-mono w-10">
                Info
              </th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr
                key={deal.id || index}
                className="hover:bg-gray-800/30 transition-colors relative border-b border-slate-800"
                onMouseEnter={() => setHoveredRow(deal.id || String(index))}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300 font-mono border-r border-slate-800">
                  {deal.source_institution}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300 font-mono border-r border-slate-800">
                  {deal.destination_sector}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-neon-green font-mono tabular-nums border-r border-slate-800">
                  {formatCurrency(deal.amount_local_currency)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300 font-mono tabular-nums border-r border-slate-800">
                  {deal.year}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="relative inline-block">
                    <Info
                      className="w-3.5 h-3.5 text-gray-500 hover:text-neon-green transition-colors cursor-help"
                      size={14}
                    />
                    {hoveredRow === (deal.id || String(index)) && deal.evidence_snippet && (
                      <div className="absolute right-0 top-5 z-50 w-80 max-w-[calc(100vw-2rem)] p-3 bg-gray-800 border border-neon-green/30 rounded-lg shadow-xl">
                        <div className="text-xs text-gray-300 font-mono leading-relaxed break-words">
                          {deal.evidence_snippet}
                        </div>
                        <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 border-l border-t border-neon-green/30 transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {deals.length === 0 && (
          <div className="px-4 py-6 text-center text-gray-500 font-mono text-xs">
            No deals found
          </div>
        )}
      </div>
    </div>
  )
}

