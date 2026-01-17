interface UsageHeatmapProps {
  data: number[]; // 7 values for Mon-Sun
}

const dayLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function getIntensityClass(value: number, max: number): string {
  if (value === 0) return 'bg-gray-100';
  const ratio = value / max;
  if (ratio < 0.33) return 'bg-green-200';
  if (ratio < 0.66) return 'bg-green-400';
  return 'bg-green-600';
}

export function UsageHeatmap({ data }: UsageHeatmapProps) {
  const max = Math.max(...data, 1);
  const total = data.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--muted)]">Usage this week</span>
        <span className="text-xs font-medium text-[var(--foreground)]">{total} gens</span>
      </div>
      <div className="flex gap-1">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full h-6 rounded ${getIntensityClass(value, max)} transition-colors`}
              title={`${dayLabels[index]}: ${value} generations`}
            />
            <span className="text-[10px] text-[var(--muted)]">{dayLabels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
