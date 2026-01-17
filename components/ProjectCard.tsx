import Link from 'next/link';
import Image from 'next/image';
import { Card } from './ui/Card';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card hover className="h-full">
      <div className="p-5">
        {/* Title */}
        <h3 className="font-semibold text-[var(--foreground)] text-lg">
          {project.title}
        </h3>

        {/* Price Range */}
        <p className="text-sm text-[var(--muted)] mt-1">{project.priceRange}</p>

        {/* Bottom row: Avatars + Hired + Apply button */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Stacked Avatars */}
            <div className="flex -space-x-2">
              {project.avatars.map((avatar, index) => (
                <div
                  key={index}
                  className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                >
                  <Image
                    src={avatar}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Hired Recently */}
            <span className="text-sm text-[var(--muted)]">
              {project.hiredRecently} hired recently
            </span>
          </div>

          {/* Apply Button */}
          <Link
            href="/apply"
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-[var(--radius)] bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
          >
            Apply
          </Link>
        </div>
      </div>
    </Card>
  );
}
