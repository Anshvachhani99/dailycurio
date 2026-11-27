import { Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

import { categoryBlurbs, featuredCategories } from '@/lib/site'
import { cn } from '@/lib/utils'

const icons: Record<string, string> = {
  Tech: '💡',
  Money: '💰',
  Health: '🌿',
  Travel: '🧭',
  Food: '🍲',
  Science: '🔭',
  Lifestyle: '✨',
  Entertainment: '🎬',
}

export function TopicGrid({ exclude }: { exclude?: string }) {
  const topics = featuredCategories.filter((c) => c !== exclude)
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {topics.map((category) => {
        const count = allPosts.filter((p) =>
          p.categories.includes(category),
        ).length
        return (
          <Link
            key={category}
            to="/category/$category"
            params={{ category }}
            className={cn(
              'rounded-xl border border-line bg-white p-4 transition',
              'hover:-translate-y-0.5 hover:border-accent hover:shadow-md',
            )}
          >
            <span className="text-2xl" aria-hidden="true">
              {icons[category]}
            </span>
            <p className="mt-2 font-semibold">{category}</p>
            <p className="mt-1 text-sm text-muted line-clamp-2">
              {categoryBlurbs[category]}
            </p>
            <p className="mt-2 text-xs font-medium text-accent">
              {count} {count === 1 ? 'article' : 'articles'}
            </p>
          </Link>
        )
      })}
    </div>
  )
}
