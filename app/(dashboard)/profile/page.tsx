'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { PersonalInfoForm } from '@/components/profile/PersonalInfoForm';
import { ProfessionalInfoForm } from '@/components/profile/ProfessionalInfoForm';
import { AvailabilitySettings } from '@/components/profile/AvailabilitySettings';
import { AccountSettings } from '@/components/profile/AccountSettings';
import { voices } from '@/lib/data';

// Use first voice as mock current user
const currentUser = voices[0];

export default function ProfilePage() {
  const t = useTranslations('sidebar');

  // Mock state - in real app this would come from API/context
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });

  const handlePersonalInfoSave = (data: {
    name: string;
    email: string;
    age: number;
    gender: string;
    description: string;
  }) => {
    console.log('Saving personal info:', data);
    // TODO: Implement API call
  };

  const handleProfessionalInfoSave = (data: {
    languages: string[];
    styles: string[];
    pricePerHour: number;
    audioSamplePath: string;
  }) => {
    console.log('Saving professional info:', data);
    // TODO: Implement API call
  };

  const handleAvailabilitySave = (data: {
    isAvailable: boolean;
    timezone: string;
    preferredContact: string;
  }) => {
    console.log('Saving availability:', data);
    // TODO: Implement API call
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    console.log('Notification changed:', key, value);
    // TODO: Implement API call
  };

  const handleDeleteAccount = () => {
    console.log('Delete account requested');
    // TODO: Implement account deletion
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">{t('profile')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar - Profile Card */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <ProfileCard
            name={currentUser.name}
            email={currentUser.email}
            avatarUrl={currentUser.avatarUrl}
            isVerified={true}
            memberSince={currentUser.createdAt}
            completedContracts={24}
            rating={4.9}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Personal Information */}
          <PersonalInfoForm
            initialData={{
              name: currentUser.name,
              email: currentUser.email,
              age: currentUser.age,
              gender: currentUser.gender,
              description: currentUser.description,
            }}
            onSave={handlePersonalInfoSave}
          />

          {/* Professional Information */}
          <ProfessionalInfoForm
            initialData={{
              languages: JSON.parse(currentUser.languages),
              styles: JSON.parse(currentUser.styles),
              pricePerHour: currentUser.pricePerHour,
              audioSamplePath: currentUser.audioSamplePath,
            }}
            onSave={handleProfessionalInfoSave}
          />

          {/* Availability & Preferences */}
          <AvailabilitySettings
            initialData={{
              isAvailable: true,
              timezone: 'America/New_York',
              preferredContact: 'email',
            }}
            onSave={handleAvailabilitySave}
          />

          {/* Account Settings */}
          <AccountSettings
            notifications={notifications}
            hasPaymentMethod={false}
            onNotificationChange={handleNotificationChange}
            onDeleteAccount={handleDeleteAccount}
          />
        </div>
      </div>
    </div>
  );
}
