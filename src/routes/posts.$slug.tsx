import { createFileRoute, Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

import { CategoryLinks } from '@/components/category-links'
import { PostCard, PostMeta } from '@/components/post-card'
import { TopicGrid } from '@/components/topic-grid'
import { ArticleViewCount } from '@/components/view-count'
import { cdnImage, findPost, newestPosts, relatedPosts } from '@/lib/blog'
import { siteName } from '@/lib/site'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    return findPost(allPosts, params.slug)
  },
  head: ({ loaderData: post }) => ({
    meta: post
      ? [
          { title: `${post.title} | ${siteName}` },
          { name: 'description', content: post.summary },
          { property: 'og:title', content: post.title },
          { property: 'og:description', content: post.summary },
          { property: 'og:type', content: 'article' },
          ...(post.image
            ? [{ property: 'og:image', content: cdnImage(post.image, 1200) }]
            : []),
          {
            property: 'article:published_time',
            content: `${post.date}T00:00:00Z`,
          },
          ...post.categories.map((category) => ({
            property: 'article:tag',
            content: category,
          })),
        ]
      : [],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const post = Route.useLoaderData()
  const related = relatedPosts(allPosts, post, 3)
  const ordered = newestPosts(allPosts)
  const index = ordered.findIndex((p) => p.slug === post.slug)
  const next = ordered[(index + 1) % ordered.length]

  return (
    <div className="mx-auto max-w-6xl px-4">
      <article className="mx-auto max-w-3xl py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link to="/" className="hover:text-accent">
            Home
          </Link>
          {post.categories[0] && (
            <>
              <span aria-hidden="true"> / </span>
              <Link
                to="/category/$category"
                params={{ category: post.categories[0] }}
                className="hover:text-accent"
              >
                {post.categories[0]}
              </Link>
            </>
          )}
        </nav>
        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-xl text-muted">{post.summary}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-line py-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <PostMeta post={post} />
            <ArticleViewCount slug={post.slug} />
          </div>
          <CategoryLinks categories={post.categories} />
        </div>
        {post.image && (
          <img
            src={cdnImage(post.image, 1200)}
            alt={post.imageAlt ?? post.title}
            width={1200}
            height={675}
            className="mt-8 aspect-video w-full rounded-2xl object-cover"
          />
        )}
        <div
          className="prose prose-lg prose-stone mt-10 max-w-none break-words prose-headings:font-semibold prose-a:text-accent prose-pre:overflow-x-auto prose-img:rounded-lg prose-table:text-base"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {next && next.slug !== post.slug && (
          <Link
            to="/posts/$slug"
            params={{ slug: next.slug }}
            className="group mt-12 block rounded-2xl border border-line bg-white p-6 hover:border-accent"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Up next →
            </p>
            <p className="mt-2 font-display text-2xl font-semibold group-hover:text-accent">
              {next.title}
            </p>
            <p className="mt-1 text-muted">{next.summary}</p>
          </Link>
        )}
      </article>

      {related.length > 0 && (
        <section className="mt-6 border-t border-line pt-10">
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
            You might also like
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
          Explore more topics
        </h2>
        <TopicGrid />
      </section>
    </div>
  )
}
