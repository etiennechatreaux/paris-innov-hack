// Types
export interface ReferralStats {
  invitesSent: number;
  signUps: number;
  rewardsEarned: number; // in cents
}

export interface Milestone {
  id: string;
  referralsRequired: number;
  reward: string;
  achieved: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  referrals: number;
  isCurrentUser: boolean;
}

export interface RecentReferral {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'signed_up' | 'rewarded';
  invitedAt: Date;
  signedUpAt?: Date;
}

// Constants
export const REFERRAL_BASE_URL = 'https://vox.com/join';

// Utility functions
export function generateReferralLink(referralCode: string): string {
  return `${REFERRAL_BASE_URL}?ref=${referralCode}`;
}

export function getShareUrls(referralLink: string, message: string) {
  const encodedLink = encodeURIComponent(referralLink);
  const encodedMessage = encodeURIComponent(message);

  return {
    email: `mailto:?subject=${encodeURIComponent('Join Vox!')}&body=${encodedMessage}%0A%0A${encodedLink}`,
    whatsapp: `https://wa.me/?text=${encodedMessage}%20${encodedLink}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedLink}`,
  };
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function getQRCodeUrl(referralLink: string, size: number = 200): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(referralLink)}`;
}

export function formatReward(cents: number): string {
  return `${(cents / 100).toFixed(0)}€`;
}

// Mock data
export const mockReferralData = {
  referralCode: 'VOICE2025',
  stats: {
    invitesSent: 24,
    signUps: 8,
    rewardsEarned: 12000, // 120€
  } as ReferralStats,
  milestones: [
    { id: '1', referralsRequired: 1, reward: '10€', achieved: true },
    { id: '2', referralsRequired: 5, reward: '25€', achieved: true },
    { id: '3', referralsRequired: 10, reward: 'Badge VIP', achieved: false },
    { id: '4', referralsRequired: 25, reward: '100€ + Mise en avant', achieved: false },
    { id: '5', referralsRequired: 50, reward: 'Ambassadeur', achieved: false },
  ] as Milestone[],
  leaderboard: [
    { rank: 1, name: 'Alice Martin', referrals: 45, isCurrentUser: false },
    { rank: 2, name: 'Bob Johnson', referrals: 38, isCurrentUser: false },
    { rank: 3, name: 'Carol Smith', referrals: 32, isCurrentUser: false },
    { rank: 4, name: 'David Lee', referrals: 28, isCurrentUser: false },
    { rank: 12, name: 'Vous', referrals: 8, isCurrentUser: true },
  ] as LeaderboardEntry[],
  recentReferrals: [
    {
      id: '1',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      status: 'rewarded',
      invitedAt: new Date('2025-01-10'),
      signedUpAt: new Date('2025-01-12'),
    },
    {
      id: '2',
      name: 'Frank Brown',
      email: 'frank@example.com',
      status: 'signed_up',
      invitedAt: new Date('2025-01-14'),
      signedUpAt: new Date('2025-01-15'),
    },
    {
      id: '3',
      name: 'Grace Lee',
      email: 'grace@example.com',
      status: 'pending',
      invitedAt: new Date('2025-01-16'),
    },
    {
      id: '4',
      name: 'Henry Chen',
      email: 'henry@example.com',
      status: 'pending',
      invitedAt: new Date('2025-01-17'),
    },
  ] as RecentReferral[],
};
