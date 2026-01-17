'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AccountSettingsProps {
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  hasPaymentMethod: boolean;
  onNotificationChange: (key: string, value: boolean) => void;
  onDeleteAccount: () => void;
}

export function AccountSettings({
  notifications,
  hasPaymentMethod,
  onNotificationChange,
  onDeleteAccount,
}: AccountSettingsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Security</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Password</p>
            <p className="text-sm text-[var(--muted)]">
              Last changed 3 months ago
            </p>
          </div>
          <button className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--accent)] transition-colors text-sm">
            Change Password
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email notifications</p>
              <p className="text-sm text-[var(--muted)]">
                Receive updates about new contracts and messages
              </p>
            </div>
            <button
              onClick={() => onNotificationChange('email', !notifications.email)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.email ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.email ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push notifications</p>
              <p className="text-sm text-[var(--muted)]">
                Get notified in your browser
              </p>
            </div>
            <button
              onClick={() => onNotificationChange('push', !notifications.push)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.push ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.push ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing emails</p>
              <p className="text-sm text-[var(--muted)]">
                Receive tips and product updates
              </p>
            </div>
            <button
              onClick={() =>
                onNotificationChange('marketing', !notifications.marketing)
              }
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications.marketing
                  ? 'bg-[var(--primary)]'
                  : 'bg-[var(--border)]'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.marketing ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Payment</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Payment method</p>
            <p className="text-sm text-[var(--muted)]">
              {hasPaymentMethod
                ? 'Connected to Stripe'
                : 'No payment method connected'}
            </p>
          </div>
          <Link
            href="/earnings"
            className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--accent)] transition-colors text-sm"
          >
            {hasPaymentMethod ? 'Manage' : 'Connect'}
          </Link>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-[var(--radius-lg)] border border-red-200 p-6">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
        {!showDeleteConfirm ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete account</p>
              <p className="text-sm text-[var(--muted)]">
                Permanently delete your account and all data
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
            >
              Delete Account
            </button>
          </div>
        ) : (
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-red-600 mb-4">
              Are you sure? This action cannot be undone. All your data,
              contracts, and earnings history will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Yes, Delete My Account
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-white transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
