'use client'

import { useState, useMemo } from 'react'
import { FundingFlow } from '@/types/database'
import { mockFundingFlows } from '@/data/mockData'
import SourceBadge from '@/components/ui/SourceBadge'
import { Search, X } from 'lucide-react'

const originBadge = (origin: FundingFlow['investor_origin']) => {
  if (origin === 'KSA') {
    return 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30'
  }
  return 'bg-sky-500/10 text-sky-300 border border-sky-400/30'
}

const gigaBadge = (alignment: FundingFlow['giga_alignment']) => {
  const map: Record<FundingFlow['giga_alignment'], string> = {
    High: 'bg-rose-500/10 text-rose-300 border border-rose-400/30',
    Medium: 'bg-amber-500/10 text-amber-300 border border-amber-400/30',
    Low: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30',
  }
  return map[alignment]
}

export default function DealTable() {
  const [investorFilter, setInvestorFilter] = useState('')
  const [sectorFilter, setSectorFilter] = useState('')
  const loading = false

  // Get unique investors and sectors for filter dropdowns
  const uniqueInvestors = useMemo(() => {
    return Array.from(new Set(mockFundingFlows.map(d => d.source_institution))).sort()
  }, [])

  const uniqueSectors = useMemo(() => {
    return Array.from(new Set(mockFundingFlows.map(d => d.destination_sector))).sort()
  }, [])

  // Filter and sort deals
  const deals = useMemo(() => {
    let filtered = [...mockFundingFlows]
    
    if (investorFilter) {
      filtered = filtered.filter(d => 
        d.source_institution.toLowerCase().includes(investorFilter.toLowerCase())
      )
    }
    
    if (sectorFilter) {
      filtered = filtered.filter(d => 
        d.destination_sector.toLowerCase().includes(sectorFilter.toLowerCase())
      )
    }
    
    return filtered.sort((a, b) => b.year - a.year)
  }, [investorFilter, sectorFilter])

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
      <div className="rounded-2xl border border-border bg-card/70 p-6">
        <div className="text-primary font-mono">Loading deals...</div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card/70">
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Deal Feed</p>
            <h2 className="text-lg font-semibold text-foreground">Latest Allocations</h2>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">{deals.length} deals</span>
        </div>
        
        {/* Filter Controls */}
        <div className="flex gap-3">
          {/* Investor Filter */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={investorFilter}
              onChange={(e) => setInvestorFilter(e.target.value)}
              placeholder="Filter by investor..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {investorFilter && (
              <button
                onClick={() => setInvestorFilter('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          {/* Sector Filter */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              placeholder="Filter by sector..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {sectorFilter && (
              <button
                onClick={() => setSectorFilter('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full overflow-auto max-h-[600px]">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 bg-[#1c1917] z-10">
            <tr className="border-b border-border text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="px-3 py-2 text-left border-r border-border">Investor</th>
              <th className="px-3 py-2 text-left border-r border-border">Sector</th>
              <th className="px-3 py-2 text-left border-r border-border">Value</th>
              <th className="px-3 py-2 text-left border-r border-border">Year</th>
              <th className="px-3 py-2 text-left border-r border-border">Investor Origin</th>
              <th className="px-3 py-2 text-left">Giga Alignment</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr
                key={deal.id || index}
                className="border-b border-border/70 text-sm text-foreground/80 hover:bg-card/50 transition-colors"
              >
                <td className="px-3 py-2 text-xs text-foreground font-medium">{deal.source_institution}</td>
                <td className="px-3 py-2 text-xs text-foreground/70">{deal.destination_sector}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-400 tabular-nums">
                      {formatCurrency(deal.amount_local_currency)}
                    </span>
                    <SourceBadge
                      source="Saudi Press Agency (Official)"
                      confidence={95}
                      date={`Nov ${23 + (index % 5)}, 2024`}
                      link="https://spa.gov.sa"
                    />
                  </div>
                </td>
                <td className="px-3 py-2 text-xs font-mono text-muted-foreground tabular-nums">{deal.year}</td>
                <td className="px-3 py-2">
                  <span className={`text-[10px] uppercase tracking-wide rounded-full px-2 py-1 font-mono ${originBadge(deal.investor_origin)}`}>
                    {deal.investor_origin === 'KSA' ? 'Domestic' : deal.investor_origin}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className={`text-[10px] uppercase tracking-wide rounded-full px-2 py-1 font-mono ${gigaBadge(deal.giga_alignment)}`}>
                    {deal.giga_alignment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {deals.length === 0 && (
          <div className="px-4 py-6 text-center text-muted-foreground font-mono text-xs">No deals found</div>
        )}
      </div>
    </div>
  )
}


