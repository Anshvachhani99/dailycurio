import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

import {
  AdsterraBanner,
  AdsterraNativeBanner,
} from '@/components/adsterra-ad'
import { PostCard } from '@/components/post-card'
import { TopicGrid } from '@/components/topic-grid'
import { adsterra } from '@/lib/ads'
import { newestPosts } from '@/lib/blog'
import { categoryBlurbs, siteName } from '@/lib/site'

export const Route = createFileRoute('/category/$category')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const category = params.category
    const posts = newestPosts(
      allPosts.filter((post) => post.categories.includes(category)),
    )
    return { category, posts }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category ?? 'Category'} | ${siteName}` },
      {
        name: 'description',
        content:
          (loaderData && categoryBlurbs[loaderData.category]) ??
          `Articles about ${loaderData?.category ?? 'this topic'}.`,
      },
    ],
  }),
})

function RouteComponent() {
  const { category, posts } = Route.useLoaderData()
  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Topic
        </p>
        <h1 className="mt-2 text-4xl font-semibold md:text-6xl">{category}</h1>
        {categoryBlurbs[category] && (
          <p className="mt-4 max-w-2xl text-lg text-muted">
            {categoryBlurbs[category]}
          </p>
        )}
      </header>

      {posts.length ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} eager={i < 3} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          New {category} stories are coming soon. Explore another topic below.
        </p>
      )}

      <div className="mt-12 flex flex-col items-center gap-8">
        <AdsterraBanner
          key={`cat-rect-${category}`}
          unit={adsterra.banners.rectangle300x250}
        />
        <AdsterraNativeBanner
          key={`cat-native-${category}`}
          unit={adsterra.native.inArticle}
          className="w-full"
        />
      </div>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
          More topics
        </h2>
        <TopicGrid exclude={category} />
      </section>
    </div>
  )
}
