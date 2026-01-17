interface VoxLogoProps {
  size?: number;
  className?: string;
}

export function VoxLogo({ size = 32, className = '' }: VoxLogoProps) {
  // Logo: two interlocking thick crescents
  // Center at 50,50, outer radius 40, inner radius 25
  const cx = 50, cy = 50;
  const outerR = 40, innerR = 25;
  const gap = 4; // gap between crescents

  // Left crescent: from top to bottom on the left side
  const leftOuter = `M ${cx - gap} ${cy - outerR} A ${outerR} ${outerR} 0 0 0 ${cx - gap} ${cy + outerR}`;
  const leftInner = `L ${cx - gap} ${cy + innerR} A ${innerR} ${innerR} 0 0 1 ${cx - gap} ${cy - innerR} Z`;

  // Right crescent: from bottom to top on the right side
  const rightOuter = `M ${cx + gap} ${cy + outerR} A ${outerR} ${outerR} 0 0 0 ${cx + gap} ${cy - outerR}`;
  const rightInner = `L ${cx + gap} ${cy - innerR} A ${innerR} ${innerR} 0 0 1 ${cx + gap} ${cy + innerR} Z`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d={`${leftOuter} ${leftInner}`} fill="currentColor" />
      <path d={`${rightOuter} ${rightInner}`} fill="currentColor" />
    </svg>
  );
}
