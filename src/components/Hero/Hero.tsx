import { useState, useCallback } from 'react';
import { profile } from '../../data/profile';
import styles from './Hero.module.css';

const PINEAPPLE = '🍍';
const EMOJI_COUNT = 60;

export function Hero() {
  const [fallingEmojis, setFallingEmojis] = useState<{ id: number; left: number; duration: number; delay: number }[]>([]);

  const handleAvatarClick = useCallback(() => {
    const newEmojis = Array.from({ length: EMOJI_COUNT }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 1.5,
    }));
    setFallingEmojis((prev) => [...prev, ...newEmojis]);
    // 動畫結束後清掉這批，避免 DOM 過多
    const toRemove = newEmojis.map((e) => e.id);
    const maxDuration = Math.max(...newEmojis.map((e) => e.duration + e.delay)) * 1000;
    setTimeout(() => {
      setFallingEmojis((prev) => prev.filter((e) => !toRemove.includes(e.id)));
    }, maxDuration + 500);
  }, []);

  return (
    <div className={styles.contenido}>
      <div className={styles.emojiRain}>
        {fallingEmojis.map((e) => (
          <span
            key={e.id}
            className={styles.fallingEmoji}
            style={{
              left: `${e.left}%`,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
            }}
          >
            {PINEAPPLE}
          </span>
        ))}
      </div>
      <section className={styles.inicio} id="hero">
        <div className={styles.titulo}>
          {profile.avatar && (
            <div className={styles.avatarWrap}>
              <button
                type="button"
                onClick={handleAvatarClick}
                className={styles.avatarButton}
                aria-label="灑落鳳梨"
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className={styles.avatar}
                />
              </button>
            </div>
          )}
          <p className={styles.greeting}>Hello</p>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.rol}>{profile.tagline}</p>
          <div className={styles.wrapper}>
            {profile.socialLinks.map((item) => (
              <a
                key={item.label}
                className={styles.button}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <span className={styles.icon}>{item.label.charAt(0)}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
