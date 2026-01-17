'use client';

import { EarningsDataPoint, formatCurrency } from '@/lib/earnings-data';

interface SimpleBarChartProps {
  data: EarningsDataPoint[];
}

export function SimpleBarChart({ data }: SimpleBarChartProps) {
  // Calculate max value for scaling
  const maxValue = Math.max(
    ...data.map((d) => d.paidEarnings + d.pendingEarnings)
  );

  // Y-axis labels
  const yLabels = [
    maxValue,
    maxValue * 0.75,
    maxValue * 0.5,
    maxValue * 0.25,
    0,
  ];

  // Format date for x-axis
  const formatXLabel = (date: Date, index: number, data: EarningsDataPoint[]) => {
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();

    // Show range if not last item
    if (index < data.length - 1) {
      const nextDate = data[index + 1]?.date;
      if (nextDate) {
        const endDay = new Date(nextDate);
        endDay.setDate(endDay.getDate() - 1);
        return `${month} ${day} - ${month} ${endDay.getDate()}, ${date.getFullYear()}`;
      }
    }

    return `${month} ${day}, ${date.getFullYear()}`;
  };

  return (
    <div className="w-full">
      <div className="flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between pr-4 py-2 text-right">
          {yLabels.map((value, i) => (
            <span key={i} className="text-xs text-[var(--muted)]">
              {formatCurrency(value)}
            </span>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {yLabels.map((_, i) => (
              <div
                key={i}
                className="border-b border-[var(--border)] border-dashed"
              />
            ))}
          </div>

          {/* Bars container */}
          <div className="relative h-64 flex items-end justify-around gap-4 pt-2 pb-8">
            {data.map((point, index) => {
              const totalHeight = maxValue > 0
                ? ((point.paidEarnings + point.pendingEarnings) / maxValue) * 100
                : 0;
              const paidHeight = maxValue > 0
                ? (point.paidEarnings / maxValue) * 100
                : 0;
              const pendingHeight = maxValue > 0
                ? (point.pendingEarnings / maxValue) * 100
                : 0;

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center"
                >
                  {/* Stacked bar */}
                  <div
                    className="w-full max-w-24 relative group"
                    style={{ height: '100%' }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse">
                      {/* Paid earnings (bottom, darker) */}
                      {paidHeight > 0 && (
                        <div
                          className="w-full bg-[#6366f1] rounded-t-sm transition-all duration-300"
                          style={{ height: `${(paidHeight / 100) * 224}px` }}
                        />
                      )}
                      {/* Pending earnings (top, lighter) */}
                      {pendingHeight > 0 && (
                        <div
                          className="w-full bg-[#c7d2fe] transition-all duration-300"
                          style={{
                            height: `${(pendingHeight / 100) * 224}px`,
                            borderTopLeftRadius: paidHeight === 0 ? '2px' : '0',
                            borderTopRightRadius: paidHeight === 0 ? '2px' : '0',
                          }}
                        />
                      )}
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[var(--foreground)] text-white px-3 py-2 rounded-[var(--radius-sm)] text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <div>Paid: {formatCurrency(point.paidEarnings)}</div>
                      <div>Pending: {formatCurrency(point.pendingEarnings)}</div>
                    </div>
                  </div>

                  {/* X-axis label */}
                  <span className="text-xs text-[var(--muted)] mt-2 text-center">
                    {formatXLabel(point.date, index, data)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
