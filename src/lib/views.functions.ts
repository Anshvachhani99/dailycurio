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

/**
 * Adds one view to an article and returns its new total.
 * Called on every article page load, so refreshes and new visitors both count.
 */
export const recordView = createServerFn({ method: 'POST' })
  .validator(slugInput)
  .handler(async ({ data }) => {
    const { sql } = await import('drizzle-orm')
    const { db } = await import('../../db/index.js')
    const { postViews } = await import('../../db/schema.js')

    const [row] = await db
      .insert(postViews)
      .values({ slug: data.slug, views: 1 })
      .onConflictDoUpdate({
        target: postViews.slug,
        set: { views: sql`${postViews.views} + 1`, updatedAt: sql`now()` },
      })
      .returning({ views: postViews.views })

    return { views: row?.views ?? 0 }
  })

/** View totals for every article, keyed by slug. */
export const getViewCounts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { db } = await import('../../db/index.js')
    const { postViews } = await import('../../db/schema.js')

    const rows = await db
      .select({ slug: postViews.slug, views: postViews.views })
      .from(postViews)

    const counts: Record<string, number> = {}
    for (const row of rows) counts[row.slug] = row.views
    return counts
  },
)
