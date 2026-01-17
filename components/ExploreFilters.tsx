'use client';

import { Input } from './ui/Input';
import { Select } from './ui/Select';

interface ExploreFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  gender: string;
  onGenderChange: (value: string) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  style: string;
  onStyleChange: (value: string) => void;
  ageRange: string;
  onAgeRangeChange: (value: string) => void;
  onClear: () => void;
}

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

const AGE_RANGES = [
  { value: '', label: 'All Ages' },
  { value: '18-25', label: '18-25' },
  { value: '26-35', label: '26-35' },
  { value: '36-45', label: '36-45' },
  { value: '46-55', label: '46-55' },
  { value: '55+', label: '55+' },
];

export function ExploreFilters({
  search,
  onSearchChange,
  gender,
  onGenderChange,
  language,
  onLanguageChange,
  style,
  onStyleChange,
  ageRange,
  onAgeRangeChange,
  onClear,
}: ExploreFiltersProps) {
  const hasFilters = search || gender || language || style || ageRange;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Inline Filters Row */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="w-36">
          <Select
            options={GENDERS}
            value={gender}
            onChange={(e) => onGenderChange(e.target.value)}
          />
        </div>
        <div className="w-32">
          <Select
            options={AGE_RANGES}
            value={ageRange}
            onChange={(e) => onAgeRangeChange(e.target.value)}
          />
        </div>
        <div className="w-40">
          <Select
            options={LANGUAGES}
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
          />
        </div>
        <div className="w-36">
          <Select
            options={STYLES}
            value={style}
            onChange={(e) => onStyleChange(e.target.value)}
          />
        </div>

        {hasFilters && (
          <button
            onClick={onClear}
            className="h-10 px-3 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
