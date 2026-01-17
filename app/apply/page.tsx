'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set('languages', JSON.stringify(selectedLanguages));
    formData.set('styles', JSON.stringify(selectedStyles));

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

            {/* Audio Sample */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Voice Sample (MP3, max 10MB)
              </label>
              <input
                name="audioSample"
                type="file"
                accept="audio/mp3,audio/mpeg"
                className="w-full text-sm text-[var(--muted)] file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius-sm)] file:border-0 file:text-sm file:font-medium file:bg-[var(--accent)] file:text-[var(--accent-foreground)] hover:file:bg-[var(--border)] file:cursor-pointer"
                required
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
    </div>
  );
}
