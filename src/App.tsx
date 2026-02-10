import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { ScrollToTop } from './components/ScrollToTop';
import { projects } from './data/projects';
import './App.css';

const PRELOAD_TIMEOUT_MS = 15000;

function preloadImages(urls: string[]): Promise<void> {
  const unique = [...new Set(urls)].filter(Boolean);
  if (unique.length === 0) return Promise.resolve();
  return Promise.all(
    unique.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          const done = () => resolve();
          img.onload = done;
          img.onerror = done;
          img.src = src;
        })
    )
  ).then(() => {});
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urls = projects.flatMap((p) =>
      p.previewMedia?.length ? p.previewMedia : p.previewGif ? [p.previewGif] : []
    );
    const timeoutId = setTimeout(() => setLoading(false), PRELOAD_TIMEOUT_MS);
    preloadImages(urls).then(() => {
      clearTimeout(timeoutId);
      setLoading(false);
    });
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (
      <div className="loading-pag">
        <div className="loader" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
