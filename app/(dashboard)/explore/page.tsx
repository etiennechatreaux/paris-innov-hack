'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { VoiceRadar } from '@/components/ui/VoiceRadar';
import { VoiceCard } from '@/components/VoiceCard';
import { voices } from '@/lib/data';

type ExploreMode = 'profiles' | 'profiler';

export default function ExplorePage() {
  const t = useTranslations('sidebar');
  const [mode, setMode] = useState<ExploreMode>('profiles');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">{t('explore')}</h1>

      {/* Toggle Tabs */}
      <div className="flex gap-1 p-1 bg-[var(--accent)] rounded-[var(--radius-lg)] w-fit mb-6">
        <button
          onClick={() => setMode('profiles')}
          className={`px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors ${
            mode === 'profiles'
              ? 'bg-white text-[var(--foreground)] shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          Search Profiles
        </button>
        <button
          onClick={() => setMode('profiler')}
          className={`px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors ${
            mode === 'profiler'
              ? 'bg-white text-[var(--foreground)] shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          Voice Profiler
        </button>
      </div>

      {/* Content */}
      {mode === 'profiles' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
      ) : (
        <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-8 flex justify-center">
          <VoiceRadar size={360} />
        </div>
      )}
    </div>
  );
}
