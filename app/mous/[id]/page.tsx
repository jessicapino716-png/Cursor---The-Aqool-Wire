"use client";

import { useParams, useRouter } from 'next/navigation';
import Shell from '@/components/layout/Shell';
import Sidebar from '@/components/layout/Sidebar';
import { mockMous } from '@/data/mockData';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export default function MOUDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { formatValue, currency } = useCurrency();
  const mou = mockMous.find((m) => m.id === params.id);

  if (!mou) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#0c0a09]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Shell>
            <div className="p-8">
              <p className="text-[#a8a29e]">MOU not found</p>
            </div>
          </Shell>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SIGNED':
        return 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30';
      case 'IN PROGRESS':
        return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      case 'ANNOUNCED':
        return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'COMPLETED':
        return 'bg-zinc-400/20 text-zinc-400 border-zinc-400/30';
      default:
        return 'bg-zinc-400/20 text-zinc-400 border-zinc-400/30';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0c0a09]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Shell>
          <div className="flex flex-col w-full space-y-6 overflow-y-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/mous')}
                  className="flex items-center gap-2 text-sm text-[#78716c] hover:text-emerald-400 transition-colors font-mono"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to MOUs</span>
                </button>
                <div className="flex items-center gap-2 text-sm text-[#78716c] font-mono">
                  <span>Observatory</span>
                  <span>/</span>
                  <span>MOUs</span>
                  <span>/</span>
                  <span className="text-emerald-400">{mou.id}</span>
                </div>
              </div>
            </div>

            {/* Header Section */}
            <div className="glass-panel rounded-xl p-6 border border-[#44403c] bg-[#292524]/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wide border ${getStatusColor(mou.status)}`}>
                      {mou.status}
                    </span>
                    <span className="text-sm text-[#78716c] font-mono">{mou.date}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-[#a8a29e] font-serif mb-3">
                    {mou.title}
                  </h1>
                  <p className="text-base text-[#78716c] font-sans leading-relaxed max-w-4xl">
                    {mou.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-panel rounded-xl p-4 border border-[#44403c] bg-[#292524]/80">
                <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-2">TOTAL VALUE</p>
                <p className="text-xl font-mono text-[#a8a29e] font-bold mb-1">
                  {currency === 'USD' ? formatValue(mou.amount_usd) : formatValue(mou.amount_sar)}
                </p>
                <p className="text-xs text-[#78716c] font-mono">
                  {currency === 'USD' ? formatValue(mou.amount_sar) + ' SAR' : formatValue(mou.amount_usd) + ' USD'}
                </p>
              </div>

              <div className="glass-panel rounded-xl p-4 border border-[#44403c] bg-[#292524]/80">
                <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-2">PARTIES</p>
                <p className="text-xl font-mono text-[#a8a29e] font-bold">{mou.parties.length}</p>
                <p className="text-xs text-[#78716c] font-mono">Organizations</p>
              </div>

              <div className="glass-panel rounded-xl p-4 border border-[#44403c] bg-[#292524]/80">
                <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-2">TIMEFRAME</p>
                <p className="text-xl font-mono text-[#a8a29e] font-bold">
                  {mou.expected_completion || 'N/A'}
                </p>
                <p className="text-xs text-[#78716c] font-mono">Expected delivery</p>
              </div>

              <div className="glass-panel rounded-xl p-4 border border-[#44403c] bg-[#292524]/80">
                <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-2">SECTOR</p>
                <p className="text-sm font-mono text-[#a8a29e] font-bold mb-1">{mou.sector}</p>
                <p className="text-xs text-[#78716c] font-mono">{mou.segment}</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Participating Organizations */}
                <div className="glass-panel rounded-xl p-6 border border-[#44403c] bg-[#292524]/80">
                  <h2 className="text-lg font-semibold text-[#a8a29e] font-serif mb-4">Participating Organizations</h2>
                  <div className="space-y-3">
                    {mou.parties.map((party, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-[#1c1917] rounded-lg border border-[#44403c]">
                        <div className="w-10 h-10 rounded-lg bg-[#292524] border border-[#44403c] flex items-center justify-center">
                          <span className="text-xs font-mono text-emerald-400 font-bold">
                            {party.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-[#a8a29e] font-sans">{party}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expected Impact */}
                {mou.expected_impact && (
                  <div className="glass-panel rounded-xl p-6 border border-[#44403c] bg-[#292524]/80">
                    <h2 className="text-lg font-semibold text-[#a8a29e] font-serif mb-4">Expected Impact</h2>
                    <p className="text-sm text-[#78716c] font-sans leading-relaxed">
                      {mou.expected_impact}
                    </p>
                  </div>
                )}

                {/* Key Metrics */}
                {mou.key_metrics && mou.key_metrics.length > 0 && (
                  <div className="glass-panel rounded-xl p-6 border border-[#44403c] bg-[#292524]/80">
                    <h2 className="text-lg font-semibold text-[#a8a29e] font-serif mb-4">Key Metrics</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {mou.key_metrics.map((metric, idx) => (
                        <div key={idx} className="p-4 bg-[#1c1917] rounded-lg border border-[#44403c]">
                          <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-2">
                            {metric.label}
                          </p>
                          <p className="text-lg font-mono text-[#a8a29e] font-bold">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Classification & Timeline */}
              <div className="space-y-6">
                {/* Classification */}
                <div className="glass-panel rounded-xl p-6 border border-[#44403c] bg-[#292524]/80">
                  <h2 className="text-lg font-semibold text-[#a8a29e] font-serif mb-4">Classification</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-1">CAPITAL TYPE</p>
                      <p className="text-sm text-[#a8a29e] font-sans">{mou.capital_type}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-1">SECTOR</p>
                      <p className="text-sm text-[#a8a29e] font-sans">{mou.sector}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-1">SEGMENT</p>
                      <p className="text-sm text-[#a8a29e] font-sans">{mou.segment}</p>
                    </div>
                    {mou.province && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-1">PROVINCE</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-[#a8a29e] font-sans">{mou.province}</p>
                          <ExternalLink className="w-3 h-3 text-[#78716c]" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="glass-panel rounded-xl p-6 border border-[#44403c] bg-[#292524]/80">
                  <h2 className="text-lg font-semibold text-[#a8a29e] font-serif mb-4">Timeline</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-1">ANNOUNCED</p>
                      <p className="text-sm text-[#a8a29e] font-sans">{mou.date}</p>
                    </div>
                    {mou.expected_completion && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-1">EXPECTED COMPLETION</p>
                        <p className="text-sm text-[#a8a29e] font-sans">{mou.expected_completion}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-1">CURRENT STATUS</p>
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wide border ${getStatusColor(mou.status)}`}>
                        {mou.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </div>
    </div>
  );
}

