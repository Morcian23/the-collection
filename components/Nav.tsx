'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Artists', href: '/artists' },
  { label: 'Journal', href: '/journal' },
  { label: 'Shop', href: '/shop' },
]

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 bg-cream/90 backdrop-blur-sm border-b border-sage/20"
    >
      {/* Wordmark */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo-wordmark.png"
          alt="The Collection Initiative"
          width={220}
          height={60}
          className="h-14 w-auto object-contain"
          priority
        />
      </Link>

      <div className="flex items-center gap-8">
        {links.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="font-panamera text-xs tracking-[0.25em] uppercase text-gray-soft hover:text-dark transition-colors duration-500"
          >
            {item.label}
          </Link>
        ))}

        {/* Survey CTA — visually distinct */}
        <Link
          href="/survey"
          className="font-panamera text-xs tracking-[0.25em] uppercase border border-dark text-dark px-5 py-2 hover:bg-dark hover:text-cream transition-colors duration-300"
        >
          Take the Survey
        </Link>
      </div>
    </motion.nav>
  )
}
