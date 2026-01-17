import { Hero } from '@/components/Hero';
import { VoiceGrid } from '@/components/VoiceGrid';
import { voices } from '@/lib/data';

export default function HomePage() {
  const featuredVoices = voices.slice(0, 6);

  return (
    <div className="relative">
      {/* Grid background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(128, 128, 128, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128, 128, 128, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <Hero />
      <VoiceGrid voices={featuredVoices} />
    </div>
  );
}
