import { monetag } from '@/lib/ads'

/**
 * Monetag Direct Link, always labeled "Sponsored" so readers know it leads to
 * an advertiser. Renders nothing when no direct link is configured.
 */
export function SponsoredLink({
  variant = 'card',
}: {
  variant?: 'card' | 'header'
}) {
  if (!monetag.directLink) return null

  if (variant === 'header') {
    return (
      <a
        href={monetag.directLink}
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
      href={monetag.directLink}
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
