import projectsData from '@/data/projects.json';
import { ProjectCard } from '@/components/ProjectCard';

interface ProjectsProps {
  limit?: number;
}

export function Projects({ limit }: ProjectsProps) {
  const projects = limit ? projectsData.projects.slice(0, limit) : projectsData.projects;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}
