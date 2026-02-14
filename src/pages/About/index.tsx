import { profile } from '../../data/profile';
import styles from './About.module.css';

export function About() {
  return (
    <main className="main-content">
      <div className="mx-auto max-w-7xl px-4">
        <section className={styles.section}>
        <div className="flex flex-wrap items-center gap-6">
          {profile.avatar && (
            <div className="mb-4 w-full text-center md:mb-0 md:w-1/3 md:flex-shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className={styles.avatar}
              />
            </div>
          )}
          <div className={profile.avatar ? 'min-w-0 flex-1 md:w-2/3' : 'w-full'}>
            <h1 className={styles.title}>{profile.name}</h1>
            <p className={styles.tagline}>{profile.tagline}</p>
            <p className={styles.bio}>
              {profile.bio}
            </p>
          </div>
        </div>
        </section>
      </div>
    </main>
  );
}
