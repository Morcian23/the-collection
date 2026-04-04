'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const lines = ['Something Beautiful', 'Is Coming']

export default function ComingSoon() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream flex flex-col relative overflow-hidden">

      {/* C symbol — top-left, fades in first */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }}
        className="absolute top-8 left-10"
      >
        <Image
          src="/logo-symbol.png"
          alt=""
          width={72}
          height={72}
          className="w-14 h-14 object-contain"
          priority
        />
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center pt-20">

        {/* Wordmark — settles into place from slight scale */}
        <motion.div
          initial={{ opacity: 0, scale: 1.06, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mb-16"
        >
          <Image
            src="/logo-wordmark.png"
            alt="The Collection"
            width={900}
            height={280}
            className="w-[min(580px,75vw)] h-auto object-contain"
            priority
          />
        </motion.div>

        {/* Divider line draws across */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
          style={{ originX: 0 }}
          className="w-[min(580px,75vw)] h-px bg-sage/50 mb-16"
        />

        {/* Headline — each line rises through a mask */}
        <div className="mb-8">
          {lines.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.2 + i * 0.18,
                }}
                className="font-shadower text-4xl md:text-6xl lg:text-7xl text-dark leading-[1.05]"
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Tagline — fades up after headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 1.8 }}
          className="font-panamera text-sm tracking-[0.35em] uppercase text-dark font-semibold mb-20 max-w-xs"
        >
          Curated fine art prints by emerging BIPOC artists from the American South.
        </motion.p>

        {/* Email form — last to arrive */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 2.2 }}
          className="w-full max-w-sm"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <p className="font-rasa text-xl text-dark mb-2">You're on the list.</p>
              <p className="font-panamera text-xs text-gray-soft tracking-widest uppercase">
                We'll be in touch.
              </p>
            </motion.div>
          ) : (
            <>
              <p className="font-panamera text-sm tracking-[0.35em] uppercase text-dark font-semibold mb-8">
                Be first to access the collection.
              </p>
              <form onSubmit={handleSubmit} className="flex border-b border-sage/60">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent font-panamera text-sm text-dark placeholder-gray-soft py-3 outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="font-panamera text-sm tracking-[0.3em] uppercase text-dark font-semibold py-3 pl-6 hover:text-dark transition-colors duration-500 cursor-pointer disabled:opacity-40"
                >
                  {loading ? '...' : 'Notify Me'}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.8 }}
        className="py-10 text-center"
      >
        <p className="font-panamera text-sm text-dark font-semibold">
          © {new Date().getFullYear()} The Collection
        </p>
      </motion.footer>
    </main>
  )
}
