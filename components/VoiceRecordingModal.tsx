'use client';

import { useEffect, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { ReadingText } from '@/data/reading-texts';

interface VoiceRecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: ReadingText;
  onSave: (blob: Blob) => void;
  existingRecording?: Blob | null;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function VoiceRecordingModal({
  isOpen,
  onClose,
  text,
  onSave,
  existingRecording,
}: VoiceRecordingModalProps) {
  const {
    isRecording,
    audioBlob,
    audioUrl,
    recordingTime,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  } = useVoiceRecorder();

  const audioRef = useRef<HTMLAudioElement>(null);

  // Reset recording when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetRecording();
    }
  }, [isOpen, resetRecording]);

  const handleSave = () => {
    if (audioBlob) {
      onSave(audioBlob);
      onClose();
    }
  };

  const handleClose = () => {
    if (isRecording) {
      stopRecording();
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Record: ${text.title} (${text.estimatedDuration})`}
      className="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-[var(--radius-sm)] text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Recording status */}
        <div className="flex items-center justify-center gap-4 py-4">
          {isRecording && (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
          <span className="text-2xl font-mono font-semibold tabular-nums">
            {formatTime(recordingTime)}
          </span>
          {isRecording && (
            <span className="text-sm text-[var(--muted)]">Recording...</span>
          )}
        </div>

        {/* Text to read */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--foreground)]">
            Text to read:
          </label>
          <div className="max-h-64 overflow-y-auto p-4 bg-[var(--accent)] rounded-[var(--radius-sm)] text-sm leading-relaxed whitespace-pre-wrap border border-[var(--border)]">
            {text.content}
          </div>
        </div>

        {/* Audio playback */}
        {audioUrl && !isRecording && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--foreground)]">
              Your recording:
            </label>
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              className="w-full h-10"
            />
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap gap-3 justify-end pt-4 border-t border-[var(--border)]">
          {!isRecording && !audioBlob && (
            <Button onClick={startRecording} disabled={!!error}>
              <MicIcon className="w-4 h-4 mr-2" />
              Start Recording
            </Button>
          )}

          {isRecording && (
            <Button onClick={stopRecording} variant="outline">
              <StopIcon className="w-4 h-4 mr-2" />
              Stop Recording
            </Button>
          )}

          {audioBlob && !isRecording && (
            <>
              <Button onClick={resetRecording} variant="ghost">
                Re-record
              </Button>
              <Button onClick={handleSave}>
                <CheckIcon className="w-4 h-4 mr-2" />
                Save Recording
              </Button>
            </>
          )}

          {!isRecording && !audioBlob && (
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

// Icons
function MicIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function StopIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="14" height="14" x="5" y="5" rx="2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
