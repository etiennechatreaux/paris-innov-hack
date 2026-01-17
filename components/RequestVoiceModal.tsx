'use client';

import { useState, FormEvent } from 'react';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface RequestVoiceModalProps {
  voiceId: string;
  voiceName: string;
}

export function RequestVoiceModal({ voiceId, voiceName }: RequestVoiceModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      setIsOpen(false);
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="lg" className="w-full sm:w-auto">
        Request This Voice
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-2"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={isSuccess ? 'Request Sent!' : `Request ${voiceName}`}
      >
        {isSuccess ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-[var(--muted)]">
              Your request has been sent to {voiceName}. They&apos;ll get back to you soon!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              type="email"
              label="Your Email"
              placeholder="you@example.com"
              required
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Project Description
              </label>
              <textarea
                name="description"
                rows={4}
                className="w-full px-3 py-2 text-sm bg-white border border-[var(--border)] rounded-[var(--radius-sm)] placeholder:text-[var(--muted-foreground)] transition-colors hover:border-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-1 resize-none"
                placeholder="Tell us about your project, timeline, and any specific requirements..."
                required
              />
            </div>

            <input type="hidden" name="voiceId" value={voiceId} />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
