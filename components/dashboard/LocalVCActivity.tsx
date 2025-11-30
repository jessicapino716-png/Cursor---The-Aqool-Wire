'use client'

import { BadgeCheck } from 'lucide-react'

const vcActivity = [
  {
    fund: 'Sanabil Investments',
    headline: 'Backed Rasan and TruKKer expansion rounds',
    recentBets: ['Rasan', 'TruKKer', 'Lean Tech'],
    focus: 'Late-stage AI-enabled infrastructure',
  },
  {
    fund: 'STV',
    headline: 'Led Series B in Nana for smart commerce',
    recentBets: ['Nana', 'Tabby', 'Taffi'],
    focus: 'Consumer platforms with embedded AI',
  },
  {
    fund: 'Raed Ventures',
    headline: 'Seeded Hasna for AI-enabled logistics',
    recentBets: ['Hasna', 'Tamara', 'Qawafel'],
    focus: 'Seed + Series A across supply chain AI',
  },
  {
    fund: 'Impact46',
    headline: 'Doubling down on fintech AI orchestration',
    recentBets: ['Tamara', 'HyperPay', 'Tweeq'],
    focus: 'Capital-light fintech automation',
  },
]

export default function LocalVCActivity() {
  return (
    <section className="h-full flex flex-col">

      <div className="space-y-3 overflow-y-auto pr-1">
        {vcActivity.map((entry) => (
          <article key={entry.fund} className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-white">{entry.fund}</p>
              <BadgeCheck className="h-4 w-4 text-emerald-400" strokeWidth={1.5} />
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">{entry.headline}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {entry.recentBets.map((bet) => (
                <span
                  key={bet}
                  className="rounded-full border border-zinc-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-200"
                >
                  {bet}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">Focus: {entry.focus}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

