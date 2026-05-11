import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Collection Initiative',
  description: 'A nonprofit arts organization building a thriving, inclusive fine arts ecosystem across southside Atlanta — for artists, collectors, and community.',
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
