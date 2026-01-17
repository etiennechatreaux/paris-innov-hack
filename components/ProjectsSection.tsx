import { projects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--accent)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">
          Popular Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
