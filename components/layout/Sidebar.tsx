"use client";

"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  region: string;
  sector: string;
  capitalType: string;
  timeframe: string;
  aiSegment: string;
}

export default function Sidebar({ onFilterChange }: SidebarProps) {
  const pathname = usePathname();
  const [filters, setFilters] = useState<FilterState>({
    region: 'All 13 Regions',
    sector: 'Cross-sector',
    capitalType: 'All',
    timeframe: '2022 – Today',
    aiSegment: 'All segments',
  });

  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [isAISegmentOpen, setIsAISegmentOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const navigationItems = [
    { id: 'observatory', label: 'AI Investment Observatory', path: '/' },
    { id: 'infrastructure', label: 'Infrastructure & Data Map', path: '/infrastructure' },
    { id: 'insights', label: 'Insight Series', path: '/insights' },
  ];

  const sectors = ['Cross-sector', 'Finance', 'Energy', 'Health', 'Logistics'];
  const capitalTypes = ['All', 'Public', 'Private', 'Sovereign'];
  const regions = ['All 13 Regions', 'Riyadh', 'Eastern Province', 'Makkah', 'Madinah', 'Qassim', 'Asir', 'Tabuk', 'Hail', 'Northern Borders', 'Jazan', 'Najran', 'Al Baha', 'Al Jouf'];
  const timeframes = ['2022 – Today', '2024', '2023', '2022', 'All Time'];
  const aiSegments = ['All segments', 'GenAI', 'ML Infrastructure', 'Computer Vision', 'NLP', 'Robotics', 'Edge AI'];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 h-screen bg-[#1c1917] border-r border-[#44403c] flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-[#44403c]">
        <div className="flex items-center gap-3">
          {/* Radial Burst Logo */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg width="64" height="64" viewBox="0 0 64 64" className="absolute inset-0">
              <defs>
                {/* Horizontal gradient for center circle - green on left to blue on right */}
                <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00FF94" />
                  <stop offset="50%" stopColor="#1DD8A8" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              {/* Burst rays - exactly 32 short, thick rectangular lines radiating outward */}
              {Array.from({ length: 32 }).map((_, i) => {
                const angle = (i * 360) / 32;
                const rad = (angle * Math.PI) / 180;
                
                // Calculate horizontal position of ray endpoint to determine gradient color
                // Center is at x=32, rays extend to radius 26, so x ranges from 6 to 58
                const endX = 32 + 26 * Math.cos(rad);
                // Normalize to 0-1 range (left to right across the circle)
                const normalizedX = (endX - 6) / 52;
                const clampedX = Math.max(0, Math.min(1, normalizedX));
                
                // Interpolate color based on horizontal position
                // Green #00FF94 (0, 255, 148) -> Teal #1DD8A8 (29, 216, 168) -> Blue #3b82f6 (59, 130, 246)
                let r, g, b;
                if (clampedX < 0.5) {
                  // Left half: green (#00FF94) to teal (#1DD8A8)
                  const t = clampedX * 2;
                  r = Math.round(0 + (29 - 0) * t);
                  g = Math.round(255 + (216 - 255) * t);
                  b = Math.round(148 + (168 - 148) * t);
                } else {
                  // Right half: teal (#1DD8A8) to blue (#3b82f6)
                  const t = (clampedX - 0.5) * 2;
                  r = Math.round(29 + (59 - 29) * t);
                  g = Math.round(216 + (130 - 216) * t);
                  b = Math.round(168 + (246 - 168) * t);
                }
                const color = `rgb(${r}, ${g}, ${b})`;
                
                // Create short, thick rectangular rays
                const startRadius = 6;
                const endRadius = 26;
                const x1 = 32 + startRadius * Math.cos(rad);
                const y1 = 32 + startRadius * Math.sin(rad);
                const x2 = 32 + endRadius * Math.cos(rad);
                const y2 = 32 + endRadius * Math.sin(rad);
                
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                );
              })}
              {/* Center circle with subtle horizontal gradient - green on left to blue on right */}
              <circle cx="32" cy="32" r="5" fill="url(#centerGradient)" />
            </svg>
          </div>
          {/* Text - Three lines as per logo design */}
          <div className="flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.15em] text-white font-sans leading-tight">THE</span>
            <span className="text-lg font-bold uppercase tracking-tight text-white font-sans leading-tight">AQOOL</span>
            <span className="text-lg font-bold uppercase tracking-tight text-white font-sans leading-tight">WIRE</span>
          </div>
        </div>
      </div>

      {/* WORKSPACE Section */}
      <div className="p-4 border-b border-[#44403c]">
        <h3 className="text-xs uppercase tracking-wider text-emerald-400 font-sans mb-3">WORKSPACE</h3>
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className={`block px-3 py-2 rounded-lg text-sm font-sans transition-all ${
                isActive(item.path)
                  ? 'bg-[#292524] border border-[#3b82f6] text-white shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                  : 'text-[#a8a29e] hover:bg-[#292524] hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* FILTERS Section */}
      <div className="flex-1 p-4 space-y-6">
        <h3 className="text-xs uppercase tracking-wider text-[#78716c] font-sans">FILTERS</h3>

        {/* Region Filter */}
        <div>
          <label className="block text-sm text-white font-sans mb-2">Region</label>
          <div className="relative">
            <button
              onClick={() => setIsRegionOpen(!isRegionOpen)}
              className="w-full px-3 py-2 bg-[#292524] border border-white/20 rounded-lg text-sm text-white font-sans flex items-center justify-between hover:border-white/40 transition-colors"
            >
              <span>{filters.region}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isRegionOpen ? 'rotate-180' : ''}`} />
            </button>
            {isRegionOpen && (
              <div className="absolute z-10 w-full mt-1 bg-[#292524] border border-white/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => {
                      handleFilterChange('region', region);
                      setIsRegionOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-white hover:bg-[#1c1917] transition-colors font-sans"
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sector Filter */}
        <div>
          <label className="block text-sm text-white font-sans mb-2">Sector</label>
          <div className="flex flex-wrap gap-2">
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => handleFilterChange('sector', sector)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all ${
                  filters.sector === sector
                    ? 'bg-emerald-400 text-white shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                    : 'bg-[#292524] text-white border border-white/20 hover:border-white/40'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>

        {/* Capital Type Filter */}
        <div>
          <label className="block text-sm text-white font-sans mb-2">Capital Type</label>
          <div className="flex flex-wrap gap-2">
            {capitalTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange('capitalType', type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all ${
                  filters.capitalType === type
                    ? 'bg-emerald-400 text-white shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                    : 'bg-[#292524] text-white border border-white/20 hover:border-white/40'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Timeframe Filter */}
        <div>
          <label className="block text-sm text-white font-sans mb-2">Timeframe</label>
          <div className="relative">
            <button
              onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
              className="w-full px-3 py-2 bg-[#292524] border border-white/20 rounded-lg text-sm text-white font-sans flex items-center justify-between hover:border-white/40 transition-colors"
            >
              <span>{filters.timeframe}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isTimeframeOpen ? 'rotate-180' : ''}`} />
            </button>
            {isTimeframeOpen && (
              <div className="absolute z-10 w-full mt-1 bg-[#292524] border border-white/20 rounded-lg shadow-lg">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => {
                      handleFilterChange('timeframe', timeframe);
                      setIsTimeframeOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-white hover:bg-[#1c1917] transition-colors font-sans"
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Segment Filter */}
        <div>
          <label className="block text-sm text-white font-sans mb-2">AI Segment</label>
          <div className="relative">
            <button
              onClick={() => setIsAISegmentOpen(!isAISegmentOpen)}
              className="w-full px-3 py-2 bg-[#292524] border border-white/20 rounded-lg text-sm text-white font-sans flex items-center justify-between hover:border-white/40 transition-colors"
            >
              <span>{filters.aiSegment}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isAISegmentOpen ? 'rotate-180' : ''}`} />
            </button>
            {isAISegmentOpen && (
              <div className="absolute z-10 w-full mt-1 bg-[#292524] border border-white/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {aiSegments.map((segment) => (
                  <button
                    key={segment}
                    onClick={() => {
                      handleFilterChange('aiSegment', segment);
                      setIsAISegmentOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-white hover:bg-[#1c1917] transition-colors font-sans"
                  >
                    {segment}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

