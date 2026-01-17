'use client';

import { useState, useRef, useEffect } from 'react';
import { formatDateRange } from '@/lib/earnings-data';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange?: (start: Date, end: Date) => void;
}

const presets = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'This month', days: 0 },
  { label: 'Last 3 months', days: 90 },
];

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePresetClick = (days: number) => {
    const end = new Date();
    let start: Date;

    if (days === 0) {
      // This month
      start = new Date(end.getFullYear(), end.getMonth(), 1);
    } else {
      start = new Date();
      start.setDate(start.getDate() - days);
    }

    onChange?.(start, end);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-[var(--border)] rounded-[var(--radius-sm)] bg-white hover:bg-[var(--accent)] transition-colors"
      >
        <svg
          className="w-4 h-4 text-[var(--muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>Billing Date : {formatDateRange(startDate, endDate)}</span>
        <svg
          className={`w-4 h-4 text-[var(--muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[var(--border)] rounded-[var(--radius)] shadow-[var(--shadow-md)] z-10">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePresetClick(preset.days)}
              className="w-full px-4 py-2 text-sm text-left hover:bg-[var(--accent)] transition-colors first:rounded-t-[var(--radius)] last:rounded-b-[var(--radius)]"
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
