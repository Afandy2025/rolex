/* ═══════════════════════════════════════════════════════════
   ScrollProgress — Gold progress bar at top of viewport
   ═══════════════════════════════════════════════════════════
   - Fixed 3px bar at the very top of the page
   - Scales from 0→1 on X axis based on scroll progress
   - Uses useSpring for buttery smooth animation
   - Gold glow effect via box-shadow
   ═══════════════════════════════════════════════════════════ */

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  /* ── Track overall page scroll progress (0 → 1) ────────── */
  const { scrollYProgress } = useScroll();

  /* ── Spring-smooth the raw scroll value ────────────────── */
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        /* ── Positioning: pinned to top ────────────────────── */
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 9999,

        /* ── Gold bar styling ─────────────────────────────── */
        background: 'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))',
        transformOrigin: '0%', // scale from left edge
        scaleX,

        /* ── Glow effect ──────────────────────────────────── */
        boxShadow: '0 0 10px rgba(163, 126, 44, 0.6), 0 0 20px rgba(163, 126, 44, 0.3), 0 0 40px rgba(163, 126, 44, 0.1)',
      }}
    />
  );
}
