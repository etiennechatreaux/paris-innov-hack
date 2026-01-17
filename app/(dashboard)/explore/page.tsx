'use client';

import { useTranslations } from 'next-intl';
import { VoiceCard } from '@/components/VoiceCard';
import { voices } from '@/lib/data';

export default function ExplorePage() {
  const t = useTranslations('sidebar');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">{t('explore')}</h1>

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
    </div>
  );
}
