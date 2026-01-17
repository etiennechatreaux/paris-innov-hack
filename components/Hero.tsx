import Link from 'next/link';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)] to-transparent h-[600px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium bg-white border border-[var(--border)] rounded-[var(--radius-full)] shadow-[var(--shadow-sm)]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[var(--muted)]">500+ voices available now</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1]">
            Shape the future
            <br />
            <span className="text-[var(--muted)]">of voice</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto">
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
