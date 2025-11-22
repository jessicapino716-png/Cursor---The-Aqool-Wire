# Aqool Wire Dashboard

A modern dashboard for visualizing funding flows and market gap analysis with dark mode styling and neon green accents.

## Features

- **Deal Table**: Displays funding flows from the `funding_flows` Supabase table
  - Shows investor, industry, value, and year
  - Info icon with tooltip for evidence snippets
- **Gap Analysis**: Visualizes market gaps from the `market_gaps` table
  - Progress bars showing numeric gap estimates

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### funding_flows
- `source_institution` (string): The investor
- `destination_sector` (string): The industry
- `amount_local_currency` (number): The value
- `year` (number): The time
- `evidence_snippet` (string): The source text (shown in tooltip)

### market_gaps
- `numeric_gap_estimate` (number): The gap value to visualize

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Lucide React (icons)

