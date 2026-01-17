interface PulseBarProps {
  generationsToday: number;
  generationsThisWeek: number;
  lastUsedDate?: Date | null;
}

type ActivityState = 'active-today' | 'active-week' | 'idle';

function getActivityState(
  generationsToday: number,
  generationsThisWeek: number
): ActivityState {
  if (generationsToday > 0) return 'active-today';
  if (generationsThisWeek > 0) return 'active-week';
  return 'idle';
}

function getActivityConfig(
  state: ActivityState,
  generationsToday: number,
  generationsThisWeek: number,
  lastUsedDate?: Date | null
): { message: string; dotClass: string; bgClass: string } {
  switch (state) {
    case 'active-today':
      return {
        message: `Your voice was used ${generationsToday}x today`,
        dotClass: 'bg-red-500 animate-pulse',
        bgClass: 'bg-gradient-to-r from-green-50 to-emerald-50',
      };
    case 'active-week':
      return {
        message: `${generationsThisWeek} generations this week`,
        dotClass: 'bg-yellow-500',
        bgClass: 'bg-gradient-to-r from-yellow-50 to-amber-50',
      };
    case 'idle':
      const lastUsedText = lastUsedDate
        ? `Last used ${lastUsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        : 'No recent activity';
      return {
        message: `Your voice is resting. ${lastUsedText}.`,
        dotClass: 'bg-gray-300',
        bgClass: 'bg-gray-50',
      };
  }
}

export function PulseBar({ generationsToday, generationsThisWeek, lastUsedDate }: PulseBarProps) {
  const state = getActivityState(generationsToday, generationsThisWeek);
  const config = getActivityConfig(state, generationsToday, generationsThisWeek, lastUsedDate);

  return (
    <div
      className={`h-10 flex items-center justify-center gap-2 rounded-[var(--radius)] ${config.bgClass} border border-[var(--border)]`}
    >
      <span className={`w-2.5 h-2.5 rounded-full ${config.dotClass}`} />
      <span className="text-sm font-medium text-[var(--foreground)]">
        {config.message}
      </span>
    </div>
  );
}
