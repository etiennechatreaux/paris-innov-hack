'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and tagline */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--primary)] rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </div>
            <span className="font-medium">VoiceHub</span>
            <span className="text-[var(--muted)] text-sm ml-2">
              {t('tagline')}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <Link href="/voices" className="hover:text-[var(--foreground)] transition-colors">
              {t('browseVoices')}
            </Link>
            <Link href="/apply" className="hover:text-[var(--foreground)] transition-colors">
              {t('becomeAVoice')}
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--muted)]">
          <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
