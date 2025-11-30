"use client";

import React from 'react';
import { TrendingUp, ArrowRight, ExternalLink } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

interface SummitDeal {
  entity: string;
  partner: string;
  type: string;
  focus: string;
  value: string;
}

const SUMMIT_DEALS: SummitDeal[] = [
  { entity: "Aramco", partner: "L3Harris", type: "Joint Venture", focus: "Industrial AI", value: "Undisclosed" },
  { entity: "Alat", partner: "Carrier", type: "Strategic Partnership", focus: "Smart Climate Tech", value: "$500M" },
  { entity: "PIF", partner: "JLL", type: "MOU", focus: "PropTech Data", value: "Strategic" },
  { entity: "SDAIA", partner: "IBM", type: "Co-Investment", focus: "Arabic LLMs", value: "$200M" },
];

const BASE_VOLUME_SAR = 112500000000; // SAR 112.5B

export default function ImpactTracker() {
  const { formatValue, currency } = useCurrency();

  return (
    <div className="w-full mb-6">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <TrendingUp className="w-24 h-24 text-amber-500" />
        </div>
        
        {/* Compact Stats Section */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-mono text-amber-500 tracking-wider uppercase">Summit Impact Tracker</span>
            </div>
            <h3 className="text-xl font-bold text-white">Saudi-US Investment Forum</h3>
            <p className="text-sm text-zinc-400 max-w-lg">
              Tracking post-summit capital deployment and strategic MOUs formalized during the recent delegation.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-black/20 p-3 rounded-lg border border-white/5">
            <div>
              <p className="text-xs text-zinc-500 mb-1">TOTAL COMMITTED</p>
              <p className="text-2xl font-mono text-amber-400">
                {formatValue(BASE_VOLUME_SAR)}
              </p>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <p className="text-xs text-zinc-500 mb-1">KEY SECTORS</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-300 border border-zinc-700">Defense</span>
                <span className="px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-300 border border-zinc-700">Cloud</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deal Deck Section */}
        <div className="relative z-10 border-t border-zinc-800 pt-6">
          <div className="mb-4">
            <h4 className="text-sm font-mono font-semibold text-amber-500 uppercase tracking-wider">
              Executed Agreements
            </h4>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {SUMMIT_DEALS.map((deal, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-amber-500/50 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono font-semibold text-white">{deal.entity}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-500 flex-shrink-0" strokeWidth={1.5} />
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wide bg-amber-950/30 border border-amber-800/50 text-amber-400">
                    {deal.type}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-500 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-mono font-semibold text-white">{deal.partner}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-mono">{deal.focus}</span>
                  <span className="text-xs font-mono text-amber-500/80">{deal.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Source Footer */}
        <div className="relative z-10 mt-4 pt-4 border-t border-zinc-800 flex items-center justify-end">
          <div className="relative group">
            <span className="text-[10px] font-mono text-zinc-500 cursor-help">
              Data Source: SPA
            </span>
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              <div className="w-64 rounded-lg border border-zinc-700 bg-zinc-950 p-3 shadow-2xl">
                <p className="text-xs font-mono text-white mb-1">Saudi Press Agency (Official)</p>
                <p className="text-[10px] text-zinc-400 mb-2">Verified by Saudi Press Agency PDF</p>
                <a
                  href="https://spa.gov.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Official Release
                  <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                </a>
                <p className="text-[10px] text-zinc-500 mt-2">Last Updated: Nov 23, 2024</p>
                <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 border-b border-r border-zinc-700 bg-zinc-950" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

