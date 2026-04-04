import Link from 'next/link'
import Image from 'next/image'

const links = ['Shop', 'Artists', 'About', 'Journal']

export default function Footer() {
  return (
    <footer className="py-16 px-10 border-t border-sage/30">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        <Image
          src="/logo-symbol.png"
          alt="The Collection"
          width={80}
          height={80}
          className="w-16 h-16 object-contain"
        />
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
        <p className="font-panamera text-xs text-gray-soft">
          © {new Date().getFullYear()} The Collection
        </p>
      </div>
    </footer>
  )
}
