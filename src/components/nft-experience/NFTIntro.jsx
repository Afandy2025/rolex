import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView, useSpring, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedText from '../AnimatedText';
import pastedImage from '../../../assets/Pasted image.png';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: LUXURY_EASE } },
};

function HoverTiltCard({ title, icon }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * -12);
    rotateY.set(((x - centerX) / centerX) * 12);
  }, [rotateX, rotateY]);

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      variants={fadeUpVariants}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        position: 'relative',
        background: 'rgba(0, 45, 26, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(163, 126, 44, 0.15)',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem 2rem',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered 
          ? '0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(163, 126, 44, 0.4)'
          : '0 10px 30px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.5s ease',
      }}
    >
      {/* Background glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(163, 126, 44, 0.15), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Icon with 3D pop */}
      <motion.div 
        animate={{ z: hovered ? 40 : 0, scale: hovered ? 1.1 : 1 }}
        style={{ fontSize: '3rem', color: 'var(--gold)', marginBottom: '1.5rem', display: 'inline-block' }}
      >
        {icon}
      </motion.div>
      
      <motion.h3 
        animate={{ z: hovered ? 20 : 0 }}
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream)', fontSize: '1.4rem', margin: 0, fontWeight: 300, letterSpacing: '0.05em' }}
      >
        {title}
      </motion.h3>
    </motion.div>
  );
}

export default function NFTIntro() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  return (
    <section ref={sectionRef} style={{ position: 'relative', padding: '10rem 0', background: 'var(--darker-green)', overflow: 'hidden' }}>
      
      {/* Floating Background Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            background: 'var(--gold)',
            borderRadius: '50%',
            boxShadow: '0 0 10px var(--gold)',
            animation: `floatUp ${5 + Math.random() * 5}s linear infinite`,
            opacity: Math.random() * 0.5,
          }} />
        ))}
      </div>

      <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
        
        {/* Title Block - Left Aligned to use side space */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8rem', padding: '0 5vw', flexWrap: 'wrap', gap: '4rem' }}>
          <div style={{ maxWidth: '600px', textAlign: 'start' }}>
            {isInView && (
              <AnimatedText 
                text={t('nft_intro.title')} 
                el="h2" 
                className="gold-gradient-text"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}
              />
            )}
            {isInView && (
              <AnimatedText 
                text={t('nft_intro.subtitle')} 
                el="p" 
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: 'rgba(245,240,232,0.7)', lineHeight: 1.8 }}
              />
            )}
          </div>
          
          {/* Decorative Right Side Graphic (Static for Performance) */}
          <div style={{ width: '30%', borderInlineStart: '1px solid rgba(163,126,44,0.2)', paddingInlineStart: '3rem', position: 'relative' }}>
             <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 0.3 }}
               transition={{ duration: 4, ease: 'easeInOut' }}
               style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 6vw, 8rem)', color: 'var(--gold)', lineHeight: 0.8, letterSpacing: '-0.05em' }}
             >
               ON-<br/>CHAIN
             </motion.div>
          </div>
        </div>

        {/* Intro Holographic Experience */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10rem' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.5, ease: LUXURY_EASE, delay: 0.3 }}
            style={{ position: 'relative', width: '300px', height: '400px', marginBottom: '4rem' }}
          >
            {/* Holographic glowing lines & symbols */}
            <div style={{ position: 'absolute', inset: -50, background: 'radial-gradient(circle, rgba(163,126,44,0.15) 0%, transparent 60%)', filter: 'blur(20px)' }} />
            <div style={{ position: 'absolute', left: '-50px', top: '20px', fontFamily: 'var(--font-heading)', color: 'var(--gold)', opacity: 0.2, fontSize: '4rem' }}>X</div>
            <div style={{ position: 'absolute', right: '-40px', bottom: '40px', fontFamily: 'var(--font-heading)', color: 'var(--gold)', opacity: 0.2, fontSize: '4rem' }}>IV</div>
            
            {/* Card Body */}
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(163,126,44,0.4)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 20px rgba(163,126,44,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Static overlay instead of expensive animated scanline */}
              <div 
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(163,126,44,0.1) 1px, transparent 1px)', backgroundSize: '100% 4px', opacity: 0.5, pointerEvents: 'none' }}
              />
              <img src={pastedImage} alt="NFT Showcase" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2rem' }} />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: LUXURY_EASE, delay: 0.6 }}
            style={{ fontSize: '1.25rem', color: 'var(--cream)', maxWidth: '700px', textAlign: 'center', lineHeight: 1.8, fontWeight: 300, fontStyle: 'italic' }}
          >
            {t('nft_intro.p1')}
          </motion.p>
        </div>

        {/* 6 Explanation Cards Horizontal Layout */}
        <RowCards />

      </div>
    </section>
  );
}

const SvgKey = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5"></circle>
    <path d="m21 2-9.6 9.6"></path>
    <path d="m15.5 7.5 3 3L22 7l-3-3"></path>
  </svg>
);

const SvgShield = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 7-3.81 7-3.81a1 1 0 0 1 .9 0S17 4 19 5a1 1 0 0 1 1 1z"></path>
  </svg>
);

const SvgContract = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const SvgDiamond = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12l4 6-10 12L2 9Z"></path>
    <path d="M11 3 8 9l4 12"></path>
    <path d="M12 15V3"></path>
    <path d="m20 9-4-6"></path>
    <path d="M2 9h20"></path>
  </svg>
);

const SvgCrown = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
  </svg>
);

const SvgUtility = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

// Single horizontal row layout
function RowCards() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const { t } = useTranslation();
  const cards = t('nft_intro.cards', { returnObjects: true }) || [];

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <motion.div 
        ref={containerRef}
        variants={staggerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="hide-scrollbar"
        style={{ 
          display: 'flex', 
          gap: '2rem', 
          padding: '2rem 5vw', 
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory',
        }}
      >
        <div style={{ flex: '0 0 auto', width: 'clamp(300px, 25vw, 400px)', scrollSnapAlign: 'start' }}>
          <HoverTiltCard title={cards[0]} icon={<SvgKey />} />
        </div>
        <div style={{ flex: '0 0 auto', width: 'clamp(300px, 25vw, 400px)', scrollSnapAlign: 'start' }}>
          <HoverTiltCard title={cards[1]} icon={<SvgShield />} />
        </div>
        <div style={{ flex: '0 0 auto', width: 'clamp(300px, 25vw, 400px)', scrollSnapAlign: 'start' }}>
          <HoverTiltCard title={cards[2]} icon={<SvgContract />} />
        </div>
        <div style={{ flex: '0 0 auto', width: 'clamp(300px, 25vw, 400px)', scrollSnapAlign: 'start' }}>
          <HoverTiltCard title={cards[3]} icon={<SvgDiamond />} />
        </div>
        <div style={{ flex: '0 0 auto', width: 'clamp(300px, 25vw, 400px)', scrollSnapAlign: 'start' }}>
          <HoverTiltCard title={cards[4]} icon={<SvgCrown />} />
        </div>
        <div style={{ flex: '0 0 auto', width: 'clamp(300px, 25vw, 400px)', scrollSnapAlign: 'start' }}>
          <HoverTiltCard title={cards[5]} icon={<SvgUtility />} />
        </div>
      </motion.div>
    </div>
  );
}
