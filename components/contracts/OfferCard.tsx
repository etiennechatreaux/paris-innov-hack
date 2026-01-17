'use client';

import { Card } from '@/components/ui/Card';
import { Offer, formatExpirationCountdown } from '@/lib/contracts-data';
import { TrustShield } from './TrustShield';

interface OfferCardProps {
  offer: Offer;
  onAccept?: (offerId: string) => void;
  onDecline?: (offerId: string) => void;
}

export function OfferCard({ offer, onAccept, onDecline }: OfferCardProps) {
  const expirationText = formatExpirationCountdown(offer.expiresAt);
  const isExpiringSoon = offer.expiresAt.getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;

  return (
    <Card className="p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={offer.clientAvatar}
            alt={offer.clientName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-[var(--foreground)]">
              {offer.clientName}
            </h3>
            <p className="text-sm text-[var(--muted)]">{offer.useCase}</p>
          </div>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            isExpiringSoon
              ? 'bg-orange-50 text-orange-600'
              : 'bg-gray-100 text-[var(--muted)]'
          }`}
        >
          {expirationText}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-[var(--foreground)] line-clamp-2">
        "{offer.description}"
      </p>

      {/* Details row */}
      <div className="mt-3 flex items-center gap-3 text-sm">
        <span className="font-medium text-[var(--foreground)]">
          ${Math.round(offer.proposedRate / 100)}/hr
        </span>
        <span className="text-[var(--muted)]">&bull;</span>
        <span className="text-[var(--muted)]">{offer.estimatedDuration}</span>
        <span className="text-[var(--muted)]">&bull;</span>
        <span className={`capitalize ${offer.exclusivity === 'exclusive' ? 'text-purple-600 font-medium' : 'text-[var(--muted)]'}`}>
          {offer.exclusivity}
        </span>
      </div>

      {/* Trust shields */}
      <div className="mt-3">
        <TrustShield protections={offer.protections} />
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-end gap-3">
        <button
          onClick={() => onDecline?.(offer.id)}
          className="px-4 py-2 text-sm font-medium text-[var(--muted)] border border-[var(--border)] rounded-[var(--radius)] hover:bg-[var(--accent)] transition-colors"
        >
          Decline
        </button>
        <button
          onClick={() => onAccept?.(offer.id)}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-[var(--radius)] hover:bg-green-700 transition-colors"
        >
          Accept
        </button>
      </div>
    </Card>
  );
}
