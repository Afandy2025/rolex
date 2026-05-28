import { useState, useRef, useCallback } from 'react';
import { motion, useSpring, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimatedText from './AnimatedText';

/* ── Watch image imports ─────────────────────────────────── */
import watch01 from '../../assets/ChatGPT Image May 26, 2026, 04_25_32 PM.png';
import watch02 from '../../assets/ChatGPT Image May 26, 2026, 04_25_39 PM.png';
import watch03 from '../../assets/ChatGPT Image May 26, 2026, 04_25_48 PM.png';
import watch04 from '../../assets/ChatGPT Image May 26, 2026, 04_25_54 PM.png';
import watch05 from '../../assets/ChatGPT Image May 26, 2026, 04_25_59 PM.png';
import watch06 from '../../assets/ChatGPT Image May 26, 2026, 04_26_03 PM.png';
import watch07 from '../../assets/ChatGPT Image May 26, 2026, 04_26_06 PM.png';
import watch08 from '../../assets/ChatGPT Image May 26, 2026, 04_26_11 PM.png';
import watch09 from '../../assets/ChatGPT Image May 26, 2026, 04_26_14 PM.png';
import watch10 from '../../assets/ChatGPT Image May 26, 2026, 04_26_23 PM.png';
import watch11 from '../../assets/ChatGPT Image May 26, 2026, 04_34_36 PM.png';
import watch12 from '../../assets/ChatGPT Image May 26, 2026, 04_34_51 PM.png';
import watch13 from '../../assets/ChatGPT Image May 26, 2026, 04_34_59 PM.png';

const WATCH_IMAGES = [
  watch01, watch02, watch03, watch04, watch05, watch06, watch07,
  watch08, watch09, watch10, watch11, watch12, watch13
];

/* ── Luxury easing ───────────────────────────────────────── */
const LUXURY_EASE = [0.22, 1, 0.36, 1];

function FeatureCard({ item, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [shimmerX, setShimmerX] = useState(-100);

  const springConfig = { stiffness: 200, damping: 25, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = ((y - centerY) / centerY) * -15;
      const tiltY = ((x - centerX) / centerX) * 15;

      rotateX.set(tiltX);
      rotateY.set(tiltY);

      setShimmerX((x / rect.width) * 200 - 100);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    setShimmerX(-100);
  };

  return (
    <Link to="/story" style={{ textDecoration: 'none', display: 'block', width: 'clamp(280px, 80vw, 400px)', height: '500px', flexShrink: 0 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02, y: -10 }}
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          background: 'rgba(0,96,57,0.12)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(163,126,44,0.2)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          height: '100%',
          boxShadow: hovered
            ? '0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(163,126,44,0.4)'
            : '0 10px 30px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 3, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none',
            background: `linear-gradient(105deg, transparent ${shimmerX - 30}%, rgba(212,170,80,0.2) ${shimmerX}%, rgba(163,126,44,0.1) ${shimmerX + 20}%, transparent ${shimmerX + 40}%)`
          }}
        />

        <div style={{ height: '60%', width: '100%', overflow: 'hidden' }}>
          <img 
            src={WATCH_IMAGES[index]} 
            alt={item.name} loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, rgba(0,45,26,0.95) 0%, transparent 100%)', pointerEvents: 'none' }} />
        </div>

        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '3rem', color: 'var(--gold)', opacity: 0.1, position: 'absolute', right: '20px', top: '65%', fontFamily: 'var(--font-heading)' }}>
            {(index + 1).toString().padStart(2, '0')}
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--cream)', margin: 0 }}>{item.name}</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(245,240,232,0.7)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Collection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const translatedFeatures = t('collection.features', { returnObjects: true }) || [];

  // Map vertical scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ['0%', isRtl ? '80%' : '-80%']);
  
  // Also add some parallax effects for background elements
  const bgX = useTransform(scrollYProgress, [0, 1], ['0%', isRtl ? '-20%' : '20%']);

  return (
    <section ref={targetRef} style={{ position: 'relative', height: '400vh', background: 'var(--dark-green)' }}>
      {/* Sticky container */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Animated Background Mesh */}
        <motion.div style={{ position: 'absolute', inset: 0, opacity: 0.1, x: bgX, backgroundImage: 'linear-gradient(45deg, var(--gold) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

        <div style={{ padding: '0 4rem', marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
          <AnimatedText text={t('collection.title')} el="h2" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontFamily: 'var(--font-heading)', color: 'var(--cream)', textTransform: 'uppercase' }} />
          <AnimatedText text={t('collection.subtitle')} el="p" style={{ fontSize: '1.2rem', color: 'var(--gold-light)' }} />
        </div>

        {/* Horizontal scrolling track */}
        <motion.div style={{ x, display: 'flex', gap: '3rem', padding: '0 4rem', width: 'max-content', direction: 'ltr' }}>
          {(Array.isArray(translatedFeatures) ? translatedFeatures : []).map((item, i) => (
            <FeatureCard key={i} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
