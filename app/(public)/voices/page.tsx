'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { VoiceCard } from '@/components/VoiceCard';
import { VoiceFilters } from '@/components/VoiceFilters';
import { VoiceRadar } from '@/components/ui/VoiceRadar';
import { voices as allVoices, Voice } from '@/lib/data';

type ViewMode = 'list' | 'radar';

function getSuggestedVoices(
  position: { x: number; y: number },
  voices: Voice[],
  count: number = 3
): Voice[] {
  const seed = Math.abs(Math.floor(position.x * 100) + Math.floor(position.y * 1000));
  const shuffled = [...voices].sort((a, b) => {
    const hashA = (a.id.charCodeAt(0) + seed) % 100;
    const hashB = (b.id.charCodeAt(0) + seed) % 100;
    return hashA - hashB;
  });
  return shuffled.slice(0, count);
}

function VoicesContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<ViewMode>('list');
  const [radarPosition, setRadarPosition] = useState({ x: 0, y: 0 });

  const filteredVoices = useMemo(() => {
    let voices = [...allVoices];
    const language = searchParams.get('language');
    const gender = searchParams.get('gender');
    const style = searchParams.get('style');
    const age = searchParams.get('age');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    if (language) {
      voices = voices.filter((v) =>
        v.languages.toLowerCase().includes(language.toLowerCase())
      );
    }

    if (gender) {
      voices = voices.filter((v) => v.gender === gender);
    }

    if (style) {
      voices = voices.filter((v) =>
        v.styles.toLowerCase().includes(style.toLowerCase())
      );
    }

    if (age) {
      if (age === '18-25') {
        voices = voices.filter((v) => v.age >= 18 && v.age <= 25);
      } else if (age === '26-35') {
        voices = voices.filter((v) => v.age >= 26 && v.age <= 35);
      } else if (age === '36-45') {
        voices = voices.filter((v) => v.age >= 36 && v.age <= 45);
      } else if (age === '46+') {
        voices = voices.filter((v) => v.age >= 46);
      }
    }

    if (minPrice) {
      voices = voices.filter((v) => v.pricePerHour >= parseInt(minPrice) * 100);
    }

    if (maxPrice) {
      voices = voices.filter((v) => v.pricePerHour <= parseInt(maxPrice) * 100);
    }

    return voices;
  }, [searchParams]);

  const suggestedVoices = useMemo(
    () => getSuggestedVoices(radarPosition, allVoices, 3),
    [radarPosition]
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Browse Voice Talent
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Find the perfect voice for your project from our curated marketplace
        </p>
      </div>

      {/* Toggle Tabs */}
      <div className="flex gap-1 p-1 bg-[var(--accent)] rounded-[var(--radius-lg)] w-fit mb-6">
        <button
          onClick={() => setMode('list')}
          className={`px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors ${
            mode === 'list'
              ? 'bg-white text-[var(--foreground)] shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          Search Profiles
        </button>
        <button
          onClick={() => setMode('radar')}
          className={`px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors ${
            mode === 'radar'
              ? 'bg-white text-[var(--foreground)] shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          Voice Profiler
        </button>
      </div>

      {/* Content */}
      {mode === 'list' ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <VoiceFilters />
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-[var(--muted)]">
              {filteredVoices.length} voice{filteredVoices.length !== 1 ? 's' : ''} found
            </div>

            {filteredVoices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVoices.map((voice) => (
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
              <div className="text-center py-12">
                <p className="text-[var(--muted)]">
                  No voices found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Radar */}
          <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-8 flex justify-center">
            <VoiceRadar
              size={360}
              value={radarPosition}
              onChange={setRadarPosition}
            />
          </div>

          {/* Suggested Profiles */}
          <div>
            <h3 className="text-lg font-medium mb-4">Suggested Profiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedVoices.map((voice) => (
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
        </div>
      )}
    </div>
  );
}

export default function VoicesPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">Loading...</div>}>
      <VoicesContent />
    </Suspense>
  );
}
