import { Hero } from '@/components/Hero';
import { VoiceGrid } from '@/components/VoiceGrid';
import { voices } from '@/lib/data';

export default function HomePage() {
  const featuredVoices = voices.slice(0, 6);

  return (
    <>
      <Hero />
      <VoiceGrid
        voices={featuredVoices}
        title="Featured Voice Talent"
        subtitle="Discover our top-rated voice professionals"
      />
    </>
  );
}
