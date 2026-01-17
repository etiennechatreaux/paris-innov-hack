'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SidebarNavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
}

export function SidebarNavItem({ href, icon, label, isActive }: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'w-full h-10 rounded-xl flex items-center gap-3 px-3 transition-all duration-200',
        isActive
          ? 'bg-[var(--accent)] text-[var(--foreground)]'
          : 'text-[var(--muted)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]'
      )}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
