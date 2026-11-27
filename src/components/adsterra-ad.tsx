import { useEffect, useRef } from 'react'

import {
  adsterra,
  adsterraBannerEnabled,
  adsterraNativeEnabled,
} from '@/lib/ads'

/**
 * Renders the Adsterra 468x60 iframe banner inside a dedicated container so it
 * executes safely during both initial load and client-side route transitions.
 */
export function AdsterraBanner() {
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = bannerRef.current
    if (!container || !adsterraBannerEnabled) return

    const options = {
      key: adsterra.bannerKey,
      format: 'iframe',
      height: adsterra.bannerHeight,
      width: adsterra.bannerWidth,
      params: {},
    }

    const confScript = document.createElement('script')
    confScript.text = `window.atOptions = ${JSON.stringify(options)};`

    const invokeScript = document.createElement('script')
    invokeScript.setAttribute('data-cfasync', 'false')
    invokeScript.src = adsterra.bannerSrc

    container.replaceChildren(confScript, invokeScript)

    return () => {
      container.replaceChildren()
    }
  }, [])

  if (!adsterraBannerEnabled) return null

  return (
    <aside
      aria-label="Advertisement"
      className="mx-auto max-w-6xl px-4 pt-5"
    >
      <div className="rounded-xl border border-line/70 bg-paper/60 px-3 py-2.5 text-center">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
          Advertisement
        </p>
        <div className="mx-auto flex max-w-full justify-start overflow-x-auto sm:justify-center">
          <div
            ref={bannerRef}
            style={{
              width: `${adsterra.bannerWidth}px`,
              minHeight: `${adsterra.bannerHeight}px`,
            }}
            className="flex shrink-0 items-center justify-center"
          />
        </div>
      </div>
    </aside>
  )
}

/**
 * Renders the Adsterra Native Banner container and script after client mount.
 * Keep a single instance mounted per page so the container ID remains unique.
 */
export function AdsterraNativeBanner() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || !adsterraNativeEnabled) return

    const container = document.createElement('div')
    container.id = adsterra.nativeContainerId

    const script = document.createElement('script')
    script.async = true
    script.setAttribute('fetchpriority', 'high')
    script.setAttribute('data-cfasync', 'false')
    script.src = adsterra.nativeSrc

    wrapper.replaceChildren(container, script)

    return () => {
      wrapper.replaceChildren()
    }
  }, [])

  if (!adsterraNativeEnabled) return null

  return (
    <aside
      aria-label="Sponsored content"
      className="mx-auto mt-14 max-w-6xl px-4"
    >
      <div className="rounded-2xl border border-line bg-white/60 p-4 sm:p-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
          Advertisement
        </p>
        <div ref={wrapperRef} className="min-h-[90px] w-full" />
      </div>
    </aside>
  )
}
