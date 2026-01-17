'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VoiceRadarProps {
  /** Position actuelle du point (x, y) normalisée entre -1 et 1 */
  value?: { x: number; y: number };
  /** Callback appelé à chaque changement de position */
  onChange?: (value: { x: number; y: number }) => void;
  /** Taille du radar en pixels (défaut: 300) */
  size?: number;
  /** Classes CSS additionnelles */
  className?: string;
}

/**
 * VoiceRadar - Composant de sélection 2D pour le ton de voix
 *
 * Axes:
 * - X: Température (Froid -1 ← → +1 Chaud)
 * - Y: Expressivité (Neutre -1 ↓ ↑ +1 Expressif)
 */
export function VoiceRadar({
  value,
  onChange,
  size = 300,
  className,
}: VoiceRadarProps) {
  // Position interne (contrôlée ou non-contrôlée)
  const [internalPosition, setInternalPosition] = useState({ x: 0, y: 0 });
  const position = value ?? internalPosition;

  // État du drag
  const [isDragging, setIsDragging] = useState(false);

  // Référence au conteneur pour calculer les coordonnées relatives
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Convertit les coordonnées pixel en coordonnées normalisées [-1, 1]
   */
  const pixelToNormalized = useCallback((
    clientX: number,
    clientY: number
  ): { x: number; y: number } => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const rect = containerRef.current.getBoundingClientRect();

    // Position relative au centre du conteneur
    const relX = clientX - rect.left - rect.width / 2;
    const relY = clientY - rect.top - rect.height / 2;

    // Normalisation [-1, 1] avec contrainte aux limites
    const x = Math.max(-1, Math.min(1, (relX / (rect.width / 2))));
    // Y inversé car l'axe Y du DOM est inversé par rapport à notre convention
    const y = Math.max(-1, Math.min(1, -(relY / (rect.height / 2))));

    return { x, y };
  }, []);

  /**
   * Met à jour la position (interne et callback parent)
   */
  const updatePosition = useCallback((newPos: { x: number; y: number }) => {
    if (!value) {
      setInternalPosition(newPos);
    }
    onChange?.(newPos);
  }, [value, onChange]);

  /**
   * Handler pour le clic sur le radar (repositionne le point)
   */
  const handleClick = useCallback((e: React.MouseEvent) => {
    // Ignore si on vient de terminer un drag
    if (isDragging) return;

    const newPos = pixelToNormalized(e.clientX, e.clientY);
    updatePosition(newPos);
  }, [isDragging, pixelToNormalized, updatePosition]);

  /**
   * Handler pour le début du drag
   */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  /**
   * Handler pour le mouvement pendant le drag
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newPos = pixelToNormalized(e.clientX, e.clientY);
    updatePosition(newPos);
  }, [isDragging, pixelToNormalized, updatePosition]);

  /**
   * Handler pour la fin du drag
   */
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Gestion des événements globaux pour le drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Conversion de la position normalisée en pourcentage pour le style
  const dotStyle = {
    left: `${((position.x + 1) / 2) * 100}%`,
    top: `${((1 - position.y) / 2) * 100}%`,
  };

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Conteneur principal avec labels */}
      <div className="relative" style={{ width: size + 80, height: size + 80 }}>
        {/* Label haut: Expressif */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 text-sm font-medium text-[var(--foreground)]"
        >
          Expressif
        </div>

        {/* Label bas: Neutre */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm font-medium text-[var(--foreground)]"
        >
          Neutre
        </div>

        {/* Label gauche: Froid */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--foreground)]"
        >
          Froid
        </div>

        {/* Label droite: Chaud */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--foreground)]"
        >
          Chaud
        </div>

        {/* Zone du radar */}
        <div
          ref={containerRef}
          onClick={handleClick}
          className={cn(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'bg-[var(--accent)] border border-[var(--border)] rounded-[var(--radius)]',
            'cursor-crosshair select-none overflow-hidden'
          )}
          style={{ width: size, height: size }}
        >
          {/* Grille de fond */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Axe vertical (Y) */}
            <line
              x1="50" y1="0" x2="50" y2="100"
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            {/* Axe horizontal (X) */}
            <line
              x1="0" y1="50" x2="100" y2="50"
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            {/* Lignes de grille secondaires */}
            <line
              x1="25" y1="0" x2="25" y2="100"
              stroke="var(--border)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              vectorEffect="non-scaling-stroke"
              opacity="0.5"
            />
            <line
              x1="75" y1="0" x2="75" y2="100"
              stroke="var(--border)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              vectorEffect="non-scaling-stroke"
              opacity="0.5"
            />
            <line
              x1="0" y1="25" x2="100" y2="25"
              stroke="var(--border)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              vectorEffect="non-scaling-stroke"
              opacity="0.5"
            />
            <line
              x1="0" y1="75" x2="100" y2="75"
              stroke="var(--border)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              vectorEffect="non-scaling-stroke"
              opacity="0.5"
            />
          </svg>

          {/* Point draggable */}
          <div
            onMouseDown={handleMouseDown}
            className={cn(
              'absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full',
              'bg-[var(--primary)] border-2 border-[var(--background)]',
              'shadow-[var(--shadow-md)]',
              'transition-[left,top] duration-150 ease-out',
              isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab hover:scale-110',
              'hover:shadow-[var(--shadow-lg)]'
            )}
            style={dotStyle}
          />
        </div>
      </div>

      {/* Affichage des valeurs */}
      <div className="flex gap-6 text-sm text-[var(--muted)]">
        <span>
          Température:{' '}
          <span className="font-mono text-[var(--foreground)]">
            {position.x.toFixed(2)}
          </span>
        </span>
        <span>
          Expressivité:{' '}
          <span className="font-mono text-[var(--foreground)]">
            {position.y.toFixed(2)}
          </span>
        </span>
      </div>
    </div>
  );
}
