import Footer from '@/components/Footer'
import ArtistsView from '@/components/ArtistsView'

export const metadata = { title: 'Artists — The Collection' }

export default function ArtistsPage() {
  return (
    <main>
      <ArtistsView />
      <Footer />
    </main>
  )
}
