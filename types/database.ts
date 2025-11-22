export interface FundingFlow {
  id?: string
  source_institution: string
  destination_sector: string
  amount_local_currency: number
  year: number
  evidence_snippet: string
}

export interface MarketGap {
  id?: string
  numeric_gap_estimate: number
  [key: string]: any // Allow for other fields in the table
}

