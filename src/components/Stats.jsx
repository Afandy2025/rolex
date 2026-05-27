/* ═══════════════════════════════════════════════════════════
   Stats Bar — Animated Counting Statistics
   ═══════════════════════════════════════════════════════════
   Features:
   - Dark-green background with subtle gold particle overlay
   - 4 stats in a row with animated counting (rAF-driven)
   - Gold decorative vertical dividers between stats
   - useInView triggers count-up from 0 → target over 2 seconds
   - Responsive: 2×2 grid on mobile
*/

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Custom luxury easing ─────────────────────────────── */
const LUXURY_EASE = [0.22, 1, 0.36, 1];

/* ── Stat data ────────────────────────────────────────── */
const STATS = [
  { target: 88, label: 'NFTs Minted', prefix: '', suffix: '' },
  { target: 12, label: 'ETH Total Volume', prefix: 'Ξ ', suffix: '' },
  { target: 1200, label: 'Holders', prefix: '', suffix: '+' },
  { target: 100, label: 'Authentic', prefix: '', suffix: '%' },
];

/* ── Animation variants ───────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: LUXURY_EASE },
  },
};

/* ── Styles ───────────────────────────────────────────── */
const styles = {
  section: {
    position: 'relative',
    background: 'var(--dark-green)',
    padding: '4rem var(--space-lg)',
    overflow: 'hidden',
    borderTop: '1px solid rgba(163,126,44,0.2)',
    borderBottom: '1px solid rgba(163,126,44,0.2)',
  },

  inner: {
    width: '100%',
    padding: '0 5vw',
    position: 'relative',
    zIndex: 2,
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0',
  },

  statItem: {
    flex: '1 1 200px',
    textAlign: 'center',
    padding: 'var(--space-md) var(--space-lg)',
    position: 'relative',
  },

  number: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    fontWeight: 700,
    color: 'var(--gold)',
    lineHeight: 1.1,
    marginBottom: 'var(--space-xs)',
  },

  label: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'var(--cream)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    opacity: 0.7,
  },

  /* Gold vertical divider (placed on ::after of each stat except last) */
  divider: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '1px',
    height: '40px',
    background: 'linear-gradient(180deg, transparent, var(--gold), transparent)',
  },

  /* ── Particle canvas ────────────────────────────────── */
  particleContainer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 1,
  },

  particle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'var(--gold)',
  },
};

/* ── Responsive CSS ───────────────────────────────────── */
const responsiveCSS = `
  @media (max-width: 768px) {
    .stats-row {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: var(--space-md) !important;
    }
    /* Hide dividers on mobile grid */
    .stat-divider {
      display: none !important;
    }
  }
`;

/* ═══════════════════════════════════════════════════════════
   useCountUp — animates a number from 0 → target
   ═══════════════════════════════════════════════════════════ */
function useCountUp(target, shouldStart, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime = null;
    let rafId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      /* Ease-out cubic for a satisfying deceleration */
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [shouldStart, target, duration]);

  return value;
}

/* ═══════════════════════════════════════════════════════════
   StatItem — individual stat with counting animation
   ═══════════════════════════════════════════════════════════ */
function StatItem({ stat, isLast, shouldCount, gridColumn, className }) {
  const count = useCountUp(stat.target, shouldCount);

  /* Format number with comma separators */
  const formatted = count.toLocaleString();

  return (
    <motion.div className={className} style={{ ...styles.statItem, gridColumn }} variants={itemVariants}>
      <div style={styles.number}>
        {stat.prefix}
        {formatted}
        {stat.suffix}
      </div>
      <div style={styles.label}>{stat.label}</div>

      {/* Gold vertical divider */}
      {!isLast && (
        <div className="stat-divider" style={styles.divider} />
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GoldParticles — subtle floating gold dots
   ═══════════════════════════════════════════════════════════ */
function GoldParticles({ count = 15 }) {
  /* Generate random positions & sizes once */
  const [particles] = useState(() =>
    Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.4 + 0.1,
    }))
  );

  return (
    <div style={styles.particleContainer}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{
            ...styles.particle,
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: p.opacity }}
          transition={{ duration: 2, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════ */
export default function Stats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section ref={sectionRef} style={styles.section}>
      <style>{responsiveCSS}</style>

      {/* Subtle gold particle overlay */}
      <GoldParticles count={typeof window !== 'undefined' && window.innerWidth < 768 ? 5 : 15} />

      <motion.div
        className="cinematic-grid"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {STATS.map((stat, i) => {
          // Create the uneven asymmetric grid spans for desktop
          const gridSpans = ['1 / span 3', '4 / span 3', '8 / span 3', '11 / span 2'];
          const classNames = "col-span-md-3 col-span-sm-full";
          return (
            <StatItem
              key={stat.label}
              stat={stat}
              isLast={i === STATS.length - 1}
              shouldCount={isInView}
              gridColumn={gridSpans[i] || 'span 3'}
              className={classNames}
            />
          );
        })}
      </motion.div>
    </section>
  );
}
