import { VoiceCard } from './VoiceCard';

interface Voice {
  id: string;
  name: string;
  avatarUrl: string | null;
  languages: string;
  styles: string;
  pricePerHour: number;
  gender: string;
}

interface VoiceGridProps {
  voices: Voice[];
  title?: string;
  subtitle?: string;
}

export function VoiceGrid({ voices, title, subtitle }: VoiceGridProps) {
  return (
    <section className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-10">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-[var(--muted)]">{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {voices.map((voice) => (
            <VoiceCard
              key={voice.id}
              id={voice.id}
              name={voice.name}
              avatarUrl={voice.avatarUrl}
              languages={voice.languages}
              styles={voice.styles}
              pricePerHour={voice.pricePerHour}
              gender={voice.gender}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
