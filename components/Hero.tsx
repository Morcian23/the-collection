'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-cream">
      <div className="relative z-10 text-center px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-panamera text-xs tracking-[0.5em] uppercase text-gray-soft mb-8"
        >
          New Arrivals
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
          className="font-shadower text-6xl md:text-8xl lg:text-9xl text-dark mb-10 leading-none"
        >
          Start Your
          <br />
          Collection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-16"
        >
          Curated fine art prints by emerging artists.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <Link
            href="/shop"
            className="font-panamera text-xs tracking-[0.5em] uppercase text-dark border-b border-gray-soft pb-1 hover:border-dark transition-colors duration-700"
          >
            View Collection
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
