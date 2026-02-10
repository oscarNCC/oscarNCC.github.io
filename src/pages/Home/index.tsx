import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard';
import { Hero } from '../../components/Hero/Hero';
import styles from './Home.module.css';

export function Home() {
  const featuredProjects = projects.filter((p) => p.featured);
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
          <h2 className="heading">Projects</h2>
          <div className="row g-5">
            {featuredProjects.map((project) => (
              <div key={project.id} className="col-md-6 col-lg-4">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
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
        </section>

        <section className={styles.section} id="contact">
          <h2 className="heading">Contact</h2>
          <p className={styles.intro}>
            Get in touch via the links below.
          </p>
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
        </section>
      </main>
    </>
  );
}
