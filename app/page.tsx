import DealTable from '@/components/DealTable'
import GapAnalysis from '@/components/GapAnalysis'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white font-mono mb-1">
            Aqool Wire Dashboard
          </h1>
          <p className="text-gray-400 font-mono text-xs">
            Funding flows and market gap analysis
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DealTable />
          </div>
          <div className="lg:col-span-1">
            <GapAnalysis />
          </div>
        </div>
      </div>
    </main>
  )
}

