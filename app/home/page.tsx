import { getProducts } from '@/lib/shopify'
import type { ShopifyProduct } from '@/lib/shopify'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ParallaxGallery from '@/components/ParallaxGallery'
import FeaturedDrop from '@/components/FeaturedDrop'
import AboutPreview from '@/components/AboutPreview'
import EmailCapture from '@/components/EmailCapture'
import Footer from '@/components/Footer'

export default async function HomePage() {
  let products: ShopifyProduct[] = []
  try {
    products = await getProducts()
  } catch {
    // Shopify not yet connected — placeholder UI shown
  }

  return (
    <main>
      <Nav />
      <Hero />
      <ParallaxGallery />
      <FeaturedDrop products={products} />
      <AboutPreview />
      <EmailCapture />
      <Footer />
    </main>
  )
}
