'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type Headline = {
  id: string
  label: string
  tag: 'investments' | 'infrastructure'
}

const headlines: Headline[] = [
  { id: 'h-01', label: 'Aramco invests $50M in AI Infra', tag: 'investments' },
  { id: 'h-02', label: 'SDAIA announces new Cloud Region', tag: 'infrastructure' },
  { id: 'h-03', label: 'NEOM Cognitive Core expands GPU cluster', tag: 'infrastructure' },
  { id: 'h-04', label: 'PIF targets sovereign AI co-investments', tag: 'investments' },
  { id: 'h-05', label: 'KAUST opens Quantum Simulation Lab', tag: 'infrastructure' },
  { id: 'h-06', label: 'STC Ventures backs edge inference fund', tag: 'investments' },
]

const tagStyles: Record<Headline['tag'], string> = {
  investments: 'text-emerald-400 border-emerald-400/40',
  infrastructure: 'text-[#3B82F6] border-[#3B82F6]/40',
}

export default function NewsTicker() {
  const loopedHeadlines = [...headlines, ...headlines]

  return (
    <div className="relative overflow-hidden border-y border-zinc-900 bg-zinc-950/60">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />

      <div className="flex items-center gap-3 border-r border-zinc-900/80 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-zinc-500 uppercase">
        <Sparkles className="h-4 w-4 text-emerald-400" strokeWidth={1.5} />
        Wire Feed
      </div>

      <motion.div
        className="flex items-center gap-8 py-2 pl-4 font-mono text-sm text-zinc-200 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {loopedHeadlines.map((headline, index) => (
          <div
            key={`${headline.id}-${index}`}
            className="flex items-center gap-3 border border-zinc-800/80 bg-zinc-900/60 px-4 py-1 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)]"
          >
            <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${tagStyles[headline.tag]}`}>
              {headline.tag === 'investments' ? 'INV' : 'INFRA'}
            </span>
            <span>{headline.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

