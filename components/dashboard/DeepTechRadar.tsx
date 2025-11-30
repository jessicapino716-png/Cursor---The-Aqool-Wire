'use client'

import { Microscope, Atom, Cpu, Beaker } from 'lucide-react'
import { mockResearchSignals } from '@/data/mockData'
import { ResearchSignal } from '@/types/database'

export default function DeepTechRadar() {
  const getIcon = (type: ResearchSignal['type']) => {
    switch (type) {
      case 'Research':
        return Microscope
      case 'Patent':
        return Atom
      case 'Grant':
        return Cpu
      default:
        return Beaker
    }
  }

  const getPotentialColor = (potential: ResearchSignal['commercial_potential']) => {
    switch (potential) {
      case 'High':
        return 'bg-emerald-400'
      case 'Medium':
        return 'bg-[#3B82F6]'
      case 'Low':
        return 'bg-zinc-600'
      default:
        return 'bg-zinc-600'
    }
  }

  const getPotentialWidth = (potential: ResearchSignal['commercial_potential']) => {
    switch (potential) {
      case 'High':
        return 'w-full'
      case 'Medium':
        return 'w-2/3'
      case 'Low':
        return 'w-1/3'
      default:
        return 'w-1/3'
    }
  }

  const getSourceColor = (source: string) => {
    // Highlight specific institutions with distinct colors
    if (source.includes('KAUST')) return 'text-cyan-400'
    if (source.includes('SDAIA')) return 'text-yellow-400'
    if (source.includes('King Saud')) return 'text-amber-400'
    if (source.includes('NEOM')) return 'text-emerald-400'
    if (source.includes('Aramco')) return 'text-blue-400'
    return 'text-zinc-400'
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-end">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-mono text-emerald-400">Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {mockResearchSignals.map((signal) => {
          const Icon = getIcon(signal.type)
          return (
            <div
              key={signal.id}
              className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Icon className={`h-4 w-4 ${
                    signal.type === 'Patent' ? 'text-[#3B82F6]' : signal.type === 'Grant' ? 'text-cyan-400' : 'text-emerald-400'
                  }`} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white font-mono mb-1 leading-tight">
                    {signal.title}
                  </h4>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-mono font-semibold ${getSourceColor(signal.source)}`}>
                      {signal.source}
                    </span>
                    <span className="text-xs text-zinc-500">·</span>
                    <span className="text-xs text-zinc-400 font-mono">{signal.tag}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wide text-zinc-500 font-mono">
                      Potential:
                    </span>
                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getPotentialColor(signal.commercial_potential)} ${getPotentialWidth(
                          signal.commercial_potential
                        )} transition-all duration-300`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {signal.commercial_potential}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

