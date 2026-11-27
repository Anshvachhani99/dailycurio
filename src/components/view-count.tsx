import { useEffect, useRef, useState } from 'react'

import { getViewCounts, recordView } from '@/lib/views.functions'
import { cn } from '@/lib/utils'

const formatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function formatViews(views: number) {
  return `${formatter.format(views)} ${views === 1 ? 'view' : 'views'}`
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

/**
 * Counts this page load as a view of the article and shows the running total.
 * Every load counts: a refresh, a returning reader, or a new visitor.
 */
export function ArticleViewCount({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)
  const recorded = useRef<string | null>(null)

  useEffect(() => {
    // Guards against React StrictMode running the effect twice in development.
    if (recorded.current === slug) return
    recorded.current = slug
    setViews(null)
    let cancelled = false
    recordView({ data: { slug } })
      .then((result) => {
        if (!cancelled) setViews(result.views)
        invalidateViewCounts()
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-sm text-muted transition-opacity',
        views === null && 'opacity-0',
      )}
      aria-live="polite"
    >
      <EyeIcon />
      {views === null ? 'Loading views' : formatViews(views)}
    </span>
  )
}

// One shared request for all card view counts on a page.
let countsPromise: Promise<Record<string, number>> | null = null
let countsFetchedAt = 0

function invalidateViewCounts() {
  countsPromise = null
}

function loadViewCounts() {
  if (!countsPromise || Date.now() - countsFetchedAt > 30_000) {
    countsFetchedAt = Date.now()
    countsPromise = getViewCounts().catch(() => {
      countsPromise = null
      return {}
    })
  }
  return countsPromise
}

/** Read-only view total for article cards (does not add a view). */
export function CardViewCount({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    loadViewCounts().then((counts) => {
      if (!cancelled) setViews(counts[slug] ?? 0)
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (views === null) return null
  return (
    <>
      <span aria-hidden="true"> · </span>
      {formatViews(views)}
    </>
  )
}
