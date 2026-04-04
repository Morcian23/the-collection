import { getProducts } from '@/lib/shopify'
import type { ShopifyProduct } from '@/lib/shopify'
import ShopGrid from '@/components/ShopGrid'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Shop — The Collection',
}

export default async function ShopPage() {
  let products: ShopifyProduct[] = []
  try {
    products = await getProducts()
  } catch {
    // fallback to empty
  }

  return (
    <main>
      <ShopGrid products={products} />
      <Footer />
    </main>
  )
}
