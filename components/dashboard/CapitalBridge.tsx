"use client";

import React, { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { ArrowUpRight, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- DATA ---
const SECTORS = [
  { id: "fintech", label: "Fintech & Payments", value: 450, growth: 24, investors: ["STV", "Sequoia", "Checkout"] },
  { id: "genai", label: "GenAI & Infrastructure", value: 320, growth: 115, investors: ["SDAIA", "a16z", "Oracle"] },
  { id: "logistics", label: "Smart Logistics", value: 180, growth: 12, investors: ["Sanabil", "LogiPoint", "Sal"] },
  { id: "health", label: "HealthTech", value: 150, growth: -5, investors: ["NUPCO", "Lean", "Dr. Sulaiman"] },
  { id: "gaming", label: "Gaming & Metaverse", value: 120, growth: 45, investors: ["Savvy", "PIF", "Nine66"] },
];

// --- SVG MATH ---
function polarToCartesian(x: number, y: number, r: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: x + (r * Math.cos(angleInRadians)),
    y: y + (r * Math.sin(angleInRadians))
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y, 
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

export default function CapitalBridge() {
  const { formatValue } = useCurrency();
  const [activeIdx, setActiveIdx] = useState(0);

  const activeSector = SECTORS[activeIdx];
  const maxVal = Math.max(...SECTORS.map(s => s.value));

  return (
    // THE DESERT CONTAINER
    <div className="w-full h-[500px] glass-panel rounded-xl overflow-hidden flex flex-col md:flex-row relative p-8">

      {/* LEFT: Radial Graphic */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center z-10">
        <div className="absolute top-0 left-0">
           <h3 className="text-xs font-serif text-muted-foreground tracking-[0.2em] uppercase flex items-center gap-2">
             <Globe size={12} className="text-primary" />
             Capital Momentum
           </h3>
        </div>

        <svg className="w-[400px] h-[400px] rotate-[-90deg]">
          {SECTORS.map((sector, i) => {
            const radius = 60 + (i * 28);
            const angle = (sector.value / maxVal) * 270;
            const isActive = i === activeIdx;

            return (
              <g key={sector.id} 
                 onMouseEnter={() => setActiveIdx(i)}
                 className="cursor-pointer transition-all duration-500"
              >
                {/* Track (Warm Stone) */}
                <path
                  d={describeArc(200, 200, radius, 0, 270)}
                  fill="none"
                  stroke="#44403c"
                  strokeWidth="1"
                />
                {/* Active Bar (Neon Green or Deep Clay) */}
                <path
                  d={describeArc(200, 200, radius, 0, angle)}
                  fill="none"
                  stroke={isActive ? "hsl(var(--primary))" : "#78716c"} 
                  strokeWidth={isActive ? "6" : "3"}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                  style={{ filter: isActive ? "drop-shadow(0px 0px 4px rgba(0, 255, 148, 0.5))" : "none" }}
                />
              </g>
            );
          })}
        </svg>
        
        {/* Center Data */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="text-center">
              <p className="text-[10px] text-muted-foreground font-serif italic mb-1">Total Deployment</p>
              <p className="text-2xl text-foreground font-mono tracking-tighter">{formatValue(1220000000)}</p>
           </div>
        </div>
      </div>

      {/* RIGHT: Editorial Panel */}
      <div className="w-full md:w-80 pl-8 border-l border-border/50 flex flex-col justify-center h-[80%] z-10">
        
        <div className="mb-8">
          <span className="text-primary text-[10px] font-mono uppercase tracking-widest mb-2 block">
            // Active Sector
          </span>
          <h2 className="text-4xl font-serif text-foreground mb-2 leading-[0.9]">
            {activeSector.label}
          </h2>
          <div className="flex items-baseline gap-4 mt-4">
             <p className="text-sm text-muted-foreground font-mono border-b border-primary/30 pb-1">
               {formatValue(activeSector.value * 1000000)} Vol
             </p>
             <span className={cn("text-xs font-mono", activeSector.growth > 0 ? "text-primary" : "text-red-400")}>
                {activeSector.growth > 0 ? "▲" : "▼"} {activeSector.growth}%
             </span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-2">Top Allocators</p>
          {activeSector.investors.map((inv, i) => (
            <div key={i} className="group flex items-center justify-between py-2 border-b border-border/30 cursor-default hover:bg-muted/20 px-2 -mx-2 rounded transition-all">
              <span className="text-sm text-foreground font-serif group-hover:text-primary transition-colors">
                {inv}
              </span>
              <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
