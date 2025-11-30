'use client'

import { useState } from 'react'
import { healthcareBattlemap } from '@/data/mockData'
import type { BattlemapCell } from '@/types/database'

export default function OpportunityMatrix() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  const getCellKey = (entityName: string, category: string) => {
    return `${entityName}-${category}`
  }

  const getCell = (entityName: string, category: string): BattlemapCell => {
    const key = getCellKey(entityName, category)
    return healthcareBattlemap.cells[key] || { status: 'OPEN' }
  }

  const getCellStyle = (cell: BattlemapCell) => {
    switch (cell.status) {
      case 'LOCKED':
        return 'bg-zinc-800/60 border-zinc-700 text-zinc-500'
      case 'PILOT':
        return 'bg-amber-950/30 border-amber-600/50 text-amber-400'
      case 'OPEN':
        return 'bg-zinc-900/40 border-zinc-800 border-dashed text-zinc-600'
      case 'TENDER':
        return 'bg-zinc-900/60 border-emerald-400 text-emerald-400 animate-pulse'
      default:
        return 'bg-zinc-900/40 border-zinc-800 text-zinc-600'
    }
  }

  const getCellContent = (cell: BattlemapCell) => {
    switch (cell.status) {
      case 'LOCKED':
        return (
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wide text-zinc-500">Locked</div>
            <div className="text-[9px] text-zinc-600 mt-0.5">{cell.competitorName}</div>
          </div>
        )
      case 'PILOT':
        return (
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wide text-amber-400">Pilot</div>
            <div className="text-[9px] text-amber-500/70 mt-0.5">{cell.mouPartner}</div>
            {cell.expiryDate && (
              <div className="text-[8px] text-amber-600/60 mt-0.5">Exp: {cell.expiryDate}</div>
            )}
          </div>
        )
      case 'OPEN':
        return (
          <div className="text-center text-zinc-600 text-[10px] uppercase tracking-wide">
            Open
          </div>
        )
      case 'TENDER':
        return (
          <div className="text-center">
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-emerald-400/50 bg-emerald-400/10">
              <span className="text-[9px] font-mono font-semibold text-emerald-400">RFP</span>
            </div>
            <div className="text-[9px] text-emerald-400/80 mt-1 leading-tight">{cell.rfpTitle}</div>
          </div>
        )
      default:
        return null
    }
  }

  const getHoverTooltip = (cell: BattlemapCell, entityName: string, category: string) => {
    if (!hoveredCell) return null
    
    const key = getCellKey(entityName, category)
    if (hoveredCell !== key) return null

    switch (cell.status) {
      case 'LOCKED':
        return (
          <div className="absolute z-50 px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-950 shadow-xl text-xs text-zinc-300 whitespace-nowrap -top-12 left-1/2 -translate-x-1/2">
            <div className="font-semibold text-red-400">Contract Holder:</div>
            <div>{cell.competitorName}</div>
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-zinc-700 bg-zinc-950" />
          </div>
        )
      case 'TENDER':
        return (
          <div className="absolute z-50 px-3 py-2 rounded-lg border border-emerald-400/50 bg-zinc-950 shadow-xl text-xs text-zinc-300 whitespace-nowrap -top-12 left-1/2 -translate-x-1/2">
            <div className="font-semibold text-emerald-400">Action:</div>
            <div>Submit Proposal</div>
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-emerald-400/50 bg-zinc-950" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/70 overflow-hidden">
      {/* Legend */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/80">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">Market Access Battlemap</p>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded border border-zinc-700 bg-zinc-800/60" />
            <span className="text-zinc-400 font-mono">LOCKED</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded border border-amber-600/50 bg-amber-950/30" />
            <span className="text-zinc-400 font-mono">PILOT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded border border-zinc-800 border-dashed bg-zinc-900/40" />
            <span className="text-zinc-400 font-mono">OPEN</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded border border-emerald-400 bg-zinc-900/60 animate-pulse" />
            <span className="text-zinc-400 font-mono">TENDER</span>
          </div>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
            <div className="flex">
              <div className="w-48 p-3 border-r border-zinc-800 bg-zinc-950/50">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono">Entity</p>
              </div>
              {healthcareBattlemap.categories.map((category) => (
                <div
                  key={category}
                  className="flex-1 min-w-[140px] p-3 border-r border-zinc-800 last:border-r-0"
                >
                  <p className="text-xs font-mono font-semibold text-white text-center">{category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          {healthcareBattlemap.entities.map((entityGroup) => (
            <div key={entityGroup.group}>
              {/* Group Header */}
              <div className="bg-zinc-950/70 border-b border-zinc-800/50">
                <div className="px-3 py-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono">
                    {entityGroup.group}
                  </p>
                </div>
              </div>

              {/* Entity Rows */}
              {entityGroup.names.map((entityName) => (
                <div
                  key={entityName}
                  className="flex border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
                >
                  {/* Entity Name Column */}
                  <div className="w-48 p-3 border-r border-zinc-800 bg-zinc-900/30">
                    <p className="text-sm font-mono text-white">{entityName}</p>
                  </div>

                  {/* Category Cells */}
                  {healthcareBattlemap.categories.map((category) => {
                    const cell = getCell(entityName, category)
                    const cellKey = getCellKey(entityName, category)
                    const isHovered = hoveredCell === cellKey

                    return (
                      <div
                        key={category}
                        className="flex-1 min-w-[140px] p-2 border-r border-zinc-800 last:border-r-0 relative"
                        onMouseEnter={() => setHoveredCell(cellKey)}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div
                          className={`h-full min-h-[80px] rounded border p-2 flex items-center justify-center transition-all ${
                            getCellStyle(cell)
                          } ${isHovered ? 'scale-105 shadow-lg' : ''}`}
                        >
                          {getCellContent(cell)}
                        </div>
                        {getHoverTooltip(cell, entityName, category)}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

