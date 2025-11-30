'use client'

import { FileText, Siren, ExternalLink } from 'lucide-react'
import { procurementData } from '@/data/mockData'
import SourceIndicator from '@/components/ui/SourceIndicator'

export default function ProcurementFeed() {
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'RFP':
        return 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400'
      case 'Expression of Interest':
        return 'bg-amber-950/30 border-amber-600/50 text-amber-400'
      case 'Direct Purchase':
        return 'bg-blue-950/30 border-blue-600/50 text-blue-400'
      case 'RFI':
        return 'bg-purple-950/30 border-purple-600/50 text-purple-400'
      default:
        return 'bg-zinc-800 border-zinc-700 text-zinc-400'
    }
  }

  const getStatusIcon = (status: string) => {
    if (status === 'Urgent') {
      return <Siren className="h-3.5 w-3.5 text-red-400" strokeWidth={1.5} />
    }
    return <FileText className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.5} />
  }

  const getPortalBadgeColor = (portal?: string) => {
    switch (portal) {
      case 'Etimad':
        return 'bg-amber-950/30 border-amber-600/50 text-amber-400'
      case 'Direct':
        return 'bg-zinc-800 border-zinc-700 text-zinc-300'
      case 'News':
        return 'bg-orange-950/30 border-orange-600/50 text-orange-400'
      default:
        return 'bg-zinc-800 border-zinc-700 text-zinc-400'
    }
  }

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-mono font-semibold text-white uppercase tracking-wider">
              Live Giga-Tenders (AI & Tech)
            </h3>
            <SourceIndicator source="Etimad Portal & Direct Sources" date="Nov 2024" confidence="High" />
          </div>
          <span className="text-xs font-mono text-zinc-500">{procurementData.length} Active</span>
        </div>
      </div>

      {/* Table/List View */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-950/30 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-zinc-500">
                Entity
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-zinc-500">
                Opportunity
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-zinc-500">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-zinc-500">
                Countdown
              </th>
              <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-zinc-500">
                Portal
              </th>
              <th className="px-6 py-3 text-right text-xs font-mono uppercase tracking-wider text-zinc-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {procurementData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
              >
                {/* Entity */}
                <td className="px-6 py-4">
                  <span className="text-sm font-mono font-semibold text-white">{item.entity}</span>
                </td>

                {/* Opportunity */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span className="text-sm text-white">{item.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wide border ${getTypeBadgeColor(
                        item.type
                      )}`}
                    >
                      {item.type}
                    </span>
                  </div>
                </td>

                {/* Value */}
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-emerald-400">{item.budget}</span>
                </td>

                {/* Countdown */}
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-mono ${
                      item.status === 'Urgent' || item.deadline === '5 Days'
                        ? 'text-red-400'
                        : item.deadline === 'Closed'
                          ? 'text-zinc-500'
                          : 'text-zinc-400'
                    }`}
                  >
                    {item.deadline}
                  </span>
                </td>

                {/* Portal */}
                <td className="px-6 py-4">
                  {item.portal && (
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wide border ${getPortalBadgeColor(
                        item.portal
                      )}`}
                    >
                      {item.portal}
                    </span>
                  )}
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-700 hover:border-[#00FF94]/50 hover:text-emerald-400 text-xs font-mono uppercase tracking-wide text-zinc-400 transition-colors">
                    <span>View Scope</span>
                    <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

