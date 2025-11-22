# PROJECT CONTEXT: The Aqool Wire (Frontend)

## 1. Project Vision
A "Bloomberg Terminal" for Saudi Arabia's AI Ecosystem.
- **Target Audience:** Investors, VCs, Strategy Teams.
- **Core Aesthetic:** Dark Mode, Neon Green Accents, Monospace Fonts (JetBrains Mono), High Density.

## 2. Technical Architecture
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Shadcn UI.
- **Backend (Kayode/CTO):** Supabase + Google Vertex RAG.
- **Current State:** Frontend is running on LOCALHOST using MOCK DATA.

## 3. Data Schema (Strict Alignment)
We are strictly mapped to the backend schema provided by Kayode:
- **Table: `funding_flows`**
  - `source_institution` (Investor)
  - `destination_sector` (Sector)
  - `amount_local_currency` (Ticket Size)
  - `evidence_snippet` (Source text from PDF - displayed via Tooltip)
- **Table: `market_gaps`**
  - `sector`
  - `qualitative_gap_level`
  - `numeric_gap_estimate` (Visualized via GapAnalysis component)

## 4. Current Progress
- [x] Scaffolded Next.js App.
- [x] Created `DealTable` and `GapAnalysis` components.
- [x] Implemented Mock Data (`mockData.ts`) to bypass missing API keys.
- [x] Styled for "Financial Terminal" look (Monospace fonts, borders).
- [x] **Visual Polish Complete (v1):**
  - [x] JetBrains Mono font configured and applied to all numeric values
  - [x] Subtle `border-slate-800` grid borders on table rows and columns
  - [x] Compact `py-2` padding for denser data display
  - [x] Sharp, thin progress bars in Gap Analysis (h-1.5, square edges)
  - [x] Financial terminal aesthetic finalized

## 5. Current Status: v1 Dashboard Complete
**Dashboard is now in v1 state and ready for investor review.**

The UI has been polished with:
- JetBrains Mono typography for all numbers and currency values
- Grid-like borders (border-slate-800) throughout the table
- Dense, compact layout optimized for data visibility
- Sharp progress bars in Gap Analysis component
- Dark mode financial terminal aesthetic with neon green accents

## 6. Next Steps
1. **Connect Real DB:** Replace `mockData` with `lib/supabase.ts` once API keys are provided.
2. **Geospatial Map:** Integrate Kepler.gl or Mapbox for the Infrastructure view.
3. **Additional Features:** Based on investor feedback and Kayode's backend capabilities.
