import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import styles from './Header.module.css';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.siteHeader}>
      <RouterLink to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
        <span className={styles.logoText}>=(&nbsp;<span className={styles.logoName}>Oscar</span>&nbsp;)=&gt;</span>
      </RouterLink>

      <button
        type="button"
        className={styles.menuBtn}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <nav className={`${styles.navbar} ${menuOpen ? styles.navbarOpen : ''}`}>
        {isHome ? (
          <>
            <ScrollLink to="about" smooth duration={400} className={styles.navLink} href="#about" onClick={() => setMenuOpen(false)}>
              About
            </ScrollLink>
            <ScrollLink to="projects" smooth duration={400} className={styles.navLink} href="#projects" onClick={() => setMenuOpen(false)}>
              Projects
            </ScrollLink>
            <ScrollLink to="contact" smooth duration={400} className={styles.navLink} href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </ScrollLink>
          </>
        ) : (
          <>
            <RouterLink to="/#about" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              About
            </RouterLink>
            <RouterLink to="/#projects" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              Projects
            </RouterLink>
            <RouterLink to="/#contact" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              Contact
            </RouterLink>
          </>
        )}
      </nav>
    </header>
  );
}
