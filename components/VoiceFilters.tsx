'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from './ui/Select';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

const LANGUAGES = [
  { value: '', label: 'All Languages' },
  { value: 'English', label: 'English' },
  { value: 'French', label: 'French' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'German', label: 'German' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Mandarin', label: 'Mandarin' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Korean', label: 'Korean' },
];

const GENDERS = [
  { value: '', label: 'All Genders' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
];

const STYLES = [
  { value: '', label: 'All Styles' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Narration', label: 'Narration' },
  { value: 'Audiobook', label: 'Audiobook' },
  { value: 'E-Learning', label: 'E-Learning' },
  { value: 'Documentary', label: 'Documentary' },
  { value: 'Animation', label: 'Animation' },
  { value: 'Podcast', label: 'Podcast' },
];

export function VoiceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/voices?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/voices');
  };

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="space-y-6 p-6 bg-[var(--accent)] rounded-[var(--radius-lg)]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[var(--foreground)]">Filters</h3>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Language Filter */}
      <Select
        label="Language"
        options={LANGUAGES}
        value={searchParams.get('language') || ''}
        onChange={(e) => updateFilter('language', e.target.value)}
      />

      {/* Gender Filter */}
      <Select
        label="Gender"
        options={GENDERS}
        value={searchParams.get('gender') || ''}
        onChange={(e) => updateFilter('gender', e.target.value)}
      />

      {/* Style Filter */}
      <Select
        label="Voice Style"
        options={STYLES}
        value={searchParams.get('style') || ''}
        onChange={(e) => updateFilter('style', e.target.value)}
      />

      {/* Price Range */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[var(--foreground)]">
          Price Range ($/hr)
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={searchParams.get('minPrice') || ''}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            className="w-full"
          />
          <span className="text-[var(--muted)]">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={searchParams.get('maxPrice') || ''}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
