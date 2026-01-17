'use client';

import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  email: string;
  avatarUrl: string | null;
  isVerified: boolean;
  memberSince: Date;
  completedContracts: number;
  rating: number;
}

export function ProfileCard({
  name,
  email,
  avatarUrl,
  isVerified,
  memberSince,
  completedContracts,
  rating,
}: ProfileCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-2xl font-semibold">
              {initials}
            </div>
          )}
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center text-white hover:bg-[var(--primary-hover)] transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </button>
        </div>

        {/* Name & Email */}
        <h2 className="text-lg font-semibold text-[var(--foreground)]">{name}</h2>
        <p className="text-sm text-[var(--muted)]">{email}</p>

        {/* Verification Badge */}
        <span
          className={`mt-2 px-3 py-1 text-xs font-medium rounded-full ${
            isVerified
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {isVerified ? 'Verified' : 'Pending Verification'}
        </span>
      </div>

      {/* Stats */}
      <div className="border-t border-[var(--border)] pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted)]">Member since</span>
          <span className="font-medium">
            {memberSince.toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted)]">Completed contracts</span>
          <span className="font-medium">{completedContracts}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted)]">Rating</span>
          <span className="font-medium flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-yellow-500"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
