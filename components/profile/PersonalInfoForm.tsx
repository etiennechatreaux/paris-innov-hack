'use client';

import { useState } from 'react';

interface PersonalInfoFormProps {
  initialData: {
    name: string;
    email: string;
    age: number;
    gender: string;
    description: string;
  };
  onSave: (data: PersonalInfoFormProps['initialData']) => void;
}

export function PersonalInfoForm({ initialData, onSave }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-[var(--primary)] hover:underline"
          >
            Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted)] mb-1">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          ) : (
            <p className="text-[var(--foreground)]">{formData.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted)] mb-1">
            Email
          </label>
          <p className="text-[var(--foreground)]">{formData.email}</p>
          <p className="text-xs text-[var(--muted)] mt-1">
            Contact support to change your email
          </p>
        </div>

        {/* Age & Gender */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--muted)] mb-1">
              Age
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              />
            ) : (
              <p className="text-[var(--foreground)]">{formData.age}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--muted)] mb-1">
              Gender
            </label>
            {isEditing ? (
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p className="text-[var(--foreground)] capitalize">{formData.gender}</p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-[var(--muted)] mb-1">
            Bio
          </label>
          {isEditing ? (
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
            />
          ) : (
            <p className="text-[var(--foreground)] text-sm leading-relaxed">
              {formData.description}
            </p>
          )}
        </div>

        {/* Actions */}
        {isEditing && (
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--accent)] transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
