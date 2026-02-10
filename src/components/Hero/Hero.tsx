import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import { useCatInteraction } from '../../contexts/CatInteractionContext';
import styles from './Hero.module.css';

const ROTATING_TITLES = [
  'front end developer.',
  'web designer.',
  'full stack developer.',
  'backend developer.',
  'software developer.',
  'cat lover (click my icon~).'
  
];

const iconSize = 24;

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
  </svg>
);

function SocialIcon({ label }: { label: string }) {
  const l = label.toLowerCase();
  if (l === 'github') return <GitHubIcon />;
  if (l === 'linkedin') return <LinkedInIcon />;
  if (l === 'email') return <EmailIcon />;
  return null;
}

const TYPING_INTERVAL_MS = 80;
const PAUSE_AFTER_TYPING_MS = 1500;

type Bubble = {
  id: number;
  popAt: number;
  offsetX: number;
  offsetY: number;
  popping?: boolean;
  popStartedAt?: number;
};

const BUBBLE_SPAWN_INTERVAL_MS = 380;
const BUBBLE_MAX = 14;
const POP_DURATION_MS = 220;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function Hero() {
  const { onAvatarClick } = useCatInteraction();
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const pauseScheduled = useRef(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextIdRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCharIndex((c) => {
        const full = ROTATING_TITLES[titleIndex];
        if (c < full.length) return c + 1;
        return c;
      });
    }, TYPING_INTERVAL_MS);
    return () => clearInterval(id);
  }, [titleIndex]);

  useEffect(() => {
    const full = ROTATING_TITLES[titleIndex];
    if (charIndex < full.length) {
      pauseScheduled.current = false;
      return;
    }
    if (pauseScheduled.current) return;
    pauseScheduled.current = true;
    const t = setTimeout(() => {
      setTitleIndex((i) => (i + 1) % ROTATING_TITLES.length);
      setCharIndex(0);
      pauseScheduled.current = false;
    }, PAUSE_AFTER_TYPING_MS);
    return () => clearTimeout(t);
  }, [titleIndex, charIndex]);

  const handleAvatarMouseEnter = () => {
    if (spawnIntervalRef.current) return;
    spawnIntervalRef.current = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length >= BUBBLE_MAX) return prev;
        const id = nextIdRef.current++;
        const popDelayMs = randomBetween(1000, 5000);
        return [
          ...prev,
          {
            id,
            popAt: Date.now() + popDelayMs,
            offsetX: randomBetween(-12, 12),
            offsetY: randomBetween(-12, 12),
          },
        ];
      });
    }, BUBBLE_SPAWN_INTERVAL_MS);
  };

  const handleAvatarMouseLeave = () => {
    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }
  };

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      setBubbles((prev) => {
        const mapped = prev.map((b) => {
          if (b.popping) {
            if (b.popStartedAt != null && now >= b.popStartedAt + POP_DURATION_MS) return null;
            return b;
          }
          if (now >= b.popAt) return { ...b, popping: true, popStartedAt: now };
          return b;
        });
        return mapped.filter((b): b is Bubble => b != null);
      });
    };
    const id = setInterval(tick, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.contenido}>
      <section className={styles.inicio} id="hero">
        <div className={styles.heroLeft}>
          <div className={styles.imageColumn}>
            {profile.avatar && (
              <div className={styles.avatarWrap}>
                <button
                  type="button"
                  onClick={onAvatarClick}
                  className={styles.avatarButton}
                  aria-label="點擊召喚貓或丟肉"
                  onMouseEnter={handleAvatarMouseEnter}
                  onMouseLeave={handleAvatarMouseLeave}
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className={styles.avatar}
                  />
                </button>
                <div className={styles.bubbleContainer} aria-hidden>
                  {bubbles.map((b) => (
                    <div
                      key={b.id}
                      className={`${styles.bubble} ${b.popping ? styles.bubblePop : ''}`}
                      style={{
                        marginLeft: b.offsetX,
                        marginTop: b.offsetY,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.heroRight}>
          <p className={styles.greeting}>Hi, I am {profile.name}.</p>
          <p className={styles.rol}>
            I am a{' '}
            <span className={styles.rotatingTitle}>
              {ROTATING_TITLES[titleIndex].slice(0, charIndex)}
            </span>
            <span className={styles.typeCursor} aria-hidden />
          </p>
          {profile.bio && <p className={styles.heroBio}>{profile.bio}</p>}
          <div className={styles.wrapper}>
            {profile.socialLinks.map((item) => (
              <a
                key={item.label}
                className={styles.iconButton}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <SocialIcon label={item.label} />
              </a>
            ))}
          </div>
          <div className={styles.ctaWrap}>
            <Link to="/contact" className="custom-btn btn">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
