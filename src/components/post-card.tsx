import { Link } from '@tanstack/react-router'
import { type Post } from 'content-collections'

import { CardViewCount } from '@/components/view-count'
import { cdnImage, formatDate, readingTime } from '@/lib/blog'
import { cn } from '@/lib/utils'

export function CategoryTag({ category }: { category?: string }) {
  if (!category) return null
  return (
    <Link
      to="/category/$category"
      params={{ category }}
      className="text-xs font-semibold uppercase tracking-wider text-accent hover:underline"
    >
      {category}
    </Link>
  )
}

export function PostMeta({
  post,
  showViews = false,
}: {
  post: Post
  showViews?: boolean
}) {
  return (
    <p className="text-sm text-muted">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true"> · </span>
      {readingTime(post.html)} min read
      {showViews && <CardViewCount slug={post.slug} />}
    </p>
  )
}

export function PostCard({
  post,
  size = 'md',
  eager = false,
}: {
  post: Post
  size?: 'lg' | 'md' | 'sm'
  eager?: boolean
}) {
  const width = size === 'lg' ? 1200 : size === 'md' ? 640 : 360
  return (
    <article
      className={cn(
        'group',
        size === 'sm' && 'grid grid-cols-[7rem_1fr] gap-4 items-start',
      )}
    >
      {post.image && (
        <Link
          to="/posts/$slug"
          params={{ slug: post.slug }}
          tabIndex={-1}
          aria-hidden="true"
          className="block overflow-hidden rounded-xl bg-line"
        >
          <img
            src={cdnImage(post.image, width)}
            alt=""
            loading={eager ? 'eager' : 'lazy'}
            width={width}
            height={Math.round((width * 9) / 16)}
            className={cn(
              'w-full object-cover transition duration-500 group-hover:scale-105',
              size === 'sm' ? 'aspect-square' : 'aspect-video',
            )}
          />
        </Link>
      )}
      <div className={cn(size !== 'sm' && 'mt-4')}>
        <CategoryTag category={post.categories[0]} />
        <h3
          className={cn(
            'mt-1 font-semibold leading-snug',
            size === 'lg' && 'text-3xl md:text-4xl',
            size === 'md' && 'text-xl',
            size === 'sm' && 'text-base',
          )}
        >
          <Link
            to="/posts/$slug"
            params={{ slug: post.slug }}
            className="hover:text-accent transition-colors"
          >
            {post.title}
          </Link>
        </h3>
        {size !== 'sm' && (
          <p
            className={cn(
              'mt-2 text-muted',
              size === 'lg' ? 'text-lg' : 'line-clamp-2',
            )}
          >
            {post.summary}
          </p>
        )}
        <div className="mt-2">
          <PostMeta post={post} showViews />
        </div>
      </div>
    </article>
  )
}
