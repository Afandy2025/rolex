/* ═══════════════════════════════════════════════════════════
   Showcase — Cinematic watch detail section
   Features: mouse parallax, pulsing gold glow, floating labels
   ═══════════════════════════════════════════════════════════ */
import { useRef, useState } from 'react';
import {
  motion,
  useSpring,
  useInView,
  AnimatePresence,
} from 'framer-motion';

// Watch image import — lives in project root /assets/
import watchImg from '../../assets/ChatGPT Image May 27, 2026, 07_46_08 PM.png';

/* ── Luxury easing curve ──────────────────────────────── */
const LUXURY_EASE = [0.22, 1, 0.36, 1];

/* ── Floating label data ──────────────────────────────── */
const LABELS = [
  {
    text: 'Diamond Bezel',
    // positioned top-right of watch
    style: { top: '8%', right: '-30%' },
    lineFrom: { x1: '0%', y1: '50%', x2: '-60px', y2: '50%' },
    lineSvgStyle: { position: 'absolute', left: '-64px', top: '50%', transform: 'translateY(-50%)', width: 64, height: 2, overflow: 'visible' },
  },
  {
    text: '24K Gold',
    style: { top: '38%', right: '-28%' },
    lineFrom: { x1: '0%', y1: '50%', x2: '-60px', y2: '50%' },
    lineSvgStyle: { position: 'absolute', left: '-64px', top: '50%', transform: 'translateY(-50%)', width: 64, height: 2, overflow: 'visible' },
  },
  {
    text: 'NFT Certified',
    style: { bottom: '12%', right: '-28%' },
    lineFrom: { x1: '0%', y1: '50%', x2: '-60px', y2: '50%' },
    lineSvgStyle: { position: 'absolute', left: '-64px', top: '50%', transform: 'translateY(-50%)', width: 64, height: 2, overflow: 'visible' },
  },
  {
    text: 'Swiss Movement',
    style: { top: '45%', left: '-32%' },
    lineFrom: { x1: '100%', y1: '50%', x2: 'calc(100% + 60px)', y2: '50%' },
    lineSvgStyle: { position: 'absolute', right: '-64px', top: '50%', transform: 'translateY(-50%)', width: 64, height: 2, overflow: 'visible' },
  },
];

/* ── Label animation variants ─────────────────────────── */
const labelContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3, delayChildren: 0.4 },
  },
};

const labelVariants = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
};

/* ── Styles ───────────────────────────────────────────── */
const styles = {
  section: {
    width: '100%',
    minHeight: '100vh',
    background: 'var(--darker-green, #001a0f)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: 'var(--space-3xl) var(--space-lg)',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    textAlign: 'center',
    marginBottom: 'var(--space-xl)',
    color: 'var(--cream)',
    letterSpacing: '-0.02em',
    position: 'relative',
    zIndex: 2,
  },
  imageContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'min(500px, 85vw)',
    height: 'min(500px, 85vw)',
    zIndex: 2,
    willChange: 'transform',
  },
  glow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(163,126,44,0.45) 0%, rgba(163,126,44,0) 70%)',
    transform: 'translate(-50%, -50%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
    zIndex: 0,
    willChange: 'opacity',
  },
  watchImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    position: 'relative',
    zIndex: 1,
    filter: 'drop-shadow(0 0 40px rgba(163,126,44,0.15))',
    willChange: 'transform, opacity',
  },
  label: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    zIndex: 3,
  },
  pill: {
    background: 'rgba(0, 96, 57, 0.2)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(163,126,44,0.25)',
    borderRadius: 'var(--radius-xl)',
    padding: '0.4rem 1rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--gold-light)',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  connectingLine: {
    stroke: 'var(--gold)',
    strokeWidth: 1.5,
    opacity: 0.5,
  },
};

/* ── Component ────────────────────────────────────────── */
export default function Showcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  /* Mouse parallax tracking */
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth spring-driven offsets (opposite direction = "parallax push")
  const springConfig = { stiffness: 80, damping: 20, mass: 0.5 };
  const offsetX = useSpring(0, springConfig);
  const offsetY = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // normalise to -1..1
    const nx = (e.clientX - centerX) / (rect.width / 2);
    const ny = (e.clientY - centerY) / (rect.height / 2);
    // move opposite to cursor, max ±30px
    offsetX.set(-nx * 30);
    offsetY.set(-ny * 30);
  };

  const handleMouseLeave = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      style={styles.section}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Section title */}
      <motion.h2
        style={styles.title}
        className="gold-gradient-text"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
      >
        Masterpiece in Detail
      </motion.h2>

      {/* Image container with parallax */}
      <motion.div
        style={{
          ...styles.imageContainer,
          x: offsetX,
          y: offsetY,
        }}
      >
        {/* Pulsing gold glow behind watch */}
        <motion.div
          style={styles.glow}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Watch image */}
        <motion.img
          src={watchImg}
          alt="Crown Collection luxury timepiece"
          style={styles.watchImage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: LUXURY_EASE, delay: 0.2 }}
        />

        {/* Floating feature labels — desktop only */}
        <motion.div
          variants={labelContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
          className="showcase-labels-desktop"
        >
          {LABELS.map((label, i) => (
            <motion.div
              key={label.text}
              variants={labelVariants}
              style={{ ...styles.label, ...label.style }}
            >
              {/* Connecting line SVG */}
              <svg
                style={label.lineSvgStyle}
                viewBox="0 0 64 2"
                preserveAspectRatio="none"
              >
                <line
                  x1={0}
                  y1={1}
                  x2={64}
                  y2={1}
                  style={styles.connectingLine}
                />
              </svg>
              {/* Pill label */}
              <span style={styles.pill}>{label.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Responsive: hide labels on mobile ──────────── */}
      <style>{`
        @media (max-width: 768px) {
          .showcase-labels-desktop { display: none !important; }
        }
      `}</style>
    </section>
  );
}
