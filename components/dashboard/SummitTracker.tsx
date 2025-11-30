"use client";

import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function SummitTracker() {
  return (
    <div className="w-full mb-6">
      {/* Replaced <Card> with a standard <div> */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 relative overflow-hidden group">
        
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <TrendingUp className="w-24 h-24 text-amber-500" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-mono text-amber-500 tracking-wider uppercase">Summit Impact Tracker</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Saudi-US Investment Forum</h3>
            <p className="text-zinc-400 max-w-lg">
              Tracking post-summit capital deployment and strategic MOUs formalized during the recent delegation.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 bg-black/20 p-4 rounded-lg border border-white/5">
            <div>
              <p className="text-xs text-zinc-500 mb-1">TOTAL COMMITTED</p>
              <p className="text-3xl font-mono text-amber-400">$30.0B</p>
            </div>
            <div className="h-10 w-px bg-zinc-800" />
            <div>
              <p className="text-xs text-zinc-500 mb-1">KEY SECTORS</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-300 border border-zinc-700">Defense</span>
                <span className="px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-300 border border-zinc-700">Cloud</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
