'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { createCart } from '@/lib/shopify'
import type { ShopifyProduct } from '@/lib/shopify'

export default function ProductView({ product }: { product: ShopifyProduct }) {
  const images = product.images.edges.map((e) => e.node)
  const variants = product.variants.edges.map((e) => e.node)
  const artistName = product.metafields?.find((m) => m?.key === 'artist_name')?.value
  const editionSize = product.metafields?.find((m) => m?.key === 'edition_size')?.value
  const artistBio = product.metafields?.find((m) => m?.key === 'artist_bio')?.value

  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const [loading, setLoading] = useState(false)

  const price = parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount)

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    setLoading(true)
    try {
      const checkoutUrl = await createCart(selectedVariant.id)
      window.location.href = checkoutUrl
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen pt-24 px-10 md:px-20 pb-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
        {/* Left: Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4 }}
        >
          <div className="aspect-[4/5] overflow-hidden mb-4">
            <motion.img
              key={activeImage}
              src={images[activeImage]?.url}
              alt={images[activeImage]?.altText || product.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 overflow-hidden border transition-colors duration-300 cursor-pointer ${
                    activeImage === i ? 'border-dark' : 'border-transparent opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="flex flex-col justify-center lg:pt-20"
        >
          {artistName && (
            <p className="font-panamera text-xs tracking-[0.4em] uppercase text-gray-soft mb-4">
              {artistName}
            </p>
          )}
          <h1 className="font-shadower text-4xl md:text-5xl text-dark mb-6 leading-tight">
            {product.title}
          </h1>
          <p className="font-rasa text-2xl text-dark mb-2">${price.toFixed(0)}</p>
          {editionSize && (
            <p className="font-panamera text-xs tracking-[0.2em] uppercase text-gray-soft mb-10">
              Edition of {editionSize}
            </p>
          )}

          {variants.length > 1 && (
            <div className="mb-10">
              <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-4">Size</p>
              <div className="flex flex-wrap gap-3">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={!v.availableForSale}
                    className={`font-panamera text-xs px-4 py-2 border transition-colors duration-300 cursor-pointer ${
                      selectedVariant?.id === v.id
                        ? 'border-dark text-dark'
                        : 'border-sage text-gray-soft hover:border-dark hover:text-dark'
                    } ${!v.availableForSale ? 'opacity-30 cursor-not-allowed' : ''}`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={loading || !selectedVariant?.availableForSale}
            className="font-panamera text-xs tracking-[0.5em] uppercase text-cream bg-dark py-4 px-8 hover:bg-gray-soft transition-colors duration-500 cursor-pointer disabled:opacity-50 mb-10 w-fit"
          >
            {loading ? 'Loading...' : selectedVariant?.availableForSale ? 'Add to Cart' : 'Sold Out'}
          </button>

          <div className="border-t border-sage/30 pt-8">
            <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-3">Materials</p>
            <p className="font-panamera text-xs text-gray-soft leading-relaxed">
              Archival pigment print on fine art paper
            </p>
          </div>

          {artistBio && (
            <div className="border-t border-sage/30 pt-8 mt-8">
              <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-3">About the Artist</p>
              <p className="font-panamera text-xs text-gray-soft leading-relaxed">{artistBio}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
