import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard';

export function Projects() {
  return (
    <main className="main-content">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="heading">Projects</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      </div>
    </main>
  );
}
