import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const dashboard = t('nft_watch_integration.dashboard', { returnObjects: true }) || [];
  
  /* Removed scroll transform for performance */

  return (
    <section ref={sectionRef} style={{ padding: '12rem 0', background: 'var(--darker-green)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Holographic Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: 'radial-gradient(var(--gold) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="section-inner" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* ── Left: Watch Visual & Hologram ── */}
        <div style={{ flex: '1 1 min(100%, 500px)', position: 'relative', height: 'clamp(400px, 60vw, 600px)' }}>
          
          {/* Cyber scanner ring (Static for performance) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: LUXURY_EASE }}
            style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.5))' }}
          />
          
          {/* Holographic scanning effect (Static overlay for performance) */}
          <div
            style={{ position: 'absolute', left: '10%', right: '10%', top: '50%', height: '2px', background: 'var(--gold)', opacity: 0.3, zIndex: 3, boxShadow: '0 0 20px var(--gold)' }}
          />

          {/* Roman Floating Ornaments */}
          <div style={{ position: 'absolute', top: '10%', left: '0', fontSize: '3rem', color: 'var(--gold)', opacity: 0.2, fontFamily: 'var(--font-heading)' }}>III</div>
          <div style={{ position: 'absolute', bottom: '20%', right: '0', fontSize: '3rem', color: 'var(--gold)', opacity: 0.2, fontFamily: 'var(--font-heading)' }}>IX</div>
        </div>

        {/* ── Right: Luxury Dashboard UI ── */}
        <div style={{ flex: '1 1 min(100%, 500px)', position: 'relative', zIndex: 5 }}>
          
          <AnimatedText text={t('nft_watch_integration.subtitle')} el="h3" style={{ fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }} />
          <AnimatedText text={t('nft_watch_integration.title')} el="h2" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: 'var(--cream)', fontFamily: 'var(--font-heading)', marginBottom: '2rem', lineHeight: 1.1 }} />
          <AnimatedText text={t('nft_watch_integration.text')} el="p" style={{ fontSize: '1.1rem', color: 'rgba(245,240,232,0.7)', lineHeight: 1.6, marginBottom: '3rem' }} />
          
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
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88' }} />
              <span style={{ color: '#00ff88', letterSpacing: '0.1em', fontSize: '0.9rem', fontWeight: 600 }}>{t('nft_watch_integration.status')}</span>
            </div>

            {dashboard.map((item, index) => (
              <DashboardItem key={index} title={item.title} value={item.value} delay={0.2 + (index * 0.1)} />
            ))}
            
            {/* Animated Loading Bar (Static for Performance) */}
            <div style={{ marginTop: '2rem', height: '2px', width: '100%', background: 'rgba(245,240,232,0.1)', overflow: 'hidden' }}>
              <div
                style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
              />
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
