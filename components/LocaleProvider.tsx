'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Locale, defaultLocale } from '@/lib/i18n';

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

type Messages = Record<string, unknown>;

type Props = {
  children: ReactNode;
  messages: Record<string, Messages>;
};

export function LocaleProvider({ children, messages }: Props) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [currentMessages, setCurrentMessages] = useState<Messages>(messages[defaultLocale]);

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null;
    if (stored && (stored === 'en' || stored === 'fr')) {
      setLocaleState(stored);
      setCurrentMessages(messages[stored]);
    }
  }, [messages]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setCurrentMessages(messages[newLocale]);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={currentMessages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
