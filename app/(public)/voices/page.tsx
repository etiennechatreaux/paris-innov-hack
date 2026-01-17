import { VoiceCard } from '@/components/VoiceCard';
import { VoiceFilters } from '@/components/VoiceFilters';
import { voices as allVoices } from '@/lib/data';
import { Voice } from '@/lib/types';

interface PageProps {
  searchParams: Promise<{
    language?: string;
    gender?: string;
    style?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function VoicesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  let voices: Voice[] = [...allVoices];

  // Apply filters
  if (params.language) {
    voices = voices.filter((v) =>
      v.languages.toLowerCase().includes(params.language!.toLowerCase())
    );
  }

  if (params.gender) {
    voices = voices.filter((v) => v.gender === params.gender);
  }

  if (params.style) {
    voices = voices.filter((v) =>
      v.styles.toLowerCase().includes(params.style!.toLowerCase())
    );
  }

  if (params.minPrice) {
    voices = voices.filter((v) => v.pricePerHour >= parseInt(params.minPrice!) * 100);
  }

  if (params.maxPrice) {
    voices = voices.filter((v) => v.pricePerHour <= parseInt(params.maxPrice!) * 100);
  }

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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <VoiceFilters />
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-[var(--muted)]">
            {voices.length} voice{voices.length !== 1 ? 's' : ''} found
          </div>

          {voices.length > 0 ? (
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
            <div className="text-center py-12">
              <p className="text-[var(--muted)]">
                No voices found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
