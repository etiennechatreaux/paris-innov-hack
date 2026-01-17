'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from './ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const t = useTranslations('nav');

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
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
            <span className="font-semibold text-lg">VoiceHub</span>
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
              <Link href="/apply" className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors">
                Enterprise
              </Link>
              <Link href="/home">
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
