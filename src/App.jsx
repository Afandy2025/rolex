/* ═══════════════════════════════════════════════════════════
   App.jsx — Main Application Shell
   ROLEX × NFT: The Crown on the Blockchain
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

/* ── Component Imports ─────────────────────────────────── */
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import SmoothScroll from './components/SmoothScroll';
import ParallaxBackground from './components/ParallaxBackground';

/* ── Pages Imports ─────────────────────────────────────── */
import Home from './pages/Home';
import WatchDetails from './pages/WatchDetails';
import StoryPage from './pages/StoryPage';
import RoadmapPage from './pages/RoadmapPage';

/* ── Loading Screen (Cinematic) ────────────────────────── */
const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    // Longer loading time for the cinematic experience
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: '#000804', overflow: 'hidden'
      }}
    >
      {/* Cinematic Fog & Noise */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'radial-gradient(circle at center, var(--gold) 0%, transparent 60%)', filter: 'blur(100px)', animation: 'pulse 4s infinite alternate' }} />
      <div className="noise-overlay" style={{ opacity: 0.4 }} />

      {/* Animated Crown Logo */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <svg width="100" height="80" viewBox="0 0 80 60" fill="none" style={{ filter: 'drop-shadow(0 0 20px rgba(163,126,44,0.4))' }}>
          <motion.path
            d="M10 50 L20 15 L30 35 L40 5 L50 35 L60 15 L70 50 Z"
            stroke="#d4aa50" strokeWidth="1.5" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d="M10 50 L70 50"
            stroke="#d4aa50" strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-light)', fontSize: '1.2rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: '3rem', position: 'relative', zIndex: 2 }}
      >
        ROLEX × NFT
      </motion.p>

      {/* Skeleton Loading Bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
        style={{ width: '200px', height: '1px', background: 'rgba(163, 126, 44, 0.1)', marginTop: '2rem', overflow: 'hidden', position: 'relative', zIndex: 2 }}
      >
        <motion.div
          initial={{ x: '-100%' }} animate={{ x: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
        />
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Main App Component
   ═══════════════════════════════════════════════════════════ */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  return (
    <SmoothScroll>
      <ParallaxBackground />
      <ScrollToTop />
      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            key="loading"
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      <Navbar />

      <AnimatePresence mode="wait">
        {!isLoading && (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/watch" element={<PageTransition><WatchDetails /></PageTransition>} />
            <Route path="/story" element={<PageTransition><StoryPage /></PageTransition>} />
            <Route path="/roadmap" element={<PageTransition><RoadmapPage /></PageTransition>} />
          </Routes>
        )}
      </AnimatePresence>
      
      {!isLoading && <Footer />}
    </SmoothScroll>
  );
}

export default App;
