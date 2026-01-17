'use client';

import { useTranslations } from 'next-intl';

export default function ReferralPage() {
  const t = useTranslations('sidebar');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">{t('referral')}</h1>
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
        <p className="text-[var(--muted)]">Invite friends and earn rewards.</p>
      </div>
    </div>
  );
}
