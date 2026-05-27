/* ═══════════════════════════════════════════════════════════
   CustomCursor — Luxury gold cursor replacement
   ═══════════════════════════════════════════════════════════
   - Small 12px gold circle follows the mouse with spring physics
   - Expands to 48px when hovering clickable elements
   - Outer ring scales independently for layered effect
   - Hidden on mobile (< 768px)
   ═══════════════════════════════════════════════════════════ */

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/* ── Spring config for that smooth luxury feel ─────────── */
const SPRING_CONFIG = { stiffness: 500, damping: 28 };

/* ── Selectors for interactive elements ────────────────── */
const INTERACTIVE_SELECTORS = 'a, button, [role="button"], input, select, textarea, .glass-card, .btn-primary, .btn-outline';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default hidden

  /* ── Spring-animated cursor position ─────────────────── */
  const cursorX = useSpring(0, SPRING_CONFIG);
  const cursorY = useSpring(0, SPRING_CONFIG);

  /* ── Outer ring uses softer springs for trailing effect ─ */
  const ringX = useSpring(0, { stiffness: 250, damping: 24 });
  const ringY = useSpring(0, { stiffness: 250, damping: 24 });

  useEffect(() => {
    /* ── Check if mobile ─────────────────────────────────── */
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    /* ── Mouse move handler ──────────────────────────────── */
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    /* ── Hover detection on interactive elements ─────────── */
    const handleMouseOver = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTORS)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTORS)) {
        setIsHovering(false);
      }
    };

    /* ── Hide cursor when it leaves the window ───────────── */
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  /* ── Don't render on mobile ────────────────────────────── */
  if (isMobile) return null;

  /* ── Cursor dimensions ─────────────────────────────────── */
  const dotSize = isHovering ? 80 : 12;
  const ringSize = isHovering ? 100 : 36;

  return (
    <>
      {/* ── Inner dot: solid gold circle or difference blend ── */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: cursorX, y: cursorY,
          width: dotSize, height: dotSize,
          borderRadius: '50%',
          background: isHovering ? '#ffffff' : 'var(--gold)',
          pointerEvents: 'none',
          zIndex: 99999,
          translateX: '-50%', translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          mixBlendMode: isHovering ? 'difference' : 'normal',
          boxShadow: isHovering ? '0 0 30px rgba(255,255,255,0.4)' : 'none'
        }}
        animate={{ width: dotSize, height: dotSize, opacity: isVisible ? 1 : 0 }}
        transition={{
          width: { type: 'spring', stiffness: 400, damping: 25 },
          height: { type: 'spring', stiffness: 400, damping: 25 },
          opacity: { duration: 0.15 },
        }}
      >
        {isHovering && (
           <motion.div 
             initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
             style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontFamily: 'var(--font-heading)', fontSize: '10px', letterSpacing: '2px' }}
           >
             TAP
           </motion.div>
        )}
      </motion.div>

      {/* ── Outer ring: gold border that trails slightly ───── */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: ringX, y: ringY,
          width: ringSize, height: ringSize,
          borderRadius: '50%',
          border: `1px solid ${isHovering ? 'rgba(255,255,255,0.2)' : 'rgba(163,126,44,0.5)'}`,
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          translateX: '-50%', translateY: '-50%',
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
        }}
        animate={{ width: ringSize, height: ringSize, opacity: isVisible && !isHovering ? 1 : 0 }}
        transition={{
          width: { type: 'spring', stiffness: 250, damping: 20 },
          height: { type: 'spring', stiffness: 250, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      />
    </>
  );
}
