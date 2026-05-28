/* ═══════════════════════════════════════════════════════════
   Footer — Branded footer with animated gold border & socials
   Features: scaleX border animation, SVG social icons, hover glow
   ═══════════════════════════════════════════════════════════ */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import rolexLogo from '../../assets/Logo_da_Rolex.png';

/* ── Luxury easing ────────────────────────────────────── */
const LUXURY_EASE = [0.22, 1, 0.36, 1];

/* ── Social link data with inline SVG paths ───────────── */
const SOCIALS = [
  {
    name: 'X / Twitter',
    href: '#',
    // X (formerly Twitter) logo path
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: '#',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.332-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.332-.946 2.418-2.157 2.418Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'OpenSea',
    href: '#',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.629 0 12 0ZM5.92 12.403l.051-.081 3.123-4.884a.107.107 0 0 1 .187.014c.52 1.169.972 2.623.76 3.528-.088.372-.328.876-.614 1.342a2.405 2.405 0 0 1-.117.199.106.106 0 0 1-.09.045H6.013a.106.106 0 0 1-.093-.163Zm13.914 1.68a.109.109 0 0 1-.065.101c-.243.103-1.07.485-1.414.962-.878 1.222-1.548 2.97-3.048 2.97H9.053a4.019 4.019 0 0 1-4.013-4.028v-.072c0-.058.048-.106.108-.106h3.485c.07 0 .12.063.115.132-.02.206.016.415.108.608.18.376.56.612.975.612h1.527V13.19h-1.51a.112.112 0 0 1-.09-.178c.02-.032.043-.066.071-.106.2-.283.49-.724.779-1.222.197-.338.39-.696.543-1.055.03-.062.055-.126.08-.187.041-.107.084-.206.117-.304.033-.084.062-.173.088-.26a6.413 6.413 0 0 0 .117-.75 8.372 8.372 0 0 0-.009-.75 6.53 6.53 0 0 0-.047-.407c-.02-.117-.046-.234-.075-.354l-.01-.049c-.022-.088-.042-.173-.07-.26a13.964 13.964 0 0 0-.31-.965l-.043-.117c-.088-.235-.176-.458-.27-.665a5.98 5.98 0 0 0-.155-.312c-.048-.09-.1-.178-.147-.26a1.27 1.27 0 0 0-.072-.117l-.21-.345c-.028-.047.015-.107.07-.097l1.168.316h.004l.155.044.17.047.062.017V5.48c0-.377.153-.72.399-.966A1.394 1.394 0 0 1 13.1 4.12c.264 0 .504.1.682.262.179.162.305.39.342.645l.001.01v1.732l.127.036a.103.103 0 0 1 .036.02c.046.038.112.098.197.173.066.058.137.126.22.2.166.153.365.348.578.573.056.059.11.12.164.181.219.249.462.534.69.846.076.102.15.209.221.316.074.107.15.214.217.32.089.144.183.293.26.446.037.071.079.146.112.22.1.206.18.42.244.634.02.065.036.133.048.198v.015a2.04 2.04 0 0 1 .025.42 2.66 2.66 0 0 1-.038.384c-.022.117-.053.234-.088.35-.037.121-.08.238-.126.35a5.323 5.323 0 0 1-.37.724c-.04.07-.084.142-.126.209-.046.07-.09.138-.138.2-.065.093-.136.182-.2.271-.057.08-.117.159-.18.231-.088.107-.179.21-.27.304-.055.062-.113.124-.172.18-.058.059-.12.114-.173.163l-.113.103a.108.108 0 0 1-.073.028h-.93v2.076h1.17c.264 0 .516-.09.72-.254.06-.049.51-.432.711-.942a.11.11 0 0 1 .042-.053.107.107 0 0 1 .063-.02l3.317-.95a.108.108 0 0 1 .136.103v.013l.001.012Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

/* ── Styles ───────────────────────────────────────────── */
const s = {
  footer: {
    position: 'relative',
    background: 'var(--black, #000a05)',
    padding: '4rem var(--space-lg) 2rem',
  },
  inner: {
    width: '100%',
    padding: '0 5vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 'var(--space-xl)',
  },
  /* Animated gold top border */
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    background: 'linear-gradient(90deg, transparent, var(--gold-light), var(--gold), var(--gold-light), transparent)',
    transformOrigin: 'center',
  },
  /* Top row — logo + tagline */
  logo: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 700,
    letterSpacing: '0.04em',
    lineHeight: 1.2,
  },
  tagline: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'rgba(245,240,232,0.5)',
    fontWeight: 300,
    marginTop: 'var(--space-xs)',
    letterSpacing: '0.06em',
  },
  /* Middle row — social icons */
  socialsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-lg)',
  },
  socialLink: {
    color: 'var(--gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    borderRadius: '50%',
    padding: 10,
  },
  /* Bottom row — legal */
  bottomRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 6,
    textAlign: 'end',
  },
  copyright: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'rgba(245,240,232,0.35)',
    fontWeight: 300,
  },
  disclaimer: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.72rem',
    color: 'rgba(245,240,232,0.22)',
    fontWeight: 300,
    maxWidth: 420,
    lineHeight: 1.5,
  },
};

/* ── Component ────────────────────────────────────────── */
export default function Footer() {
  const borderRef = useRef(null);
  const isInView = useInView(borderRef, { once: true, margin: '-20px' });
  const { t } = useTranslation();

  return (
    <footer style={s.footer} ref={borderRef}>
      {/* Animated gold top border — expands from centre */}
      <motion.div
        style={s.topBorder}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, ease: LUXURY_EASE }}
      />

      <div style={s.inner}>
        {/* ── Top: Logo + tagline ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: LUXURY_EASE }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          <img 
            src={rolexLogo} 
            alt="Rolex Logo"
            style={{ height: '45px', width: 'auto', objectFit: 'contain', marginBottom: '1rem' }}
          />
          <p style={s.tagline}>{t('footer.tagline')}</p>
        </motion.div>

        {/* ── Middle: Social icons ────────────────────── */}
        <motion.div
          style={s.socialsRow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {SOCIALS.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              style={s.socialLink}
              whileHover={{
                scale: 1.2,
                boxShadow: '0 0 20px rgba(163,126,44,0.5)',
                transition: { duration: 0.25 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* ── Bottom: Copyright + disclaimer ──────────── */}
        <motion.div
          style={s.bottomRow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p style={s.copyright}>
            {t('footer.copyright')}
          </p>
          <p style={s.disclaimer}>
            {t('footer.disclaimer')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
