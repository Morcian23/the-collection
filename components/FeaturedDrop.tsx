'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { ShopifyProduct } from '@/lib/shopify'

interface FeaturedDropProps {
  products: ShopifyProduct[]
}

export default function FeaturedDrop({ products }: FeaturedDropProps) {
  const displayed = products.slice(0, 5)

  return (
    <section className="py-40 px-10 md:px-20 border-t border-sage/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="mb-24"
      >
        <p className="font-panamera text-xs tracking-[0.5em] uppercase text-gray-soft mb-4">
          Current Release
        </p>
        <div className="w-10 h-px bg-sage" />
      </motion.div>

      {displayed.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 max-w-6xl mx-auto">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
            >
              <div className="aspect-[3/4] bg-sage/20 mb-6" />
              <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-1">
                Artist Name
              </p>
              <p className="font-rasa text-lg text-dark mb-2">Untitled No. {i + 1}</p>
              <p className="font-panamera text-xs text-gray-soft">$120 — Edition of 50</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 max-w-6xl mx-auto">
          {displayed.map((product, i) => {
            const image = product.images.edges[0]?.node
            const artistName = product.metafields?.find((m) => m?.key === 'artist_name')?.value
            const editionSize = product.metafields?.find((m) => m?.key === 'edition_size')?.value
            const price = parseFloat(product.priceRange.minVariantPrice.amount)

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1, delay: i * 0.1 }}
              >
                <Link href={`/products/${product.handle}`}>
                  <div className="relative overflow-hidden aspect-[3/4] mb-6">
                    {image && (
                      <motion.img
                        src={image.url}
                        alt={image.altText || product.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    )}
                  </div>
                  <div>
                    {artistName && (
                      <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-1">
                        {artistName}
                      </p>
                    )}
                    <p className="font-rasa text-lg text-dark mb-2">{product.title}</p>
                    <p className="font-panamera text-xs text-gray-soft">
                      ${price.toFixed(0)}{editionSize && ` — Edition of ${editionSize}`}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-center mt-28"
      >
        <Link
          href="/shop"
          className="font-panamera text-xs tracking-[0.5em] uppercase text-dark border-b border-gray-soft pb-1 hover:border-dark transition-colors duration-700"
        >
          View Drop
        </Link>
      </motion.div>
    </section>
  )
}
