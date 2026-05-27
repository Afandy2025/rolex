import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Stats from '../components/Stats';
import Story from '../components/Story';
import NFTMasterclass from '../components/NFTMasterclass';
import Showcase from '../components/Showcase';
import Collection from '../components/Collection';

/* ── Page Transition Variants ──────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }
};

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />
      <Marquee />
      <Stats />
      
      {/* ── New Epic Narrative & Education Sections ── */}
      <Story />
      <NFTMasterclass />
      
      {/* ── Watch Specific Sections ── */}
      <Showcase />
      <Collection />
    </motion.div>
  );
}
