export function StatsBar() {
  const stats = [
    { value: '500+', label: 'Voice Talents' },
    { value: '12', label: 'Languages' },
    { value: '50+', label: 'Voice Styles' },
    { value: '24h', label: 'Avg. Response' },
  ];

  return (
    <section className="border-y border-[var(--border)] bg-[var(--accent)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-[var(--muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
