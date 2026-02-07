import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard';

export function Projects() {
  return (
    <main className="main-content">
      <div className="container">
        <h2 className="heading">Projects</h2>
      <div className="row g-4">
        {projects.map((project) => (
          <div key={project.id} className="col-md-6 col-lg-4">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      </div>
    </main>
  );
}
