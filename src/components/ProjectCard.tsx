import type { Project } from '../types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.imageLink}
            aria-label={`View ${project.title}`}
          >
            <img
              src={project.image}
              alt={project.title}
              className={styles.image}
            />
          </a>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
