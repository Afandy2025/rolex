/* ═══════════════════════════════════════════════════════════
   Story / About Section — Reptile Emperor × Rolex NFT
   ═══════════════════════════════════════════════════════════
   Split layout: parallax image left, animated text right.
   Features:
   - Parallax float on image via useScroll + useTransform
   - Subtle infinite Y oscillation on image
   - Staggered text reveal with useInView
   - Decorative background Roman numerals
*/

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedText from './AnimatedText';

/* ── Image Import ─────────────────────────────────────── */
import emperorImg from '../../assets/ChatGPT Image May 27, 2026, 07_37_35 PM.png';

/* ── Custom luxury easing ─────────────────────────────── */
const LUXURY_EASE = [0.22, 1, 0.36, 1];

/* ── Variants for staggered text reveal ───────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
};

/* ── Styles ───────────────────────────────────────────── */
  /* ── Styles ───────────────────────────────────────────── */
const styles = {
  section: {
    position: 'relative',
    overflow: 'hidden',
    background: 'transparent', // Let global background show through
    padding: '12rem 0',
    width: '100%',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
  },
  imageCol: {
    width: '45vw',
    position: 'absolute',
    left: '-5vw',
    zIndex: 1,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    border: '1px solid rgba(163,126,44,0.3)',
    boxShadow: '20px 30px 80px rgba(0,0,0,0.6)',
    willChange: 'transform',
  },
  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  textCol: {
    width: '50vw',
    marginLeft: '45vw',
    paddingRight: '10vw',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--gold)',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: 'var(--space-sm)',
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
    lineHeight: 1.1,
    color: 'var(--cream)',
    marginBottom: 'var(--space-lg)',
  },
  paragraph: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.1rem',
    lineHeight: 1.8,
    color: 'rgba(245,240,232,0.85)',
    fontWeight: 300,
    marginBottom: 'var(--space-md)',
    maxWidth: '600px',
  },
  romanBase: {
    position: 'absolute',
    fontFamily: 'var(--font-heading)',
    fontSize: '25rem',
    fontWeight: 700,
    color: 'var(--gold)',
    opacity: 0.03,
    lineHeight: 1,
    userSelect: 'none',
    pointerEvents: 'none',
    zIndex: 0,
  },
  romanXII: {
    top: '-10rem',
    left: '-5rem',
  },
  romanVI: {
    bottom: '-10rem',
    right: '5rem',
  },
};

/* ── Responsive media query injection ─────────────────── */
const mobileBreak = `
  @media (max-width: 900px) {
    .story-inner {
      display: flex !important;
      flex-direction: column !important;
    }
    .story-image-col, .story-text-col {
      grid-column: 1 / -1 !important;
      position: relative !important;
      width: 100% !important;
    }
    .story-roman {
      display: none !important;
    }
  }
`;

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */
export default function Story() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const { t } = useTranslation();

  const isTextInView = useInView(textRef, { once: true, margin: '-80px' });

  return (
    <section id="story" ref={sectionRef} style={styles.section}>
      <style>{mobileBreak}</style>
      
      {/* Ambient Glow */}
      <div className="ambient-glow" style={{ top: '20%', right: '-20%', background: 'radial-gradient(circle, rgba(163, 126, 44, 0.15) 0%, rgba(0, 45, 26, 0.2) 50%, transparent 70%)' }} />

      {/* Deep Background Elements (Static for Performance) */}
      <motion.div className="story-roman" style={{ ...styles.romanBase, ...styles.romanXII }}>XII</motion.div>
      <motion.div className="story-roman" style={{ ...styles.romanBase, ...styles.romanVI }}>VI</motion.div>

      <div className="cinematic-grid story-inner" style={{ position: 'relative', zIndex: 2, alignItems: 'center' }}>
        
        {/* Asymmetric Image */}
        <div className="story-image-col col-span-6 col-span-md-full col-span-sm-full" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div style={styles.imageWrapper}>
            <motion.img
              src={emperorImg}
              alt="Reptilian Alexander the Great holding a Rolex"
              style={styles.image}
              initial={{ scale: 1.05, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.5, ease: LUXURY_EASE }}
            />
          </motion.div>
        </div>

        {/* Offset Text */}
        <motion.div
          ref={textRef}
          className="story-text-col col-span-6 col-span-md-full col-span-sm-full"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          variants={containerVariants}
          initial="hidden"
          animate={isTextInView ? 'visible' : 'hidden'}
        >
          <motion.p style={styles.label} variants={lineVariants}>
            {t('story.label')}
          </motion.p>
          <motion.div className="gold-divider" variants={lineVariants} style={{ margin: '1rem 0' }} />

          {isTextInView && (
            <AnimatedText 
              text={t('story.heading')} 
              el="h2" 
              style={styles.heading}
              className="gold-gradient-text"
            />
          )}

          {isTextInView && (
            <>
              <AnimatedText 
                text={t('story.p1')}
                el="p"
                style={styles.paragraph}
              />
              <AnimatedText 
                text={t('story.p2')}
                el="p"
                style={styles.paragraph}
              />
              <AnimatedText 
                text={t('story.p3')}
                el="p"
                style={styles.paragraph}
              />
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
