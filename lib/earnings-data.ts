// Types
export interface Payment {
  id: string;
  payoutDate: Date;
  type: 'Voice Recording' | 'Royalties' | 'Bonus';
  description: string;
  status: 'Paid' | 'Pending' | 'Processing';
  hours: number;
  earned: number; // in cents
}

export interface EarningsDataPoint {
  date: Date;
  paidEarnings: number;
  pendingEarnings: number;
}

export interface Contract {
  id: string;
  name: string;
}

export interface EarningsSummary {
  totalEarnings: number;
  paidEarnings: number;
  pendingEarnings: number;
}

export type PaymentType = 'all' | 'voice-recording' | 'royalties' | 'bonus';

// Mock Data
export const mockContracts: Contract[] = [
  { id: 'all', name: 'All Contracts' },
  { id: 'contract-1', name: 'TechCorp AI Voice' },
  { id: 'contract-2', name: 'E-Learning Bundle' },
  { id: 'contract-3', name: 'Podcast Series' },
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    payoutDate: new Date('2026-01-15'),
    type: 'Voice Recording',
    description: 'AI Assistant - Natural Voice Package',
    status: 'Paid',
    hours: 4.5,
    earned: 22500,
  },
  {
    id: '2',
    payoutDate: new Date('2026-01-14'),
    type: 'Royalties',
    description: 'TechCorp Q4 Usage Royalties',
    status: 'Paid',
    hours: 0,
    earned: 15000,
  },
  {
    id: '3',
    payoutDate: new Date('2026-01-12'),
    type: 'Voice Recording',
    description: 'E-Learning Module 5 - Advanced Topics',
    status: 'Paid',
    hours: 3.0,
    earned: 18000,
  },
  {
    id: '4',
    payoutDate: new Date('2026-01-10'),
    type: 'Bonus',
    description: 'Performance Bonus - December',
    status: 'Paid',
    hours: 0,
    earned: 10000,
  },
  {
    id: '5',
    payoutDate: new Date('2026-01-08'),
    type: 'Voice Recording',
    description: 'Podcast Episode 12 - Tech Trends',
    status: 'Paid',
    hours: 2.0,
    earned: 12000,
  },
  {
    id: '6',
    payoutDate: new Date('2026-01-05'),
    type: 'Voice Recording',
    description: 'AI Assistant - Custom Prompts',
    status: 'Pending',
    hours: 5.5,
    earned: 27500,
  },
  {
    id: '7',
    payoutDate: new Date('2026-01-03'),
    type: 'Royalties',
    description: 'E-Learning Platform Usage',
    status: 'Pending',
    hours: 0,
    earned: 8500,
  },
  {
    id: '8',
    payoutDate: new Date('2026-01-02'),
    type: 'Voice Recording',
    description: 'Podcast Episode 11 - AI Ethics',
    status: 'Processing',
    hours: 1.5,
    earned: 9000,
  },
];

// Generate chart data for the last 3 weeks
function generateChartData(): EarningsDataPoint[] {
  const data: EarningsDataPoint[] = [];
  const now = new Date('2026-01-17');

  // Group data by week ranges
  const weekRanges = [
    { start: new Date('2026-01-01'), end: new Date('2026-01-02'), paid: 0, pending: 2100 },
    { start: new Date('2026-01-03'), end: new Date('2026-01-09'), paid: 2200, pending: 3600 },
    { start: new Date('2026-01-10'), end: new Date('2026-01-16'), paid: 6550, pending: 2750 },
  ];

  for (const range of weekRanges) {
    data.push({
      date: range.start,
      paidEarnings: range.paid,
      pendingEarnings: range.pending,
    });
  }

  return data;
}

export const mockChartData: EarningsDataPoint[] = generateChartData();

export const mockSummary: EarningsSummary = {
  totalEarnings: mockPayments.reduce((sum, p) => sum + p.earned, 0),
  paidEarnings: mockPayments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.earned, 0),
  pendingEarnings: mockPayments.filter(p => p.status !== 'Paid').reduce((sum, p) => sum + p.earned, 0),
};

// Utility functions
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatDateRange(start: Date, end: Date): string {
  const startStr = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(start);
  const endStr = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(end);
  return `${startStr} - ${endStr}`;
}
