'use client';

import { useState } from 'react';
import { VoiceRadar } from '@/components/ui/VoiceRadar';

export default function VoiceRadarDemoPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Interprétation textuelle de la position
  const getTemperatureLabel = (x: number) => {
    if (x < -0.5) return 'Très froid';
    if (x < -0.2) return 'Froid';
    if (x < 0.2) return 'Neutre';
    if (x < 0.5) return 'Chaud';
    return 'Très chaud';
  };

  const getExpressivityLabel = (y: number) => {
    if (y < -0.5) return 'Très monotone';
    if (y < -0.2) return 'Monotone';
    if (y < 0.2) return 'Modéré';
    if (y < 0.5) return 'Expressif';
    return 'Très expressif';
  };

  return (
    <main className="min-h-screen bg-[var(--background)] py-16">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
          Sélecteur de ton de voix
        </h1>
        <p className="text-[var(--muted)] mb-12">
          Déplacez le point pour définir le style émotionnel de la voix souhaitée.
        </p>

        {/* Composant VoiceRadar */}
        <div className="flex justify-center mb-12">
          <VoiceRadar
            value={position}
            onChange={setPosition}
            size={320}
          />
        </div>

        {/* Interprétation de la position */}
        <div className="bg-[var(--accent)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Voix sélectionnée
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-[var(--muted)]">Température</span>
              <p className="text-[var(--foreground)] font-medium">
                {getTemperatureLabel(position.x)}
              </p>
            </div>
            <div>
              <span className="text-sm text-[var(--muted)]">Expressivité</span>
              <p className="text-[var(--foreground)] font-medium">
                {getExpressivityLabel(position.y)}
              </p>
            </div>
          </div>

          {/* Valeurs brutes pour debug/intégration */}
          <div className="mt-6 pt-4 border-t border-[var(--border)]">
            <span className="text-xs text-[var(--muted)]">Valeurs brutes (pour API)</span>
            <pre className="mt-1 text-sm font-mono text-[var(--foreground)] bg-[var(--background)] p-2 rounded-[var(--radius-sm)]">
{JSON.stringify(position, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
