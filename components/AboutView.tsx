'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutView() {
  return (
    <>
      <section className="pt-48 pb-32 px-10 md:px-20">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6 }}
          className="font-shadower text-5xl md:text-7xl lg:text-8xl text-dark max-w-4xl leading-tight">
          Art that begins with a story.
        </motion.h1>
      </section>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.5 }} className="h-[60vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1600&q=80"
          alt="The Collection" className="w-full h-full object-cover" />
      </motion.div>

      <section className="py-40 px-10 md:px-20">
        <div className="max-w-2xl mx-auto">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="font-panamera text-xs tracking-[0.5em] uppercase text-gray-soft mb-10">
            Our Mission
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.2 }}
            className="font-rasa text-2xl md:text-3xl text-dark leading-relaxed mb-12">
            The Collection exists to make fine art accessible — and to place emerging
            BIPOC artists from the American South at the center of that conversation.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.4 }}
            className="font-panamera text-xs text-gray-soft leading-relaxed">
            Each print is limited in edition, licensed directly from the artist, and produced
            on archival materials. When you collect with us, you're not just buying art —
            you're participating in a living archive of Southern creative culture.
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-10 border-t border-sage/30 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.2 }}>
          <Link href="/shop"
            className="font-panamera text-xs tracking-[0.5em] uppercase text-dark border-b border-gray-soft pb-1 hover:border-dark transition-colors duration-700">
            Start Your Collection
          </Link>
        </motion.div>
      </section>
    </>
  )
}
