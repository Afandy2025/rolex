import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedText from '../AnimatedText';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: LUXURY_EASE } },
};

function ValueBlock({ index, title, desc, stat }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        background: 'linear-gradient(180deg, rgba(163,126,44,0.1) 0%, rgba(0,0,0,0) 100%)',
        border: '1px solid rgba(163,126,44,0.2)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      <div style={{ position: 'absolute', top: -20, right: -20, fontSize: '6rem', color: 'var(--gold)', opacity: 0.05, fontFamily: 'var(--font-heading)' }}>
        0{index}
      </div>
      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--gold-light)', margin: '0 0 1rem 0' }}>{title}</h4>
      <p style={{ color: 'rgba(245,240,232,0.7)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '0.95rem' }}>{desc}</p>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--cream)', fontWeight: 300 }}>{stat}</div>
    </motion.div>
  );
}

function UseCaseItem({ title, icon }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(163,126,44,0.15)' }}
      transition={{ duration: 0.4, ease: LUXURY_EASE }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0, 45, 26, 0.5)',
        border: '1px solid rgba(163,126,44,0.15)',
        borderRadius: 'var(--radius-md)',
        padding: '3rem 1rem',
        textAlign: 'center',
        cursor: 'pointer'
      }}
    >
      <motion.div 
        initial={{ opacity: 0.5, filter: 'grayscale(100%)' }}
        whileHover={{ opacity: 1, filter: 'grayscale(0%)', scale: 1.2 }}
        transition={{ duration: 0.4 }}
        style={{ fontSize: '3rem', marginBottom: '1.5rem' }}
      >
        {icon}
      </motion.div>
      <h4 style={{ color: 'var(--cream)', fontFamily: 'var(--font-heading)', margin: 0, letterSpacing: '0.05em' }}>{title}</h4>
    </motion.div>
  );
}

export default function NFTValue() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} style={{ padding: '10rem 0', background: 'var(--dark-green)', position: 'relative' }}>
      
      {/* ── 1. VALUE BLOCKS ───────────────────────────────── */}
      <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', marginBottom: '10rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <AnimatedText text="INTRINSIC VALUE" el="h3" style={{ fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }} />
          <AnimatedText text="The Metrics of Luxury" el="h2" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--cream)', fontFamily: 'var(--font-heading)' }} />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}
        >
          <ValueBlock index={1} title="Digital Scarcity" desc="Unlike standard digital files, NFTs are strictly limited. Code guarantees maximum supply, ensuring rarity." stat="1 of 1" />
          <ValueBlock index={2} title="Ownership Verification" desc="Instantly cryptographically prove that you are the sole owner of the asset anywhere in the world." stat="100%" />
          <ValueBlock index={3} title="Community Access" desc="Holding the NFT grants access to exclusive private clubs, events, and future airdrops." stat="VIP" />
          <ValueBlock index={4} title="Digital Identity" desc="Your wallet is your new showcase. NFTs represent your status and taste in the decentralized web." stat="Web3" />
        </motion.div>
      </div>

      {/* ── 2. USE CASES GRID ─────────────────────────────── */}
      <div className="section-inner" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <AnimatedText text="EXPANDING HORIZONS" el="h3" style={{ fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }} />
          <AnimatedText text="Real-World Applications" el="h2" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--cream)', fontFamily: 'var(--font-heading)' }} />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}
        >
          <UseCaseItem icon="🎨" title="Digital Art" />
          <UseCaseItem icon="🎮" title="Gaming" />
          <UseCaseItem icon="🎵" title="Music" />
          <UseCaseItem icon="🏙️" title="Virtual Real Estate" />
          <UseCaseItem icon="👗" title="Luxury Fashion" />
          <UseCaseItem icon="⌚" title="Watches & Authentication" />
        </motion.div>
      </div>

    </section>
  );
}
