import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Collection',
  description: 'Curated fine art prints by emerging BIPOC artists from the American South.',
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
