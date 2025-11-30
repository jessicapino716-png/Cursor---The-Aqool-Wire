"use client";

import React from 'react';
import { ShieldCheck, CheckCircle2, Building2, Flag, FileCheck } from 'lucide-react';

export default function InvestorProfile() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Identity Card */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg flex items-start gap-4">
        <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
          🇸🇦
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold text-white">Sanabil Investments</h3>
              <p className="text-xs text-zinc-500">Riyadh, KSA • Sovereign Backed</p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-xs font-mono">
              <ShieldCheck size={12} />
              <span>VERIFIED</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Trust Score */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-900/10 border border-emerald-400/20 p-3 rounded-lg text-center">
          <p className="text-[10px] text-emerald-400 uppercase font-mono tracking-wider mb-1">Integrity Score</p>
          <p className="text-3xl font-bold text-white">98<span className="text-sm text-emerald-400">/100</span></p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg flex flex-col justify-center gap-2">
           <div className="flex items-center gap-2 text-xs text-zinc-300">
             <CheckCircle2 size={14} className="text-emerald-400" />
             <span>CMA Licensed</span>
           </div>
           <div className="flex items-center gap-2 text-xs text-zinc-300">
             <CheckCircle2 size={14} className="text-emerald-400" />
             <span>OFAC Cleared</span>
           </div>
        </div>
      </div>

      {/* Network Validation */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
        <p className="text-[10px] text-zinc-500 uppercase mb-3 flex items-center gap-2">
          <Building2 size={12} />
          Co-Investment Validation (US)
        </p>
        <div className="flex gap-2">
          <div className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-300">Sequoia</div>
          <div className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-300">500 Global</div>
          <div className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-300">Coatue</div>
        </div>
      </div>

      <button className="w-full py-2 mt-auto bg-zinc-100 hover:bg-white text-black text-xs font-bold rounded transition-colors flex items-center justify-center gap-2">
        <FileCheck size={14} />
        DOWNLOAD KYC REPORT
      </button>
    </div>
  );
}
