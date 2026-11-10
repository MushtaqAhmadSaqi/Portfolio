import React, { useState, useEffect } from 'react';
import { siteContent } from './data/content';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import SelectedWork from './components/SelectedWork';
import LabLog from './components/LabLog';
import Toolbox from './components/Toolbox';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CaseStudyView from './components/CaseStudyView';
import NotFound404 from './components/NotFound404';

export default function App() {
  // 1. Theme state ("dark" = Premium Night Studio, "light" = Clean Studio)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('mushtaq_portfolio_theme') || localStorage.getItem('mushtaq_notebook_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (_) {}
    return 'dark';
  });

  // 2. View router state: supports '/', '/projects/:slug', '#projects/:slug', and '404'
  const [route, setRoute] = useState({ view: 'home', slug: null });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0A0A0F' : '#F8F9FA');
    }
    try {
      localStorage.setItem('mushtaq_portfolio_theme', theme);
    } catch (_) {}
  }, [theme]);

  // Console Easter Egg for curious developers & recruiters
  useEffect(() => {
    console.log(
      '%c // MUSHTAQ AHMAD — AI & FRONTEND DEVELOPER ',
      'background: #00E86C; color: #0A0A0F; font-family: monospace; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
    );
    console.log(
      'Looking under the hood? Built with React, Vite, Space Grotesk, Inter & JetBrains Mono.\nSay salam: ' +
        siteContent.meta.email
    );
  }, []);

  // Sync URL pathname or hash on initial load & browser back/forward
  useEffect(() => {
    const parseLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (hash.startsWith('#/projects/')) {
        const slug = hash.replace('#/projects/', '').trim();
        const exists = siteContent.projects.some((p) => p.slug === slug);
        setRoute(exists ? { view: 'case-study', slug } : { view: '404', slug: null });
        return;
      }

      if (path.startsWith('/projects/')) {
        const slug = path.replace('/projects/', '').replace(/\/$/, '').trim();
        const exists = siteContent.projects.some((p) => p.slug === slug);
        setRoute(exists ? { view: 'case-study', slug } : { view: '404', slug: null });
        return;
      }

      if (hash === '#/404') {
        setRoute({ view: '404', slug: null });
        return;
      }

      setRoute({ view: 'home', slug: null });
    };

    parseLocation();
    window.addEventListener('popstate', parseLocation);
    window.addEventListener('hashchange', parseLocation);
    return () => {
      window.removeEventListener('popstate', parseLocation);
      window.removeEventListener('hashchange', parseLocation);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const openCaseStudy = (slug) => {
    setRoute({ view: 'case-study', slug });
    try {
      window.history.pushState({}, '', `#/projects/${slug}`);
    } catch (_) {}
  };

  const navigateHome = (anchor = '#top') => {
    setRoute({ view: 'home', slug: null });
    try {
      window.history.pushState({}, '', anchor.startsWith('#') ? anchor : '#top');
    } catch (_) {}
    setTimeout(() => {
      if (anchor === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 40);
  };

  const open404 = () => {
    setRoute({ view: '404', slug: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProject =
    route.view === 'case-study'
      ? siteContent.projects.find((p) => p.slug === route.slug)
      : null;

  return (
    <div>
      <Navbar
        meta={siteContent.meta}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigateHome={navigateHome}
        activeView={route.view}
      />

      <main id="main-content" className="notebook-container">
        {route.view === 'home' && (
          <>
            <Hero hero={siteContent.hero} meta={siteContent.meta} />
            <StatsBar stats={siteContent.stats} />
            <SelectedWork
              projects={siteContent.projects}
              onOpenCaseStudy={openCaseStudy}
            />
            <LabLog entries={siteContent.labLog} />
            <Toolbox toolbox={siteContent.toolbox} />
            <About about={siteContent.about} />
            <Contact contact={siteContent.contact} meta={siteContent.meta} />
          </>
        )}

        {route.view === 'case-study' && activeProject && (
          <CaseStudyView
            project={activeProject}
            allProjects={siteContent.projects}
            onBackHome={navigateHome}
            onSelectProject={openCaseStudy}
          />
        )}

        {route.view === '404' && <NotFound404 onReturnHome={navigateHome} />}
      </main>

      <Footer meta={siteContent.meta} onOpen404={open404} />
    </div>
  );
}
