import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { BattleNav } from '@/components/BattleNav'
import { SiteFooter } from '@/components/SiteFooter'
import { profile } from '@/data/portfolio'

import '../styles.css'

const siteName = `${profile.name} - Portfolio`
const siteDescription = `* ${profile.name}, ${profile.title}. An UNDERTALE-inspired portfolio. It fills you with DETERMINATION.`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap',
      },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="ut-stars min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-black focus:p-2"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <BattleNav />
        </div>
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="font-pixel text-4xl text-ut-red">404</p>
      <p className="mt-6 text-3xl">* But nobody came.</p>
      <p className="mt-2 text-xl text-ut-gray">
        * (This page doesn't exist. Use the menu below to find your way back.)
      </p>
    </div>
  )
}
