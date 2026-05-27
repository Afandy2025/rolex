import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxBackground() {
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], ['0vh', '150vh']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0vh', '-100vh']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0vh', '200vh']);
  const y4 = useTransform(scrollYProgress, [0, 1], ['0vh', '-150vh']);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
      
      <motion.div style={{ position: 'absolute', top: '10%', left: '-5%', y: y1 }}>
        <span style={{ fontSize: '40vw', fontFamily: 'var(--font-heading)', color: 'var(--gold)', opacity: 0.02, fontWeight: 700 }}>X</span>
      </motion.div>

      <motion.div style={{ position: 'absolute', top: '50%', right: '-10%', y: y2 }}>
        <span style={{ fontSize: '30vw', fontFamily: 'var(--font-heading)', color: 'var(--gold)', opacity: 0.02, fontWeight: 700 }}>IV</span>
      </motion.div>

      <motion.div style={{ position: 'absolute', top: '80%', left: '5%', y: y3 }}>
        <span style={{ fontSize: '20vw', fontFamily: 'var(--font-heading)', color: 'var(--gold)', opacity: 0.03, fontWeight: 700 }}>M</span>
      </motion.div>

      <motion.div style={{ position: 'absolute', top: '20%', right: '10%', y: y4 }}>
        <span style={{ fontSize: '15vw', fontFamily: 'var(--font-heading)', color: 'var(--gold)', opacity: 0.03, fontWeight: 700 }}>L</span>
      </motion.div>

      {/* Atmospheric lighting blobs */}
      <div style={{
        position: 'absolute', top: '20%', left: '20%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(163,126,44,0.05) 0%, transparent 60%)',
        filter: 'blur(100px)', animation: 'float 20s infinite alternate ease-in-out'
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '20%', width: '800px', height: '800px',
        background: 'radial-gradient(circle, rgba(0,96,57,0.1) 0%, transparent 60%)',
        filter: 'blur(120px)', animation: 'float 25s infinite alternate-reverse ease-in-out'
      }} />
    </div>
  );
}
