'use client'

import { mockFundingFlows } from '@/data/mockData'
import { ArrowDownRight, TrendingUp, Banknote, Activity } from 'lucide-react'
import { useCurrency } from '@/context/CurrencyContext'
import SourceIndicator from '@/components/ui/SourceIndicator'

export default function KeyTickers() {
  const { formatValue, currency } = useCurrency()
  
  const totalCapital = mockFundingFlows.reduce((sum, deal) => sum + deal.amount_local_currency, 0)
  const activeDeals = mockFundingFlows.length
  const foreignInflowSar = mockFundingFlows
    .filter((deal) => deal.investor_origin !== 'KSA')
    .reduce((sum, deal) => sum + deal.amount_local_currency, 0)
  const saudiOutflowSar = mockFundingFlows
    .filter((deal) => deal.investor_origin === 'KSA')
    .reduce((sum, deal) => sum + deal.amount_local_currency, 0)

  const metrics = [
    {
      id: 'capital',
      label: 'Total Capital Deployed',
      value: formatValue(totalCapital),
      sublabel: `Year to date · ${currency}`,
      icon: Banknote,
      accent: 'text-emerald-400',
    },
    {
      id: 'deals',
      label: 'Active Deals',
      value: activeDeals.toString().padStart(2, '0'),
      sublabel: 'Open allocations',
      icon: Activity,
      accent: 'text-sky-400',
    },
    {
      id: 'inflow',
      label: 'Foreign Capital Inflow',
      value: formatValue(foreignInflowSar),
      sublabel: `${currency} entering KSA`,
      icon: TrendingUp,
      accent: 'text-emerald-400',
    },
    {
      id: 'outflow',
      label: 'Saudi Capital Outflow',
      value: formatValue(saudiOutflowSar * 0.15),
      sublabel: `Estimated ${currency} leaving KSA`,
      icon: ArrowDownRight,
      accent: 'text-rose-400',
    },
  ]

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.id}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-zinc-500">
            <div className="flex items-center">
              {metric.label}
              {metric.id === 'capital' && (
                <SourceIndicator source="Saudi Press Agency" date="Nov 2024" confidence="High" />
              )}
            </div>
            <metric.icon className={`h-4 w-4 ${metric.accent}`} strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-mono text-white">{metric.value}</p>
          <p className="text-[11px] text-zinc-500">{metric.sublabel}</p>
        </article>
      ))}
    </section>
  )
}

