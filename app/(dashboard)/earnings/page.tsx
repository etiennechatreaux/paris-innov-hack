'use client';

import { useTranslations } from 'next-intl';

const monthlyRevenue = [
  { month: 'Aug', amount: 1200 },
  { month: 'Sep', amount: 1800 },
  { month: 'Oct', amount: 1400 },
  { month: 'Nov', amount: 2200 },
  { month: 'Dec', amount: 1900 },
  { month: 'Jan', amount: 2500 },
];

const topUsers = [
  { name: 'Alice Martin', earnings: '$4,200' },
  { name: 'Bob Johnson', earnings: '$3,800' },
  { name: 'Carol Smith', earnings: '$3,200' },
  { name: 'David Lee', earnings: '$2,900' },
  { name: 'Emma Wilson', earnings: '$2,500' },
];

function RevenueChart() {
  const maxAmount = Math.max(...monthlyRevenue.map(d => d.amount));
  const barWidth = 40;
  const gap = 24;
  const chartHeight = 200;
  const chartWidth = monthlyRevenue.length * (barWidth + gap);

  return (
    <div className="w-full overflow-x-auto">
      <svg width={chartWidth} height={chartHeight + 60} className="mx-auto">
        {monthlyRevenue.map((data, index) => {
          const barHeight = (data.amount / maxAmount) * chartHeight;
          const x = index * (barWidth + gap) + gap / 2;
          const y = chartHeight - barHeight;

          return (
            <g key={data.month}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={6}
                className="fill-[var(--primary)]"
              />
              {/* Amount label */}
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-[var(--foreground)] text-xs font-medium"
              >
                ${(data.amount / 1000).toFixed(1)}k
              </text>
              {/* Month label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight + 20}
                textAnchor="middle"
                className="fill-[var(--muted)] text-xs"
              >
                {data.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function TopUsersList() {
  return (
    <div className="space-y-3">
      {topUsers.map((user, index) => {
        const initials = user.name.split(' ').map(n => n[0]).join('');
        return (
          <div key={user.name} className="flex items-center gap-3">
            <span className="text-sm font-medium text-[var(--muted)] w-4">{index + 1}</span>
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-xs font-medium">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
            </div>
            <span className="text-sm font-semibold text-[var(--foreground)]">{user.earnings}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function EarningsPage() {
  const t = useTranslations('sidebar');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">{t('earnings')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue (Last 6 months)</h2>
          <RevenueChart />
        </div>

        {/* Top Users */}
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
          <h2 className="text-lg font-semibold mb-4">Top Users</h2>
          <TopUsersList />
        </div>
      </div>
    </div>
  );
}
