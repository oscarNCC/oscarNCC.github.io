import { profile } from '../data/profile';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.siteFooter}>
        <div className={styles.copyright}>
          <p>Page created with React · Portfolio</p>
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
        <div className={styles.redes}>
          {profile.socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={item.label}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
