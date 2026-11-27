import { notFound } from '@tanstack/react-router'

type PostSummary = { slug: string; date: string; categories: string[] }

export function newestPosts<T extends PostSummary>(posts: readonly T[]) {
  return [...posts].sort(
    (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
  )
}

export function getCategories(posts: readonly PostSummary[]) {
  return [...new Set(posts.flatMap((post) => post.categories))].sort((a, b) =>
    a.localeCompare(b),
  )
}

export function findPost<T extends PostSummary>(
  posts: readonly T[],
  slug: string,
) {
  const post = posts.find((post) => post.slug === slug)
  if (!post) throw notFound()
  return post
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

/** Serve local images directly from static assets. */
export function cdnImage(src: string, _width: number) {
  return src
}

/** Posts sharing a category with `post`, newest first, then other posts to fill. */
export function relatedPosts<T extends PostSummary>(
  posts: readonly T[],
  post: T,
  count = 3,
) {
  const others = newestPosts(posts).filter((p) => p.slug !== post.slug)
  const shared = others.filter((p) =>
    p.categories.some((c) => post.categories.includes(c)),
  )
  const rest = others.filter((p) => !shared.includes(p))
  return [...shared, ...rest].slice(0, count)
}

export function readingTime(html: string) {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean)
  return Math.max(1, Math.round(words.length / 220))
}

/**
 * Split rendered article HTML cleanly at a section boundary near the middle
 * so in-article ad blocks never interrupt an open tag, list, or table.
 */
export function splitHtmlAtHeading(html: string): [string, string] {
  const headings = [...html.matchAll(/<h2\b/gi)]
  if (headings.length >= 2) {
    const splitAt = headings[Math.floor(headings.length / 2)]?.index
    if (splitAt !== undefined && splitAt > 0) {
      return [html.slice(0, splitAt), html.slice(splitAt)]
    }
  }
  return [html, '']
}
