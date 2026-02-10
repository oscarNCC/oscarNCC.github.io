import { useState, useCallback, useEffect, useRef } from 'react';
import type { Project } from '../types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

const PREVIEW_CYCLE_MS = 2800;

export function ProjectCard({ project }: ProjectCardProps) {
  const [previewPos, setPreviewPos] = useState<{ x: number; y: number } | null>(null);
  const previewOpenKeyRef = useRef(0);
  if (!previewPos) previewOpenKeyRef.current = 0;
  const gifKey = previewPos ? (previewOpenKeyRef.current || (previewOpenKeyRef.current = Date.now())) : 0;
  const previewUrls = project.previewMedia?.length
    ? project.previewMedia
    : project.previewGif
      ? [project.previewGif]
      : [];
  const hasPreview = previewUrls.length > 0;
  const [previewIndex, setPreviewIndex] = useState(0);

  useEffect(() => {
    if (previewUrls.length <= 1) return;
    const id = setInterval(() => {
      setPreviewIndex((i) => (i + 1) % previewUrls.length);
    }, PREVIEW_CYCLE_MS);
    return () => clearInterval(id);
  }, [previewUrls.length]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasPreview) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setPreviewPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [hasPreview]
  );

  const handleMouseLeave = useCallback(() => {
    setPreviewPos(null);
  }, []);

  return (
    <article className={styles.card}>
      <div
        className={`${styles.imageWrap} ${project.id === 'signchat' ? styles.imageWrap16x10 : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {hasPreview && previewPos && (
          <div
            className={styles.previewOverlay}
            aria-hidden
            style={{ left: previewPos.x, top: previewPos.y }}
          >
            <div className={styles.previewGifWrap}>
              <img
                key={gifKey}
                src={previewUrls[previewIndex]}
                alt=""
                className={styles.previewGif}
              />
            </div>
          </div>
        )}
        {project.inProgress && (
          <div className={styles.inProgressBanner} aria-hidden>
            <span className={styles.inProgressText}>In Progress</span>
          </div>
        )}
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
        {(project.demo || project.link || project.videoUrl) && (
          <div className={styles.links}>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.demoLink}
                aria-label={`View ${project.title} live demo`}
              >
                <span className={styles.demoIcon} aria-hidden>◇</span>
                Live Demo
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.codeLink}
                aria-label={`View ${project.title} on GitHub`}
              >
                <span className={styles.codeIcon} aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </span>
                GitHub
              </a>
            )}
            {project.videoUrl && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.videoLink}
                aria-label="TVB Interview (Hong Kong)"
              >
                <span className={styles.videoIcon} aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </span>
                TVB Interview
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
