// components/common/FadeIn.tsx
'use client'

import { motion } from 'framer-motion'

export default function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}
