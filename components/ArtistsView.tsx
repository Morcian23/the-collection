'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const artists = [
  {
    name: 'Artist Name',
    location: 'Atlanta, GA',
    bio: 'A short description of this artist and their practice. Their work explores themes of memory, place, and identity through a Southern lens.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    handle: 'artist-name',
  },
]

export default function ArtistsView() {
  return (
    <>
      <section className="pt-48 pb-20 px-10 md:px-20 border-b border-sage/30">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="font-panamera text-xs tracking-[0.5em] uppercase text-gray-soft mb-6">
          The Artists
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}
          className="font-shadower text-5xl md:text-7xl text-dark">
          Artists
        </motion.h1>
      </section>

      <section className="py-32 px-10 md:px-20">
        {artists.map((artist, i) => (
          <motion.div key={artist.handle}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1.4, delay: i * 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-40 last:mb-0">
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img src={artist.image} alt={artist.name} className="w-full h-full object-cover"
                whileHover={{ scale: 1.03 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }} />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-panamera text-xs tracking-[0.4em] uppercase text-gray-soft mb-4">{artist.location}</p>
              <h2 className="font-rasa text-4xl text-dark mb-8">{artist.name}</h2>
              <p className="font-panamera text-xs text-gray-soft leading-relaxed mb-12 max-w-sm">{artist.bio}</p>
              <Link href="/shop"
                className="font-panamera text-xs tracking-[0.4em] uppercase text-gray-soft border-b border-gray-soft/50 pb-1 hover:text-dark hover:border-dark transition-colors duration-500 w-fit">
                View Prints
              </Link>
            </div>
          </motion.div>
        ))}
      </section>
    </>
  )
}
