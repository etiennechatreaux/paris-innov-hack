'use client';

import { useState } from 'react';

interface ProfessionalInfoFormProps {
  initialData: {
    languages: string[];
    styles: string[];
    pricePerHour: number;
    audioSamplePath: string;
  };
  onSave: (data: ProfessionalInfoFormProps['initialData']) => void;
}

const AVAILABLE_LANGUAGES = [
  'English',
  'French',
  'Spanish',
  'German',
  'Italian',
  'Portuguese',
  'Mandarin',
  'Japanese',
  'Korean',
  'Arabic',
];

const AVAILABLE_STYLES = [
  'Commercial',
  'Narration',
  'Documentary',
  'Animation',
  'Audiobook',
  'E-Learning',
  'Podcast',
  'Gaming',
  'IVR/Phone',
  'Trailer',
];

export function ProfessionalInfoForm({
  initialData,
  onSave,
}: ProfessionalInfoFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  const toggleLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const toggleStyle = (style: string) => {
    setFormData((prev) => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter((s) => s !== style)
        : [...prev.styles, style],
    }));
  };

  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Professional Information</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-[var(--primary)] hover:underline"
          >
            Edit
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted)] mb-2">
            Languages
          </label>
          {isEditing ? (
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    formData.languages.includes(lang)
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                      : 'border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 text-sm bg-[var(--accent)] rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Styles */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted)] mb-2">
            Specialties
          </label>
          {isEditing ? (
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_STYLES.map((style) => (
                <button
                  key={style}
                  onClick={() => toggleStyle(style)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    formData.styles.includes(style)
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                      : 'border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {formData.styles.map((style) => (
                <span
                  key={style}
                  className="px-3 py-1 text-sm bg-[var(--accent)] rounded-full"
                >
                  {style}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price per Hour */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted)] mb-1">
            Hourly Rate
          </label>
          {isEditing ? (
            <div className="relative w-48">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
                $
              </span>
              <input
                type="number"
                value={formData.pricePerHour}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricePerHour: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full pl-7 pr-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            </div>
          ) : (
            <p className="text-[var(--foreground)] text-lg font-semibold">
              ${formData.pricePerHour.toLocaleString()}/hr
            </p>
          )}
        </div>

        {/* Audio Sample */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted)] mb-2">
            Voice Sample
          </label>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[var(--accent)] rounded-lg p-3 flex items-center gap-3">
              <button className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white hover:bg-[var(--primary-hover)] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
              <div className="flex-1">
                <div className="h-1 bg-[var(--border)] rounded-full">
                  <div className="h-1 bg-[var(--primary)] rounded-full w-0" />
                </div>
              </div>
              <span className="text-sm text-[var(--muted)]">0:30</span>
            </div>
            {isEditing && (
              <button className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--accent)] transition-colors text-sm">
                Upload New
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        {isEditing && (
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--accent)] transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
