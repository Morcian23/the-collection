import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Collection Initiative',
  description: 'The Collection Initiative is a 501(c)(3) fine arts nonprofit rooted in Southside Atlanta. We curate the relationships between artists, collectors, and the communities they come from.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
