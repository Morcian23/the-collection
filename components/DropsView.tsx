'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { ShopifyProduct } from '@/lib/shopify'

export default function DropsView({ products }: { products: ShopifyProduct[] }) {
  return (
    <>
      <section className="pt-48 pb-20 px-10 md:px-20 border-b border-sage/30">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="font-panamera text-xs tracking-[0.5em] uppercase text-gray-soft mb-6">
          Releases
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}
          className="font-shadower text-5xl md:text-7xl text-dark">
          Drops
        </motion.h1>
      </section>

      <section className="py-32 px-10 md:px-20">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.2 }} className="mb-20">
          <p className="font-panamera text-xs tracking-[0.5em] uppercase text-gray-soft mb-2">Volume 01</p>
          <h2 className="font-rasa text-3xl md:text-5xl text-dark mb-6">Current Release</h2>
          <p className="font-panamera text-xs text-gray-soft max-w-md leading-relaxed">
            A carefully selected body of work from emerging BIPOC artists rooted in the American South.
            Each print is limited in edition and speaks to a personal, lived experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {(products.length === 0 ? Array(6).fill(null) : products).map((product, i) => {
            if (!product) {
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.08 }}>
                  <div className="aspect-[3/4] bg-sage/20 mb-4" />
                  <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-1">Artist Name</p>
                  <p className="font-rasa text-base text-dark">Untitled No. {i + 1}</p>
                </motion.div>
              )
            }
            const image = product.images.edges[0]?.node
            const artistName = product.metafields?.find((m: any) => m?.key === 'artist_name')?.value
            return (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.08 }}>
                <Link href={`/products/${product.handle}`}>
                  <div className="relative overflow-hidden aspect-[3/4] mb-4">
                    {image && (
                      <motion.img src={image.url} alt={image.altText || product.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.03 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }} />
                    )}
                  </div>
                  {artistName && <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-1">{artistName}</p>}
                  <p className="font-rasa text-base text-dark">{product.title}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>
    </>
  )
}
