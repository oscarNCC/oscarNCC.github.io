import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WalkCat } from '../components/WalkCat/WalkCat';
import { CatInteractionProvider } from '../contexts/CatInteractionContext';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <CatInteractionProvider>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          <Outlet />
        </div>
        <Footer />
        <WalkCat />
      </div>
    </CatInteractionProvider>
  );
}
