import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ─────────────────────────────────────────────
// COMING SOON MODE
// To launch the full site, delete this file.
// ─────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the root (coming soon page) and Next.js internals
  if (
    pathname === '/' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/fonts') ||
    pathname === '/favicon.ico' ||
    pathname === '/logo-wordmark.png' ||
    pathname === '/logo-symbol.png'
  ) {
    return NextResponse.next()
  }

  // Redirect everything else back to the coming soon page
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
