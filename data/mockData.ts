import { FundingFlow, MarketGap } from '@/types/database'

export const mockFundingFlows: FundingFlow[] = [
  {
    id: '1',
    source_institution: 'Saudi Public Investment Fund',
    destination_sector: 'Artificial Intelligence',
    amount_local_currency: 500000000,
    year: 2024,
    evidence_snippet: 'The PIF announced a $500M investment in AI infrastructure to support Vision 2030 goals, focusing on machine learning research and development centers across the Kingdom.',
  },
  {
    id: '2',
    source_institution: 'NEOM Tech & Digital Company',
    destination_sector: 'Machine Learning',
    amount_local_currency: 250000000,
    year: 2024,
    evidence_snippet: 'NEOM committed $250M to establish advanced ML research facilities, partnering with leading global tech companies to develop next-generation AI solutions for smart cities.',
  },
  {
    id: '3',
    source_institution: 'King Abdullah University of Science and Technology',
    destination_sector: 'Deep Learning',
    amount_local_currency: 180000000,
    year: 2023,
    evidence_snippet: 'KAUST allocated $180M for deep learning research initiatives, establishing new labs and attracting top AI researchers to work on cutting-edge neural network architectures.',
  },
  {
    id: '4',
    source_institution: 'Saudi Aramco Ventures',
    destination_sector: 'AI for Energy',
    amount_local_currency: 320000000,
    year: 2024,
    evidence_snippet: 'Aramco Ventures invested $320M in AI-powered energy solutions, focusing on predictive maintenance, optimization algorithms, and autonomous operations for oil and gas facilities.',
  },
  {
    id: '5',
    source_institution: 'STC Ventures',
    destination_sector: 'Natural Language Processing',
    amount_local_currency: 150000000,
    year: 2023,
    evidence_snippet: 'STC Ventures dedicated $150M to NLP technologies, developing Arabic language AI models and conversational AI systems for customer service and digital transformation.',
  },
  {
    id: '6',
    source_institution: 'Saudi Data and AI Authority',
    destination_sector: 'Computer Vision',
    amount_local_currency: 220000000,
    year: 2024,
    evidence_snippet: 'SDAIA invested $220M in computer vision technologies for smart city applications, including facial recognition systems, autonomous vehicle perception, and medical imaging AI.',
  },
  {
    id: '7',
    source_institution: 'Al Rajhi Bank',
    destination_sector: 'FinTech AI',
    amount_local_currency: 95000000,
    year: 2023,
    evidence_snippet: 'Al Rajhi Bank allocated $95M to AI-driven financial technology solutions, implementing fraud detection systems, algorithmic trading platforms, and personalized banking services.',
  },
  {
    id: '8',
    source_institution: 'King Fahd University of Petroleum & Minerals',
    destination_sector: 'Robotics & AI',
    amount_local_currency: 120000000,
    year: 2024,
    evidence_snippet: 'KFUPM committed $120M to robotics and AI research, developing autonomous systems for industrial applications and establishing partnerships with international robotics companies.',
  },
  {
    id: '9',
    source_institution: 'Saudi Telecom Company',
    destination_sector: 'AI Infrastructure',
    amount_local_currency: 280000000,
    year: 2024,
    evidence_snippet: 'STC invested $280M in AI infrastructure development, including cloud computing resources, edge AI capabilities, and 5G-enabled AI applications for enterprise customers.',
  },
  {
    id: '10',
    source_institution: 'Misk Foundation',
    destination_sector: 'AI Education',
    amount_local_currency: 75000000,
    year: 2023,
    evidence_snippet: 'Misk Foundation dedicated $75M to AI education programs, training thousands of Saudi youth in machine learning, data science, and AI development through partnerships with leading universities.',
  },
]

export const mockMarketGaps: MarketGap[] = [
  {
    id: '1',
    numeric_gap_estimate: 850000000,
  },
  {
    id: '2',
    numeric_gap_estimate: 620000000,
  },
  {
    id: '3',
    numeric_gap_estimate: 450000000,
  },
  {
    id: '4',
    numeric_gap_estimate: 380000000,
  },
  {
    id: '5',
    numeric_gap_estimate: 290000000,
  },
]

