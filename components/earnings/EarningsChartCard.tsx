'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { DateRangePicker } from './DateRangePicker';
import { SimpleBarChart } from './SimpleBarChart';
import {
  EarningsDataPoint,
  Contract,
  formatCurrency,
  EarningsSummary,
} from '@/lib/earnings-data';

interface EarningsChartCardProps {
  data: EarningsDataPoint[];
  contracts: Contract[];
  summary: EarningsSummary;
}

export function EarningsChartCard({
  data,
  contracts,
  summary,
}: EarningsChartCardProps) {
  const [startDate, setStartDate] = useState(new Date('2026-01-01'));
  const [endDate, setEndDate] = useState(new Date('2026-01-17'));
  const [selectedContract, setSelectedContract] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'currency' | 'hours'>('currency');

  const contractOptions = contracts.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'voice-recording', label: 'Voice Recording' },
    { value: 'royalties', label: 'Royalties' },
    { value: 'bonus', label: 'Bonus' },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        {/* Header with filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Earnings Over Time</h2>
            <div className="flex flex-wrap items-center gap-2">
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onChange={(start, end) => {
                  setStartDate(start);
                  setEndDate(end);
                }}
              />
              <div className="w-40">
                <Select
                  options={contractOptions}
                  value={selectedContract}
                  onChange={(e) => setSelectedContract(e.target.value)}
                />
              </div>
              <div className="w-32">
                <Select
                  options={typeOptions}
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right side: toggle + total */}
          <div className="flex items-center gap-4">
            {/* Toggle icons */}
            <div className="flex items-center border border-[var(--border)] rounded-full p-1">
              <button
                onClick={() => setViewMode('currency')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'currency'
                    ? 'bg-[var(--accent)]'
                    : 'hover:bg-[var(--accent)]'
                }`}
              >
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('hours')}
                className={`p-2 rounded-full transition-colors ${
                  viewMode === 'hours'
                    ? 'bg-[var(--accent)]'
                    : 'hover:bg-[var(--accent)]'
                }`}
              >
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Total earnings */}
            <div className="text-right">
              <p className="text-sm text-[var(--muted)]">Earnings total</p>
              <p className="text-2xl font-semibold">
                {formatCurrency(summary.totalEarnings)}
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <SimpleBarChart data={data} />

        {/* Legend */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#6366f1]" />
              <span className="text-sm text-[var(--muted)]">Paid Earnings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#c7d2fe]" />
              <span className="text-sm text-[var(--muted)]">Pending Earnings</span>
            </div>
          </div>
          <span className="text-xs text-[var(--muted)]">
            Data refreshes every hour.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
