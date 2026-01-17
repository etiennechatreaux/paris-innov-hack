'use client';

import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/earnings-data';

interface EarningsHeaderProps {
  totalEarnings: number;
  hasPaymentMethod?: boolean;
  onConnectProvider?: () => void;
}

export function EarningsHeader({
  totalEarnings,
  hasPaymentMethod = false,
  onConnectProvider,
}: EarningsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-semibold">Earnings</h1>
        <p className="text-[var(--muted)] mt-1">
          Your total earnings to date are{' '}
          <span className="font-semibold text-[var(--foreground)]">
            {formatCurrency(totalEarnings)}
          </span>
          .{' '}
          <a
            href="/explore"
            className="text-[#6366f1] hover:underline inline-flex items-center gap-1"
          >
            Explore open roles
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </p>
      </div>

      <div className="flex items-center gap-3">
        {!hasPaymentMethod && (
          <span className="text-sm text-[var(--muted)]">
            No payment method connected
          </span>
        )}
        <Button
          onClick={onConnectProvider}
          className="bg-[#6366f1] hover:bg-[#5558e3] gap-2"
        >
          Connect provider
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
