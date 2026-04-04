import { getProduct, createCart } from '@/lib/shopify'
import { notFound } from 'next/navigation'
import ProductView from '@/components/ProductView'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  try {
    const product = await getProduct(handle)
    return { title: `${product?.title} — The Collection` }
  } catch {
    return { title: 'The Collection' }
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const product = await getProduct(handle).catch(() => null)
  if (!product) notFound()

  return (
    <main>
      <ProductView product={product} />
      <Footer />
    </main>
  )
}
