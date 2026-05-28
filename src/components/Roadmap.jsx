/* ═══════════════════════════════════════════════════════════
   Roadmap — Vertical timeline with scroll-driven progress
   Features: alternating cards, gold line growth, milestone dots
   ═══════════════════════════════════════════════════════════ */
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import { useTranslation } from 'react-i18next';

/* ── Luxury easing ────────────────────────────────────── */
const LUXURY_EASE = [0.22, 1, 0.36, 1];

/* ── Milestone data array removed, data will come from translation ── */

/* ── Styles ───────────────────────────────────────────── */
const s = {
  section: {
    padding: 'var(--space-3xl) 5vw',
    position: 'relative',
    background: 'var(--dark-green)',
    width: '100%',
  },
  inner: {
    width: '100%',
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    textAlign: 'center',
    marginBottom: 'var(--space-sm)',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: 'rgba(245,240,232,0.6)',
    marginBottom: 'var(--space-md)',
    fontFamily: 'var(--font-body)',
    fontWeight: 300,
  },
  dividerWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 'var(--space-2xl)',
  },
  /* Timeline wrapper */
  timeline: {
    position: 'relative',
    paddingTop: 'var(--space-lg)',
    paddingBottom: 'var(--space-lg)',
  },
  /* The background (unfilled) track */
  trackBg: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    background: 'rgba(163,126,44,0.12)',
    transform: 'translateX(-50%)',
  },
  /* Filled gold line — grows on scroll */
  trackFill: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    background: 'linear-gradient(180deg, var(--gold-light), var(--gold))',
    transform: 'translateX(-50%)',
    transformOrigin: 'top',
  },
  /* Single milestone row */
  milestoneRow: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    marginBottom: 'var(--space-2xl)',
  },
  /* Gold dot on the centre line */
  dot: {
    position: 'absolute',
    left: '50%',
    top: 28,
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: 'var(--gold)',
    border: '3px solid var(--dark-green)',
    transform: 'translateX(-50%)',
    zIndex: 2,
    boxShadow: '0 0 12px rgba(163,126,44,0.4)',
  },
  /* Card shared */
  card: {
    width: '44%',
    background: 'rgba(0, 96, 57, 0.12)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(163,126,44,0.15)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-md) var(--space-lg)',
    position: 'relative',
  },
  phaseLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
    color: 'var(--cream)',
    marginBottom: 'var(--space-xs)',
  },
  quarterPill: {
    display: 'inline-block',
    background: 'rgba(163,126,44,0.15)',
    border: '1px solid rgba(163,126,44,0.3)',
    borderRadius: 'var(--radius-xl)',
    padding: '0.2rem 0.75rem',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    color: 'var(--gold-light)',
    marginBottom: 'var(--space-sm)',
    fontFamily: 'var(--font-body)',
  },
  description: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: 'rgba(245,240,232,0.7)',
    fontWeight: 300,
  },
};

/* ── Individual milestone card (uses useInView) ───────── */
function MilestoneCard({ data, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0; // even = left, odd = right

  const slideVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -60 : 60,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: LUXURY_EASE },
    },
  };

  return (
    <div
      ref={ref}
      style={s.milestoneRow}
      className="roadmap-milestone-row"
    >
      {/* Gold dot */}
      <motion.div
        style={s.dot}
        className="roadmap-dot"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, ease: LUXURY_EASE, delay: 0.2 }}
      />

      {/* Card — placed left or right */}
      <motion.div
        style={{
          ...s.card,
          ...(isLeft
            ? { marginRight: 'auto' }
            : { marginLeft: 'auto' }),
        }}
        className="glass-card roadmap-card"
        variants={slideVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        whileHover={{
          y: -6,
          borderColor: 'rgba(163,126,44,0.5)',
          boxShadow: '0 8px 40px rgba(163,126,44,0.15)',
          transition: { duration: 0.3 },
        }}
      >
        <p style={s.phaseLabel}>{data.phase}</p>
        <h3 style={s.cardTitle}>{data.title}</h3>
        <span style={s.quarterPill}>{data.quarter}</span>
        <p style={s.description}>{data.description}</p>
      </motion.div>
    </div>
  );
}

export default function Roadmap() {
  const timelineRef = useRef(null);
  const { t } = useTranslation();
  const milestones = t('roadmap.phases', { returnObjects: true }) || [];

  /* Scroll-linked gold line growth */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 50%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="roadmap" style={s.section}>
      <div className="ambient-glow" style={{ top: '30%', left: '-20%', background: 'radial-gradient(circle, rgba(163, 126, 44, 0.2) 0%, rgba(0, 45, 26, 0.4) 50%, transparent 70%)' }} />

      <div className="cinematic-grid" style={{ position: 'relative', zIndex: 2, alignItems: 'flex-start' }}>
        
        {/* Left Column: Heading */}
        <div className="col-span-4 col-span-md-full col-span-sm-full" style={{ gridColumn: '1 / span 4', position: 'sticky', top: '120px' }}>
          <motion.h2
            className="gold-gradient-text"
            style={{ ...s.heading, textAlign: 'left' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
          >
            {t('roadmap.title')}
          </motion.h2>

          <motion.p
            style={{ ...s.subtitle, textAlign: 'left' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('roadmap.subtitle')}
          </motion.p>

          <div style={{ ...s.dividerWrap, justifyContent: 'flex-start' }}>
            <div className="gold-divider" />
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div ref={timelineRef} className="col-span-7 col-span-md-full col-span-sm-full" style={{ ...s.timeline, gridColumn: '6 / span 7' }}>
          {/* Background track */}
          <div style={s.trackBg} className="roadmap-track" />

          {/* Scroll-driven fill */}
          <motion.div
            style={{ ...s.trackFill, scaleY: lineScaleY }}
            className="roadmap-track-fill"
          />

          {/* Milestones */}
          {(Array.isArray(milestones) ? milestones : []).map((m, i) => (
            <MilestoneCard key={m.phase} data={m} index={i} />
          ))}
        </div>
      </div>

      {/* ── Mobile responsive overrides ──────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .roadmap-track,
          .roadmap-track-fill {
            left: 16px !important;
            transform: none !important;
          }
          .roadmap-track-fill {
            transform-origin: top !important;
          }
          .roadmap-dot {
            left: 16px !important;
            transform: translateX(-50%) !important;
          }
          .roadmap-milestone-row {
            flex-direction: column !important;
            padding-left: 40px !important;
          }
          .roadmap-card {
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
