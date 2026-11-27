import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'

import {
  AdsterraGlobalScripts,
  AdsterraNativeBanner,
  AdsterraResponsiveBanner,
  SponsoredDirectLink,
} from '@/components/adsterra-ad'
import { adsterra } from '@/lib/ads'
import {
  featuredCategories,
  siteDescription,
  siteName,
  siteTagline,
} from '@/lib/site'

import '../styles.css'

export const Route = createRootRoute({
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">
        404
      </p>
      <h1 className="mt-2 text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 text-muted">
        That article or page doesn’t exist — but there’s plenty more to read.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-accent"
      >
        Back to the homepage
      </Link>
    </div>
  ),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${siteName} — ${siteTagline}` },
      { name: 'description', content: siteDescription },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: siteName },
      { property: 'og:description', content: siteDescription },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'theme-color', content: '#faf6ef' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          <div className="mx-auto max-w-6xl px-4 pt-5">
            <AdsterraResponsiveBanner
              key={`top-banner-${pathname}`}
              desktop={adsterra.banners.leaderboard728x90}
              mobile={adsterra.banners.mobile320x50}
            />
          </div>
          {children}
          <div className="mx-auto mt-14 max-w-6xl px-4">
            <AdsterraNativeBanner
              key={`footer-native-${pathname}`}
              unit={adsterra.native.footer}
            />
          </div>
        </main>
        <SiteFooter />
        <AdsterraGlobalScripts />
        <Scripts />
      </body>
    </html>
  )
}

function Logo() {
  return (
    <Link to="/" className="flex items-baseline gap-1.5">
      <span className="font-display text-2xl font-semibold tracking-tight">
        Daily<span className="text-accent">Curio</span>
      </span>
    </Link>
  )
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Logo />
        <p className="hidden text-sm text-muted md:block">{siteTagline}</p>
        <div className="flex items-center gap-4">
          <SponsoredDirectLink variant="header" />
          <Link
            to="/about"
            className="text-sm font-medium hover:text-accent"
          >
            About
          </Link>
        </div>
      </div>
      <nav
        aria-label="Topics"
        className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2"
      >
        {featuredCategories.map((category) => (
          <Link
            key={category}
            to="/category/$category"
            params={{ category }}
            className="whitespace-nowrap rounded-full px-3 py-1 text-sm text-muted hover:bg-accent-soft hover:text-ink"
            activeProps={{ className: 'bg-ink !text-paper hover:!bg-ink' }}
          >
            {category}
          </Link>
        ))}
      </nav>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-line bg-ink text-paper/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold text-paper">
            Daily<span className="text-accent">Curio</span>
          </p>
          <p className="mt-3 max-w-sm text-sm">{siteDescription}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-paper">
            Topics
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {featuredCategories.map((category) => (
              <li key={category}>
                <Link
                  to="/category/$category"
                  params={{ category }}
                  className="hover:text-accent"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-paper">
            Company
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-accent">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-accent">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-accent">
                Terms &amp; disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs">
        © {new Date().getFullYear()} {siteName}. All rights reserved.
      </p>
    </footer>
  )
}
