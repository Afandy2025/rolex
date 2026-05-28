/* ═══════════════════════════════════════════════════════════
   Navbar — Luxury fixed navigation
   ═══════════════════════════════════════════════════════════
   - Transparent → dark on scroll with backdrop-blur
   - Gold gradient logo "ROLEX × NFT"
   - Desktop links with animated gold underline on hover
   - Mobile hamburger → fullscreen overlay nav (AnimatePresence)
   ═══════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import rolexLogo from '../../assets/Logo_da_Rolex.png';

/* ── Luxury easing curve ──────────────────────────────────── */
const LUXURY_EASE = [0.22, 1, 0.36, 1];

/* ── Navigation links ─────────────────────────────────────── */
const NAV_LINKS = [
  { key: 'the_watch', href: '/watch' },
  { key: 'story', href: '/story' },
  { key: 'roadmap', href: '/roadmap' },
];

/* ── Desktop NavLink with animated underline ──────────────── */
function NavLink({ labelKey, href }) {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === href;
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <Link
      to={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        color: isActive ? 'var(--gold-light)' : 'var(--cream)',
        textDecoration: 'none',
        fontFamily: 'var(--font-body)',
        fontSize: '0.85rem',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '0.5rem 0',
        transition: 'color 0.3s ease',
      }}
    >
      <motion.span whileHover={{ color: '#d4aa50' }}>{t(`nav.${labelKey}`)}</motion.span>

      {/* ── Animated gold underline from left ─────────────── */}
      <motion.span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
          transformOrigin: isRtl ? 'right' : 'left',
        }}
        initial={{ scaleX: isActive ? 1 : 0 }}
        animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: LUXURY_EASE }}
      />
    </Link>
  );
}

/* ── Mobile menu overlay animation variants ───────────────── */
const overlayVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.4, ease: LUXURY_EASE },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.4, ease: LUXURY_EASE },
  },
};

const mobileNavVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const mobileLinkVariants = {
  closed: { opacity: 0, y: 40 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: LUXURY_EASE },
  },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  /* ── Detect mobile breakpoint ──────────────────────────── */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ── Lock body scroll when mobile menu is open ─────────── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);
  
  /* ── Close mobile menu on route change ─────────── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* ── Scroll-reactive background opacity ────────────────── */
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const blurAmount = useTransform(scrollY, [0, 100], [0, 20]);

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 clamp(1.5rem, 4vw, 3rem)',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* ── Background layer (separate for animated opacity) ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 45, 26, 1)',
            opacity: bgOpacity,
            backdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`),
            WebkitBackdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`),
            borderBottom: '1px solid rgba(163, 126, 44, 0.1)',
            zIndex: -1,
          }}
        />

        {/* ── Logo ─────────────────────────────────────────── */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <motion.img 
            src={rolexLogo} 
            alt="Rolex Logo"
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3, ease: LUXURY_EASE }}
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* ── Desktop Links ───────────────────────────────── */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              alignItems: 'center',
            }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} labelKey={link.key} href={link.href} />
            ))}
            <button
              onClick={toggleLanguage}
              style={{
                background: 'none',
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                padding: '0.3rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {i18n.language === 'en' ? 'العربية' : 'EN'}
            </button>
          </div>
        )}

        {/* ── Mobile Hamburger Icon ───────────────────────── */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={toggleLanguage}
              style={{
                background: 'none',
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              {i18n.language === 'en' ? 'AR' : 'EN'}
            </button>
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              zIndex: 200,
            }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {/* Three bars → X animation */}
            <motion.span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                background: 'var(--gold)',
                transformOrigin: 'center',
              }}
              animate={mobileOpen
                ? { rotate: 45, y: 7.5 }
                : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3, ease: LUXURY_EASE }}
            />
            <motion.span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                background: 'var(--gold)',
              }}
              animate={mobileOpen
                ? { opacity: 0, scaleX: 0 }
                : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                background: 'var(--gold)',
                transformOrigin: 'center',
              }}
              animate={mobileOpen
                ? { rotate: -45, y: -7.5 }
                : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3, ease: LUXURY_EASE }}
            />
          </motion.button>
          </div>
        )}
      </motion.nav>

      {/* ── Mobile Fullscreen Overlay Navigation ─────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(0, 26, 15, 0.97)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              variants={mobileNavVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2.5rem',
              }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{ textDecoration: 'none' }}
                >
                  <motion.div
                    variants={mobileLinkVariants}
                    style={{
                      color: 'var(--cream)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2rem, 6vw, 3rem)',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                    whileHover={{ color: '#d4aa50', x: i18n.dir() === 'rtl' ? -10 : 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {t(`nav.${link.key}`)}
                  </motion.div>
                </Link>
              ))}

              {/* ── Decorative gold divider in mobile menu ───── */}
              <motion.div
                variants={mobileLinkVariants}
                style={{
                  width: '80px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
