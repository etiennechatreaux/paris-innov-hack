'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Données des quadrants pour le feedback
const quadrantData = {
  institutional: {
    label: 'Institutionnelle',
    adjectives: ['Froid', 'Neutre'],
    useCases: ['Annonces officielles', 'Documentation', 'Tutoriels techniques', 'E-learning'],
  },
  reassuring: {
    label: 'Rassurante',
    adjectives: ['Chaud', 'Neutre'],
    useCases: ['Support client', 'Méditation', 'Santé', 'Applications bien-être'],
  },
  authoritative: {
    label: 'Autoritaire',
    adjectives: ['Froid', 'Expressif'],
    useCases: ['News', 'Documentaire', 'Formation sérieuse', 'Voix corporate'],
  },
  engaging: {
    label: 'Engagée',
    adjectives: ['Chaud', 'Expressif'],
    useCases: ['Publicité', 'Podcast', 'Storytelling', 'Vidéos promotionnelles'],
  },
} as const;

type QuadrantKey = keyof typeof quadrantData;

// Détermine le quadrant actif selon la position
const getQuadrant = (x: number, y: number): QuadrantKey => {
  if (x < 0 && y < 0) return 'institutional';
  if (x >= 0 && y < 0) return 'reassuring';
  if (x < 0 && y >= 0) return 'authoritative';
  return 'engaging';
};

// Calcule l'intensité (distance du centre, 0-1)
const getIntensity = (x: number, y: number): number => {
  return Math.min(1, Math.sqrt(x * x + y * y));
};

interface VoiceRadarProps {
  /** Position actuelle du point (x, y) normalisée entre -1 et 1 */
  value?: { x: number; y: number };
  /** Callback appelé à chaque changement de position */
  onChange?: (value: { x: number; y: number }) => void;
  /** Taille du radar en pixels (défaut: 320) */
  size?: number;
  /** Classes CSS additionnelles */
  className?: string;
  /** Afficher le panneau de feedback (défaut: true) */
  showFeedback?: boolean;
}

/**
 * VoiceRadar - Sélecteur 2D premium pour le ton de voix
 *
 * Axes:
 * - X: Température (Froid -1 ← → +1 Chaud)
 * - Y: Expressivité (Neutre -1 ↓ ↑ +1 Expressif)
 *
 * Quadrants:
 * - Bas-gauche: Institutionnelle (Froid + Neutre)
 * - Bas-droite: Rassurante (Chaud + Neutre)
 * - Haut-gauche: Autoritaire (Froid + Expressif)
 * - Haut-droite: Engagée (Chaud + Expressif)
 */
export function VoiceRadar({
  value,
  onChange,
  size = 320,
  className,
  showFeedback = true,
}: VoiceRadarProps) {
  const [internalPosition, setInternalPosition] = useState({ x: 0, y: 0 });
  const position = value ?? internalPosition;
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Détermine le quadrant et l'intensité actuels
  const currentQuadrant = getQuadrant(position.x, position.y);
  const intensity = getIntensity(position.x, position.y);
  const feedback = quadrantData[currentQuadrant];

  // Extrait les coordonnées depuis événement souris ou tactile
  const getCoordinates = useCallback((e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e && e.touches.length > 0) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    }
    if ('clientX' in e) {
      return { clientX: e.clientX, clientY: e.clientY };
    }
    return null;
  }, []);

  // Convertit pixel → normalisé [-1, 1]
  const pixelToNormalized = useCallback((clientX: number, clientY: number): { x: number; y: number } => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const relX = clientX - rect.left - rect.width / 2;
    const relY = clientY - rect.top - rect.height / 2;
    const x = Math.max(-1, Math.min(1, relX / (rect.width / 2)));
    const y = Math.max(-1, Math.min(1, -(relY / (rect.height / 2))));
    return { x, y };
  }, []);

  const updatePosition = useCallback((newPos: { x: number; y: number }) => {
    if (!value) setInternalPosition(newPos);
    onChange?.(newPos);
  }, [value, onChange]);

  // Handlers souris
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isDragging) return;
    const newPos = pixelToNormalized(e.clientX, e.clientY);
    updatePosition(newPos);
  }, [isDragging, pixelToNormalized, updatePosition]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const newPos = pixelToNormalized(e.clientX, e.clientY);
    updatePosition(newPos);
  }, [isDragging, pixelToNormalized, updatePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handlers tactile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    const coords = getCoordinates(e);
    if (coords) {
      const newPos = pixelToNormalized(coords.clientX, coords.clientY);
      updatePosition(newPos);
    }
  }, [getCoordinates, pixelToNormalized, updatePosition]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    const coords = getCoordinates(e);
    if (coords) {
      const newPos = pixelToNormalized(coords.clientX, coords.clientY);
      updatePosition(newPos);
    }
  }, [isDragging, getCoordinates, pixelToNormalized, updatePosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Event listeners globaux
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const dotStyle = {
    left: `${((position.x + 1) / 2) * 100}%`,
    top: `${((1 - position.y) / 2) * 100}%`,
  };

  return (
    <div className={cn('flex flex-col md:flex-row gap-8 items-center md:items-start', className)}>
      {/* Radar */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative" style={{ width: size + 80, height: size + 80 }}>
          {/* Labels des axes */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-sm font-medium text-[var(--muted)]">
            Expressif
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm font-medium text-[var(--muted)]">
            Neutre
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--muted)]">
            Froid
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--muted)]">
            Chaud
          </div>

          {/* Zone interactive */}
          <div
            ref={containerRef}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              'bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-lg)]',
              'cursor-crosshair select-none overflow-hidden',
              'touch-none' // Empêche le scroll pendant le drag
            )}
            style={{ width: size, height: size }}
          >
            {/* SVG: quadrants + grille */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Quadrants subtils */}
              <rect x="0" y="50" width="50" height="50" fill="rgba(100,120,140,0.035)" /> {/* Institutionnelle */}
              <rect x="50" y="50" width="50" height="50" fill="rgba(200,160,120,0.035)" /> {/* Rassurante */}
              <rect x="0" y="0" width="50" height="50" fill="rgba(80,90,100,0.045)" /> {/* Autoritaire */}
              <rect x="50" y="0" width="50" height="50" fill="rgba(220,140,80,0.045)" /> {/* Engagée */}

              {/* Axes principaux */}
              <line x1="50" y1="0" x2="50" y2="100" stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

              {/* Grille secondaire */}
              {[25, 75].map((pos) => (
                <g key={pos}>
                  <line x1={pos} y1="0" x2={pos} y2="100" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2,4" vectorEffect="non-scaling-stroke" opacity="0.4" />
                  <line x1="0" y1={pos} x2="100" y2={pos} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2,4" vectorEffect="non-scaling-stroke" opacity="0.4" />
                </g>
              ))}
            </svg>

            {/* Point draggable avec halo */}
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className={cn(
                'absolute w-6 h-6 -ml-3 -mt-3',
                'transition-[left,top] duration-100 ease-out',
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              )}
              style={dotStyle}
            >
              {/* Halo externe */}
              <div
                className={cn(
                  'absolute inset-0 rounded-full bg-[var(--primary)]',
                  'blur-md transition-opacity duration-300',
                  isDragging ? 'opacity-30 scale-[2]' : 'opacity-15 scale-[1.8]'
                )}
              />
              {/* Point central */}
              <div
                className={cn(
                  'relative w-full h-full rounded-full',
                  'bg-[var(--primary)] border-2 border-[var(--background)]',
                  'shadow-[var(--shadow-md)]',
                  'transition-transform duration-150',
                  isDragging ? 'scale-110' : 'hover:scale-110'
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Panneau de feedback */}
      {showFeedback && (
        <div
          className={cn(
            'w-full md:w-64 p-5',
            'bg-[var(--accent)] border border-[var(--border)] rounded-[var(--radius-lg)]',
            'transition-all duration-200'
          )}
        >
          {/* Ton dominant */}
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-[var(--muted)]">Ton</span>
            <p className="text-xl font-semibold text-[var(--foreground)] mt-1">
              {feedback.label}
            </p>
          </div>

          {/* Adjectifs */}
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-[var(--muted)]">Caractère</span>
            <div className="flex gap-2 mt-1.5">
              {feedback.adjectives.map((adj) => (
                <span
                  key={adj}
                  className="px-2.5 py-1 text-sm bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--foreground)]"
                >
                  {adj}
                </span>
              ))}
            </div>
          </div>

          {/* Cas d'usage */}
          <div>
            <span className="text-xs uppercase tracking-wider text-[var(--muted)]">Cas d'usage</span>
            <ul className="mt-1.5 space-y-1">
              {feedback.useCases.map((useCase) => (
                <li key={useCase} className="text-sm text-[var(--foreground)] flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--muted)]" />
                  {useCase}
                </li>
              ))}
            </ul>
          </div>

          {/* Intensité */}
          <div className="mt-5 pt-4 border-t border-[var(--border)]">
            <div className="flex justify-between items-center text-xs text-[var(--muted)]">
              <span>Intensité</span>
              <span className="font-mono">{Math.round(intensity * 100)}%</span>
            </div>
            <div className="mt-1.5 h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--primary)] rounded-full transition-all duration-200"
                style={{ width: `${intensity * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
