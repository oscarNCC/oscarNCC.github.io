import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CatInteractionProvider } from '../contexts/CatInteractionContext';
import styles from './Layout.module.css';

const WalkCat = lazy(() =>
  import('../components/WalkCat/WalkCat').then((m) => ({ default: m.WalkCat }))
);

export function Layout() {
  const [showWalkCat, setShowWalkCat] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowWalkCat(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <CatInteractionProvider>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          <Outlet />
        </div>
        <Footer />
        {showWalkCat && (
          <Suspense fallback={null}>
            <WalkCat />
          </Suspense>
        )}
      </div>
    </CatInteractionProvider>
  );
}
