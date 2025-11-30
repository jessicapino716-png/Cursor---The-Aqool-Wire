"use client";

import Shell from '@/components/layout/Shell';
import Sidebar from '@/components/layout/Sidebar';
import KeyTickers from '@/components/dashboard/KeyTickers';
import ImpactTracker from '@/components/dashboard/ImpactTracker';
import DealTable from '@/components/DealTable';
import GapAnalysis from '@/components/GapAnalysis';
import RegulationFeed from '@/components/dashboard/RegulationFeed';
import AICopilot from '@/components/dashboard/AICopilot';
import RFPChart from '@/components/dashboard/RFPChart';
import { SummaryCard } from '@/components/SummaryCard';
import { InvestmentTreemap } from '@/components/InvestmentTreemap';
import { TrendingUp, FileText, Scale } from 'lucide-react';
import { mockFundingFlows, mockRegulations } from '@/data/mockData';
import { useCurrency } from '@/context/CurrencyContext';

export default function Dashboard() {
  const { formatValue } = useCurrency();
  
  // Calculate summary metrics
  const totalInvestment = mockFundingFlows.reduce((sum, deal) => sum + deal.amount_local_currency, 0);
  const totalInvestmentFormatted = formatValue(totalInvestment);
  // Extract numeric value (remove currency symbols)
  const totalInvestmentValue = totalInvestmentFormatted.replace(/[^\d.]/g, '');
  const mousCount = 127; // From ImpactTracker/Summit deals
  const regulationsCount = mockRegulations.length;

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // TODO: Apply filters to data
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0c0a09]">
      {/* Sidebar */}
      <Sidebar onFilterChange={handleFilterChange} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Shell>
          <div className="flex flex-col w-full space-y-6 overflow-y-auto">
        
        {/* Summary Cards Row (from vibe_reference) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            label="Total Investment"
            value={totalInvestmentValue}
            unit="SAR"
            lastUpdated="2 hours ago"
            sourceUrl="https://example.com"
            sourceLabel="Saudi Press Agency"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <SummaryCard
            label="MOUs"
            value={mousCount.toString()}
            unit="Active"
            lastUpdated="1 day ago"
            sourceUrl="https://example.com"
            sourceLabel="Saudi Press Agency"
            icon={<FileText className="w-5 h-5" />}
            href="/mous"
          />
          <SummaryCard
            label="Regulations"
            value={regulationsCount.toString()}
            lastUpdated="3 days ago"
            sourceUrl="https://example.com"
            sourceLabel="SDAIA, NCA, CMA"
            icon={<Scale className="w-5 h-5" />}
          />
        </div>

        {/* Top Row: Key Metrics (4 cards) */}
        <div className="w-full">
          <KeyTickers />
        </div>

        {/* Summit Impact Tracker (Full Width) */}
        <div className="w-full">
          <ImpactTracker />
        </div>

        {/* Investment Treemap (from vibe_reference) */}
        <div className="w-full">
          <div className="glass-panel rounded-xl p-6 border border-[#44403c] bg-[#292524]/80 h-[600px] flex flex-col">
            <InvestmentTreemap
              data={{
                labels: [
                  'Total',
                  'AI Infrastructure',
                  'Healthcare AI',
                  'FinTech',
                  'Education Tech',
                  'Smart Cities',
                  'Data Centers',
                  'Cloud Computing',
                  'Diagnostics',
                  'Telemedicine',
                ],
                parents: [
                  '',
                  'Total',
                  'Total',
                  'Total',
                  'Total',
                  'Total',
                  'AI Infrastructure',
                  'AI Infrastructure',
                  'Healthcare AI',
                  'Healthcare AI',
                ],
                values: [0, 15000, 8000, 6000, 4000, 3000, 9000, 6000, 5000, 3000],
                text: [
                  'Total: 45.2B SAR',
                  'AI Infrastructure: 15B SAR',
                  'Healthcare AI: 8B SAR',
                  'FinTech: 6B SAR',
                  'Education Tech: 4B SAR',
                  'Smart Cities: 3B SAR',
                  'Data Centers: 9B SAR',
                  'Cloud Computing: 6B SAR',
                  'Diagnostics: 5B SAR',
                  'Telemedicine: 3B SAR',
                ],
              }}
              title="Investment Breakdown by Sector"
            />
          </div>
        </div>

        {/* RFP Chart - Active Tenders (Money Maker) */}
        <div className="w-full">
          <RFPChart />
        </div>

        {/* Main Row: DealTable (60%) and GapAnalysis (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Left: DealTable (60% - 3 columns) */}
          <div className="lg:col-span-3">
            <DealTable />
          </div>

          {/* Right: GapAnalysis (40% - 2 columns) */}
          <div className="lg:col-span-2">
            <GapAnalysis />
          </div>

        </div>

        {/* Regulation Feed and AI Copilot Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Regulation Feed (2 columns) */}
          <div className="lg:col-span-2">
            <div className="glass-panel rounded-xl p-6 border border-[#44403c] bg-[#292524]/80">
              <h2 className="text-2xl font-semibold mb-4 text-[#a8a29e] font-serif">Latest AI Regulations</h2>
              <RegulationFeed />
            </div>
          </div>

          {/* Right: AI Copilot (1 column) */}
          <div className="lg:col-span-1">
            <AICopilot />
          </div>
        </div>


          </div>
        </Shell>
      </div>
    </div>
  );
}
