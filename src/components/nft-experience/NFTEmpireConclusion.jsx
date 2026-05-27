import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedText from '../AnimatedText';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

// Magnetic Button Component
function MagneticButton({ children, primary }) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (e.clientX - centerX) * 0.2;
    const y = (e.clientY - centerY) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: primary ? 'var(--gold)' : 'transparent',
        color: primary ? 'var(--dark-green)' : 'var(--gold)',
        border: primary ? 'none' : '1px solid var(--gold)',
        padding: '1.2rem 3rem',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-heading)',
        fontSize: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        cursor: 'pointer',
        boxShadow: primary ? '0 10px 30px rgba(163,126,44,0.4)' : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Hover glow for primary */}
      {primary && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent)', zIndex: 1 }}
        />
      )}
      <span style={{ position: 'relative', zIndex: 2, fontWeight: 600 }}>{children}</span>
    </motion.button>
  );
}

export default function NFTEmpireConclusion() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <>
      {/* ── 1. THE DIGITAL EMPIRE OF THE FUTURE ───────────── */}
      <section style={{ padding: '10rem 0', background: 'var(--darker-green)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Architectural / Cyber Roman Temple Background */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(90deg, rgba(163,126,44,0.1) 1px, transparent 1px)', backgroundSize: '100px 100%' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', background: 'radial-gradient(circle at top, rgba(163,126,44,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        {/* Floating Roman Columns (Abstract CSS representation) */}
        <div style={{ position: 'absolute', left: '10%', top: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(255,255,255,0.05), rgba(0,0,0,0.5))', boxShadow: '0 0 20px rgba(0,0,0,0.8)', borderLeft: '1px solid rgba(163,126,44,0.2)', borderRight: '1px solid rgba(163,126,44,0.2)' }} />
        <div style={{ position: 'absolute', right: '10%', top: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(255,255,255,0.05), rgba(0,0,0,0.5))', boxShadow: '0 0 20px rgba(0,0,0,0.8)', borderLeft: '1px solid rgba(163,126,44,0.2)', borderRight: '1px solid rgba(163,126,44,0.2)' }} />

        <div className="section-inner" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          
          {isInView && (
            <AnimatedText text="THE DIGITAL EMPIRE OF THE FUTURE" el="h2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--cream)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', marginBottom: '2rem' }} className="gold-gradient-text" />
          )}
          
          {isInView && (
            <AnimatedText text="Beyond art. Beyond luxury. The blockchain is rebuilding the foundational architecture of society. NFTs will soon power the core of human identity and interaction." el="p" style={{ fontSize: '1.2rem', color: 'rgba(245,240,232,0.8)', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto 4rem auto' }} />
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            {['Digital Identity', 'Luxury Authentication', 'Smart Ownership', 'Event Access', 'Metaverse Products', 'Education Certificates', 'Digital Passports'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: LUXURY_EASE }}
                style={{ padding: '0.8rem 1.5rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(163,126,44,0.3)', borderRadius: 'var(--radius-full)', color: 'var(--gold-light)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                {item}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 2. FINAL CINEMATIC CTA ────────────────────────── */}
      <section ref={sectionRef} style={{ padding: '15rem 0', background: '#000', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        
        {/* Emerald Lighting & Fog */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0, 96, 57, 0.4) 0%, #000 80%)', filter: 'blur(60px)' }} />
        
        {/* Gold Particles */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: ['100vh', '-10vh'], x: [Math.random() * 20 - 10, Math.random() * -20 + 10] }}
              transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: 'linear', delay: Math.random() * 5 }}
              style={{ position: 'absolute', left: `${Math.random() * 100}%`, bottom: '-10px', width: Math.random() * 4 + 2, height: Math.random() * 4 + 2, background: 'var(--gold)', borderRadius: '50%', boxShadow: '0 0 15px var(--gold)', opacity: Math.random() * 0.8 }}
            />
          ))}
        </div>

        {/* Floating Blockchain Symbols */}
        <motion.div animate={{ y: [0, -20, 0], rotateZ: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '20%', left: '15%', fontSize: '4rem', color: 'var(--gold)', opacity: 0.1, fontFamily: 'var(--font-heading)' }}>ETH</motion.div>
        <motion.div animate={{ y: [0, 30, 0], rotateZ: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }} style={{ position: 'absolute', bottom: '20%', right: '15%', fontSize: '5rem', color: 'var(--gold)', opacity: 0.1, fontFamily: 'var(--font-heading)' }}>SOL</motion.div>

        <div className="section-inner" style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', padding: '0 2rem' }}>
          
          <motion.h2
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: LUXURY_EASE }}
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', color: 'var(--cream)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '4rem', textShadow: '0 20px 40px rgba(0,0,0,0.8)' }}
          >
            OWN TIME.<br/>
            OWN HISTORY.<br/>
            <span className="gold-gradient-text">OWN THE FUTURE.</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: LUXURY_EASE }}
            style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <MagneticButton primary>Explore Collection</MagneticButton>
            <MagneticButton>Enter The NFT Empire</MagneticButton>
          </motion.div>
          
        </div>
      </section>
    </>
  );
}
