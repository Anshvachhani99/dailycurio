import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

/** One row per article. `views` goes up on every article page load. */
export const postViews = pgTable('post_views', {
  slug: text().primaryKey(),
  views: integer().notNull().default(0),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
