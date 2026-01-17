import { Hero } from '@/components/Hero';
import { VoiceGrid } from '@/components/VoiceGrid';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const voices = await prisma.voice.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <Hero />
      <VoiceGrid
        voices={voices}
        title="Featured Voice Talent"
        subtitle="Discover our top-rated voice professionals"
      />
    </>
  );
}
