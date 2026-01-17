'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Contract, formatRelativeTime, isRecentlyUsed, formatContractDate } from '@/lib/contracts-data';
import { formatCurrency } from '@/lib/earnings-data';
import { StatusPill } from './StatusPill';
import { TrustShield } from './TrustShield';
import { UsageHeatmap } from './UsageHeatmap';

interface ContractCardProps {
  contract: Contract;
}

export function ContractCard({ contract }: ContractCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const recentlyUsed = isRecentlyUsed(contract.lastUsed);

  return (
    <Card
      hover
      className="cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={contract.clientAvatar}
              alt={contract.clientName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-[var(--foreground)]">
                {contract.clientName}
              </h3>
              <p className="text-sm text-[var(--muted)]">
                {contract.useCase} &bull; Since {formatContractDate(contract.startDate)}
              </p>
            </div>
          </div>
          <StatusPill status={contract.status} recentlyUsed={recentlyUsed} />
        </div>

        {/* Quick stats row */}
        <div className="flex items-center gap-4 mt-4 text-sm">
          {contract.lastUsed && (
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${recentlyUsed ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-[var(--muted)]">
                Used {formatRelativeTime(contract.lastUsed)}
              </span>
            </div>
          )}
          <span className="text-[var(--muted)]">
            {contract.totalGenerations} gens
          </span>
          <span className="font-medium text-[var(--foreground)]">
            {formatCurrency(contract.totalEarned)} earned
          </span>
        </div>

        {/* Trust shields */}
        <div className="mt-3">
          <TrustShield protections={contract.protections} />
        </div>

        {/* Expanded content */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-4 border-t border-[var(--border)] space-y-4">
            {/* Usage heatmap */}
            <UsageHeatmap data={contract.usageThisWeek} />

            {/* Contract details */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-[var(--foreground)]">
                Contract Details
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-[var(--muted)]">Use case:</span>{' '}
                  <span className="text-[var(--foreground)]">{contract.useCase}</span>
                </div>
                <div>
                  <span className="text-[var(--muted)]">Rate:</span>{' '}
                  <span className="text-[var(--foreground)]">{formatCurrency(contract.rate)}/hr</span>
                </div>
                <div>
                  <span className="text-[var(--muted)]">Duration:</span>{' '}
                  <span className="text-[var(--foreground)]">
                    {formatContractDate(contract.startDate)} - {contract.endDate ? formatContractDate(contract.endDate) : 'Ongoing'}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--muted)]">Exclusivity:</span>{' '}
                  <span className="text-[var(--foreground)] capitalize">{contract.exclusivity}</span>
                </div>
                {contract.reviewClause && (
                  <div className="col-span-2">
                    <span className="text-[var(--muted)]">Review clause:</span>{' '}
                    <span className="text-[var(--foreground)]">{contract.reviewClause}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Recent activity */}
            {contract.recentActivity.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-[var(--foreground)]">
                  Recent Activity
                </h4>
                <div className="space-y-1.5">
                  {contract.recentActivity.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between text-sm">
                      <span className="text-[var(--muted)]">
                        {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-[var(--foreground)]">
                        {event.type === 'generation' && `${event.count} generations`}
                        {event.type === 'payment' && `Payment: ${formatCurrency(event.amount || 0)}`}
                        {event.type === 'review' && event.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Expand indicator */}
        <div className="flex justify-center mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 text-[var(--muted)] transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </Card>
  );
}
