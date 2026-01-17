import Link from 'next/link';
import Image from 'next/image';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { formatPrice, parseJsonArray } from '@/lib/utils';

interface VoiceCardProps {
  id: string;
  name: string;
  avatarUrl: string | null;
  languages: string;
  styles: string;
  pricePerHour: number;
  gender: string;
}

export function VoiceCard({
  id,
  name,
  avatarUrl,
  languages,
  styles,
  pricePerHour,
  gender,
}: VoiceCardProps) {
  const languageList = parseJsonArray(languages);
  const styleList = parseJsonArray(styles);

  return (
    <Link href={`/voices/${id}`}>
      <Card hover className="h-full">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[var(--accent)] flex-shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-medium text-[var(--muted)]">
                  {name.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[var(--foreground)] truncate">
                {name}
              </h3>
              <p className="text-sm text-[var(--muted)] capitalize">{gender}</p>
            </div>

            {/* Price */}
            <div className="text-right flex-shrink-0">
              <div className="font-semibold text-[var(--foreground)]">
                {formatPrice(pricePerHour)}
              </div>
              <div className="text-xs text-[var(--muted)]">/hour</div>
            </div>
          </div>

          {/* Languages */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {languageList.slice(0, 3).map((lang) => (
              <Badge key={lang} variant="secondary">
                {lang}
              </Badge>
            ))}
            {languageList.length > 3 && (
              <Badge variant="outline">+{languageList.length - 3}</Badge>
            )}
          </div>

          {/* Styles */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {styleList.slice(0, 2).map((style) => (
              <span
                key={style}
                className="text-xs text-[var(--muted)]"
              >
                {style}
              </span>
            ))}
            {styleList.length > 2 && (
              <span className="text-xs text-[var(--muted)]">
                +{styleList.length - 2} more
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
