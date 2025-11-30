'use client'

import { mockDataCenters, mockFundingFlows } from '@/data/mockData'
import { Zap, Server, Building2 } from 'lucide-react'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
})

const metrics = [
  {
    id: 'capital',
    label: 'Total Capital Tracked',
    icon: Zap,
    value: formatter.format(mockFundingFlows.reduce((sum, deal) => sum + deal.amount_local_currency, 0)),
    delta: '+12.3%',
    subtitle: 'vs. trailing quarter',
    accent: 'from-emerald-400 to-emerald-400',
  },
  {
    id: 'centers',
    label: 'Active Data Centers',
    icon: Server,
    value: mockDataCenters.filter((center) => center.activity_level !== 'low').length.toString().padStart(2, '0'),
    delta: '+3 new sites',
    subtitle: '24h deployment window',
    accent: 'from-[#3B82F6] to-[#60A5FA]',
  },
  {
    id: 'avg-ticket',
    label: 'Avg. Ticket Size',
    icon: Building2,
    value: formatter.format(
      mockFundingFlows.reduce((sum, deal) => sum + deal.amount_local_currency, 0) / mockFundingFlows.length,
    ),
    delta: compactFormatter.format(mockFundingFlows.length) + ' deals',
    subtitle: 'Investor initiated',
    accent: 'from-[#F472B6] to-[#C084FC]',
  },
]

export default function KeyMetrics() {
  return (
    <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Signal Matrix</p>
          <h3 className="text-xl font-semibold text-white">Key Metrics</h3>
        </div>
        <span className="text-xs font-mono text-zinc-500">Live feed · {new Date().toUTCString().slice(17, 22)} UTC</span>
      </div>
      <div className="grid gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-lg bg-gradient-to-br ${metric.accent} flex items-center justify-center text-zinc-950`}
              >
                <metric.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">{metric.label}</p>
                <p className="text-lg font-mono text-white">{metric.value}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-emerald-400">{metric.delta}</p>
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">{metric.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

