import { Link, createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

import {
  AdsterraBanner,
  AdsterraNativeBanner,
} from '@/components/adsterra-ad'
import { PostCard } from '@/components/post-card'
import { TopicGrid } from '@/components/topic-grid'
import { adsterra } from '@/lib/ads'
import { newestPosts } from '@/lib/blog'
import { siteTagline, trendingSlugs } from '@/lib/site'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function SectionHeading({ title, kicker }: { title: string; kicker: string }) {
  return (
    <div className="mb-6 flex items-end justify-between border-b border-line pb-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {kicker}
        </p>
        <h2 className="mt-1 text-2xl font-semibold md:text-3xl">{title}</h2>
      </div>
    </div>
  )
}

function HomePage() {
  const posts = newestPosts(allPosts)
  const [featured, ...rest] = posts
  const sidePicks = rest.slice(0, 3)
  const trending = trendingSlugs
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p) => p !== undefined)
  const latest = rest.slice(3)

  if (!featured) {
    return (
      <p className="mx-auto max-w-2xl px-4 py-20 text-center text-muted">
        New stories are on their way. Check back soon.
      </p>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="py-10 md:py-14">
        <p className="text-sm font-medium text-muted">{siteTagline}</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Learn something useful{' '}
          <span className="italic text-accent">every day.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Practical guides on tech, money, health, travel, food, and more —
          written in plain language and short enough to finish with your tea.
        </p>
      </section>

      <section
        aria-label="Featured stories"
        className="grid gap-10 lg:grid-cols-[2fr_1fr]"
      >
        <PostCard post={featured} size="lg" eager />
        <div className="space-y-6 lg:border-l lg:border-line lg:pl-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Editor’s picks
          </p>
          {sidePicks.map((post) => (
            <PostCard key={post.slug} post={post} size="sm" />
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-wrap items-start justify-center gap-4">
        <AdsterraBanner unit={adsterra.banners.banner468Primary} />
        <AdsterraBanner unit={adsterra.banners.rectangle300x250} />
      </div>

      <section className="mt-12">
        <SectionHeading kicker="Explore" title="Pick a topic" />
        <TopicGrid />
      </section>

      <AdsterraNativeBanner
        unit={adsterra.native.inArticle}
        className="mt-12"
      />

      <section className="mt-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <SectionHeading kicker="Fresh" title="Latest stories" />
          <div className="grid gap-10 sm:grid-cols-2">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
        <aside>
          <SectionHeading kicker="Popular" title="Trending now" />
          <ol className="space-y-5">
            {trending.map((post, i) => (
              <li key={post.slug} className="flex gap-4">
                <span className="font-display text-3xl font-semibold text-accent/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {post.categories[0]}
                  </p>
                  <Link
                    to="/posts/$slug"
                    params={{ slug: post.slug }}
                    className="font-semibold leading-snug hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-2xl bg-accent-soft p-6">
            <p className="font-display text-xl font-semibold">
              New guides every week
            </p>
            <p className="mt-2 text-sm text-muted">
              Bookmark Daily Curio and come back for fresh, practical reads on
              the topics you care about.
            </p>
            <Link
              to="/about"
              className="mt-4 inline-block rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-accent"
            >
              About Daily Curio
            </Link>
          </div>
          <div className="mt-8 flex justify-center">
            <AdsterraBanner unit={adsterra.banners.skyscraper160x300} />
          </div>
        </aside>
      </section>
      <AdsterraBanner
        unit={adsterra.banners.banner468Secondary}
        className="mt-12"
      />
    </div>
  )
}
