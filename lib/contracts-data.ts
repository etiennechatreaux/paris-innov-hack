// Contract status types
export type ContractStatus = 'active' | 'achieved' | 'paused' | 'expired' | 'in-review';

// Trust shield protection types
export type ProtectionType = 'watermarked' | 'usage-capped' | 'audit-trail' | 'unrestricted';

// Activity event types
export interface ActivityEvent {
  id: string;
  date: Date;
  type: 'generation' | 'payment' | 'review';
  description: string;
  count?: number;
  amount?: number; // cents
}

// Main contract interface
export interface Contract {
  id: string;
  clientName: string;
  clientAvatar: string;
  useCase: string;
  status: ContractStatus;
  startDate: Date;
  endDate?: Date;
  rate: number; // cents per hour
  totalEarned: number; // cents
  totalGenerations: number;
  lastUsed: Date | null;
  protections: ProtectionType[];
  usageThisWeek: number[]; // 7 days (Mon-Sun), generations per day
  exclusivity: 'exclusive' | 'non-exclusive';
  reviewClause?: string;
  recentActivity: ActivityEvent[];
}

// Dashboard summary stats
export interface DashboardStats {
  activeContracts: number;
  generationsThisMonth: number;
  monthlyEarnings: number; // cents
  trustScore: number; // 0-100
  generationsToday: number;
}

// Mock contracts data
export const mockContracts: Contract[] = [
  {
    id: 'contract-1',
    clientName: 'Tesla AI',
    clientAvatar: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&h=100&fit=crop',
    useCase: 'AI Assistant',
    status: 'active',
    startDate: new Date('2025-01-15'),
    endDate: new Date('2026-01-15'),
    rate: 15000, // $150/hr
    totalEarned: 89000, // $890
    totalGenerations: 47,
    lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    protections: ['watermarked', 'audit-trail'],
    usageThisWeek: [8, 12, 5, 15, 7, 0, 0], // Mon-Sun
    exclusivity: 'non-exclusive',
    reviewClause: 'Every 6 months',
    recentActivity: [
      { id: 'a1', date: new Date(), type: 'generation', description: '12 generations', count: 12 },
      { id: 'a2', date: new Date(Date.now() - 24 * 60 * 60 * 1000), type: 'generation', description: '8 generations', count: 8 },
      { id: 'a3', date: new Date('2026-01-12'), type: 'payment', description: 'Payment received', amount: 34000 },
    ],
  },
  {
    id: 'contract-2',
    clientName: 'Growable',
    clientAvatar: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop',
    useCase: 'Voice Synthesis',
    status: 'active',
    startDate: new Date('2026-01-01'),
    endDate: new Date('2026-07-01'),
    rate: 20000, // $200/hr
    totalEarned: 156000, // $1,560
    totalGenerations: 89,
    lastUsed: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    protections: ['watermarked', 'usage-capped', 'audit-trail'],
    usageThisWeek: [15, 20, 18, 12, 24, 0, 0],
    exclusivity: 'exclusive',
    reviewClause: 'Quarterly',
    recentActivity: [
      { id: 'b1', date: new Date(), type: 'generation', description: '24 generations', count: 24 },
      { id: 'b2', date: new Date(Date.now() - 24 * 60 * 60 * 1000), type: 'generation', description: '12 generations', count: 12 },
      { id: 'b3', date: new Date('2026-01-15'), type: 'payment', description: 'Payment received', amount: 78000 },
    ],
  },
  {
    id: 'contract-3',
    clientName: 'MrBeast Productions',
    clientAvatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    useCase: 'YouTube Content',
    status: 'active',
    startDate: new Date('2026-01-10'),
    endDate: new Date('2026-04-10'),
    rate: 12000, // $120/hr
    totalEarned: 45000, // $450
    totalGenerations: 23,
    lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    protections: ['usage-capped', 'audit-trail'],
    usageThisWeek: [0, 5, 0, 8, 0, 0, 0],
    exclusivity: 'non-exclusive',
    recentActivity: [
      { id: 'c1', date: new Date(Date.now() - 24 * 60 * 60 * 1000), type: 'generation', description: '8 generations', count: 8 },
      { id: 'c2', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'generation', description: '5 generations', count: 5 },
    ],
  },
  {
    id: 'contract-4',
    clientName: 'Spotify Podcast',
    clientAvatar: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=100&h=100&fit=crop',
    useCase: 'Podcast Intro',
    status: 'achieved',
    startDate: new Date('2025-10-01'),
    endDate: new Date('2025-12-31'),
    rate: 18000, // $180/hr
    totalEarned: 234000, // $2,340
    totalGenerations: 156,
    lastUsed: new Date('2025-12-28'),
    protections: ['audit-trail'],
    usageThisWeek: [0, 0, 0, 0, 0, 0, 0],
    exclusivity: 'non-exclusive',
    recentActivity: [
      { id: 'd1', date: new Date('2025-12-31'), type: 'payment', description: 'Final payment received', amount: 54000 },
      { id: 'd2', date: new Date('2025-12-28'), type: 'generation', description: 'Final batch', count: 12 },
    ],
  },
];

// Calculate dashboard stats from contracts
export function calculateDashboardStats(contracts: Contract[]): DashboardStats {
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const generationsThisMonth = contracts.reduce((sum, c) => sum + c.usageThisWeek.reduce((a, b) => a + b, 0), 0);
  const monthlyEarnings = contracts
    .filter(c => c.status === 'active')
    .reduce((sum, c) => sum + c.totalEarned, 0);
  const generationsToday = contracts.reduce((sum, c) => {
    const today = c.usageThisWeek[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
    return sum + (today || 0);
  }, 0);

  return {
    activeContracts,
    generationsThisMonth,
    monthlyEarnings,
    trustScore: 98,
    generationsToday,
  };
}

export const mockDashboardStats = calculateDashboardStats(mockContracts);

// Utility: format relative time
export function formatRelativeTime(date: Date | null): string {
  if (!date) return 'Never';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Utility: check if recently used (within 7 days)
export function isRecentlyUsed(date: Date | null): boolean {
  if (!date) return false;
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return date > sevenDaysAgo;
}

// Utility: format date for display
export function formatContractDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

// Offer interface
export interface Offer {
  id: string;
  clientName: string;
  clientAvatar: string;
  useCase: string;
  description: string;
  proposedRate: number; // cents per hour
  estimatedDuration: string;
  exclusivity: 'exclusive' | 'non-exclusive';
  protections: ProtectionType[];
  receivedAt: Date;
  expiresAt: Date;
}

// Mock offers data
export const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    clientName: 'Netflix',
    clientAvatar: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop',
    useCase: 'AI Dubbing',
    description: 'Looking for a versatile voice for our new animated series dubbing project. Multiple characters needed.',
    proposedRate: 20000, // $200/hr
    estimatedDuration: '6 months',
    exclusivity: 'non-exclusive',
    protections: ['watermarked', 'usage-capped', 'audit-trail'],
    receivedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
  {
    id: 'offer-2',
    clientName: 'Duolingo',
    clientAvatar: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=100&h=100&fit=crop',
    useCase: 'Language Learning',
    description: 'We need a clear, friendly voice for our French language course. Native-level pronunciation required.',
    proposedRate: 15000, // $150/hr
    estimatedDuration: '12 months',
    exclusivity: 'non-exclusive',
    protections: ['watermarked', 'audit-trail'],
    receivedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
  },
  {
    id: 'offer-3',
    clientName: 'OpenAI',
    clientAvatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
    useCase: 'Voice Assistant',
    description: 'Exclusive partnership for next-gen AI assistant. Premium compensation for exclusive rights.',
    proposedRate: 25000, // $250/hr
    estimatedDuration: '3 months',
    exclusivity: 'exclusive',
    protections: ['watermarked', 'usage-capped', 'audit-trail'],
    receivedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  },
];

// Utility: format expiration countdown
export function formatExpirationCountdown(expiresAt: Date): string {
  const now = new Date();
  const diffMs = expiresAt.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Expired';
  if (diffDays === 0) return 'Expires today';
  if (diffDays === 1) return 'Expires tomorrow';
  return `Expires in ${diffDays}d`;
}
