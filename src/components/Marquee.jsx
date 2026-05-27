/* ═══════════════════════════════════════════════════════════
   Marquee — Infinite horizontal scroll ticker
   ═══════════════════════════════════════════════════════════
   • Pure CSS animation for 60 fps performance
   • Gold italic Playfair text on dark-green strip
   • Reverses direction on hover for playful interaction
   ═══════════════════════════════════════════════════════════ */

import { useState } from 'react';

// The ticker text — repeated for density
const TICKER_TEXT =
  'ROLEX × NFT  ◆  LIMITED EDITION  ◆  CROWN COLLECTION  ◆  MINT NOW  ◆  ';

// Repeat enough times to fill ultra-wide screens
const repeatedText = Array(12).fill(TICKER_TEXT).join('');

/* ── Styles ──────────────────────────────────────────────── */
const styles = {
  /* Outer wrapper — clips overflow and adds gold border lines */
  wrapper: {
    width: '100%',
    overflow: 'hidden',
    background: 'var(--dark-green)',
    borderTop: '1px solid rgba(163,126,44,0.3)',
    borderBottom: '1px solid rgba(163,126,44,0.3)',
    padding: '1rem 0',
    position: 'relative',
    zIndex: 10,
  },

  /* Inner track — holds two copies side by side */
  track: {
    display: 'flex',
    width: 'fit-content',
    willChange: 'transform',
  },

  /* Each text span */
  text: {
    fontFamily: "var(--font-heading)",
    fontStyle: 'italic',
    fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
    letterSpacing: '0.1em',
    color: 'var(--gold)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    flexShrink: 0,
  },
};

export default function Marquee() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Inject keyframes — only once, scoped via unique name */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div
        style={styles.wrapper}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-hidden="true" /* decorative element */
      >
        {/* Track with two identical copies for seamless looping */}
        <div
          style={{
            ...styles.track,
            animation: 'marquee-scroll 40s linear infinite',
            animationDirection: hovered ? 'reverse' : 'normal',
          }}
        >
          {/* Copy 1 */}
          <span style={styles.text}>{repeatedText}</span>
          {/* Copy 2 — creates seamless wrap */}
          <span style={styles.text}>{repeatedText}</span>
        </div>
      </div>
    </>
  );
}
