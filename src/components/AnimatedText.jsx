import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedText({ 
  text, 
  el: Wrapper = 'p', 
  className = '', 
  style = {},
  once = true,
  staggerDelay = 0.05
}) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 70,
      },
    },
  };

  return (
    <Wrapper className={className} style={style}>
      <motion.span
        style={{ display: 'inline-block', overflow: 'hidden' }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-50px' }}
      >
        {words.map((word, index) => (
          <span key={index} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.1em', paddingTop: '0.1em' }}>
            <motion.span
              style={{ display: 'inline-block', marginRight: '0.3em', transformOrigin: 'bottom' }}
              variants={child}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
}
