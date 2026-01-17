import { DashboardStats } from '@/lib/contracts-data';
import { formatCurrency } from '@/lib/earnings-data';

interface QuickStatsProps {
  stats: DashboardStats;
}

interface StatPillProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

function StatPill({ value, label, icon }: StatPillProps) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-white border border-[var(--border)] rounded-[var(--radius)] shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-lg font-bold text-[var(--foreground)]">{value}</span>
      </div>
      <span className="text-xs text-[var(--muted)]">{label}</span>
    </div>
  );
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible scrollbar-hide">
      <StatPill
        value={stats.activeContracts}
        label="Active"
        icon={
          <span className="w-2 h-2 bg-green-500 rounded-full" />
        }
      />
      <StatPill
        value={`${stats.generationsThisMonth}`}
        label="This month"
      />
      <StatPill
        value={`$${Math.round(stats.monthlyEarnings / 100).toLocaleString()}`}
        label="Earned"
      />
      <StatPill
        value={`${stats.trustScore}%`}
        label="Trust"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        }
      />
    </div>
  );
}
