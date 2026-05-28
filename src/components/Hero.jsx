/* ═══════════════════════════════════════════════════════════
   Hero — Full-screen cinematic hero with video background
   ═══════════════════════════════════════════════════════════
   Features:
   • Video background with parallax scroll effect
   • Dark gradient overlay + noise texture
   • 30 floating gold particles
   • Staggered letter-by-letter headline animation
   • Fade-in subtitle
   • Two CTA buttons with magnetic hover effect
   • Animated scroll indicator at bottom
   ═══════════════════════════════════════════════════════════ */

import { useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimatedText from './AnimatedText';

/* ── Import the hero video ────────────────────────────────── */
import heroVideo from '../../assets/watermark_removed_2da4f7d7-d5c9-4fd1-bff7-e5b35af38cd5.mp4';

/* ── Luxury easing ────────────────────────────────────────── */
const LUXURY_EASE = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════════════════════════════
   Gold Particle System — 30 floating gold circles
   ═══════════════════════════════════════════════════════════ */
function GoldParticles() {
  /* ── Generate particles once, memoized ───────────────── */
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.6,
    }));
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(0);
              opacity: 0;
            }
            10% {
              opacity: var(--p-opacity);
            }
            85% {
              opacity: var(--p-opacity);
            }
            100% {
              transform: translateY(-110vh);
              opacity: 0;
            }
          }
        `}
      </style>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: `${p.y}%`, // Use random y instead of animating from bottom
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, var(--gold-light), var(--gold))`,
            boxShadow: `0 0 ${p.size * 2}px rgba(163, 126, 44, 0.4)`,
            opacity: p.opacity, // Just static opacity
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MagneticButton — CTA button with magnetic hover effect
   ═══════════════════════════════════════════════════════════ */
function MagneticButton({ children, className, onClick, to }) {
  const ref = useRef(null);

  /* ── Spring-animated offset for magnetic pull ──────────── */
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    /* ── Calculate offset from button center ──────────── */
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.2; // subtle pull
    const deltaY = (e.clientY - centerY) * 0.2;
    x.set(deltaX);
    y.set(deltaY);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const buttonProps = {
    ref,
    className,
    onClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x, y, display: 'inline-flex' },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 }
  };

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <motion.div {...buttonProps}>
          {children}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button {...buttonProps}>
      {children}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════
   ScrollIndicator — Bouncing chevron at the bottom
   ═══════════════════════════════════════════════════════════ */
function ScrollIndicator() {
  const { t } = useTranslation();
  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        translateX: '-50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 5,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 1 }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(245, 240, 232, 0.4)',
        }}
      >
        {t('hero.scroll')}
      </span>

      {/* ── Animated chevron arrow ─────────────────────────── */}
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: 0 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
        }}
      >
        <polyline points="6 9 12 15 18 9" />
      </motion.svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Hero (Main Component)
   ═══════════════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { t } = useTranslation();

  /* ── No heavy scroll tracking for performance ──────────── */
  const videoY = '0%';

  /* ── Headline text ──────────────────────────────────────── */
  const headline = t('hero.title');
  const letters = headline.split(' ');

  /* ── Stagger variants for letter-by-letter reveal ──────── */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.5, // wait for page to settle
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: LUXURY_EASE,
      },
    },
  };

  /* ── Subtitle fade-in after headline ────────────────────── */
  const subtitleDelay = 0.5 + letters.length * 0.04 + 0.3;

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── 1. Video Background with parallax ──────────────── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10% 0',    // extra height for parallax room
          zIndex: 0,
          y: videoY,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>

      {/* ── 2. Dark gradient overlay ───────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(180deg, rgba(0,45,26,0.7) 0%, rgba(0,45,26,0.5) 40%, rgba(0,10,5,0.8) 100%)',
        }}
      />

      {/* ── 3. Noise texture overlay ──────────────────────── */}
      <div
        className="noise-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── 4. Gold Particles ─────────────────────────────── */}
      <GoldParticles count={typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 30} />

      {/* ── 4b. Ambient Glows ─────────────────────────────── */}
      <div className="ambient-glow" style={{ top: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(163, 126, 44, 0.2) 0%, rgba(0, 45, 26, 0.3) 50%, transparent 70%)' }} />
      <div className="ambient-glow" style={{ bottom: '-20%', right: '-10%', background: 'radial-gradient(circle, rgba(0, 96, 57, 0.2) 0%, rgba(0, 45, 26, 0.3) 50%, transparent 70%)' }} />

      {/* ── 5. Hero Content ───────────────────────────────── */}
      <div
        className="cinematic-grid"
        style={{
          position: 'relative',
          zIndex: 5,
          alignItems: 'center',
          paddingTop: '10vh', /* push content down a bit */
        }}
      >
        <div className="col-span-12 col-span-md-full col-span-sm-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          
          {/* ── Gold divider above headline ──────────────────── */}
          <motion.div
            style={{
              width: '60px',
              height: '1.5px',
              background: 'linear-gradient(90deg, var(--gold), transparent)',
              marginBottom: '2rem',
              transformOrigin: 'left',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: LUXURY_EASE }}
          />
        </div>

        {/* ── Headline: letter-by-letter stagger ──────────── */}
        <div className="col-span-10 col-span-md-full col-span-sm-full">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--cream)',
              marginBottom: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              width: '100%',
              textShadow: '0 10px 40px rgba(0,0,0,0.5)',
            }}
          >
            {letters.map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                style={{
                  display: 'inline-block',
                  marginInlineEnd: '0.3em', whiteSpace: 'nowrap',
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* ── Subtitle and CTA Split Layout ───────────────── */}
        <div className="col-span-6 col-span-md-full col-span-sm-full" style={{ gridColumn: '7 / span 6', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2rem', marginTop: '2rem' }}>
          
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: 300,
              letterSpacing: '0.12em',
              color: 'rgba(245, 240, 232, 0.7)',
              lineHeight: 1.6,
            }}
          >
            {isInView && (
              <AnimatedText 
                text={t('hero.subtitle')}
                staggerDelay={0.03} 
              />
            )}
          </div>

          {/* ── CTA Buttons ─────────────────────────────────── */}
          <motion.div
            style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: subtitleDelay + 0.3,
              ease: LUXURY_EASE,
            }}
          >
            <MagneticButton className="btn-primary" to="/story">
              {t('hero.btn_legend')}
            </MagneticButton>

            <MagneticButton className="btn-outline" to="/watch">
              {t('hero.btn_explore')}
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* ── 6. Scroll Indicator ───────────────────────────── */}
      <ScrollIndicator />
    </section>
  );
}
