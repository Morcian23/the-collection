import { getProducts } from '@/lib/shopify'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import DropsView from '@/components/DropsView'

export const metadata = { title: 'Drops — The Collection' }

export default async function DropsPage() {
  let products = []
  try {
    products = await getProducts()
  } catch {}

  return (
    <main>
      <DropsView products={products} />
      <Footer />
    </main>
  )
}
