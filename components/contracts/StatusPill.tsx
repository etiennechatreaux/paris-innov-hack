import { ContractStatus } from '@/lib/contracts-data';

interface StatusPillProps {
  status: ContractStatus;
  recentlyUsed?: boolean;
}

const statusConfig: Record<ContractStatus, { label: string; icon: string; className: string }> = {
  active: {
    label: 'Active',
    icon: '\u25CF', // ●
    className: 'bg-green-50 text-green-700',
  },
  achieved: {
    label: 'Achieved',
    icon: '\u2713', // ✓
    className: 'bg-blue-50 text-blue-700',
  },
  paused: {
    label: 'Paused',
    icon: '\u23F8', // ⏸
    className: 'bg-yellow-50 text-yellow-700',
  },
  expired: {
    label: 'Expired',
    icon: '\u2014', // —
    className: 'bg-gray-50 text-gray-500',
  },
  'in-review': {
    label: 'In Review',
    icon: '\u25D0', // ◐
    className: 'bg-purple-50 text-purple-700',
  },
};

export function StatusPill({ status, recentlyUsed }: StatusPillProps) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${config.className}`}
      >
        <span className="text-[10px]">{config.icon}</span>
        {config.label}
      </span>
      {recentlyUsed && (
        <span className="w-2 h-2 bg-green-500 rounded-full" title="Recently used" />
      )}
    </div>
  );
}
