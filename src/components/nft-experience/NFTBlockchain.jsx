import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedText from '../AnimatedText';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

const NetworkNode = ({ x, y, delay, label }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: LUXURY_EASE }}
    style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
  >
    <motion.div
      style={{ width: '20px', height: '20px', background: 'var(--gold)', borderRadius: '50%', border: '4px solid var(--dark-green)' }}
    />
    <span style={{ marginTop: '0.5rem', color: 'var(--gold)', fontSize: '0.75rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
  </motion.div>
);

const ComparisonRow = ({ title, crypto, nft, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: LUXURY_EASE }}
    style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem',
      padding: '1.5rem', borderBottom: '1px solid rgba(163,126,44,0.1)',
      alignItems: 'center'
    }}
  >
    <div style={{ color: 'var(--gold)', fontWeight: 600, fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>{title}</div>
    <div style={{ color: 'rgba(245,240,232,0.6)' }}>{crypto}</div>
    <div style={{ color: 'var(--cream)', fontWeight: 500 }}>{nft}</div>
  </motion.div>
);

export default function NFTBlockchain() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} style={{ background: 'var(--darker-green)', padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* ── 1. BLOCKCHAIN VISUALIZATION ───────────────────── */}
      <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', marginBottom: '10rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <AnimatedText text="SECURED BY THE NETWORK" el="h3" style={{ fontSize: '1rem', color: 'var(--gold)', letterSpacing: '0.2em', marginBottom: '1rem' }} />
          <AnimatedText text="Immutable. Decentralized. Eternal." el="h2" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--cream)', fontFamily: 'var(--font-heading)' }} />
        </div>

        <div style={{ position: 'relative', height: '400px', background: 'rgba(0, 45, 26, 0.3)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(163,126,44,0.2)', overflow: 'hidden' }}>
          {/* Cyber luxury mesh background */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(163,126,44,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(163,126,44,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* SVG Connection Lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <motion.path 
              d="M 200 200 L 400 100 L 600 250 L 800 150 L 1000 200" 
              fill="none" stroke="rgba(163,126,44,0.4)" strokeWidth="2" strokeDasharray="5,5"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, ease: LUXURY_EASE }}
            />
          </svg>

          {/* Nodes */}
          <NetworkNode x={20} y={50} delay={0.2} label="Ethereum" />
          <NetworkNode x={40} y={25} delay={0.4} label="Smart Contract" />
          <NetworkNode x={60} y={60} delay={0.6} label="Polygon" />
          <NetworkNode x={80} y={35} delay={0.8} label="Solana" />
        </div>
      </div>

      {/* ── 2. WHY NFT MATTERS (Split Layout) ─────────────── */}
      <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', marginBottom: '10rem', display: 'flex', gap: '4rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Left: Luxury Visual */}
        <div style={{ flex: '1 1 400px', position: 'relative' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: LUXURY_EASE }}
            style={{ width: '100%', paddingTop: '120%', background: 'linear-gradient(135deg, rgba(163,126,44,0.2) 0%, rgba(0,0,0,0) 100%)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(163,126,44,0.3)', position: 'relative', overflow: 'hidden' }}
          >
            {/* Mock hologram or abstract luxury shape (Static for performance) */}
            <motion.div 
              style={{ position: 'absolute', top: '20%', left: '20%', right: '20%', bottom: '20%', border: '2px dashed rgba(163,126,44,0.5)', borderRadius: '50%' }}
            />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold)', fontSize: '5rem', opacity: 0.8 }}>XII</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Storytelling */}
        <div style={{ flex: '1 1 400px' }}>
          <AnimatedText text="THE PARADIGM SHIFT" el="h3" style={{ fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }} />
          <AnimatedText text="Redefining Rarity" el="h2" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--cream)', fontFamily: 'var(--font-heading)', marginBottom: '2rem' }} />
          
          <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255,0,0,0.05)', borderLeft: '4px solid rgba(255,0,0,0.3)', borderRadius: '0 8px 8px 0' }}>
            <h4 style={{ color: 'rgba(255,255,255,0.8)', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>Before NFTs</h4>
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>Digital assets could be copied infinitely. True ownership of a digital item was impossible to verify, rendering them virtually worthless.</p>
          </div>

          <div style={{ padding: '1.5rem', background: 'rgba(163,126,44,0.1)', borderLeft: '4px solid var(--gold)', borderRadius: '0 8px 8px 0' }}>
            <h4 style={{ color: 'var(--gold)', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>After NFTs</h4>
            <ul style={{ color: 'var(--cream)', margin: 0, paddingLeft: '1.2rem', lineHeight: 1.8 }}>
              <li>Verified digital ownership</li>
              <li>Provable digital scarcity</li>
              <li>Unalterable luxury authentication</li>
              <li>Secure provenance & history</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── 3. NFT VS CRYPTO COMPARISON ───────────────────── */}
      <div className="section-inner" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <AnimatedText text="CRYPTOCURRENCY VS NFT" el="h2" style={{ fontSize: '2.5rem', color: 'var(--cream)', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }} />
          <AnimatedText text="Understanding the fundamental difference." el="p" style={{ color: 'var(--gold)', letterSpacing: '0.05em' }} />
        </div>

        <div style={{ background: 'rgba(0, 30, 15, 0.6)', border: '1px solid rgba(163,126,44,0.3)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1.5rem', background: 'rgba(163,126,44,0.1)', borderBottom: '2px solid rgba(163,126,44,0.4)', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', color: 'var(--gold-light)' }}>
            <div>FEATURE</div>
            <div>CRYPTOCURRENCY</div>
            <div>NFT (NON-FUNGIBLE)</div>
          </div>
          
          <ComparisonRow title="Nature" crypto="Fungible (Identical)" nft="Unique (One-of-one)" delay={0.2} />
          <ComparisonRow title="Classification" crypto="Currency / Medium of Exchange" nft="Digital Asset / Collectible" delay={0.3} />
          <ComparisonRow title="Examples" crypto="Bitcoin (BTC), Ethereum (ETH)" nft="Luxury Watches, Digital Art" delay={0.4} />
          <ComparisonRow title="Value Basis" crypto="Equal units (1 BTC = 1 BTC)" nft="Subjective & Historical Value" delay={0.5} />
        </div>
      </div>

    </section>
  );
}
