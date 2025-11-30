'use client'

import { mockDataCenters } from '@/data/mockData'
import type { ActivityLevel, DataCenter } from '@/types/database'
import { ComposableMap, Geographies, Geography, Graticule, Marker, Sphere } from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const activityColors: Record<ActivityLevel, string> = {
  low: '#1D4ED8',
  moderate: '#3B82F6',
  high: '#34d399',
}

const activityLabel: Record<ActivityLevel, string> = {
  low: 'Idle',
  moderate: 'Active',
  high: 'Peak',
}

function renderMarker(center: DataCenter) {
  const baseColor = activityColors[center.activity_level]
  const radius = center.activity_level === 'high' ? 7 : center.activity_level === 'moderate' ? 6 : 5

  return (
    <Marker coordinates={[center.longitude, center.latitude]} key={center.id}>
      <g>
        <circle r={radius} fill={baseColor} fillOpacity={0.65} stroke="#0f172a" strokeWidth={1} />
        <circle r={radius} fill="none" stroke={baseColor} strokeWidth={1.5} strokeOpacity={0.8}>
          <animate attributeName="r" from={radius} to={radius + 18} dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.7" to="0" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </Marker>
  )
}

export default function InfrastructureMap() {
  return (
    <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-[0_0_80px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Infrastructure</p>
          <h3 className="text-xl font-semibold text-white">Data Center Pulse Map</h3>
        </div>
        <div className="flex gap-3 text-xs text-zinc-400">
          {(['high', 'moderate', 'low'] as ActivityLevel[]).map((level) => (
            <div key={level} className="flex items-center gap-1 font-mono">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activityColors[level] }} />
              {activityLabel[level]}
            </div>
          ))}
        </div>
      </div>
      <div className="relative aspect-[4/3] rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 overflow-hidden">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [44, 24],
            scale: 1900,
          }}
          className="w-full h-full"
        >
          <Sphere stroke="#0f172a" strokeWidth={0.5} fill="#050910" />
          <Graticule stroke="#1e293b" strokeOpacity={0.2} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#0f172a"
                  stroke="#1e293b"
                  strokeWidth={0.2}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#152238', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {mockDataCenters.map(renderMarker)}
        </ComposableMap>
      </div>
    </div>
  )
}

