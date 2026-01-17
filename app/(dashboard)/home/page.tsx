'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('sidebar');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">{t('home')}</h1>

      {/* Tabs */}
      <div className="border-b border-[var(--border)] mb-6">
        <nav className="flex gap-8">
          <button className="pb-3 text-sm font-medium border-b-2 border-[var(--primary)] text-[var(--foreground)]">
            Contracts
          </button>
          <button className="pb-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
            Offers
          </button>
          <button className="pb-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
            Application
          </button>
          <button className="pb-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
            Assessment
          </button>
        </nav>
      </div>

      {/* Contract list */}
      <div className="space-y-0">
        <div className="py-4 border-b border-[var(--border)]">
          <h3 className="font-semibold text-[var(--foreground)]">Advertising campaign Tesla</h3>
          <p className="text-sm text-[var(--muted)] mt-1">Start on Dec 2025</p>
          <p className="text-sm text-[var(--muted)]">Contract : Achieved</p>
        </div>

        <div className="py-4 border-b border-[var(--border)]">
          <h3 className="font-semibold text-[var(--foreground)]">Eleven labs</h3>
          <p className="text-sm text-[var(--muted)] mt-1">Start on Jan 2026</p>
          <p className="text-sm text-[var(--muted)]">Contract : Active</p>
        </div>

        <div className="py-4 border-b border-[var(--border)]">
          <h3 className="font-semibold text-[var(--foreground)]">Voice Off Mister YouTube</h3>
          <p className="text-sm text-[var(--muted)] mt-1">Start on Jan 2026</p>
          <p className="text-sm text-[var(--muted)]">Contract : Active</p>
        </div>
      </div>
    </div>
  );
}
