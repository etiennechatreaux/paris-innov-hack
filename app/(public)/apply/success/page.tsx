import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function SuccessPage() {
  return (
    <div className="max-w-lg mx-auto px-6 lg:px-8 py-24 text-center">
      {/* Success Icon */}
      <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Message */}
      <h1 className="text-2xl font-bold text-[var(--foreground)]">
        Application Submitted!
      </h1>
      <p className="mt-4 text-[var(--muted)]">
        Thank you for applying to Vox. We&apos;ve received your application
        and will review it shortly. You&apos;ll hear back from us within 2-3
        business days.
      </p>

      {/* CTA */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/voices">
          <Button variant="outline">Browse Voice Talent</Button>
        </Link>
        <Link href="/home">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
