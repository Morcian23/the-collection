'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const links = ['Shop', 'Drops', 'Artists', 'Journal', 'About']

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 bg-cream/90 backdrop-blur-sm"
    >
      {/* Wordmark */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo-wordmark.png"
          alt="The Collection"
          width={320}
          height={100}
          className="h-20 w-auto object-contain"
          priority
        />
      </Link>

      <div className="flex gap-10">
        {links.map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="font-panamera text-xs tracking-[0.25em] uppercase text-gray-soft hover:text-dark transition-colors duration-500"
          >
            {item}
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
