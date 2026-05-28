/* ═══════════════════════════════════════════════════════════
   FAQ — Accordion section with smooth height animations
   Features: AnimatePresence, rotating plus→X icon, gold styling
   ═══════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/* ── Luxury easing ────────────────────────────────────── */
const LUXURY_EASE = [0.22, 1, 0.36, 1];

/* ── FAQ data array removed, data will come from translation ── */

const s = {
  section: {
    padding: 'var(--space-3xl) 5vw',
    position: 'relative',
    background: 'var(--darker-green, #001a0f)',
    width: '100%',
  },
  inner: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '4rem',
    flexWrap: 'wrap',
  },
  leftCol: {
    flex: '1 1 300px',
    maxWidth: '400px',
  },
  rightCol: {
    flex: '2 1 500px',
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    textAlign: 'left',
    marginBottom: 'var(--space-sm)',
  },
  dividerWrap: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 'var(--space-2xl)',
  },
  /* Individual FAQ item */
  item: {
    borderBottom: '1px solid rgba(163,126,44,0.15)',
  },
  questionRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 0',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    gap: '1rem',
  },
  questionText: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.1rem',
    fontWeight: 500,
    color: 'var(--cream)',
    lineHeight: 1.4,
    flex: 1,
  },
  /* Plus / X icon */
  iconWrap: {
    width: 28,
    height: 28,
    minWidth: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLine: {
    position: 'absolute',
    width: 16,
    height: 2,
    borderRadius: 1,
    background: 'var(--gold)',
  },
  /* Answer area */
  answerText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    lineHeight: 1.8,
    color: 'rgba(245,240,232,0.65)',
    fontWeight: 300,
    paddingBottom: '1.5rem',
    paddingRight: '2rem',
  },
};

/* ── Single FAQ item ──────────────────────────────────── */
function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div style={s.item}>
      {/* Question row — acts as button */}
      <button
        style={s.questionRow}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span style={s.questionText}>{item.q}</span>

        {/* Rotating plus → X icon */}
        <div style={s.iconWrap}>
          <motion.div
            style={{ position: 'relative', width: 16, height: 16 }}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: LUXURY_EASE }}
          >
            {/* Horizontal bar */}
            <span
              style={{
                ...s.iconLine,
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
              }}
            />
            {/* Vertical bar */}
            <span
              style={{
                ...s.iconLine,
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 2,
                height: 16,
              }}
            />
          </motion.div>
        </div>
      </button>

      {/* Answer — AnimatePresence for mount/unmount */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p style={s.answerText}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();
  const faqData = t('faq.questions', { returnObjects: true }) || [];

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section id="faq" style={s.section}>
      <div className="ambient-glow" style={{ top: '10%', right: '-30%', background: 'radial-gradient(circle, rgba(163, 126, 44, 0.2) 0%, rgba(0, 45, 26, 0.4) 50%, transparent 70%)' }} />

      <div className="cinematic-grid" style={{ position: 'relative', zIndex: 2, alignItems: 'flex-start' }}>
        {/* Left Column - Heading */}
        <div className="col-span-4 col-span-md-full col-span-sm-full" style={{ gridColumn: '1 / span 4' }}>
          <motion.h2
            className="gold-gradient-text"
            style={s.heading}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
          >
            {t('faq.title')}
          </motion.h2>

          <div style={s.dividerWrap}>
            <div className="gold-divider" />
          </div>
        </div>

        {/* Right Column - FAQ list */}
        <div className="col-span-7 col-span-md-full col-span-sm-full" style={{ gridColumn: '6 / span 7' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: LUXURY_EASE, delay: 0.15 }}
          >
            {(Array.isArray(faqData) ? faqData : []).map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
