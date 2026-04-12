import { useMemo, useState } from 'react';
import { filterProjectsByTab, projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard';
import { ProjectTabs } from '../../components/ProjectTabs';
import type { ProjectTabId } from '../../types';
import styles from './Projects.module.css';

export function Projects() {
  const [projectTab, setProjectTab] = useState<ProjectTabId>('all');
  const visible = useMemo(() => filterProjectsByTab(projects, projectTab), [projectTab]);

  return (
    <main className="main-content">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="heading">Projects</h2>
        <ProjectTabs activeTab={projectTab} onTabChange={setProjectTab} />
        <div
          id="project-tab-panel"
          role="tabpanel"
          aria-labelledby={`project-tab-${projectTab}`}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.length === 0 ? (
            <p className={styles.projectTabEmpty}>No projects in this category yet.</p>
          ) : (
            visible.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
