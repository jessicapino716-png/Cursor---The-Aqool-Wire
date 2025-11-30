"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '@/context/CurrencyContext';
import SourceIndicator from '@/components/ui/SourceIndicator';
import { Maximize2, X, Search } from 'lucide-react';

// Company logo paths
const COMPANY_LOGOS: Record<string, string> = {
  "PIF": "/logos/pif.svg",
  "Aramco Ventures": "/logos/aramco.svg",
  "Wa'ed Ventures": "/logos/waed.svg",
  "STV": "/logos/stv.svg",
  "RAED Ventures": "/logos/raed.svg",
};

// Data structure
const SOURCES = [
  { id: 0, name: "PIF", shortName: "PIF", value: 850, logo: COMPANY_LOGOS["PIF"] },
  { id: 1, name: "Aramco Ventures", shortName: "Aramco", value: 450, logo: COMPANY_LOGOS["Aramco Ventures"] },
  { id: 2, name: "Wa'ed Ventures", shortName: "Wa'ed", value: 320, logo: COMPANY_LOGOS["Wa'ed Ventures"] },
  { id: 3, name: "STV", shortName: "STV", value: 280, logo: COMPANY_LOGOS["STV"] },
  { id: 4, name: "RAED Ventures", shortName: "RAED", value: 195, logo: COMPANY_LOGOS["RAED Ventures"] },
];

const SECTORS = [
  { id: 5, name: "Fintech", color: "#34d399", value: 450 },
  { id: 6, name: "GenAI", color: "#3b82f6", value: 320 },
  { id: 7, name: "Logistics", color: "#eab308", value: 180 },
  { id: 8, name: "Health", color: "#f97316", value: 95 },
  { id: 9, name: "Gaming", color: "#a855f7", value: 150 },
  { id: 10, name: "Cyber", color: "#06b6d4", value: 120 },
  { id: 11, name: "CleanTech", color: "#34d399", value: 80 },
  { id: 12, name: "PropTech", color: "#f43f5e", value: 200 },
];

const FLOWS = [
  { source: 0, target: 5, value: 200 }, // PIF -> Fintech
  { source: 0, target: 6, value: 180 }, // PIF -> GenAI
  { source: 0, target: 7, value: 120 }, // PIF -> Logistics
  { source: 0, target: 8, value: 50 },  // PIF -> Health
  { source: 0, target: 9, value: 100 },  // PIF -> Gaming
  { source: 0, target: 10, value: 80 },  // PIF -> Cyber
  { source: 0, target: 11, value: 50 },  // PIF -> CleanTech
  { source: 0, target: 12, value: 70 },  // PIF -> PropTech
  { source: 1, target: 5, value: 150 },  // Aramco -> Fintech
  { source: 1, target: 6, value: 120 },  // Aramco -> GenAI
  { source: 1, target: 7, value: 60 },  // Aramco -> Logistics
  { source: 1, target: 12, value: 120 }, // Aramco -> PropTech
  { source: 2, target: 6, value: 200 }, // Wa'ed -> GenAI
  { source: 2, target: 10, value: 40 }, // Wa'ed -> Cyber
  { source: 2, target: 11, value: 30 }, // Wa'ed -> CleanTech
  { source: 2, target: 8, value: 50 },  // Wa'ed -> Health
  { source: 3, target: 5, value: 100 }, // STV -> Fintech
  { source: 3, target: 9, value: 50 }, // STV -> Gaming
  { source: 3, target: 7, value: 130 }, // STV -> Logistics
  { source: 4, target: 5, value: 95 },  // RAED -> Fintech
  { source: 4, target: 8, value: 45 },  // RAED -> Health
  { source: 4, target: 12, value: 10 }, // RAED -> PropTech
  { source: 4, target: 11, value: 45 },  // RAED -> CleanTech
];

export default function CapitalAnemone() {
  const { formatValue } = useCurrency();
  const [hoveredCell, setHoveredCell] = useState<{ source: number; target: number } | null>(null);
  const [selectedSource, setSelectedSource] = useState<number | null>(null);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter sources and sectors based on search query
  const filteredSources = searchQuery
    ? SOURCES.filter(source => 
        source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.shortName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SOURCES;

  const filteredSectors = searchQuery
    ? SECTORS.filter(sector => 
        sector.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SECTORS;

  // Filter flows to only show those with visible sources and sectors
  const visibleFlows = FLOWS.filter(flow => 
    filteredSources.some(s => s.id === flow.source) &&
    filteredSectors.some(s => s.id === flow.target)
  );

  // Calculate max flow value for normalization (use visible flows when searching)
  const maxFlow = visibleFlows.length > 0 
    ? Math.max(...visibleFlows.map(f => f.value), 0)
    : Math.max(...FLOWS.map(f => f.value), 0);

  // Get flow value for a cell
  const getFlowValue = (sourceId: number, targetId: number) => {
    const flow = FLOWS.find(f => f.source === sourceId && f.target === targetId);
    return flow ? flow.value : 0;
  };

  // Get total for source (only visible flows)
  const getSourceTotal = (sourceId: number) => {
    return visibleFlows.filter(f => f.source === sourceId).reduce((sum, f) => sum + f.value, 0);
  };

  // Get total for sector (only visible flows)
  const getSectorTotal = (targetId: number) => {
    return visibleFlows.filter(f => f.target === targetId).reduce((sum, f) => sum + f.value, 0);
  };

  // Calculate total from visible flows when searching, otherwise all flows
  const totalValue = searchQuery 
    ? visibleFlows.reduce((sum, f) => sum + f.value, 0)
    : FLOWS.reduce((sum, f) => sum + f.value, 0);

  // Matrix content component (reusable for both normal and expanded views)
  const MatrixContent = ({ isExpandedView = false }: { isExpandedView?: boolean }) => (
    <div className="flex-1 overflow-auto p-6 pt-16">
      <div className="w-full h-full min-w-[800px]">
        {/* Matrix Grid */}
        <div className="grid grid-cols-[140px_repeat(8,1fr)] gap-2">
          
          {/* Header row */}
          <div className="sticky top-0 z-10 bg-[#1c1917]/95 backdrop-blur-sm"></div>
          {filteredSectors.map((sector) => (
            <div
              key={sector.id}
              className="sticky top-0 z-10 bg-[#1c1917]/95 backdrop-blur-sm p-3 rounded border-2 transition-all cursor-pointer border-[#44403c] hover:border-[#44403c]/60"
              style={{
                borderColor: selectedSector === sector.id ? sector.color : undefined,
              }}
              onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
            >
              <div className="text-center">
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: sector.color }}
                />
                <p className="text-[10px] font-serif text-[#a8a29e] font-medium mb-1">
                  {sector.name}
                </p>
                  <p className="text-[10px] font-mono text-[#a8a29e] font-semibold">
                    {formatValue(getSectorTotal(sector.id) * 1000000).replace(/\s/g, '')}
                  </p>
              </div>
            </div>
          ))}

            {/* Source rows */}
            {filteredSources.map((source) => {
            const sourceTotal = getSourceTotal(source.id);
            const isSourceSelected = selectedSource === source.id;
            
            return (
              <React.Fragment key={source.id}>
                {/* Source label column */}
                <div
                  className={`p-3 rounded border transition-all cursor-pointer flex items-center gap-3 ${
                    isSourceSelected
                      ? 'border-emerald-400 border-2 bg-emerald-400/5'
                      : 'border-[#44403c] hover:border-[#44403c]/60 bg-[#1c1917]/50'
                  }`}
                  onClick={() => setSelectedSource(isSourceSelected ? null : source.id)}
                >
                  <div className="w-10 h-10 rounded-full bg-[#292524] border border-[#44403c] flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-serif font-bold text-[#a8a29e]">
                      {source.shortName.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-serif text-[#a8a29e] font-medium truncate">
                      {source.shortName}
                    </p>
                      <p className="text-[10px] font-mono text-[#a8a29e] font-semibold">
                        {formatValue(sourceTotal * 1000000).replace(/\s/g, '')}
                      </p>
                  </div>
                </div>

                  {/* Flow cells */}
                  {filteredSectors.map((sector) => {
                  const flowValue = getFlowValue(source.id, sector.id);
                  const intensity = flowValue / maxFlow;
                  const isCellSelected = 
                    (selectedSource === source.id || selectedSource === null) &&
                    (selectedSector === sector.id || selectedSector === null);
                  const isHovered = hoveredCell?.source === source.id && hoveredCell?.target === sector.id;
                  const isHighlighted = isCellSelected && (isHovered || flowValue > 0);

                  return (
                    <motion.div
                      key={`${source.id}-${sector.id}`}
                      className={`relative rounded border-2 transition-all cursor-pointer ${
                        isHighlighted ? '' : 'border-[#44403c]/30'
                      } ${flowValue === 0 ? 'bg-[#1c1917]/20' : ''}`}
                      style={{
                        borderColor: isHighlighted ? sector.color : undefined,
                        backgroundColor: flowValue > 0
                          ? `${sector.color}${Math.floor(intensity * 15).toString(16).padStart(2, '0')}`
                          : undefined,
                        // Add subtle gradient overlay for better text contrast
                        backgroundImage: flowValue > 0 
                          ? `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))`
                          : undefined,
                      }}
                      onHoverStart={() => setHoveredCell({ source: source.id, target: sector.id })}
                      onHoverEnd={() => setHoveredCell(null)}
                      onClick={() => {
                        if (flowValue > 0) {
                          setSelectedSource(source.id);
                          setSelectedSector(sector.id);
                        }
                      }}
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                    >
                        {flowValue > 0 && (
                          <>
                            {/* Value label with better visibility */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative">
                                {/* Text shadow background for better contrast */}
                                <span
                                  className="absolute inset-0 text-[13px] font-mono font-bold text-black blur-[2px] opacity-70"
                                  style={{ 
                                    WebkitTextStroke: '1.5px rgba(0,0,0,0.9)',
                                    textShadow: '0 0 10px rgba(0,0,0,1), 0 0 5px rgba(0,0,0,0.9)'
                                  }}
                                >
                                  {formatValue(flowValue * 1000000).replace(/\s/g, '')}
                                </span>
                                {/* Main text */}
                                <span
                                  className="relative text-[13px] font-mono font-bold text-white"
                                  style={{ 
                                    textShadow: '0 0 8px rgba(0,0,0,1), 0 0 4px rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,1), 0 1px 2px rgba(0,0,0,0.8)',
                                    WebkitTextStroke: '0.8px rgba(255,255,255,0.4)',
                                    letterSpacing: '0.5px'
                                  }}
                                >
                                  {formatValue(flowValue * 1000000).replace(/\s/g, '')}
                                </span>
                              </div>
                            </div>

                          {/* Flow indicator bar */}
                          <div
                            className="absolute bottom-0 left-0 right-0 h-1 rounded-b"
                            style={{
                              backgroundColor: sector.color,
                              opacity: intensity,
                              height: `${Math.max(2, intensity * 100)}%`,
                            }}
                          />
                        </>
                      )}

                      {/* Empty state */}
                      {flowValue === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[8px] text-[#44403c]">—</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Normal View */}
      <div className="relative w-full h-[500px] glass-panel rounded-xl overflow-hidden flex flex-col">
        <div className="absolute top-6 left-6 z-20 flex items-center gap-4">
          <div>
            <h3 className="text-xs font-serif text-[#a8a29e] tracking-widest uppercase flex items-center gap-2 mb-2">
              Market Velocity
              <SourceIndicator source="MAGNiTT Q3" />
            </h3>
            {/* Total Flow in top left */}
            <div className="bg-[#1c1917]/80 backdrop-blur-sm border border-[#44403c] rounded-lg px-3 py-2">
              <p className="text-[9px] text-[#a8a29e] font-mono uppercase mb-0.5">
                {searchQuery ? 'Filtered Flow' : 'Total Flow'}
              </p>
              <p className="text-xl text-[#e7e5e4] font-serif font-semibold">
                {formatValue(totalValue * 1000000)}
              </p>
              {searchQuery && (
                <p className="text-[8px] text-[#78716c] font-mono mt-1">
                  {filteredSources.length} sources, {filteredSectors.length} sectors
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Search and Expand buttons */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          {/* Search input */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or sector..."
              className="bg-[#1c1917]/80 backdrop-blur-sm border border-[#44403c] rounded-lg pl-9 pr-3 py-2 text-[#a8a29e] text-[10px] font-mono placeholder-[#78716c] focus:outline-none focus:border-emerald-400 focus:bg-[#1c1917] transition-colors w-48"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#a8a29e]"
              >
                <X size={12} />
              </button>
            )}
          </div>
          
          {/* Expand button */}
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 bg-[#1c1917]/80 backdrop-blur-sm border border-[#44403c] rounded-lg px-3 py-2 hover:border-emerald-400 hover:bg-[#1c1917] transition-colors"
            title="Expand to full view"
          >
            <Maximize2 size={14} className="text-[#a8a29e]" />
            <span className="text-[9px] text-[#a8a29e] font-mono">Expand</span>
          </button>
        </div>

        <MatrixContent />

        {/* Click info panel */}
        <AnimatePresence>
          {(selectedSource !== null || selectedSector !== null || hoveredCell) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-[#1c1917]/95 backdrop-blur-md border border-[#44403c] rounded-lg px-6 py-4 shadow-2xl min-w-[300px]"
            >
              {(() => {
                // Show selected source info
                if (selectedSource !== null && selectedSector === null) {
                  const source = SOURCES.find(s => s.id === selectedSource);
                  if (!source) return null;
                  const relatedFlows = visibleFlows.filter(f => f.source === selectedSource);
                  const total = relatedFlows.reduce((sum, f) => sum + f.value, 0);
                  
                  return (
                    <>
                      <p className="text-[10px] text-[#a8a29e] font-mono uppercase mb-2">
                        {source.name}
                      </p>
                      <p className="text-2xl text-[#e7e5e4] font-serif mb-2">
                        {formatValue(total * 1000000)}
                      </p>
                      <p className="text-[9px] text-[#78716c] font-mono">
                        {relatedFlows.length} investments across {new Set(relatedFlows.map(f => f.target)).size} sectors
                      </p>
                    </>
                  );
                }
                
                // Show selected sector info
                if (selectedSector !== null && selectedSource === null) {
                  const sector = SECTORS.find(s => s.id === selectedSector);
                  if (!sector) return null;
                  const relatedFlows = visibleFlows.filter(f => f.target === selectedSector);
                  const total = relatedFlows.reduce((sum, f) => sum + f.value, 0);
                  
                  return (
                    <>
                      <p className="text-[10px] text-[#a8a29e] font-mono uppercase mb-2">
                        {sector.name}
                      </p>
                      <p className="text-2xl text-[#e7e5e4] font-serif mb-2" style={{ color: sector.color }}>
                        {formatValue(total * 1000000)}
                      </p>
                      <p className="text-[9px] text-[#78716c] font-mono">
                        {relatedFlows.length} investments from {new Set(relatedFlows.map(f => f.source)).size} sources
                      </p>
                    </>
                  );
                }
                
                // Show specific flow info (cell clicked or hovered)
                if (hoveredCell || (selectedSource !== null && selectedSector !== null)) {
                  const sourceId = selectedSource !== null ? selectedSource : hoveredCell?.source;
                  const targetId = selectedSector !== null ? selectedSector : hoveredCell?.target;
                  
                  if (sourceId !== undefined && targetId !== undefined) {
                    const flow = FLOWS.find(f => f.source === sourceId && f.target === targetId);
                    if (!flow || flow.value === 0) return null;
                    const source = SOURCES.find(s => s.id === flow.source);
                    const sector = SECTORS.find(s => s.id === flow.target);
                    if (!source || !sector) return null;

                    return (
                      <>
                        <p className="text-[10px] text-[#a8a29e] font-mono uppercase mb-2">
                          {source.name} → {sector.name}
                        </p>
                        <p className="text-2xl text-[#e7e5e4] font-serif" style={{ color: sector.color }}>
                          {formatValue(flow.value * 1000000)}
                        </p>
                      </>
                    );
                  }
                }
                
                return null;
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              onClick={() => setIsExpanded(false)}
            />

            {/* Expanded Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 glass-panel rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-[#44403c] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#e7e5e4] font-serif mb-2">
                      Market Velocity
                    </h2>
                    {/* Total Flow in expanded header */}
                    <div className="bg-[#1c1917]/80 backdrop-blur-sm border border-[#44403c] rounded-lg px-4 py-2 inline-block">
                      <p className="text-[10px] text-[#a8a29e] font-mono uppercase mb-1">
                        {searchQuery ? 'Filtered Flow' : 'Total Flow'}
                      </p>
                      <p className="text-3xl text-[#e7e5e4] font-serif font-semibold">
                        {formatValue(totalValue * 1000000)}
                      </p>
                      {searchQuery && (
                        <p className="text-[9px] text-[#78716c] font-mono mt-1">
                          {filteredSources.length} sources, {filteredSectors.length} sectors
                        </p>
                      )}
                    </div>
                  </div>
                  <SourceIndicator source="MAGNiTT Q3" />
                </div>
                
                {/* Search in expanded view */}
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or sector..."
                    className="bg-[#1c1917]/80 backdrop-blur-sm border border-[#44403c] rounded-lg pl-10 pr-10 py-2 text-[#a8a29e] text-sm font-mono placeholder-[#78716c] focus:outline-none focus:border-emerald-400 focus:bg-[#1c1917] transition-colors w-64"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#a8a29e]"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded border border-[#44403c] hover:border-emerald-400 hover:bg-[#1c1917] transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-[#a8a29e] hover:text-emerald-400" strokeWidth={1.5} />
                </button>
              </div>

              {/* Expanded Content */}
              <div className="flex-1 overflow-auto">
                <MatrixContent isExpandedView={true} />

                {/* Click info panel for expanded view */}
                <AnimatePresence>
                  {(selectedSource !== null || selectedSector !== null || hoveredCell) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 bg-[#1c1917]/95 backdrop-blur-md border border-[#44403c] rounded-lg px-6 py-4 shadow-2xl min-w-[300px]"
                    >
                      {(() => {
                        // Show selected source info
                        if (selectedSource !== null && selectedSector === null) {
                          const source = SOURCES.find(s => s.id === selectedSource);
                          if (!source) return null;
                          const relatedFlows = visibleFlows.filter(f => f.source === selectedSource);
                          const total = relatedFlows.reduce((sum, f) => sum + f.value, 0);
                          
                          return (
                            <>
                              <p className="text-[10px] text-[#a8a29e] font-mono uppercase mb-2">
                                {source.name}
                              </p>
                              <p className="text-2xl text-[#e7e5e4] font-serif mb-2">
                                {formatValue(total * 1000000)}
                              </p>
                              <p className="text-[9px] text-[#78716c] font-mono">
                                {relatedFlows.length} investments across {new Set(relatedFlows.map(f => f.target)).size} sectors
                              </p>
                            </>
                          );
                        }
                        
                        // Show selected sector info
                        if (selectedSector !== null && selectedSource === null) {
                          const sector = SECTORS.find(s => s.id === selectedSector);
                          if (!sector) return null;
                          const relatedFlows = visibleFlows.filter(f => f.target === selectedSector);
                          const total = relatedFlows.reduce((sum, f) => sum + f.value, 0);
                          
                          return (
                            <>
                              <p className="text-[10px] text-[#a8a29e] font-mono uppercase mb-2">
                                {sector.name}
                              </p>
                              <p className="text-2xl text-[#e7e5e4] font-serif mb-2" style={{ color: sector.color }}>
                                {formatValue(total * 1000000)}
                              </p>
                              <p className="text-[9px] text-[#78716c] font-mono">
                                {relatedFlows.length} investments from {new Set(relatedFlows.map(f => f.source)).size} sources
                              </p>
                            </>
                          );
                        }
                        
                        // Show specific flow info (cell clicked or hovered)
                        if (hoveredCell || (selectedSource !== null && selectedSector !== null)) {
                          const sourceId = selectedSource !== null ? selectedSource : hoveredCell?.source;
                          const targetId = selectedSector !== null ? selectedSector : hoveredCell?.target;
                          
                          if (sourceId !== undefined && targetId !== undefined) {
                            const flow = FLOWS.find(f => f.source === sourceId && f.target === targetId);
                            if (!flow || flow.value === 0) return null;
                            const source = SOURCES.find(s => s.id === flow.source);
                            const sector = SECTORS.find(s => s.id === flow.target);
                            if (!source || !sector) return null;

                            return (
                              <>
                                <p className="text-[11px] text-[#a8a29e] font-mono uppercase mb-2">
                                  {source.name} → {sector.name}
                                </p>
                                <p className="text-2xl text-[#e7e5e4] font-serif" style={{ color: sector.color }}>
                                  {formatValue(flow.value * 1000000)}
                                </p>
                              </>
                            );
                          }
                        }
                        
                        return null;
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
