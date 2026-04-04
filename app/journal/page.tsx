import Footer from '@/components/Footer'
import JournalView from '@/components/JournalView'

export const metadata = { title: 'Journal — The Collection' }

export default function JournalPage() {
  return (
    <main>
      <JournalView />
      <Footer />
    </main>
  )
}
