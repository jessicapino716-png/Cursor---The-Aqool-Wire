export interface FundingFlow {
  id?: string
  source_institution: string
  destination_sector: string
  amount_local_currency: number
  year: number
  evidence_snippet: string
  investor_origin: 'KSA' | 'USA' | 'UAE' | 'UK' | 'EU' | 'Other'
  giga_alignment: 'High' | 'Medium' | 'Low'
}

export interface MarketGap {
  id?: string
  numeric_gap_estimate: number
  [key: string]: any // Allow for other fields in the table
}

export type ActivityLevel = 'low' | 'moderate' | 'high'

export interface DataCenter {
  id: string
  name: string
  latitude: number
  longitude: number
  activity_level: ActivityLevel
  type: 'investments' | 'infrastructure'
}

export interface CoInvestmentRelationship {
  investorA: string
  investorB: string
  dealsTogether: number
}

export interface ResearchSignal {
  id: string
  title: string
  source: string
  type: 'Research' | 'Patent' | 'Grant'
  tag: string
  commercial_potential: 'High' | 'Medium' | 'Low'
}

export type BattlemapStatus = 'LOCKED' | 'PILOT' | 'OPEN' | 'TENDER'

export interface BattlemapCell {
  status: BattlemapStatus
  competitorName?: string
  mouPartner?: string
  expiryDate?: string
  rfpTitle?: string
}

export interface HealthcareBattlemap {
  categories: string[]
  entities: {
    group: 'Giga-Projects' | 'Government' | 'Private'
    names: string[]
  }[]
  cells: Record<string, BattlemapCell> // Key format: "entityName-categoryName"
}

export interface ProcurementItem {
  id?: string
  entity: string
  title: string
  type: 'RFP' | 'Expression of Interest' | 'Direct Purchase' | 'RFI'
  budget: string
  deadline: string
  status: 'Open' | 'Urgent' | 'Awarded' | 'Closed'
  portal?: 'Etimad' | 'Direct' | 'News'
  sector?: string
  region?: string
  technology?: string[]
  description?: string
}

export interface VettingProfile {
  trustScore: number // 0-100
  regulatoryStatus: string
  origin: string
  usValidation: string
  auditor: string
  kycBadges: string[]
  sourceOfWealth?: string[]
  validationPartners?: string[]
}

export interface Regulation {
  id: string
  title: string
  authority: string
  type: 'Law' | 'Policy' | 'Guideline'
  date: string
  summary: string
  impactLevel: 'High' | 'Medium' | 'Low'
  url: string
}

export interface MOU {
  id: string
  title: string
  description: string
  status: 'SIGNED' | 'IN PROGRESS' | 'ANNOUNCED' | 'COMPLETED'
  date: string
  amount_usd: number
  amount_sar: number
  parties: string[]
  sector: string
  segment: string
  capital_type: string
  province?: string
  expected_completion?: string
  target_date?: string
  expected_impact?: string
  key_metrics?: {
    label: string
    value: string
  }[]
  tags: string[]
  additional_info?: string
}

