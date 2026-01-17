'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { VoiceRecordingModal } from '@/components/VoiceRecordingModal';
import { READING_TEXTS, ReadingText } from '@/data/reading-texts';

const LANGUAGES = [
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

const STYLES = [
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Narration', label: 'Narration' },
  { value: 'Audiobook', label: 'Audiobook' },
  { value: 'E-Learning', label: 'E-Learning' },
  { value: 'Documentary', label: 'Documentary' },
  { value: 'Animation', label: 'Animation' },
  { value: 'Podcast', label: 'Podcast' },
];

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
];

export default function ApplyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [recordings, setRecordings] = useState<Record<string, Blob>>({});
  const [selectedText, setSelectedText] = useState<ReadingText | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set('languages', JSON.stringify(selectedLanguages));
    formData.set('styles', JSON.stringify(selectedStyles));

    // Add voice recordings to FormData
    Object.entries(recordings).forEach(([textId, blob]) => {
      formData.append(`recording_${textId}`, blob, `recording_${textId}.webm`);
    });

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/apply/success');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  const handleSaveRecording = (textId: string, blob: Blob) => {
    setRecordings((prev) => ({ ...prev, [textId]: blob }));
  };

  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Join VoiceHub
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Apply to become a voice talent and connect with clients worldwide
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Application Form</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <Input
              name="name"
              label="Full Name"
              placeholder="Your professional name"
              required
            />

            {/* Email */}
            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              required
            />

            {/* Gender */}
            <Select
              name="gender"
              label="Gender"
              options={GENDERS}
              placeholder="Select gender"
              required
            />

            {/* Languages */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Languages (select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.value}
                    type="button"
                    onClick={() => toggleLanguage(lang.value)}
                    className={`px-3 py-1.5 text-sm rounded-[var(--radius-full)] border transition-colors ${
                      selectedLanguages.includes(lang.value)
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                        : 'border-[var(--border)] hover:border-[var(--muted)]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Styles */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Voice Styles (select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => toggleStyle(style.value)}
                    className={`px-3 py-1.5 text-sm rounded-[var(--radius-full)] border transition-colors ${
                      selectedStyles.includes(style.value)
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                        : 'border-[var(--border)] hover:border-[var(--muted)]'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <Input
              name="pricePerHour"
              type="number"
              label="Hourly Rate (USD)"
              placeholder="150"
              min="50"
              max="500"
              required
            />

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--foreground)]">
                About You
              </label>
              <textarea
                name="description"
                rows={4}
                className="w-full px-3 py-2 text-sm bg-white border border-[var(--border)] rounded-[var(--radius-sm)] placeholder:text-[var(--muted-foreground)] transition-colors hover:border-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-1 resize-none"
                placeholder="Tell us about your voice acting experience, style, and what makes you unique..."
                required
              />
            </div>

            {/* Voice Recordings */}
            <div className="space-y-3 pt-4 border-t border-[var(--border)]">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)]">
                  Voice Recordings
                </label>
                <p className="text-sm text-[var(--muted)]">
                  Record yourself reading the following texts to showcase your voice.
                </p>
              </div>
              <div className="space-y-2">
                {READING_TEXTS.map((text) => {
                  const isRecorded = !!recordings[text.id];
                  return (
                    <button
                      key={text.id}
                      type="button"
                      onClick={() => setSelectedText(text)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left border rounded-[var(--radius-sm)] transition-colors ${
                        isRecorded
                          ? 'bg-green-50 border-green-300 hover:bg-green-100'
                          : 'border-[var(--border)] hover:border-[var(--muted)] hover:bg-[var(--accent)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {isRecorded ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-5 h-5 text-green-600"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-5 h-5 text-[var(--muted)]"
                            >
                              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                              <line x1="12" x2="12" y1="19" y2="22" />
                            </svg>
                          )}
                        </span>
                        <div>
                          <span className="font-medium text-sm">
                            {text.title}
                          </span>
                          <span className="text-sm text-[var(--muted)] ml-2">
                            ({text.estimatedDuration})
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-[var(--radius-full)] ${
                        isRecorded
                          ? 'bg-green-200 text-green-800'
                          : 'bg-[var(--accent)] text-[var(--muted)]'
                      }`}>
                        {isRecorded ? 'Recorded' : 'Not recorded'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audio Sample (optional) */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Or upload an existing sample (MP3, max 10MB)
              </label>
              <input
                name="audioSample"
                type="file"
                accept="audio/mp3,audio/mpeg"
                className="w-full text-sm text-[var(--muted)] file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius-sm)] file:border-0 file:text-sm file:font-medium file:bg-[var(--accent)] file:text-[var(--accent-foreground)] hover:file:bg-[var(--border)] file:cursor-pointer"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || selectedLanguages.length === 0 || selectedStyles.length === 0}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Voice Recording Modal */}
      {selectedText && (
        <VoiceRecordingModal
          isOpen={!!selectedText}
          onClose={() => setSelectedText(null)}
          text={selectedText}
          onSave={(blob) => handleSaveRecording(selectedText.id, blob)}
          existingRecording={recordings[selectedText.id]}
        />
      )}
    </div>
  );
}
