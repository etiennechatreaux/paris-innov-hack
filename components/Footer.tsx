'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { VoxLogo } from './VoxLogo';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and tagline */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--primary)] rounded-md flex items-center justify-center">
              <VoxLogo size={14} className="text-white" />
            </div>
            <span className="font-medium">Vox</span>
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
