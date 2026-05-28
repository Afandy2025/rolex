/* ═══════════════════════════════════════════════════════════
   How It Works — Three Steps to Owning a Crown NFT
   ═══════════════════════════════════════════════════════════
   Features:
   - Three glass-morphism step cards with animated SVG borders
   - Custom inline SVG icons (wallet, crown, diamond) in gold
   - Icon rotates 360° on hover, card lifts with gold glow
   - Cards stagger in from bottom on scroll via useInView
   - Animated SVG rect border draws itself on scroll
*/

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/* ── Custom luxury easing ─────────────────────────────── */
const LUXURY_EASE = [0.22, 1, 0.36, 1];

/* ── Step data array removed, data will come from translation ── */

/* ── Inline SVG Icons ─────────────────────────────────── */
const icons = {
  wallet: (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wallet body */}
      <rect
        x="6"
        y="16"
        width="52"
        height="36"
        rx="4"
        stroke="var(--gold)"
        strokeWidth="2"
      />
      {/* Flap */}
      <path
        d="M6 24C6 19.582 9.582 16 14 16H50L50 12C50 10.895 49.105 10 48 10H14C9.582 10 6 13.582 6 18V24Z"
        stroke="var(--gold)"
        strokeWidth="2"
        fill="none"
      />
      {/* Clasp / coin slot */}
      <rect
        x="42"
        y="28"
        width="16"
        height="12"
        rx="3"
        stroke="var(--gold)"
        strokeWidth="2"
      />
      <circle cx="50" cy="34" r="2" fill="var(--gold)" />
    </svg>
  ),

  crown: (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crown shape */}
      <path
        d="M8 44L14 20L24 32L32 14L40 32L50 20L56 44H8Z"
        stroke="var(--gold)"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Base band */}
      <rect
        x="8"
        y="44"
        width="48"
        height="6"
        rx="2"
        stroke="var(--gold)"
        strokeWidth="2"
        fill="none"
      />
      {/* Jewel dots */}
      <circle cx="20" cy="47" r="1.5" fill="var(--gold)" />
      <circle cx="32" cy="47" r="1.5" fill="var(--gold)" />
      <circle cx="44" cy="47" r="1.5" fill="var(--gold)" />
    </svg>
  ),

  diamond: (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top facets */}
      <polygon
        points="32,6 10,24 54,24"
        stroke="var(--gold)"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Main body */}
      <polygon
        points="10,24 54,24 32,58"
        stroke="var(--gold)"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Inner facet lines */}
      <line x1="22" y1="24" x2="32" y2="58" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" />
      <line x1="42" y1="24" x2="32" y2="58" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" />
      <line x1="22" y1="24" x2="32" y2="6" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" />
      <line x1="42" y1="24" x2="32" y2="6" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" />
    </svg>
  ),
};

/* ── Animation variants ───────────────────────────────── */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: LUXURY_EASE },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
};

/* ── Styles ───────────────────────────────────────────── */
const styles = {
  section: {
    position: 'relative',
    background: 'var(--dark-green)',
    overflow: 'hidden',
  },

  header: {
    textAlign: 'center',
    marginBottom: 'var(--space-2xl)',
  },

  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    marginBottom: 'var(--space-sm)',
  },

  subtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.05rem',
    color: 'rgba(245,240,232,0.6)',
    fontWeight: 300,
    letterSpacing: '0.02em',
  },

  dividerCenter: {
    margin: 'var(--space-md) auto',
  },

  cardsRow: {
    display: 'flex',
    gap: '2vw',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 2vw',
  },

  card: {
    position: 'relative',
    flex: '1 1 0',
    padding: 'var(--space-2xl) var(--space-lg)',
    textAlign: 'center',
    overflow: 'hidden',
    /* glass-card values inlined to allow motion.div control */
    background: 'rgba(0, 96, 57, 0.15)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(163, 126, 44, 0.15)',
    borderRadius: 'var(--radius-lg)',
  },

  stepNumber: {
    fontFamily: 'var(--font-heading)',
    fontSize: '4rem',
    fontWeight: 700,
    color: 'var(--gold)',
    opacity: 0.3,
    lineHeight: 1,
    marginBottom: 'var(--space-xs)',
    userSelect: 'none',
  },

  iconWrap: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 'var(--space-md)',
  },

  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.4rem',
    color: 'var(--cream)',
    marginBottom: 'var(--space-sm)',
  },

  cardDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: 'rgba(245,240,232,0.7)',
    fontWeight: 300,
  },

  /* SVG border overlay */
  svgBorder: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  },
};

/* ── Responsive CSS ───────────────────────────────────── */
const responsiveCSS = `
  @media (max-width: 768px) {
    .hiw-cards-row {
      flex-direction: column !important;
      align-items: center !important;
    }
    .hiw-card {
      max-width: 100% !important;
      width: 100% !important;
    }
  }
`;

/* ═══════════════════════════════════════════════════════════
   StepCard — Individual glowing glass card
   ═══════════════════════════════════════════════════════════ */
function StepCard({ step, index, isInView, gridColumn, marginTop, className }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  /* ── 3D Tilt Physics ── */
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    rotateX.set(rotX);
    rotateY.set(rotY);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  /* Border perimeter = 2*(w+h). We approximate at large value */
  const perimeterApprox = 1600;

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        ...styles.card,
        gridColumn,
        marginTop,
        perspective: '1200px',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      whileHover={{
        y: -10,
        boxShadow: '0 12px 40px rgba(163,126,44,0.25), 0 0 0 1px rgba(163,126,44,0.3)',
        transition: { duration: 0.4, ease: LUXURY_EASE },
      }}
    >
      {/* Animated SVG border that draws itself on scroll */}
      <svg style={styles.svgBorder} xmlns="http://www.w3.org/2000/svg">
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="16"
          ry="16"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeDasharray={perimeterApprox}
          initial={{ strokeDashoffset: perimeterApprox }}
          animate={
            isInView
              ? { strokeDashoffset: 0 }
              : { strokeDashoffset: perimeterApprox }
          }
          transition={{
            duration: 1.5,
            delay: index * 0.25,
            ease: LUXURY_EASE,
          }}
        />
      </svg>

      {/* Step number */}
      <div style={styles.stepNumber}>{step.number}</div>

      {/* Icon — rotates 360° on hover */}
      <motion.div
        style={styles.iconWrap}
        whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
      >
        {icons[step.icon]}
      </motion.div>

      {/* Title & description */}
      <h3 style={styles.cardTitle}>{step.title}</h3>
      <p style={styles.cardDesc}>{step.description}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════ */
export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  const stepsData = t('how_it_works.steps', { returnObjects: true }) || [];
  const iconsKeys = ['wallet', 'crown', 'diamond'];
  const steps = (Array.isArray(stepsData) ? stepsData : []).map((step, index) => ({
    ...step,
    number: `0${index + 1}`,
    icon: iconsKeys[index]
  }));

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section noise-overlay"
      style={styles.section}
    >
      <style>{responsiveCSS}</style>

      <motion.div
        className="section-inner"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* ── Header ──────────────────────────────────── */}
        <motion.div style={styles.header} variants={titleVariants}>
          <h2 className="gold-gradient-text" style={styles.title}>
            {t('how_it_works.title')}
          </h2>
          <p style={styles.subtitle}>
            {t('how_it_works.subtitle')}
          </p>
          <div className="gold-divider" style={styles.dividerCenter} />
        </motion.div>

        {/* ── Step Cards ──────────────────────────────── */}
        <div className="cinematic-grid hiw-cards-row" style={{ alignItems: 'flex-start', marginTop: '4rem' }}>
          {steps.map((step, i) => {
            const gridSpans = ['1 / span 4', '5 / span 4', '9 / span 4'];
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
            const offsets = isMobile ? ['0px', '0px', '0px'] : ['0px', '80px', '40px']; // Asymmetric floating depth only on desktop
            return (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                isInView={isInView}
                gridColumn={gridSpans[i]}
                className="col-span-md-6 col-span-sm-full"
                marginTop={offsets[i]}
              />
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
