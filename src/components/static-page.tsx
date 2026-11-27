export function StaticPage({
  title,
  intro,
  children,
}: {
  title: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
      <div className="prose prose-stone mt-8 max-w-none prose-headings:font-semibold prose-a:text-accent">
        {children}
      </div>
    </div>
  )
}
