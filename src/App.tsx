import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import './App.css';

const MIN_LOADING_MS = 500;

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));

function RouteFallback() {
  return (
    <div className="loading-pag">
      <div className="loader" />
    </div>
  );
}

export default function App() {
  const [minLoadingDone, setMinLoadingDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMinLoadingDone(true), MIN_LOADING_MS);
    return () => clearTimeout(t);
  }, []);

  if (!minLoadingDone) {
    return (
      <div className="loading-pag">
        <div className="loader" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
