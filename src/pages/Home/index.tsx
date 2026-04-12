import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { profile } from '../../data/profile';
import { filterProjectsByTab, projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard';
import { ProjectTabs } from '../../components/ProjectTabs';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Hero } from '../../components/Hero/Hero';
import type { ProjectTabId } from '../../types';
import styles from './Home.module.css';

export function Home() {
  const [projectTab, setProjectTab] = useState<ProjectTabId>('all');
  const featuredProjects = useMemo(
    () => filterProjectsByTab(projects.filter((p) => p.featured), projectTab),
    [projectTab]
  );
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <div id="about">
        <Hero />
      </div>
      <main className="main-content">
        <section className={styles.section} id="projects">
          <ScrollReveal>
            <h2 className="heading">Projects</h2>
          </ScrollReveal>
          <ProjectTabs activeTab={projectTab} onTabChange={setProjectTab} />
          <div
            id="project-tab-panel"
            role="tabpanel"
            aria-labelledby={`project-tab-${projectTab}`}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {featuredProjects.length === 0 ? (
              <p className={styles.projectTabEmpty}>No featured projects in this category yet.</p>
            ) : (
              featuredProjects.map((project, index) => (
                <ScrollReveal key={project.id} staggerDelayMs={index * 60}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))
            )}
          </div>
          <ScrollReveal>
            <div className={styles.allProjectsWrap}>
              <a
                href="https://github.com/oscarNCC"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-btn btn-codigo"
              >
                All projects
              </a>
            </div>
          </ScrollReveal>
        </section>

        <section className={styles.section} id="contact">
          <ScrollReveal>
            <h2 className="heading">Contact</h2>
          </ScrollReveal>
          <ScrollReveal staggerDelayMs={80}>
            <p className={styles.intro}>
              Get in touch via the links below.
            </p>
          </ScrollReveal>
          <ScrollReveal staggerDelayMs={160}>
            <ul className={styles.linkList}>
              {profile.socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </section>
      </main>
    </>
  );
}
