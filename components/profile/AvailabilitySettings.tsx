'use client';

import { useState } from 'react';

interface AvailabilitySettingsProps {
  initialData: {
    isAvailable: boolean;
    timezone: string;
    preferredContact: string;
  };
  onSave: (data: AvailabilitySettingsProps['initialData']) => void;
}

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
];

const CONTACT_METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'platform', label: 'Platform Messages' },
];

export function AvailabilitySettings({
  initialData,
  onSave,
}: AvailabilitySettingsProps) {
  const [formData, setFormData] = useState(initialData);

  const handleToggleAvailability = () => {
    const newData = { ...formData, isAvailable: !formData.isAvailable };
    setFormData(newData);
    onSave(newData);
  };

  const handleTimezoneChange = (timezone: string) => {
    const newData = { ...formData, timezone };
    setFormData(newData);
    onSave(newData);
  };

  const handleContactChange = (preferredContact: string) => {
    const newData = { ...formData, preferredContact };
    setFormData(newData);
    onSave(newData);
  };

  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
      <h3 className="text-lg font-semibold mb-6">Availability & Preferences</h3>

      <div className="space-y-6">
        {/* Availability Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Available for new projects</p>
            <p className="text-sm text-[var(--muted)]">
              Show your profile to potential clients
            </p>
          </div>
          <button
            onClick={handleToggleAvailability}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              formData.isAvailable ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                formData.isAvailable ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted)] mb-2">
            Timezone
          </label>
          <select
            value={formData.timezone}
            onChange={(e) => handleTimezoneChange(e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Contact */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted)] mb-2">
            Preferred Contact Method
          </label>
          <div className="flex gap-2">
            {CONTACT_METHODS.map((method) => (
              <button
                key={method.value}
                onClick={() => handleContactChange(method.value)}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                  formData.preferredContact === method.value
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                    : 'border-[var(--border)] hover:border-[var(--primary)]'
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
