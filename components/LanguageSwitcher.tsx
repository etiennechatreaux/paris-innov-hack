'use client';

import { useLocale } from './LocaleProvider';
import { Locale } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const languages: { code: Locale; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
  ];

  return (
    <div className="flex items-center bg-[var(--accent)] rounded-full p-0.5">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          className={`
            px-3 py-1 text-xs font-medium rounded-full transition-all duration-200
            ${locale === code
              ? 'bg-white text-[var(--foreground)] shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--foreground)]'
            }
          `}
          aria-label={`Switch to ${code === 'en' ? 'English' : 'French'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
