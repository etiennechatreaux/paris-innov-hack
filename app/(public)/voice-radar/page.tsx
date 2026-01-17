'use client';

import { useState } from 'react';
import { VoiceRadar } from '@/components/ui/VoiceRadar';

export default function VoiceRadarDemoPage() {
  const [position, setPosition] = useState({ x: 0.3, y: 0.4 });

  return (
    <main className="min-h-screen bg-[var(--background)] py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Sélecteur de ton de voix
          </h1>
          <p className="text-[var(--muted)] max-w-xl">
            Explorez le plan 2D pour trouver le ton idéal. Déplacez le point pour voir les cas d'usage correspondants.
          </p>
        </div>

        {/* VoiceRadar avec panneau de feedback intégré */}
        <VoiceRadar
          value={position}
          onChange={setPosition}
          size={340}
          showFeedback={true}
        />

        {/* Valeurs API (dev) */}
        <div className="mt-12 p-4 bg-[var(--accent)] border border-[var(--border)] rounded-[var(--radius)] max-w-xs">
          <span className="text-xs uppercase tracking-wider text-[var(--muted)]">Valeurs API</span>
          <pre className="mt-2 text-sm font-mono text-[var(--foreground)]">
{`{ x: ${position.x.toFixed(2)}, y: ${position.y.toFixed(2)} }`}
          </pre>
        </div>
      </div>
    </main>
  );
}
