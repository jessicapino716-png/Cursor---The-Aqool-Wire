"use client";

import React, { useState } from 'react';
import { Building2, Wallet } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { cn } from '@/lib/utils';

const INVESTORS = [
  { id: "inv-1", name: "Mubadala", type: "Sovereign", amount: 50000000 },
  { id: "inv-2", name: "a16z", type: "VC", amount: 12000000 },
  { id: "inv-3", name: "Sanabil", type: "Gov VC", amount: 8500000 },
];

const TARGETS = [
  { id: "t-1", name: "Noor AI", sector: "Health" },
  { id: "t-2", name: "Takamol", sector: "Fintech" },
  { id: "t-3", name: "Red Sea", sector: "Logistics" },
];

export default function CapitalFlow() {
  const { formatValue } = useCurrency();
  const [hovered, setHovered] = useState<string | null>(null);

  // Calculate Total
  const totalFlow = INVESTORS.reduce((acc, curr) => acc + curr.amount, 0);

  // Helper to check if active
  const isActive = (id: string) => hovered === null || hovered === id;

  return (
    <div className="w-full h-full min-h-[350px] bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 z-10">
        <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wider">Capital Bridge</h3>
        <div className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-500">
          LIVE DATA
        </div>
      </div>

      <div className="relative flex-1 flex justify-between items-center">
        
        {/* SVG Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {INVESTORS.map((inv, i) => (
            <path
              key={`line-left-${i}`}
              d={`M 0 ${40 + (i * 80)} C 100 ${40 + (i * 80)}, 100 150, 500 150`} 
              fill="none"
              strokeWidth="1"
              className={cn(
                "transition-all duration-300",
                isActive(inv.id) ? "stroke-zinc-500 opacity-100" : "stroke-zinc-800 opacity-20"
              )}
            />
          ))}
           {TARGETS.map((t, i) => (
            <path
              key={`line-right-${i}`}
              d={`M 500 150 C 800 150, 800 ${40 + (i * 80)}, 1000 ${40 + (i * 80)}`} 
              fill="none"
              strokeWidth="1"
              className={cn(
                "transition-all duration-300",
                isActive(t.id) ? "stroke-zinc-500 opacity-100" : "stroke-zinc-800 opacity-20"
              )}
            />
          ))}
        </svg>

        {/* Left: Investors */}
        <div className="flex flex-col gap-8 z-10 w-1/4">
          {INVESTORS.map((inv) => (
            <div 
              key={inv.id}
              onMouseEnter={() => setHovered(inv.id)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "p-3 bg-zinc-900 border rounded-lg transition-all cursor-default",
                isActive(inv.id) ? "border-zinc-600 opacity-100" : "border-zinc-800 opacity-40"
              )}
            >
              <div className="flex items-center gap-3 mb-1">
                <Wallet className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-bold text-zinc-200">{inv.name}</span>
              </div>
              <p className="text-[10px] text-zinc-500 pl-7">{inv.type}</p>
            </div>
          ))}
        </div>

        {/* Center: The Pulse Hub */}
        <div className="z-20 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-zinc-900 border border-zinc-700 flex flex-col items-center justify-center shadow-2xl">
            <p className="text-[10px] text-zinc-500 font-mono mb-1">AGGREGATED FLOW</p>
            <p className="text-lg font-bold text-white text-center px-2">
              {formatValue(totalFlow)}
            </p>
            <div className="w-full h-px bg-zinc-800 my-2" />
            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
              Active
            </p>
          </div>
        </div>

        {/* Right: Startups */}
        <div className="flex flex-col gap-8 z-10 w-1/4 items-end">
          {TARGETS.map((t) => (
            <div 
              key={t.id}
              onMouseEnter={() => setHovered(t.id)}
              onMouseLeave={() => setHovered(null)}
               className={cn(
                "p-3 w-full bg-zinc-900 border rounded-lg transition-all cursor-default text-right",
                isActive(t.id) ? "border-zinc-600 opacity-100" : "border-zinc-800 opacity-40"
              )}
            >
              <div className="flex items-center justify-end gap-3 mb-1">
                <span className="text-xs font-bold text-zinc-200">{t.name}</span>
                <Building2 className="w-4 h-4 text-zinc-500" />
              </div>
               <p className="text-[10px] text-zinc-500 pr-7">{t.sector}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
