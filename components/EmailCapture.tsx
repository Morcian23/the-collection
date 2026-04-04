'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
      setEmail('')
    } catch {
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="py-40 px-10 border-t border-sage/30">
      <div className="max-w-sm mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-panamera text-xs tracking-[0.4em] uppercase text-gray-soft mb-12"
        >
          Be the first to access new releases.
        </motion.p>

        {submitted ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-rasa text-dark italic"
          >
            Thank you.
          </motion.p>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex gap-0 border-b border-sage/50"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-transparent font-panamera text-xs text-dark placeholder-gray-soft py-3 outline-none"
            />
            <button
              type="submit"
              className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft py-3 pl-6 hover:text-dark transition-colors duration-500 cursor-pointer"
            >
              Join
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}
