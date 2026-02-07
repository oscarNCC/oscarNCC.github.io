import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard';
import { Hero } from '../../components/Hero/Hero';
import styles from './Home.module.css';

export function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <main className="main-content">
        <section className={styles.section} id="about">
          <h2 className="heading">About me</h2>
          <div className="row align-items-center">
            {profile.avatar && (
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={profile.avatar ? 'col-md-8' : 'col-12'}>
              <h3 className={styles.subtitle}>{profile.name}</h3>
              <p className={styles.tagline}>{profile.tagline}</p>
              <p className={styles.bio}>
                {profile.bio}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section} id="projects">
          <h2 className="heading">Projects</h2>
          <div className="row g-4">
            {featuredProjects.map((project) => (
              <div key={project.id} className="col-md-6 col-lg-4">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/projects" className="custom-btn btn-codigo">
              All projects
            </Link>
          </div>
        </section>

        <section className={styles.section} id="contact">
          <h2 className="heading">Contact</h2>
          <p className={styles.intro}>
            Get in touch via the links below. You can add a contact form later.
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
          <Link to="/contact" className="custom-btn btn">
            Contact page
          </Link>
        </section>
      </main>
    </>
  );
}
