import { profile } from '../../data/profile';
import styles from './About.module.css';

export function About() {
  return (
    <main className="main-content">
      <div className="container">
        <section className={styles.section}>
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
