import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styles from './ScrollReveal.module.css';

export type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** 錯開動畫（毫秒），例如 grid 內 index * 60 */
  staggerDelayMs?: number;
};

function mergeClassNames(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(' ');
}

export function ScrollReveal({ children, className, staggerDelayMs = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    staggerDelayMs > 0
      ? { transitionDelay: `${staggerDelayMs}ms` }
      : undefined;

  return (
    <div
      ref={ref}
      className={mergeClassNames(styles.wrap, visible && styles.visible, className)}
      style={style}
    >
      {children}
    </div>
  );
}
