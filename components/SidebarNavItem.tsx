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
        'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group relative',
        isActive
          ? 'bg-[var(--primary)] text-white'
          : 'text-[var(--muted)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]'
      )}
      title={label}
    >
      {icon}

      {/* Tooltip on hover */}
      <span className="absolute left-14 px-2 py-1 bg-[var(--primary)] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {label}
      </span>
    </Link>
  );
}
