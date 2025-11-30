"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Shell from '@/components/layout/Shell';
import Sidebar from '@/components/layout/Sidebar';
import { mockMous } from '@/data/mockData';
import { MOU } from '@/types/database';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

const getStatusColor = (status: MOU['status']) => {
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

export default function MOUsPage() {
  const router = useRouter();
  const { formatValue, currency } = useCurrency();
  const [filters, setFilters] = useState({
    sector: 'All sectors',
    capitalType: 'All types',
    segment: 'All segments',
    timeframe: 'All timeframes',
    status: 'All statuses',
  });

  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [isCapitalTypeOpen, setIsCapitalTypeOpen] = useState(false);
  const [isSegmentOpen, setIsSegmentOpen] = useState(false);
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  // Refs for dropdown containers
  const sectorRef = useRef<HTMLDivElement>(null);
  const capitalTypeRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);
  const timeframeRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectorRef.current && !sectorRef.current.contains(event.target as Node)) {
        setIsSectorOpen(false);
      }
      if (capitalTypeRef.current && !capitalTypeRef.current.contains(event.target as Node)) {
        setIsCapitalTypeOpen(false);
      }
      if (segmentRef.current && !segmentRef.current.contains(event.target as Node)) {
        setIsSegmentOpen(false);
      }
      if (timeframeRef.current && !timeframeRef.current.contains(event.target as Node)) {
        setIsTimeframeOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sectors = ['All sectors', 'Cloud Infrastructure', 'Smart Cities', 'Data Centers'];
  const capitalTypes = ['All types', 'Sovereign', 'Public-Private Partnership', 'Joint Venture'];
  const segments = ['All segments', 'Infrastructure', 'Platform'];
  const timeframes = ['All timeframes', '2025', '2026', '2027', '2028', '2029', '2030+'];
  const statuses = ['All statuses', 'SIGNED', 'IN PROGRESS', 'ANNOUNCED', 'COMPLETED'];

  const filteredMous = useMemo(() => {
    return mockMous.filter((mou) => {
      if (filters.sector !== 'All sectors' && mou.sector !== filters.sector) return false;
      if (filters.capitalType !== 'All types' && mou.capital_type !== filters.capitalType) return false;
      if (filters.segment !== 'All segments' && mou.segment !== filters.segment) return false;
      if (filters.status !== 'All statuses' && mou.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0c0a09]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Shell>
          <div className="flex flex-col w-full space-y-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-[#78716c] font-mono mb-2">
                  <span>Observatory</span>
                  <span>/</span>
                  <span className="text-emerald-400">MOUs</span>
                </div>
                <h1 className="text-3xl font-bold text-[#a8a29e] font-serif">Investment Announcements & MOUs</h1>
                <p className="text-sm text-[#78716c] mt-2 font-sans">
                  Comprehensive tracker of memorandums of understanding, strategic partnerships, and major investment announcements across Saudi Arabia's AI and infrastructure sectors.
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="glass-panel rounded-xl p-4 border border-[#44403c] bg-[#292524]/80 relative z-10">
              <h3 className="text-xs uppercase tracking-wider text-[#78716c] font-mono mb-4">FILTERS</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Sector Filter */}
                <div className="relative" ref={sectorRef}>
                  <label className="block text-xs text-[#a8a29e] font-mono mb-2">SECTOR</label>
                  <button
                    onClick={() => setIsSectorOpen(!isSectorOpen)}
                    className="w-full px-3 py-2 bg-[#1c1917] border border-[#44403c] rounded-lg text-sm text-[#a8a29e] font-mono flex items-center justify-between hover:border-emerald-400/50 transition-colors"
                  >
                    <span>{filters.sector}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSectorOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isSectorOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-[#292524] border border-[#44403c] rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                      {sectors.map((sector) => (
                        <button
                          key={sector}
                          onClick={() => {
                            handleFilterChange('sector', sector);
                            setIsSectorOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-[#a8a29e] hover:bg-[#1c1917] transition-colors font-mono"
                        >
                          {sector}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Capital Type Filter */}
                <div className="relative" ref={capitalTypeRef}>
                  <label className="block text-xs text-[#a8a29e] font-mono mb-2">CAPITAL TYPE</label>
                  <button
                    onClick={() => setIsCapitalTypeOpen(!isCapitalTypeOpen)}
                    className="w-full px-3 py-2 bg-[#1c1917] border border-[#44403c] rounded-lg text-sm text-[#a8a29e] font-mono flex items-center justify-between hover:border-emerald-400/50 transition-colors"
                  >
                    <span>{filters.capitalType}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isCapitalTypeOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isCapitalTypeOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-[#292524] border border-[#44403c] rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                      {capitalTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            handleFilterChange('capitalType', type);
                            setIsCapitalTypeOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-[#a8a29e] hover:bg-[#1c1917] transition-colors font-mono"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Segment Filter */}
                <div className="relative" ref={segmentRef}>
                  <label className="block text-xs text-[#a8a29e] font-mono mb-2">SEGMENT</label>
                  <button
                    onClick={() => setIsSegmentOpen(!isSegmentOpen)}
                    className="w-full px-3 py-2 bg-[#1c1917] border border-[#44403c] rounded-lg text-sm text-[#a8a29e] font-mono flex items-center justify-between hover:border-emerald-400/50 transition-colors"
                  >
                    <span>{filters.segment}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSegmentOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isSegmentOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-[#292524] border border-[#44403c] rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                      {segments.map((segment) => (
                        <button
                          key={segment}
                          onClick={() => {
                            handleFilterChange('segment', segment);
                            setIsSegmentOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-[#a8a29e] hover:bg-[#1c1917] transition-colors font-mono"
                        >
                          {segment}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Timeframe Filter */}
                <div className="relative" ref={timeframeRef}>
                  <label className="block text-xs text-[#a8a29e] font-mono mb-2">TIMEFRAME</label>
                  <button
                    onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
                    className="w-full px-3 py-2 bg-[#1c1917] border border-[#44403c] rounded-lg text-sm text-[#a8a29e] font-mono flex items-center justify-between hover:border-emerald-400/50 transition-colors"
                  >
                    <span>{filters.timeframe}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isTimeframeOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isTimeframeOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-[#292524] border border-[#44403c] rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                      {timeframes.map((timeframe) => (
                        <button
                          key={timeframe}
                          onClick={() => {
                            handleFilterChange('timeframe', timeframe);
                            setIsTimeframeOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-[#a8a29e] hover:bg-[#1c1917] transition-colors font-mono"
                        >
                          {timeframe}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Filter */}
                <div className="relative" ref={statusRef}>
                  <label className="block text-xs text-[#a8a29e] font-mono mb-2">STATUS</label>
                  <button
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                    className="w-full px-3 py-2 bg-[#1c1917] border border-[#44403c] rounded-lg text-sm text-[#a8a29e] font-mono flex items-center justify-between hover:border-emerald-400/50 transition-colors"
                  >
                    <span>{filters.status}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isStatusOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-[#292524] border border-[#44403c] rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            handleFilterChange('status', status);
                            setIsStatusOpen(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-[#a8a29e] hover:bg-[#1c1917] transition-colors font-mono"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-[#78716c] font-mono">
              Showing {filteredMous.length} of {mockMous.length} announcements
            </div>

            {/* MOU Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMous.map((mou) => (
                <div
                  key={mou.id}
                  onClick={() => router.push(`/mous/${mou.id}`)}
                  className="glass-panel rounded-xl p-6 border border-[#44403c] bg-[#292524]/80 cursor-pointer hover:border-emerald-400/50 transition-all group"
                >
                  {/* Status & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wide border ${getStatusColor(mou.status)}`}>
                      {mou.status}
                    </span>
                    <span className="text-xs text-[#78716c] font-mono">{mou.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[#a8a29e] font-serif mb-3 group-hover:text-emerald-400 transition-colors">
                    {mou.title}
                  </h3>

                  {/* Amount */}
                  <div className="mb-3">
                    <span className="text-2xl font-mono text-emerald-400 font-bold">
                      {currency === 'USD' ? formatValue(mou.amount_usd) : formatValue(mou.amount_sar)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#78716c] font-sans mb-4 leading-relaxed">
                    {mou.description}
                  </p>

                  {/* Parties */}
                  <div className="mb-4">
                    <p className="text-xs text-[#78716c] font-mono mb-1">Partners:</p>
                    <p className="text-sm text-[#a8a29e] font-sans">{mou.parties.join(' • ')}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mou.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded border border-[#44403c] bg-[#1c1917] text-xs text-[#78716c] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Target Date */}
                  {mou.target_date && (
                    <div className="text-xs text-[#78716c] font-mono">
                      Target Date: {mou.target_date}
                    </div>
                  )}

                  {/* Additional Info */}
                  {mou.additional_info && (
                    <p className="text-xs text-[#78716c] font-sans mt-3 italic">
                      {mou.additional_info}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </div>
    </div>
  );
}

