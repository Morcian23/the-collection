'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
}

function ParallaxImage({ src, alt, speed = 0.15, className = '' }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 80}px`, `${speed * 80}px`])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.5 }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        style={{ y }}
        className="w-full h-full"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
        <motion.div
          className="absolute inset-0 bg-dark"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.08 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  )
}

// Placeholder images — replace with your actual artwork
const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1200&q=80',
    alt: 'Featured artwork',
    speed: 0.12,
  },
  {
    src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80',
    alt: 'Artwork',
    speed: 0.2,
  },
  {
    src: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=800&q=80',
    alt: 'Artwork',
    speed: 0.18,
  },
  {
    src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=80',
    alt: 'Artwork full width',
    speed: 0.1,
  },
]

export default function ParallaxGallery() {
  return (
    <section className="py-40 px-10 md:px-20">
      {/* Large single */}
      <div className="mb-24 max-w-5xl mx-auto">
        <ParallaxImage
          src={gallery[0].src}
          alt={gallery[0].alt}
          speed={gallery[0].speed}
          className="h-[65vh] w-full"
        />
      </div>

      {/* Two side-by-side */}
      <div className="grid grid-cols-2 gap-6 mb-24 max-w-4xl mx-auto">
        {gallery.slice(1, 3).map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, delay: i * 0.15 }}
          >
            <ParallaxImage
              src={item.src}
              alt={item.alt}
              speed={item.speed}
              className="h-[45vh]"
            />
          </motion.div>
        ))}
      </div>

      {/* Full width */}
      <ParallaxImage
        src={gallery[3].src}
        alt={gallery[3].alt}
        speed={gallery[3].speed}
        className="h-[75vh] w-full"
      />
    </section>
  )
}
