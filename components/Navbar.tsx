'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from './ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { VoxLogo } from './VoxLogo';

export function Navbar() {
  const t = useTranslations('nav');

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <VoxLogo size={20} className="text-white" />
            </div>
            <span className="font-semibold text-lg">Vox</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/voices"
              className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              {t('browseVoices')}
            </Link>
            <Link
              href="/apply"
              className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              {t('forTalent')}
            </Link>
          </div>

          {/* CTA + Language Switcher */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="flex items-center gap-3">
              <Link href="/voices" className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors">
                Enterprise
              </Link>
              <Link href="/voices">
                <Button variant="outline" size="sm" className="bg-gray-100 border-0">
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
