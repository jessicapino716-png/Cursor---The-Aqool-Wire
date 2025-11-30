'use client'

import { Activity, Clock3, Download, Gauge } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useCurrency, EXCHANGE_RATE } from '@/context/CurrencyContext'

const NewsTicker = dynamic(() => import('../dashboard/NewsTicker'), { 
  ssr: false,
  loading: () => null,
})

const statusPills = [
  { label: 'Riyadh Open', value: '08:32', icon: Clock3 },
  { label: 'Latency', value: '42ms', icon: Gauge },
  { label: 'Throughput', value: '1.2 GB/s', icon: Activity },
]

interface ShellProps {
  children: ReactNode
}

export default function Shell({ children }: ShellProps) {
  const { currency, setCurrency } = useCurrency()
  const [isHighlighted, setIsHighlighted] = useState(false)

  // Trigger brief highlight when currency changes
  useEffect(() => {
    setIsHighlighted(true)
    const timer = setTimeout(() => setIsHighlighted(false), 500)
    return () => clearTimeout(timer)
  }, [currency])

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-transparent text-foreground relative">
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
        <div className="glass-panel border-b border-[#44403c] relative z-20 bg-[#1c1917]/60">
          <div className="px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2 flex-1 min-w-[240px]">
            {statusPills.map((status) => {
              const IconComponent = status.icon
              return (
                <div
                  key={status.label}
                  className="flex items-center gap-2 rounded border border-border/80 bg-card/60 px-3 py-1.5 text-xs text-foreground"
                >
                  <IconComponent className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
                  <span className="uppercase tracking-wide text-muted-foreground">{status.label}</span>
                  <span className="font-mono text-sm text-foreground">{status.value}</span>
                </div>
              )
            })}
          </div>

          {/* Currency Toggle & Spot Rate */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded border border-border/80 bg-card/60 overflow-hidden">
              <button
                onClick={() => setCurrency('SAR')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wide transition-colors ${
                  currency === 'SAR'
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                SAR
              </button>
              <div className="h-4 w-px bg-border" />
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wide transition-colors ${
                  currency === 'USD'
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                USD
              </button>
            </div>

            {/* Spot Rate Display */}
            <div
              className={`flex items-center gap-2 px-2 py-1 rounded transition-all duration-500 ${
                isHighlighted ? 'bg-primary/20 border border-primary/40' : ''
              }`}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">
                1 USD = {EXCHANGE_RATE} SAR
              </span>
            </div>
          </div>

          <button className="ml-auto flex items-center gap-2 rounded border border-border px-3 py-1.5 text-xs uppercase tracking-wide text-muted-foreground hover:border-primary/60 hover:text-foreground transition">
            <Download className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
            Sync Feed
          </button>
          </div>
          <NewsTicker />
        </div>

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          {children || null}
        </main>
      </div>
    </div>
  )
}

