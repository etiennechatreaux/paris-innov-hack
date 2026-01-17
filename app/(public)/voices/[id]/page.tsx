import { notFound } from 'next/navigation';
import Image from 'next/image';
import { voices } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AudioPlayer } from '@/components/AudioPlayer';
import { RequestVoiceModal } from '@/components/RequestVoiceModal';
import { formatPrice, parseJsonArray } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VoiceProfilePage({ params }: PageProps) {
  const { id } = await params;

  const voice = voices.find((v) => v.id === id);

  if (!voice) {
    notFound();
  }

  const languages = parseJsonArray(voice.languages);
  const styles = parseJsonArray(voice.styles);

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-[var(--accent)] flex-shrink-0">
          {voice.avatarUrl ? (
            <Image
              src={voice.avatarUrl}
              alt={voice.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-medium text-[var(--muted)]">
              {voice.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[var(--foreground)]">
                {voice.name}
              </h1>
              <p className="mt-1 text-[var(--muted)] capitalize">{voice.gender}</p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-2xl font-bold text-[var(--foreground)]">
                {formatPrice(voice.pricePerHour)}
              </div>
              <div className="text-sm text-[var(--muted)]">per hour</div>
            </div>
          </div>

          {/* Languages */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-[var(--muted)] mb-2">
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Badge key={lang} variant="secondary">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Styles */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-[var(--muted)] mb-2">
              Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <Badge key={style} variant="outline">
                  {style}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audio Sample */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
          Voice Sample
        </h2>
        <AudioPlayer src={voice.audioSamplePath} name={voice.name} />
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
          About
        </h2>
        <p className="text-[var(--muted)] leading-relaxed">
          {voice.description}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-10 pt-10 border-t border-[var(--border)]">
        <RequestVoiceModal voiceId={voice.id} voiceName={voice.name} />
      </div>
    </div>
  );
}
