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
- **Table: `regulations`** (New)
  - `id`, `title`, `authority` (SDAIA, NCA, CMA), `type` (Law/Policy/Guideline)
  - `date`, `summary`, `impactLevel` (High/Medium/Low), `url`

## 4. Current Progress
- [x] Scaffolded Next.js App.
- [x] Created core data components (`DealTable`, `GapAnalysis`).
- [x] Implemented Mock Data (`mockData.ts`) to bypass missing API keys.
- [x] **Visual Polish Complete (v1):** Financial-terminal theme with JetBrains Mono + grid borders.
- [x] **Neo-Terminal Overhaul (Investor View v1.5):**
  - [x] Added dual font stack (Inter for body, JetBrains Mono for data)
  - [x] Introduced `Shell` wrapper with command-bar style header
  - [x] Implemented Bento layout: Infrastructure Map, Key Metrics, Deal Ticker
  - [x] Built pulsing Data Center map (dark geo visualization with activity colors)
  - [x] Transformed Deal Table into auto-scrolling ticker with tooltips
  - [x] Updated palette to Zinc-950 + Neon Green (#00FF94) + Electric Blue (#3B82F6)
  - [x] Added `NewsTicker` (Framer Motion) for looping Wire headlines under the command bar
- [x] **Phase 1 · Investment Observatory (current focus):**
  - [x] Hid infrastructure/map modules to concentrate on capital intelligence
  - [x] Added `mockFundingFlows` metadata (`investor_origin`, `giga_alignment`)
  - [x] Introduced `KeyTickers` (Total Capital, Active Deals, Foreign Inflow USD, Saudi Outflow SAR)
  - [x] Built `CapitalFlow` bridge (foreign investors → Saudi startups, split-bar visualization)
  - [x] Added `LocalVCActivity` vertical feed (Sanabil, STV, Raed, Impact46)
  - [x] Refactored `DealTable` into a dense grid with Investor Origin + Giga Alignment badges
  - [x] **Syndicate Web (Co-Investment Network):**
    - [x] Created `SyndicateGraph` component with CSS/Framer Motion node visualization
    - [x] Center node: Vision Fund / PIF (large, neon green)
    - [x] Major VCs: STV, Raed Ventures, 500 Global (medium, electric blue)
    - [x] International VCs: Sequoia, a16z, Mubadala, ADQ Ventures (small, zinc/green)
    - [x] Interactive hover highlighting: connections glow when hovering over nodes
    - [x] Added `mockCoInvestmentRelationships` data structure
    - [x] Integrated into Bento grid layout (2x2 square next to DealTable)
  - [x] **Deep Tech Radar (Lab-to-Market Intelligence):**
    - [x] Created `DeepTechRadar` component tracking pre-startup signals
    - [x] Scrollable watchlist with Research Papers, Patents, and University Grants
    - [x] Icons: Beaker (Research) and Scroll (Patent)
    - [x] Source highlighting: KAUST (Cyan), SDAIA (Gold), King Saud (Amber), NEOM (Emerald)
    - [x] Commercial Potential progress bars (High/Med/Low) with color coding
    - [x] Live status indicator with pulsing dot
    - [x] Added `mockResearchSignals` with 10 pre-startup signals
    - [x] Integrated as tall vertical column (spanning 2 rows) in Bento grid
  - [x] **Regulation Intelligence Module:**
    - [x] Created `RegulationFeed` component for tracking legal changes in Saudi AI ecosystem
    - [x] Added `Regulation` interface to `types/database.ts` (id, title, authority, type, date, summary, impactLevel, url)
    - [x] Added `mockRegulations` array with 3 entries (SDAIA, NCA, CMA regulations)
    - [x] Desert Modern styling (Warm Stone backgrounds, Sand text, Neon Green accents)
    - [x] Vertical card layout with authority badges, impact level pulse dots
    - [x] AI Summarize feature with accordion expansion and typing effect
    - [x] Simulated AI analysis generation based on regulation metadata

## 5. Current Status: Phase 1 "Investment Observatory"
The dashboard now centers exclusively on investment telemetry:

- `Shell` command bar + `NewsTicker` anchor the experience
- `KeyTickers` summarize capital KPIs (Year-to-date SAR + USD inflow/outflow assumptions)
- `CapitalFlow` visualizes foreign investors paired with Saudi recipients
- `LocalVCActivity` highlights top local VCs and recent bets
- `SyndicateGraph` shows co-investment network with interactive node hover
- `DeepTechRadar` tracks pre-startup signals (Research, Patents, Grants) with commercial potential scoring
- `RegulationFeed` tracks legal changes with AI-powered summarization (Desert Modern aesthetic)
- `GapAnalysis` heatmap remains available (standalone view) but is hidden from the main layout
- `DealTable` serves as the "Deal Feed" with origin + giga-project alignment context

**New Feature: Syndicate Web**
- Cyberpunk/Terminal aesthetic: thin glowing lines, monochromatic green/blue
- Hover over any node to highlight its connection lines
- Shows 13 co-investment relationships between major players
- Real-time connection count display on hover

**New Feature: Deep Tech Radar**
- Tracks "Lab-to-Market" signals: Research Papers, Patents, University Grants
- 10 pre-startup signals from KAUST, SDAIA, King Saud University, NEOM, Aramco Research
- Commercial Potential scoring (High/Medium/Low) with visual progress bars
- Institution-specific color coding for quick source identification
- Scrollable watchlist format for continuous monitoring

**New Feature: Regulation Intelligence Feed**
- Tracks legal changes from SDAIA, NCA, CMA authorities
- Desert Modern styling (Warm Stone backgrounds, Sand text, Neon Green accents)
- Vertical card layout with authority badges and impact level indicators
- AI Summarize feature with accordion expansion and typing effect animation
- Simulated AI analysis generates contextual insights based on regulation metadata
- 3 mock regulations: Generative AI Guidelines (SDAIA), Cloud Cybersecurity Controls (NCA), FinTech Exemption (CMA)

## 6. Design System: "Desert Modern"

- **Background:** Deep Warm Stone (`#0c0a09` / `#1c1917`). NOT Black.

- **Accents:** Humain Neon Green (`#00FF94`) + Oasis Blue (`#3b82f6`).

- **Typography:** Serif Headers (Playfair/Merriweather) + Monospace Data (JetBrains).

- **Vibe:** "Four Seasons meets Bloomberg." High-density data on luxury organic textures.

## 7. Current Components (Phase 1 Complete)

- **Visual:** `CapitalAnemone` (D3.js Organic Radial Flow).

- **Network:** `SyndicateGraph` (D3.js Force-Directed Galaxy).

- **Data:** `DealTable` (High density, Source Verified tooltips).

- **Intelligence:** `RegulationFeed` (AI Summaries of Saudi Laws).

- **Revenue:** `ProcurementFeed` (Live Giga-Project Tenders).

## 8. Next Steps
1. **Connect Real DB:** Replace `mockData` with `lib/supabase.ts` once API keys are provided.
2. **Capital Bridge Enhancement:** Upgrade to Sankey / animated chords when we finalize the visualization library.
3. **Syndicate Web Enhancement:** Consider D3.js or React Flow for more advanced graph layouts if needed.
4. **Command Layer:** Wire the command bar to a search/command palette for quick filtering + saved views.
