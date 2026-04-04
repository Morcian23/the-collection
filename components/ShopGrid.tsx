'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { ShopifyProduct } from '@/lib/shopify'

export default function ShopGrid({ products }: { products: ShopifyProduct[] }) {
  const [filter, setFilter] = useState<string>('all')

  const artists = Array.from(
    new Set(
      products
        .map((p) => p.metafields?.find((m) => m?.key === 'artist_name')?.value)
        .filter(Boolean) as string[]
    )
  )

  const filtered =
    filter === 'all'
      ? products
      : products.filter(
          (p) => p.metafields?.find((m) => m?.key === 'artist_name')?.value === filter
        )

  return (
    <>
      <section className="pt-48 pb-20 px-10 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="font-shadower text-5xl md:text-7xl text-dark mb-16"
        >
          Shop
        </motion.h1>

        {artists.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap gap-8"
          >
            {['all', ...artists].map((a) => (
              <button
                key={a}
                onClick={() => setFilter(a)}
                className={`font-panamera text-xs tracking-[0.3em] uppercase transition-colors duration-500 cursor-pointer ${
                  filter === a ? 'text-dark' : 'text-gray-soft hover:text-dark'
                }`}
              >
                {a === 'all' ? 'All' : a}
              </button>
            ))}
          </motion.div>
        )}
      </section>

      <section className="px-10 md:px-20 pb-40">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
          {(filtered.length === 0 ? Array(8).fill(null) : filtered).map((product, i) => {
            if (!product) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                >
                  <div className="aspect-[3/4] bg-sage/20 mb-5" />
                  <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-1">Artist Name</p>
                  <p className="font-rasa text-base text-dark mb-1">Untitled No. {i + 1}</p>
                  <p className="font-panamera text-xs text-gray-soft">$120</p>
                </motion.div>
              )
            }

            const image = product.images.edges[0]?.node
            const hoverImage = product.images.edges[1]?.node
            const artistName = product.metafields?.find((m: any) => m?.key === 'artist_name')?.value
            const price = parseFloat(product.priceRange.minVariantPrice.amount)

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.05 }}
              >
                <Link href={`/products/${product.handle}`}>
                  <div className="relative overflow-hidden aspect-[3/4] mb-5 group">
                    {image && (
                      <>
                        <img
                          src={image.url}
                          alt={image.altText || product.title}
                          className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0 absolute inset-0"
                        />
                        <img
                          src={hoverImage?.url || image.url}
                          alt=""
                          className="w-full h-full object-cover scale-[1.04] transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                        />
                      </>
                    )}
                  </div>
                  {artistName && (
                    <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-1">{artistName}</p>
                  )}
                  <p className="font-rasa text-base text-dark mb-1">{product.title}</p>
                  <p className="font-panamera text-xs text-gray-soft">${price.toFixed(0)}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>
    </>
  )
}
