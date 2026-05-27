import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import AnimatedText from '../AnimatedText';

import watchImg from '../../../assets/ChatGPT Image May 27, 2026, 07_46_08 PM.png';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

const DashboardItem = ({ title, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: LUXURY_EASE }}
    style={{
      borderBottom: '1px solid rgba(163,126,44,0.2)',
      padding: '1rem 0',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}
  >
    <span style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</span>
    <span style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>{value}</span>
  </motion.div>
);

export default function NFTWatchIntegration() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const watchY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} style={{ padding: '12rem 0', background: 'var(--darker-green)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Holographic Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: 'radial-gradient(var(--gold) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="section-inner" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* ── Left: Watch Visual & Hologram ── */}
        <div style={{ flex: '1 1 500px', position: 'relative', height: '600px' }}>
          
          {/* Cyber scanner ring */}
          <motion.div
            animate={{ rotateX: [60, 60], rotateZ: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', top: '50%', left: '50%', width: '150%', height: '150%',
              marginLeft: '-75%', marginTop: '-75%',
              border: '2px solid rgba(163,126,44,0.1)',
              borderRadius: '50%', borderTopColor: 'var(--gold)',
              boxShadow: '0 0 40px rgba(163,126,44,0.2)'
            }}
          />

          <motion.img
            src={watchImg}
            alt="Rolex connected to Blockchain"
            style={{ y: watchY, width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.5))' }}
          />
          
          {/* Holographic scanning effect */}
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', left: '10%', right: '10%', height: '4px', background: 'var(--gold)', opacity: 0.8, zIndex: 3, boxShadow: '0 0 20px var(--gold)', filter: 'blur(2px)' }}
          />

          {/* Roman Floating Ornaments */}
          <div style={{ position: 'absolute', top: '10%', left: '0', fontSize: '3rem', color: 'var(--gold)', opacity: 0.2, fontFamily: 'var(--font-heading)' }}>III</div>
          <div style={{ position: 'absolute', bottom: '20%', right: '0', fontSize: '3rem', color: 'var(--gold)', opacity: 0.2, fontFamily: 'var(--font-heading)' }}>IX</div>
        </div>

        {/* ── Right: Luxury Dashboard UI ── */}
        <div style={{ flex: '1 1 500px', position: 'relative', zIndex: 5 }}>
          
          <AnimatedText text="THE PHYSICAL MEETS DIGITAL" el="h3" style={{ fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }} />
          <AnimatedText text="A New Dimension of Luxury" el="h2" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: 'var(--cream)', fontFamily: 'var(--font-heading)', marginBottom: '2rem', lineHeight: 1.1 }} />
          <AnimatedText text="Every masterpiece is cryptographically paired with a 1-of-1 NFT, locking its legacy into the blockchain forever." el="p" style={{ fontSize: '1.1rem', color: 'rgba(245,240,232,0.7)', lineHeight: 1.6, marginBottom: '3rem' }} />
          
          {/* Futuristic UI Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: LUXURY_EASE }}
            style={{
              background: 'rgba(0, 30, 15, 0.4)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(163,126,44,0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(163,126,44,0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Live Verification Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88' }} />
              <span style={{ color: '#00ff88', letterSpacing: '0.1em', fontSize: '0.9rem', fontWeight: 600 }}>BLOCKCHAIN VERIFIED</span>
            </div>

            <DashboardItem title="Smart Contract" value="0x7a2...9F1A" delay={0.2} />
            <DashboardItem title="Digital Certificate" value="Minted (ERC-721)" delay={0.3} />
            <DashboardItem title="Serial Number" value="#R-2048-X" delay={0.4} />
            <DashboardItem title="Provenance" value="Immutable Ledger" delay={0.5} />
            <DashboardItem title="Metaverse / AR" value="Ready & Synced" delay={0.6} />
            
            {/* Animated Loading Bar */}
            <div style={{ marginTop: '2rem', height: '2px', width: '100%', background: 'rgba(245,240,232,0.1)', overflow: 'hidden' }}>
              <motion.div
                initial={{ x: '-100%' }} animate={{ x: '100%' }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
              />
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
