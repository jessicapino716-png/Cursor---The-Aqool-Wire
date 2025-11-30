"use client";

import { useState, useMemo } from 'react';
import { Search, Filter, X, ExternalLink, Clock, AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import { procurementData } from '@/data/mockData';
import { ProcurementItem } from '@/types/database';
import SourceIndicator from '@/components/ui/SourceIndicator';

const getTypeBadgeColor = (type: ProcurementItem['type']) => {
  switch (type) {
    case 'RFP':
      return 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400';
    case 'Expression of Interest':
      return 'bg-amber-400/10 border-amber-400/30 text-amber-400';
    case 'Direct Purchase':
      return 'bg-blue-400/10 border-blue-400/30 text-blue-400';
    case 'RFI':
      return 'bg-purple-400/10 border-purple-400/30 text-purple-400';
    default:
      return 'bg-zinc-400/10 border-zinc-400/30 text-zinc-400';
  }
};

const getStatusBadge = (status: ProcurementItem['status']) => {
  switch (status) {
    case 'Urgent':
      return {
        icon: <AlertCircle className="w-3.5 h-3.5" />,
        color: 'bg-red-500/10 border-red-500/30 text-red-400',
      };
    case 'Open':
      return {
        icon: <Clock className="w-3.5 h-3.5" />,
        color: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400',
      };
    case 'Awarded':
      return {
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        color: 'bg-blue-400/10 border-blue-400/30 text-blue-400',
      };
    case 'Closed':
      return {
        icon: <X className="w-3.5 h-3.5" />,
        color: 'bg-zinc-400/10 border-zinc-400/30 text-zinc-400',
      };
    default:
      return {
        icon: <FileText className="w-3.5 h-3.5" />,
        color: 'bg-zinc-400/10 border-zinc-400/30 text-zinc-400',
      };
  }
};

export default function RFPChart() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All Sectors');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('All Technologies');

  // Get unique values for filters
  const sectors = useMemo(() => {
    const unique = Array.from(new Set(procurementData.map(item => item.sector).filter(Boolean)));
    return ['All Sectors', ...unique.sort()];
  }, []);

  const regions = useMemo(() => {
    const unique = Array.from(new Set(procurementData.map(item => item.region).filter(Boolean)));
    return ['All Regions', ...unique.sort()];
  }, []);

  const technologies = useMemo(() => {
    const allTechs = procurementData.flatMap(item => item.technology || []);
    const unique = Array.from(new Set(allTechs));
    return ['All Technologies', ...unique.sort()];
  }, []);

  // Check if user has applied any filters or search
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery.trim() !== '' ||
      selectedSector !== 'All Sectors' ||
      selectedRegion !== 'All Regions' ||
      selectedTechnology !== 'All Technologies'
    );
  }, [searchQuery, selectedSector, selectedRegion, selectedTechnology]);

  // Helper function to extract numeric budget value for sorting
  const getBudgetValue = (budget: string): number => {
    if (budget === 'Undisclosed') return 0;
    const match = budget.match(/SAR\s*(\d+)/i);
    if (match) {
      const value = parseInt(match[1]);
      if (budget.includes('M+')) return value * 1000000;
      if (budget.includes('M')) return value * 1000000;
      if (budget.includes('B')) return value * 1000000000;
      return value;
    }
    return 0;
  };

  // Helper function to extract days from deadline for sorting
  const getDeadlineDays = (deadline: string): number => {
    if (deadline === 'Closed') return 9999;
    const match = deadline.match(/(\d+)\s*Days?/i);
    return match ? parseInt(match[1]) : 9999;
  };

  // Filter and sort RFPs
  const filteredRFPs = useMemo(() => {
    // First, filter by criteria
    let filtered = procurementData.filter((rfp) => {
      // Status filter - only show Open and Urgent
      if (rfp.status !== 'Open' && rfp.status !== 'Urgent') return false;

      // Sector filter
      if (selectedSector !== 'All Sectors' && rfp.sector !== selectedSector) return false;

      // Region filter
      if (selectedRegion !== 'All Regions' && rfp.region !== selectedRegion) return false;

      // Technology filter
      if (selectedTechnology !== 'All Technologies') {
        if (!rfp.technology || !rfp.technology.includes(selectedTechnology)) return false;
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = `${rfp.title} ${rfp.entity} ${rfp.description || ''} ${rfp.technology?.join(' ') || ''}`.toLowerCase();
        if (!searchableText.includes(query)) return false;
      }

      return true;
    });

    // Sort by priority: Urgent first, then by budget (descending), then by deadline (ascending)
    filtered.sort((a, b) => {
      // Priority 1: Urgent status comes first
      if (a.status === 'Urgent' && b.status !== 'Urgent') return -1;
      if (a.status !== 'Urgent' && b.status === 'Urgent') return 1;

      // Priority 2: Higher budget comes first
      const budgetA = getBudgetValue(a.budget);
      const budgetB = getBudgetValue(b.budget);
      if (budgetB !== budgetA) return budgetB - budgetA;

      // Priority 3: Sooner deadline comes first
      const deadlineA = getDeadlineDays(a.deadline);
      const deadlineB = getDeadlineDays(b.deadline);
      return deadlineA - deadlineB;
    });

    // If no active filters/search, limit to top 6 most important RFPs for landing page
    if (!hasActiveFilters) {
      return filtered.slice(0, 6);
    }

    // If filters/search are active, show all matching results
    return filtered;
  }, [searchQuery, selectedSector, selectedRegion, selectedTechnology, hasActiveFilters]);

  const activeCount = procurementData.filter(rfp => rfp.status === 'Open' || rfp.status === 'Urgent').length;

  return (
    <div className="glass-panel rounded-xl border border-[#44403c] bg-[#292524]/80 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#44403c]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-2xl font-semibold text-[#a8a29e] font-serif">Active RFPs & Tenders</h2>
            <span className="px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wide border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
              {activeCount} Active
            </span>
          </div>
          <SourceIndicator
            source="Etimad Portal & Direct Sources"
            date="Live"
            confidence="High"
          />
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#78716c]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, entity, technology..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#44403c] bg-[#1c1917] text-[#a8a29e] placeholder-[#78716c] font-sans focus:outline-none focus:border-emerald-400/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#78716c] hover:text-[#a8a29e] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#78716c]" />
            <span className="text-xs uppercase tracking-wider text-[#78716c] font-mono">Filters:</span>
          </div>

          {/* Sector Filter */}
          <div className="relative">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#44403c] bg-[#1c1917] text-[#a8a29e] text-sm font-sans focus:outline-none focus:border-emerald-400/50 transition-colors cursor-pointer"
            >
              {sectors.map((sector) => (
                <option key={sector} value={sector} className="bg-[#1c1917]">
                  {sector}
                </option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#44403c] bg-[#1c1917] text-[#a8a29e] text-sm font-sans focus:outline-none focus:border-emerald-400/50 transition-colors cursor-pointer"
            >
              {regions.map((region) => (
                <option key={region} value={region} className="bg-[#1c1917]">
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Technology Filter */}
          <div className="relative">
            <select
              value={selectedTechnology}
              onChange={(e) => setSelectedTechnology(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#44403c] bg-[#1c1917] text-[#a8a29e] text-sm font-sans focus:outline-none focus:border-emerald-400/50 transition-colors cursor-pointer"
            >
              {technologies.map((tech) => (
                <option key={tech} value={tech} className="bg-[#1c1917]">
                  {tech}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(selectedSector !== 'All Sectors' || selectedRegion !== 'All Regions' || selectedTechnology !== 'All Technologies' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSector('All Sectors');
                setSelectedRegion('All Regions');
                setSelectedTechnology('All Technologies');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 rounded-lg border border-[#44403c] bg-[#1c1917] text-[#78716c] text-xs font-mono uppercase tracking-wide hover:border-emerald-400/50 hover:text-emerald-400 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="px-6 py-3 border-b border-[#44403c] bg-[#1c1917]/50">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#78716c] font-mono">
            {hasActiveFilters ? (
              <>Showing {filteredRFPs.length} of {activeCount} active opportunities</>
            ) : (
              <>Showing top {filteredRFPs.length} opportunities • <span className="text-emerald-400">Search or filter to see all {activeCount} opportunities</span></>
            )}
          </p>
          {!hasActiveFilters && activeCount > filteredRFPs.length && (
            <button
              onClick={() => {
                // Clear any existing filters to show all
                setSearchQuery('');
                setSelectedSector('All Sectors');
                setSelectedRegion('All Regions');
                setSelectedTechnology('All Technologies');
              }}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-mono uppercase tracking-wide transition-colors"
            >
              View All →
            </button>
          )}
        </div>
      </div>

      {/* RFP Cards Grid */}
      <div className="p-6">
        {filteredRFPs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#78716c] font-sans">No RFPs match your filters. Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRFPs.map((rfp) => {
              const statusBadge = getStatusBadge(rfp.status);
              return (
                <div
                  key={rfp.id}
                  className="p-5 rounded-lg border border-[#44403c] bg-[#1c1917] hover:border-emerald-400/50 transition-all group"
                >
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wide border flex items-center gap-1 ${statusBadge.color}`}>
                          {statusBadge.icon}
                          {rfp.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wide border ${getTypeBadgeColor(rfp.type)}`}>
                          {rfp.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#a8a29e] font-serif mb-1 group-hover:text-emerald-400 transition-colors">
                        {rfp.title}
                      </h3>
                      <p className="text-sm text-[#78716c] font-sans">{rfp.entity}</p>
                    </div>
                    <button className="p-2 rounded-lg border border-[#44403c] hover:border-emerald-400/50 hover:text-emerald-400 transition-colors text-[#78716c]">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Description */}
                  {rfp.description && (
                    <p className="text-sm text-[#78716c] font-sans mb-4 line-clamp-2">
                      {rfp.description}
                    </p>
                  )}

                  {/* Metadata Row */}
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    {rfp.sector && (
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#78716c] font-mono">Sector:</span>
                        <span className="ml-2 text-sm text-[#a8a29e] font-sans">{rfp.sector}</span>
                      </div>
                    )}
                    {rfp.region && (
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#78716c] font-mono">Region:</span>
                        <span className="ml-2 text-sm text-[#a8a29e] font-sans">{rfp.region}</span>
                      </div>
                    )}
                  </div>

                  {/* Technology Tags */}
                  {rfp.technology && rfp.technology.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {rfp.technology.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded border border-[#44403c] bg-[#292524] text-xs text-[#78716c] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#44403c]">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#78716c] font-mono">Budget:</span>
                        <span className="ml-2 text-sm font-mono text-emerald-400 font-semibold">{rfp.budget}</span>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#78716c] font-mono">Deadline:</span>
                        <span className={`ml-2 text-sm font-mono ${rfp.status === 'Urgent' ? 'text-red-400' : 'text-[#a8a29e]'}`}>
                          {rfp.deadline}
                        </span>
                      </div>
                    </div>
                    {rfp.portal && (
                      <span className="px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wide border border-[#44403c] text-[#78716c]">
                        {rfp.portal}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

