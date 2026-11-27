import { createServerFn } from '@tanstack/react-start'
import { allPosts } from 'content-collections'
import { z } from 'zod'

const knownSlugs = new Set(allPosts.map((post) => post.slug))

const slugInput = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .refine((slug) => knownSlugs.has(slug), 'Unknown article'),
})

async function getViewsDb() {
  try {
    const { env } = await import('cloudflare:workers')
    return (env as { DB?: D1Database }).DB
  } catch {
    return undefined
  }
}

/**
 * Adds one view to an article and returns its new total.
 * Called on every article page load, so refreshes and new visitors both count.
 */
export const recordView = createServerFn({ method: 'POST' })
  .validator(slugInput)
  .handler(async ({ data }) => {
    const db = await getViewsDb()
    if (!db) return { views: 0 }

    const row = await db
      .prepare(
        `INSERT INTO post_views (slug, views, updated_at)
         VALUES (?1, 1, datetime('now'))
         ON CONFLICT(slug) DO UPDATE SET
           views = post_views.views + 1,
           updated_at = datetime('now')
         RETURNING views`,
      )
      .bind(data.slug)
      .first<{ views: number }>()

    return { views: row?.views ?? 0 }
  })

/** View totals for every article, keyed by slug. */
export const getViewCounts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const db = await getViewsDb()
    if (!db) return {}

    const { results } = await db
      .prepare('SELECT slug, views FROM post_views')
      .all<{ slug: string; views: number }>()

    const counts: Record<string, number> = {}
    for (const row of results ?? []) counts[row.slug] = row.views
    return counts
  },
)
