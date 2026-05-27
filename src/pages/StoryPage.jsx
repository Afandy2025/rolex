import React from 'react';
import { motion } from 'framer-motion';
import Story from '../components/Story';
import HowItWorks from '../components/HowItWorks';
import Marquee from '../components/Marquee';

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

export default function StoryPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ paddingTop: '80px' }}
    >
      <Story />
      <Marquee />
      <HowItWorks />
    </motion.div>
  );
}
