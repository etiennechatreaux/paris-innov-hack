'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { mockContracts, mockDashboardStats, mockOffers } from '@/lib/contracts-data';
import { PulseBar } from '@/components/contracts/PulseBar';
import { QuickStats } from '@/components/contracts/QuickStats';
import { ContractCard } from '@/components/contracts/ContractCard';
import { OfferCard } from '@/components/contracts/OfferCard';

type TabType = 'contracts' | 'offers';

export default function HomePage() {
  const t = useTranslations('sidebar');
  const [activeTab, setActiveTab] = useState<TabType>('contracts');

  // Calculate generations this week from all contracts
  const generationsThisWeek = mockContracts.reduce(
    (sum, c) => sum + c.usageThisWeek.reduce((a, b) => a + b, 0),
    0
  );

  // Find most recent lastUsed date
  const lastUsedDate = mockContracts
    .filter((c) => c.lastUsed)
    .sort((a, b) => (b.lastUsed?.getTime() || 0) - (a.lastUsed?.getTime() || 0))[0]?.lastUsed;

  // Filter contracts by status for different tabs
  const activeContracts = mockContracts.filter((c) => c.status === 'active');
  const achievedContracts = mockContracts.filter((c) => c.status === 'achieved');

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'contracts', label: 'Contracts', count: mockContracts.length },
    { id: 'offers', label: 'Offers', count: mockOffers.length },
  ];

  const handleAcceptOffer = (offerId: string) => {
    console.log('Accept offer:', offerId);
    // TODO: Implement accept logic
  };

  const handleDeclineOffer = (offerId: string) => {
    console.log('Decline offer:', offerId);
    // TODO: Implement decline logic
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page title */}
      <h1 className="text-2xl font-semibold">{t('home')}</h1>

      {/* Pulse Bar */}
      <PulseBar
        generationsToday={mockDashboardStats.generationsToday}
        generationsThisWeek={generationsThisWeek}
        lastUsedDate={lastUsedDate}
      />

      {/* Quick Stats */}
      <QuickStats stats={mockDashboardStats} />

      {/* Tabs */}
      <div className="border-b border-[var(--border)]">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-[var(--primary)] text-[var(--foreground)]'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-[var(--accent)] rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'contracts' && (
        <div className="space-y-6">
          {/* Active contracts section */}
          {activeContracts.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-[var(--muted)] mb-3">
                Active ({activeContracts.length})
              </h2>
              <div className="space-y-3">
                {activeContracts.map((contract) => (
                  <ContractCard key={contract.id} contract={contract} />
                ))}
              </div>
            </section>
          )}

          {/* Completed contracts section */}
          {achievedContracts.length > 0 && (
            <section>
              <h2 className="text-sm font-medium text-[var(--muted)] mb-3">
                Completed ({achievedContracts.length})
              </h2>
              <div className="space-y-3">
                {achievedContracts.map((contract) => (
                  <ContractCard key={contract.id} contract={contract} />
                ))}
              </div>
            </section>
          )}

          {/* Empty state */}
          {mockContracts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent)] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-[var(--muted)]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <p className="text-[var(--muted)]">
                No active contracts yet. Your first client is out there.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Offers tab */}
      {activeTab === 'offers' && (
        <div className="space-y-3">
          {mockOffers.length > 0 ? (
            mockOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onAccept={handleAcceptOffer}
                onDecline={handleDeclineOffer}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent)] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-[var(--muted)]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                  />
                </svg>
              </div>
              <p className="text-[var(--muted)]">
                No pending offers at the moment.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
