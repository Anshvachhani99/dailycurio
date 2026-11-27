import { useEffect, useRef, useState } from 'react'

import {
  type AdsterraBannerUnit,
  type AdsterraNativeUnit,
  adsterra,
} from '@/lib/ads'
import { cn } from '@/lib/utils'

// Serialize `window.atOptions` banner script loads so concurrent banners on the
// same page never overwrite each other's zone key and dimensions mid-fetch.
let bannerQueue: Promise<void> = Promise.resolve()

function enqueueBannerLoad(task: () => Promise<void>): void {
  bannerQueue = bannerQueue.then(task, task)
}

function useMediaMatch(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])

  return matches
}

/**
 * Loads Adsterra global Popunder and Social Bar scripts once per document.
 */
export function AdsterraGlobalScripts() {
  useEffect(() => {
    const urls = [adsterra.popunderSrc, adsterra.socialBarSrc].filter(Boolean)
    for (const src of urls) {
      if (document.querySelector(`script[data-adsterra-global="${src}"]`)) {
        continue
      }
      const script = document.createElement('script')
      script.async = true
      script.setAttribute('data-cfasync', 'false')
      script.setAttribute('data-adsterra-global', src)
      script.src = src
      document.body.appendChild(script)
    }
  }, [])

  return null
}

/**
 * Renders a single Adsterra iframe-format banner cleanly inside a container,
 * queued so `window.atOptions` matches this unit when its script evaluates.
 */
export function AdsterraBanner({
  unit,
  className,
  label = 'Advertisement',
}: {
  unit: AdsterraBannerUnit
  className?: string
  label?: string
}) {
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = bannerRef.current
    if (!container || !unit.key || !unit.src) return

    let cancelled = false

    enqueueBannerLoad(
      () =>
        new Promise<void>((resolve) => {
          if (cancelled || !container.isConnected) {
            resolve()
            return
          }

          const options = {
            key: unit.key,
            format: 'iframe',
            height: unit.height,
            width: unit.width,
            params: {},
          }

          const confScript = document.createElement('script')
          confScript.text = `window.atOptions = ${JSON.stringify(options)};`

          const invokeScript = document.createElement('script')
          invokeScript.setAttribute('data-cfasync', 'false')
          invokeScript.src = unit.src

          const finish = () => resolve()
          const timer = window.setTimeout(finish, 4000)
          invokeScript.addEventListener('load', () => {
            window.clearTimeout(timer)
            finish()
          })
          invokeScript.addEventListener('error', () => {
            window.clearTimeout(timer)
            finish()
          })

          container.replaceChildren(confScript, invokeScript)
        }),
    )

    return () => {
      cancelled = true
      container.replaceChildren()
    }
  }, [unit.key, unit.src, unit.width, unit.height])

  if (!unit.key || !unit.src) return null

  return (
    <aside
      aria-label={label}
      className={cn(
        'rounded-xl border border-line/70 bg-paper/60 px-3 py-2.5 text-center',
        className,
      )}
    >
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <div className="mx-auto flex max-w-full justify-start overflow-x-auto sm:justify-center">
        <div
          ref={bannerRef}
          style={{
            width: `${unit.width}px`,
            minHeight: `${unit.height}px`,
          }}
          className="flex shrink-0 items-center justify-center"
        />
      </div>
    </aside>
  )
}

/**
 * Chooses the desktop (728x90) or mobile (320x50) banner based on viewport
 * width so hidden off-breakpoint slots never fire wasted ad requests.
 */
export function AdsterraResponsiveBanner({
  desktop,
  mobile,
  className,
}: {
  desktop: AdsterraBannerUnit
  mobile: AdsterraBannerUnit
  className?: string
}) {
  const isDesktop = useMediaMatch('(min-width: 768px)')
  if (isDesktop === null) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'min-h-[82px] rounded-xl border border-line/70 bg-paper/60 px-3 py-2.5',
          className,
        )}
      />
    )
  }
  const activeUnit = isDesktop ? desktop : mobile
  return (
    <AdsterraBanner
      key={activeUnit.key}
      unit={activeUnit}
      className={className}
    />
  )
}

/**
 * Renders a tall sidebar skyscraper banner only on wide desktop viewports.
 */
export function AdsterraDesktopSidebarBanner({
  unit,
  className,
}: {
  unit: AdsterraBannerUnit
  className?: string
}) {
  const isWide = useMediaMatch('(min-width: 1024px)')
  if (isWide !== true) return null
  return <AdsterraBanner unit={unit} className={className} />
}

/**
 * Renders an Adsterra Native Banner container and script after client mount.
 * Each mounted Native unit on a page must use a distinct `containerId`.
 */
export function AdsterraNativeBanner({
  unit,
  className,
}: {
  unit: AdsterraNativeUnit
  className?: string
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || !unit.src || !unit.containerId) return

    const container = document.createElement('div')
    container.id = unit.containerId

    const script = document.createElement('script')
    script.async = true
    script.setAttribute('fetchpriority', 'high')
    script.setAttribute('data-cfasync', 'false')
    script.src = unit.src

    wrapper.replaceChildren(container, script)

    return () => {
      wrapper.replaceChildren()
    }
  }, [unit.src, unit.containerId])

  if (!unit.src || !unit.containerId) return null

  return (
    <aside
      aria-label="Sponsored content"
      className={cn(
        'rounded-2xl border border-line bg-white/60 p-4 sm:p-5',
        className,
      )}
    >
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
        Advertisement
      </p>
      <div ref={wrapperRef} className="min-h-[90px] w-full" />
    </aside>
  )
}

/**
 * Adsterra Direct Link CTA, clearly marked "Sponsored".
 */
export function SponsoredDirectLink({
  variant = 'card',
}: {
  variant?: 'card' | 'header'
}) {
  if (!adsterra.directLink) return null

  if (variant === 'header') {
    return (
      <a
        href={adsterra.directLink}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="rounded-full border border-line px-3 py-1 text-sm font-medium hover:border-accent hover:text-accent"
      >
        Today’s deal
        <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
          Sponsored
        </span>
      </a>
    )
  }

  return (
    <a
      href={adsterra.directLink}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-dashed border-line bg-accent-soft/40 p-5 hover:border-accent"
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          Sponsored
        </p>
        <p className="mt-1 font-semibold group-hover:text-accent">
          Check out today’s featured offer from our partner
        </p>
      </div>
      <span aria-hidden="true" className="text-xl group-hover:text-accent">
        ↗
      </span>
    </a>
  )
}
