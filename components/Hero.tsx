import Link from 'next/link';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)] to-transparent h-[600px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Stats Bar */}
          <div className="inline-flex items-center gap-6 px-6 py-3 mb-6 text-sm font-medium bg-white border border-[var(--border)] rounded-[var(--radius-full)] shadow-[var(--shadow-sm)]">
            <div className="flex items-center gap-3">
              <span className="text-[var(--muted)]">Average pay</span>
              <span className="text-[var(--foreground)] font-semibold">150$/hour</span>
            </div>
            <div className="w-px h-5 bg-[var(--border)]" />
            <div className="flex items-center gap-3">
              <span className="text-[var(--muted)]">Voice recorded</span>
              <span className="text-[var(--foreground)] font-semibold">+ 20000</span>
            </div>
            <div className="w-px h-5 bg-[var(--border)]" />
            <div className="flex items-center gap-3">
              <span className="text-[var(--muted)]">Daily payouts</span>
              <span className="text-[var(--foreground)] font-semibold">+ 150000$</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1]">
            Shape the future of voice
          </h1>

          {/* Subheadline */}
          <p className="mt-6 mb-4 text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto">
            Connect with professional voice talent from around the world.
            Commercials, audiobooks, e-learning, and more.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/voices">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Voice Talent
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
            </Link>
            <Link href="/apply">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Join as Voice Talent
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
