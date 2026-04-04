'use client'
import { motion } from 'framer-motion'

const posts = [
  {
    title: 'On Collecting: Why the First Print Matters',
    category: 'Collecting',
    date: 'April 2025',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80',
    excerpt: 'There is something irreversible about the first print you hang on a wall. It commits you to a point of view.',
    slug: 'on-collecting',
  },
  {
    title: 'Studio Visit: Inside the Work of an Emerging Artist',
    category: 'Artist Feature',
    date: 'March 2025',
    image: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800&q=80',
    excerpt: 'We spent an afternoon in Atlanta with one of our featured artists, talking about process, place, and the South.',
    slug: 'studio-visit',
  },
  {
    title: 'What Makes a Limited Edition?',
    category: 'Education',
    date: 'February 2025',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    excerpt: 'Edition sizes, certificates of authenticity, and why scarcity matters in the art market.',
    slug: 'what-makes-limited-edition',
  },
]

export default function JournalView() {
  return (
    <>
      <section className="pt-48 pb-20 px-10 md:px-20 border-b border-sage/30">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="font-panamera text-xs tracking-[0.5em] uppercase text-gray-soft mb-6">
          Essays & Features
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}
          className="font-shadower text-5xl md:text-7xl text-dark">
          Journal
        </motion.h1>
      </section>

      <section className="py-32 px-10 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
          {posts.map((post, i) => (
            <motion.article key={post.slug}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1.2, delay: i * 0.1 }}>
              <div className="aspect-[4/3] overflow-hidden mb-7">
                <motion.img src={post.image} alt={post.title} className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }} />
              </div>
              <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-3">
                {post.category} — {post.date}
              </p>
              <h2 className="font-rasa text-xl text-dark mb-4 leading-snug">{post.title}</h2>
              <p className="font-panamera text-xs text-gray-soft leading-relaxed">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}
