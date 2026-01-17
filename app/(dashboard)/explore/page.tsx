'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { VoiceRadar } from '@/components/ui/VoiceRadar';
import { VoiceCard } from '@/components/VoiceCard';
import { ExploreFilters } from '@/components/ExploreFilters';
import { voices, Voice } from '@/lib/data';

type ExploreMode = 'profiles' | 'profiler';

function parseAgeRange(range: string): { min: number; max: number } | null {
  if (!range) return null;
  if (range === '55+') return { min: 55, max: 100 };
  const [min, max] = range.split('-').map(Number);
  return { min, max };
}

// Selectionne des voix basees sur la position (pseudo-random mais deterministe)
function getSuggestedVoices(
  position: { x: number; y: number },
  allVoices: Voice[],
  count: number = 3
): Voice[] {
  const seed = Math.abs(Math.floor(position.x * 100) + Math.floor(position.y * 1000));
  const shuffled = [...allVoices].sort((a, b) => {
    const hashA = (a.id.charCodeAt(0) + seed) % 100;
    const hashB = (b.id.charCodeAt(0) + seed) % 100;
    return hashA - hashB;
  });
  return shuffled.slice(0, count);
}

export default function ExplorePage() {
  const t = useTranslations('sidebar');
  const [mode, setMode] = useState<ExploreMode>('profiles');
  const [radarPosition, setRadarPosition] = useState({ x: 0, y: 0 });

  // Filter states
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [style, setStyle] = useState('');
  const [ageRange, setAgeRange] = useState('');

  const clearFilters = () => {
    setSearch('');
    setGender('');
    setLanguage('');
    setStyle('');
    setAgeRange('');
  };

  // Filtered voices
  const filteredVoices = useMemo(() => {
    let result = [...voices];

    // Search by name (case-insensitive)
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((v) =>
        v.name.toLowerCase().includes(searchLower)
      );
    }

    // Gender filter
    if (gender) {
      result = result.filter((v) => v.gender === gender);
    }

    // Language filter
    if (language) {
      result = result.filter((v) =>
        v.languages.toLowerCase().includes(language.toLowerCase())
      );
    }

    // Style filter
    if (style) {
      result = result.filter((v) =>
        v.styles.toLowerCase().includes(style.toLowerCase())
      );
    }

    // Age range filter
    const ageFilter = parseAgeRange(ageRange);
    if (ageFilter) {
      result = result.filter(
        (v) => v.age >= ageFilter.min && v.age <= ageFilter.max
      );
    }

    return result;
  }, [search, gender, language, style, ageRange]);

  const suggestedVoices = useMemo(
    () => getSuggestedVoices(radarPosition, voices, 3),
    [radarPosition]
  );

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
        <div className="space-y-6">
          {/* Filters */}
          <ExploreFilters
            search={search}
            onSearchChange={setSearch}
            gender={gender}
            onGenderChange={setGender}
            language={language}
            onLanguageChange={setLanguage}
            style={style}
            onStyleChange={setStyle}
            ageRange={ageRange}
            onAgeRangeChange={setAgeRange}
            onClear={clearFilters}
          />

          {/* Results count */}
          <div className="text-sm text-[var(--muted)]">
            {filteredVoices.length} voice{filteredVoices.length !== 1 ? 's' : ''} found
          </div>

          {/* Grid */}
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
            <div className="text-center py-12 text-[var(--muted)]">
              No voices found matching your criteria.
            </div>
          )}
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
