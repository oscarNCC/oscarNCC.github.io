import { profile } from '../../data/profile';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <main className="main-content">
      <div className="container">
        <section className={styles.section}>
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
                className={styles.link}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        </section>
      </div>
    </main>
  );
}
