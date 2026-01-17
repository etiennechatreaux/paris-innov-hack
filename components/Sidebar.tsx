'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SidebarNavItem } from './SidebarNavItem';

// Icon components
function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function EarningsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function ReferralIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const navItems = [
  { href: '/home', icon: <HomeIcon />, labelKey: 'home' },
  { href: '/explore', icon: <ExploreIcon />, labelKey: 'explore' },
  { href: '/earnings', icon: <EarningsIcon />, labelKey: 'earnings' },
  { href: '/referral', icon: <ReferralIcon />, labelKey: 'referral' },
  { href: '/profile', icon: <ProfileIcon />, labelKey: 'profile' },
];

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('sidebar');

  return (
    <aside className="fixed left-0 top-0 h-screen w-48 bg-white border-r border-[var(--border)] flex flex-col py-4 px-3 z-50">
      {/* Logo at top */}
      <Link href="/home" className="mb-8">
        <div className="w-10 h-10 bg-[var(--primary)] rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </div>
      </Link>

      {/* Navigation items */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={t(item.labelKey)}
            isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
          />
        ))}
      </nav>

      {/* User avatar at bottom */}
      <div className="mt-auto pt-4 border-t border-[var(--border)]">
        <button className="w-full h-10 rounded-xl bg-[var(--accent)] flex items-center gap-3 px-3 text-sm font-semibold hover:bg-[var(--border)] transition-colors">
          <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs">B</span>
          <span className="text-[var(--foreground)]">Account</span>
        </button>
      </div>
    </aside>
  );
}
