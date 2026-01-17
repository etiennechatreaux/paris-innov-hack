'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  mockReferralData,
  generateReferralLink,
  getShareUrls,
  copyToClipboard,
  getQRCodeUrl,
  formatReward,
} from '@/lib/referral';

// Icons as inline SVGs
const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const QRCodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="3" height="3"/>
    <rect x="18" y="14" width="3" height="3"/>
    <rect x="14" y="18" width="3" height="3"/>
    <rect x="18" y="18" width="3" height="3"/>
  </svg>
);

// Share Button Component
function ShareButton({
  icon,
  label,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-[var(--radius)] bg-white border border-[var(--border)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200"
      style={{ color: color || 'var(--foreground)' }}
    >
      {icon}
      <span className="text-xs font-medium text-[var(--foreground)]">{label}</span>
    </button>
  );
}

// Stat Card Component
function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-[var(--muted)]">{icon}</div>
        <span className="text-sm text-[var(--muted)]">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({ current, target }: { current: number; target: number }) {
  const percentage = Math.min((current / target) * 100, 100);
  return (
    <div className="w-full bg-[var(--accent)] rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-[var(--foreground)] rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// Main Page Component
export default function ReferralPage() {
  const t = useTranslations('referral');
  const [copied, setCopied] = useState(false);

  const referralLink = generateReferralLink(mockReferralData.referralCode);
  const shareUrls = getShareUrls(referralLink, t('shareMessage'));
  const qrCodeUrl = getQRCodeUrl(referralLink, 200);

  // Find next milestone
  const nextMilestone = mockReferralData.milestones.find((m) => !m.achieved);
  const currentReferrals = mockReferralData.stats.signUps;
  const targetReferrals = nextMilestone?.referralsRequired || currentReferrals;
  const referralsToGo = Math.max(0, targetReferrals - currentReferrals);

  const handleCopy = async () => {
    const success = await copyToClipboard(referralLink);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: string) => {
    if (platform === 'copy') {
      handleCopy();
      return;
    }
    if (platform === 'qr') {
      window.open(qrCodeUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (platform === 'instagram') {
      // Instagram doesn't support direct sharing, copy link and open app
      handleCopy();
      window.open('https://instagram.com', '_blank');
      return;
    }
    const url = shareUrls[platform as keyof typeof shareUrls];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">{t('title')}</h1>
      <p className="text-[var(--muted)] mb-6">{t('subtitle')}</p>

      {/* Referral Link Card */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6 mb-6">
        <h2 className="text-sm font-medium text-[var(--muted)] mb-3">{t('yourLink')}</h2>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 px-4 py-3 bg-[var(--accent)] rounded-[var(--radius)] text-sm font-mono"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-3 bg-[var(--foreground)] text-white rounded-[var(--radius)] hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <CopyIcon />
            <span className="hidden sm:inline">{copied ? t('copied') : t('copyLink')}</span>
          </button>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-[var(--muted)] mb-3">{t('shareVia')}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          <ShareButton icon={<EmailIcon />} label={t('email')} onClick={() => handleShare('email')} />
          <ShareButton
            icon={<WhatsAppIcon />}
            label={t('whatsapp')}
            onClick={() => handleShare('whatsapp')}
            color="#25D366"
          />
          <ShareButton
            icon={<InstagramIcon />}
            label={t('instagram')}
            onClick={() => handleShare('instagram')}
            color="#E4405F"
          />
          <ShareButton
            icon={<LinkedInIcon />}
            label={t('linkedin')}
            onClick={() => handleShare('linkedin')}
            color="#0A66C2"
          />
          <ShareButton icon={<CopyIcon />} label={t('copy')} onClick={() => handleShare('copy')} />
          <ShareButton icon={<QRCodeIcon />} label={t('qrCode')} onClick={() => handleShare('qr')} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label={t('stats.invitesSent')}
          value={mockReferralData.stats.invitesSent}
          icon={<EmailIcon />}
        />
        <StatCard
          label={t('stats.signUps')}
          value={mockReferralData.stats.signUps}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        <StatCard
          label={t('stats.rewardsEarned')}
          value={formatReward(mockReferralData.stats.rewardsEarned)}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12M6 12h12" />
            </svg>
          }
        />
      </div>

      {/* Progress to Next Milestone */}
      {nextMilestone && (
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
          <h2 className="text-lg font-semibold mb-4">{t('progress.title')}</h2>
          <ProgressBar current={currentReferrals} target={targetReferrals} />
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-[var(--muted)]">
              {t('progress.referrals', { current: currentReferrals, target: targetReferrals })}
            </span>
            <span className="text-sm">
              {t('progress.referMore', { count: referralsToGo })} <strong>{nextMilestone.reward}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
