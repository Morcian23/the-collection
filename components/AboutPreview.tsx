'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutPreview() {
  return (
    <section className="py-40 px-10 border-t border-sage/30">
      <div className="max-w-xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="font-rasa text-2xl md:text-3xl text-dark leading-relaxed mb-12"
        >
          A curated platform for limited edition fine art prints.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Link
            href="/about"
            className="font-panamera text-xs tracking-[0.5em] uppercase text-gray-soft border-b border-gray-soft/50 pb-1 hover:text-dark hover:border-dark transition-colors duration-700"
          >
            About
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
